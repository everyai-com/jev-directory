/* ================================================================
   Jev Directory MCP server — POST /mcp (Streamable HTTP)

   The directory as tools, not pages: any MCP-compatible agent connects
   once and then searches the 50 runnable evals and every community
   build itself — always current, nothing to re-export. Beyond search,
   the server teaches what Jev is, how to integrate it, which decision
   patterns fit a product, and which builds prove each pattern works.

     POST /mcp   JSON-RPC 2.0 (initialize, tools/*, resources/*, ping)

   Tools
     search_jev            find evals + builds by keyword, category, kind
     get_jev_eval          one eval in full, exact prompt included
     get_jev_build         one community build with its project links
     list_jev_categories   categories with counts for both collections
     get_jev_pack          how to call Jev, the pack URL, setup prompt
     explain_jev           what Jev is / isn't, when to use it, question types
     get_jev_integration_guide  runnable SDK guide: install, calls, answers,
                                privacy options, calibration, docs
     list_jev_patterns     reusable decision patterns with eval + build refs
     recommend_jev_use_cases  given a product description, which Jev patterns,
                              evals and builds apply — and what to ask first
     get_jev_eval_manifest dataset revision, scoring rule, per-eval pass rules

   Resources
     jev://evals           all 50 evals with runnable prompts (markdown)
     jev://guide           what-is-Jev explainer for agents (markdown)
     jev://playbook        business playbook + decision patterns (markdown)

   Directory data is read straight from the static /capabilities.json and
   /setup.txt served next to this worker, so the endpoint can never
   disagree with what the site shows. The guide, integration and pattern
   texts below are curated with the worker and versioned alongside it.
   No keys, no external services.

   Speed notes: the directory loads lazily — initialize, ping, tools/list
   and notifications never touch the assets, so session setup stays fast
   even on a cold isolate. On load, every entry is pre-tokenized into
   search haystacks and O(1) lookup maps, category counts are tallied
   once, and built resource markdown is memoised — every repeat call is
   served from the isolate cache. Responses are compact JSON.

   Shipped as a Pages advanced-mode worker: _routes.json scopes it to
   /mcp, every other path is served from the static assets. The handler
   is pure (message in, message out) apart from that one asset read,
   which is memoised per isolate.
   ================================================================ */

const SERVER_NAME = 'jev-directory';
const SERVER_VERSION = '1.2.0';
const RESOURCE_URI = 'jev://evals';
const GUIDE_URI = 'jev://guide';
const PLAYBOOK_URI = 'jev://playbook';
const PACK_SITE = 'https://jev.magicteams.ai';

// Versions we speak, newest first. A client asking for one of these gets it
// echoed back; anything else gets our newest and can decide.
const PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05'];

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, GET, OPTIONS',
  'access-control-allow-headers': 'content-type, authorization, mcp-protocol-version, mcp-session-id',
  'access-control-expose-headers': 'mcp-protocol-version, mcp-session-id'
};

function negotiate(clientVersion) {
  if (PROTOCOL_VERSIONS.includes(clientVersion)) return clientVersion;
  return PROTOCOL_VERSIONS[0];
}

// Methods that need the directory loaded; everything else (initialize, ping,
// tools/list, notifications) is answered without touching the assets.
const NEEDS_DIR = new Set(['tools/call', 'resources/list', 'resources/read']);

// Bounds so one request can't burn the isolate: MCP calls are small.
const MAX_BODY_BYTES = 1024 * 1024;
const MAX_BATCH = 50;

// ── Static assets (memoised per isolate) ────────────────────────
let PACK_CACHE = null;

async function readAsset(request, env, path, asJson) {
  const url = new URL(path, request.url).toString();
  const options = asJson ? { headers: { accept: 'application/json' } } : undefined;
  const req = new Request(url, options);

  let res = null;
  // ASSETS is the static-asset binding Pages gives every Function. The
  // network fallback keeps the handler usable outside a Pages runtime.
  if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
    res = await env.ASSETS.fetch(req);
  } else {
    res = await fetch(req);
  }

  if (!res || !res.ok) {
    throw new Error(`could not read ${path} (${res ? res.status : 'no response'})`);
  }
  return asJson ? res.json() : res.text();
}

function slug(text) {
  return String(text == null ? '' : text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function secondsToMs(value) {
  if (!value) return 0;
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

// Pure: turn the raw pack + setup text into the indexed dir every tool runs
// against. Exported for tests — loadDirectory is just asset reads + memoize.
export function buildDirectory(pack, setup) {
  const evals = (pack.evals || []).map((entry, index) => indexEntry({
    ...entry,
    kind: 'eval',
    n: index + 1,
    id: entry.id || slug(entry.title)
  }));

  const builds = (pack.community || []).map(entry => indexEntry({
    ...entry,
    kind: 'build',
    // Capability-pack builds carry no id; titles are unique across the
    // directory, so the slug is stable and readable in a citation.
    id: slug(entry.title)
  }));

  return {
    pack,
    evals,
    builds,
    setup,
    evalById: toMap(evals),
    evalLookup: buildLookup(evals),
    buildLookup: buildLookup(builds),
    evalCounts: countBy(evals),
    buildCounts: countBy(builds),
    resourceCache: {},
    loadedAt: new Date().toISOString()
  };
}

async function loadDirectory(request, env) {
  if (PACK_CACHE) return PACK_CACHE;

  const pack = await readAsset(request, env, '/capabilities.json', true);

  let setup = '';
  try {
    setup = (await readAsset(request, env, '/setup.txt', false)).trim();
  } catch (err) {
    setup = `Load the Jev capability pack: ${pack.packUrl || `${PACK_SITE}/capabilities.md`}`;
  }

  PACK_CACHE = buildDirectory(pack, setup);
  return PACK_CACHE;
}

// ── Curated knowledge (versioned with the worker) ───────────────
// Facts below track the Vercel AI Gateway docs for typesafe-ai/jev
// (model page + "evaluation" modality, Sept 2026). Directory data
// (evals, builds, manifest) stays live from /capabilities.json.

const JEV_FACTS = [
  'Model: typesafe-ai/jev — TypeSafe AI\u2019s System One evaluation model, served through the Vercel AI Gateway.',
  'Call: experimental_evaluate from the AI SDK (ai \u2265 7.0.105) with { model, state, questions }.',
  'State: one shared string, object, or array per call (transcript, artifact, tool log); every question reads the same state.',
  'Questions: boolean (true/false + probability), choice (one label from your criteria), score (a graded rubric number). All questions in one call are evaluated in parallel.',
  'Answers: typed values plus probabilities — no prose to parse. Booleans carry a probability; TypeSafe reports Choice/Score confidence under result.providerMetadata.typesafe.confidence.',
  'Context window: 32,000 tokens. Maximum output tokens: 0 — Jev returns verdicts, not text.',
  'Price: about $0.042 per million input tokens; output is free, so extra questions barely move the bill.',
  'Auth: AI_GATEWAY_API_KEY (vck_\u2026) in the environment — never paste the key into code.',
  'Privacy: Zero Data Retention and No Training are supported per request via providerOptions.gateway.',
  'Speed: TypeSafe reports up to ~194x faster and ~445x cheaper than LLMs on its workflow evaluations — cheap enough to judge every record, not a sample.'
];

const GUIDE_SECTIONS = {
  overview: [
    'Jev is a judge model, not a chatbot. It never talks to your customers — it grades the AI (or workflow) that does.',
    'You hand it a record of what happened (the state) plus the questions you care about, written in plain English. It answers each one in a typed shape your code can branch on: true/false, one label, or a number.',
    'Nothing to train, no labelled examples to collect: you write the rule in English and Jev applies that rule, the same way on the ten-thousandth call as on the first.'
  ],
  'question-types': [
    'boolean — a yes/no verdict plus a probability. Example: "True only if the agent stated the exact refund amount before the customer approved." Use it for policy gates and compliance checks.',
    'choice — exactly one label from the criteria you list. Example: route a ticket to billing, shipping, or account. Use it for routing, triage, and classification.',
    'score — a number against your ordered rubric. Example: rate an apology 1\u20134 for empathy and ownership. Use it for quality grading and prioritisation.',
    'Mix freely: one call can carry booleans, choices, and scores over the same state, all evaluated in parallel.'
  ],
  'when-to-use': [
    'Reach for Jev when: a chat model\u2019s prose answer would need a parser; you must re-check thousands of records on every deploy; you need a number or label, not an explanation; or you want uncertain cases routed to a human while clear ones automate through.',
    'Canonical jobs: choosing the next tool or subagent in an agent loop; deciding continue / retry / ask the user / stop; scoring urgency or risk before an action; verifying model outputs and enforcing guardrails.',
    'Do not use Jev to chat with end users, to generate content, or to invent rules you never stated — vague question in, wobbly answer out. Every call starts fresh: there is no memory between calls.'
  ],
  'pricing-limits': [
    'About $0.042 per million input tokens with output free — adding a fourth or tenth question to a call barely moves the bill. Real runs from the directory: 1,700 emails judged on four questions each for $0.18; 20,000 messages retagged into 8 buckets in 7 minutes for $1.45.',
    'Limits: 32k-token context window per call; typed answers only (no text generation); verdicts are only as precise as the instructions you write, so calibrate thresholds against labelled examples from your own workflow.'
  ]
};

// Reusable decision patterns distilled from the directory\u2019s evals,
// community builds, and the operator playbook. `evals` names eval ids
// (resolved to live titles at runtime); `buildQuery` finds the closest
// community proof at runtime; `keywords` power recommendations.
const PATTERNS = [
  {
    id: 'boolean-gate',
    title: 'Boolean gate — stop the action unless the rule holds',
    what: 'One boolean question per policy rule. The action (refund, send, deploy, charge) only proceeds when every verdict is true; otherwise pause for approval or a human.',
    when: 'Refunds, sends, charges, publishes — anywhere an agent must prove it disclosed, redacted, or confirmed something before acting.',
    questions: 'amount_disclosed (boolean): "True only if the agent stated the exact refund amount before the customer approved."',
    evals: ['refund-amount-disclosed', 'card-number-redacted', 'payment-paused-for-approval', 'quote-matches-price-list'],
    buildQuery: 'refund receipt verification compliance check',
    keywords: 'refund payment verify compliance policy gate approval disclose redact confirm receipt invoice'
  },
  {
    id: 'choice-router',
    title: 'Choice router — send each item to exactly one owner',
    what: 'One choice question whose criteria are your queues, owners, or priorities. Every ticket, alert, or message lands somewhere — never two places, never nowhere.',
    when: 'Support triage, bug intake, lead routing, escalation queues, moderation dispositions.',
    questions: 'queue (choice: billing | shipping | account): "Route this ticket to the team that owns the underlying problem."',
    evals: ['support-intent-route', 'ticket-priority', 'bug-severity', 'lead-quality', 'escalation-decision'],
    buildQuery: 'route triage tickets classify inbox support',
    keywords: 'route triage classify support ticket queue priority severity lead escalation inbox categorise categorize'
  },
  {
    id: 'score-rubric',
    title: 'Score rubric — grade quality on your own scale',
    what: 'One score question per quality dimension with an ordered rubric (1 = worst \u2026 N = best). Track the numbers over time instead of re-reading everything.',
    when: 'Reviewing agent replies, summaries, drafts, translations, plans — anything where "good" is a spectrum, not a switch.',
    questions: 'empathy (score 1\u20134): ["1 - none", "3 - acknowledged the problem", "4 - owned it and fixed it"].',
    evals: ['apology-quality', 'summary-faithfulness', 'explanation-clarity', 'plan-completeness'],
    buildQuery: 'rubric score quality review grade',
    keywords: 'quality score rubric grade review empathy summary translation plan clarity faithfulness'
  },
  {
    id: 'multi-question-fanout',
    title: 'Multi-question fan-out — one state, many verdicts, one call',
    what: 'Pack every question about the same record into a single call. Questions evaluate in parallel and output is free, so the tenth question costs ~nothing extra.',
    when: 'Auditing transcripts, calls, or artifacts where you need the gate AND the route AND the grade together.',
    questions: 'policy_followed (boolean) + empathy (score) over the same transcript — pass only when both match.',
    evals: ['support-transcript-audit', 'refund-chat-triage', 'agent-handoff-note', 'sales-call-review'],
    buildQuery: 'audit transcript multiple questions',
    keywords: 'audit transcript review multiple questions together fanout batch'
  },
  {
    id: 'confidence-routing',
    title: 'Confidence routing — automate the clear, escalate the unsure',
    what: 'Read the boolean probability (and Choice/Score confidence) on every answer. Automate above your threshold, route below it to a human — calibrated on your own labelled examples.',
    when: 'Any automation where a wrong auto-decision costs more than a review: refunds, access grants, publishes, medical/legal drafts.',
    questions: 'refunded (boolean) + threshold check in code: if (probability < 0.8) send for manual review.',
    evals: ['escalation-decision', 'content-safety', 'payment-paused-for-approval'],
    buildQuery: 'confidence probability threshold human review escalation',
    keywords: 'confidence probability threshold uncertain unsure human review escalate risk approve'
  },
  {
    id: 'retag-loop',
    title: 'Retag loop — reclassify all of history when the question changes',
    what: 'Tag what matters today; when the business changes, re-run Jev over everything for a few dollars instead of predicting the right taxonomy six months ahead.',
    when: 'Email/Slack/transcript archives, CRM hygiene, content libraries — any corpus whose categories keep evolving.',
    questions: 'intent (choice over your 8 buckets) re-run over 20,000 archived messages in one batch job.',
    evals: ['support-intent-route', 'message-sentiment', 'email-tone-check'],
    buildQuery: 'retag archive emails classify history backfill',
    keywords: 'retag reclassify archive history backfill emails inbox migrate taxonomy organise organize'
  },
  {
    id: 'hypothesis-loop',
    title: 'Hypothesis loop — let the LLM guess, let Jev measure',
    what: 'Hand a thinking model transcripts plus outcomes; it proposes candidate drivers ("used the prospect\u2019s name"). Point Jev at history, score every record against all candidates, keep what correlates, repeat.',
    when: 'Sales-call analysis, support deflection, churn drivers — anywhere you suspect patterns but cannot hand-label enough data to prove them.',
    questions: 'Twenty booleans (one per hypothesis) over every call transcript, joined to outcomes in your warehouse.',
    evals: ['sales-call-review', 'churn-risk', 'lead-quality'],
    buildQuery: 'sales call analysis hypothesis correlate outcomes',
    keywords: 'sales hypothesis correlate outcomes analyse analyze calls churn insight drivers'
  },
  {
    id: 'eval-harness',
    title: 'Eval harness — pin agent behavior with fixed states + verdicts',
    what: 'Fixed states, exact expected verdicts, one dataset revision. Run the suite on every agent change; a rev bump means the definition of success changed, never silently.',
    when: 'CI gates for agent behavior, regression suites for prompts, comparing two agent versions on identical inputs.',
    questions: 'This directory\u2019s 50 evals are the template: exact match per question, pass iff every question matches.',
    evals: ['refund-amount-disclosed', 'support-transcript-audit', 'doc-search-answer'],
    buildQuery: 'eval harness test regression CI benchmark',
    keywords: 'eval test harness regression benchmark CI gate suite prompt engineering'
  },
  {
    id: 'agent-loop-step',
    title: 'Agent-loop step — Jev picks the next move, the LLM executes it',
    what: 'At each loop iteration Jev chooses the next tool/subagent or one of continue / retry / ask-the-user / stop. The LLM never burns reasoning on the routing decision itself.',
    when: 'Multi-step agents, tool-heavy tasks, browser automation — anywhere routing tokens dominate the bill.',
    questions: 'next_step (choice: continue | retry | ask_user | stop): "Given the goal and the last tool result, what should the agent do next?"',
    evals: ['escalation-decision', 'bug-report-triage', 'meeting-request-triage'],
    buildQuery: 'agent loop tool router subagent MCP gateway',
    keywords: 'agent loop tool router subagent next step orchestrate plan mcp browser automation'
  },
  {
    id: 'output-verifier',
    title: 'Output verifier — check the artifact before it ships',
    what: 'Judge the draft, not the chat: groundedness, citations, tone, PII leaks, audience fit. The generator writes; Jev signs off or sends back with a scored reason.',
    when: 'Newsletters, release notes, RAG answers, code reviews, generated reports — any artifact with a bar to clear.',
    questions: 'claims_sourced (boolean) + draft_quality (score) over the draft artifact.',
    evals: ['answer-cites-sources', 'doc-search-answer', 'newsletter-draft-review', 'release-notes-check', 'code-review-verdict'],
    buildQuery: 'verify grounded citations draft review moderation',
    keywords: 'verify grounded citations draft hallucination moderation safety review release notes rag'
  }
];

// Pre-tokenized once at module load: recommend scores every pattern per call.
PATTERNS.forEach(p => { p._hay = tokens(`${p.title} ${p.when} ${p.keywords}`).join(' '); });

const INTEGRATION = {
  quickstart: [
    '1. Install the AI SDK (7.0.105+ supports the evaluate API): pnpm add ai@latest',
    '2. Set AI_GATEWAY_API_KEY (vck_\u2026) in your environment — never paste the key into code.',
    '3. Call:',
    '```js',
    "import { experimental_evaluate as evaluate } from 'ai';",
    '',
    'const result = await evaluate({',
    "  model: 'typesafe-ai/jev',",
    "  state: 'The support agent issued a full refund to the customer.',",
    '  questions: {',
    '    refunded: { type: \'boolean\', instructions: \'Was a refund issued?\' }',
    '  }',
    '});',
    '```'
  ],
  questions: [
    'boolean: { type, instructions } \u2192 true/false plus a probability. Optional criteria sharpens the boundary.',
    'choice: { type, instructions, criteria: { key: description } } \u2192 exactly one key. Question IDs and choice keys are preserved in the result.',
    'score: { type, instructions, criteria: [ordered rubric strings] } \u2192 a graded number (in this directory\u2019s dataset, 1\u20134).',
    'All questions share one state (string, object, or array) and evaluate in parallel. Gateway id: typesafe-ai/jev on https://ai-gateway.vercel.sh/v1.'
  ],
  answers: [
    'Read verdicts at result.answers.<questionId>. Booleans include a probability — branch on it: automate the confident, review the unsure.',
    'TypeSafe reports separate Choice and Score confidence at result.providerMetadata.typesafe.confidence.',
    'Calibrate probabilities and confidence thresholds against labelled examples from your own workflow before trusting a cutoff in production.'
  ],
  privacy: [
    'Zero Data Retention and No Training are supported per request:',
    '```js',
    'await evaluate({ model, state, questions,',
    '  providerOptions: { gateway: { zeroDataRetention: true } } });',
    '```',
    'Evaluation calls appear in Gateway logs and custom reporting, count toward budgets, and accept the other Gateway provider options in the same providerOptions.gateway object.'
  ],
  calibration: [
    'Verdicts are only as precise as your instructions: write the rule in English as if briefing a strict auditor, then calibrate cutoffs on labelled examples from your workflow.',
    'Start from this directory\u2019s 50 evals — fixed states with exact expected verdicts and one dataset revision (see get_jev_eval_manifest) — as the template for your own regression suite.'
  ],
  docs: [
    'Model page: https://vercel.com/ai-gateway/models/jev',
    'Evaluation modality: https://vercel.com/docs/ai-gateway/modalities/evaluation',
    'Launch notes: https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway',
    'Provider docs: https://docs.typesafe.ai/introduction',
    'Directory: https://jev.magicteams.ai · Pack: see get_jev_pack for the pack URL and setup prompt.'
  ]
};

// ── Tool definitions ────────────────────────────────────────────
export const TOOLS = [
  {
    name: 'search_jev',
    description:
      'Search the Jev Directory — 50 runnable judge-model evals plus every community ' +
      'build people published. Returns matching entries with id, title, category and a ' +
      'summary. Use get_jev_eval / get_jev_build with an id for the full record.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'What you are looking for, e.g. "route support tickets", "refund amount", "rubric".'
        },
        kind: {
          type: 'string',
          enum: ['all', 'eval', 'build'],
          description: 'Search everything (default), only the 50 evals, or only community builds.'
        },
        category: {
          type: 'string',
          description: 'Restrict to one category, e.g. "Evaluation", "Money", "Work". Omit for all.'
        },
        limit: {
          type: 'integer',
          description: 'How many matches to return (1-25, default 8).',
          minimum: 1,
          maximum: 25
        }
      },
      required: ['query']
    }
  },
  {
    name: 'get_jev_eval',
    description:
      'Fetch one eval in full: the fixed state it runs against, the judge questions ' +
      '(boolean / choice / score) with their instructions, and the exact runnable ' +
      'experimental_evaluate prompt.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Eval id, number (1-50), or exact title, from search_jev.'
        }
      },
      required: ['id']
    }
  },
  {
    name: 'get_jev_build',
    description:
      'Fetch one community build in full: what it does, every linked project, the ' +
      'source post it came from, and — for field-notes imports — the reporter\u2019s claim, ' +
      'its caveat, and the evidence level (measured / demo / proposal).',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Build id or exact title, from search_jev.'
        }
      },
      required: ['id']
    }
  },
  {
    name: 'list_jev_categories',
    description:
      'List every category in both collections with its count, plus directory totals.',
    inputSchema: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'get_jev_pack',
    description:
      'How to actually run Jev: the model id, gateway, the experimental_evaluate call ' +
      'shape, where the full capability pack lives, and the paste-into-agent setup prompt.',
    inputSchema: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'explain_jev',
    description:
      'What Jev is and is not, when to reach for it instead of a chat model, the three ' +
      'question types, and pricing/limits. Start here when an agent or user is new to Jev.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          enum: ['overview', 'question-types', 'when-to-use', 'pricing-limits', 'all'],
          description: 'Which section to return (default "all").'
        }
      },
      required: []
    }
  },
  {
    name: 'get_jev_integration_guide',
    description:
      'Runnable integration guide for typesafe-ai/jev: install, minimal and multi-question ' +
      'calls, question schemas, reading answers and confidence, Zero Data Retention, ' +
      'calibration advice, and official docs links.',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          enum: ['all', 'quickstart', 'questions', 'answers', 'privacy', 'calibration', 'docs'],
          description: 'Which section to return (default "all").'
        }
      },
      required: []
    }
  },
  {
    name: 'list_jev_patterns',
    description:
      'Reusable Jev decision patterns distilled from the directory (boolean gate, choice router, ' +
      'score rubric, fan-out, confidence routing, retag loop, hypothesis loop, eval harness, ' +
      'agent-loop step, output verifier). Each pattern names when to use it, the questions to ask, ' +
      'and the closest runnable evals plus community builds that prove it.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Return one pattern in full, e.g. "choice-router". Omit for the full list.'
        }
      },
      required: []
    }
  },
  {
    name: 'recommend_jev_use_cases',
    description:
      'Given a product description, recommend how Jev can improve it: the best-fit decision ' +
      'patterns, the closest runnable evals to copy, the closest community builds to learn from, ' +
      'and the first questions to ask Jev. This is the product-advisor tool.',
    inputSchema: {
      type: 'object',
      properties: {
        product: {
          type: 'string',
          description: 'What the product does and where quality/routing/review hurts, e.g. "a support inbox where agents miss refund disclosures".'
        },
        limit: {
          type: 'integer',
          description: 'Max evals + builds to cite (1-10, default 6).',
          minimum: 1,
          maximum: 10
        }
      },
      required: ['product']
    }
  },
  {
    name: 'get_jev_eval_manifest',
    description:
      'Dataset ground truth: revision hash, exact-match scoring rule, question counts, and the ' +
      'per-eval pass rules. Quote the revision whenever two runners compare numbers.',
    inputSchema: { type: 'object', properties: {}, required: [] }
  }
];

// Human-readable titles (MCP 2025-06-18) + capability hints. Every tool only
// reads the bundled directory — nothing here writes, charges, calls out, or
// stores user data.
const TOOL_META = {
  search_jev: 'Search evals + builds',
  get_jev_eval: 'Read one eval',
  get_jev_build: 'Read one build',
  list_jev_categories: 'List categories',
  get_jev_pack: 'Capability pack brief',
  explain_jev: 'Explain Jev',
  get_jev_integration_guide: 'Integration guide',
  list_jev_patterns: 'Decision patterns',
  recommend_jev_use_cases: 'Recommend for my product',
  get_jev_eval_manifest: 'Eval manifest'
};
TOOLS.forEach(t => {
  t.title = TOOL_META[t.name] || t.name;
  t.annotations = { readOnlyHint: true, openWorldHint: false };
});

// ── Search ──────────────────────────────────────────────────────
function tokens(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(word => word.length > 1);
}

// Pre-tokenized search haystacks, built once per entry at load. Scoring
// semantics are unchanged — this is exactly what scoreEntry used to rebuild
// on every call, for every entry. _m feeds matchedTerms (title, category and
// the short fields only — no prompts, links or handles).
function indexEntry(entry) {
  entry._t = tokens(entry.title).join(' ');
  entry._c = tokens(entry.category).join(' ');
  entry._b = tokens([
    entry.story,
    entry.description,
    entry.claim,
    entry.caveat,
    entry.state,
    entry.prompt,
    entry.handle,
    (entry.links || []).map(link => `${link.title || ''} ${link.url || ''}`).join(' ')
  ].join(' ')).join(' ');
  entry._m = tokens([entry.title, entry.category, entry.story, entry.description, entry.claim, entry.caveat, entry.state].join(' ')).join(' ');
  return entry;
}

function scoreEntry(entry, queryTokens) {
  let score = 0;
  for (const token of queryTokens) {
    if (entry._t.includes(token)) score += 3;
    else if (entry._c.includes(token)) score += 2;
    else if (entry._b.includes(token)) score += 1;
  }
  return score;
}

function toMap(list) {
  const map = new Map();
  for (const item of list) {
    if (!map.has(item.id)) map.set(item.id, item);
  }
  return map;
}

// First-wins maps mirroring the old linear lookup's fallback order: exact
// id, then lowercase id, then title slug, then lowercase title.
function buildLookup(list) {
  const byId = new Map();
  const byIdLower = new Map();
  const bySlug = new Map();
  const byTitleLower = new Map();
  for (const item of list) {
    if (!byId.has(item.id)) byId.set(item.id, item);
    const lower = String(item.id).toLowerCase();
    if (!byIdLower.has(lower)) byIdLower.set(lower, item);
    const s = slug(item.title);
    if (!bySlug.has(s)) bySlug.set(s, item);
    const t = String(item.title).toLowerCase();
    if (!byTitleLower.has(t)) byTitleLower.set(t, item);
  }
  return { byId, byIdLower, bySlug, byTitleLower };
}

function snippet(text, length) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= length) return clean;
  return `${clean.slice(0, length - 1).trimEnd()}…`;
}

function byIdOrTitle(lookup, want) {
  const raw = String(want == null ? '' : want).trim();
  if (!raw) return null;
  const wanted = slug(raw);

  return (
    lookup.byId.get(wanted) ||
    lookup.byIdLower.get(raw.toLowerCase()) ||
    lookup.bySlug.get(wanted) ||
    lookup.byTitleLower.get(raw.toLowerCase()) ||
    null
  );
}

// ── Tool implementations ────────────────────────────────────────
function toolText(text) {
  return { content: [{ type: 'text', text }] };
}

function toolError(text) {
  return { content: [{ type: 'text', text }], isError: true };
}

function runSearch(dir, args) {
  const query = String(args.query || '').trim();
  if (!query) return toolError('Provide a query, e.g. {"query": "route support tickets"}.');

  const kind = ['all', 'eval', 'build'].includes(args.kind) ? args.kind : 'all';
  const queryTokens = tokens(query);
  const category = String(args.category || '').trim().toLowerCase();
  const limit = Math.min(25, Math.max(1, Number.isInteger(args.limit) ? args.limit : 8));

  // No copy on kind=all: score both lists in place (evals first, so the
  // stable sort below keeps the same tie order as before).
  const lists = kind === 'eval' ? [dir.evals] : kind === 'build' ? [dir.builds] : [dir.evals, dir.builds];
  const scored = [];
  for (const list of lists) {
    for (const item of list) {
      const score = scoreEntry(item, queryTokens);
      if (score <= 0) continue;
      if (category && String(item.category).toLowerCase() !== category) continue;
      scored.push({ item, score });
    }
  }
  scored.sort((a, b) => b.score - a.score);
  const matches = scored.slice(0, limit);

  if (!matches.length) {
    return toolText(
      `No entries matched "${query}"` +
      (kind !== 'all' ? ` among ${kind}s` : '') +
      (category ? ` in category "${args.category}"` : '') +
      '. Try fewer or different keywords, or call list_jev_categories to see what exists.'
    );
  }

  const lines = matches.map(({ item }) => {
    const head = item.kind === 'eval'
      ? `- [eval ${item.n}] ${item.title} — ${item.category} (runnable prompt available)`
      : `- [build] ${item.title} — ${item.category}${item.evidence ? ` [evidence: ${item.evidence}]` : ''}`;
    const id = `  id: ${item.id}`;
    const summary = snippet(item.story || item.description, 220);
    const links = item.kind === 'build' && (item.links || []).length
      ? `\n  Links: ${item.links.slice(0, 3).map(link => link.url).filter(Boolean).join(', ')}`
      : '';
    const source = item.sourceUrl ? `\n  Source: ${item.sourceUrl}` : '';
    return `${head}\n${id}${summary ? `\n  ${summary}` : ''}${links}${source}`;
  });

  lines.push(
    '',
    kind === 'build'
      ? 'Read any build in full with get_jev_build and its id.'
      : 'Read any entry in full with get_jev_eval or get_jev_build and its id/title.'
  );

  return toolText(lines.join('\n'));
}

function runGetEval(dir, args) {
  const wanted = String(args.id == null ? '' : args.id).trim();
  if (!wanted) return toolError('Provide an eval id, number (1-50), or exact title.');

  const asNumber = Number(wanted);
  const item = Number.isInteger(asNumber) && asNumber >= 1 && asNumber <= dir.evals.length
    ? dir.evals[asNumber - 1]
    : byIdOrTitle(dir.evalLookup, wanted);

  if (!item) {
    return toolError(
      `No eval matched "${args.id}". Search first with search_jev, or pass the eval number (1-${dir.evals.length}).`
    );
  }

  const questions = Object.entries(item.questions || {}).map(([name, q]) => {
    const criteria = q.criteria
      ? `\n    criteria: ${JSON.stringify(q.criteria)}`
      : '';
    return `  - ${name} (${q.type}): ${q.instructions}${criteria}`;
  });

  const lines = [
    `Eval ${item.n} of ${dir.evals.length}: ${item.title}`,
    `id: ${item.id} · category: ${item.category}`
  ];
  if (item.story) lines.push('', 'What it tests:', item.story);
  if (item.state) lines.push('', 'State:', item.state);
  if (questions.length) lines.push('', 'Questions:', ...questions);
  if (item.prompt) lines.push('', 'Exact runnable prompt:', item.prompt);

  return toolText(lines.join('\n'));
}

function runGetBuild(dir, args) {
  const item = byIdOrTitle(dir.buildLookup, args.id);
  if (!item) {
    return toolError(
      `No build matched "${args.id}". Search for it with search_jev — ids are slugs of the title.`
    );
  }

  const lines = [`${item.title}`, `category: ${item.category}`];
  if (item.handle) lines.push(`shared by: ${item.handle}`);
  if (item.evidence) lines.push(`evidence: ${item.evidence} (measured = reported numbers, demo = walkthrough, proposal = idea to test)`);
  if (item.description) lines.push('', 'What it does:', String(item.description).replace(/\s+/g, ' ').trim());
  if (item.claim) lines.push('', 'Claim (reported):', String(item.claim).replace(/\s+/g, ' ').trim());
  if (item.caveat) lines.push('', 'Caveat:', String(item.caveat).replace(/\s+/g, ' ').trim());
  if ((item.links || []).length) {
    lines.push('', 'Links:');
    item.links.forEach(link => {
      lines.push(`- ${link.title || link.url}: ${link.url}`);
      if (link.description) lines.push(`  ${snippet(link.description, 200)}`);
    });
  }
  if (item.sourceUrl) lines.push('', `Source: ${item.sourceUrl}`);
  lines.push('', `Browse the whole directory: ${PACK_SITE}`);

  return toolText(lines.join('\n'));
}

function countBy(list) {
  const counts = {};
  list.forEach(item => {
    const key = item.category || 'Other';
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
}

function runListCategories(dir) {
  const evalCounts = dir.evalCounts;
  const buildCounts = dir.buildCounts;

  const lines = [
    `The directory holds ${dir.evals.length} runnable evals and ${dir.builds.length} community builds` +
    ` (generated ${dir.pack.generated || 'recently'}).`,
    '',
    'Community builds by category:'
  ];
  Object.entries(buildCounts).sort((a, b) => b[1] - a[1])
    .forEach(([name, n]) => lines.push(`- ${name} (${n})`));

  lines.push('', 'Evals by category:');
  Object.entries(evalCounts).sort((a, b) => b[1] - a[1])
    .forEach(([name, n]) => lines.push(`- ${name} (${n})`));

  lines.push('', 'Search within one via search_jev with the category argument.');
  return toolText(lines.join('\n'));
}

function runGetPack(dir) {
  const { pack } = dir;
  const model = pack.model || {};
  const howto = pack.howto || {};

  const lines = [
    `Jev capability pack — ${dir.evals.length} runnable evals, ${dir.builds.length} community builds` +
    ` (generated ${pack.generated || 'recently'}).`,
    '',
    `Model: ${model.id || 'typesafe-ai/jev'} via the Vercel AI Gateway (${model.gatewayBase || 'https://ai-gateway.vercel.sh/v1'}).`,
    model.apiKeyEnv ? `Auth: set ${model.apiKeyEnv} in the environment — never paste the key into code.` : '',
    model.inputPricePerMillionTokens
      ? `Price: about $${model.inputPricePerMillionTokens} per million input tokens — cheap enough to judge every conversation.`
      : '',
    '',
    'Call shape:',
    howto.import || "import { experimental_evaluate } from 'ai';",
    howto.call || "experimental_evaluate({ model: 'typesafe-ai/jev', state, questions })",
    '',
    'Question types:',
    ...Object.entries(howto.questionTypes || {}).map(([type, shape]) => `- ${type}: ${shape}`),
    '',
    `Full playbook (markdown): ${pack.packUrl || `${PACK_SITE}/capabilities.md`}`,
    `Agent index: ${PACK_SITE}/llms.txt (also advertised via Link headers + <link rel="describedby"> on every page)`,
    `Browse the directory: ${PACK_SITE}`,
    `Over MCP: read the ${RESOURCE_URI}, ${GUIDE_URI} and ${PLAYBOOK_URI} resources;`,
    'ask explain_jev, list_jev_patterns, or recommend_jev_use_cases for guided answers.',
    '',
    'Setup prompt for an agent:',
    '',
    dir.setup
  ].filter(line => line !== '');

  return toolText(lines.join('\n'));
}

function runExplain(dir, args) {
  const topics = ['overview', 'question-types', 'when-to-use', 'pricing-limits'];
  const want = String(args.topic || 'all').trim().toLowerCase();

  if (want !== 'all' && !topics.includes(want)) {
    return toolError(`Unknown topic "${args.topic}". Use one of: ${topics.join(', ')}, all.`);
  }

  const names = {
    overview: 'What Jev is',
    'question-types': 'The three question types',
    'when-to-use': 'When to use it (and when not to)',
    'pricing-limits': 'Pricing and limits'
  };

  const lines = [];
  for (const topic of (want === 'all' ? topics : [want])) {
    if (want === 'all') lines.push(`## ${names[topic]}`, '');
    GUIDE_SECTIONS[topic].forEach(p => lines.push(`- ${p}`));
    lines.push('');
  }
  lines.push(
    'Key facts:',
    ...JEV_FACTS.map(f => `- ${f}`),
    '',
    `Directory: ${PACK_SITE} (${dir.evals.length} runnable evals, ${dir.builds.length} community builds).`,
    'Next: get_jev_integration_guide for runnable code, list_jev_patterns for reusable decision patterns,',
    'recommend_jev_use_cases to map a product to the closest evals and builds.'
  );

  return toolText(lines.join('\n'));
}

function runIntegrationGuide(dir, args) {
  const sections = ['quickstart', 'questions', 'answers', 'privacy', 'calibration', 'docs'];
  const want = String(args.section || 'all').trim().toLowerCase();

  if (want !== 'all' && !sections.includes(want)) {
    return toolError(`Unknown section "${args.section}". Use one of: ${sections.join(', ')}, all.`);
  }

  const names = {
    quickstart: 'Quickstart',
    questions: 'Question schemas',
    answers: 'Reading answers + confidence',
    privacy: 'Privacy (ZDR / No Training)',
    calibration: 'Calibration',
    docs: 'Official docs'
  };

  const lines = [`Jev integration guide — ${dir.pack.model?.id || 'typesafe-ai/jev'}`, ''];
  for (const section of (want === 'all' ? sections : [want])) {
    if (want === 'all') lines.push(`## ${names[section]}`, '');
    INTEGRATION[section].forEach(line => lines.push(line));
    lines.push('');
  }
  if (want === 'all') {
    lines.push('Copy a runnable eval with get_jev_eval (any of the 50 carries the exact prompt),');
    lines.push('or ask recommend_jev_use_cases which eval to start from for your product.');
  }

  return toolText(lines.join('\n'));
}

function evalById(dir, id) {
  return dir.evalById.get(id) || null;
}

function topMatches(pool, query, limit) {
  const queryTokens = tokens(query);
  if (!queryTokens.length) return [];
  return pool
    .map(item => ({ item, score: scoreEntry(item, queryTokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

function patternBlock(dir, pattern, full) {
  const lines = [`### ${pattern.title}`, `id: ${pattern.id}`, '', pattern.what, '', `When: ${pattern.when}`, '', `Ask: ${pattern.questions}`];

  const refs = pattern.evals
    .map(id => evalById(dir, id))
    .filter(Boolean);
  if (refs.length) {
    lines.push('', `Runnable evals (${refs.length}):`);
    refs.forEach(e => lines.push(`- [eval ${e.n}] ${e.title} (id: ${e.id})`));
  }

  if (full) {
    const builds = topMatches(dir.builds, pattern.buildQuery, 2);
    if (builds.length) {
      lines.push('', 'Closest community proof:');
      builds.forEach(b => {
        const link = (b.links || [])[0]?.url || b.sourceUrl || '';
        lines.push(`- ${b.title}${link ? ` — ${link}` : ''}`);
      });
    }
    lines.push('', `Read an eval in full with get_jev_eval, a build with get_jev_build.`);
  }
  return lines.join('\n');
}

function runListPatterns(dir, args) {
  const id = String(args.id || '').trim().toLowerCase();

  if (id) {
    const pattern = PATTERNS.find(p => p.id === id);
    if (!pattern) {
      return toolError(`No pattern "${args.id}". Available: ${PATTERNS.map(p => p.id).join(', ')}.`);
    }
    return toolText(patternBlock(dir, pattern, true));
  }

  const lines = [
    `${PATTERNS.length} reusable Jev decision patterns. Pass {"id": "<pattern>"} for one in full,`,
    'with its runnable evals and closest community builds.',
    ''
  ];
  PATTERNS.forEach(p => {
    lines.push(`- ${p.id}: ${p.title}`);
    lines.push(`  When: ${snippet(p.when, 140)}`);
  });
  lines.push('', 'Not sure which fits? recommend_jev_use_cases maps a product description to the best-fit patterns.');

  return toolText(lines.join('\n'));
}

function patternScore(pattern, queryTokens) {
  let score = 0;
  for (const token of queryTokens) {
    if (pattern._hay.includes(token)) score += 1;
  }
  return score;
}

function matchedTerms(entry, queryTokens) {
  return queryTokens.filter(t => entry._m.includes(t)).slice(0, 4);
}

function runRecommend(dir, args) {
  const product = String(args.product || '').trim();
  if (!product) {
    return toolError('Describe the product, e.g. {"product": "a support inbox where agents miss refund disclosures"}.');
  }
  if (product.length > 2000) {
    return toolError('Product description is too long — keep it under 2000 characters.');
  }

  const limit = Math.min(10, Math.max(1, Number.isInteger(args.limit) ? args.limit : 6));
  const evalLimit = Math.max(1, Math.ceil(limit / 2));
  const buildLimit = Math.max(1, Math.floor(limit / 2));
  const queryTokens = tokens(product);

  const ranked = PATTERNS
    .map(p => ({ pattern: p, score: patternScore(p, queryTokens) }))
    .sort((a, b) => b.score - a.score);
  const fits = ranked.filter(({ score }) => score > 0).slice(0, 3);
  const patterns = fits.length ? fits : ranked.slice(0, 2);

  const evals = topMatches(dir.evals, product, evalLimit);
  const builds = topMatches(dir.builds, product, buildLimit);

  const lines = [`How Jev can improve: ${snippet(product, 160)}`, ''];

  lines.push(`Best-fit decision patterns (${fits.length ? 'matched to your description' : 'general starting points — describe the product in more detail for a tighter match'}):`);
  patterns.forEach(({ pattern }) => {
    lines.push('', `## ${pattern.title} (${pattern.id})`, pattern.what, `Ask first: ${pattern.questions}`);
  });

  if (evals.length) {
    lines.push('', `Closest runnable evals (${evals.length} of ${dir.evals.length} — copy the prompt with get_jev_eval):`);
    evals.forEach(e => {
      const why = matchedTerms(e, queryTokens);
      lines.push(`- [eval ${e.n}] ${e.title} (id: ${e.id})${why.length ? ` — matches: ${why.join(', ')}` : ''}`);
    });
  }

  if (builds.length) {
    lines.push('', `Closest community builds (${builds.length} of ${dir.builds.length} — read one with get_jev_build):`);
    builds.forEach(b => {
      const why = matchedTerms(b, queryTokens);
      const link = (b.links || [])[0]?.url || b.sourceUrl || '';
      lines.push(`- ${b.title} — ${b.category}${why.length ? ` (matches: ${why.join(', ')})` : ''}${link ? `\n  ${link}` : ''}`);
    });
  }

  if (!evals.length && !builds.length) {
    lines.push('', 'No close eval/build matches — try list_jev_categories to browse, or search_jev with fewer keywords.');
  }

  const first = evals[0];
  lines.push(
    '',
    first
      ? `Suggested first step: get_jev_eval {"id": "${first.id}"}, run its prompt against typesafe-ai/jev, then adapt the questions to your own states.`
      : 'Suggested first step: list_jev_patterns, then copy the closest pattern\u2019s eval and adapt it.',
    'At ~$0.042 per 1M input tokens, judging every record usually costs cents — see explain_jev {"topic": "pricing-limits"}.'
  );

  return toolText(lines.join('\n'));
}

function runManifest(dir) {
  const manifest = dir.pack.manifest || {};
  const lines = [
    `Jev eval manifest${manifest.revision ? ` (rev ${manifest.revision})` : ''}${manifest.snapshot ? ` — snapshot ${manifest.snapshot}` : ''}`,
    ''
  ];
  if (manifest.semantics) lines.push(`Rule: ${manifest.semantics}`, '');
  const counts = manifest.counts || {};
  const q = counts.questions || {};
  lines.push(
    `Evals: ${counts.evals ?? dir.evals.length}` +
    (q.boolean != null ? ` · boolean ${q.boolean}, choice ${q.choice}, score ${q.score}` : ''),
    ''
  );

  const evals = manifest.evals || [];
  if (evals.length) {
    lines.push('Pass rules (exact match per question; an eval passes iff every question matches):');
    evals.forEach(e => lines.push(`- ${e.id}: ${e.pass || JSON.stringify(e.expected)}`));
  } else {
    lines.push('No per-eval pass rules in this pack revision.');
  }
  lines.push('', 'Two runners comparing numbers must quote the same revision.');

  return toolText(lines.join('\n'));
}

const TOOL_RUNNERS = {
  search_jev: runSearch,
  get_jev_eval: runGetEval,
  get_jev_build: runGetBuild,
  list_jev_categories: runListCategories,
  get_jev_pack: runGetPack,
  explain_jev: runExplain,
  get_jev_integration_guide: runIntegrationGuide,
  list_jev_patterns: runListPatterns,
  recommend_jev_use_cases: runRecommend,
  get_jev_eval_manifest: runManifest
};

// ── Resources ───────────────────────────────────────────────────
function guideMarkdown(dir) {
  return [
    '# What is Jev? (agent brief)',
    '',
    ...GUIDE_SECTIONS.overview.map(p => `${p}`),
    '',
    '## The three question types',
    '',
    ...GUIDE_SECTIONS['question-types'].map(p => `- ${p}`),
    '',
    '## When to use it',
    '',
    ...GUIDE_SECTIONS['when-to-use'].map(p => `- ${p}`),
    '',
    '## Pricing and limits',
    '',
    ...GUIDE_SECTIONS['pricing-limits'].map(p => `- ${p}`),
    '',
    '## Key facts',
    '',
    ...JEV_FACTS.map(f => `- ${f}`),
    '',
    `Directory: ${PACK_SITE} — ${dir.evals.length} runnable evals, ${dir.builds.length} community builds.`,
    `Full playbook: ${dir.pack.packUrl || `${PACK_SITE}/capabilities.md`}`,
    ''
  ].join('\n');
}

function playbookMarkdown(dir) {
  const header = [
    '# Jev business playbook + decision patterns',
    '',
    'Field notes from operators running Jev on real business data. The headline run: 20,000 emails, Slacks and transcripts sorted into 8 buckets (upsells, complaints, missed follow-ups, five more) in 7 minutes for $1.45.',
    '',
    '- **Jev is a tool for your models, not another model.** Claude or GPT does the thinking and works out which questions are worth asking; Jev answers those questions across everything you have. It answers many questions at once without losing accuracy, priced on input tokens with output free — so adding a fourth or tenth question barely moves the bill.',
    '- **Retagging beats planning.** Tag what matters today. When the business changes — a new service, a new question — retag all of history for a few dollars instead of predicting the right tags six months ahead. You no longer have to be right the first time.',
    '- **Proactive second brain.** Everyone builds the reactive kind (ask anything, it searches). To flag things without being asked, something must keep re-reading your data for what you care about. That loop is only affordable when asking is nearly free.',
    '- **The hypothesis loop.** Hand the LLM transcripts plus outcomes; it proposes twenty hypotheses about what actually drives results (used the prospect\u2019s name, mentioned a neighbour, gave a reason in ten seconds). Point Jev at history, reclassify every record against all twenty, keep what correlates, repeat.',
    '',
    `Directory: ${PACK_SITE} — ${dir.evals.length} runnable evals, ${dir.builds.length} community builds.`,
    ''
  ];

  const patterns = PATTERNS.map(p => patternBlock(dir, p, true));

  return header.concat(['---', '', '## Decision patterns', ''], patterns.flatMap(p => [p, '', '---', ''])).join('\n');
}

function evalsMarkdown(dir) {
  const header = [
    '# Every runnable Jev eval',
    '',
    `${dir.evals.length} judge-model evals, each with the exact \`state\` and \`experimental_evaluate\` ` +
    'prompt. Run any of them against `typesafe-ai/jev` via the Vercel AI Gateway.',
    '',
    `Directory: ${PACK_SITE} · Pack: ${dir.pack.packUrl || `${PACK_SITE}/capabilities.md`}`,
    ''
  ];

  const body = dir.evals.map(item => {
    const questions = Object.entries(item.questions || {})
      .map(([name, q]) => `- \`${name}\` (${q.type}): ${q.instructions}`)
      .join('\n');
    return [
      `## ${String(item.n).padStart(2, '0')}. ${item.title}`,
      '',
      item.story || '',
      '',
      questions ? `Questions:\n${questions}` : '',
      '',
      '```js',
      item.prompt || '// no prompt published',
      '```',
      ''
    ].filter(Boolean).join('\n');
  });

  return header.concat(body).join('\n');
}

// ── JSON-RPC ────────────────────────────────────────────────────
function ok(id, result) {
  return { jsonrpc: '2.0', id, result };
}

function fail(id, code, message) {
  return { jsonrpc: '2.0', id: id === undefined ? null : id, error: { code, message } };
}

function handleMessage(msg, dir) {
  if (!msg || typeof msg !== 'object' || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') {
    return fail(msg && typeof msg === 'object' ? msg.id : null, -32600, 'Invalid Request: expected JSON-RPC 2.0 with a method.');
  }

  const isNotification = msg.id === undefined || msg.id === null;
  const params = (msg.params && typeof msg.params === 'object') ? msg.params : {};

  // The HTTP layer only loads the directory for methods that need it; any
  // other path reaching here without one gets a clean error, not a crash.
  if (dir == null && NEEDS_DIR.has(msg.method)) {
    if (isNotification) return null;
    return fail(msg.id, -32603, 'Directory not loaded.');
  }

  switch (msg.method) {
    case 'initialize':
      return ok(msg.id, {
        protocolVersion: negotiate(params.protocolVersion),
        capabilities: { tools: {}, resources: {} },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION }
      });

    case 'ping':
      return ok(msg.id, {});

    case 'notifications/initialized':
    case 'notifications/cancelled':
      return null;

    case 'tools/list':
      return ok(msg.id, { tools: TOOLS });

    case 'tools/call': {
      const name = params.name;
      const runner = TOOL_RUNNERS[name];
      if (typeof name !== 'string' || !runner) {
        return fail(msg.id, -32602, `Unknown tool "${name}". Available: ${Object.keys(TOOL_RUNNERS).join(', ')}.`);
      }
      const args = (params.arguments && typeof params.arguments === 'object') ? params.arguments : {};
      try {
        return ok(msg.id, runner(dir, args));
      } catch (err) {
        return fail(msg.id, -32603, `Tool "${name}" failed: ${err.message}`);
      }
    }

    case 'resources/list':
      return ok(msg.id, {
        resources: [
          {
            uri: RESOURCE_URI,
            name: 'Every runnable Jev eval',
            title: 'Every runnable Jev eval',
            mimeType: 'text/markdown',
            description: `All ${dir.evals.length} evals with their state, questions and exact prompts.`
          },
          {
            uri: GUIDE_URI,
            name: 'What is Jev? (agent brief)',
            title: 'What is Jev? (agent brief)',
            mimeType: 'text/markdown',
            description: 'What Jev is and is not, the three question types, when to use it, pricing and limits.'
          },
          {
            uri: PLAYBOOK_URI,
            name: 'Jev business playbook + decision patterns',
            title: 'Jev business playbook + decision patterns',
            mimeType: 'text/markdown',
            description: 'Operator playbook (retag loop, hypothesis loop) plus every reusable decision pattern with eval and build refs.'
          }
        ]
      });

    case 'resources/templates/list':
      return ok(msg.id, { resourceTemplates: [] });

    case 'resources/read': {
      const readers = {
        [RESOURCE_URI]: evalsMarkdown,
        [GUIDE_URI]: guideMarkdown,
        [PLAYBOOK_URI]: playbookMarkdown
      };
      const read = readers[params.uri];
      if (!read) {
        return fail(msg.id, -32602, `Unknown resource "${params.uri}". Available: ${Object.keys(readers).join(', ')}.`);
      }
      // Built markdown is memoised on the dir (which itself lives in the
      // isolate cache): the playbook costs ten scans on first read, then ~0.
      const cached = dir.resourceCache[params.uri];
      const text = cached !== undefined ? cached : (dir.resourceCache[params.uri] = read(dir));
      return ok(msg.id, {
        contents: [{ uri: params.uri, mimeType: 'text/markdown', text }]
      });
    }

    default:
      // Unknown notifications are swallowed; unknown calls get an error.
      if (isNotification || msg.method.startsWith('notifications/')) return null;
      return fail(msg.id, -32601, `Method not found: ${msg.method}.`);
  }
}

// Exported for tests: pure JSON-RPC in / JSON-RPC out against a dir built by
// buildDirectory (indexed entries, lookup maps, counts, resource cache).
export function handleMcp(body, dir) {
  if (Array.isArray(body)) {
    if (!body.length) return fail(null, -32600, 'Invalid Request: empty batch.');
    const out = [];
    for (const msg of body) {
      const res = handleMessage(msg, dir);
      if (res !== null) out.push(res);
    }
    return out.length ? out : null;
  }
  return handleMessage(body, dir);
}

// ── HTTP ────────────────────────────────────────────────────────
function sendJson(body, status = 200, extra = {}) {
  // Compact JSON: no client needs pretty-printing, and the big resources
  // shed real bytes without it.
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...CORS, ...extra }
  });
}

async function handleRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (request.method === 'GET' || request.method === 'HEAD') {
    // No SSE stream here; describe the endpoint instead so a browser or a
    // health check hitting /mcp learns what it is.
    const response = sendJson({
      server: SERVER_NAME,
      version: SERVER_VERSION,
      protocol: 'MCP Streamable HTTP (JSON responses)',
      usage: 'POST JSON-RPC 2.0 messages to this URL.',
      tools: TOOLS.map(tool => tool.name),
      resources: [RESOURCE_URI, GUIDE_URI, PLAYBOOK_URI],
      directory: PACK_SITE
    });
    if (request.method === 'HEAD') {
      return new Response(null, { status: response.status, headers: response.headers });
    }
    return response;
  }

  if (request.method !== 'POST') {
    return sendJson({ error: 'method not allowed — POST a JSON-RPC message to /mcp' }, 405, { allow: 'POST, GET, HEAD, OPTIONS' });
  }

  // Cheap guard before parsing: honest clients declare their size.
  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return sendJson(
      { jsonrpc: '2.0', id: null, error: { code: -32600, message: 'Invalid Request: body too large (max 1 MB).' } },
      413
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return sendJson(
      { jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error: expected a JSON-RPC body.' } },
      400
    );
  }

  const batch = Array.isArray(body) ? body : [body];
  if (batch.length > MAX_BATCH) {
    return sendJson(
      { jsonrpc: '2.0', id: null, error: { code: -32600, message: `Invalid Request: batch too large (max ${MAX_BATCH}).` } },
      400
    );
  }

  // Lazy load: session setup and discovery never touch the assets.
  const needDir = batch.some(m => m && typeof m.method === 'string' && NEEDS_DIR.has(m.method));
  let dir = null;
  if (needDir) {
    try {
      dir = await loadDirectory(request, env);
    } catch (err) {
      return sendJson(
        { jsonrpc: '2.0', id: null, error: { code: -32603, message: `Directory unavailable: ${err.message}` } },
        503
      );
    }
  }

  // Echo the negotiated protocol version for Streamable HTTP clients.
  let negotiated;
  for (const m of batch) {
    if (m && m.method === 'initialize') {
      negotiated = negotiate(m.params && m.params.protocolVersion);
      break;
    }
  }
  const extra = negotiated ? { 'mcp-protocol-version': negotiated } : {};

  const result = handleMcp(body, dir);

  // Notification-only input gets an empty 202, per the MCP spec.
  if (result === null || result === undefined) {
    return new Response(null, { status: 202, headers: { ...CORS, ...extra } });
  }
  return sendJson(result, 200, extra);
}

// Pages advanced mode: _routes.json keeps this running only for /mcp, so
// every other path is served straight from the static assets.
export default {
  fetch(request, env, ctx) {
    return handleRequest({ request, env, ctx });
  }
};
