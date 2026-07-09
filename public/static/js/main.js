/* Site interactions: navigation, scroll reveals, taxonomy grid, and compact figure animations. */
import { SIGNATURE_BIN, BENCHMARKS, UNLEARNING } from "./animations/socialtda-data.js";

(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function setNavHeight() {
    var navbar = document.querySelector(".paper-nav");
    if (!navbar) return;
    root.style.setProperty("--nav-height", Math.round(navbar.getBoundingClientRect().height) + "px");
  }

  function initNavbar() {
    document.querySelectorAll(".navbar-burger").forEach(function (burger) {
      burger.addEventListener("click", function () {
        var target = document.getElementById(burger.dataset.target);
        var active = !burger.classList.contains("is-active");
        burger.classList.toggle("is-active", active);
        burger.setAttribute("aria-expanded", active ? "true" : "false");
        if (target) target.classList.toggle("is-active", active);
      });
    });

    document.querySelectorAll(".navbar-menu .navbar-item").forEach(function (item) {
      item.addEventListener("click", function () {
        document.querySelectorAll(".navbar-burger").forEach(function (burger) {
          burger.classList.remove("is-active");
          burger.setAttribute("aria-expanded", "false");
        });
        document.querySelectorAll(".navbar-menu").forEach(function (menu) {
          menu.classList.remove("is-active");
        });
      });
    });
  }

  function initTaxonomyGrid() {
    var grid = document.querySelector("[data-tax-grid]");
    if (!grid || grid.childElementCount) return;

    var hotCells = {
      "3-5": "is-social",
      "4-15": "is-negative",
      "8-9": "is-social",
      "10-18": "is-knowledge",
      "14-6": "is-negative",
      "17-13": "is-knowledge",
      "20-2": "is-social"
    };

    for (var r = 0; r < 24; r += 1) {
      for (var c = 0; c < 24; c += 1) {
        var cell = document.createElement("span");
        cell.className = "tax-cell";
        var delay = ((r * 19 + c * 13) % 130) * 6;
        cell.style.setProperty("--delay", delay + "ms");
        var cls = hotCells[r + "-" + c];
        if (cls) cell.classList.add(cls);
        cell.setAttribute("aria-hidden", "true");
        grid.appendChild(cell);
      }
    }
  }

  /* Format a signed z-score for display, e.g. +16.00, -7.31. */
  function fmtZ(z) {
    var s = z >= 0 ? "+" : "\u2212"; // U+2212 minus sign
    return s + Math.abs(z).toFixed(2);
  }

  /* Format an accuracy-fraction delta as percentage points, e.g. +1.60. */
  function fmtPp(frac) {
    var pp = frac * 100;
    var s = pp >= 0 ? "+" : "\u2212";
    return s + Math.abs(pp).toFixed(2);
  }

  /* Render a p-value compactly for the unlearning bar annotations. */
  function fmtP(p) {
    if (typeof p === "string") {
      if (p.startsWith("1.0e-")) return "p \u2248 10<sup>\u2212" + p.slice(5) + "</sup>";
      if (p.startsWith(">")) return "p > 0.99, reversed";
    }
    if (p > 0.05) return "p = " + p + ", n.s.";
    return "p = " + p;
  }

  /* Populate bar rows from the shared data module so numbers live in one place.
     Each row carries data-claim="<benchmark key>" and lives under a
     [data-claim-set] container naming the claim set. */
  function initClaimBars() {
    var sets = {
      "signature-bin": function (key) {
        var v = SIGNATURE_BIN.values[key];
        return v == null ? null : { value: v, label: fmtZ(v) };
      },
      "unlearning": function (key) {
        var row = UNLEARNING.pairedInfluenceVsRandom.find(function (r) { return r.key === key; });
        if (!row) return null;
        var html = fmtPp(row.medianD) + " &nbsp;<small>(" + fmtP(row.wilcoxonPBH) + ")</small>";
        return { value: row.medianD * 100, label: html };
      }
    };

    document.querySelectorAll("[data-claim-set]").forEach(function (container) {
      var lookup = sets[container.getAttribute("data-claim-set")];
      if (!lookup) return;
      container.querySelectorAll(".bar-row[data-claim]").forEach(function (row) {
        var hit = lookup(row.getAttribute("data-claim"));
        if (!hit) return;
        row.setAttribute("data-value", String(hit.value));
        var valueEl = row.querySelector(".bar-value");
        if (valueEl) valueEl.innerHTML = hit.label;
      });
    });
  }

  function initBarWidths() {
    document.querySelectorAll(".bar-row[data-value]").forEach(function (row) {
      var value = parseFloat(row.getAttribute("data-value"));
      var max = parseFloat(row.getAttribute("data-max")) || Math.abs(value) || 1;
      var width = clamp(Math.abs(value) / max * 50, 1.5, 50);
      row.style.setProperty("--bar-width", width + "%");
      var fill = row.querySelector(".bar-fill");
      if (fill) {
        fill.classList.toggle("positive", value >= 0);
        fill.classList.toggle("negative", value < 0);
      }
    });
  }

  function revealRows(container, selector) {
    container.querySelectorAll(selector).forEach(function (row, i) {
      window.setTimeout(function () {
        row.classList.add("is-visible");
      }, i * 90);
    });
  }

  function initScrollAnimations() {
    var nodes = [].slice.call(document.querySelectorAll(
      ".taxonomy-viz, .contrast-viz, .cluster-viz, [data-bars]"
    ));

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
        revealRows(node, ".bar-row");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var node = entry.target;
        node.classList.add("is-visible");
        revealRows(node, ".bar-row");
        observer.unobserve(node);
      });
    }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach(function (node) { observer.observe(node); });
  }

  function initBibtexCopy() {
    var button = document.querySelector("[data-copy-bibtex]");
    var code = document.getElementById("bibtex-code");
    if (!button || !code) return;
    if (!navigator.clipboard) {
      button.hidden = true;
      return;
    }
    button.addEventListener("click", function () {
      navigator.clipboard.writeText(code.textContent).then(function () {
        var original = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(function () { button.textContent = original; }, 1600);
      });
    });
  }

  ready(function () {
    setNavHeight();
    initNavbar();
    initTaxonomyGrid();
    initClaimBars();
    initBarWidths();
    initScrollAnimations();
    initBibtexCopy();

    window.addEventListener("resize", setNavHeight);

    if (window.AOS) {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.AOS.init({ once: true, duration: 650, easing: "ease-out-cubic", disable: reduce });
    }
  });
})();
