/* ============================================================
   REFRACT — SHARED EFFECTS & MOBILE MENU
   Load at the end of <body> on every page:
     <script src="refract-fx.js"></script>
============================================================ */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var mast = document.querySelector('.masthead');

  /* ---------- Reading progress bar ---------- */
  var bar = document.createElement('div');
  bar.className = 'rfx-progress';
  body.appendChild(bar);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(scrollY / max, 1) : 0) + ')';
      if (mast) mast.classList.toggle('rfx-scrolled', scrollY > 40);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Mobile menu ---------- */
  var navRight = document.querySelector('.nav-right');
  if (mast && navRight) {
    var seen = {};
    var main = [], more = [];
    function collect(sel, bucket) {
      document.querySelectorAll(sel).forEach(function (a) {
        var href = a.getAttribute('href');
        var label = a.textContent.trim();
        if (!href || !label || seen[href]) return;
        seen[href] = true;
        bucket.push({ href: href, label: label, active: a.classList.contains('active') });
      });
    }
    collect('.nav-left a.nav-link', main);
    collect('.nav-right a.nav-link', more);

    var here = location.pathname.split('/').pop() || 'index.html';
    function linksHTML(list, start) {
      return list.map(function (l, i) {
        var active = l.active || l.href === here;
        return '<a href="' + l.href + '" style="--i:' + (start + i) + '"' + (active ? ' class="active"' : '') + '>' + l.label + '</a>';
      }).join('');
    }

    var sub = document.querySelector('.subscribe-btn');
    var subHref = (sub && sub.getAttribute('href')) || 'index.html#newsletter';

    var menu = document.createElement('nav');
    menu.className = 'rfx-menu';
    menu.id = 'rfx-menu';
    menu.setAttribute('aria-label', 'Site menu');
    menu.innerHTML =
      '<div class="rfx-menu-label">Sections</div>' +
      '<div class="rfx-menu-links">' + linksHTML(main, 0) + '</div>' +
      (more.length ? '<div class="rfx-menu-label">Refract</div><div class="rfx-menu-links small">' + linksHTML(more, main.length) + '</div>' : '') +
      '<div class="rfx-menu-rule"></div>' +
      '<div class="rfx-menu-tools">' +
        (typeof window.toggleTheme === 'function' ? '<button type="button" data-rfx-theme>Theme ☀︎/☾</button>' : '') +
        '<a class="primary" href="' + subHref + '">Subscribe</a>' +
      '</div>';
    body.appendChild(menu);

    var burger = document.createElement('button');
    burger.className = 'rfx-burger';
    burger.type = 'button';
    burger.setAttribute('aria-label', 'Open menu');
    burger.setAttribute('aria-controls', 'rfx-menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navRight.appendChild(burger);

    function setMenu(open) {
      body.classList.toggle('rfx-menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    burger.addEventListener('click', function () {
      setMenu(!body.classList.contains('rfx-menu-open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('[data-rfx-theme]')) { window.toggleTheme(); return; }
      if (e.target.closest('a')) setMenu(false);
    });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    matchMedia('(min-width: 901px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  /* ---------- Hero light beams ---------- */
  var cover = document.querySelector('.cover');
  if (cover && !reduced) {
    var beams = document.createElement('div');
    beams.className = 'rfx-beams';
    beams.innerHTML = '<span></span><span></span><span></span><span></span>';
    cover.insertBefore(beams, cover.firstChild);
  }

  /* ---------- Scroll reveal ---------- */
  var REVEAL = [
    '.section-header', '.article-card', '.empty-card', '.beat-card', '.pillar',
    '.mission-statement', '.two-col > div', '.newsletter-inner > div', '.manifesto-box',
    '.factcheck-box', '.pull-quote', '.source-note', '.article-hero-img',
    '.article-body > h2', '.article-body > h3', '.article-body > figure', '.article-body > img',
    '.sidebar-section', '.sidebar-newsletter', '.related-item', '.footer-top > div'
  ].join(',');

  var io = !reduced && 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('rfx-in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    : null;

  function scan(root) {
    if (!io) return;
    (root || document).querySelectorAll(REVEAL).forEach(function (el) {
      if (el.classList.contains('rfx-reveal') || el.closest('.rfx-menu,.fmodal,.support-popup,.popup-card')) return;
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.matches(REVEAL); });
      var idx = sibs.indexOf(el);
      el.style.setProperty('--rfx-delay', (Math.min(idx, 5) * 0.08) + 's');
      el.classList.add('rfx-reveal');
      io.observe(el);
    });
  }
  scan();
  // Cards rendered later from articles.js
  if (io && 'MutationObserver' in window) {
    new MutationObserver(function (muts) {
      muts.forEach(function (m) { if (m.addedNodes.length) scan(m.target); });
    }).observe(body, { childList: true, subtree: true });
  }

  /* ---------- Card spotlight follows pointer ---------- */
  document.addEventListener('pointermove', function (e) {
    var card = e.target.closest && e.target.closest('.article-card');
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  /* ---------- Section grids: newest first, no placeholder cards ---------- */
  document.querySelectorAll('.article-grid').forEach(function (grid) {
    grid.querySelectorAll('.empty-card').forEach(function (e) { e.remove(); });
    var cards = Array.prototype.slice.call(grid.querySelectorAll(':scope > .article-card'));
    var dated = cards.map(function (c) {
      var d = c.querySelector('.card-date');
      return { el: c, t: d ? Date.parse(d.textContent) : NaN };
    });
    if (dated.every(function (x) { return !isNaN(x.t); })) {
      dated.sort(function (a, b) { return b.t - a.t; })
        .forEach(function (x) { grid.appendChild(x.el); });
    }
  });

  /* ---------- ES / EN button (Google Translate) ---------- */
  var tBtn = document.getElementById('refract-translate-btn');
  function readLang() {
    var m = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
    if (m) return m[1];
    try { return localStorage.getItem('refract_lang') || 'en'; } catch (e) { return 'en'; }
  }
  function writeCookie(value, expires) {
    var base = 'googtrans=' + value + '; expires=' + expires + '; path=/';
    document.cookie = base;
    if (location.hostname.indexOf('.') > 0) {
      document.cookie = base + '; domain=.' + location.hostname.replace(/^www\./, '');
    }
  }
  function setLang(lang) {
    if (lang === 'es') {
      var d = new Date(); d.setFullYear(d.getFullYear() + 1);
      writeCookie('/en/es', d.toUTCString());
    } else {
      writeCookie('', 'Thu, 01 Jan 1970 00:00:00 GMT');
    }
    try { localStorage.setItem('refract_lang', lang); } catch (e) {}
    location.reload();
  }
  var lang = readLang();
  if (tBtn) {
    tBtn.textContent = lang === 'es' ? 'EN' : 'ES';
    tBtn.setAttribute('translate', 'no');
    tBtn.classList.add('notranslate');
    tBtn.title = lang === 'es' ? 'Read in English' : 'Leer en español';
    tBtn.addEventListener('click', function () { setLang(lang === 'es' ? 'en' : 'es'); });
  }
  document.querySelectorAll('.wordmark, .footer-wordmark').forEach(function (w) {
    w.setAttribute('translate', 'no'); w.classList.add('notranslate');
  });
  if (lang === 'es') {
    // localStorage said Spanish but the cookie was lost (e.g. Safari): restore it
    if (!/googtrans=\/en\/es/.test(document.cookie)) {
      var d2 = new Date(); d2.setFullYear(d2.getFullYear() + 1);
      writeCookie('/en/es', d2.toUTCString());
    }
    var holder = document.createElement('div');
    holder.id = 'google_translate_element';
    holder.style.display = 'none';
    body.appendChild(holder);
    window.rfxTranslateInit = function () {
      new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'es', autoDisplay: false }, 'google_translate_element');
    };
    var gs = document.createElement('script');
    gs.src = 'https://translate.google.com/translate_a/element.js?cb=rfxTranslateInit';
    gs.async = true;
    body.appendChild(gs);
  }

  /* ---------- Page-leave fade (browsers without view transitions) ---------- */
  if (!reduced && !('onpagereveal' in window)) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      document.documentElement.classList.add('rfx-leaving');
      setTimeout(function () { location.href = url.href; }, 200);
    });
    addEventListener('pageshow', function () { document.documentElement.classList.remove('rfx-leaving'); });
  }
})();
