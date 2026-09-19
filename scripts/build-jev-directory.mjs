#!/usr/bin/env node
/**
 * Build the browsable Jev directory: 50 runnable evals + every community
 * build from the Discord import — search, categories, sort, and one-click
 * briefs you can paste into any AI agent.
 *
 *   node scripts/build-jev-directory.mjs
 *
 * Writes jev/index.html, jev/directory.css, jev/directory.js, jev/data.js.
 * Dependency-free — plain ES modules, no framework, no build step.
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
let MAN_MOD;
try {
  MAN_MOD = await import('../worker/src/data/jev-manifest.js');
} catch {
  MAN_MOD = await import('../data/jev-manifest.js');
}
const { JEV_EXPECTED, evalPassText, datasetRevision, validateManifest, EVAL_SEMANTICS } = MAN_MOD;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Workspace layout writes into jev/; the exported OSS repo lays flat.
const OUT = (await import('node:fs')).existsSync(join(ROOT, 'jev')) ? join(ROOT, 'jev') : ROOT;
const PAGE_SIZE = 60;

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

async function readFirst(paths) {
  for (const p of paths) {
    try { return await readFile(p, 'utf8'); } catch { /* try next */ }
  }
  throw new Error(`none readable: ${paths.join(', ')}`);
}

const CSS = `:root{--bg:#0b0c0e;--panel:#121418;--panel2:#171a20;--line:#23272f;--line2:#2e333d;--text:#edeff3;--dim:#9aa0ae;--faint:#626873;--accent:#f5a524;--accent-ink:#1a1206;--mono:ui-monospace,"SF Mono","Cascadia Code",Menlo,Consolas,monospace;--sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--sans);font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased}
.topbar{position:sticky;top:0;z-index:30;background:rgba(11,12,14,.82);-webkit-backdrop-filter:blur(16px) saturate(150%);backdrop-filter:blur(16px) saturate(150%);border-bottom:1px solid var(--line)}
.topbar .in{max-width:1180px;margin:0 auto;padding:11px 22px;display:flex;align-items:center;gap:14px}
.brand{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12.5px;letter-spacing:.13em;color:var(--text);text-decoration:none;white-space:nowrap}
.brand .mark{width:23px;height:23px;border-radius:7px;background:linear-gradient(140deg,var(--accent),#ff7d1f);color:var(--accent-ink);display:grid;place-items:center;font-family:var(--sans);font-size:12px;font-weight:800;letter-spacing:0;box-shadow:0 2px 10px rgba(245,165,36,.28)}
.brand b{color:var(--accent);font-weight:700}
.brand i{font-style:normal;color:var(--faint)}
.topnav{display:flex;align-items:center;gap:2px;margin-left:4px}
.topnav a{font-family:var(--mono);font-size:12.5px;color:var(--dim);text-decoration:none;padding:7px 11px;border-radius:8px;white-space:nowrap;transition:color .15s ease,background .15s ease}
.topnav a:hover{color:var(--text);background:var(--panel2)}
.topnav a.on{color:var(--accent);background:rgba(245,165,36,.1)}
.topbar .sp{flex:1}
.btn{font-family:var(--mono);font-size:12.5px;border:1px solid var(--line2);background:var(--panel);color:var(--text);border-radius:8px;padding:8px 13px;cursor:pointer;text-decoration:none;white-space:nowrap;transition:border-color .15s ease,color .15s ease,background .15s ease,transform .12s ease}
.btn:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px)}
.btn:active{transform:translateY(1px)}
.btn.solid{background:var(--accent);border-color:var(--accent);color:var(--accent-ink);font-weight:700}
.btn.solid:hover{background:#ffb63d;border-color:#ffb63d;color:var(--accent-ink)}
.btn.gh{display:inline-flex;align-items:center;gap:7px}
.btn.gh svg{flex:none;display:block}
.herocta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:24px 0 0}
.herocta .hint{font-size:13.5px;color:var(--faint)}
.herocta .hint a,.lede a{color:var(--accent)}
.hero{position:relative;max-width:1180px;margin:0 auto;padding:58px 22px 6px}
.hero:before{content:"";position:absolute;inset:-140px 0 auto;height:430px;pointer-events:none;background:radial-gradient(560px 250px at 16% 0%,rgba(245,165,36,.14),transparent 70%),radial-gradient(460px 230px at 84% 6%,rgba(92,140,255,.1),transparent 72%)}
.hero>*{position:relative}
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim);border:1px solid var(--line2);background:rgba(18,20,24,.72);border-radius:999px;padding:6px 14px;white-space:nowrap}
.eyebrow .dot{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px rgba(245,165,36,.16)}
.hero h1{margin:20px 0 0;font-size:clamp(33px,5.1vw,54px);line-height:1.03;letter-spacing:-.028em;font-weight:780;text-wrap:balance}
.hero h1 .amp{color:var(--accent)}
.hero .lede{margin:16px 0 0;max-width:680px;color:var(--dim);font-size:17.5px;line-height:1.62}
.hero .lede b{color:var(--text);font-weight:600}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(148px,1fr));gap:1px;margin:32px 0 0;background:var(--line);border:1px solid var(--line);border-radius:13px;overflow:hidden}
.stat{background:var(--panel);padding:16px 18px}
.stat .n{font-family:var(--mono);font-size:23px;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.stat .l{font-family:var(--mono);font-size:10.5px;letter-spacing:.11em;color:var(--faint);text-transform:uppercase;margin-top:3px}
.searchwrap{max-width:1180px;margin:18px auto 0;padding:0 22px}
.searchbox{display:flex;align-items:center;gap:10px;background:var(--panel);border:1px solid var(--line2);border-radius:10px;padding:0 14px}
.searchbox:focus-within{border-color:var(--accent);box-shadow:0 0 0 3px rgba(245,165,36,.14)}
.searchbox svg{flex:none;opacity:.55}
#q{flex:1;background:none;border:0;outline:0;color:var(--text);font-size:16px;padding:13px 0;font-family:var(--sans)}
#q::placeholder{color:var(--faint)}
.kbd{font-family:var(--mono);font-size:11px;color:var(--faint);border:1px solid var(--line2);border-radius:5px;padding:1px 7px}
.main{max-width:1180px;margin:0 auto;padding:20px 22px 40px;display:grid;grid-template-columns:208px 1fr;gap:28px;align-items:start}
.side{position:sticky;top:64px;max-height:calc(100vh - 80px);overflow:auto;padding-bottom:12px}
.side h4{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);margin:4px 0 8px}
.cat{display:flex;justify-content:space-between;align-items:baseline;width:100%;text-align:left;background:none;border:0;border-left:2px solid transparent;color:var(--dim);font-size:14px;padding:7px 10px;cursor:pointer;border-radius:0 6px 6px 0}
.cat:hover{color:var(--text);background:var(--panel)}
.cat.on{color:var(--text);border-left-color:var(--accent);background:var(--panel);font-weight:600}
.cat .c{font-family:var(--mono);font-size:11.5px;color:var(--faint)}
.sechead{display:flex;align-items:baseline;gap:10px;margin:26px 0 4px}
.sechead:first-child{margin-top:2px}
.sechead h2{margin:0;font-size:19px;letter-spacing:-.01em}
.sechead .count{font-family:var(--mono);font-size:12px;color:var(--faint)}
.sechead .sp{flex:1}
.sortsel{font-family:var(--mono);font-size:12px;background:var(--panel);color:var(--dim);border:1px solid var(--line2);border-radius:7px;padding:6px 8px}
.sub{color:var(--dim);font-size:13.5px;margin:0 0 14px;max-width:640px}
.sub a{color:var(--accent)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(295px,1fr));gap:12px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:11px;padding:15px 16px 13px;transition:border-color .18s ease,transform .18s ease,box-shadow .18s ease}
.card:hover{border-color:var(--line2);transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,0,0,.38)}
.card .k{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px}
.card .catname{font-family:var(--mono);font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:var(--accent)}
.card .when{font-family:var(--mono);font-size:11px;color:var(--faint)}
.card h3{margin:0;font-size:15.5px;line-height:1.42;font-weight:650;letter-spacing:-.005em}
.card .desc{margin:8px 0 0;color:var(--dim);font-size:13.5px;line-height:1.55;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;cursor:pointer}
.card.open .desc{-webkit-line-clamp:unset;cursor:default}
.card .more{font-family:var(--mono);font-size:11.5px;color:var(--faint);cursor:pointer;margin-top:5px;display:inline-block}
.card.open .more{display:none}
.card .links{margin:12px 0 0;display:flex;flex-direction:column;gap:7px;border-top:1px solid var(--line);padding-top:9px}
.card .llabel{font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint)}
.card .lnk{display:flex;gap:9px;align-items:center;font-size:12.5px;color:var(--text);text-decoration:none;min-width:0}
.card .lnk:hover .t{text-decoration:underline;text-underline-offset:3px}
.card .lnk img.th{width:62px;height:42px;object-fit:cover;border-radius:6px;flex:none;border:1px solid var(--line)}
.card .lnk img.fv{width:14px;height:14px;flex:none;border-radius:3px}
.card .lnk .tt{min-width:0;display:flex;flex-direction:column}
.card .lnk .t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.card .lnk .d{font-family:var(--mono);font-size:10.5px;color:var(--faint);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.card .foot{display:flex;align-items:center;gap:8px;margin-top:11px;padding-top:9px;border-top:1px solid var(--line);font-size:12px;color:var(--faint)}
.card .foot .by{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
.card .foot a{color:var(--faint)}
.mini{font-family:var(--mono);font-size:11px;border:1px solid var(--line2);background:none;color:var(--dim);border-radius:6px;padding:4px 9px;cursor:pointer;white-space:nowrap}
.mini:hover{color:var(--accent);border-color:var(--accent)}
details.eval{background:var(--panel);border:1px solid var(--line);border-radius:11px;margin-bottom:9px}
details.eval summary{cursor:pointer;padding:12px 16px;font-weight:600;font-size:14.5px;list-style:none;display:flex;gap:10px;align-items:baseline}
details.eval summary::-webkit-details-marker{display:none}
details.eval summary .qn{font-family:var(--mono);font-size:11px;color:var(--accent);flex:none;padding-top:3px}
details.eval summary:hover{background:var(--panel2);border-radius:11px}
details.eval[open] summary{border-bottom:1px solid var(--line);border-radius:11px 11px 0 0}
.evalbody{padding:12px 16px 14px}
.evalbody p{margin:0 0 10px;color:var(--dim);font-size:13.5px}
.evalbody pre{background:#08090b;border:1px solid var(--line);border-radius:8px;padding:12px;overflow:auto;font-size:12px;line-height:1.6;margin:0}
.morewrap{text-align:center;margin:18px 0 6px}
.empty{border:1px dashed var(--line2);border-radius:11px;padding:36px 20px;text-align:center;color:var(--dim)}
.empty svg{opacity:.4;margin-bottom:8px}
.empty .rst{margin-top:10px}
footer.site{border-top:1px solid var(--line);margin-top:34px;padding:44px 22px 34px;color:var(--faint);font-size:13px;background:linear-gradient(180deg,transparent,rgba(18,20,24,.6))}
footer.site .in{max-width:1180px;margin:0 auto}
footer.site .fgrid{display:grid;grid-template-columns:1.7fr 1fr 1fr 1.15fr;gap:34px}
footer.site .fbrand .brand{margin-bottom:13px}
footer.site .fbrand p{margin:0;max-width:340px;line-height:1.65}
footer.site h5{font-family:var(--mono);font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--dim);margin:0 0 12px;font-weight:600}
footer.site .fcol{display:flex;flex-direction:column;align-items:flex-start;gap:9px}
footer.site .fcol a{color:var(--faint);text-decoration:none}
footer.site .fcol a:hover{color:var(--accent)}
footer.site .fbar{display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-top:38px;padding-top:18px;border-top:1px solid var(--line);font-size:12px}
footer.site .fbar a{color:var(--dim);text-decoration:none}
footer.site .fbar a:hover{color:var(--accent)}
footer.site .flinks{display:inline-flex;gap:9px;align-items:center}
footer.site .flinks .sep{color:#3a4049}
.toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%) translateY(8px);background:var(--accent);color:var(--accent-ink);font-family:var(--mono);font-size:13px;font-weight:700;border-radius:8px;padding:9px 18px;opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s ease;z-index:50}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
@media (max-width:920px){.main{grid-template-columns:1fr}.side{position:static;max-height:none}.side .cats{display:flex;overflow-x:auto;gap:6px;padding-bottom:6px}.cat{border:1px solid var(--line2);border-radius:999px;white-space:nowrap;gap:8px;width:auto;flex:none}.cat.on{border-color:var(--accent)}.topbar .meta{display:none}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
.casepage{max-width:760px;margin:0 auto;padding:34px 22px 64px}
.casepage .back{font-family:var(--mono);font-size:12.5px;color:var(--dim);text-decoration:none}
.casepage .back:hover{color:var(--accent)}
.casepage h1{font-size:clamp(24px,3.6vw,33px);line-height:1.2;letter-spacing:-.015em;margin:14px 0 8px}
.casepage .meta{display:flex;gap:10px;align-items:center;font-family:var(--mono);font-size:12px;color:var(--faint);margin-bottom:16px;flex-wrap:wrap}
.casepage .meta .catname{color:var(--accent);text-transform:uppercase;letter-spacing:.09em}
.casepage .body{white-space:pre-wrap;font-size:15.5px;line-height:1.7}
.casepage .links{margin-top:22px;display:flex;flex-direction:column;gap:10px}
.casepage .lnk{display:flex;gap:12px;align-items:center;font-size:13.5px;color:var(--text);text-decoration:none;min-width:0;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px 12px}
.casepage .lnk:hover{border-color:var(--line2)}
.casepage .lnk:hover .t{text-decoration:underline;text-underline-offset:3px}
.casepage .lnk img.th{width:120px;height:76px;object-fit:cover;border-radius:6px;flex:none;border:1px solid var(--line)}
.casepage .lnk img.fv{width:16px;height:16px;flex:none;border-radius:3px}
.casepage .lnk .tt{min-width:0;display:flex;flex-direction:column}
.casepage .lnk .t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.casepage .lnk .d{font-family:var(--mono);font-size:11px;color:var(--faint);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.casepage .lnk .x{font-size:13px;color:var(--dim);margin-top:2px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.casepage .actions{display:flex;gap:10px;margin-top:22px;flex-wrap:wrap}
.casepage .more{margin-top:34px;border-top:1px solid var(--line);padding-top:16px}
.casepage .more h2{font-size:16px;margin:0 0 10px}
.casepage .more a{display:block;color:var(--text);text-decoration:none;padding:7px 0;border-bottom:1px dotted var(--line);font-size:14px}
.casepage .more a:hover{color:var(--accent)}
.card h3 a{color:inherit;text-decoration:none}
.card h3 a:hover{text-decoration:underline;text-underline-offset:3px}
.askfab{position:fixed;right:22px;bottom:22px;z-index:60;display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:13px;font-weight:700;background:var(--accent);color:var(--accent-ink);border:0;border-radius:999px;padding:12px 18px;cursor:pointer;box-shadow:0 6px 24px rgba(0,0,0,.45)}
.askfab:hover{filter:brightness(1.07)}
.askpanel{position:fixed;top:0;right:0;bottom:0;z-index:60;width:min(400px,100vw);background:var(--panel);border-left:1px solid var(--line2);display:flex;flex-direction:column;transform:translateX(102%);transition:transform .22s ease}
.askpanel.on{transform:none}
.askhead{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line)}
.askhead b{display:block;font-size:14.5px}
.askhead span{font-family:var(--mono);font-size:11px;color:var(--faint)}
.askmsgs{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px}
.msg{font-size:13.5px;line-height:1.6;border-radius:10px;padding:9px 12px;max-width:100%;overflow-wrap:break-word}
.msg.user{background:var(--panel2);border:1px solid var(--line2);align-self:flex-end}
.msg.bot{background:#08090b;border:1px solid var(--line);align-self:flex-start;width:100%}
.msg a{color:var(--accent)}
.msg pre{background:#000;border:1px solid var(--line);border-radius:7px;padding:9px;overflow:auto;font-size:12px;margin:8px 0}
.msg code.ic{font-family:var(--mono);font-size:12px;background:var(--panel2);border-radius:4px;padding:1px 5px}
.msg .err{color:#f26d6d}
.typing{display:inline-flex;gap:5px;padding:4px 0}
.typing i{width:7px;height:7px;border-radius:50%;background:var(--faint);animation:askblink 1s infinite}
.typing i:nth-child(2){animation-delay:.2s}.typing i:nth-child(3){animation-delay:.4s}
@keyframes askblink{0%,100%{opacity:.25}50%{opacity:1}}
.askchips{display:flex;flex-direction:column;gap:6px;padding:0 16px 10px}
.askchips button{text-align:left;font-size:12.5px;background:none;border:1px solid var(--line2);color:var(--dim);border-radius:8px;padding:7px 11px;cursor:pointer}
.askchips button:hover{color:var(--accent);border-color:var(--accent)}
.askform{display:flex;gap:8px;padding:0 16px 8px}
.askform input{flex:1;min-width:0;background:var(--panel2);border:1px solid var(--line2);border-radius:8px;color:var(--text);font-size:13.5px;padding:9px 11px;outline:0;font-family:var(--sans)}
.askform input:focus{border-color:var(--accent)}
.askform .btn{padding:8px 14px}
.askfoot{font-family:var(--mono);font-size:10.5px;color:var(--faint);padding:0 16px 14px}
@media (max-width:920px){.askfab{right:14px;bottom:14px}}
@media (prefers-reduced-motion:reduce){.typing i{animation:none}}
.navlink{font-family:var(--mono);font-size:12.5px;color:var(--dim);text-decoration:none;white-space:nowrap}
.navlink:hover{color:var(--accent)}
.newto{margin-top:12px;font-size:13.5px;color:var(--faint)}
.newto a{color:var(--accent)}
.guidepage{max-width:760px;margin:0 auto;padding:34px 22px 64px}
.guidepage h1{font-size:clamp(26px,3.8vw,36px);letter-spacing:-.015em;margin:14px 0 8px;line-height:1.15}
.guidepage h2{font-size:19px;margin:30px 0 8px}
.guidepage p,.guidepage li{color:var(--dim);font-size:15.5px;line-height:1.7}
.guidepage p b,.guidepage li b{color:var(--text)}
.guidepage a{color:var(--accent)}
.guidepage pre{background:#08090b;border:1px solid var(--line);border-radius:8px;padding:12px;overflow:auto;font-size:12.5px;line-height:1.6}
.guidepage table{width:100%;border-collapse:collapse;margin:12px 0;font-size:14px}
.guidepage th,.guidepage td{text-align:left;padding:9px 12px;border-bottom:1px solid var(--line);color:var(--dim);vertical-align:top}
.guidepage th{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint)}
.guidepage td:first-child{font-family:var(--mono);font-size:13px;color:var(--text);white-space:nowrap}
.guidepage .callout{background:var(--panel);border:1px solid var(--line2);border-left:3px solid var(--accent);border-radius:0 10px 10px 0;padding:12px 16px;margin:16px 0}
.guidepage .steps{margin:12px 0;padding:0;list-style:none;counter-reset:st}
.guidepage .steps li{counter-increment:st;position:relative;padding:10px 0 10px 44px;border-bottom:1px dotted var(--line)}
.guidepage .steps li:before{content:counter(st,decimal-leading-zero);position:absolute;left:0;top:12px;font-family:var(--mono);font-size:12px;color:var(--accent)}
.guidepage .back{font-family:var(--mono);font-size:12.5px;color:var(--dim);text-decoration:none}
.guidepage .back:hover{color:var(--accent)}
.guidepage .site{margin:40px 0 0;padding:16px 0 0}
/* ── Connect-your-agent section ──────────────────────────── */
.connect{max-width:1180px;margin:46px auto 0;padding:0 22px}
.connecthead{border-top:1px solid var(--line);padding-top:28px}
.connecthead h2{margin:0;font-size:clamp(21px,2.8vw,25px);letter-spacing:-.02em}
.connecthead p{margin:7px 0 0;color:var(--dim);font-size:14.5px;max-width:640px;line-height:1.6}
.connectgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}
.ccard{background:var(--panel);border:1px solid var(--line);border-radius:13px;padding:20px 20px 18px;display:flex;flex-direction:column;gap:10px}
.ccard .ck{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
.ccard h3{margin:0;font-size:17px;letter-spacing:-.01em}
.ccard p{margin:0;color:var(--dim);font-size:13.5px;line-height:1.6}
.ccard .code{margin:4px 0 0;background:#08090b;border:1px solid var(--line);border-radius:9px;padding:12px 13px;overflow:auto;font-family:var(--mono);font-size:11.5px;line-height:1.7;color:var(--text)}
.ccard .cactions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;padding-top:8px}
.ccard .curl{font-family:var(--mono);font-size:11.5px;color:var(--faint);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* ── Guide pages ─────────────────────────────────────────── */
.guidehero{position:relative;margin:20px 0 30px;padding:26px 26px 24px;border:1px solid var(--line);border-radius:15px;background:linear-gradient(165deg,rgba(245,165,36,.075),rgba(18,20,24,.35) 58%)}
.guidehero .gk{font-family:var(--mono);font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--accent);margin-bottom:11px}
.guidehero h1{font-size:clamp(27px,4.1vw,38px);letter-spacing:-.025em;margin:0;line-height:1.1}
.guidehero .lede{margin:13px 0 0;color:var(--dim);font-size:16.5px;line-height:1.62;max-width:650px}
.gcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:12px;margin:14px 0 6px}
.gcard{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:15px 16px}
.gcard .t{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:9px}
.gcard .num{width:20px;height:20px;border-radius:6px;background:rgba(245,165,36,.12);display:grid;place-items:center;font-size:11px}
.gcard b{display:block;color:var(--text);font-size:14.5px;margin-bottom:4px}
.gcard span{color:var(--dim);font-size:13.5px;line-height:1.6}
.gsplit{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:14px 0}
.gpanel{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px 18px}
.gpanel h4{margin:0 0 9px;font-family:var(--mono);font-size:10.5px;letter-spacing:.11em;text-transform:uppercase;color:var(--faint)}
.gpanel p{margin:0 0 8px;font-size:14px;color:var(--dim);line-height:1.62}
.gpanel p:last-child{margin-bottom:0}
.gpanel.good{border-color:#2d3b2d}
.gpanel.bad{border-color:#3d2d2d}
.gpanel ul{margin:0;padding-left:18px}
.gpanel li{font-size:14px;color:var(--dim);margin-bottom:6px;line-height:1.6}
pre.code{background:#08090b;border:1px solid var(--line);border-radius:10px;padding:14px;overflow:auto;font-family:var(--mono);font-size:12.5px;line-height:1.65;margin:12px 0;color:var(--text)}
.ccard code,.gpanel code,.guidepage code{font-family:var(--mono);font-size:12px;background:var(--panel2);border:1px solid var(--line);border-radius:4px;padding:1px 5px;color:var(--text)}
.coderow{display:flex;align-items:center;gap:10px;margin:14px 0 0;flex-wrap:wrap}
.gfact{display:flex;gap:12px;align-items:baseline;padding:11px 0;border-bottom:1px dotted var(--line);font-size:14.5px}
.gfact b{font-family:var(--mono);font-size:12px;color:var(--accent);flex:none;min-width:104px}
.gfact span{color:var(--dim)}
@media (max-width:960px){footer.site .fgrid{grid-template-columns:1fr 1fr}.connectgrid{grid-template-columns:1fr}.gsplit{grid-template-columns:1fr}}
@media (max-width:920px){.topbar .in{flex-wrap:wrap;gap:10px}.topnav{order:3;width:100%;margin:0;overflow-x:auto}.brand{margin-right:auto}.hero{padding-top:42px}.guidehero{padding:20px 18px}}
@media (max-width:560px){footer.site .fgrid{grid-template-columns:1fr}.connect{margin-top:34px}}
.passrule{font-family:var(--mono);font-size:11.5px;color:var(--accent);margin:0 0 10px}
.passrule span{color:var(--faint)}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#q:focus-visible{outline:none}
::selection{background:rgba(245,165,36,.28)}
.skip{position:absolute;left:-9999px;top:0;background:var(--accent);color:var(--accent-ink);font-family:var(--mono);font-size:12.5px;font-weight:700;padding:9px 14px;border-radius:0 0 8px 0;z-index:100;text-decoration:none}
.skip:focus{left:0}
.hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,355px);gap:40px;align-items:start;margin-top:20px}
.hero h1{margin-top:0}
.hero::before{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,var(--line2) 1px,transparent 1px);background-size:22px 22px;-webkit-mask-image:radial-gradient(ellipse 90% 85% at 18% 0%,#000 25%,transparent 72%);mask-image:radial-gradient(ellipse 90% 85% at 18% 0%,#000 25%,transparent 72%);pointer-events:none}
.hero>*{position:relative}
.proof{font-family:var(--mono);font-size:12px;background:var(--panel);border:1px solid var(--line2);border-radius:12px;overflow:hidden}
.proof .ph{padding:10px 14px;border-bottom:1px dashed var(--line2);color:var(--faint);font-size:11px;display:flex;justify-content:space-between;gap:8px}
.proof .ph b{color:var(--dim);font-weight:600}
.proof .pl{padding:12px 14px;display:flex;flex-direction:column;gap:9px}
.proof .pr{display:flex;justify-content:space-between;gap:10px;color:var(--dim)}
.proof .pr .t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.proof .pr .v{color:var(--accent);white-space:nowrap}
.proof .pf{padding:10px 14px;border-top:1px dashed var(--line2);color:var(--faint);font-size:11px}
.proof .pf b{color:var(--accent);font-weight:600}
@media (max-width:1020px){.hero-grid{grid-template-columns:1fr;gap:26px}.proof{max-width:560px}}
@media (max-width:920px){.topbar a[href$="capabilities.md"]{display:none}.topbar .btn.gh span{display:none}.topbar .btn.gh{padding:8px 10px}.topbar .btn{padding:8px 11px}}
@media (max-width:560px){.eyebrow{font-size:10px;padding:5px 11px;letter-spacing:.05em}.askfab{padding:10px 14px;font-size:12px}.brand i{display:none}.topbar .in{gap:8px;padding:10px 14px}}
`;

const JS = `import { JEV_DIR } from './data.js';
var PAGE_SIZE = 60;
var $ = function (id) { return document.getElementById(id); };
var esc = function (v) {
  return String(v == null ? '' : v).replace(/[&<>'"]/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch];
  });
};
var norm = function (v) { return String(v == null ? '' : v).toLowerCase(); };
var activeCat = 'All';
var sortMode = 'new';
var shown = PAGE_SIZE;

function timeAgo(ts) {
  var t = Date.parse(ts);
  if (!t) return '';
  var s = Math.max(0, (Date.now() - t) / 1000);
  if (s < 3600) return Math.max(1, Math.floor(s / 60)) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  if (s < 86400 * 30) return Math.floor(s / 86400) + 'd ago';
  return new Date(t).toISOString().slice(0, 10);
}
function domainOf(u) {
  try { return new URL(u).hostname.replace(/^www\\./, ''); }
  catch (e) { return ''; }
}
function toast(msg) {
  var el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(function () { el.classList.remove('show'); }, 1800);
}
function copyText(text, msg) {
  function done() { toast(msg || 'Copied'); }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, function () { fallback(); });
  } else { fallback(); }
  function fallback() {
    var area = document.createElement('textarea');
    area.value = text; area.style.position = 'fixed'; area.style.opacity = '0';
    document.body.appendChild(area); area.select();
    try { document.execCommand('copy'); } catch (e) {}
    area.remove(); done();
  }
}
function matchBuild(item, words) {
  if (activeCat !== 'All' && item.c !== activeCat) return false;
  if (!words.length) return true;
  var hay = norm(item.t + ' ' + item.d + ' ' + (item.l || []).map(function (l) { return l.t + ' ' + l.u; }).join(' '));
  return words.every(function (w) { return hay.indexOf(w) >= 0; });
}
function matchEval(item, words) {
  if (!words.length) return true;
  return norm(item.t + ' ' + item.s).indexOf(words.join(' ')) >= 0
    || words.every(function (w) { return norm(item.t + ' ' + item.s + ' ' + item.p).indexOf(w) >= 0; });
}
function briefOf(item) {
  var lines = [item.t, '', item.d];
  (item.l || []).forEach(function (l) { lines.push('- ' + (l.t || l.u) + ': ' + l.u); });
  lines.push('', 'Source: ' + item.u);
  return lines.join('\\n');
}
function buildCard(item, i) {
  var links = (item.l || []).map(function (l) {
    var dom = domainOf(l.u);
    var visual = l.g
      ? '<img class="th" src="' + esc(l.g) + '" alt="" loading="lazy" onerror="this.remove()">'
      : '<img class="fv" src="https://www.google.com/s2/favicons?domain=' + esc(dom) + '&sz=32" alt="" loading="lazy" onerror="this.remove()">';
    return '<a class="lnk" href="' + esc(l.u) + '" target="_blank" rel="noopener">' + visual +
      '<span class="tt"><span class="t">' + esc(l.t || l.u) + '</span><span class="d">' + esc(dom) + '</span></span></a>';
  }).join('');
  if (links) links = '<div class="llabel">Links</div>' + links;
  var page = './cases/' + item.i + '.html';
  return '<article class="card" data-i="' + i + '"><div class="k"><span class="catname">' +
    esc(item.c) + '</span><span class="when">' + esc(timeAgo(item.w)) + '</span></div><h3><a href="' +
    esc(page) + '">' + esc(item.t) + '</a></h3><p class="desc">' + esc(item.d) + '</p><a class="more" href="' +
    esc(page) + '">read more +</a>' +
    (links ? '<div class="links">' + links + '</div>' : '') +
    '<div class="foot"><span class="by">by ' + esc(item.h || 'unknown') +
    ' · <a href="' + esc(item.u) + '" target="_blank" rel="noopener">source</a></span>' +
    '<button class="mini" data-brief="' + i + '">copy brief</button></div></article>';
}
function evalBlock(item, i) {
  return '<details class="eval"><summary><span class="qn">' + String(i + 1).padStart(2, '0') +
    '</span><span>' + esc(item.t) + '</span></summary><div class="evalbody"><p>' + esc(item.s) +
    '</p><div class="passrule">✓ ' + esc(item.v) + ' <span>· manifest ' + JEV_DIR.rev.slice(0, 8) + '</span></div>' +
    '<pre id="evp' + i + '">' + esc(item.p) + '</pre><div class="row" style="margin-top:10px">' +
    '<button class="mini" data-evcopy="evp' + i + '">copy prompt</button><span style="font-family:var(--mono);font-size:11px;color:var(--faint)">experimental_evaluate · ' +
    esc(item.q) + '</span></div></div></details>';
}

var currentBuilds = [];
function words() { return norm($('q').value.trim()).split(/\\s+/).filter(Boolean); }

function render() {
  var w = words();
  var evals = JEV_DIR.evals.filter(function (item) { return matchEval(item, w); });
  var builds = JEV_DIR.community.filter(function (item) { return matchBuild(item, w); });
  builds.sort(function (a, b) {
    if (sortMode === 'az') return a.t.localeCompare(b.t);
    var ta = Date.parse(a.w) || 0, tb = Date.parse(b.w) || 0;
    return sortMode === 'old' ? ta - tb : tb - ta;
  });
  currentBuilds = builds;
  $('evals').innerHTML = evals.length ? evals.map(evalBlock).join('')
    : '<div class="empty">No evals match.</div>';
  renderBuilds();
  $('evalCount').textContent = evals.length + ' of ' + JEV_DIR.evals.length;
  bindCopies($('evals'));
}
function renderBuilds() {
  var slice = currentBuilds.slice(0, shown);
  $('builds').innerHTML = slice.length
    ? slice.map(function (item) { return buildCard(item, JEV_DIR.community.indexOf(item)); }).join('')
    : '<div class="empty"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><div>No builds match.</div><button class="btn rst" id="resetBtn">Reset filters</button></div>';
  $('buildCount').textContent = currentBuilds.length + ' of ' + JEV_DIR.community.length;
  var more = $('moreWrap');
  if (currentBuilds.length > shown) {
    more.innerHTML = '<button class="btn" id="moreBtn">Show more (' +
      (currentBuilds.length - shown) + ' remaining)</button>';
    $('moreBtn').addEventListener('click', function () { shown += PAGE_SIZE; renderBuilds(); });
  } else { more.innerHTML = ''; }
  bindCards();
  var reset = $('resetBtn');
  if (reset) reset.addEventListener('click', function () {
    $('q').value = ''; activeCat = 'All'; syncCats(); shown = PAGE_SIZE; render();
  });
}
function bindCards() {
  document.querySelectorAll('[data-brief]').forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      var item = JEV_DIR.community[Number(btn.dataset.brief)];
      copyText(briefOf(item), 'Brief copied — paste it into your agent');
    });
  });
  bindCopies($('builds'));
}
function bindCopies(root) {
  root.querySelectorAll('[data-evcopy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyText(document.getElementById(btn.dataset.evcopy).innerText, 'Eval prompt copied');
    });
  });
}
function syncCats() {
  document.querySelectorAll('#cats .cat').forEach(function (b) {
    b.classList.toggle('on', b.dataset.cat === activeCat);
  });
}
function buildCats() {
  var counts = {};
  JEV_DIR.community.forEach(function (item) { counts[item.c] = (counts[item.c] || 0) + 1; });
  var cats = ['All'].concat(Object.keys(counts).sort());
  var total = JEV_DIR.community.length;
  $('cats').innerHTML = cats.map(function (c) {
    var n = c === 'All' ? total : counts[c];
    return '<button class="cat' + (c === activeCat ? ' on' : '') + '" data-cat="' + esc(c) +
      '"><span>' + esc(c) + '</span><span class="c">' + n + '</span></button>';
  }).join('');
  document.querySelectorAll('#cats .cat').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeCat = btn.dataset.cat; shown = PAGE_SIZE; syncCats(); render();
    });
  });
}

$('q').addEventListener('input', function () { shown = PAGE_SIZE; render(); });
$('sort').addEventListener('change', function () { sortMode = $('sort').value; shown = PAGE_SIZE; render(); });
document.addEventListener('keydown', function (e) {
  if (e.key === '/' && document.activeElement !== $('q')) { e.preventDefault(); $('q').focus(); }
});
document.querySelectorAll('[data-copy]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var el = document.getElementById(btn.dataset.copy);
    if (el) copyText(el.textContent, btn.dataset.copyMsg || 'Copied');
  });
});
function countUp(id, target) {
  var el = $(id);
  if (!el) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = target; return; }
  var t0 = null, dur = 900;
  function frame(t) {
    if (!t0) t0 = t;
    var k = Math.min(1, (t - t0) / dur);
    k = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(target * k);
    if (k < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function renderProof() {
  var host = $('proof');
  if (!host || !JEV_DIR.evals.length) return;
  var rows = JEV_DIR.evals.slice(0, 3).map(function (e) {
    var q = (e.r && e.r[0]) || [];
    var val = e.x ? e.x[q[0]] : null;
    var disp = val === true ? 'true' : (val === false ? 'false' : String(val));
    var title = e.t.length > 32 ? e.t.slice(0, 32) + '...' : e.t;
    return '<div class="pr"><span class="t">' + esc(title) + '</span><span class="v">' + esc(String(q[0] || '?')) + ' → ' + esc(disp) + ' ✓</span></div>';
  }).join('');
  host.innerHTML = '<div class="ph"><b>experimental_evaluate</b><span>typesafe-ai/jev</span></div>' +
    '<div class="pl">' + rows + '</div>' +
    '<div class="pf">manifest <b>' + esc(JEV_DIR.rev.slice(0, 8)) + '</b> · ' + JEV_DIR.evals.length + ' evals · exact-match</div>';
}
countUp('statEvals', JEV_DIR.evals.length);
countUp('statBuilds', JEV_DIR.community.length);
countUp('statLinks', JEV_DIR.linkedProjects);
countUp('statCats', new Set(JEV_DIR.community.map(function (i) { return i.c; })).size);
renderProof();
buildCats(); render();
`;

const GITHUB_REPO = 'https://github.com/everyai-com/jev-directory';
const SUBMIT_URL = `${GITHUB_REPO}/issues/new?template=submit-use-case.yml`;
const MCP_URL = 'https://jev.magicteams.ai/mcp';
const GH_ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';

// One top bar for every page — index, guides and case pages — so the site
// reads as one product instead of three templates. `base` is '' at the root
// and '../' inside cases/.
function topbar(base, current) {
  const link = (href, label, key) =>
    `<a href="${href}"${key === current ? ' class="on"' : ''}>${label}</a>`;
  return `<div class="topbar"><div class="in">
<a class="brand" href="${base}index.html"><span class="mark">J</span><span><b>JEV</b><i>·DIRECTORY</i></span></a>
<nav class="topnav">${link(`${base}index.html`, 'directory', 'home')}${link(`${base}what-is-jev.html`, 'what is jev', 'what')}${link(`${base}jev-like-im-10.html`, "like i'm 10", 'eli10')}</nav>
<span class="sp"></span>
<a class="btn gh" href="${GITHUB_REPO}" target="_blank" rel="noopener" title="Star or fork on GitHub">${GH_ICON}<span>GitHub</span></a>
<a class="btn" href="${base}capabilities.md">agent pack</a>
<a class="btn solid" href="${base}index.html#connect">connect your agent</a>
</div></div>`;
}

function siteFooter(base, generated) {
  return `<footer class="site"><div class="in">
<div class="fgrid">
<div class="fcol fbrand">
<a class="brand" href="${base}index.html"><span class="mark">J</span><span><b>JEV</b><i>·DIRECTORY</i></span></a>
<p>Everything Jev can do, with receipts: runnable judge-model evals plus real community builds, each linked to the project and the post it came from.</p>
</div>
<div class="fcol"><h5>Directory</h5>
<a href="${base}index.html">All builds</a>
<a href="${base}index.html#evals-section">Runnable evals</a>
<a href="${base}capabilities.md">Capability pack .md</a>
<a href="${base}capabilities.json">Pack .json</a>
</div>
<div class="fcol"><h5>Learn</h5>
<a href="${base}what-is-jev.html">What is Jev?</a>
<a href="${base}jev-like-im-10.html">Explained like you're 10</a>
<a href="https://github.com/typesafe-ai/jev" target="_blank" rel="noopener">typesafe-ai/jev</a>
</div>
<div class="fcol"><h5>Use it from an agent</h5>
<a href="${base}index.html#connect">MCP server</a>
<a href="${base}setup.txt">Setup prompt</a>
<a href="${SUBMIT_URL}" target="_blank" rel="noopener">Submit your build</a>
</div>
</div>
<div class="fbar">
<span>Generated ${generated} · community content is user-generated — read before you run · not affiliated with TypeSafe AI</span>
<span class="flinks"><a href="${base}capabilities.md">agent pack</a><span class="sep">·</span><a href="${GITHUB_REPO}" target="_blank" rel="noopener">GitHub</a><span class="sep">·</span><a href="${GITHUB_REPO}/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener">contribute</a><span class="sep">·</span><a href="${GITHUB_REPO}/blob/main/LICENSE" target="_blank" rel="noopener">MIT</a></span>
</div>
</div></footer>`;
}

function pageShell(generated, evalCount, buildCount, linkedCount, setupText, manifestRev) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Jev Directory — ${evalCount} evals, ${buildCount} community builds</title>
<meta name="description" content="Curated Jev use cases: runnable judge-model evals plus real community builds, each linked to its project and source post.">
<meta property="og:type" content="website">
<meta property="og:title" content="Jev Directory — everything Jev can do, with receipts">
<meta property="og:description" content="Curated Jev use cases: runnable judge-model evals plus real community builds, each linked to its project and source post.">
<meta name="twitter:card" content="summary">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23f5a524'/%3E%3Ctext x='32' y='45' font-family='monospace' font-size='38' font-weight='bold' text-anchor='middle' fill='%231a1206'%3EJ%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="./directory.css">
<link rel="describedby" href="./llms.txt">
<link rel="alternate" type="text/markdown" href="./capabilities.md">
</head>
<body>
${topbar('', 'home')}
<a class="skip" href="#builds">Skip to builds</a>
<div class="hero">
<div class="eyebrow"><span class="dot"></span>Jev on typesafe-ai/jev · updated ${generated}</div>
<div class="hero-grid">
<div class="hero-main">
<h1>Everything Jev <span class="amp">can do</span>,<br>with receipts.</h1>
<p class="lede"><b>${evalCount} runnable judge-model evals</b> and <b>${buildCount} real community builds</b> — every one linked to its project and the post it came from. Search it, copy a brief, or point your agent straight at the MCP endpoint.</p>
<div class="herocta"><a class="btn solid" href="#connect">Connect your agent</a><a class="btn" href="${SUBMIT_URL}" target="_blank" rel="noopener">Submit your build</a><a class="btn" href="./what-is-jev.html">What is Jev?</a></div>
<div class="herocta"><span class="hint">New to all this? <a href="./jev-like-im-10.html">Jev, explained like you're 10</a> takes two minutes.</span></div>
</div>
<aside class="proof" id="proof" aria-label="Sample eval verdicts"></aside>
</div>
<div class="stats">
<div class="stat"><div class="n" id="statEvals">${evalCount}</div><div class="l">runnable evals</div></div>
<div class="stat"><div class="n" id="statBuilds">${buildCount}</div><div class="l">community builds</div></div>
<div class="stat"><div class="n" id="statLinks">${linkedCount}</div><div class="l">linked projects</div></div>
<div class="stat"><div class="n" id="statCats">–</div><div class="l">categories</div></div>
</div>
</div>
<div class="searchwrap"><div class="searchbox">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
<input id="q" type="search" placeholder="Search builds and evals — try \\"rubric\\", \\"router\\", \\"refund\\"…" autocomplete="off">
<span class="kbd">/</span>
</div></div>
<div class="main">
<aside class="side"><h4>Categories</h4><div class="cats" id="cats"></div></aside>
<div>
<div class="sechead"><h2>Community builds</h2><span class="count" id="buildCount"></span><span class="sp"></span>
<select class="sortsel" id="sort"><option value="new">Newest</option><option value="old">Oldest</option><option value="az">A–Z</option></select></div>
<p class="sub">Real things people built with Jev. Open any build for its links, previews and an agent-ready brief.</p>
<div class="grid" id="builds"></div>
<div class="morewrap" id="moreWrap"></div>
<div class="sechead" id="evals-section"><h2>Runnable evals</h2><span class="count" id="evalCount"></span></div>
<p class="sub">Judge-model evals with the exact <span style="font-family:var(--mono)">experimental_evaluate</span> prompt. Copy one and run it against ${JEV_META.modelId}. Manifest ${manifestRev.slice(0, 8)} — every eval lists its pass rule.</p>
<div id="evals"></div>
</div>
</div>
<section class="connect" id="connect">
<div class="connecthead">
<h2>Give this to your agent</h2>
<p>Point any MCP-compatible agent at this directory and it can search all ${evalCount} evals and ${buildCount} builds itself — live, with nothing to copy-paste.</p>
</div>
<div class="connectgrid">
<div class="ccard">
<div class="ck">MCP · Streamable HTTP</div>
<h3>Connect over MCP</h3>
<p>Add this block to your agent's MCP config — Streamable HTTP, no auth, read-only. Every tool is listed below.</p>
<pre class="code" id="mcpConfig">${JSON.stringify({ mcpServers: { 'jev-directory': { url: MCP_URL } } }, null, 2)}</pre>
<div class="cactions"><button class="btn solid" data-copy="mcpConfig" data-copy-msg="MCP config copied">copy config</button><span class="curl">${MCP_URL}</span></div>
</div>
<div class="ccard">
<div class="ck">Capability pack · markdown</div>
<h3>Or hand over the pack</h3>
<p>One paste and your agent fetches the whole playbook: how to call Jev, all ${evalCount} evals with runnable prompts, and every build grouped by category.</p>
<pre class="code" id="packPrompt">${setupText.replace(/[<>&]/g, ch => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[ch]))}</pre>
<div class="cactions"><button class="btn solid" data-copy="packPrompt" data-copy-msg="Setup prompt copied">copy setup prompt</button><a class="btn" href="./capabilities.md">open the pack</a></div>
</div>
<div class="ccard" style="grid-column:1/-1">
<div class="ck">MCP · 10 tools · 3 resources</div>
<h3>What your agent can do</h3>
<div class="gfact"><b>search_jev</b><span>Find evals + builds by keyword, category, kind.</span></div>
<div class="gfact"><b>get_jev_eval</b><span>One eval in full: state, questions, exact runnable prompt.</span></div>
<div class="gfact"><b>get_jev_build</b><span>One community build with project links + source post.</span></div>
<div class="gfact"><b>list_jev_categories</b><span>Categories with counts for both collections.</span></div>
<div class="gfact"><b>get_jev_pack</b><span>Model, gateway, call shape, pack URL, setup prompt.</span></div>
<div class="gfact"><b>explain_jev</b><span>What Jev is/isn't, when to use it, question types, pricing.</span></div>
<div class="gfact"><b>get_jev_integration_guide</b><span>Runnable SDK guide: calls, answers, ZDR, calibration, docs.</span></div>
<div class="gfact"><b>list_jev_patterns</b><span>10 reusable decision patterns with eval + build proof.</span></div>
<div class="gfact"><b>get_jev_eval_manifest</b><span>Dataset revision, scoring rule, per-eval pass rules.</span></div>
<div class="gfact"><b>recommend_jev_use_cases</b><span>Given your product, how Jev can improve it — paste this into any tool call:</span></div>
<pre class="code" id="mcpRecommend">{"product": "a support inbox where agents miss refund disclosures"}</pre>
<p>Resources (markdown): <code>jev://evals</code> every eval with prompts · <code>jev://guide</code> what-is-Jev brief · <code>jev://playbook</code> operator playbook + patterns.</p>
<div class="cactions"><button class="btn solid" data-copy="mcpRecommend" data-copy-msg="Example copied">copy example</button><a class="btn" href="./llms.txt">llms.txt</a><a class="btn" href="./capabilities.md">capability pack</a><a class="btn" href="./capabilities.json">pack .json</a></div>
</div>
</div>
</section>
${siteFooter('', generated)}
<div class="toast" id="toast"></div>
<script type="module" src="./directory.js"></script>
<script type="module" src="./ask.js"></script>
</body>
</html>
`;
}

function guideShell(title, desc, bodyHtml, generated, current) {
  const mdAlternate = current === 'eli10' ? './jev-like-im-10.md' : './what-is-jev.md';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escHtml(title)} — Jev Directory</title>
<meta name="description" content="${escHtml(desc)}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23f5a524'/%3E%3Ctext x='32' y='45' font-family='monospace' font-size='38' font-weight='bold' text-anchor='middle' fill='%231a1206'%3EJ%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="./directory.css">
<link rel="describedby" href="./llms.txt">
<link rel="alternate" type="text/markdown" href="${mdAlternate}">
</head>
<body>
${topbar('', current)}
<div class="guidepage">
${bodyHtml}
${siteFooter('', generated)}
</div>
<div class="toast" id="toast"></div>
<script>
document.querySelectorAll('[data-copy]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var el = document.getElementById(btn.dataset.copy);
    if (!el) return;
    var text = el.textContent;
    var toast = document.getElementById('toast');
    function done() {
      toast.textContent = btn.dataset.copyMsg || 'Copied';
      toast.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(function () { toast.classList.remove('show'); }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var area = document.createElement('textarea');
      area.value = text; area.style.position = 'fixed'; area.style.opacity = '0';
      document.body.appendChild(area); area.select();
      try { document.execCommand('copy'); } catch (e) {}
      area.remove(); done();
    }
  });
});
</script>
<script type="module" src="./ask.js"></script>
</body>
</html>`;
}

function guideWhatIs() {
  return `<div class="guidehero">
<div class="gk">The grown-up version</div>
<h1>What is Jev?</h1>
<p class="lede">Jev is a <b>judge model</b>. It doesn't talk to your customers — it grades the AI that does. You hand it a record of what happened plus the questions you care about, and it answers them in a shape your code can use: true/false, one label, or a score.</p>
</div>

<h2>The 30-second version</h2>
<div class="gcards">
<div class="gcard"><div class="t"><span class="num">1</span>Input</div><b>Give it the state</b><span>A support transcript, a tool-call log, one agent output — any text that records what actually happened.</span></div>
<div class="gcard"><div class="t"><span class="num">2</span>Questions</div><b>Ask in plain English</b><span>Each question declares its type and the exact rule to apply. Nothing to train, no labelled examples to collect.</span></div>
<div class="gcard"><div class="t"><span class="num">3</span>Output</div><b>Get verdicts back</b><span>One answer per question, typed and machine-readable — ready to gate a deploy, page a human, or feed a dashboard.</span></div>
</div>

<h2>Why not just ask a model?</h2>
<div class="gsplit">
<div class="gpanel bad">
<h4>Asking a chat model</h4>
<p>You ask "did the agent state the refund amount?" and get prose back. Sometimes it starts with "Yes" — sometimes with "The agent did state $42.50, however…".</p>
<p>Now you need a parser, and a second model to grade the parser.</p>
</div>
<div class="gpanel good">
<h4>Asking Jev</h4>
<p>You declare each question's type once. Jev returns the verdict in exactly that shape — <code>true</code>, one label from your list, or a number.</p>
<p>No prose to parse, no second opinion to reconcile.</p>
</div>
</div>

<h2>The three question types</h2>
<table>
<tr><th>Type</th><th>Returns</th><th>Example rule</th></tr>
<tr><td>boolean</td><td>true / false</td><td>True only if the agent stated the exact refund amount before asking to proceed.</td></tr>
<tr><td>choice</td><td>one label</td><td>Classify the ticket: billing, shipping, or account.</td></tr>
<tr><td>score</td><td>a number</td><td>Rate the apology 1–5 for empathy and ownership.</td></tr>
</table>

<h2>A whole judgement, end to end</h2>
<p>The <b>state</b> is whatever happened. The <b>questions</b> are what you want to know. Both are just text and types — this is one complete, runnable request:</p>
<pre class="code" id="jevCode">import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: 'Customer: my order arrived damaged, I want a refund.\\n' +
         'Agent: I can refund order #88121 in full: $42.50 back to your ' +
         'Visa ending 4412 within 3-5 business days. Shall I go ahead?',
  questions: {
    amount_disclosed: {
      type: 'boolean',
      instructions: 'True only if the agent stated the exact refund amount ' +
                    '($42.50) before the customer approved.'
    },
    intent: {
      type: 'choice',
      criteria: { billing: 'money or charges', shipping: 'delivery timing', account: 'login or profile' },
      instructions: 'Route this ticket.'
    },
    empathy: {
      type: 'score',
      criteria: ['1 - none', '3 - acknowledged the problem', '5 - owned it and fixed it'],
      instructions: 'Rate how the agent handled the complaint.'
    }
  }
});
// → { amount_disclosed: true, intent: 'billing', empathy: 3 }</pre>
<div class="coderow"><button class="btn" data-copy="jevCode" data-copy-msg="Request copied">copy request</button><span style="font-family:var(--mono);font-size:12px;color:var(--faint)">one call → three typed verdicts</span></div>

<h2>Calling it</h2>
<p>Jev runs as <b>typesafe-ai/jev</b> through the Vercel AI Gateway, called with <code>experimental_evaluate</code> from the AI SDK. Set <code>AI_GATEWAY_API_KEY</code> in your environment — never paste the key into code.</p>

<h2>What it costs, and what it isn't</h2>
<div class="gfact"><b>Model</b><span><code>typesafe-ai/jev</code>, called through the Vercel AI Gateway.</span></div>
<div class="gfact"><b>Price</b><span>About <b>$0.042 per million input tokens</b> — cheap enough to judge every conversation, not just a sample of it.</span></div>
<div class="gfact"><b>Auth</b><span><code>AI_GATEWAY_API_KEY</code> in the environment. Nothing to train, nothing to host, no weights to babysit.</span></div>
<div class="gfact"><b>Not a chatbot</b><span>Jev never answers your customers. It only answers questions about what your agent did.</span></div>
<div class="gfact"><b>Not a classifier</b><span>You don't train it or collect labels. You write the rule in English and it applies that rule.</span></div>

<div class="callout">Ready to see it run? There are <a href="./index.html#evals-section">50 runnable evals</a> in this directory, each with the exact prompt — copy one and run it. Or <a href="./index.html#connect">connect your agent over MCP</a> and let it search them itself.</div>

<h2>Go deeper</h2>
<div class="gcards">
<div class="gcard"><div class="t">Simplify</div><b><a href="./jev-like-im-10.html">Explained like you're 10</a></b><span>The same idea with no jargon — handy for sharing with people who don't live in this world yet.</span></div>
<div class="gcard"><div class="t">Pack</div><b><a href="./capabilities.md">Capability pack</a></b><span>Every eval with its prompt and every community build by category, in one markdown file.</span></div>
<div class="gcard"><div class="t">Agents</div><b><a href="./index.html#connect">MCP endpoint</a></b><span>Hand your agent the directory as tools so it can search builds and evals on its own.</span></div>
</div>`;
}

function guideEli10() {
  return `<div class="guidehero">
<div class="gk">The two-minute version</div>
<h1>Jev, explained like you're 10</h1>
<p class="lede">Imagine your school hires a robot to run the pizza stall. The robot is fast — but sometimes it forgets to say the price before taking your money. Grown-ups are too busy to watch every single order. So they hire a referee.</p>
</div>

<div class="gcards">
<div class="gcard"><div class="t"><span class="num">1</span>The robot</div><b>Does the job</b><span>Answers customers, takes orders, moves money. Fast and usually right — but it's a robot, so sometimes it isn't.</span></div>
<div class="gcard"><div class="t"><span class="num">2</span>The referee</div><b>Checks the job</b><span>That's Jev. It doesn't sell pizza. It watches what the robot did and answers the coach's questions about it.</span></div>
<div class="gcard"><div class="t"><span class="num">3</span>The tape</div><b>Writes it down</b><span>Every answer is saved, so when something goes wrong there's a replay to rewind instead of an argument.</span></div>
</div>

<h2>The three whistles</h2>
<p>Jev can only blow three kinds of whistle. That is the entire vocabulary — and it turns out to be enough:</p>
<div class="gcards">
<div class="gcard"><div class="t">Yes or no</div><b>"Did it say the price first?"</b><span>You get <code>true</code> or <code>false</code> — no "well, kind of". Either the price was said before charging, or it wasn't.</span></div>
<div class="gcard"><div class="t">Pick one</div><b>"Pizza problem, money problem, or lost-driver problem?"</b><span>You get exactly one of the labels you listed. Never two, never a brand-new one it invented.</span></div>
<div class="gcard"><div class="t">Stars</div><b>"How nice was the apology?"</b><span>You get a number, like a game review. 1 is rude, 5 is "they owned it and fixed it".</span></div>
</div>

<h2>One order, start to finish</h2>
<div class="gpanel">
<p><b>The robot did this:</b> "Sorry your pizza is cold! I'll refund your $12 right now. Shall I go ahead?" — and then sent the refund before the customer answered.</p>
<p><b>The coach asks Jev:</b> true or false — did the robot wait for a yes before refunding?</p>
<p><b>Jev says:</b> <code>false</code>.</p>
</div>
<p>Notice what Jev did <b>not</b> do. It didn't decide whether the pizza was actually cold, and it didn't fix anything. It answered one question about what happened — and it answers the tenth time exactly the way it answered the first.</p>

<h2>Why anyone bothers</h2>
<p>Because there are too many orders to check by hand. One busy shop can take thousands of chats a day, and nobody can re-read them. Jev reads all of them in seconds, for less than the price of a gumball, and writes down what it found.</p>

<h2>What the referee can't do</h2>
<div class="gcards">
<div class="gcard"><div class="t">Can't</div><b>Serve the pizza</b><span>Jev doesn't do the job, it only judges whatever did. Ask it to talk to your customers and you've hired the wrong robot.</span></div>
<div class="gcard"><div class="t">Can't</div><b>Guess your rules</b><span>Jev has no idea what "good" means until you say it out loud. Vague question in, wobbly answer out.</span></div>
<div class="gcard"><div class="t">Can't</div><b>Remember yesterday</b><span>Every call starts fresh. Give it the state, ask the questions — that's the whole deal.</span></div>
</div>

<div class="callout">That's really it — the grown-up version is the same three whistles with code attached. <a href="./what-is-jev.html">Read the grown-up version</a>, then go poke at the <a href="./index.html#evals-section">50 runnable tests</a> and the real builds behind them.</div>`;
}

function escHtml(v) {
  return String(v == null ? '' : v).replace(/[&<>'"]/g, ch => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}

function casePage(item, entry, generated) {
  const rawDesc = String(item.description || '');
  const discParts = rawDesc.split('\n\nDiscussion: ');
  const discussion = discParts.length > 1 ? discParts.slice(1).join('\n\nDiscussion: ').trim().split(/\s+/)[0] : null;
  const desc = discParts[0].split('\n\nLinked projects:')[0].trim();
  const seen = new Set();
  const links = [];
  for (const u of [...(entry.urls || []), ...(entry.attachments || [])]) {
    const key = linkKey(u);
    if (seen.has(key)) continue;
    seen.add(key);
    const m = (entry.meta || {})[u] || {};
    let g = m.img || null;
    if (!g && m.kind === 'attachment' && /^image\//.test(m.desc || '')) g = u;
    let dom = u;
    try { dom = new URL(u).hostname.replace(/^www\./, ''); } catch {}
    links.push({ u, t: (m.title || u).slice(0, 140), d: dom, x: (m.desc || '').slice(0, 220), g });
  }
  const brief = [item.title, '', desc, ...links.map(l => `- ${l.t}: ${l.u}`), '', 'Source: ' + item.sourceUrl].join('\n');
  const rows = links.map(l => {
    const visual = l.g
      ? `<img class="th" src="${escHtml(l.g)}" alt="" loading="lazy" onerror="this.remove()">`
      : `<img class="fv" src="https://www.google.com/s2/favicons?domain=${escHtml(l.d)}&sz=32" alt="" loading="lazy" onerror="this.remove()">`;
    return `<a class="lnk" href="${escHtml(l.u)}" target="_blank" rel="noopener">${visual}<span class="tt"><span class="t">${escHtml(l.t)}</span><span class="d">${escHtml(l.d)}</span>${l.x ? `<span class="x">${escHtml(l.x)}</span>` : ''}</span></a>`;
  }).join('');
  return { html: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escHtml(item.title)} — Jev Directory</title>
<meta name="description" content="${escHtml(desc.replace(/\s+/g, ' ').trim().slice(0, 160))}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23f5a524'/%3E%3Ctext x='32' y='45' font-family='monospace' font-size='38' font-weight='bold' text-anchor='middle' fill='%231a1206'%3EJ%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="../directory.css">
<link rel="describedby" href="../llms.txt">
</head>
<body>
${topbar('../', '')}
<div class="casepage">
<h1>${escHtml(item.title)}</h1>
<div class="meta"><span class="catname">${escHtml(item.category)}</span><span>by ${escHtml(item.handle || 'unknown')}</span><span>${escHtml((item.submittedAt || '').slice(0, 10))}</span></div>
<div class="body">${escHtml(desc)}</div>
${rows ? `<div class="llabel" style="font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);margin:22px 0 0">Links</div><div class="links">${rows}</div>` : ''}
<div class="actions">
<button class="btn solid" id="copyBrief">copy brief for your agent</button>
<a class="btn" href="${escHtml(item.sourceUrl)}" target="_blank" rel="noopener">open source</a>
${discussion ? `<a class="btn" href="${escHtml(discussion)}" target="_blank" rel="noopener">discussion</a>` : ''}
</div>
<div class="more"><h2>More in ${escHtml(item.category)}</h2>__MORE__</div>
</div>
${siteFooter('../', generated)}
<div class="toast" id="toast"></div>
<script>
document.getElementById('copyBrief').addEventListener('click', function () {
  var text = ${JSON.stringify(brief)};
  function done() {
    var el = document.getElementById('toast');
    el.textContent = 'Brief copied — paste it into your agent';
    el.classList.add('show');
    setTimeout(function () { el.classList.remove('show'); }, 1800);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, done); }
  else {
    var area = document.createElement('textarea');
    area.value = text; document.body.appendChild(area); area.select();
    try { document.execCommand('copy'); } catch (e) {}
    area.remove(); done();
  }
});
</script>
</body>
</html>`, links };
}

async function buildCasePages(candidates, linksById, generated) {
  const { mkdir: mk } = await import('node:fs/promises');
  await mk(join(OUT, 'cases'), { recursive: true });
  const byCat = new Map();
  candidates.forEach(a => {
    if (!byCat.has(a.category)) byCat.set(a.category, []);
    byCat.get(a.category).push(a);
  });
  const urls = ['index.html', 'what-is-jev.html', 'jev-like-im-10.html'];
  for (const item of candidates) {
    const entry = linksById[String(item.id).replace(/^discord-/, '')] || {};
    const { html } = casePage(item, entry, generated);
    const more = (byCat.get(item.category) || []).filter(a => a.id !== item.id).slice(0, 3)
      .map(a => `<a href="./${a.id}.html">${escHtml(a.title)}</a>`).join('') || '<p class="sub">No others yet.</p>';
    await writeFile(join(OUT, 'cases', `${item.id}.html`), html.replace('__MORE__', more));
    urls.push(`cases/${item.id}.html`);
  }
  const NL = String.fromCharCode(10);
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>' + NL +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + NL +
    urls.map(u => `  <url><loc>./${u}</loc><lastmod>${generated}</lastmod></url>`).join(NL) +
    NL + '</urlset>' + NL;
  await writeFile(join(OUT, 'sitemap.xml'), sitemap);
  return urls.length;
}

async function main() {
  const candidates = JSON.parse(await readFirst([join(ROOT, 'discord', 'use-case-candidates.json'), join(ROOT, 'data', 'use-case-candidates.json')]));
  const linkEntries = JSON.parse(await readFirst([join(ROOT, 'discord', 'links.json'), join(ROOT, 'data', 'links.json')]));
  const linksById = Object.fromEntries(linkEntries.map(e => [e.id, e]));
  validateManifest();
  const manifestRev = datasetRevision();
  const generated = new Date().toISOString().slice(0, 10);
  let setupText = '';
  try { setupText = await readFile(join(OUT, 'setup.txt'), 'utf8'); }
  catch { setupText = 'See capabilities.md in this directory.'; }

  let linkedProjects = 0;
  const data = {
    generated,
    model: JEV_META.modelId,
    rev: manifestRev,
    evals: JEV_CASES.map(entry => {
      const lib = toLibraryCase(entry);
      const types = [...new Set(Object.values(entry.questions || {}).map(q => q.type))].join(' + ');
      return {
        t: entry.title, s: entry.story, q: types, p: lib.prompt,
        r: Object.entries(entry.questions || {}).map(([name, q]) => (
          [name, q.type, q.instructions, q.criteria === undefined ? null : q.criteria])),
        x: { ...(JEV_EXPECTED[entry.id] || {}) },
        v: evalPassText(entry)
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
        var g = m.img || null;
        if (!g && m.kind === 'attachment' && /^image\//.test(m.desc || '')) g = u;
        links.push({ t: (m.title || u).slice(0, 120), u: u, g: g });
        if (links.length >= 4) break;
      }
      if (links.length) linkedProjects++;
      // Card links render as their own rows — drop the pack's linked block here.
      const blurb = String(item.description || '').split('\n\nLinked projects:')[0];
      return {
        i: item.id,
        t: item.title,
        c: item.category,
        d: blurb.replace(/\s+/g, ' ').trim().slice(0, 600),
        u: item.sourceUrl,
        h: item.handle || null,
        w: item.submittedAt || null,
        l: links
      };
    })
  };
  data.linkedProjects = linkedProjects;

  // Ask-assistant knowledge: a compact "about Jev" digest plus a spotlight
  // of the best builds, so the chat answers identity questions and "what
  // can Jev build?" from the finest entries instead of random matches.
  // Spotlight score favors linked projects and substantive write-ups, with
  // a per-category cap so one category can't crowd the list out.
  data.about = [
    `Jev (${JEV_META.modelId}) is a judge model on the Vercel AI Gateway ` +
    `($${JEV_META.inputPricePerMillionTokens}/1M input tokens, key: ${JEV_META.apiKeyEnv}), ` +
    'called with `experimental_evaluate` and a state plus boolean / choice / score questions. ' +
    'It grades agent behavior — refunds, escalations, tool calls, rubric grading — and never chats with end users.',
    'Guides: what-is-jev.html (judge-model explainer, incl. pricing and the AI SDK call shape), ' +
    "jev-like-im-10.html (the referee-for-robots analogy: yes-or-no, pick-one, star-rating questions).",
    `Eval manifest rev ${manifestRev} (${data.evals.length} evals): ${EVAL_SEMANTICS} ` +
    'Every eval ships its exact runnable prompt in the directory.'
  ].join('\n');
  const perCat = {};
  data.spotlight = data.community
    .map(b => ({
      b,
      s: (b.l || []).length * 3 + Math.min(String(b.d || '').length / 250, 2) + (b.h ? 0.5 : 0)
    }))
    .sort((a, b2) => b2.s - a.s)
    .filter(r => {
      if ((perCat[r.b.c] || 0) >= 2) return false;
      perCat[r.b.c] = (perCat[r.b.c] || 0) + 1;
      return true;
    })
    .slice(0, 10)
    .map(r => ({
      i: r.b.i, t: r.b.t, c: r.b.c,
      d: String(r.b.d || '').replace(/\s+/g, ' ').trim().slice(0, 180)
    }));

  await mkdir(OUT, { recursive: true });
  await writeFile(join(OUT, 'data.js'), `export const JEV_DIR = ${JSON.stringify(data)};\n`);
  await writeFile(join(OUT, 'directory.js'), JS);
  await writeFile(join(OUT, 'directory.css'), CSS);
  await writeFile(join(OUT, 'index.html'),
    pageShell(generated, data.evals.length, data.community.length, linkedProjects, setupText, manifestRev));
  await writeFile(join(OUT, 'what-is-jev.html'),
    guideShell('What is Jev?', 'Jev is a judge model: hand it what happened plus plain-English questions and get typed verdicts back — boolean, choice or score.', guideWhatIs(), generated, 'what'));
  await writeFile(join(OUT, 'jev-like-im-10.html'),
    guideShell("Jev, explained like you're 10", 'Jev is the referee for robots: it watches what an AI did and answers yes-or-no, pick-one, and star-rating questions about it.', guideEli10(), generated, 'eli10'));
  const pages = await buildCasePages(candidates, linksById, generated);
  console.log(`  case pages: ${pages - 1} + sitemap.xml`);
  console.log(`jev directory → ${OUT}/  (evals: ${data.evals.length}, builds: ${data.community.length}, linked: ${linkedProjects})`);
}

main().catch(err => { console.error('directory build failed:', err.message); process.exit(1); });
