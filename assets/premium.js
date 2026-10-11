/* SNK Business - premium.js  (loads after animations.js) */
(function () {
  'use strict';
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HOVER = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  var app = document.getElementById('app');
  var root = app || document.body;

  /* 1: split headings into words */
  function split(h) {
    if (h.getAttribute('data-split')) return;
    h.setAttribute('data-split', '1');
    h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
    var i = 0;
    (function walk(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var f = document.createDocumentFragment();
          c.nodeValue.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'), s = document.createElement('span');
            w.className = 'w'; s.className = 'wi';
            s.style.setProperty('--i', i++);
            s.textContent = p;
            w.setAttribute('aria-hidden', 'true');
            w.appendChild(s); f.appendChild(w);
          });
          n.replaceChild(f, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(h);
  }

  /* 2 + 3: aurora, spotlight classes */
  function setup() {
    if (!RM) {
      var h1 = root.querySelector('h1');
      if (h1) split(h1);
      root.querySelectorAll('.hero').forEach(function (hero) {
        if (hero.querySelector('.aurora')) return;
        var a = document.createElement('div');
        a.className = 'aurora';
        a.innerHTML = '<i></i><i></i><i></i>';
        hero.insertBefore(a, hero.firstChild);
      });
    }
    if (HOVER && !RM) {
      root.querySelectorAll('.service-card,.program,.about-main,.contact-form,.why-item')
        .forEach(function (c) { c.classList.add('spot'); });
    }
  }

  if (!HOVER || RM) { setup(); }
  else {
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    var gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy, raf = 0, tiltEl = null, magEl = null;

    function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
      raf = (Math.abs(tx - gx) + Math.abs(ty - gy) > 0.5) ? requestAnimationFrame(loop) : 0;
    }

    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      glow.classList.add('on');
      if (!raf) raf = requestAnimationFrame(loop);

      var t = e.target.closest ? e.target : null;
      if (!t) return;

      /* spotlight */
      var sp = t.closest('.spot');
      if (sp) {
        var r = sp.getBoundingClientRect();
        sp.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        sp.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }

      /* 3D tilt */
      var tl = t.closest('.visual-card');
      if (tiltEl && tiltEl !== tl) { tiltEl.style.transform = ''; tiltEl = null; }
      if (tl) {
        var b = tl.getBoundingClientRect();
        var px = (e.clientX - b.left) / b.width - 0.5, py = (e.clientY - b.top) / b.height - 0.5;
        tl.style.transform = 'perspective(900px) rotateY(' + (px * 9) + 'deg) rotateX(' + (-py * 9) + 'deg)';
        tiltEl = tl;
      }

      /* magnetic buttons */
      var mg = t.closest('.btn,.nav-cta');
      if (magEl && magEl !== mg) { magEl.style.translate = ''; magEl = null; }
      if (mg) {
        var m = mg.getBoundingClientRect();
        mg.style.translate = ((e.clientX - (m.left + m.width / 2)) * 0.22) + 'px ' + ((e.clientY - (m.top + m.height / 2)) * 0.3) + 'px';
        magEl = mg;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', function () { glow.classList.remove('on'); });
    document.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget) {
        if (tiltEl) { tiltEl.style.transform = ''; tiltEl = null; }
        if (magEl) { magEl.style.translate = ''; magEl = null; }
      }
    });

    setup();
  }

  /* 7: parallax glows on scroll */
  if (!RM) {
    var pt = false;
    addEventListener('scroll', function () {
      if (pt || scrollY > 1400) return;
      pt = true;
      requestAnimationFrame(function () {
        var y = scrollY;
        var a = root.querySelector('.glow-one'), b = root.querySelector('.glow-two'), l = root.querySelector('.logo-stage');
        if (a) a.style.translate = '0 ' + (y * 0.14) + 'px';
        if (b) b.style.translate = '0 ' + (-y * 0.09) + 'px';
        if (l) l.style.translate = '0 ' + (y * -0.05) + 'px';
        pt = false;
      });
    }, { passive: true });
  }

  /* re-run after render() on the #app version */
  if (app) {
    var pend = false;
    new MutationObserver(function () {
      if (pend) return;
      pend = true;
      requestAnimationFrame(function () { pend = false; setup(); });
    }).observe(app, { childList: true });
  }
})();
