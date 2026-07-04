(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function buildAtlas() {
    var grid = document.querySelector("[data-atlas-grid]");
    if (!grid) return;

    var signatureRow = 17;
    var signatureCol = 16;
    var frag = document.createDocumentFragment();

    for (var row = 0; row < 24; row += 1) {
      for (var col = 0; col < 24; col += 1) {
        var cell = document.createElement("span");
        var score = (row * 11 + col * 7 + row * col) % 31;
        var cls = "atlas-cell";

        if (row === signatureRow && col === signatureCol) cls += " signature";
        else if ((row === 17 || row === 11) && score % 3 === 0) cls += " social";
        else if ((col === 15 || col === 18 || row === 19) && score % 4 === 0) cls += " stem";
        else if (score > 22) cls += " pos";
        else if (score < 8) cls += " neg";

        cell.className = cls;
        cell.style.setProperty("--delay", ((row * 24 + col) % 96) * 7 + "ms");
        frag.appendChild(cell);
      }
    }

    grid.appendChild(frag);
  }

  function initReveals() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach(function (node) { observer.observe(node); });
  }

  function initNav() {
    var nav = document.querySelector(".site-nav");
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");

    function syncScroll() {
      if (!nav) return;
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });

    if (!toggle || !links) return;

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-open", !open);
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  ready(function () {
    buildAtlas();
    initReveals();
    initNav();
  });
})();
