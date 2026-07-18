/* SocialTDA shared timeline machinery: beat seeking, player controls,
   initial positioning, and the public scene API object.

   GSAP-dependent pieces are only called from a scene's animated branch; the
   static fallback path uses makeSceneApi with timeline: null.

   All programmatic seeks pass suppressEvents=false: scenes may write text
   from onUpdate callbacks (value count-ups), which GSAP suppresses on
   seek()/progress() by default — leaving stale labels otherwise. */

/* Returns seekBeat(beat) accepting a beat name or a numeric index
   (numeric strings from URL params are coerced). */
export function makeSeekBeat(tl, beats) {
  return function seekBeat(beat) {
    if (typeof beat === "string" && /^\d+$/.test(beat)) beat = Number(beat);
    const label = typeof beat === "number" ? beats[beat] : beat;
    if (label && tl.labels[label] !== undefined) tl.pause().seek(label, false);
  };
}

/* Play/pause button, one dot per beat, and a "final frame" button.
   Appends the bar to `root`; returns { bar, syncPlayUi }. */
export function attachBeatControls(root, tl, beats, seekBeat) {
  const bar = document.createElement("div");
  bar.className = "stda-anim-controls";

  const playBtn = document.createElement("button");
  playBtn.className = "stda-anim-btn stda-anim-play";
  playBtn.setAttribute("aria-label", "Play or pause");
  playBtn.addEventListener("click", function () {
    if (tl.paused() || !tl.isActive()) {
      if (tl.progress() === 1) tl.restart();
      else tl.play();
    } else {
      tl.pause();
    }
    syncPlayUi();
  });
  bar.appendChild(playBtn);

  beats.forEach(function (name) {
    const dot = document.createElement("button");
    dot.className = "stda-beat-dot";
    dot.dataset.beat = name;
    dot.setAttribute("aria-label", "Go to beat: " + name);
    dot.title = name;
    dot.addEventListener("click", function () {
      seekBeat(name);
      syncPlayUi();
    });
    bar.appendChild(dot);
  });

  const endBtn = document.createElement("button");
  endBtn.className = "stda-anim-btn";
  endBtn.textContent = "final frame";
  endBtn.setAttribute("aria-label", "Jump to final frame");
  endBtn.addEventListener("click", function () {
    tl.progress(1, false).pause();
    syncPlayUi();
  });
  bar.appendChild(endBtn);

  root.appendChild(bar);
  tl.eventCallback("onUpdate", syncBeatUi);

  function syncPlayUi() {
    playBtn.textContent = tl.paused() ? "▶" : "❚❚";
    syncBeatUi();
  }

  function syncBeatUi() {
    const t = tl.time();
    let current = beats[0];
    beats.forEach(function (name) {
      if (tl.labels[name] !== undefined && t >= tl.labels[name]) current = name;
    });
    bar.querySelectorAll(".stda-beat-dot").forEach(function (d) {
      d.classList.toggle("is-active", d.dataset.beat === current);
    });
  }

  return { bar, syncPlayUi };
}

/* Shared handling of the { end, stage, autoplay } scene options. */
export function applyInitialPosition(tl, opts, seekBeat) {
  if (opts.end) {
    tl.progress(1, false).pause();
  } else if (opts.stage !== null && opts.stage !== undefined && opts.stage !== "") {
    seekBeat(opts.stage);
    if (opts.autoplay) tl.play();
  } else if (opts.autoplay) {
    tl.play(0);
  }
}

/* The public scene API. Pass timeline: null for the static fallback. */
export function makeSceneApi({ svg, root, timeline, seekBeat, syncPlayUi }) {
  const sync = syncPlayUi || function () {};
  return {
    svg,
    timeline,
    goTo: function (beat) {
      if (timeline && seekBeat) { seekBeat(beat); sync(); }
    },
    exportFrame: function (target) {
      if (timeline) {
        timeline.pause();
        if (target === undefined || target === "end") timeline.progress(1, false);
        else if (typeof target === "number" && target <= 1) timeline.progress(target, false);
        else if (seekBeat) seekBeat(target);
        sync();
      }
      return svg;
    },
    destroy: function () {
      if (timeline) timeline.kill();
      root.remove();
    }
  };
}
