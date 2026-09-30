/* ============================================
   Wireframe Interactive Components
   Vanilla JS, no framework.
   Wired via data-* attributes. Idempotent init.
   ============================================ */

(function () {
  'use strict';

  function init() {
    initMobileMenu();
    initAccordion();
    initTabs();
    initModal();
    initDropdown();
    initLucide();
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    document.querySelectorAll('[data-mobile-menu-toggle]').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', function () {
        var target = document.querySelector(btn.dataset.mobileMenuToggle);
        if (!target) return;
        var open = target.getAttribute('data-open') === 'true';
        target.setAttribute('data-open', open ? 'false' : 'true');
      });
    });
    document.querySelectorAll('[data-mobile-menu-close]').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', function () {
        var target = btn.closest('[data-open]');
        if (target) target.setAttribute('data-open', 'false');
      });
    });
  }

  /* ---------- Accordion (FAQ) ---------- */
  function initAccordion() {
    document.querySelectorAll('[data-accordion-trigger]').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', function () {
        var item = btn.closest('[data-accordion-item]');
        if (!item) return;
        var open = item.getAttribute('data-open') === 'true';
        var single = item.parentElement && item.parentElement.hasAttribute('data-accordion-single');
        if (single) {
          item.parentElement.querySelectorAll('[data-accordion-item]').forEach(function (i) {
            i.setAttribute('data-open', 'false');
          });
        }
        item.setAttribute('data-open', open ? 'false' : 'true');
      });
    });
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (root) {
      if (root.dataset.bound) return;
      root.dataset.bound = 'true';
      root.querySelectorAll('[role="tab"]').forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = tab.getAttribute('aria-controls');
          root.querySelectorAll('[role="tab"]').forEach(function (t) {
            t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
          });
          root.querySelectorAll('[role="tabpanel"]').forEach(function (p) {
            if (p.id === target) p.removeAttribute('hidden');
            else p.setAttribute('hidden', '');
          });
        });
      });
    });
  }

  /* ---------- Modal ---------- */
  function initModal() {
    document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', function () {
        var modal = document.getElementById(btn.dataset.modalOpen);
        if (modal) modal.setAttribute('data-open', 'true');
      });
    });
    document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', function () {
        var modal = btn.closest('[data-open]');
        if (modal) modal.setAttribute('data-open', 'false');
      });
    });
    document.querySelectorAll('.modal').forEach(function (modal) {
      if (modal.dataset.bound) return;
      modal.dataset.bound = 'true';
      modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.setAttribute('data-open', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal[data-open="true"]').forEach(function (m) {
          m.setAttribute('data-open', 'false');
        });
      }
    });
  }

  /* ---------- Dropdown menu ---------- */
  function initDropdown() {
    document.querySelectorAll('[data-dropdown-toggle]').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var dropdown = btn.closest('.dropdown');
        if (!dropdown) return;
        var open = dropdown.getAttribute('data-open') === 'true';
        document.querySelectorAll('.dropdown[data-open="true"]').forEach(function (d) {
          d.setAttribute('data-open', 'false');
        });
        if (!open) dropdown.setAttribute('data-open', 'true');
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.dropdown[data-open="true"]').forEach(function (d) {
        d.setAttribute('data-open', 'false');
      });
    });
  }

  /* ---------- Lucide icon hydration ---------- */
  function initLucide() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* ---------- Boot ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for re-init after dynamic content
  window.WireframeUI = { init: init };
})();
