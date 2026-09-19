import { JEV_DIR } from './data.js';
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
  try { return new URL(u).hostname.replace(/^www\./, ''); }
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
  return lines.join('\n');
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
function words() { return norm($('q').value.trim()).split(/\s+/).filter(Boolean); }

function renderBest() {
  var host = $('bestRow');
  var sec = $('best');
  if (!host || !sec) return;
  var filtering = words().length > 0 || activeCat !== 'All';
  var list = JEV_DIR.spotlight || [];
  sec.style.display = (!filtering && list.length) ? '' : 'none';
  if (filtering || !list.length) return;
  host.innerHTML = list.map(function (b, k) {
    return '<a class="bestcard" href="./cases/' + b.i + '.html"><span class="rank">' +
      String(k + 1).padStart(2, '0') + '</span><span class="bk">' + esc(b.c) +
      '</span><b>' + esc(b.t) + '</b><span class="bd">' + esc(b.d) + '</span></a>';
  }).join('');
}
function render() {
  renderBest();
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
    $('q').value = ''; activeCat = 'All'; syncCats(); shown = PAGE_SIZE; render(); syncParams();
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
      activeCat = btn.dataset.cat; shown = PAGE_SIZE; syncCats(); render(); syncParams();
    });
  });
}
var _pt = null;
function syncParams() {
  if (_pt) clearTimeout(_pt);
  _pt = setTimeout(function () {
    try {
      var p = new URLSearchParams();
      var q = $('q').value.trim();
      if (q) p.set('q', q);
      if (activeCat !== 'All') p.set('cat', activeCat);
      var s = p.toString();
      history.replaceState(null, '', location.pathname + (s ? '?' + s : ''));
    } catch (e) {}
  }, 250);
}

$('q').addEventListener('input', function () { shown = PAGE_SIZE; render(); syncParams(); });
(function () {
  try {
    var p = new URLSearchParams(location.search);
    var q = p.get('q');
    if (q) $('q').value = q.slice(0, 200);
    var c = p.get('cat');
    if (c && JEV_DIR.community.some(function (i) { return i.c === c; })) activeCat = c;
  } catch (e) {}
})();
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
    var title = e.t;
    if (title.length > 34) {
      var cut = title.slice(0, 34).replace(/\S+$/, '').trim();
      title = (cut.length > 12 ? cut : title.slice(0, 34)) + '…';
    }
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
