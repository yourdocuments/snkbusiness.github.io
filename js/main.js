(function () {
  var P = {
    sparkle: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z',
    briefcase: 'M3 7h18v13H3zM9 7V4h6v3M3 13h18',
    chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
    megaphone: 'M3 11v2l13 5V6zM16 8a4 4 0 0 1 0 8M6 14l1 6h3l-1-5',
    users: 'M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM21 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
    wallet: 'M3 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12M16 14h2',
    messages: 'M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    badge: 'M12 2l2.4 2 3.1-.3 1 3 2.6 1.8-1 3 1 3-2.6 1.8-1 3-3.1-.3L12 22l-2.4-2-3.1.3-1-3-2.6-1.8 1-3-1-3L5.5 7.7l1-3 3.1.3zM9 12l2 2 4-4',
    sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
    layers: 'M12 2l10 6-10 6L2 8zM2 14l10 6 10-6',
    cap: 'M22 10L12 5 2 10l10 5zM6 12v5c3 2 9 2 12 0v-5',
    truck: 'M1 4h13v12H1zM14 8h4l4 4v4h-8M6 18.5a1.5 1.5 0 1 0 .01 0M18 18.5a1.5 1.5 0 1 0 .01 0',
    building: 'M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M3 21h18',
    video: 'M15 8l7-4v16l-7-4zM2 6h13v12H2z',
    panels: 'M3 3h18v18H3zM3 9h18M9 9v12',
    clipboard: 'M9 3h6v4H9zM7 5H5v16h14V5h-2M9 12h6M9 16h6',
    ruler: 'M3 17L17 3l4 4L7 21zM8 12l2 2M12 8l2 2',
    presentation: 'M2 3h20M21 3v11H3V3M12 14v6M8 21l4-1 4 1',
    flag: 'M4 22V4M4 4h14l-2 4 2 4H4',
    trend: 'M22 7l-9 9-4-4-7 7M16 7h6v6',
    monitor: 'M2 4h20v12H2zM8 20h8M12 16v4',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
    check: 'M20 6L9 17l-5-5',
    ccheck: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12l3 3 5-6',
    calendar: 'M3 5h18v16H3zM3 10h18M8 2v4M16 2v4',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    up: 'M7 17L17 7M8 7h9v9',
    plus: 'M12 5v14M5 12h14',
    down: 'M6 9l6 6 6-6',
    download: 'M12 3v12m0 0l-4-4m4 4l4-4M4 20h16',
    facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
  };
  document.querySelectorAll('[data-i]').forEach(function (el) {
    var d = P[el.getAttribute('data-i')] || P.sparkle;
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  });

  /* Mobile menu */
  var toggle = document.getElementById('menu-toggle'), links = document.getElementById('main-links');
  if (toggle) toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  if (links) links.addEventListener('click', function (e) { if (e.target.tagName === 'A') links.classList.remove('open'); });

  /* Program search + filter */
  var cards = [].slice.call(document.querySelectorAll('.program')), q = document.getElementById('program-search'),
      chips = [].slice.call(document.querySelectorAll('.chip')), cat = 'all', empty = document.getElementById('no-programs');
  function apply() {
    var term = (q.value || '').toLowerCase().trim(), shown = 0;
    cards.forEach(function (c) {
      var ok = (cat === 'all' || c.dataset.cat === cat) && c.textContent.toLowerCase().indexOf(term) > -1;
      c.hidden = !ok; if (ok) shown++;
    });
    empty.hidden = shown > 0;
  }
  if (q) q.addEventListener('input', apply);
  chips.forEach(function (b) {
    b.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
      b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); cat = b.dataset.cat; apply();
    });
  });
  document.querySelectorAll('.program .req').forEach(function (a) {
    a.addEventListener('click', function () {
      var t = document.getElementById('topic');
      if (t) t.value = a.closest('.program').querySelector('h3').textContent;
    });
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', !open);
      b.nextElementSibling.hidden = open;
    });
  });

  /* Request form: opens the visitor's email app. Change EMAIL, or connect a real form service later. */
  var EMAIL = 'hello@snkbusiness.com', form = document.getElementById('request-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form), body = '';
    f.forEach(function (v, k) { if (v) body += k + ': ' + v + '\n'; });
    location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Corporate training request - ' + (f.get('Company') || '')) + '&body=' + encodeURIComponent(body);
    document.getElementById('form-note').textContent = 'Thanks! Your email app should open with your request. If not, email us at ' + EMAIL + '.';
  });
})();
