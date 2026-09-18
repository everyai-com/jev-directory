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
.card .links{margin:10px 0 0;display:flex;flex-direction:column;gap:5px}
.card .links a{display:flex;gap:8px;align-items:baseline;font-size:12.5px;color:var(--text);text-decoration:none;border-top:1px dotted var(--line);padding-top:5px;min-width:0}
.card .links a:hover .t{text-decoration:underline;text-underline-offset:3px}
.card .links .d{font-family:var(--mono);font-size:10.5px;color:var(--faint);flex:none;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.card .links .t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
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
    return '<a href="' + esc(l.u) + '" target="_blank" rel="noopener"><span class="d">' +
      esc(domainOf(l.u)) + '</span><span class="t">' + esc(l.t || l.u) + '</span></a>';
  }).join('');
  return '<article class="card" data-i="' + i + '"><div class="k"><span class="catname">' +
    esc(item.c) + '</span><span class="when">' + esc(timeAgo(item.w)) + '</span></div><h3>' +
    esc(item.t) + '</h3><p class="desc">' + esc(item.d) + '</p><span class="more">read more +</span>' +
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
  document.querySelectorAll('#builds .card').forEach(function (card) {
    var desc = card.querySelector('.desc');
    var more = card.querySelector('.more');
    function open() { card.classList.add('open'); }
    if (desc) desc.addEventListener('click', open);
    if (more) more.addEventListener('click', open);
  });
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
<meta name="description" content="A browsable directory of what Jev can do: 50 runnable judge-model evals and thousands of real community builds with project links.">
<link rel="stylesheet" href="./directory.css">
</head>
<body>
<div class="topbar"><div class="in">
<a class="brand" href="#"><b>JEV</b>·DIRECTORY</a>
<span class="meta">${buildCount} builds · ${evalCount} evals · updated ${generated}</span>
<span class="sp"></span>
<a class="btn" href="./capabilities.md">pack .md</a>
<a class="btn" href="./capabilities.json">pack .json</a>
<button class="btn solid" id="copySetup">copy setup prompt</button>
</div></div>
<pre id="setupText" style="display:none">${setupText.replace(/[<>&]/g, ch => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[ch]))}</pre>
<div class="hero">
<h1>Everything Jev <span class="amp">can do</span>,<br>with receipts.</h1>
<p class="lede">Runnable judge-model evals plus every real build from the TypeSafe AI community — each one linked to its project and source post. Search it, copy a brief, hand it to your agent.</p>
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
<p class="sub">Real things people built with Jev. Click a card to expand, copy a brief to hand it to your agent.</p>
<div class="grid" id="builds"></div>
<div class="morewrap" id="moreWrap"></div>
<div class="sechead"><h2>Runnable evals</h2><span class="count" id="evalCount"></span></div>
<p class="sub">Judge-model evals with the exact <span style="font-family:var(--mono)">experimental_evaluate</span> prompt. Copy one and run it against ${JEV_META.modelId}.</p>
<div id="evals"></div>
</div>
</div>
<footer class="site"><div class="in">Generated ${generated} from the Jev evaluation guide and Discord community posts · Community content is user-generated — read before you run · Not affiliated with TypeSafe AI · <a href="./capabilities.md">Agent pack</a></div></footer>
<div class="toast" id="toast"></div>
<script type="module" src="./directory.js"></script>
</body>
</html>
`;
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
        links.push({ t: (m.title || u).slice(0, 120), u });
        if (links.length >= 4) break;
      }
      if (links.length) linkedProjects++;
      // Card links render as their own rows — drop the pack's linked block here.
      const blurb = String(item.description || '').split('\n\nLinked projects:')[0];
      return {
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
  console.log(`jev directory → ${OUT}/  (evals: ${data.evals.length}, builds: ${data.community.length}, linked: ${linkedProjects})`);
}

main().catch(err => { console.error('directory build failed:', err.message); process.exit(1); });
