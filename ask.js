/* Jev Directory side chat — "what can Jev build?"
 *
 * Dependency-free ES module. Retrieval runs locally against the already
 * loaded data.js (every build + eval is on the page); only the question
 * plus the few matching entries travel to the worker, which streams back
 * a GLM answer. No build step — shipped verbatim by export-jev-oss.mjs.
 *
 * Point the widget at a local worker while developing (browser console):
 *   localStorage.setItem('everyai_jev_api', 'http://127.0.0.1:8787');
 */
import { JEV_DIR } from './data.js';

var API = (localStorage.getItem('everyai_jev_api') || 'https://everyai-use-cases.everyai-com.workers.dev').replace(/\/+$/, '');
var MAX_TURNS = 8;
var MAX_CONTEXT = 9000;

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
// kinds of things" questions still land.
function contextOf(question) {
  var words = toks(question);
  var lines = [];
  lines.push('Directory: ' + JEV_DIR.evals.length + ' runnable evals, ' +
    JEV_DIR.community.length + ' community builds, ' + JEV_DIR.linkedProjects + ' linked projects.');
  if (JEV_DIR.about) lines.push('About Jev: ' + JEV_DIR.about.replace(/\s+/g, ' '));
  var counts = {};
  JEV_DIR.community.forEach(function (b) { counts[b.c] = (counts[b.c] || 0) + 1; });
  lines.push('Categories: ' + Object.keys(counts).sort().map(function (c) {
    return c + ' (' + counts[c] + ')';
  }).join(', '));
  (JEV_DIR.spotlight || []).forEach(function (b) {
    lines.push('- [spotlight] "' + b.t + '" (' + b.c + ') — page: cases/' + b.i + '.html — ' + b.d);
  });

  var builds = topMatches(words, JEV_DIR.community, function (b) {
    return [norm(b.t), norm(b.c), norm(b.d + ' ' + (b.l || []).map(function (l) { return l.t; }).join(' '))];
  }, 8);
  var evals = topMatches(words, JEV_DIR.evals, function (e) {
    return [norm(e.t), '', norm(e.s)];
  }, 4);

  builds.forEach(function (r) {
    var b = r.item;
    lines.push('- [build] "' + b.t + '" (' + b.c + ') — page: cases/' + b.i + '.html');
    lines.push('  ' + String(b.d || '').replace(/\s+/g, ' ').slice(0, 280));
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
  return out.length > MAX_CONTEXT ? out.slice(0, MAX_CONTEXT) : out;
}

// Minimal chat markdown: fences, inline code, bold, links, breaks.
// Everything is escaped first so model output can never inject HTML.
function renderInline(text) {
  return esc(text)
    .replace(/`([^`\n]+)`/g, '<code class="ic">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((cases\/[A-Za-z0-9_.-]+\.html|https?:[^)\s]+)\)/g, function (m, t, u) {
      var ext = u.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '';
      return '<a href="' + u + '"' + ext + '>' + t + '</a>';
    })
    .replace(/\n/g, '<br>');
}

function renderLite(src) {
  var out = [];
  var text = String(src || '');
  var re = /```\w*\n?([\s\S]*?)(```|$)/g;
  var last = 0, m;
  while ((m = re.exec(text))) {
    out.push(renderInline(text.slice(last, m.index)));
    out.push('<pre><code>' + esc(m[1].replace(/\n$/, '')) + '</code></pre>');
    last = m.index + m[0].length;
    if (!m[2]) break;
  }
  out.push(renderInline(text.slice(last)));
  return out.join('');
}

var STARTERS = [
  'What can Jev judge in a support chat?',
  'Show me builds that route support tickets',
  'Which evals test tool calls?'
];

var history = [];
var sending = false;
var els = {};

function bubble(role, html) {
  var d = document.createElement('div');
  d.className = 'msg ' + role;
  d.innerHTML = html;
  els.msgs.appendChild(d);
  els.msgs.scrollTop = els.msgs.scrollHeight;
  return d;
}

function setBusy(busy) {
  sending = busy;
  els.send.disabled = busy || !els.input.value.trim() || els.off;
  els.input.disabled = busy;
}

async function ask(question) {
  question = String(question || '').trim().slice(0, 2000);
  if (!question || sending) return;
  els.chips.style.display = 'none';
  bubble('user', esc(question));
  els.input.value = '';
  setBusy(true);
  var bot = bubble('bot', '<span class="typing"><i></i><i></i><i></i></span>');
  history.push({ role: 'user', content: question });
  history = history.slice(-MAX_TURNS);

  var answer = '';
  try {
    var res = await fetch(API + '/api/jev-ask', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: history, context: contextOf(question) })
    });
    if (!res.ok || !res.body) {
      var err = await res.json().catch(function () { return {}; });
      throw new Error(err.error || ('request failed (' + res.status + ')'));
    }
    var reader = res.body.getReader();
    var dec = new TextDecoder();
    var buf = '';
    var first = true;
    for (;;) {
      var step = await reader.read();
      if (step.done) break;
      buf += dec.decode(step.value, { stream: true });
      var parts = buf.split('\n');
      buf = parts.pop();
      for (var i = 0; i < parts.length; i++) {
        var line = parts[i].trim();
        if (line.indexOf('data:') !== 0) continue;
        var payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          var delta = JSON.parse(payload).choices?.[0]?.delta?.content || '';
          if (delta) {
            if (first) { bot.innerHTML = ''; first = false; }
            answer += delta;
            bot.innerHTML = renderLite(answer);
            els.msgs.scrollTop = els.msgs.scrollHeight;
          }
        } catch (e) { /* partial chunk — the next read completes it */ }
      }
    }
    if (!answer) throw new Error('empty reply — try again');
    bot.innerHTML = renderLite(answer);
    history.push({ role: 'assistant', content: answer });
    history = history.slice(-MAX_TURNS);
  } catch (err) {
    bot.innerHTML = '<span class="err">' + esc(err.message || 'something went wrong') + '</span>';
    history.pop();
  } finally {
    setBusy(false);
    els.msgs.scrollTop = els.msgs.scrollHeight;
  }
}

function mount() {
  var host = document.createElement('div');
  host.id = 'jevAsk';
  host.innerHTML =
    '<button class="askfab" id="askFab" aria-label="Ask about Jev">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/></svg>' +
    '<span>Ask about Jev</span></button>' +
    '<div class="askpanel" id="askPanel" aria-hidden="true">' +
    '<div class="askhead"><div><b>Ask about Jev</b><span>evals + community builds</span></div>' +
    '<button class="mini" id="askClose">close</button></div>' +
    '<div class="askmsgs" id="askMsgs"></div>' +
    '<div class="askchips" id="askChips"></div>' +
    '<form class="askform" id="askForm"><input id="askInput" type="text" maxlength="2000" ' +
    'placeholder="What can Jev build for…" autocomplete="off"><button class="btn solid" id="askSend" type="submit">send</button></form>' +
    '<div class="askfoot">Answers cite directory entries · Workers AI</div></div>';
  document.body.appendChild(host);
  els = {
    fab: host.querySelector('#askFab'),
    panel: host.querySelector('#askPanel'),
    msgs: host.querySelector('#askMsgs'),
    chips: host.querySelector('#askChips'),
    form: host.querySelector('#askForm'),
    input: host.querySelector('#askInput'),
    send: host.querySelector('#askSend'),
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
    if (open && !els.msgs.children.length) {
      bubble('bot', 'Ask me what Jev can build — I answer from the ' +
        JEV_DIR.evals.length + ' evals and ' + JEV_DIR.community.length +
        ' community builds in this directory, with links.');
      els.input.focus();
    }
  });
  host.querySelector('#askClose').addEventListener('click', function () {
    els.panel.classList.remove('on');
    els.panel.setAttribute('aria-hidden', 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') els.panel.classList.remove('on');
  });
  els.form.addEventListener('submit', function (e) { e.preventDefault(); ask(els.input.value); });
  els.input.addEventListener('input', function () { els.send.disabled = sending || !els.input.value.trim(); });
  els.send.disabled = true;

  // Availability probe: forks without the AI binding get an honest
  // disabled state instead of a chat that always errors.
  fetch(API + '/api/jev-ask').then(function (r) { return r.json(); }).then(function (s) {
    if (s && s.configured === false) {
      els.off = true;
      els.input.disabled = true;
      els.input.placeholder = 'Chat is not enabled on this copy';
    }
  }).catch(function () { /* probe failed — the first send will surface it */ });
}

mount();
