/* SNK Business - animations.js
   Re-applies itself every time the page re-renders (#app innerHTML changes). */
(function () {
  'use strict';
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var app = document.getElementById('app');
  if (!app) return;

  /* 5: scroll progress bar */
  var bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.appendChild(bar);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(scrollY / h, 1) : 0) + ')';
      var hd = app.querySelector('header') || app.querySelector('nav');
      if (hd) hd.classList.toggle('scrolled', scrollY > 20);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  /* 12: counters */
  var NUM = /^(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?\s*([+%kKmMxX]*)$/;
  function runCounter(el) {
    var m = el.getAttribute('data-count').match(NUM);
    if (!m) return;
    var target = parseFloat((m[1] + (m[2] || '')).replace(/,/g, ''));
    var dec = m[2] ? m[2].length - 1 : 0, comma = m[1].indexOf(',') > -1, suf = m[3] || '';
    var t0 = performance.now(), dur = 1400;
    (function tick(t) {
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      var v = (target * e).toFixed(dec);
      if (comma) v = Number(v).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      el.textContent = v + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  /* 1, 2, 12: observer */
  var io = RM || !('IntersectionObserver' in window) ? null :
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        if (el.hasAttribute('data-count')) { runCounter(el); return; }
        el.classList.add('in');
        var d = parseInt((el.style.getPropertyValue('--d') || '0'), 10) || 0;
        setTimeout(function () { el.classList.add('done'); el.style.removeProperty('--d'); }, d + 800);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function setup() {
    if (!io) return;
    var targets = [];

    app.querySelectorAll('section').forEach(function (sec) {
      Array.prototype.forEach.call(sec.children, function (kid) {
        var list = [kid];
        if (kid.children.length > 1 && kid.matches('.container,.wrap,.inner,[class*="container"],[class*="wrap"]'))
          list = Array.prototype.slice.call(kid.children);
        list.forEach(function (el) {
          if (el.querySelector('.program')) return;      /* cards handled below */
          targets.push(el);
        });
      });
    });

    /* FAQ items */
    app.querySelectorAll('.faq-q').forEach(function (q) { targets.push(q.parentNode); });

    var seen = new Set();
    targets.forEach(function (el, i) {
      if (seen.has(el) || el.classList.contains('rv')) return;
      seen.add(el);
      var sib = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
      el.style.setProperty('--d', Math.min(sib, 5) * 70 + 'ms');
      el.classList.add('rv');
      io.observe(el);
    });

    /* 2: staggered program cards */
    app.querySelectorAll('.program').forEach(function (c, i) {
      if (c.classList.contains('rv')) return;
      c.style.setProperty('--d', (i % 6) * 80 + 'ms');
      c.classList.add('rv');
      io.observe(c);
    });

    /* 12: counters (leaf elements that are just a number, not inside cards/forms) */
    app.querySelectorAll('*').forEach(function (el) {
      if (el.childElementCount || el.hasAttribute('data-count')) return;
      if (el.closest('.program,form,.faq-q,.faq-a,script,style')) return;
      var tx = (el.textContent || '').trim();
      var m = tx.match(NUM);
      if (!m || tx.charAt(0) === '0') return;
      if (parseFloat(m[1].replace(/,/g, '')) < 10 && !m[3]) return;
      el.setAttribute('data-count', tx);
      io.observe(el);
    });
  }

  /* 14: filter re-animation */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.chip')) return;
    app.classList.add('refilter');
    setTimeout(function () {
      var i = 0;
      app.querySelectorAll('.program:not([hidden])').forEach(function (c) { c.style.setProperty('--pd', (i++ % 8) * 40 + 'ms'); });
    }, 0);
    clearTimeout(app._rf);
    app._rf = setTimeout(function () { app.classList.remove('refilter'); }, 900);
  });

  /* re-run after every render() */
  var pending = false;
  new MutationObserver(function () {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; setup(); onScroll(); });
  }).observe(app, { childList: true });

  setup();
  onScroll();
})();
