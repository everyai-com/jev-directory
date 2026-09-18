# Jev Directory

A browsable directory of what [Jev](https://github.com/typesafe-ai/jev) can do — **50 runnable
judge-model evals** with the exact `experimental_evaluate` prompt, plus **2,300+ real community
builds** from the TypeSafe AI #show-and-tell channel, each linked to its project and source post —
and an **agent pack** you hand to any AI agent in a single paste so it knows the whole landscape.

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
| `capabilities.md` / `capabilities.json` / `setup.txt` | The agent pack: playbook, structured data, paste-into-agent prompt |
| `data/use-case-candidates.json` | Every community build: title, category, description, links, source |
| `data/links.json` | Per-message link index with resolved titles |
| `data/messages-trimmed.json` | Full message archive (id, author, timestamp, content, urls) |
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
> It covers 50 runnable judge-model evals plus 2,300+ real community builds with project links …

(Replace `everyai-com/jev-directory` with your fork if you publish your own copy, then rebuild so
the pack URL inside matches: `node scripts/build-jev-pack.mjs --repo <owner>/<repo>`.)

Every directory card also has **copy brief** — title, description, links and source in one
clipboard paste for the agent you're working with.

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
