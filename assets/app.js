/* PaceStreak — landing page behaviour.
   Two small things: build the activity grid, and count the stats up once.
   No dependencies, no network, no tracking. */

(function () {
  "use strict";

  var STREAK_DAYS = 47; // must match the number in the markup
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Deterministic PRNG (mulberry32) so the grid is identical on every load and
     for every visitor — a demo that reshuffles looks like noise, not a record. */
  function rng(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildGrid() {
    var host = document.getElementById("heat");
    if (!host) return;

    var weeks = window.matchMedia("(max-width: 600px)").matches ? 18 : 26;
    var total = weeks * 7;
    var random = rng(20260828);
    var frag = document.createDocumentFragment();

    for (var i = 0; i < total; i++) {
      // i counts from the oldest cell; daysAgo counts back from today.
      var daysAgo = total - 1 - i;
      var level;

      if (daysAgo < STREAK_DAYS) {
        // Inside the live streak: always trained, intensity varies.
        var r = random();
        level = r > 0.72 ? 4 : r > 0.4 ? 3 : 2;
      } else {
        // Before it: a realistic run of good weeks and lapses.
        var r2 = random();
        level = r2 > 0.82 ? 3 : r2 > 0.62 ? 2 : r2 > 0.42 ? 1 : 0;
      }

      var cell = document.createElement("i");
      cell.className = "lvl lvl--" + level;
      if (!reduceMotion) {
        cell.style.opacity = "0";
        cell.style.animation =
          "cellIn .32s ease forwards " + (i * 1.6).toFixed(0) + "ms";
      }
      frag.appendChild(cell);
    }

    host.appendChild(frag);
  }

  /* Count each [data-count] up to its final value. The markup already contains
     the real number, so if this never runs the page still reads correctly. */
  function countUp() {
    var nodes = document.querySelectorAll("[data-count]");
    if (!nodes.length || reduceMotion) return;

    Array.prototype.forEach.call(nodes, function (node) {
      var target = parseInt(node.getAttribute("data-count"), 10);
      if (isNaN(target)) return;

      var duration = 900;
      var start = null;
      node.textContent = "0";

      function frame(now) {
        if (start === null) start = now;
        var p = Math.min((now - start) / duration, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    });
  }

  function start() {
    buildGrid();

    // Only animate the numbers once the card is actually on screen.
    var card = document.querySelector(".grid-card");
    if (!card || !("IntersectionObserver" in window)) {
      countUp();
      return;
    }

    var seen = false;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !seen) {
            seen = true;
            countUp();
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(card);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
