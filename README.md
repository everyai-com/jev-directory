# Jev Directory

A browsable directory of what [Jev](https://github.com/typesafe-ai/jev) can do — **50 runnable
judge-model evals** with the exact `experimental_evaluate` prompt, plus **1,300+ real community
builds** from the TypeSafe AI #show-and-tell channel, each linked to its project and source post.

Agents get the whole landscape three ways: a **capability pack** you hand over in a single paste,
an **MCP server** (10 tools + 3 resources) they can query live, and an **`llms.txt`** index —
see [Give this to your agent](https://jev.magicteams.ai/index.html#connect).

**Live site: [jev.magicteams.ai](https://jev.magicteams.ai)** — the directory, hosted. PRs welcome:
fork, edit `data/use-case-candidates.json` (builds) or `data/jev-guide.js` + `data/jev-manifest.js`
(evals, always in tandem), run the two commands under [Regenerate](#regenerate), open a PR.
Built something with Jev? [Submit your build](https://github.com/everyai-com/jev-directory/issues/new?template=submit-use-case.yml)
— a short form, no PR needed.

Open `index.html` in a browser, or serve this folder with any static host. No framework, no build
step, no backend required for browsing; the MCP endpoint just needs a Cloudflare Pages deploy
(see [MCP server](#mcp-server)).

```
Jev eval guide (50, runnable) ─┐
Discord #show-and-tell ────────┼─→ scripts/build-*.mjs ─→ index.html + capabilities.md ─→ your agent
resolved project links ────────┘
```

## What's in the box

| Piece | What it does |
| --- | --- |
| `index.html` / `directory.css` / `directory.js` / `data.js` | The directory. Search, categories, newest-first, copy-a-brief per card |
| `ask.js` | Side chat: "what can Jev build?", answered from the directory with links |
| `_worker.js` | MCP server (Pages advanced-mode worker): the directory as agent tools at `/mcp` |
| `_routes.json` | Scopes the worker to `/mcp` — every other path is a plain static asset |
| `what-is-jev.html` / `jev-like-im-10.html` / `decision-patterns.html` | Guide pages: the explainer, the 10-year-old version, and ten decision patterns — all linked from the topbar |
| `what-is-jev.md` / `jev-like-im-10.md` / `decision-patterns.md` | Markdown alternates of the guides (hand-written, `rel="alternate"`) |
| `capabilities.md` / `capabilities.json` / `setup.txt` | The agent pack: playbook, structured data, paste-into-agent prompt |
| `llms.txt` | Agent index (llmstxt.org v2): MCP endpoint, pack, guides, key facts |
| `robots.txt` / `_headers` | Crawlers welcome (incl. AI ones) + `Link: </llms.txt>` on every asset |
| `404.html` / `privacy.html` / `terms.html` | Branded 404 + legal pages, linked from the footer |
| `og.png` / `icon.svg` | Social card + SVG site icon, referenced from every page head |
| `AGENTS.md` | README for coding agents: layout, builders, deploy |
| `data/use-case-candidates.json` | Every community build: title, category, description, links, source |
| `data/links.json` | Per-message link index with resolved titles |
| `data/jev-guide.js` | The 50 evals in Jev's question schema (boolean / choice / score) |
| `data/jev-manifest.js` | Ground truth: expected verdicts, pass rules, dataset revision |
| `scripts/build-jev-pack.mjs` | Regenerates the agent pack from `data/` |
| `scripts/build-jev-directory.mjs` | Regenerates the directory from `data/` |

## The agent pack

`capabilities.md` is the playbook: what Jev is, how to call it
(`experimental_evaluate` on `typesafe-ai/jev` via the Vercel AI Gateway), all 50 evals with
runnable prompts, and every community build grouped by category with project links.

Hand it over with the setup prompt (`setup.txt`):

> You are an AI agent. Before we start, load your Jev capability pack and make it your playbook:
> `https://raw.githubusercontent.com/everyai-com/jev-directory/main/capabilities.md`
> It covers 50 runnable judge-model evals plus 1,300+ real community builds with project links …

(Replace `everyai-com/jev-directory` with your fork if you publish your own copy, then rebuild so
the pack URL inside matches: `node scripts/build-jev-pack.mjs --repo <owner>/<repo>`.)

Every directory card also has **copy brief** — title, description, links and source in one
clipboard paste for the agent you're working with.

## Eval manifest

Every runnable eval pins its definition of success. `capabilities.json` carries a
`manifest` block (and `capabilities.md` a matching section): a **revision** hash over
every state, rubric, and expected verdict, plus the per-eval **expected** verdicts and
**pass** rule. Two runners comparing numbers must quote the same revision.

Rule: exact match per question; an eval passes iff every question matches. Scores use
their rubric scale (1–4 throughout this dataset); booleans and choices match literally.
The revision covers scoring content only — model and gateway travel as metadata, so
re-pointing a runner can't silently change the rev.

Ground truth lives in `data/jev-manifest.js` next to the dataset; both build scripts
validate it before emitting anything, so an edit that forgets the manifest fails loudly.

## Side chat

The floating **Ask about Jev** panel answers "what can Jev build?" from the
directory itself, with links to the cited builds. Matching runs entirely in
the browser against `data.js`; only the question plus the few matching
entries go to the chat endpoint, which streams back a Workers AI
(`@cf/zai-org/glm-5.3-flash`) answer — no API keys, usage bills to the
worker's Cloudflare account. The widget defaults to the shared worker.
Forks can deploy their own instead: deploy the worker from the
[muse-use-cases repo](https://github.com/everyai-com/muse-use-cases) — no secrets
needed, the Workers AI binding bills to your account — then point the widget at it:

```js
localStorage.setItem('everyai_jev_api', 'https://<your-worker>.workers.dev');
```

Without a configured endpoint the panel shows a disabled state instead of
erroring — browsing and search always work offline.

## MCP server

`/mcp` is a dependency-free Model Context Protocol endpoint (Streamable HTTP, plain JSON)
served by a Cloudflare Pages advanced-mode worker (`_worker.js`, scoped to `/mcp` by
`_routes.json`). Point any MCP-compatible agent at it once and it searches the live
directory itself — always current, nothing to re-export:

```json
{
  "mcpServers": {
    "jev-directory": {
      "url": "https://jev.magicteams.ai/mcp"
    }
  }
}
```

| Tool | What it returns |
| --- | --- |
| `search_jev` | Matching evals and builds by keyword, category and kind |
| `get_jev_eval` | One eval in full: state, questions, exact runnable prompt |
| `get_jev_build` | One community build with its project links and source post |
| `list_jev_categories` | Categories with counts for both collections |
| `get_jev_pack` | Model, gateway, call shape, pack URL and the setup prompt |
| `explain_jev` | What Jev is/isn't, when to use it, question types, pricing |
| `get_jev_integration_guide` | Runnable SDK guide: calls, answers, ZDR, calibration, docs |
| `list_jev_patterns` | Reusable decision patterns with eval + build refs |
| `recommend_jev_use_cases` | Given a product description, how Jev can improve it |
| `get_jev_eval_manifest` | Dataset revision, scoring rule, per-eval pass rules |

Three resources, all markdown: `jev://evals` (every eval with its prompt),
`jev://guide` (what-is-Jev agent brief), `jev://playbook` (operator playbook
plus every decision pattern with eval and build refs).

The function reads `/capabilities.json` and `/setup.txt` from the static assets beside it,
so the endpoint can never disagree with what the page shows. No keys, no external
services, no bindings — deploy the folder and it works. Smoke-test it with curl:

```bash
BASE=https://jev.magicteams.ai/mcp
curl -s $BASE -H 'content-type: application/json' -d \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"curl","version":"0"}}}'
curl -s $BASE -H 'content-type: application/json' -d \
  '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_jev","arguments":{"query":"route support tickets","limit":3}}}'
```

## Agent discovery

Three layers, following the [llms.txt v2 spec](https://llmstxt.org) and
Cloudflare's own docs pattern (index file + per-page markdown + MCP):

1. **MCP** (`/mcp`, 10 tools + 3 resources) — the interactive path. An agent
   connected here searches live data instead of crawling 1,118 pages.
2. **`llms.txt`** — the static index: MCP endpoint, capability pack, guides,
   structured data, key facts. Deliberately small; `capabilities.md` is the
   full-content file, and the sitemap covers page URLs.
3. **Per-page discovery** — every HTML page carries
   `<link rel="describedby" href="…/llms.txt">` (plus a markdown
   `rel="alternate"` where one exists), and `_headers` sends the same
   `Link: </llms.txt>; rel="describedby"` header on every static asset.

`robots.txt` explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
Google-Extended, Applebot-Extended…) and points at the sitemap.

## Regenerate

```bash
node scripts/build-jev-pack.mjs        # capabilities.md/.json + setup.txt + llms.txt
node scripts/build-jev-directory.mjs   # index.html + guides + cases + data.js
```

Both read from `data/` and are idempotent. To re-import from Discord, see the worker's
`/api/discord/backfill` in the [muse-use-cases repo](https://github.com/everyai-com/muse-use-cases).

## Credits

Evals are hand-authored judge-model cases run on `typesafe-ai/jev`. Community builds come from
the TypeSafe AI Discord #show-and-tell channel; every entry keeps a link to the post it came
from. Community content is user-generated and unverified — read before you run. Not affiliated
with TypeSafe AI.

## License

[MIT](LICENSE)
