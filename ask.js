/* Jev Directory side chat — "what can Jev build?"
 *
 * Dependency-free ES module: no framework, no build step, works from
 * file:// — shipped verbatim by export-jev-oss.mjs. Retrieval runs locally
 * (data.js is lazy-imported on first open); only the question plus the few
 * matching entries travel to the worker, which streams an answer back as
 * OpenAI-style SSE. The parser below is deliberately AI-SDK-grade: proper
 * event framing, multi-line data, [DONE], error events, abort support.
 *
 * Pure helpers (renderInline, renderLite, parseSSEBuffer, toks, score,
 * topMatches, contextOf) are exported for tests and use no DOM.
 *
 * Point the widget at a local worker while developing (browser console):
 *   localStorage.setItem('everyai_jev_api', 'http://127.0.0.1:8787');
 */

var API = 'https://everyai-use-cases.everyai-com.workers.dev';
try {
  API = (localStorage.getItem('everyai_jev_api') || API).replace(/\/+$/, '');
} catch (e) { /* private mode — fall back to the default API */ }

// Page-relative base: the widget mounts on index, guides (./) and case
// pages (../). Citation links are rewritten through it.
var BASE = (typeof location !== 'undefined' && location.pathname.indexOf('/cases/') >= 0) ? '../' : './';

var MAX_TURNS = 8;
var MAX_CONTEXT = 9000;
var MAX_QUESTION = 2000;
var STORE_KEY = 'jevAskV1';
var RENDER_THROTTLE_MS = 90;

var DATA = null;
async function dirData() {
  if (!DATA) DATA = (await import(BASE + 'data.js')).JEV_DIR;
  return DATA;
}

var STOP = {};
['what', 'with', 'about', 'does', 'have', 'from', 'that', 'this', 'they', 'them', 'then', 'there', 'their',
 'would', 'could', 'should', 'which', 'when', 'where', 'your', 'you', 'the', 'and', 'for', 'can', 'how',
 'are', 'was', 'were', 'has', 'had', 'its', 'our', 'out', 'use', 'used', 'using', 'show', 'give', 'tell',
 'like', 'such', 'into', 'over', 'some', 'any', 'all', 'per', 'via', 'etc',
 'jev', 'build', 'builds', 'built', 'eval', 'evals', 'evaluation', 'example', 'examples',
 'related', 'thing', 'things'].forEach(function (w) { STOP[w] = 1; });

function norm(v) { return String(v == null ? '' : v).toLowerCase(); }
function toks(s) {
  return norm(s).split(/[^a-z0-9]+/).filter(function (w) { return w.length > 2 && !STOP[w]; });
}
function esc(v) {
  return String(v == null ? '' : v).replace(/[&<>'"]/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch];
  });
}

// Score directory entries against the question; title hits weigh most.
function score(hayFields, words) {
  var s = 0;
  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    if (hayFields[0].indexOf(w) >= 0) s += 3;
    if (hayFields[1].indexOf(w) >= 0) s += 2;
    if (hayFields[2].indexOf(w) >= 0) s += 1;
  }
  return s;
}

function topMatches(words, items, fieldsOf, n) {
  return items.map(function (item, idx) {
    return { item: item, idx: idx, s: score(fieldsOf(item), words) };
  }).filter(function (r) { return r.s > 0; })
    .sort(function (a, b) { return b.s - a.s; })
    .slice(0, n);
}

// Compact context for the model: about-Jev digest, spotlight best
// builds, matched builds + evals, and the category census so "what
// kinds of things" questions still land. Returns the prompt text plus
// the matches themselves, so the UI can render source chips.
function contextOf(question, dir) {
  var words = toks(question);
  var lines = [];
  lines.push('Directory: ' + dir.evals.length + ' runnable evals, ' +
    dir.community.length + ' community builds, ' + dir.linkedProjects + ' linked projects.');
  if (dir.about) lines.push('About Jev: ' + dir.about.replace(/\s+/g, ' '));
  var counts = {};
  dir.community.forEach(function (b) { counts[b.c] = (counts[b.c] || 0) + 1; });
  lines.push('Categories: ' + Object.keys(counts).sort().map(function (c) {
    return c + ' (' + counts[c] + ')';
  }).join(', '));
  (dir.spotlight || []).forEach(function (b) {
    lines.push('- [spotlight] "' + b.t + '" (' + b.c + ') — page: cases/' + b.i + '.html — ' + b.d);
  });

  var builds = topMatches(words, dir.community, function (b) {
    return [norm(b.t), norm(b.c), norm(b.d + ' ' + (b.k || '') + ' ' + (b.v || '') + ' ' + (b.l || []).map(function (l) { return l.t; }).join(' '))];
  }, 8);
  var evals = topMatches(words, dir.evals, function (e) {
    return [norm(e.t), '', norm(e.s)];
  }, 4);

  builds.forEach(function (r) {
    var b = r.item;
    lines.push('- [build] "' + b.t + '" (' + b.c + ')' + (b.e ? ' [evidence: ' + b.e + ']' : '') + ' — page: cases/' + b.i + '.html');
    lines.push('  ' + String(b.d || '').replace(/\s+/g, ' ').slice(0, 280));
    if (b.k) lines.push('  Claim: ' + String(b.k).replace(/\s+/g, ' ').slice(0, 200));
    if (b.v) lines.push('  Caveat: ' + String(b.v).replace(/\s+/g, ' ').slice(0, 200));
    (b.l || []).slice(0, 2).forEach(function (l) {
      lines.push('  link: ' + l.t.slice(0, 80) + ' — ' + l.u);
    });
  });
  evals.forEach(function (r) {
    lines.push('- [eval ' + (r.idx + 1) + '] "' + r.item.t + '" (' + r.item.q + ')');
    lines.push('  ' + String(r.item.s || '').replace(/\s+/g, ' ').slice(0, 200) + ' (runnable prompt in the directory)');
  });
  if (!builds.length && !evals.length) lines.push('(no direct matches — answer from the directory overview above)');

  var out = lines.join('\n');
  return {
    text: out.length > MAX_CONTEXT ? out.slice(0, MAX_CONTEXT) : out,
    builds: builds.map(function (r) { return r.item; }),
    evals: evals.map(function (r) { return { n: r.idx + 1, t: r.item.t }; })
  };
}

// ── Chat markdown ───────────────────────────────────────────────
// Everything is escaped first so model output can never inject HTML.
// Only relative directory paths and http(s) URLs ever become links.
function linkify(text) {
  return text
    .replace(/\[([^\]]+)\]\((cases\/[A-Za-z0-9_.-]+\.html|(?:\.\.\/|\.\/)?(?:index\.html(?:#[A-Za-z0-9-]+)?|what-is-jev\.html|jev-like-im-10\.html|capabilities\.md))\)/g, function (m, t, u) {
      u = u.replace(/^\.\.\//, '').replace(/^\.\//, '');
      return '<a href="' + BASE + u + '">' + t + '</a>';
    })
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
}

function renderInline(text) {
  return linkify(esc(text)
    .replace(/`([^`\n]+)`/g, '<code class="ic">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'));
}

function isTableSep(line) {
  return /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(line) && line.indexOf('|') >= 0 && /---?/.test(line);
}

function splitRow(line) {
  return String(line).trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); });
}

function renderLite(src) {
  var lines = String(src || '').split('\n');
  var out = [];
  var para = [];
  var i = 0;

  function flushPara() {
    if (!para.length) return;
    out.push('<p>' + renderInline(para.join('\n')).replace(/\n/g, '<br>') + '</p>');
    para = [];
  }

  while (i < lines.length) {
    var line = lines[i];

    // Fenced code (tolerates an unclosed fence mid-stream).
    var fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      flushPara();
      var code = [];
      i++;
      while (i < lines.length && !lines[i].match(/^```\s*$/)) code.push(lines[i++]);
      if (i < lines.length) i++; // consume closing fence
      var label = fence[1] ? '<span>' + esc(fence[1]) + '</span>' : '<span>code</span>';
      out.push('<div class="codeblock"><div class="codehead">' + label +
        '<button type="button" class="codecopy" data-copy-code>copy</button></div>' +
        '<pre><code>' + esc(code.join('\n').replace(/\n$/, '')) + '</code></pre></div>');
      continue;
    }

    // Tables: header row + separator row, then body rows.
    if (line.indexOf('|') >= 0 && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      flushPara();
      var head = splitRow(line);
      i += 2;
      var rows = [];
      while (i < lines.length && lines[i].indexOf('|') >= 0 && lines[i].trim()) {
        rows.push(splitRow(lines[i++]));
      }
      var h = '<table><thead><tr>' + head.map(function (c) { return '<th>' + renderInline(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + renderInline(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
        '</tbody></table>';
      out.push(h);
      continue;
    }

    // Lists: consecutive same-kind items merge into one list.
    var ul = line.match(/^\s*[-*]\s+(.+)$/);
    var ol = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (ul || ol) {
      flushPara();
      var tag = ul ? 'ul' : 'ol';
      var items = [];
      while (i < lines.length) {
        var m = ul
          ? lines[i].match(/^\s*[-*]\s+(.+)$/)
          : lines[i].match(/^\s*\d+[.)]\s+(.+)$/);
        if (!m) break;
        items.push('<li>' + renderInline(m[1]) + '</li>');
        i++;
      }
      out.push('<' + tag + '>' + items.join('') + '</' + tag + '>');
      continue;
    }

    // Headings collapse to one chat size.
    var hd = line.match(/^#{1,4}\s+(.+)$/);
    if (hd) {
      flushPara();
      out.push('<h4>' + renderInline(hd[1]) + '</h4>');
      i++;
      continue;
    }

    if (!line.trim()) { flushPara(); i++; continue; }
    para.push(line);
    i++;
  }
  flushPara();
  return out.join('');
}

// ── SSE parsing ─────────────────────────────────────────────────
// Proper event framing: lines accumulate until a blank line dispatches
// one event; multi-line data joins with \n. Returns { events, rest }.
// Event kinds: text (a content delta), done ([DONE]), error.
function parseSSEBuffer(buf) {
  var events = [];
  var lines = String(buf).split('\n');
  var rest = lines.pop(); // possibly incomplete trailing line
  var data = [];
  var eventName = '';

  function dispatch() {
    if (!data.length && !eventName) return;
    var payload = data.join('\n').trim();
    data = [];
    var name = eventName;
    eventName = '';
    if (!payload) return;
    if (payload === '[DONE]') {
      events.push({ kind: 'done' });
      return;
    }
    if (payload.charAt(0) === '{' || payload.charAt(0) === '[') {
      try {
        var obj = JSON.parse(payload);
        if (obj.error) {
          events.push({ kind: 'error', message: String((obj.error && obj.error.message) || obj.error).slice(0, 300) });
          return;
        }
        var choice = obj.choices && obj.choices[0];
        var delta = (choice && choice.delta && choice.delta.content) ||
          (choice && choice.message && choice.message.content) || '';
        if (delta) events.push({ kind: 'text', text: delta });
        return;
      } catch (e) { /* fall through: treat as raw text */ }
    }
    if (name === 'error') {
      events.push({ kind: 'error', message: payload.slice(0, 300) });
    } else {
      events.push({ kind: 'text', text: payload });
    }
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line.trim()) { dispatch(); continue; }
    if (line.charAt(0) === ':') continue; // comment / keep-alive
    if (line.indexOf('data:') === 0) { data.push(line.slice(5).replace(/^\s/, '')); continue; }
    var ev = line.match(/^event:\s*(.+)$/);
    if (ev) { eventName = ev[1].trim(); continue; }
  }
  return { events: events, rest: rest };
}

// ── Widget (DOM) ────────────────────────────────────────────────
var STARTERS = [
  'What can Jev judge in a support chat?',
  'Show me builds that route support tickets',
  'Which evals test tool calls?'
];

var history = [];
var sending = false;
var aborter = null;
var els = {};
var sticky = true;
var lastRender = 0;

function loadSaved() {
  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    var saved = JSON.parse(raw);
    if (!Array.isArray(saved) || !saved.length) return null;
    return saved.filter(function (m) {
      return m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string';
    }).slice(-30);
  } catch (e) { return null; }
}

function persist() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(history.slice(-30)));
  } catch (e) { /* private mode or quota — chat still works, just not saved */ }
}

function bubble(role, html) {
  var d = document.createElement('div');
  d.className = 'msg ' + role;
  d.innerHTML = html;
  els.msgs.appendChild(d);
  stick();
  return d;
}

function stick() {
  if (sticky) els.msgs.scrollTop = els.msgs.scrollHeight;
  els.latest.style.display = (!sticky && sending) ? 'block' : 'none';
}

function sourceChips(sources) {
  if (!sources) return '';
  var chips = [];
  (sources.builds || []).slice(0, 4).forEach(function (b) {
    chips.push('<a href="' + BASE + 'cases/' + b.i + '.html">' + esc(b.t) +
      (b.e ? ' <span class="evpill ev-' + esc(b.e) + '">' + esc(b.e) + '</span>' : '') + '</a>');
  });
  (sources.evals || []).slice(0, 2).forEach(function (e) {
    chips.push('<a href="' + BASE + 'index.html#eval-' + e.n + '">eval ' + e.n + ': ' + esc(e.t) + '</a>');
  });
  if (!chips.length) return '';
  return '<div class="sources"><span class="srclabel">Sources</span>' + chips.join('') + '</div>';
}

function followupsFor(sources) {
  var fups = [];
  if (sources && sources.builds && sources.builds[0]) {
    fups.push('Tell me more about ' + sources.builds[0].t);
  }
  if (sources && sources.evals && sources.evals.length) {
    fups.push('Show me the runnable eval');
  }
  fups.push('How would I call Jev for this?');
  return fups.slice(0, 3);
}

function followupRow(fups) {
  return '<div class="fups">' + fups.map(function (q, i) {
    return '<button type="button" data-fup="' + esc(q) + '">' + esc(q) + '</button>';
  }).join('') + '</div>';
}

function clearFollowups() {
  els.msgs.querySelectorAll('.fups').forEach(function (el) { el.remove(); });
}

function msgActions() {
  return '<div class="msgacts"><button type="button" data-act="copy">copy</button></div>';
}

function setSendMode(mode) {
  // 'send' | 'stop' | 'disabled'
  els.send.classList.toggle('stop', mode === 'stop');
  els.send.textContent = mode === 'stop' ? 'stop' : 'send';
  els.send.disabled = mode === 'disabled';
}

function setBusy(busy) {
  sending = busy;
  els.input.disabled = busy;
  if (busy) setSendMode('stop');
  else setSendMode(els.input.value.trim() ? 'send' : 'disabled');
  stick();
}

function copyText(text, btn) {
  function done(ok) {
    if (!btn) return;
    btn.textContent = ok ? 'copied' : 'copy failed';
    setTimeout(function () { btn.textContent = btn.hasAttribute('data-copy-code') ? 'copy' : 'copy'; }, 1600);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
  } else {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { done(document.execCommand('copy')); } catch (e) { done(false); }
    ta.remove();
  }
}

async function ask(question) {
  question = String(question || '').trim().slice(0, MAX_QUESTION);
  if (!question || sending) return;
  clearFollowups();
  els.chips.style.display = 'none';
  var userEl = bubble('user', esc(question));
  userEl._text = question;
  els.input.value = '';
  autogrow();
  updateCount();
  setBusy(true);
  sticky = true;
  var bot = bubble('bot', '<span class="typing" aria-label="Thinking"><i></i><i></i><i></i></span>');
  history.push({ role: 'user', content: question });
  history = history.slice(-MAX_TURNS);

  var answer = '';
  var sources = null;
  var first = true;
  aborter = ('AbortController' in window) ? new AbortController() : null;

  function paint(force) {
    var now = Date.now();
    if (!force && now - lastRender < RENDER_THROTTLE_MS) return;
    lastRender = now;
    bot.innerHTML = renderLite(answer);
    stick();
  }

  try {
    var dir = await dirData();
    var ctx = contextOf(question, dir);
    sources = { builds: ctx.builds.slice(0, 4), evals: ctx.evals.slice(0, 2) };
    var wire = history.map(function (m) { return { role: m.role, content: m.content }; });
    var res = await fetch(API + '/api/jev-ask', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: wire, context: ctx.text }),
      signal: aborter ? aborter.signal : undefined
    });
    if (!res.ok || !res.body) {
      var err = await res.json().catch(function () { return {}; });
      throw new Error(err.error || ('request failed (' + res.status + ')'));
    }
    var reader = res.body.getReader();
    var dec = new TextDecoder();
    var buf = '';
    for (;;) {
      var step = await reader.read();
      if (step.done) break;
      buf += dec.decode(step.value, { stream: true });
      var parsed = parseSSEBuffer(buf);
      buf = parsed.rest;
      for (var i = 0; i < parsed.events.length; i++) {
        var ev = parsed.events[i];
        if (ev.kind === 'error') throw new Error(ev.message || 'model error — try again');
        if (ev.kind === 'done') break;
        if (ev.kind === 'text' && ev.text) {
          if (first) { bot.innerHTML = ''; first = false; }
          answer += ev.text;
          paint(false);
        }
      }
    }
    if (!answer) throw new Error('empty reply — try again');
    bot.innerHTML = renderLite(answer) + sourceChips(sources) + msgActions() + followupRow(followupsFor(sources));
    bot._text = answer;
    bot._sources = sources;
    history.push({ role: 'assistant', content: answer, sources: sources });
    history = history.slice(-MAX_TURNS);
    persist();
  } catch (err) {
    var stopped = aborter && aborter.signal.aborted;
    if (stopped && answer) {
      bot.innerHTML = renderLite(answer) + sourceChips(sources) + msgActions();
      bot._text = answer;
      bot._sources = sources;
      history.push({ role: 'assistant', content: answer, sources: sources });
      persist();
    } else if (!stopped) {
      bot.innerHTML = '<span class="err">' + esc(err.message || 'something went wrong') + '</span>' +
        '<div class="msgacts"><button type="button" data-act="retry">retry</button></div>';
      bot._retry = question;
      history.pop();
    } else {
      bot.remove();
      history.pop();
    }
  } finally {
    aborter = null;
    setBusy(false);
    els.msgs.scrollTop = els.msgs.scrollHeight;
    sticky = true;
    els.latest.style.display = 'none';
  }
}

function autogrow() {
  els.input.style.height = 'auto';
  els.input.style.height = Math.min(els.input.scrollHeight, 120) + 'px';
}

function updateCount() {
  var n = els.input.value.length;
  els.count.textContent = n > 1500 ? (n + ' / ' + MAX_QUESTION) : '';
}

function restore() {
  var saved = loadSaved();
  if (!saved) return false;
  history = saved;
  els.chips.style.display = 'none';
  saved.forEach(function (m) {
    if (m.role === 'user') {
      var u = bubble('user', esc(m.content));
      u._text = m.content;
    } else {
      var b = bubble('bot', renderLite(m.content) + sourceChips(m.sources) + msgActions());
      b._text = m.content;
      b._sources = m.sources || null;
    }
  });
  var lastUser = null;
  saved.forEach(function (m) { if (m.role === 'user') lastUser = m.content; });
  if (lastUser && saved[saved.length - 1].role === 'assistant') {
    var last = els.msgs.lastElementChild;
    if (last) last.insertAdjacentHTML('beforeend', followupRow(followupsFor(saved[saved.length - 1].sources)));
  }
  return true;
}

function newChat() {
  history = [];
  try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ }
  els.msgs.innerHTML = '';
  els.chips.style.display = '';
  greet();
}

function greet() {
  dirData().then(function (dir) {
    bubble('bot', 'Ask me what Jev can build — I answer from the ' +
      dir.evals.length + ' evals and ' + dir.community.length +
      ' community builds in this directory, with links.');
  }).catch(function () {
    bubble('bot', '<span class="err">Could not load the directory data — try reopening the chat.</span>');
  });
}

function mount() {
  var host = document.createElement('div');
  host.id = 'jevAsk';
  host.innerHTML =
    '<button class="askfab" id="askFab" aria-label="Ask about Jev">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/></svg>' +
    '<span>Ask about Jev</span></button>' +
    '<div class="askpanel" id="askPanel" role="dialog" aria-label="Ask about Jev" aria-hidden="true">' +
    '<div class="askhead"><div><b>Ask about Jev</b><span>evals + community builds</span></div>' +
    '<div class="askheadbtns"><button class="mini" id="askNew">new</button><button class="mini" id="askClose">close</button></div></div>' +
    '<div class="askmsgs" id="askMsgs" role="log" aria-live="polite" aria-label="Chat messages"></div>' +
    '<button type="button" class="asklatest" id="askLatest">↓ latest</button>' +
    '<div class="askchips" id="askChips"></div>' +
    '<form class="askform" id="askForm"><textarea id="askInput" rows="1" maxlength="2000" ' +
    'placeholder="What can Jev build for…" aria-label="Chat input" autocomplete="off"></textarea>' +
    '<div class="askformcol"><button class="btn solid" id="askSend" type="submit">send</button>' +
    '<span class="charcount" id="askCount"></span></div></form>' +
    '<div class="askfoot" id="askFoot">Answers cite directory entries · Workers AI</div></div>';
  document.body.appendChild(host);
  els = {
    fab: host.querySelector('#askFab'),
    panel: host.querySelector('#askPanel'),
    msgs: host.querySelector('#askMsgs'),
    latest: host.querySelector('#askLatest'),
    chips: host.querySelector('#askChips'),
    form: host.querySelector('#askForm'),
    input: host.querySelector('#askInput'),
    send: host.querySelector('#askSend'),
    count: host.querySelector('#askCount'),
    foot: host.querySelector('#askFoot'),
    off: false
  };
  els.chips.innerHTML = STARTERS.map(function (s, i) {
    return '<button type="button" data-chip="' + i + '">' + esc(s) + '</button>';
  }).join('');
  els.chips.querySelectorAll('[data-chip]').forEach(function (btn) {
    btn.addEventListener('click', function () { ask(STARTERS[Number(btn.dataset.chip)]); });
  });
  els.fab.addEventListener('click', function () {
    var open = els.panel.classList.toggle('on');
    els.panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open) {
      if (!els.msgs.children.length && !restore()) greet();
      els.input.focus();
    }
  });
  host.querySelector('#askClose').addEventListener('click', function () {
    els.panel.classList.remove('on');
    els.panel.setAttribute('aria-hidden', 'true');
  });
  host.querySelector('#askNew').addEventListener('click', newChat);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') els.panel.classList.remove('on');
  });
  els.msgs.addEventListener('scroll', function () {
    sticky = (els.msgs.scrollHeight - els.msgs.scrollTop - els.msgs.clientHeight) < 60;
    els.latest.style.display = (!sticky && sending) ? 'block' : 'none';
  });
  els.latest.addEventListener('click', function () {
    sticky = true;
    els.msgs.scrollTop = els.msgs.scrollHeight;
    els.latest.style.display = 'none';
  });
  // One delegated listener for every in-chat button: copies, retries, follow-ups.
  els.msgs.addEventListener('click', function (e) {
    var t = e.target;
    if (t.hasAttribute('data-copy-code')) {
      var code = t.closest('.codeblock');
      code = code && code.querySelector('code');
      if (code) copyText(code.innerText, t);
      return;
    }
    if (t.dataset.act === 'copy') {
      var msg = t.closest('.msg');
      if (msg && msg._text) copyText(msg._text, t);
      return;
    }
    if (t.dataset.act === 'retry') {
      var errMsg = t.closest('.msg');
      if (errMsg) errMsg.remove();
      ask(errMsg && errMsg._retry ? errMsg._retry : '');
      return;
    }
    if (t.hasAttribute('data-fup')) {
      ask(t.getAttribute('data-fup'));
    }
  });
  els.form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending && aborter) { aborter.abort(); return; }
    ask(els.input.value);
  });
  els.input.addEventListener('input', function () {
    autogrow();
    updateCount();
    if (!sending) setSendMode(els.input.value.trim() ? 'send' : 'disabled');
  });
  els.input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (sending && aborter) { aborter.abort(); return; }
      ask(els.input.value);
    }
  });
  setSendMode('disabled');

  // Availability probe: forks without the AI binding get an honest
  // disabled state instead of a chat that always errors.
  fetch(API + '/api/jev-ask').then(function (r) { return r.json(); }).then(function (s) {
    if (s && s.configured === false) {
      els.off = true;
      els.input.disabled = true;
      els.input.placeholder = 'Chat is not enabled on this copy';
    } else if (s && s.model) {
      var short = String(s.model).split('/').pop();
      els.foot.textContent = 'Answers cite directory entries · ' + short;
    }
  }).catch(function () { /* probe failed — the first send will surface it */ });
}

if (typeof document !== 'undefined') mount();

export { renderInline, renderLite, parseSSEBuffer, toks, score, topMatches, contextOf, BASE };
