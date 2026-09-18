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
.topbar{position:sticky;top:0;z-index:20;background:rgba(11,12,14,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.topbar .in{max-width:1180px;margin:0 auto;padding:10px 22px;display:flex;align-items:center;gap:14px}
.brand{font-family:var(--mono);font-size:13px;letter-spacing:.14em;color:var(--text);text-decoration:none;white-space:nowrap}
.brand b{color:var(--accent);font-weight:700}
.topbar .meta{font-family:var(--mono);font-size:12px;color:var(--faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.topbar .sp{flex:1}
.btn{font-family:var(--mono);font-size:12.5px;border:1px solid var(--line2);background:var(--panel);color:var(--text);border-radius:7px;padding:7px 12px;cursor:pointer;text-decoration:none;white-space:nowrap}
.btn:hover{border-color:var(--accent)}
.btn.solid{background:var(--accent);border-color:var(--accent);color:var(--accent-ink);font-weight:700}
.btn.gh{display:inline-flex;align-items:center;gap:7px}
.btn.gh svg{flex:none;display:block}
.herocta{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:18px 0 0}
.herocta .hint{font-size:13px;color:var(--faint)}
.hero{max-width:1180px;margin:0 auto;padding:44px 22px 8px}
.hero h1{margin:0;font-size:clamp(30px,4.6vw,46px);line-height:1.08;letter-spacing:-.02em;font-weight:750}
.hero h1 .amp{color:var(--accent)}
.hero .lede{margin:12px 0 0;max-width:640px;color:var(--dim);font-size:17px}
.stats{display:flex;gap:0;margin:22px 0 0;border:1px solid var(--line);border-radius:10px;overflow:hidden;flex-wrap:wrap}
.stat{flex:1 1 130px;padding:12px 16px;border-left:1px solid var(--line)}
.stat:first-child{border-left:0}
.stat .n{font-family:var(--mono);font-size:21px;font-weight:700}
.stat .l{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--faint);text-transform:uppercase}
.searchwrap{max-width:1180px;margin:18px auto 0;padding:0 22px}
.searchbox{display:flex;align-items:center;gap:10px;background:var(--panel);border:1px solid var(--line2);border-radius:10px;padding:0 14px}
.searchbox:focus-within{border-color:var(--accent)}
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
.card{background:var(--panel);border:1px solid var(--line);border-radius:11px;padding:15px 16px 13px;transition:border-color .15s ease}
.card:hover{border-color:var(--line2)}
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
footer.site{border-top:1px solid var(--line);margin-top:26px;padding:20px 22px 46px;color:var(--faint);font-size:12.5px}
footer.site .in{max-width:1180px;margin:0 auto}
footer.site a{color:var(--dim)}
.toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%) translateY(8px);background:var(--accent);color:var(--accent-ink);font-family:var(--mono);font-size:13px;font-weight:700;border-radius:8px;padding:9px 18px;opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s ease;z-index:50}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
@media (max-width:920px){.main{grid-template-columns:1fr}.side{position:static;max-height:none}.side .cats{display:flex;overflow-x:auto;gap:6px;padding-bottom:6px}.cat{border:1px solid var(--line2);border-radius:999px;white-space:nowrap}.cat.on{border-color:var(--accent)}.topbar .meta{display:none}}
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
@media (max-width:920px){.topbar .in{overflow-x:auto}}
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
    '</p><pre id="evp' + i + '">' + esc(item.p) + '</pre><div class="row" style="margin-top:10px">' +
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
$('copySetup').addEventListener('click', function () {
  copyText(document.getElementById('setupText').textContent, 'Setup prompt copied');
});
$('statEvals').textContent = JEV_DIR.evals.length;
$('statBuilds').textContent = JEV_DIR.community.length;
$('statLinks').textContent = JEV_DIR.linkedProjects;
$('statCats').textContent = new Set(JEV_DIR.community.map(function (i) { return i.c; })).size;
buildCats(); render();
`;

function pageShell(generated, evalCount, buildCount, linkedCount, setupText) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Jev Directory — ${evalCount} evals, ${buildCount} community builds</title>
<meta name="description" content="Curated Jev use cases: runnable judge-model evals plus real community builds, each linked to its project and source post.">
<link rel="stylesheet" href="./directory.css">
</head>
<body>
<div class="topbar"><div class="in">
<a class="brand" href="#"><b>JEV</b>·DIRECTORY</a>
<span class="meta">${buildCount} builds · ${evalCount} evals · updated ${generated}</span>
<a class="navlink" href="./what-is-jev.html">what is jev</a>
<a class="navlink" href="./jev-like-im-10.html">like i'm 10</a>
<span class="sp"></span>
<a class="btn gh" href="https://github.com/everyai-com/jev-directory" target="_blank" rel="noopener" title="Star or fork on GitHub"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg><span>GitHub</span></a>
<a class="btn" href="./capabilities.md">pack .md</a>
<a class="btn" href="./capabilities.json">pack .json</a>
<button class="btn solid" id="copySetup">copy setup prompt</button>
</div></div>
<pre id="setupText" style="display:none">${setupText.replace(/[<>&]/g, ch => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[ch]))}</pre>
<div class="hero">
<h1>Everything Jev <span class="amp">can do</span>,<br>with receipts.</h1>
<p class="lede">A curated collection of ${buildCount} Jev use cases plus ${evalCount} runnable evals — every build linked to its project and source post. Search it, copy a brief, hand it to your agent.</p>
<div class="herocta"><a class="btn solid" href="https://github.com/everyai-com/jev-directory/issues/new?template=submit-use-case.yml" target="_blank" rel="noopener">Submit your build</a><span class="hint">Takes a minute — just links plus what it does.</span></div>
<div class="newto">New to Jev? <a href="./what-is-jev.html">What it is</a> · <a href="./jev-like-im-10.html">Explained like you're 10</a></div>
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
<div class="sechead"><h2>Runnable evals</h2><span class="count" id="evalCount"></span></div>
<p class="sub">Judge-model evals with the exact <span style="font-family:var(--mono)">experimental_evaluate</span> prompt. Copy one and run it against ${JEV_META.modelId}.</p>
<div id="evals"></div>
</div>
</div>
<footer class="site"><div class="in">Generated ${generated} from the Jev evaluation guide and Discord community posts · Community content is user-generated — read before you run · Not affiliated with TypeSafe AI · <a href="./capabilities.md">Agent pack</a> · <a href="./what-is-jev.html">What is Jev</a> · <a href="./jev-like-im-10.html">Like I'm 10</a> · <a href="https://github.com/everyai-com/jev-directory">GitHub repo</a> · <a href="https://github.com/everyai-com/jev-directory/issues/new?template=submit-use-case.yml">Submit your build</a> · <a href="https://github.com/everyai-com/jev-directory/blob/main/CONTRIBUTING.md">Contribute a case or eval</a></div></footer>
<div class="toast" id="toast"></div>
<script type="module" src="./directory.js"></script>
<script type="module" src="./ask.js"></script>
</body>
</html>
`;
}

function guideShell(title, desc, bodyHtml, generated) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escHtml(title)} — Jev Directory</title>
<meta name="description" content="${escHtml(desc)}">
<link rel="stylesheet" href="./directory.css">
</head>
<body>
<div class="guidepage">
<a class="back" href="./index.html">← directory</a>
${bodyHtml}
<footer class="site"><div>Generated ${generated} · <a href="./index.html">Jev Directory</a> · <a href="./what-is-jev.html">What is Jev</a> · <a href="./jev-like-im-10.html">Like I'm 10</a> · <a href="https://github.com/everyai-com/jev-directory">GitHub</a></div></footer>
</div>
<script type="module" src="./ask.js"></script>
</body>
</html>`;
}

function guideWhatIs() {
  return `<h1>What is Jev?</h1>
<p><b>Jev is a judge model.</b> It does not chat with your customers — it grades the AI that does. You hand it a record of what happened plus the questions you care about, and it returns structured verdicts: yes or no, pick one, or a score.</p>
<h2>How it works</h2>
<ol class="steps">
<li><b>Give it the state</b> — a support transcript, a tool-call log, a piece of agent output. Anything textual that records what happened.</li>
<li><b>Ask questions in plain English</b> — each question names its type (boolean, choice, or score) and the exact rule to apply.</li>
<li><b>Get verdicts back</b> — one answer per question, machine-readable, ready to gate a deploy, trigger a review, or feed a dashboard.</li>
</ol>
<h2>The three question types</h2>
<table>
<tr><th>Type</th><th>Returns</th><th>Example rule</th></tr>
<tr><td>boolean</td><td>true / false</td><td>True only if the agent stated the exact refund amount before asking to proceed.</td></tr>
<tr><td>choice</td><td>one label</td><td>Classify the ticket: billing, shipping, or account.</td></tr>
<tr><td>score</td><td>a number</td><td>Rate the apology 1–5 for empathy and ownership.</td></tr>
</table>
<h2>Calling it</h2>
<p>Jev runs as <b>typesafe-ai/jev</b> through the Vercel AI Gateway, using <b>experimental_evaluate</b> from the AI SDK. Set AI_GATEWAY_API_KEY in your environment — never paste the key into code.</p>
<pre>import { experimental_evaluate } from 'ai';

const result = await experimental_evaluate({
  model: 'typesafe-ai/jev',
  state: 'Customer: I want a refund.\\nAgent: I can refund $42.50 to your card. Shall I go ahead?',
  questions: {
    amount_disclosed: {
      type: 'boolean',
      instructions: 'True only if the agent stated the exact refund amount before asking to proceed.'
    }
  }
});</pre>
<div class="callout">Jev is priced for always-on judging — about <b>$0.042 per million input tokens</b> through the gateway — so running it on every conversation costs less than the coffee you drink while reading the dashboard.</div>
<h2>Go deeper</h2>
<p>This directory holds 50 runnable judge-model evals with the exact prompt, plus hundreds of real community builds with project links. Too dense? Start with <a href="./jev-like-im-10.html">Jev, explained like you're 10</a>. Ready to hand it to an agent? Grab the <a href="./capabilities.md">capability pack</a> — or ask the <b>Ask about Jev</b> panel on this page.</p>`;
}

function guideEli10() {
  return `<h1>Jev, explained like you're 10</h1>
<p>Imagine your school hires a robot to deliver pizza. The robot is fast — but sometimes it forgets to say the price before charging your card. Who checks the robot's work?</p>
<p><b>Jev is the robot's referee.</b> It watches what the robot did, then answers the coach's questions: did it say the price first? Yes or no. Was it polite? Give it stars. That's the whole job — Jev never delivers pizza itself, it just blows the whistle fairly, every single time.</p>
<h2>The three whistles</h2>
<ol class="steps">
<li><b>Yes or no</b> — "Did the robot say $12 before charging?" True or false. No arguing.</li>
<li><b>Pick one</b> — "Was that a pizza problem, a payment problem, or a lost-driver problem?" One label.</li>
<li><b>Stars</b> — "How nice was the apology?" One to five stars, like a game review.</li>
</ol>
<h2>Why robots need a referee</h2>
<p>Grown-ups let AI robots answer customers, move money, and call tools all day. A human can't re-read ten thousand chats — but Jev can, in seconds, for less than a cent. Every verdict is written down, so when something goes wrong there's a replay tape.</p>
<div class="callout">Too simple? Read the <a href="./what-is-jev.html">grown-up version</a> with real code. Want proof instead of words? This directory has <a href="./index.html">50 runnable tests and hundreds of real builds</a> — or just open <b>Ask about Jev</b> and quiz it.</div>`;
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
<link rel="stylesheet" href="../directory.css">
</head>
<body>
<div class="casepage">
<a class="back" href="../index.html">← directory</a>
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
<footer class="site" style="margin:40px 0 0;padding:16px 0 0"><div>Generated ${generated} · <a href="../index.html">Jev Directory</a> · <a href="../what-is-jev.html">What is Jev</a> · <a href="https://github.com/everyai-com/jev-directory">GitHub</a> · <a href="https://github.com/everyai-com/jev-directory/issues/new?template=submit-use-case.yml">Submit your build</a></div></footer>
</div>
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
  const generated = new Date().toISOString().slice(0, 10);
  let setupText = '';
  try { setupText = await readFile(join(OUT, 'setup.txt'), 'utf8'); }
  catch { setupText = 'See capabilities.md in this directory.'; }

  let linkedProjects = 0;
  const data = {
    generated,
    model: JEV_META.modelId,
    evals: JEV_CASES.map(entry => {
      const lib = toLibraryCase(entry);
      const types = [...new Set(Object.values(entry.questions || {}).map(q => q.type))].join(' + ');
      return { t: entry.title, s: entry.story, q: types, p: lib.prompt };
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

  await mkdir(OUT, { recursive: true });
  await writeFile(join(OUT, 'data.js'), `export const JEV_DIR = ${JSON.stringify(data)};\n`);
  await writeFile(join(OUT, 'directory.js'), JS);
  await writeFile(join(OUT, 'directory.css'), CSS);
  await writeFile(join(OUT, 'index.html'),
    pageShell(generated, data.evals.length, data.community.length, linkedProjects, setupText));
  await writeFile(join(OUT, 'what-is-jev.html'),
    guideShell('What is Jev', 'Jev is a judge model: hand it what happened plus plain-English questions, get structured verdicts back.', guideWhatIs(), generated));
  await writeFile(join(OUT, 'jev-like-im-10.html'),
    guideShell("Jev, explained like you're 10", 'Jev is the referee for robots: it watches what an AI did and answers yes-or-no, pick-one, and star-rating questions about it.', guideEli10(), generated));
  const pages = await buildCasePages(candidates, linksById, generated);
  console.log(`  case pages: ${pages - 1} + sitemap.xml`);
  console.log(`jev directory → ${OUT}/  (evals: ${data.evals.length}, builds: ${data.community.length}, linked: ${linkedProjects})`);
}

main().catch(err => { console.error('directory build failed:', err.message); process.exit(1); });
