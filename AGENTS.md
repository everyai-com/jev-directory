# AGENTS.md

> README for coding agents working in this repo. Humans: start with [README.md](./README.md).

## What this is

A static site (no framework, no build step at runtime, no backend required) + a
Cloudflare Pages advanced-mode worker that serves an MCP endpoint. Live at
<https://jev.magicteams.ai>.

## Setup commands

- Install: nothing — plain Node.js, no dependencies (`node --version` ≥ 18 is enough).
- Regenerate: `node scripts/build-jev-pack.mjs` then `node scripts/build-jev-directory.mjs`
- Local site + MCP check: `wrangler pages dev . --compatibility-date=2026-08-11`
- Deploy: `wrangler pages deploy . --project-name jev-directory --branch main`
  (run from the repo root, passing `.` — see [Deploy](#deploy)).

## Layout

| Path | What it is | Edit? |
| --- | --- | --- |
| `index.html`, `directory.css`, `directory.js`, `data.js` | Generated directory page | No — edit `scripts/build-jev-directory.mjs` |
| `cases/*.html`, `sitemap.xml` | Generated case pages + sitemap | No — same builder |
| `what-is-jev.html`, `jev-like-im-10.html` | Generated guide pages | No — same builder (`guideWhatIs`, `guideEli10`) |
| `capabilities.md`, `capabilities.json`, `setup.txt`, `llms.txt` | Generated agent pack | No — edit `scripts/build-jev-pack.mjs` |
| `what-is-jev.md`, `jev-like-im-10.md` | Hand-written markdown alternates of the guides | Yes, keep in sync with the guide builders |
| `data/use-case-candidates.json`, `data/links.json` | Curated community builds + link index | Yes — then rebuild |
| `data/jev-guide.js`, `data/jev-manifest.js` | The 50 evals + ground-truth verdicts | Yes, in tandem (see below) |
| `_worker.js`, `_routes.json`, `_headers` | MCP worker + Pages routing/headers | Yes |
| `ask.js` | Side-chat widget (retrieval in browser, chat via Workers AI endpoint) | Yes |
| `robots.txt`, `AGENTS.md` | Crawler rules + this file | Yes |

## The one rule: templates are the source of truth

`index.html`, the guides, `cases/*`, `data.js`, and the pack files are all
generated. Never edit them by hand — change the builder template, run both
builders, and let the output fall out. After any builder change, run the full
regenerate and confirm `git status` shows only the intended files.

## Data conventions

- Eval ids are kebab-case slugs (`refund-amount-disclosed`); build page
  filenames are `cases/<id>.html` where id is the candidate id.
- `data/jev-guide.js` (states + questions) and `data/jev-manifest.js`
  (expected verdicts + revision) must change together — both builders validate
  the manifest and fail loudly on drift. Quote the revision when comparing runs.
- `use-case-candidates.json` entries need `id`, `title`, `category`,
  `description`, `sourceUrl`; links resolve from `links.json` by numeric id.
  Optional `claim` / `caveat` / `evidence` (measured|demo|proposal) render as
  case-page callouts, card pills, pack lines, and MCP answers.
- Keep everything dependency-free ESM. No framework, no bundler, no test
  runner — verify with `node --check` and curl smoke tests (see README).

## MCP worker (`_worker.js`)

- Pages advanced-mode worker, scoped to `/mcp` by `_routes.json`. `_worker.js`
  is a reserved Pages filename — never rename it, and it is never served as an
  asset.
- Reads `/capabilities.json` + `/setup.txt` from sibling static assets
  (loaded lazily for data methods only, pre-indexed, memoised per isolate),
  so tools can never disagree with the site. Curated guide/pattern texts
  live in the worker and are versioned with it
  (`SERVER_VERSION` — bump on tool/resource changes).
- The JSON-RPC handler is pure (`handleMcp(body, dir)`); keep it that way so it
  stays testable without a runtime.

## Agent-discovery files

- `llms.txt` follows llmstxt.org v2 (index, not a dump — it points at the MCP
  endpoint and `capabilities.md`, which is the full file). Every HTML page
  carries `<link rel="describedby" href="…/llms.txt">`, plus a markdown
  `rel="alternate"` where one exists.
- `_headers` adds the same `describedby` Link header to static assets.
  `_routes.json` must keep scoping the worker to `/mcp` only.

## Deploy

`wrangler pages deploy . --project-name jev-directory --branch main` from the
repo root. Wrangler resolves `_worker.js` from the working directory, not the
deploy path — deploying from anywhere else silently ships the site without MCP.
After deploy, smoke-test `GET /mcp`, one `tools/call`, `/llms.txt`, and the
`Link` header on `/`.
