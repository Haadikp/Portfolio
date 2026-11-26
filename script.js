/* Hadi K P portfolio: small, dependency-free behaviours.
   Theme toggle, mobile menu, active nav link, scroll reveal,
   demo video dialog, footer year. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js'); // enables reveal animations only when JS runs

  /* ---------- Theme toggle ---------- */
  var toggle = document.getElementById('theme-toggle');
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return darkQuery.matches ? 'dark' : 'light';
  }

  function syncToggle() {
    var theme = currentTheme();
    var next = theme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    var meta = document.querySelectorAll('meta[name="theme-color"]');
    var colour = theme === 'dark' ? '#0f1214' : '#fbfaf7';
    meta.forEach(function (m) { m.setAttribute('content', colour); });
  }

  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: ignore */ }
    syncToggle();
  });

  // If the visitor never chose, follow OS changes live
  darkQuery.addEventListener('change', function () {
    if (!root.hasAttribute('data-theme')) syncToggle();
  });
  syncToggle();

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var navLinks = document.getElementById('nav-links');

  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuBtn.focus();
    }
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------- Header border + active nav link ---------- */
  var header = document.querySelector('.site-header');
  var links = Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(function (s) { return s && !s.hidden; });

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
    var pos = window.scrollY + window.innerHeight * 0.35;
    var current = null;
    sections.forEach(function (s) { if (s.offsetTop <= pos) current = s.id; });
    // At the very bottom, highlight the last section (Contact)
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4 && sections.length) {
      current = sections[sections.length - 1].id;
    }
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Demo video dialog ---------- */
  var dialog = document.getElementById('video-dialog');
  var player = document.getElementById('video-player');
  var title = document.getElementById('video-title');
  var lastTrigger = null;

  function closeVideo() {
    player.pause();
    player.removeAttribute('src');
    player.load();
    if (dialog.open) dialog.close();
  }

  document.querySelectorAll('[data-video]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lastTrigger = btn;
      title.textContent = btn.getAttribute('data-video-title') || 'Demo';
      player.src = btn.getAttribute('data-video');
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        var p = player.play();
        if (p && p.catch) p.catch(function () { /* autoplay blocked: user can press play */ });
      } else {
        window.open(btn.getAttribute('data-video'), '_blank', 'noopener');
      }
    });
  });

  document.getElementById('video-close').addEventListener('click', closeVideo);
  dialog.addEventListener('click', function (e) { if (e.target === dialog) closeVideo(); }); // click on backdrop
  dialog.addEventListener('close', function () {
    player.pause();
    if (lastTrigger) lastTrigger.focus();
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
