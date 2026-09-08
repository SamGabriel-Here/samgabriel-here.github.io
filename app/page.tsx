"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ------------------------------------------------------------------ *
 *  Content — the working catalogue                                    *
 * ------------------------------------------------------------------ */

const nav = [
  { id: "log", label: "Log" },
  { id: "catalogue", label: "Catalogue" },
  { id: "instrument", label: "Instrument" },
  { id: "transmit", label: "Transmit" },
];

type Obj = {
  sg: string; // catalogue designation
  name: string;
  type: string; // "object type"
  blurb: string;
  instrument: string; // tech
  date: string;
  live?: string;
  source: string;
  media?: string;
  thumb?: string;
};

// Two brightest objects — shown as full observation plates.
const plates: Obj[] = [
  {
    sg: "SG-1",
    name: "nbodyssey",
    type: "N-body simulation",
    blurb:
      "A GPU galaxy-collision simulator. The Barnes-Hut tree code ran 176× faster than brute force at one million particles on a single Tesla T4.",
    instrument: "CUDA C++ · C++17 · CMake",
    date: "Jul 2026",
    source: "https://github.com/SamGabriel-Here/nbodyssey",
    media: "/nbodyssey.mp4",
  },
  {
    sg: "SG-2",
    name: "NovaSky",
    type: "Desktop planetarium",
    blurb:
      "The real sky above you, on any date, fully offline. 8,900+ naked-eye stars, every constellation, the planets, deep-sky objects, black holes, and a time machine that runs the sky forward.",
    instrument: "TypeScript · Desktop · Astronomy",
    date: "Aug 2026",
    source: "https://github.com/SamGabriel-Here/NovaSky",
    thumb: "/novasky.jpg",
  },
];

// The rest of the catalogue — a working index.
const catalogue: Obj[] = [
  {
    sg: "SG-3",
    name: "Celestial",
    type: "Web instrument",
    blurb:
      "A weather dashboard — current conditions, hourly and five-day outlook, daylight and air quality — behind a secure serverless proxy.",
    instrument: "JavaScript · Vercel",
    date: "Aug 2026",
    live: "https://celestial-tan.vercel.app",
    source: "https://github.com/SamGabriel-Here/celestial",
    thumb: "/celestial.jpg",
  },
  {
    sg: "SG-4",
    name: "NestWorth",
    type: "Regression model",
    blurb: "House-price prediction across five Indian metros.",
    instrument: "Python · XGBoost · Streamlit",
    date: "Jul 2026",
    live: "https://nestworth.streamlit.app",
    source: "https://github.com/SamGabriel-Here/nestworth",
    thumb: "/nestworth.jpg",
  },
  {
    sg: "SG-5",
    name: "PapVision",
    type: "Vision classifier",
    blurb:
      "A cervical-cytology classifier gated to abstain on low-confidence slides. A research and learning project, not a diagnostic tool.",
    instrument: "PyTorch · MobileNetV3 · Flask",
    date: "Aug 2026",
    source: "https://github.com/SamGabriel-Here/pap-vision",
    thumb: "/papvision.jpg",
  },
  {
    sg: "SG-6",
    name: "Nextern",
    type: "Recommender",
    blurb:
      "Matches students to internships by skill, coaches the gaps it finds, and reads a resume with an AI copilot.",
    instrument: "Python · scikit-learn · Gemini",
    date: "Jul 2026",
    live: "https://getnextern.onrender.com",
    source: "https://github.com/SamGabriel-Here/Internship-Allocator",
    thumb: "/nextern.jpg",
  },
  {
    sg: "SG-7",
    name: "GitRep",
    type: "Analyzer",
    blurb: "Scores any public repo's README and hands back honest, actionable feedback.",
    instrument: "React · Vite · FastAPI",
    date: "Jul 2026",
    live: "https://git-rep.onrender.com",
    source: "https://github.com/SamGabriel-Here/GitRep",
    thumb: "/gitrep.jpg",
  },
  {
    sg: "SG-8",
    name: "ShowRush",
    type: "Mobile app",
    blurb: "Movie-ticket booking with an interactive seat map and checkout.",
    instrument: "Flutter · Dart · Material 3",
    date: "Jul 2026",
    live: "https://samgabriel-here.github.io/movie-booking-app/",
    source: "https://github.com/SamGabriel-Here/movie-booking-app",
    thumb: "/showrush.jpg",
  },
];

const toolkit = [
  { k: "Languages", v: "Python, C, C++, CUDA C++, TypeScript, Java, SQL, Dart" },
  { k: "ML & data", v: "PyTorch, scikit-learn, XGBoost, Pandas, Streamlit" },
  { k: "Web", v: "React, Next.js, FastAPI, Flask, Tailwind, Flutter" },
  { k: "Data stores", v: "MySQL, MongoDB" },
  { k: "Tooling", v: "Git, GitHub, VS Code, CMake" },
];

// A real sequence — so it is drawn as a timeline.
const record = [
  {
    when: "2022 — 2026",
    what: "B.Tech, Computer Science & Engineering",
    where: "Prestige Institute of Engineering Management & Research · Indore",
  },
  {
    when: "Jul — Aug 2025",
    what: "Web Development Intern",
    where: "InternPe · Remote — built responsive interfaces in HTML, CSS, and JavaScript",
  },
  {
    when: "2020 — 2022",
    what: "Senior Secondary, CBSE",
    where: "Holy Family Convent School · Indore",
  },
];

const email = "samgabrielofficial@gmail.com";
const github = "https://github.com/SamGabriel-Here";
const linkedin = "https://www.linkedin.com/in/samgabrielofficially/";

/* ------------------------------------------------------------------ *
 *  Motion helpers — pointer motion gated to fine pointer + motion-ok  *
 * ------------------------------------------------------------------ */

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function canHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !prefersReducedMotion()
  );
}

/* Subscribe to a media query the way React 19 wants it: an external store
   rather than setState in an effect, so there is no cascading render and the
   value keeps tracking the setting if the visitor changes it mid-visit. */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false, // server render always takes the conservative branch
  );
}

/* Motion-gated media: the poster carries the frame until we know motion is
   welcome, so reduced-motion visitors never get an autoplaying loop and the
   video bytes are never fetched for them. Asking for `no-preference` rather
   than negating `reduce` keeps the server default on the still frame. */
function useMotionOk() {
  return useMediaQuery("(prefers-reduced-motion: no-preference)");
}

/* Magnetic pull toward the pointer. The listeners are bound in an effect and
   the element is measured once per hover: no ref is read during render, and no
   rect is read per mousemove (both force work the browser does not need). */
function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    let box: DOMRect | null = null;
    const enter = () => {
      box = el.getBoundingClientRect();
    };
    const move = (e: MouseEvent) => {
      if (!box) return;
      const dx = (e.clientX - (box.left + box.width / 2)) * strength;
      const dy = (e.clientY - (box.top + box.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const leave = () => {
      box = null;
      el.style.transform = "translate(0px, 0px)";
    };
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return ref;
}

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const d = document.documentElement;
        const max = d.scrollHeight - d.clientHeight;
        if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? (d.scrollTop / max).toFixed(4) : 0})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 h-px origin-left"
      style={{ transform: "scaleX(0)", background: "var(--amber)" }}
    />
  );
}

/* A finder scope standing in for the pointer. The sight tracks exactly; the
   ring lags a little, which is what makes it read as an instrument rather than
   a sticker, and it locks amber over anything you can actually act on.

   Gated on a fine pointer with motion welcome — touch, coarse pointers and
   reduced-motion visitors keep their own cursor untouched, which matters
   because hiding the system cursor is not a free choice. */
function Reticle() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canHover()) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const root = document.documentElement;
    root.classList.add("reticle-on");

    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    let awake = false;

    const step = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      ring.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      // settled: park the loop rather than compositing a still ring forever
      if (Math.abs(tx - x) < 0.15 && Math.abs(ty - y) < 0.15) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(step);
    };
    const wake = () => {
      if (!raf && !document.hidden) raf = requestAnimationFrame(step);
    };

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      // the sight is never behind the pointer, so aiming still feels exact
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (!awake) {
        awake = true;
        ring.classList.add("is-awake");
        dot.classList.add("is-awake");
      }
      wake();
    };

    const LOCK = 'a, button, input, textarea, select, summary, label, [role="button"]';
    const over = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement | null)?.closest(LOCK);
      ring.classList.toggle("is-locked", Boolean(hit));
    };
    const leave = () => {
      awake = false;
      ring.classList.remove("is-awake", "is-locked");
      dot.classList.remove("is-awake");
    };
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        wake();
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      root.classList.remove("reticle-on");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden className="reticle">
        <span className="reticle-tick" />
        <span className="reticle-tick" />
        <span className="reticle-tick" />
        <span className="reticle-tick" />
        <span className="reticle-ring" />
      </div>
      <div ref={dotRef} aria-hidden className="reticle-dot" />
    </>
  );
}

/* The deep field. A Milky Way band, three parallax depths of stars in
   emission colours, faint asterism lines, occasional meteors, and one amber
   guide star. Still throttled to 30fps, DPR-capped and parked when the tab is
   hidden: this is atmosphere, not a reason to spin the fan. */
type Star = {
  x: number;
  y: number;
  d: number;
  s: number;
  b: number;
  tw: number;
  ph: number;
  tint: string;
  halo: boolean;
};

type Meteor = { x: number; y: number; vx: number; vy: number; life: number; span: number };

// straight from the palette: starlight, ion, rose, violet, warm gold
const TINTS = ["242,239,249", "103,232,240", "255,122,176", "177,140,255", "255,200,150"];
const TINT_WEIGHTS = [0.5, 0.16, 0.11, 0.11, 0.12];
const AMBER_RGB = "255,180,84"; // --amber
const AMBER_CORE_RGB = "255,214,170"; // --amber, lifted toward its core

/* Asterisms in normalised space. Drawn faintly, they turn a random scatter
   into something that reads as a chart. */
const ASTERISMS: [number, number][][] = [
  [
    [0.07, 0.2],
    [0.13, 0.29],
    [0.2, 0.25],
    [0.26, 0.36],
    [0.18, 0.43],
    [0.07, 0.2],
  ],
  [
    [0.69, 0.63],
    [0.76, 0.56],
    [0.83, 0.61],
    [0.89, 0.53],
  ],
  [
    [0.43, 0.79],
    [0.5, 0.71],
    [0.57, 0.75],
    [0.62, 0.67],
  ],
];

// centroids once at module load; the draw loop must not recompute them
const CENTROIDS: [number, number][] = ASTERISMS.map((f) => [
  f.reduce((t, q) => t + q[0], 0) / f.length,
  f.reduce((t, q) => t + q[1], 0) / f.length,
]);

function makeStars(n: number): Star[] {
  let seed = 2113;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const pickTint = () => {
    let r = rand();
    for (let i = 0; i < TINT_WEIGHTS.length; i++) {
      r -= TINT_WEIGHTS[i];
      if (r <= 0) return TINTS[i];
    }
    return TINTS[0];
  };
  return Array.from({ length: n }, () => {
    const d = rand();
    // roughly two in five sit in the galactic band, which runs low-left to
    // high-right; the triangular sum is a cheap stand-in for a normal spread
    const band = rand() < 0.42;
    const x = rand();
    let y = rand();
    if (band) {
      const centre = 0.82 - 0.6 * x;
      y = centre + (rand() + rand() + rand() - 1.5) * 0.12;
      y = Math.min(0.999, Math.max(0.001, y));
    }
    return {
      x,
      y,
      d,
      s: d > 0.93 ? 2 : 1,
      b: (0.22 + d * 0.66) * (band ? 1.15 : 1),
      tw: 0.0006 + rand() * 0.0016,
      ph: rand() * Math.PI * 2,
      tint: pickTint(),
      halo: d > 0.955,
    };
  });
}

function StarChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let ptx = 0;
    let pty = 0;
    let px = 0;
    let py = 0;
    const hover = canHover();
    const onPointer = (e: PointerEvent) => {
      ptx = (e.clientX / innerWidth - 0.5) * 2;
      pty = (e.clientY / innerHeight - 0.5) * 2;
    };
    if (hover) window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // density follows the viewport, so a phone never draws a desktop's field
    const count = Math.round(Math.max(150, Math.min(520, (innerWidth * innerHeight) / 3400)));
    const stars = makeStars(count);
    const guide = { x: 0.78, y: 0.26 };
    const meteors: Meteor[] = [];
    let nextMeteor = 4000;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      px += (ptx - px) * 0.05;
      py += (pty - py) * 0.05;

      // asterisms sit at a single mid depth so the figures stay rigid
      const ad = 0.55;
      const ax = -px * (0.006 + ad * 0.026) * w;
      const ay = -scroll * (0.02 + ad * 0.08) - py * (0.004 + ad * 0.016) * h;
      ctx.lineWidth = 1;
      // one uniform scale for both axes, so a figure keeps its shape instead of
      // stretching into a zigzag on a narrow screen
      const fs = Math.min(w, h);
      for (let f = 0; f < ASTERISMS.length; f++) {
        const fig = ASTERISMS[f];
        const c = CENTROIDS[f];
        const ox = c[0] * w + ax;
        const oy = c[1] * h + ay;
        ctx.strokeStyle = `rgba(${TINTS[0]},0.07)`;
        ctx.beginPath();
        for (let i = 0; i < fig.length; i++) {
          const cx = ox + (fig[i][0] - c[0]) * fs;
          const cy = oy + (fig[i][1] - c[1]) * fs;
          if (i === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
        ctx.fillStyle = `rgba(${TINTS[0]},0.34)`;
        for (let i = 0; i < fig.length; i++) {
          ctx.fillRect(
            Math.round(ox + (fig[i][0] - c[0]) * fs),
            Math.round(oy + (fig[i][1] - c[1]) * fs),
            2,
            2,
          );
        }
      }

      for (const s of stars) {
        const drift = t * 0.0000016 * (0.25 + s.d);
        const x = (((s.x + drift - px * (0.006 + s.d * 0.026)) % 1) + 1) % 1;
        const yy = s.y - (scroll * (0.02 + s.d * 0.08)) / h - py * (0.004 + s.d * 0.016);
        const y = ((yy % 1) + 1) % 1;
        const a = s.b * (0.55 + 0.45 * Math.sin(t * s.tw + s.ph));
        const cx = Math.round(x * w);
        const cy = Math.round(y * h);
        if (s.halo) {
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 7);
          g.addColorStop(0, `rgba(${s.tint},${(a * 0.45).toFixed(3)})`);
          g.addColorStop(1, `rgba(${s.tint},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(cx - 7, cy - 7, 14, 14);
        }
        ctx.fillStyle = `rgba(${s.tint},${a.toFixed(3)})`;
        ctx.fillRect(cx, cy, s.s, s.s);
      }

      // meteors: rare, brief, and never more than a couple at once
      if (t > nextMeteor) {
        nextMeteor = t + 9000 + Math.random() * 14000;
        if (meteors.length < 2) {
          meteors.push({
            x: 0.08 + Math.random() * 0.8,
            y: -0.04,
            vx: 0.00019 + Math.random() * 0.00013,
            vy: 0.00026 + Math.random() * 0.00016,
            life: 0,
            span: 1100 + Math.random() * 500,
          });
        }
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life += 33;
        if (m.life > m.span) {
          meteors.splice(i, 1);
          continue;
        }
        const p = m.life / m.span;
        const hx = (m.x + m.vx * m.life) * w;
        const hy = (m.y + m.vy * m.life) * h;
        const tailX = hx - m.vx * 260 * w;
        const tailY = hy - m.vy * 260 * h;
        const fade = Math.sin(Math.PI * p) * 0.75;
        const g = ctx.createLinearGradient(hx, hy, tailX, tailY);
        g.addColorStop(0, `rgba(${TINTS[0]},${fade.toFixed(3)})`);
        g.addColorStop(1, `rgba(${TINTS[0]},0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      // the guide star — the one thing that is alight
      const gx = (guide.x - px * 0.03) * w;
      const gy = (guide.y - (scroll * 0.05) / h - py * 0.02) * h;
      const pulse = 0.6 + 0.4 * Math.sin(t * 0.0022);
      // halo kept under the luminance ceiling that --faint text needs; the
      // core still reads as a lit star without washing out anything behind it
      const rad = 26;
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad);
      grad.addColorStop(0, `rgba(${AMBER_RGB},${(0.26 * pulse).toFixed(3)})`);
      grad.addColorStop(0.45, `rgba(${AMBER_RGB},${(0.07 * pulse).toFixed(3)})`);
      grad.addColorStop(1, `rgba(${AMBER_RGB},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(gx - rad, gy - rad, rad * 2, rad * 2);
      ctx.fillStyle = `rgba(${AMBER_CORE_RGB},${(0.9 * pulse).toFixed(3)})`;
      ctx.fillRect(Math.round(gx), Math.round(gy), 2, 2);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      draw(0);
    } else {
      const gap = 1000 / 30;
      let last = 0;
      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);
        if (t - last < gap) return;
        last = t;
        draw(t);
      };
      const onVis = () => {
        if (document.hidden) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else if (!raf) {
          last = 0;
          raf = requestAnimationFrame(loop);
        }
      };
      document.addEventListener("visibilitychange", onVis);
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", onVis);
      };
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}

/* Emission lobes at the edges, scrim through the middle. Pure CSS, so it
   costs one paint and never repaints. */
function NebulaField() {
  return <div aria-hidden className="nebula-field" />;
}

/* Photographic grain over the whole frame. One fixed element, no repaint. */
function Grain() {
  return <div aria-hidden className="grain" />;
}

/* A headline split to characters so it can arrive as a cascade. The spans are
   hidden from assistive tech and the heading carries the real label, so this
   is never read out letter by letter. */
function SplitText({ text, delay = 0.12 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // drop the property hint once the cascade is over
    const t = setTimeout(() => el.classList.add("split-done"), (delay + text.length * 0.028 + 1) * 1000);
    return () => clearTimeout(t);
  }, [delay, text.length]);
  return (
    <span ref={ref} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={`${ch}-${i}`} className="char" style={{ animationDelay: `${delay + i * 0.028}s` }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

function GridField() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => ref.current?.classList.add("drawn"));
    return () => cancelAnimationFrame(id);
  }, []);
  return <div ref={ref} aria-hidden className="grid-field" />;
}

function BackgroundLoop() {
  const vref = useRef<HTMLVideoElement>(null);
  // globals.css hides this layer under 640px and under reduced motion.
  // Match that here so the megabyte is never fetched for those visitors.
  const wide = useMediaQuery("(min-width: 641px)");
  const motionOk = useMotionOk();
  const enabled = wide && motionOk;

  useEffect(() => {
    const v = vref.current;
    if (!enabled || !v) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onActivity = () => {
      if (document.hidden) return;
      if (v.paused) v.play().catch(() => {});
      clearTimeout(timer);
      timer = setTimeout(() => v.pause(), 1600);
    };
    const onVis = () => {
      if (document.hidden) {
        clearTimeout(timer);
        v.pause();
      }
    };
    const evs: (keyof WindowEventMap)[] = ["scroll", "wheel", "mousemove", "pointerdown", "keydown", "touchmove"];
    for (const e of evs) window.addEventListener(e, onActivity, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      for (const e of evs) window.removeEventListener(e, onActivity);
      document.removeEventListener("visibilitychange", onVis);
      clearTimeout(timer);
    };
  }, [enabled]);

  return (
    <div aria-hidden className="bg-loop pointer-events-none fixed inset-0 -z-20">
      <video
        ref={vref}
        src={enabled ? "/cosmic-loop.mp4" : undefined}
        poster="/cosmic-loop.jpg"
        className="h-full w-full object-cover opacity-30"
        loop
        muted
        playsInline
        preload="none"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 20%, rgba(var(--ground-rgb), 0.55) 0%, rgba(var(--ground-rgb), 0.9) 100%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Chrome                                                             *
 * ------------------------------------------------------------------ */

/* Real sky for the station in the hero, not invented data: local sidereal
   time tells you which right ascension is on the meridian over Indore right
   now, and the moon's age comes from the synodic month since a known new
   moon. Both are computed from the visitor's clock. */
const STATION_LON = 75.86; // degrees east

function skyReadout(now: Date) {
  const jd = now.getTime() / 86400000 + 2440587.5;
  const d = jd - 2451545.0;

  // Greenwich mean sidereal time, then shift east to the station
  const gmst = 18.697374558 + 24.06570982441908 * d;
  const lst = ((((gmst + STATION_LON / 15) % 24) + 24) % 24);
  const lh = Math.floor(lst);
  const lm = Math.floor((lst - lh) * 60);

  // moon age against the new moon of 2000-01-06 18:14 UT
  const synodic = 29.530588853;
  const age = (((jd - 2451550.1) % synodic) + synodic) % synodic;
  const illum = Math.round(((1 - Math.cos((2 * Math.PI * age) / synodic)) / 2) * 100);
  const phase = age < synodic / 2 ? "waxing" : "waning";

  return `LST ${String(lh).padStart(2, "0")}h${String(lm).padStart(2, "0")}m · Moon ${illum}% ${phase}`;
}

function SkyReadout() {
  const [sky, setSky] = useState("—");
  useEffect(() => {
    const f = () => setSky(skyReadout(new Date()));
    f();
    const id = setInterval(f, 30000);
    return () => clearInterval(id);
  }, []);
  return <span>{sky}</span>;
}

function Clock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{t}</span>;
}

function Header() {
  const [active, setActive] = useState("log");
  const [menuOpen, setMenuOpen] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.4);
  const barRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // read inside the scroll handler, which must not retreat an open menu
  const openRef = useRef(false);

  const setMenu = (next: boolean) => {
    openRef.current = next;
    setMenuOpen(next);
  };

  // Escape closes and hands focus back to the control that opened it
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      openRef.current = false;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return; // ignore jitter and rubber-banding
      el.dataset.hidden = !openRef.current && y > last && y > 140 ? "true" : "false";
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <header
      ref={barRef}
      data-hidden="false"
      // a keyboard user tabbing into a retreated header must bring it back
      onFocusCapture={() => {
        if (barRef.current) barRef.current.dataset.hidden = "false";
      }}
      className="nav-shell fixed inset-x-0 top-0 z-40 border-b border-[color:var(--line)] backdrop-blur-md"
      style={{ background: "rgba(var(--ground-rgb), 0.8)" }}
    >
      <div className="shell flex h-14 items-center justify-between px-5 sm:px-8">
        <a href="#log" className="mono text-[12px] text-[color:var(--starlight)]">
          Sam&nbsp;Gabriel
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              className="mono text-[11px] transition-colors"
              style={{ color: active === n.id ? "var(--amber)" : "var(--dim)" }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* the bar retreats on scroll; this wrapper counter-moves so the one
              route to the conversion never leaves the screen */}
          <span className="cta-persist">
            <a
              href="#transmit"
              ref={ctaRef}
              onClick={() => setMenu(false)}
              className="mono block rounded-sm border border-[color:var(--amber)]/40 px-3.5 py-1.5 text-[11px] text-[color:var(--amber)] transition-colors hover:bg-[color:var(--amber)] hover:text-[color:var(--ink)]"
              style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), background-color 0.2s, color 0.2s" }}
            >
              Transmit
            </a>
          </span>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenu(!menuOpen)}
            className="mono rounded-sm border border-[color:var(--line-strong)] px-3 py-1.5 text-[11px] text-[color:var(--dim)] transition-colors hover:text-[color:var(--starlight)] md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Below md this is the only way to reach a section. Only one of the two
          navs is ever in the accessibility tree: the other is display:none. */}
      <div id="nav-menu" hidden={!menuOpen} className="border-t border-[color:var(--line)] md:hidden">
        <nav aria-label="Sections" className="shell flex flex-col px-5 pb-3 sm:px-8">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              onClick={() => setMenu(false)}
              className="mono border-b border-[color:var(--line)] py-3.5 text-[12px] last:border-b-0"
              style={{ color: active === n.id ? "var(--amber)" : "var(--dim)" }}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ *
 *  Sections                                                           *
 * ------------------------------------------------------------------ */

function Hero() {
  const secRef = useRef<HTMLElement>(null);
  const on = useRef(false);
  useEffect(() => {
    on.current = canHover();
  }, []);
  const box = useRef<DOMRect | null>(null);
  const onEnter = () => {
    if (on.current && secRef.current) box.current = secRef.current.getBoundingClientRect();
  };
  const onMove = (e: React.PointerEvent) => {
    const el = secRef.current;
    const r = box.current;
    if (!on.current || !el || !r) return;
    el.style.setProperty("--mx", ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)).toFixed(3));
  };
  const onLeave = () => {
    box.current = null;
    const el = secRef.current;
    if (el) {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    }
  };

  const meta = [
    ["Observer", "Sam Gabriel"],
    ["Station", "Indore · 22.72°N 75.86°E"],
    ["Field", "Machine learning, GPU, software"],
  ];

  return (
    <section
      id="log"
      ref={secRef}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="entry relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-28 sm:px-8"
    >
      <div className="shell">
        <p className="marker">Observation Log · Opened 2026</p>

        {/* the name at full measure — the first thing the deep field frames */}
        <h1
          aria-label="Sam Gabriel"
          className="display mt-4 text-[clamp(3.4rem,12vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.035em] text-[color:var(--starlight)]"
          style={{
            transform: "translate3d(calc(var(--mx,0)*-8px), calc(var(--my,0)*-5px), 0)",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <SplitText text="Sam Gabriel" />
        </h1>

        <div className="mt-11 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-14">
          <div>
            <p className="max-w-[52ch] text-[18px] leading-relaxed text-[color:var(--dim)]">
              Machine-learning and software engineer. I take hard problems — GPU
              physics, the night sky, messy data — and build instruments that make
              them legible.
            </p>

            <dl className="mono mt-9 grid max-w-lg grid-cols-1 gap-y-3 text-[12px] sm:grid-cols-[110px_1fr]">
              {meta.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-[color:var(--faint)]">{k}</dt>
                  <dd className="text-[color:var(--starlight)]">{v}</dd>
                </div>
              ))}
              <dt className="text-[color:var(--faint)]">Sky</dt>
              <dd className="text-[color:var(--dim)]">
                <SkyReadout />
              </dd>
              <dt className="text-[color:var(--faint)]">Status</dt>
              <dd className="flex items-center gap-2 text-[color:var(--amber)]">
                <span className="guide-star bloom inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--amber)]" />
                Open to work
              </dd>
            </dl>
          </div>

          {/* the brightest object, framed like a plate from the archive */}
          <a
            href="#catalogue"
            className="group relative block overflow-hidden border border-[color:var(--line-strong)] transition-colors hover:border-[color:var(--amber)]/45"
            style={{
              transform: "translate3d(calc(var(--mx,0)*10px), calc(var(--my,0)*7px), 0)",
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <PlateMedia
                o={plates[0]}
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 55%, rgba(var(--ground-rgb),0.85) 100%)" }}
              />
            </div>
            <div className="mono absolute left-3 top-3 flex items-center gap-2 text-[10px]">
              <span className="bg-[color:var(--amber)] px-1.5 py-0.5 text-[color:var(--ink)]">{plates[0].sg}</span>
              <span className="text-[color:var(--dim)]">{plates[0].type}</span>
            </div>
            <div className="border-t border-[color:var(--line)] px-4 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="display text-xl font-medium text-[color:var(--starlight)]">
                  {plates[0].name}
                </span>
                <span className="mono shrink-0 text-[10px] text-[color:var(--faint)]">Latest plate</span>
              </div>
              {/* the single strongest depth signal on the site, above the fold */}
              <p className="mono mt-1.5 text-[11px] text-[color:var(--ion)]">
                176× faster than brute force at one million particles
              </p>
            </div>
          </a>
        </div>
      </div>

      <p className="mono shell absolute inset-x-0 bottom-6 px-5 text-[10px] text-[color:var(--faint)] sm:px-8">
        Scroll to open the catalogue ↓
      </p>
    </section>
  );
}

/* One media slot for both plate sizes. The poster carries the frame until we
   know motion is welcome, so a reduced-motion visitor never gets an
   un-pausable loop (WCAG 2.2.2) and never pays for the video bytes. */
function PlateMedia({ o, className }: { o: Obj; className: string }) {
  const motionOk = useMotionOk();
  if (o.media) {
    return (
      <video
        key={motionOk ? "motion" : "still"}
        src={motionOk ? o.media : undefined}
        poster={o.media.replace(/\.mp4$/, ".jpg")}
        className={className}
        autoPlay={motionOk}
        loop
        muted
        playsInline
        preload={motionOk ? "metadata" : "none"}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={o.thumb} alt={`${o.name} — ${o.type}`} className={className} loading="lazy" />
  );
}

function Plate({ o }: { o: Obj }) {
  const ref = useRef<HTMLElement>(null);
  const on = useRef(false);
  const box = useRef<DOMRect | null>(null);
  useEffect(() => {
    on.current = canHover();
  }, []);
  const enter = () => {
    if (on.current && ref.current) box.current = ref.current.getBoundingClientRect();
  };
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    const r = box.current;
    if (!on.current || !el || !r) return;
    const rx = ((0.5 - (e.clientY - r.top) / r.height) * 5).toFixed(2);
    const ry = (((e.clientX - r.left) / r.width - 0.5) * 6).toFixed(2);
    el.style.transition = "box-shadow 0.4s, border-color 0.4s";
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const leave = () => {
    box.current = null;
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s, border-color 0.4s";
    el.style.transform = "";
  };
  const primary = o.live || o.source;
  return (
    <article
      ref={ref}
      onMouseEnter={enter}
      onMouseMove={move}
      onMouseLeave={leave}
      className="group relative block overflow-hidden border border-[color:var(--line-strong)] hover:border-[color:var(--amber)]/45"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <PlateMedia o={o} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 45%, rgba(var(--ground-rgb),0.92) 100%)" }}
        />
        <div className="mono absolute left-3 top-3 flex items-center gap-2 text-[10px]">
          <span className="bg-[color:var(--amber)] px-1.5 py-0.5 text-[color:var(--ink)]">{o.sg}</span>
          <span className="text-[color:var(--dim)]">{o.type}</span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-3xl font-medium text-[color:var(--starlight)] sm:text-4xl">
            {/* the plate is one target; the pseudo-element stretches this link over it */}
            <a
              href={primary}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-[color:var(--amber)]"
            >
              {o.name}
            </a>
          </h3>
          <span className="mono shrink-0 text-[10px] text-[color:var(--faint)]">{o.date}</span>
        </div>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[color:var(--dim)]">{o.blurb}</p>
        <div className="mono mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]">
          <span className="text-[color:var(--faint)]">{o.instrument}</span>
          <span className="ml-auto flex items-center gap-4">
            {o.live && <span className="text-[color:var(--amber)]">Open instrument</span>}
            <a
              href={o.source}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 text-[color:var(--dim)] underline decoration-transparent underline-offset-4 transition-colors hover:text-[color:var(--amber)] hover:decoration-[color:var(--amber)]"
            >
              Source
            </a>
          </span>
        </div>
      </div>
    </article>
  );
}

/* The catalogue as a horizontal journey. The pin is position: sticky and the
   travel is a single transform driven by one CSS variable, so there is no
   animation library and no layout work per frame — one rect read, one write.
   Below 1024px, and whenever motion is unwelcome, it is simply a list. */
function Catalogue() {
  const all = [...plates, ...catalogue];
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    // the pinned frame is ~670px tall; below that it would be silently clipped
    if (!window.matchMedia("(min-height: 720px)").matches) return;
    if (prefersReducedMotion()) return;

    let raf = 0;
    let travel = 0;

    const measure = () => {
      const frame = track.parentElement;
      if (!frame) return;
      travel = Math.max(0, track.scrollWidth - frame.clientWidth);
      // the rail is as tall as the viewport plus the distance the track travels,
      // so one screen of scrolling maps to one screen of horizontal movement
      rail.style.height = `${window.innerHeight + travel}px`;
    };
    const update = () => {
      raf = 0;
      const span = rail.offsetHeight - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -rail.getBoundingClientRect().top / span));
      track.style.setProperty("--travel", (p * travel).toFixed(1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    /* Keyboard and find-in-page both move focus to cards that are off to the
       right. Left alone the browser scrolls the clipping box to reveal them,
       which the transform cannot see. Instead: work out the page scroll offset
       that brings the focused card into the frame and go there, so the existing
       scroll -> --travel pipeline stays the single source of truth. */
    const onFocusIn = (e: FocusEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".cat-card");
      const frame = track.parentElement;
      if (!card || !frame || travel <= 0) return;
      const span = rail.offsetHeight - window.innerHeight;
      if (span <= 0) return;
      const current = parseFloat(track.style.getPropertyValue("--travel") || "0");
      const want = Math.min(
        card.offsetLeft,
        Math.max(current, card.offsetLeft + card.offsetWidth - frame.clientWidth),
      );
      const target = Math.min(travel, Math.max(0, want));
      if (Math.abs(target - current) < 1) return;
      const railTop = rail.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: railTop + (target / travel) * span, behavior: "auto" });
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    track.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      track.removeEventListener("focusin", onFocusIn);
      cancelAnimationFrame(raf);
      rail.style.height = "";
      track.style.removeProperty("--travel");
    };
  }, []);

  return (
    <section id="catalogue" className="relative scroll-mt-14">
      <div ref={railRef} className="cat-rail">
        <div className="cat-pin">
          <div className="shell px-5 py-24 sm:px-8 lg:py-0">
            <div className="flex items-end justify-between border-b border-[color:var(--line-strong)] pb-5">
              <h2 className="display text-5xl font-medium tracking-[-0.03em] text-[color:var(--starlight)] sm:text-7xl">
                The Catalogue
              </h2>
              <p className="mono text-[11px] text-[color:var(--faint)]">{all.length} objects observed</p>
            </div>

            <div ref={trackRef} className="cat-track mt-10">
              {all.map((o) => (
                <div key={o.name} className="cat-card">
                  <Plate o={o} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="shell px-5 pb-24 sm:px-8 sm:pb-32">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="mono text-[12px] text-[color:var(--dim)] underline decoration-[color:var(--line-strong)] underline-offset-4 transition-colors hover:text-[color:var(--amber)] hover:decoration-[color:var(--amber)]"
        >
          Full observation archive on GitHub
        </a>
      </div>
    </section>
  );
}

function Instrument() {
  return (
    <section id="instrument" className="relative scroll-mt-14 px-5 py-24 sm:px-8 sm:py-32">
      <div className="shell grid gap-16 lg:grid-cols-2">
        {/* instrument spec */}
        <div>
          <h2 className="reveal display text-4xl font-medium tracking-[-0.02em] text-[color:var(--starlight)] sm:text-6xl">Instrument</h2>
          <p className="reveal mt-3 max-w-[46ch] text-[15px] leading-relaxed text-[color:var(--dim)]">
            What I build with. Read it as a spec sheet — the optics, the mount, the software behind the eyepiece.
          </p>
          <dl className="reveal mt-8">
            {toolkit.map((row) => (
              <div key={row.k} className="grid grid-cols-1 gap-1 border-t border-[color:var(--line)] py-4 sm:grid-cols-[130px_1fr] sm:gap-6">
                <dt className="mono text-[11px] text-[color:var(--amber)]">{row.k}</dt>
                <dd className="text-[14px] leading-relaxed text-[color:var(--starlight)]">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* record — a real dated sequence, so: a timeline */}
        <div>
          <h2 className="reveal display text-4xl font-medium tracking-[-0.02em] text-[color:var(--starlight)] sm:text-6xl">Record</h2>
          <p className="reveal mt-3 max-w-[46ch] text-[15px] leading-relaxed text-[color:var(--dim)]">
            Where the observing time went.
          </p>
          <ol className="reveal mt-8 border-l border-[color:var(--line-strong)]">
            {record.map((r) => (
              <li key={r.what} className="relative pb-8 pl-6 last:pb-0">
                <span className="absolute left-[-4.5px] top-1.5 h-2 w-2 rounded-full bg-[color:var(--amber)]" />
                <p className="mono text-[11px] text-[color:var(--faint)]">{r.when}</p>
                <p className="mt-1.5 text-[15px] font-medium text-[color:var(--starlight)]">{r.what}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-[color:var(--dim)]">{r.where}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Transmit() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const sendRef = useMagnetic<HTMLButtonElement>(0.22);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Signal from ${name || "the field"}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`;
  };

  /* There is no backend here, so the form hands off to a mail client. A visitor
     on webmail may have none registered, in which case the button appears to do
     nothing — this gives them the address instead. */
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // clipboard can be refused; the address is printed beside the form anyway
    }
  };

  const fieldCls =
    "mt-2 w-full border border-[color:var(--field-line)] bg-transparent px-3.5 py-2.5 text-[14px] text-[color:var(--starlight)] outline-none placeholder:text-[color:var(--faint)] focus:border-[color:var(--amber)]";

  return (
    <section id="transmit" className="relative scroll-mt-14 px-5 py-24 sm:px-8 sm:py-32">
      <div className="shell grid gap-12 border-t border-[color:var(--line-strong)] pt-14 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <h2 className="reveal display text-5xl font-medium leading-[0.98] tracking-[-0.03em] text-[color:var(--starlight)] sm:text-7xl">
            Open a channel
          </h2>
          <p className="reveal mt-5 max-w-[42ch] text-[16px] leading-relaxed text-[color:var(--dim)]">
            A project, a role, or a question about the catalogue — send a signal and I&apos;ll answer.
          </p>
          <div className="reveal mono mt-8 flex flex-col gap-2 text-[12px]">
            <a href={`mailto:${email}`} className="text-[color:var(--starlight)] hover:text-[color:var(--amber)]">{email}</a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-[color:var(--dim)] hover:text-[color:var(--amber)]">github.com/SamGabriel-Here</a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-[color:var(--dim)] hover:text-[color:var(--amber)]">linkedin.com/in/samgabrielofficially</a>
          </div>
        </div>

        <form onSubmit={submit} className="reveal">
          <label className="mono text-[11px] text-[color:var(--faint)]" htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Who is transmitting?" className={fieldCls} />

          <label className="mono mt-5 block text-[11px] text-[color:var(--faint)]" htmlFor="msg">Message</label>
          <textarea id="msg" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="What&apos;s the signal?" className={`${fieldCls} resize-none`} />

          <button
            type="submit"
            ref={sendRef}
            className="mono mt-6 w-full bg-[color:var(--amber)] py-3 text-[12px] font-bold text-[color:var(--ink)] hover:bg-[color:var(--amber-deep)]"
            style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), background-color 0.2s" }}
          >
            Transmit
          </button>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
            <p className="mono text-[11px] text-[color:var(--faint)]">
              Opens your email app · I reply within a day
            </p>
            <button
              type="button"
              onClick={copyAddress}
              className="mono text-[11px] text-[color:var(--dim)] underline decoration-[color:var(--line-strong)] underline-offset-4 transition-colors hover:text-[color:var(--amber)] hover:decoration-[color:var(--amber)]"
            >
              {copied ? "Address copied" : "No mail app? Copy the address"}
            </button>
          </div>
          <p aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--line)] px-5 py-8 sm:px-8">
      <div className="shell flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="mono text-[10px] text-[color:var(--faint)]">
          Observation Log of Sam Gabriel · Indore · © {new Date().getFullYear()}
        </p>
        <p className="mono text-[10px] text-[color:var(--faint)]">
          Compiled with Next.js · <Clock /> IST
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ *
 *  Page                                                               *
 * ------------------------------------------------------------------ */

export default function Home() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <noscript>
        {/* entrances are observer-driven; without JS every section must still show */}
        <style>{`.reveal{opacity:1 !important}`}</style>
      </noscript>
      <BackgroundLoop />
      <NebulaField />
      <StarChart />
      <Grain />
      <GridField />
      <Reticle />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Catalogue />
        <Instrument />
        <Transmit />
      </main>
      <Footer />
    </div>
  );
}
