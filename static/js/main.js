/* Navbar burger, results tabs, AOS init, fixed-navbar padding. */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.remove("no-js");

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    // Navbar burger
    document.querySelectorAll(".navbar-burger").forEach(function (burger) {
      burger.addEventListener("click", function () {
        var target = document.getElementById(burger.dataset.target);
        burger.classList.toggle("is-active");
        if (target) target.classList.toggle("is-active");
      });
    });

    // Results tabs
    var tabs = document.querySelectorAll("#results-tabs li");
    function activate(tab) {
      tabs.forEach(function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");
      document.querySelectorAll(".tab-pane").forEach(function (p) { p.classList.remove("is-active"); });
      var pane = document.getElementById(tab.getAttribute("data-tab"));
      if (pane) pane.classList.add("is-active");
    }
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { activate(tab); });
    });
    // Optional deep-link: ?tab=tab-influence
    var wanted = new URLSearchParams(window.location.search).get("tab");
    if (wanted) {
      tabs.forEach(function (t) { if (t.getAttribute("data-tab") === wanted) activate(t); });
    }

    // Fixed navbar top padding
    var navbar = document.querySelector(".navbar.is-fixed-top");
    if (navbar) document.body.style.paddingTop = navbar.offsetHeight + "px";

    // Color heatmap cells by value (data-z = influence z-score, data-acc = Δ accuracy pp)
    function hx(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
    function mix(a, b, t) {
      var x = hx(a), y = hx(b);
      return "rgb(" + Math.round(x[0] + (y[0] - x[0]) * t) + "," + Math.round(x[1] + (y[1] - x[1]) * t) + "," + Math.round(x[2] + (y[2] - x[2]) * t) + ")";
    }
    document.querySelectorAll("td[data-z]").forEach(function (td) {
      var z = parseFloat(td.getAttribute("data-z"));
      var t = z >= 0 ? Math.min(z / 3.1, 1) : Math.min(Math.abs(z) / 1.2, 1);
      td.style.backgroundColor = z >= 0 ? mix("#f7f7f7", "#2166AC", t) : mix("#f7f7f7", "#B35806", t);
      if (t > 0.55) td.style.color = "#fff";
    });
    document.querySelectorAll("td[data-acc]").forEach(function (td) {
      var d = parseFloat(td.getAttribute("data-acc"));
      var t = d < 0 ? Math.min(Math.abs(d) / 14.68, 1) : Math.min(d / 0.6, 1);
      td.style.backgroundColor = d < 0 ? mix("#fdf2f0", "#67000D", t) : mix("#f7f7f7", "#4575B4", t);
      if (d < 0 && t > 0.5) td.style.color = "#fff";
    });

    // Scroll-reveal
    if (window.AOS) {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.AOS.init({ once: true, duration: 700, easing: "ease-out-cubic", disable: reduce });
    }
  });
})();
