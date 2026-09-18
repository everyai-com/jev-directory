# Jev Directory

A browsable directory of what [Jev](https://github.com/typesafe-ai/jev) can do — **50 runnable
judge-model evals** with the exact `experimental_evaluate` prompt, plus **700+ real community
builds** from the TypeSafe AI #show-and-tell channel, each linked to its project and source post —
and an **agent pack** you hand to any AI agent in a single paste so it knows the whole landscape.

**Live site: [jev.magicteams.ai](https://jev.magicteams.ai)** — the directory, hosted. PRs welcome:
fork, edit `data/*.json`, run the two commands under [Regenerate](#regenerate), open a PR.
Built something with Jev? [Submit your build](https://github.com/everyai-com/jev-directory/issues/new?template=submit-use-case.yml)
— a short form, no PR needed.

Open `index.html` in a browser, or serve this folder with any static host. No framework, no build
step, no backend required.

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
| `what-is-jev.html` / `jev-like-im-10.html` | Guide pages: the grown-up explainer and the 10-year-old version, linked from the topbar |
| `capabilities.md` / `capabilities.json` / `setup.txt` | The agent pack: playbook, structured data, paste-into-agent prompt |
| `data/use-case-candidates.json` | Every community build: title, category, description, links, source |
| `data/links.json` | Per-message link index with resolved titles |
| `data/jev-guide.js` | The 50 evals in Jev's question schema (boolean / choice / score) |
| `scripts/build-jev-pack.mjs` | Regenerates the agent pack from `data/` |
| `scripts/build-jev-directory.mjs` | Regenerates the directory from `data/` |

## The agent pack

`capabilities.md` is the playbook: what Jev is, how to call it
(`experimental_evaluate` on `typesafe-ai/jev` via the Vercel AI Gateway), all 50 evals with
runnable prompts, and every community build grouped by category with project links.

Hand it over with the setup prompt (`setup.txt`):

> You are an AI agent. Before we start, load your Jev capability pack and make it your playbook:
> `https://raw.githubusercontent.com/everyai-com/jev-directory/main/capabilities.md`
> It covers 50 runnable judge-model evals plus 700+ real community builds with project links …

(Replace `everyai-com/jev-directory` with your fork if you publish your own copy, then rebuild so
the pack URL inside matches: `node scripts/build-jev-pack.mjs --repo <owner>/<repo>`.)

Every directory card also has **copy brief** — title, description, links and source in one
clipboard paste for the agent you're working with.

## Side chat

The floating **Ask about Jev** panel answers "what can Jev build?" from the
directory itself, with links to the cited builds. Matching runs entirely in
the browser against `data.js`; only the question plus the few matching
entries go to the chat endpoint, which streams back a Workers AI
(`@cf/zai-org/glm-5.3-flash`) answer — no API keys, usage bills to the
worker's Cloudflare account. The widget defaults to the shared worker.
Forks can deploy their own instead:
the worker from the
[muse-use-cases repo](https://github.com/everyai-com/muse-use-cases) with the
`ZHIPU_API_KEY` secret set (free tier works), then point the widget at it:

```js
localStorage.setItem('everyai_jev_api', 'https://<your-worker>.workers.dev');
```

Without a configured endpoint the panel shows a disabled state instead of
erroring — browsing and search always work offline.

## Regenerate

```bash
node scripts/build-jev-pack.mjs        # capabilities.md/.json + setup.txt
node scripts/build-jev-directory.mjs   # index.html + data.js
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
