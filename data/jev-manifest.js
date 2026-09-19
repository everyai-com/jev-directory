/* ================================================================
   Eval manifest – ground truth for the 50 Jev judge-model evals.

   The dataset (jev-guide.js) pins the state and the rubric questions,
   but not what counts as passing — so two people running the same demo
   could measure different definitions of success. This module closes
   that gap:

     JEV_EXPECTED  the verdict each question must return on its fixed
                   state (booleans, choice keys, 1-4 scores)
     semantics     exact match per question; an eval passes iff EVERY
                   question matches (no partial credit)
     revision      content hash over states + rubrics + expected, so any
                   definition change bumps the id both runners quote

   The revision deliberately covers only scoring content — model,
   gateway, and snapshot travel alongside as metadata, not as hash
   inputs, so re-pointing a runner never silently changes the rev.

   Judgment calls (rubric-literal readings, flagged for review):
     content-safety/verdict=safe ...... heated venting is explicitly
                                         allowed; nothing removable
     explanation-clarity/clarity=3 .... timeline + reassurance, but the
                                         TTL/A-record jargon blocks 4
     product-review-screen/helpfulness=2  one generic detail ("fast
                                         shipping") lifts it off 1
     sql-answer-quality/correctness=3 . correct results; GROUP BY
                                         ordinals + NULL/timezone edges
     translation-fluency/fluency=2 ... understandable but overly
                                         literal for marketing copy
     escalation-decision/reasoning=3 . state presents the evidence but
                                         makes no explicit call, so the
                                         defensible-weighing bar (3)
   ================================================================ */

import { JEV_CASES, JEV_META } from './jev-guide.js';

export const EVAL_SEMANTICS =
  'Exact match per question against the fixed state; an eval passes iff every question matches. ' +
  'Scores use the rubric scale (1 = first criterion … N = last); booleans and choices match literally.';

export const JEV_EXPECTED = {
  'refund-amount-disclosed': { amount_disclosed: true },
  'human-handoff-offered': { handoff_offered: true },
  'receipt-with-confirmation-number': { has_confirmation: true },
  'card-number-redacted': { no_full_pan: true },
  'answer-cites-sources': { claims_sourced: true },
  'payment-paused-for-approval': { paused_for_approval: true },
  'cancellation-effective-date-stated': { date_explicit: true },
  'health-answer-has-disclaimer': { disclaimer_present: true },
  'quote-matches-price-list': { quote_accurate: true },
  'follow-up-task-scheduled': { followup_dated: true },
  'ticket-priority': { priority: 'p0' },
  'message-sentiment': { sentiment: 'negative' },
  'support-intent-route': { queue: 'billing' },
  'bug-severity': { severity: 'critical' },
  'lead-quality': { tier: 'hot' },
  'content-safety': { verdict: 'safe' },
  'email-tone-check': { tone: 'professional' },
  'meeting-request-triage': { disposition: 'decline' },
  'code-review-verdict': { review_verdict: 'request_changes' },
  'churn-risk': { risk: 'high' },
  'summary-faithfulness': { faithfulness: 1 },
  'review-actionability': { actionability: 1 },
  'apology-quality': { apology: 4 },
  'explanation-clarity': { clarity: 3 },
  'plan-completeness': { completeness: 4 },
  'sql-answer-quality': { correctness: 3 },
  'translation-fluency': { fluency: 2 },
  'headline-strength': { headline: 1 },
  'onboarding-email-quality': { onboarding: 4 },
  'meeting-notes-quality': { notes: 4 },
  'support-transcript-audit': { policy_followed: true, empathy: 4 },
  'refund-chat-triage': { remedy_complete: true, followup_queue: 'shipping' },
  'product-review-screen': { authenticity: 'fake', helpfulness: 2 },
  'agent-handoff-note': { next_step_present: true, handoff_clarity: 4 },
  'invoice-dispute': { duplicate_acknowledged: true, queue: 'technical' },
  'travel-itinerary-check': { timing_feasible: true, itinerary_quality: 4 },
  'password-reset-flow': { no_password_disclosed: true, risk: 'safe' },
  'release-notes-check': { audience: 'end_users', notes_quality: 4 },
  'standup-summary-check': { blocker_kept: true, brevity: 4 },
  'sales-call-review': { close_type: 'soft', technique: 1 },
  'onboarding-checklist-verification': { access_ready: true, equipment_ready: true },
  'moderation-queue-item': { verdict: 'remove', claim_identified: true },
  'newsletter-draft-review': { draft_quality: 4, cta_present: true },
  'interview-feedback-check': { signal: 'strong_hire', evidence_quality: 4 },
  'contract-redline-check': { liability_capped: true, redline_quality: 4 },
  'recipe-adaptation-check': { allergen_removed: true, substitution: 'direct_swap' },
  'fitness-plan-check': { plan_quality: 4, rest_scheduled: true },
  'bug-report-triage': { owner: 'mobile', reproducible: true },
  'doc-search-answer': { groundedness: 4, plan_gate_stated: true },
  'escalation-decision': { response: 'page_now', reasoning: 3 }
};

// Every case must have an expectation for every question, and every
// expectation must be a legal verdict for its rubric. Build scripts
// call this before emitting anything, so a dataset edit that forgets
// the manifest fails loudly instead of shipping a half-defined rev.
export function validateManifest() {
  const errors = [];
  for (const entry of JEV_CASES) {
    const expected = JEV_EXPECTED[entry.id];
    if (!expected) {
      errors.push(`${entry.id}: no expectations`);
      continue;
    }
    for (const [name, q] of Object.entries(entry.questions || {})) {
      const v = expected[name];
      if (v === undefined) {
        errors.push(`${entry.id}.${name}: no expected verdict`);
        continue;
      }
      if (q.type === 'boolean' && typeof v !== 'boolean') {
        errors.push(`${entry.id}.${name}: expected ${JSON.stringify(v)} is not a boolean`);
      }
      if (q.type === 'choice' && !(q.criteria && Object.hasOwn(q.criteria, v))) {
        errors.push(`${entry.id}.${name}: expected ${JSON.stringify(v)} is not a criteria key`);
      }
      if (q.type === 'score') {
        const scale = (q.criteria || []).length;
        if (!Number.isInteger(v) || v < 1 || v > scale) {
          errors.push(`${entry.id}.${name}: expected ${JSON.stringify(v)} is outside the 1-${scale} rubric`);
        }
      }
    }
    for (const name of Object.keys(expected)) {
      if (!entry.questions || !Object.hasOwn(entry.questions, name)) {
        errors.push(`${entry.id}.${name}: expected verdict for an unknown question`);
      }
    }
  }
  for (const id of Object.keys(JEV_EXPECTED)) {
    if (!JEV_CASES.some(c => c.id === id)) errors.push(`${id}: expectations for an unknown case`);
  }
  if (errors.length) throw new Error(`eval manifest invalid:\n- ${errors.join('\n- ')}`);
  return true;
}

function fmtValue(v, q) {
  if (q.type === 'boolean') return v ? 'true' : 'false';
  if (q.type === 'score') return `${v} of ${(q.criteria || []).length}`;
  return String(v);
}

// "pass when amount_disclosed is true and empathy is 4 of 4"
export function evalPassText(entry) {
  const expected = JEV_EXPECTED[entry.id] || {};
  const parts = Object.entries(entry.questions || {}).map(([name, q]) =>
    `${name} is ${fmtValue(expected[name], q)}`);
  return `pass when ${parts.join(' and ')}`;
}

// cyrb53 — tiny dependency-free hash, deterministic in node, workers,
// and browsers. A revision id, not a security boundary.
function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
}

export function datasetRevision() {
  const canon = [...JEV_CASES]
    .sort((a, b) => (a.id < b.id ? -1 : 1))
    .map(c => ({ id: c.id, state: c.state, questions: c.questions, expected: JEV_EXPECTED[c.id] || null }));
  return cyrb53(JSON.stringify(canon));
}

export function evalManifest(entry) {
  return {
    id: entry.id,
    title: entry.title,
    rubric: Object.entries(entry.questions || {}).map(([name, q]) => ({
      name,
      type: q.type,
      instructions: q.instructions,
      ...(q.criteria !== undefined ? { criteria: q.criteria } : {})
    })),
    expected: { ...(JEV_EXPECTED[entry.id] || {}) },
    pass: evalPassText(entry)
  };
}

export function buildDatasetManifest() {
  validateManifest();
  const counts = { boolean: 0, choice: 0, score: 0 };
  for (const c of JEV_CASES) {
    for (const q of Object.values(c.questions || {})) {
      if (counts[q.type] !== undefined) counts[q.type]++;
    }
  }
  return {
    name: 'jev-evals',
    revision: datasetRevision(),
    snapshot: JEV_META.snapshot,
    model: { id: JEV_META.modelId, gatewayBase: JEV_META.gatewayBase },
    semantics: EVAL_SEMANTICS,
    counts: { evals: JEV_CASES.length, questions: counts },
    evals: JEV_CASES.map(evalManifest)
  };
}
