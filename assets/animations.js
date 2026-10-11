/* SNK Business - animations.js
   Works on the static page (style.css) and on the #app-rendered page. */
(function () {
  'use strict';
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var app = document.getElementById('app');
  var root = app || document.body;

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
      /* 3: header state */
      var hd = document.querySelector('.site-header') || document.querySelector('header') || document.querySelector('nav');
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

  /* observer */
  var io = RM || !('IntersectionObserver' in window) ? null :
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        if (el.hasAttribute('data-count')) { runCounter(el); return; }
        el.classList.add('in');
        var d = parseInt(el.style.getPropertyValue('--d') || '0', 10) || 0;
        setTimeout(function () { el.classList.add('done'); el.style.removeProperty('--d'); }, d + 850);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  var SEL = [
    '.hero-content > *', '.hero-visual', '.section-heading', '.about-main', '.about-point',
    '.service-card', '.why-content', '.why-item', '.stat', '.contact-content > *',
    '.contact-form', '.footer-top', '.footer-bottom',
    '.program', '.faq-q'
  ].join(',');

  function add(el, delay) {
    if (!el || el.classList.contains('rv')) return;
    el.style.setProperty('--d', delay + 'ms');
    el.classList.add('rv');
    io.observe(el);
  }

  function setup() {
    if (!io) return;
    var found = root.querySelectorAll(SEL);

    if (found.length) {
      Array.prototype.forEach.call(found, function (el) {
        if (el.classList.contains('faq-q')) el = el.parentNode;
        var sib = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
        add(el, Math.min(sib, 5) * 80);
      });
    } else {
      /* fallback for unknown markup: top-level blocks and their children */
      Array.prototype.forEach.call(root.children, function (blk) {
        if (/^(SCRIPT|STYLE)$/.test(blk.tagName) || blk.id === 'scroll-progress') return;
        if (blk.children.length > 1 && blk.children.length < 12) {
          Array.prototype.forEach.call(blk.children, function (c, i) { add(c, Math.min(i, 5) * 80); });
        } else add(blk, 0);
      });
    }

    /* 12: counters */
    root.querySelectorAll('.stat strong,[data-counter]').forEach(function (el) {
      var tx = (el.textContent || '').trim(), m = tx.match(NUM);
      if (!m || el.hasAttribute('data-count')) return;
      el.setAttribute('data-count', tx);
      io.observe(el);
    });
  }

  /* 14: chip filter re-animation (only if chips exist) */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.chip')) return;
    root.classList.add('refilter');
    setTimeout(function () {
      var i = 0;
      root.querySelectorAll('.program:not([hidden])').forEach(function (c) { c.style.setProperty('--pd', (i++ % 8) * 40 + 'ms'); });
    }, 0);
    clearTimeout(root._rf);
    root._rf = setTimeout(function () { root.classList.remove('refilter'); }, 900);
  });

  /* re-run after render() on the #app version */
  if (app) {
    var pending = false;
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { pending = false; setup(); onScroll(); });
    }).observe(app, { childList: true });
  }

  setup();
  onScroll();
})();
