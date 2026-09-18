#!/usr/bin/env node
/**
 * Build the Jev agent pack: everything an AI agent needs to understand
 * what Jev can do — 50 runnable judge-model evals plus every community
 * build from the Discord import, with project links resolved.
 *
 *   node scripts/build-jev-pack.mjs [--repo everyai-com/jev-directory]
 *
 * Writes jev/capabilities.md, jev/capabilities.json, jev/setup.txt.
 * The pack URL points at the published OSS repo (raw GitHub), so the
 * setup prompt works with a single paste and no worker deploy.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
let JEV_MOD;
try {
  JEV_MOD = await import('../worker/src/data/jev-guide.js');
} catch {
  JEV_MOD = await import('../data/jev-guide.js');
}
const { JEV_CASES, JEV_META, toLibraryCase } = JEV_MOD;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Workspace layout writes into jev/; the exported OSS repo lays flat.
const OUT = (await import('node:fs')).existsSync(join(ROOT, 'jev')) ? join(ROOT, 'jev') : ROOT;

async function readFirst(paths) {
  for (const p of paths) {
    try { return await readFile(p, 'utf8'); } catch { /* try next */ }
  }
  throw new Error(`none readable: ${paths.join(', ')}`);
}

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const REPO = arg('--repo', process.env.JEV_REPO || 'everyai-com/jev-directory');
const PACK_URL = `https://raw.githubusercontent.com/${REPO}/main/capabilities.md`;
const REPO_URL = `https://github.com/${REPO}`;

function fence(text) {
  const longest = (String(text).match(/`+/g) || []).reduce((max, run) => Math.max(max, run.length), 0);
  return '`'.repeat(Math.max(3, longest + 1));
}

// Canonical link identity: x/twitter unify, query strings and trailing
// slashes drop, so the same project shared twice renders one row.
function linkKey(u) {
  try {
    const p = new URL(u);
    let host = p.hostname.replace(/^www\./, '').toLowerCase();
    if (host === 'twitter.com') host = 'x.com';
    return host + p.pathname.replace(/\/+$/, '');
  } catch {
    return String(u);
  }
}

function groupedByCategory(items) {
  const groups = new Map();
  items.forEach(item => {
    if (!groups.has(item.category)) groups.set(item.category, []);
    groups.get(item.category).push(item);
  });
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
}

async function main() {
  const candidates = JSON.parse(await readFirst([join(ROOT, 'discord', 'use-case-candidates.json'), join(ROOT, 'data', 'use-case-candidates.json')]));
  const linkEntries = JSON.parse(await readFirst([join(ROOT, 'discord', 'links.json'), join(ROOT, 'data', 'links.json')]));
  const linksById = Object.fromEntries(linkEntries.map(e => [e.id, e]));
  const generated = new Date().toISOString().slice(0, 10);
  const evals = JEV_CASES.map(toLibraryCase);

  await mkdir(OUT, { recursive: true });

  // ── capabilities.md ──
  const out = [];
  out.push('# Jev Capability Pack');
  out.push('');
  out.push(
    `This is a playbook of what **Jev** (${JEV_META.modelId}) can do: ` +
    `**${evals.length} runnable judge-model evals** with the exact prompt, plus ` +
    `**${candidates.length} real community builds** that use Jev in production, with project links.`
  );
  out.push('');
  out.push('| | |');
  out.push('| --- | --- |');
  out.push(`| Generated | ${generated} |`);
  out.push(`| Model | \`${JEV_META.modelId}\` via ${JEV_META.gatewayBase} |`);
  out.push(`| Pricing | $${JEV_META.inputPricePerMillionTokens} per 1M input tokens |`);
  out.push(`| Auth | \`${JEV_META.apiKeyEnv}\` (${JEV_META.keyPrefix}…) in the environment |`);
  out.push(`| Evals | ${evals.length} runnable |`);
  out.push(`| Community builds | ${candidates.length} with links |`);
  out.push(`| This file | ${PACK_URL} |`);
  out.push(`| Directory + repo | ${REPO_URL} |`);
  out.push('');
  out.push('---');
  out.push('');
  out.push('## Instructions for your agent');
  out.push('');
  out.push(
    'You are an AI agent working for the person who gave you this pack. Jev is a fast, cheap judge ' +
    'model: point it at a transcript, artifact, or decision and it returns structured verdicts. ' +
    'Everything below is something Jev has already done — use it to decide what you can do for them.'
  );
  out.push('');
  out.push('**When they ask for something:**');
  out.push('');
  out.push('1. Match the request to the closest eval or community build below. A near-miss is fine — adapt it.');
  out.push('2. Ask for every missing detail in one round, up front.');
  out.push('3. Then run it: evals execute verbatim through `experimental_evaluate`; builds link to working code to copy from.');
  out.push('4. Verify the outcome and report it with receipts (scores, verdicts, links).');
  out.push('');
  out.push('**When they ask what Jev can do:** summarize the patterns — Boolean checks, choices against criteria, scored rubrics, ' +
    'decision routing, eval harnesses — then name the closest builds and offer to start.');
  out.push('');
  out.push('---');
  out.push('');
  out.push('## Calling Jev');
  out.push('');
  out.push(`Model: \`${JEV_META.modelId}\` on \`${JEV_META.gatewayBase}\`. Auth comes from \`${JEV_META.apiKeyEnv}\` — never paste the key.`);
  out.push('');
  out.push('Question schema (mix freely per eval):');
  out.push('');
  out.push('- `boolean` — `{ type, instructions }`: true/false verdict.');
  out.push('- `choice` — `{ type, instructions, criteria: { key: description } }`: pick one labelled outcome.');
  out.push('- `score` — `{ type, instructions, criteria: [ordered rubric strings] }`: graded score against a rubric.');
  out.push('');
  out.push('Minimal call:');
  out.push('');
  out.push('```js');
  out.push("import { experimental_evaluate } from 'ai';");
  out.push('');
  out.push('const result = await experimental_evaluate({');
  out.push(`  model: '${JEV_META.modelId}',`);
  out.push("  state: '<transcript or artifact under test>',");
  out.push('  questions: { passes: { type: \'boolean\', instructions: \'True only if …\' } },');
  out.push('});');
  out.push('```');
  out.push('');
  out.push('---');
  out.push('');

  // ── Business playbook ──
  out.push('## Business playbook: retag everything');
  out.push('');
  out.push('Field notes from operators running Jev on real business data. The headline run: 20,000 emails, ' +
    'Slacks and transcripts sorted into 8 buckets (upsells, complaints, missed follow-ups, five more) in 7 minutes for $1.45.');
  out.push('');
  out.push('- **Jev is a tool for your models, not another model.** Claude or GPT does the thinking and works out ' +
    'which questions are worth asking; Jev answers those questions across everything you have. It answers many ' +
    'questions at once without losing accuracy, priced on input tokens with output free — so adding a fourth or ' +
    'tenth question barely moves the bill.');
  out.push('- **Retagging beats planning.** Tag what matters today. When the business changes — a new service, a new ' +
    'question — retag all of history for a few dollars instead of predicting the right tags six months ahead. ' +
    'You no longer have to be right the first time.');
  out.push('- **Proactive second brain.** Everyone builds the reactive kind (ask anything, it searches). To flag things ' +
    'without being asked, something must keep re-reading your data for what you care about. That loop is only ' +
    'affordable when asking is nearly free.');
  out.push('- **The hypothesis loop.** Hand the LLM transcripts plus outcomes; it proposes twenty hypotheses about what ' +
    'actually drives results (used the prospect\u2019s name, mentioned a neighbour, gave a reason in ten seconds). ' +
    'Point Jev at history, reclassify every record against all twenty, keep what correlates, repeat. A call centre ' +
    'running hundreds of thousands of calls a day uses exactly this to test what a good call really looks like.');
  out.push('');
  out.push('---');
  out.push('');

  // ── Runnable evals ──
  out.push(`## Runnable evals (${evals.length})`);
  out.push('');
  evals.forEach((item, i) => {
    out.push(`### ${i + 1}. ${item.title}`);
    out.push('');
    if (item.story) out.push(`${item.story}`);
    out.push('');
    out.push(`*${item.description}*`);
    out.push('');
    const mark = fence(item.prompt);
    out.push(`${mark}js`);
    out.push(item.prompt);
    out.push(mark);
    out.push('');
  });
  out.push('---');
  out.push('');

  // ── Community builds ──
  out.push(`## Community builds (${candidates.length})`);
  out.push('');
  out.push('Real things people built with Jev, from the TypeSafe AI #show-and-tell channel. Every entry links its project and its source post.');
  out.push('');
  for (const [category, items] of groupedByCategory(candidates)) {
    out.push(`### ${category} (${items.length})`);
    out.push('');
    items.forEach((item, i) => {
      out.push(`${i + 1}. **${item.title}**`);
      const desc = String(item.description || '').replace(/\s+/g, ' ').trim().slice(0, 900);
      if (desc) out.push(`   - ${desc}`);
      const entry = linksById[String(item.id).replace(/^discord-/, '')] || {};
      const seen = new Set();
      const linkUrls = [];
      for (const u of [...(entry.urls || []), ...(entry.attachments || [])]) {
        const key = linkKey(u);
        if (seen.has(key)) continue;
        seen.add(key);
        linkUrls.push(u);
        if (linkUrls.length >= 5) break;
      }
      for (const u of linkUrls) {
        const m = (entry.meta || {})[u] || {};
        const label = (m.title || u).replace(/\s+/g, ' ').trim().slice(0, 120);
        out.push(`   - [${label}](${u})`);
      }
      out.push(`   - Source: ${item.sourceUrl} (by ${item.handle || 'unknown'})`);
      out.push('');
    });
  }
  out.push('---');
  out.push('');
  out.push(`Pack generated ${generated} from the Jev evaluation guide and ${candidates.length} Discord community posts. ` +
    `Community content is user-generated and unverified — read before you run. Not affiliated with TypeSafe AI. ` +
    `Directory + data: ${REPO_URL}`);
  out.push('');

  await writeFile(join(OUT, 'capabilities.md'), out.join('\n'));

  // ── capabilities.json ──
  const pack = {
    pack: 'jev-capability-pack',
    generated,
    packUrl: PACK_URL,
    repo: REPO_URL,
    model: {
      id: JEV_META.modelId,
      gatewayBase: JEV_META.gatewayBase,
      apiKeyEnv: JEV_META.apiKeyEnv,
      inputPricePerMillionTokens: JEV_META.inputPricePerMillionTokens
    },
    howto: {
      import: "import { experimental_evaluate } from 'ai';",
      call: `experimental_evaluate({ model: '${JEV_META.modelId}', state, questions })`,
      questionTypes: {
        boolean: '{ type, instructions }',
        choice: '{ type, instructions, criteria: { key: description } }',
        score: '{ type, instructions, criteria: [ordered rubric strings] }'
      }
    },
    evals: JEV_CASES.map(entry => {
      const lib = toLibraryCase(entry);
      return {
        id: entry.id, title: entry.title, category: entry.category,
        story: entry.story, state: entry.state, questions: entry.questions,
        prompt: lib.prompt
      };
    }),
    community: candidates.map(item => {
      const entry = linksById[String(item.id).replace(/^discord-/, '')] || {};
      const seen = new Set();
      const links = [];
      for (const u of [...(entry.urls || []), ...(entry.attachments || [])]) {
        const key = linkKey(u);
        if (seen.has(key)) continue;
        seen.add(key);
        const m = (entry.meta || {})[u] || {};
        links.push({ url: u, title: m.title || null, description: (m.desc || '').slice(0, 300) || null });
        if (links.length >= 8) break;
      }
      return {
        title: item.title, category: item.category, description: item.description,
        links, sourceUrl: item.sourceUrl, handle: item.handle || null
      };
    })
  };
  await writeFile(join(OUT, 'capabilities.json'), JSON.stringify(pack, null, 1));

  // ── setup.txt ──
  await writeFile(join(OUT, 'setup.txt'),
    `You are an AI agent. Before we start, load your Jev capability pack and make it your playbook:\n` +
    `${PACK_URL}\n` +
    `It covers ${evals.length} runnable judge-model evals (exact experimental_evaluate prompts) plus ${candidates.length} real community builds with project links — everything Jev can do, with receipts. ` +
    `When I ask for something, match it to the closest eval or build, ask for missing details once, then run it. ` +
    `Model: ${JEV_META.modelId} via the Vercel AI Gateway (${JEV_META.apiKeyEnv}).\n`);

  console.log(`jev pack → ${OUT}/ (repo: ${REPO})`);
  console.log(`  evals: ${evals.length}, community: ${candidates.length}`);
}

main().catch(err => { console.error('pack build failed:', err.message); process.exit(1); });
