/* ==========================================================================
   KING CONCRETE PUMPING — BROMLEY MICROSITE
   Vanilla JS: sticky-header shadow, mobile nav, FAQ accordion,
   concrete calculator, scroll-reveal. No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------- Current year in footer -------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ------------------------- Sticky header shadow ---------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------- Mobile nav ---------------------------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    };
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    // Close after tapping a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeNav(); }
    });
    // Close if the viewport grows back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) { closeNav(); }
    });
  }

  /* ---------------------------- FAQ accordion -------------------------- */
  var triggers = document.querySelectorAll('.accordion__trigger');
  Array.prototype.forEach.call(triggers, function (btn) {
    var panel = btn.parentNode.nextElementSibling; // h3 -> panel
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      // Single-open behaviour: close the others first
      Array.prototype.forEach.call(triggers, function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          var op = other.parentNode.nextElementSibling;
          if (op) { op.hidden = true; }
        }
      });
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (panel) { panel.hidden = isOpen; }
    });
  });

  /* ------------------------- Concrete calculator ----------------------- */
  // Conversion factors: value * factor = metres
  var UNITS = {
    metric:   [ ['m', 'Metres', 1], ['cm', 'Centimetres', 0.01], ['mm', 'Millimetres', 0.001] ],
    imperial: [ ['yd', 'Yards', 0.9144], ['ft', 'Feet', 0.3048], ['in', 'Inches', 0.0254] ]
  };
  // Sensible starting units per dimension (index into the arrays above)
  var DEFAULTS = { metric: { length: 0, width: 0, depth: 2 }, imperial: { length: 1, width: 1, depth: 2 } };

  var form = document.getElementById('concrete-calc');
  if (form) {
    var lengthU = document.getElementById('calc-length-unit');
    var widthU  = document.getElementById('calc-width-unit');
    var depthU  = document.getElementById('calc-depth-unit');
    var output  = document.getElementById('calc-output');
    var toggleBtns = form.querySelectorAll('.calc-toggle__btn');
    var system = 'metric';

    var inputs = [
      { field: document.getElementById('calc-length'), unit: lengthU, key: 'length' },
      { field: document.getElementById('calc-width'),  unit: widthU,  key: 'width'  },
      { field: document.getElementById('calc-depth'),  unit: depthU,  key: 'depth'  }
    ];

    // Populate a unit <select> for the chosen system
    function fillUnits(select, key) {
      select.innerHTML = '';
      UNITS[system].forEach(function (u, i) {
        var opt = document.createElement('option');
        opt.value = String(u[2]);      // store the metre factor directly
        opt.textContent = u[1];        // readable name, e.g. "Millimetres"
        if (i === DEFAULTS[system][key]) { opt.selected = true; }
        select.appendChild(opt);
      });
    }

    function calculate() {
      var volume = 1;
      var hasValue = false;
      inputs.forEach(function (row) {
        var raw = parseFloat(row.field.value);
        var factor = parseFloat(row.unit.value) || 0;
        if (!isNaN(raw) && raw > 0) { hasValue = true; }
        var metres = (isNaN(raw) ? 0 : raw) * factor;
        volume *= metres;
      });
      output.textContent = hasValue ? volume.toFixed(2) : '0.00';
    }

    function setSystem(next) {
      system = next;
      toggleBtns.forEach(function (b) {
        var active = b.dataset.system === system;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      fillUnits(lengthU, 'length');
      fillUnits(widthU, 'width');
      fillUnits(depthU, 'depth');
      calculate();
    }

    // Wire up events
    toggleBtns.forEach(function (b) {
      b.addEventListener('click', function () { setSystem(b.dataset.system); });
    });
    form.addEventListener('input', calculate);
    form.addEventListener('change', calculate);
    form.addEventListener('submit', function (e) { e.preventDefault(); calculate(); });

    // Init
    setSystem('metric');
  }

  /* ----------------------------- Scroll reveal ------------------------- */
  var revealTargets = document.querySelectorAll(
    '.about__inner, .process__step, .service-card, .why-point, .areas__inner, .testi-card, .calculator__panel'
  );
  Array.prototype.forEach.call(revealTargets, function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(revealTargets, function (el) { io.observe(el); });
  } else {
    // No IO support: just show everything
    Array.prototype.forEach.call(revealTargets, function (el) { el.classList.add('is-visible'); });
  }

})();
