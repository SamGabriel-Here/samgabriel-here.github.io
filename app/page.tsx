"use client";

import { useEffect, useRef, useState } from "react";

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

function canHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  const on = useRef(false);
  useEffect(() => {
    on.current = canHover();
  }, []);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!on.current || !el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${(e.clientY - (r.top + r.height / 2)) * strength}px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };
  return { ref, onMouseMove, onMouseLeave };
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

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!canHover()) return;
    const el = ref.current;
    if (!el) return;
    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let x = tx;
    let y = ty;
    let shown = false;
    let raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        el.style.opacity = "1";
      }
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${(x - 150).toFixed(1)}px, ${(y - 150).toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-20 h-[300px] w-[300px] rounded-full opacity-0"
      style={{
        background: "radial-gradient(circle, rgba(255,180,84,0.09) 0%, transparent 62%)",
        mixBlendMode: "screen",
        transition: "opacity 0.6s ease",
      }}
    />
  );
}

/* The star chart: cool field, one amber guide star, pointer + scroll parallax */
type Star = { x: number; y: number; d: number; s: number; b: number; tw: number; ph: number; tint: string };

const TINTS = ["238,242,246", "190,214,240", "255,210,150"];

function makeStars(n: number): Star[] {
  let seed = 2113;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  return Array.from({ length: n }, () => {
    const d = rand();
    return {
      x: rand(),
      y: rand(),
      d,
      s: d > 0.9 ? 2 : 1,
      b: 0.25 + d * 0.6,
      tw: 0.0006 + rand() * 0.0015,
      ph: rand() * Math.PI * 2,
      tint: TINTS[Math.floor(rand() * 8) % 3 === 2 && rand() > 0.75 ? 2 : Math.floor(rand() * 2)],
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

    const stars = makeStars(210);
    // one amber guide star, catalogued
    const guide = { x: 0.78, y: 0.26 };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      px += (ptx - px) * 0.05;
      py += (pty - py) * 0.05;

      for (const s of stars) {
        const drift = t * 0.0000016 * (0.25 + s.d);
        const x = (((s.x + drift - px * (0.006 + s.d * 0.02)) % 1) + 1) % 1;
        const yy = s.y - (scroll * (0.02 + s.d * 0.06)) / h - py * (0.004 + s.d * 0.012);
        const y = ((yy % 1) + 1) % 1;
        const a = s.b * (0.55 + 0.45 * Math.sin(t * s.tw + s.ph));
        ctx.fillStyle = `rgba(${s.tint},${a.toFixed(3)})`;
        ctx.fillRect(Math.round(x * w), Math.round(y * h), s.s, s.s);
      }

      // guide star — amber, haloed, parallaxing with the near field
      const gx = (guide.x - px * 0.03) * w;
      const gy = (guide.y - (scroll * 0.05) / h - py * 0.02) * h;
      const pulse = 0.6 + 0.4 * Math.sin(t * 0.0022);
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 26);
      grad.addColorStop(0, `rgba(255,180,84,${(0.5 * pulse).toFixed(3)})`);
      grad.addColorStop(1, "rgba(255,180,84,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(gx - 26, gy - 26, 52, 52);
      ctx.fillStyle = `rgba(255,200,130,${(0.85 * pulse).toFixed(3)})`;
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
  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onActivity = () => {
      if (v.paused) v.play().catch(() => {});
      clearTimeout(timer);
      timer = setTimeout(() => v.pause(), 1600);
    };
    const evs: (keyof WindowEventMap)[] = ["scroll", "wheel", "mousemove", "pointerdown", "keydown", "touchmove"];
    for (const e of evs) window.addEventListener(e, onActivity, { passive: true });
    return () => {
      for (const e of evs) window.removeEventListener(e, onActivity);
      clearTimeout(timer);
    };
  }, []);
  return (
    <div aria-hidden className="bg-loop pointer-events-none fixed inset-0 -z-20">
      <video ref={vref} src="/cosmic-loop.mp4" poster="/cosmic-loop.jpg" className="h-full w-full object-cover opacity-30" loop muted playsInline preload="metadata" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(130% 100% at 50% 20%, rgba(8,10,16,0.55) 0%, rgba(8,10,16,0.9) 100%)" }} />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Chrome                                                             *
 * ------------------------------------------------------------------ */

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
  const cta = useMagnetic<HTMLAnchorElement>(0.4);
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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--line)] bg-[#080a10]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#log" className="mono text-[12px] text-[color:var(--starlight)]">
          Sam&nbsp;Gabriel
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="mono text-[11px] transition-colors"
              style={{ color: active === n.id ? "var(--amber)" : "var(--dim)" }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#transmit"
          ref={cta.ref}
          onMouseMove={cta.onMouseMove}
          onMouseLeave={cta.onMouseLeave}
          className="mono rounded-sm border border-[color:var(--amber)]/40 px-3.5 py-1.5 text-[11px] text-[color:var(--amber)] transition-colors hover:bg-[color:var(--amber)] hover:text-[#1a1206]"
          style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), background-color 0.2s, color 0.2s" }}
        >
          Transmit
        </a>
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
  const onMove = (e: React.PointerEvent) => {
    const el = secRef.current;
    if (!on.current || !el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)).toFixed(3));
  };
  const onLeave = () => {
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
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-28 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* left — the log header */}
        <div>
          <p className="marker reveal in">Observation Log · Opened 2026</p>
          <h1
            className="display reveal in mt-5 text-[clamp(3.2rem,9vw,7rem)] font-medium leading-[0.94] tracking-[-0.02em] text-[color:var(--starlight)]"
            style={{
              transform: "translate3d(calc(var(--mx,0)*-6px), calc(var(--my,0)*-4px), 0)",
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            Sam Gabriel
          </h1>
          <p className="reveal in mt-7 max-w-[54ch] text-[17px] leading-relaxed text-[color:var(--dim)]">
            Machine-learning and software engineer. I take hard problems — GPU
            physics, the night sky, messy data — and build instruments that make
            them legible.
          </p>

          <dl className="reveal in mono mt-10 grid max-w-lg grid-cols-1 gap-y-3 text-[12px] sm:grid-cols-[110px_1fr]">
            {meta.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-[color:var(--faint)]">{k}</dt>
                <dd className="text-[color:var(--starlight)]">{v}</dd>
              </div>
            ))}
            <dt className="text-[color:var(--faint)]">Status</dt>
            <dd className="flex items-center gap-2 text-[color:var(--amber)]">
              <span className="guide-star inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--amber)]" />
              Open to work
            </dd>
          </dl>
        </div>

        {/* right — a plate: the brightest object */}
        <a
          href={plates[0].source}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal in group relative block overflow-hidden border border-[color:var(--line-strong)]"
          style={{
            transform: "translate3d(calc(var(--mx,0)*8px), calc(var(--my,0)*6px), 0)",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <video
              src={plates[0].media}
              poster={plates[0].media?.replace(/\.mp4$/, ".jpg")}
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(8,10,16,0.85) 100%)" }} />
          </div>
          <div className="flex items-baseline justify-between border-t border-[color:var(--line)] px-4 py-3">
            <span className="mono text-[11px] text-[color:var(--amber)]">{plates[0].sg}</span>
            <span className="mono text-[11px] text-[color:var(--dim)]">{plates[0].type}</span>
          </div>
        </a>
      </div>

      <p className="mono absolute inset-x-0 bottom-6 mx-auto max-w-6xl px-5 text-[10px] text-[color:var(--faint)] sm:px-8">
        Scroll to open the catalogue ↓
      </p>
    </section>
  );
}

function Plate({ o }: { o: Obj }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const on = useRef(false);
  useEffect(() => {
    on.current = canHover();
  }, []);
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!on.current || !el) return;
    const r = el.getBoundingClientRect();
    const rx = ((0.5 - (e.clientY - r.top) / r.height) * 5).toFixed(2);
    const ry = (((e.clientX - r.left) / r.width - 0.5) * 6).toFixed(2);
    el.style.transition = "box-shadow 0.4s, border-color 0.4s";
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s, border-color 0.4s";
    el.style.transform = "";
  };
  const href = o.live || o.source;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className="reveal group relative block overflow-hidden border border-[color:var(--line-strong)] hover:border-[color:var(--amber)]/45"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {o.media ? (
          <video src={o.media} poster={o.media.replace(/\.mp4$/, ".jpg")} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" autoPlay loop muted playsInline preload="metadata" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={o.thumb} alt={`${o.name} — ${o.type}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(8,10,16,0.92) 100%)" }} />
        <div className="mono absolute left-3 top-3 flex items-center gap-2 text-[10px]">
          <span className="bg-[color:var(--amber)] px-1.5 py-0.5 text-[#1a1206]">{o.sg}</span>
          <span className="text-[color:var(--dim)]">{o.type}</span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-3xl font-medium text-[color:var(--starlight)] sm:text-4xl">{o.name}</h3>
          <span className="mono shrink-0 text-[10px] text-[color:var(--faint)]">{o.date}</span>
        </div>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[color:var(--dim)]">{o.blurb}</p>
        <div className="mono mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]">
          <span className="text-[color:var(--faint)]">{o.instrument}</span>
          <span className="ml-auto flex items-center gap-4">
            {o.live && <span className="text-[color:var(--amber)]">Open instrument</span>}
            <span className="text-[color:var(--dim)]">Source</span>
          </span>
        </div>
      </div>
    </a>
  );
}

function CatalogueRow({ o }: { o: Obj }) {
  const href = o.live || o.source;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="reveal group grid grid-cols-[64px_1fr_auto] items-center gap-4 border-t border-[color:var(--line)] py-4 transition-colors hover:bg-[color:var(--ground-2)] sm:grid-cols-[72px_minmax(0,1.4fr)_minmax(0,1fr)_auto] sm:gap-6 sm:px-3"
    >
      <div className="relative aspect-square w-16 overflow-hidden border border-[color:var(--line)] sm:w-[72px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={o.thumb} alt="" className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" loading="lazy" />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-3">
          <span className="mono text-[10px] text-[color:var(--amber)]">{o.sg}</span>
          <h3 className="display truncate text-xl font-medium text-[color:var(--starlight)] transition-colors group-hover:text-[color:var(--amber)]">{o.name}</h3>
        </div>
        <p className="mt-1 truncate text-[13px] text-[color:var(--dim)]">{o.blurb}</p>
      </div>
      <p className="mono hidden text-[11px] text-[color:var(--faint)] sm:block">{o.instrument}</p>
      <span className="mono text-[11px] text-[color:var(--dim)] transition-colors group-hover:text-[color:var(--amber)]">{o.type}</span>
    </a>
  );
}

function Catalogue() {
  const total = plates.length + catalogue.length;
  return (
    <section id="catalogue" className="relative scroll-mt-14 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="reveal flex items-end justify-between border-b border-[color:var(--line-strong)] pb-5">
          <h2 className="display text-4xl font-medium text-[color:var(--starlight)] sm:text-6xl">The Catalogue</h2>
          <p className="mono text-[11px] text-[color:var(--faint)]">{total} objects observed</p>
        </div>

        {/* two brightest — full plates */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {plates.map((o) => (
            <Plate key={o.name} o={o} />
          ))}
        </div>

        {/* the index */}
        <div className="mt-14">
          <p className="mono mb-1 text-[11px] text-[color:var(--faint)]">Index — SG-3 through SG-8</p>
          <div>
            {catalogue.map((o) => (
              <CatalogueRow key={o.name} o={o} />
            ))}
          </div>
        </div>

        <div className="reveal mt-10">
          <a href={github} target="_blank" rel="noopener noreferrer" className="mono text-[12px] text-[color:var(--dim)] underline decoration-[color:var(--line-strong)] underline-offset-4 transition-colors hover:text-[color:var(--amber)] hover:decoration-[color:var(--amber)]">
            Full observation archive on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Instrument() {
  return (
    <section id="instrument" className="relative scroll-mt-14 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-2">
        {/* instrument spec */}
        <div>
          <h2 className="reveal display text-4xl font-medium text-[color:var(--starlight)] sm:text-5xl">Instrument</h2>
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
          <h2 className="reveal display text-4xl font-medium text-[color:var(--starlight)] sm:text-5xl">Record</h2>
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
  const [channels, setChannels] = useState<string[]>([]);
  const send = useMagnetic<HTMLButtonElement>(0.22);

  const toggle = (c: string) =>
    setChannels((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Signal from ${name || "the field"}`);
    const line = channels.length ? `\n\nPreferred channel: ${channels.join(", ")}` : "";
    window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message + line)}`;
  };

  const fieldCls =
    "mt-2 w-full border border-[color:var(--line-strong)] bg-transparent px-3.5 py-2.5 text-[14px] text-[color:var(--starlight)] outline-none placeholder:text-[color:var(--faint)] focus:border-[color:var(--amber)]";

  return (
    <section id="transmit" className="relative scroll-mt-14 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-12 border-t border-[color:var(--line-strong)] pt-14 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <h2 className="reveal display text-4xl font-medium leading-[1.02] text-[color:var(--starlight)] sm:text-6xl">
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

          <p className="mono mt-5 text-[11px] text-[color:var(--faint)]">Preferred channel</p>
          <div className="mt-2 flex gap-5">
            {["Email", "Phone"].map((c) => (
              <label key={c} className="flex items-center gap-2 text-[14px] text-[color:var(--dim)]">
                <input type="checkbox" checked={channels.includes(c)} onChange={() => toggle(c)} className="h-4 w-4 accent-[color:var(--amber)]" />
                {c}
              </label>
            ))}
          </div>

          <label className="mono mt-5 block text-[11px] text-[color:var(--faint)]" htmlFor="msg">Message</label>
          <textarea id="msg" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} placeholder="What's the signal?" className={`${fieldCls} resize-none`} />

          <button
            type="submit"
            ref={send.ref}
            onMouseMove={send.onMouseMove}
            onMouseLeave={send.onMouseLeave}
            className="mono mt-6 w-full bg-[color:var(--amber)] py-3 text-[12px] font-bold text-[#1a1206] hover:bg-[color:var(--amber-deep)]"
            style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), background-color 0.2s" }}
          >
            Transmit
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--line)] px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
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
      <BackgroundLoop />
      <StarChart />
      <GridField />
      <CursorGlow />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Catalogue />
        <Instrument />
        <Transmit />
      </main>
      <Footer />
    </div>
  );
}
