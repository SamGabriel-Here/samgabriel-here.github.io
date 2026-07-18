"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const navItems = [
  { id: "about", label: "Index" },
  { id: "work", label: "Work" },
  { id: "log", label: "Log" },
  { id: "contact", label: "Contact" },
];

const roles = [
  "ML Developer",
  "Python Developer",
  "AI Enthusiast",
  "GPU Simulation",
  "Roblox Game Dev",
  "Always Learning",
];

type Project = {
  code: string;
  tag: string;
  title: string;
  subtitle: string;
  detail: string;
  live?: string;
  source?: string;
  media?: string;
  thumb?: string;
  accent: string; // rgb triplet
};

const projects: Project[] = [
  {
    code: "TX-01",
    tag: "CUDA C++",
    title: "nbodyssey",
    subtitle:
      "GPU galaxy-collision simulator. A Barnes-Hut tree code clocked 176× faster than brute force at one million particles on a Tesla T4.",
    detail: "CUDA C++ · C++17 · CMake",
    source: "https://github.com/SamGabriel-Here/nbodyssey",
    media: "/nbodyssey.mp4",
    accent: "37,99,235",
  },
  {
    code: "TX-02",
    tag: "Machine Learning",
    title: "NestWorth",
    subtitle: "House-price prediction across five Indian metros.",
    detail: "Python · XGBoost · Streamlit",
    live: "https://nestworth.streamlit.app",
    source: "https://github.com/SamGabriel-Here/nestworth",
    thumb: "/nestworth.jpg",
    accent: "59,130,246",
  },
  {
    code: "TX-03",
    tag: "Flutter",
    title: "ShowRush",
    subtitle:
      "Movie-ticket booking app with interactive seat selection and checkout.",
    detail: "Flutter · Dart · Material 3",
    live: "https://samgabriel-here.github.io/movie-booking-app/",
    source: "https://github.com/SamGabriel-Here/movie-booking-app",
    thumb: "/showrush.jpg",
    accent: "99,102,241",
  },
  {
    code: "TX-04",
    tag: "OpenGL",
    title: "Distant LOD",
    subtitle:
      "Far-terrain renderer for Minecraft — real distant terrain beyond the vanilla horizon.",
    detail: "Java · Fabric · OpenGL / GLSL",
    source: "https://github.com/SamGabriel-Here/MACLOD",
    thumb: "/maclod.jpg",
    accent: "139,92,246",
  },
  {
    code: "TX-05",
    tag: "Machine Learning",
    title: "Internship Allocator",
    subtitle:
      "ML-powered portal that recommends internship companies from student profiles.",
    detail: "Python · scikit-learn · Flask",
    source: "https://github.com/SamGabriel-Here/Internship-Allocator",
    thumb: "/nextern.jpg",
    accent: "168,85,247",
  },
  {
    code: "TX-06",
    tag: "NLP",
    title: "Repo Analyzer",
    subtitle:
      "Full-stack app that scores README quality with NLP and suggests improvements.",
    detail: "React · FastAPI · Python · NLP",
    source: "https://github.com/SamGabriel-Here/Github-Repo-Analyzer",
    thumb: "/repoanalyzer.jpg",
    accent: "192,132,252",
  },
];

const stats = [
  { target: 6, suffix: "", pad: 2, label: "Projects Shipped", color: "var(--blue)" },
  { target: 8, suffix: "", pad: 2, label: "Languages Spoken", color: "var(--violet)" },
  { target: 176, suffix: "×", pad: 0, label: "Peak GPU Speedup", color: "var(--purple)" },
];

const internship = {
  title: "InternPe",
  role: "Web Development Intern",
  subtitle:
    "Built responsive web interfaces with HTML, CSS, and JavaScript in a project-based internship.",
  detail: "Jul 2025 – Aug 2025 · Remote",
};

const stack = [
  { category: "ML & Data", items: ["Python", "Pandas", "scikit-learn", "XGBoost", "Streamlit"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind", "Flutter", "JavaScript"] },
  { category: "Backend", items: ["FastAPI", "Flask", "WordPress"] },
  { category: "Languages", items: ["C", "C++", "CUDA C++", "Java", "SQL", "Dart"] },
  { category: "Data", items: ["MongoDB", "MySQL"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code", "Prompt Engineering"] },
];

const marqueeTech = stack.flatMap((g) => g.items);

const education = [
  { title: "B.Tech", school: "Prestige Institute of Engineering Management & Research", detail: "Computer Science & Engineering", place: "Indore, MP" },
  { title: "12th", school: "Holy Family Convent School", detail: "CBSE", place: "Indore, MP" },
  { title: "10th", school: "Holy Family Convent School", detail: "CBSE", place: "Indore, MP" },
];

const email = "samgabrielofficial@gmail.com";
const github = "https://github.com/SamGabriel-Here";
const linkedin = "https://www.linkedin.com/in/samgabrielofficially/";

/* ------------------------------------------------------------------ */
/*  Animated background (starfield + nebula + twin galaxies)          */
/* ------------------------------------------------------------------ */

function makeStars(count: number) {
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  return Array.from({ length: count }, () => ({
    x: rand(),
    y: rand(),
    size: rand() < 0.15 ? 2 : 1,
    phase: rand() * Math.PI * 2,
    twinkleSpeed: 0.0004 + rand() * 0.001,
    vx: (rand() - 0.5) * 0.008,
    vy: (rand() - 0.5) * 0.005,
    tint: rand() < 0.3 ? "191,219,254" : "226,232,240",
  }));
}

type GalaxyParticle = { r: number; a: number; speed: number; size: number; alpha: number };

function makeGalaxy(count: number, seedOffset: number): GalaxyParticle[] {
  let seed = 7 + seedOffset;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  return Array.from({ length: count }, () => {
    const r = Math.sqrt(rand());
    return {
      r,
      a: rand() * Math.PI * 2 + r * 5,
      speed: 0.0012 / (0.25 + r),
      size: rand() < 0.12 ? 2 : 1,
      alpha: 0.25 + (1 - r) * 0.5,
    };
  });
}

function Nebula() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    // Deep-space nebula spanning the blue→violet spectrum, extreme to extreme
    const clouds = [
      { x: 0.14, y: 0.28, r: 0.5, rgb: "29,78,216", a: 0.16, s: 0.06, p: 0, d: 0.1 },
      { x: 0.5, y: 0.1, r: 0.45, rgb: "99,102,241", a: 0.12, s: 0.045, p: 2, d: 0.07 },
      { x: 0.88, y: 0.32, r: 0.48, rgb: "139,92,246", a: 0.13, s: 0.05, p: 4, d: 0.12 },
      { x: 0.26, y: 0.8, r: 0.45, rgb: "59,130,246", a: 0.1, s: 0.07, p: 1, d: 0.08 },
      { x: 0.78, y: 0.85, r: 0.42, rgb: "168,85,247", a: 0.11, s: 0.055, p: 5, d: 0.11 },
      { x: 0.52, y: 0.6, r: 0.34, rgb: "96,165,250", a: 0.09, s: 0.04, p: 3, d: 0.09 },
    ];

    // Dark smoke that occludes the glow — gives the clouds volume
    const darkClouds = [
      { x: 0.18, y: 0.72, r: 0.46, p: 1.3, s: 0.05 },
      { x: 0.86, y: 0.18, r: 0.4, p: 3.1, s: 0.06 },
      { x: 0.55, y: 0.98, r: 0.52, p: 5.2, s: 0.04 },
    ];

    const galaxies = [
      { particles: makeGalaxy(190, 0), tint: "147,197,253", phase: 0, tilt: 0.5, flatten: 0.45 },
      { particles: makeGalaxy(190, 999), tint: "216,180,254", phase: Math.PI, tilt: -0.7, flatten: 0.5 },
    ];

    const stars = makeStars(120);

    const renderFrame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const scroll = window.scrollY;

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const s of stars) {
        const x = ((s.x + t * 0.000001 * s.vx * 1000) % 1 + 1) % 1;
        const y = ((s.y + t * 0.000001 * s.vy * 1000 - (scroll * 0.05) / h) % 1 + 1) % 1;
        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.phase));
        ctx.fillStyle = `rgba(${s.tint},${alpha})`;
        ctx.fillRect(x * w + mx * 6 * s.size, y * h + my * 6 * s.size, s.size, s.size);
      }

      for (const c of clouds) {
        const cx = c.x * w + Math.sin(t * 0.0001 * c.s * 10 + c.p) * w * 0.06 + mx * 22;
        const cy =
          c.y * h + Math.cos(t * 0.00008 * c.s * 10 + c.p) * h * 0.05 - scroll * c.d + my * 22;
        const radius = c.r * Math.max(w * 0.85, h);
        const pulse = c.a * (0.8 + 0.2 * Math.sin(t * 0.0002 + c.p));
        const wrapH = h + radius * 2;
        const wy = ((cy + radius) % wrapH + wrapH) % wrapH - radius;
        const grad = ctx.createRadialGradient(cx, wy, 0, cx, wy, radius);
        grad.addColorStop(0, `rgba(${c.rgb},${pulse})`);
        grad.addColorStop(0.6, `rgba(${c.rgb},${pulse * 0.35})`);
        grad.addColorStop(1, `rgba(${c.rgb},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(cx - radius, wy - radius, radius * 2, radius * 2);
      }

      // dark occluding smoke on top of the glow
      ctx.globalCompositeOperation = "source-over";
      for (const c of darkClouds) {
        const cx = c.x * w + Math.sin(t * 0.00005 * c.s * 10 + c.p) * w * 0.05 + mx * 12;
        const cy =
          c.y * h + Math.cos(t * 0.00004 * c.s * 10 + c.p) * h * 0.04 - scroll * 0.15 + my * 12;
        const radius = c.r * Math.max(w * 0.8, h);
        const wrapH = h + radius * 2;
        const wy = ((cy + radius) % wrapH + wrapH) % wrapH - radius;
        const grad = ctx.createRadialGradient(cx, wy, 0, cx, wy, radius);
        grad.addColorStop(0, "rgba(3,2,6,0.5)");
        grad.addColorStop(0.55, "rgba(3,2,6,0.26)");
        grad.addColorStop(1, "rgba(3,2,6,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(cx - radius, wy - radius, radius * 2, radius * 2);
      }
      ctx.globalCompositeOperation = "lighter";

      const orbit = Math.min(w, h) * 0.2;
      const scale = Math.max(Math.min(w, h) * 0.3, w * 0.16);
      for (const g of galaxies) {
        const gx = w * 0.5 + Math.cos(t * 0.00004 + g.phase) * orbit + mx * 14;
        const gy = h * 0.5 + Math.sin(t * 0.00004 + g.phase) * orbit * 0.5 - scroll * 0.18 + my * 14;
        const cosT = Math.cos(g.tilt);
        const sinT = Math.sin(g.tilt);
        const core = ctx.createRadialGradient(gx, gy, 0, gx, gy, scale * 0.35);
        core.addColorStop(0, `rgba(${g.tint},0.22)`);
        core.addColorStop(1, `rgba(${g.tint},0)`);
        ctx.fillStyle = core;
        ctx.fillRect(gx - scale, gy - scale, scale * 2, scale * 2);

        for (const p of g.particles) {
          const angle = p.a + t * p.speed * 0.06;
          const px = Math.cos(angle) * p.r * scale;
          const py = Math.sin(angle) * p.r * scale * g.flatten;
          const x = gx + px * cosT - py * sinT;
          const y = gy + px * sinT + py * cosT;
          ctx.fillStyle = `rgba(${g.tint},${p.alpha})`;
          ctx.fillRect(x, y, p.size, p.size);
        }
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Cap to ~30fps and pause when the tab is hidden to keep things smooth.
    const frameGap = 1000 / 30;
    let last = 0;

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduced && !raf) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < frameGap) return;
      last = t;
      renderFrame(t);
    };

    if (reduced) {
      renderFrame(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}

// Original generated cosmos loop (blue→violet spectrum), drifting beneath everything.
// The film only plays while the visitor interacts — the cosmos moves when you do.
function BackgroundLoop() {
  const vref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const rest = () => v.pause();
    const onActivity = () => {
      if (v.paused) v.play().catch(() => {});
      clearTimeout(timer);
      timer = setTimeout(rest, 1800);
    };

    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "wheel",
      "mousemove",
      "pointerdown",
      "keydown",
      "touchstart",
      "touchmove",
    ];
    for (const e of events) window.addEventListener(e, onActivity, { passive: true });

    return () => {
      for (const e of events) window.removeEventListener(e, onActivity);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-hidden className="bg-loop pointer-events-none fixed inset-0 -z-20">
      <video
        ref={vref}
        src="/cosmic-loop.mp4"
        poster="/cosmic-loop.jpg"
        className="h-full w-full object-cover opacity-55"
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 30%, rgba(3,3,9,0.3) 0%, rgba(3,3,9,0.72) 100%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                             */
/* ------------------------------------------------------------------ */

function Kicker({ children, color = "var(--blue)" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="mono flex items-center gap-3 text-[10px] sm:text-xs" style={{ color }}>
      <span className="inline-block h-px w-8" style={{ background: color }} />
      {children}
    </p>
  );
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

function Counter({ target, suffix, pad }: { target: number; suffix: string; pad: number }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const dur = 1500;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  const shown = pad ? String(val).padStart(pad, "0") : String(val);
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Chrome: top bar + corner telemetry                               */
/* ------------------------------------------------------------------ */

function TopBar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#03040790] px-5 py-3 backdrop-blur-md sm:px-8">
        <a href="#about" className="flex items-center gap-2.5 group">
          <span className="text-blue-400 transition-transform group-hover:rotate-90">✳</span>
          <span className="mono text-[11px] text-neutral-200 sm:text-xs">Sam Gabriel</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mono rounded px-3 py-1.5 text-[10px] transition-colors ${
                active === item.id ? "text-blue-300" : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="mono flex items-center gap-1.5 text-[10px] text-neutral-300 transition-colors hover:text-blue-300 sm:text-xs"
        >
          Transmit <span aria-hidden>↗</span>
        </a>
      </div>
    </header>
  );
}

// Film-style letterbox caption bar (à la "UNIVERSE AGE: … | EARLY STAR FORMATION | …")
const chapters = [
  { id: "about", label: "Prologue — The Observable Sam" },
  { id: "work", label: "Chapter 01 — Selected Works" },
  { id: "numbers", label: "Chapter 02 — By the Numbers" },
  { id: "log", label: "Chapter 03 — Field Notes" },
  { id: "contact", label: "Final Chapter — Open Channel" },
];

function CaptionBar() {
  const [chapter, setChapter] = useState(chapters[0].label);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const c = chapters.find((ch) => ch.id === entry.target.id);
            if (c) setChapter(c.label);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const c of chapters) {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-10 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <span className="mono hidden text-[9px] text-neutral-600 lg:block">
          Indore · 22.72°N / 75.86°E
        </span>
        <span className="mono text-[9px] text-neutral-300 sm:text-[10px]">{chapter}</span>
        <span className="mono hidden items-center gap-2 text-[9px] text-neutral-600 lg:flex">
          <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
          <Clock /> LT
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                          */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-28 pt-28 sm:px-10"
    >
      {/* electric first-light bloom rising behind the name */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[30%] -z-[1] h-[70vmin] w-[90vmin] opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(59,130,246,0.3) 0%, rgba(99,102,241,0.15) 40%, rgba(168,85,247,0.06) 65%, transparent 78%)",
          filter: "blur(14px)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="reveal in mb-6">
          <Kicker>ML · Software · Generative</Kicker>
        </div>

        <h1 className="reveal in font-display text-[19vw] leading-[0.85] text-neutral-50 sm:text-[15vw] lg:text-[13rem]">
          <span className="block">Sam</span>
          <span className="block text-hollow">Gabriel</span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="reveal in max-w-md font-grotesk text-base leading-relaxed text-neutral-400">
            I build things with data and code — GPU simulations, machine-learning
            apps, and whatever else catches my curiosity.
          </p>
          <div className="mono flex items-center gap-3 text-[10px] text-neutral-600">
            <span>Scroll to traverse</span>
            <span className="inline-block h-8 w-px animate-pulse bg-gradient-to-b from-blue-400 to-transparent" />
          </div>
        </div>
      </div>

      {/* roles ticker */}
      <div className="absolute inset-x-0 bottom-10 border-t border-white/[0.06] py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[marquee_28s_linear_infinite]">
          {[...roles, ...roles, ...roles].map((role, i) => (
            <span key={i} className="mono mx-6 whitespace-nowrap text-[11px] text-neutral-600">
              {role}
              <span className="ml-6 text-blue-400/50">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, featured }: { p: Project; featured?: boolean }) {
  const primaryHref = p.live || p.source;
  return (
    <a
      href={primaryHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-950/40 transition-all duration-500 hover:border-white/20 hover:-translate-y-1 ${
        featured ? "sm:col-span-2 sm:flex-row" : ""
      }`}
      style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 24px 60px -24px rgba(${p.accent},0.5)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
      }}
    >
      {/* media */}
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-video sm:aspect-auto sm:w-3/5" : "aspect-[16/10]"
        }`}
      >
        {p.media ? (
          <video
            src={p.media}
            poster={p.media.replace(/\.mp4$/, ".jpg")}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : p.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.thumb}
            alt={`${p.title} preview`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 40%, #03040799 80%, #030407 100%), radial-gradient(120% 80% at 50% 120%, rgba(${p.accent},0.28), transparent 60%)`,
          }}
        />
        <div className="mono absolute left-3 top-3 flex items-center gap-2 text-[9px] text-neutral-300">
          <span
            className="rounded px-1.5 py-0.5"
            style={{ background: `rgba(${p.accent},0.16)`, color: `rgb(${p.accent})` }}
          >
            {p.code}
          </span>
          <span className="text-neutral-500">{p.tag}</span>
        </div>
      </div>

      {/* body */}
      <div className={`flex flex-1 flex-col p-5 ${featured ? "sm:justify-center sm:p-8" : ""}`}>
        <h3
          className={`font-display text-neutral-50 ${featured ? "text-4xl sm:text-6xl" : "text-2xl"}`}
        >
          {p.title}
        </h3>
        <p
          className={`mt-3 font-grotesk leading-relaxed text-neutral-400 ${
            featured ? "max-w-md text-sm sm:text-base" : "text-sm"
          }`}
        >
          {p.subtitle}
        </p>
        <p className="mono mt-3 text-[9px] text-neutral-600">{p.detail}</p>
        <div className="mono mt-auto flex items-center gap-4 pt-4 text-[10px]">
          <span
            className="flex items-center gap-1.5 transition-colors"
            style={{ color: `rgb(${p.accent})` }}
          >
            View {p.live ? "live" : "case"}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
          {p.live && p.source && <span className="text-neutral-700">Source ↗</span>}
        </div>
      </div>
    </a>
  );
}

function Work() {
  return (
    <section id="work" className="relative scroll-mt-16 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="reveal">
          <Kicker>Selected Transmissions</Kicker>
          <h2 className="mt-4 font-display text-6xl text-neutral-50 sm:text-8xl">Work</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} featured={i === 0} />
          ))}
        </div>
        <div className="reveal mt-10 flex justify-center">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="mono rounded-full border border-white/15 px-6 py-3 text-[11px] text-neutral-300 transition-colors hover:border-blue-400/50 hover:text-blue-300"
          >
            All repositories on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function TechBand() {
  return (
    <section aria-label="Tech stack" className="relative overflow-hidden border-y border-white/[0.06] py-6">
      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-[marquee_40s_linear_infinite]">
          {[...marqueeTech, ...marqueeTech].map((t, i) => (
            <span key={i} className="mx-5 flex items-center gap-5 whitespace-nowrap">
              <span className="font-display text-2xl text-neutral-400 transition-colors hover:text-neutral-100 sm:text-3xl">
                {t}
              </span>
              <span className="text-violet-400/40">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section id="numbers" className="relative px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="reveal">
          <Kicker color="var(--violet)">Mission Log</Kicker>
          <h2 className="mt-4 font-display text-6xl text-neutral-50 sm:text-8xl">
            By the Numbers
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="reveal flex flex-col items-center border-t border-white/[0.08] pt-8 text-center sm:items-start sm:text-left"
            >
              <div className="font-display text-7xl sm:text-8xl" style={{ color: s.color }}>
                <Counter target={s.target} suffix={s.suffix} pad={s.pad} />
              </div>
              <p className="mono mt-4 text-[11px] text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Log() {
  return (
    <section id="log" className="relative scroll-mt-16 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="reveal">
          <Kicker>Field Notes</Kicker>
          <h2 className="mt-4 font-display text-6xl text-neutral-50 sm:text-8xl">The Log</h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Experience */}
          <div className="reveal">
            <p className="mono text-[10px] text-neutral-600">01 / Experience</p>
            <div className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-950/15 p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                <h3 className="font-grotesk text-lg font-semibold text-neutral-100">
                  {internship.title}
                  <span className="ml-2 font-normal text-blue-300">{internship.role}</span>
                </h3>
                <p className="mono text-[9px] text-neutral-500 sm:shrink-0 sm:whitespace-nowrap">
                  {internship.detail}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{internship.subtitle}</p>
            </div>

            <p className="mono mt-8 text-[10px] text-neutral-600">02 / Toolkit</p>
            <div className="mt-1 divide-y divide-white/[0.06]">
              {stack.map((group) => (
                <div key={group.category} className="flex flex-col gap-2 py-3.5 sm:flex-row sm:gap-4">
                  <p className="mono w-28 shrink-0 pt-1 text-[10px] text-neutral-500">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-violet-400/50 hover:text-violet-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="reveal">
            <p className="mono text-[10px] text-neutral-600">03 / Education</p>
            <div className="mt-4 space-y-4">
              {education.map((item) => (
                <div
                  key={item.title + item.detail}
                  className="rounded-2xl border border-white/[0.08] bg-neutral-950/40 p-6 transition-colors hover:border-violet-400/30"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-3xl text-neutral-50">{item.title}</h3>
                    <p className="mono shrink-0 text-[9px] text-neutral-500">{item.place}</p>
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">{item.school}</p>
                  <p className="mt-1 text-xs text-neutral-500">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [methods, setMethods] = useState<string[]>([]);

  const toggleMethod = (method: string) => {
    setMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "your website"}`);
    const contactLine = methods.length
      ? `\n\nPreferred contact method: ${methods.join(", ")}`
      : "";
    const body = encodeURIComponent(message + contactLine);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden px-5 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <div className="reveal text-center">
          <div className="flex justify-center">
            <Kicker color="var(--violet)">Open Channel</Kicker>
          </div>
          <h2 className="mt-6 font-display text-5xl leading-[0.9] text-neutral-50 sm:text-8xl">
            <span className="block">Make Contact</span>
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(90deg, var(--blue), var(--violet) 50%, var(--purple))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Across the Void
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-md font-grotesk text-neutral-400">
            Have a project, a role, or a wild idea? Send a transmission — I read
            every signal.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <form
            onSubmit={handleSubmit}
            className="reveal rounded-2xl border border-white/[0.08] bg-neutral-950/50 p-7 backdrop-blur"
          >
            <label className="mono block text-[10px] text-neutral-400" htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Who is transmitting?"
              className="mt-2 w-full rounded-lg border border-white/10 bg-transparent px-4 py-2.5 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-blue-400/60"
            />
            <p className="mono mt-5 text-[10px] text-neutral-400">Preferred channel</p>
            <div className="mt-2 flex gap-5">
              {["Email", "Phone"].map((method) => (
                <label key={method} className="flex items-center gap-2 text-sm text-neutral-300">
                  <input
                    type="checkbox"
                    checked={methods.includes(method)}
                    onChange={() => toggleMethod(method)}
                    className="h-4 w-4 accent-indigo-400"
                  />
                  {method}
                </label>
              ))}
            </div>
            <label className="mono mt-5 block text-[10px] text-neutral-400" htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              placeholder="What's the signal?"
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-transparent px-4 py-2.5 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-blue-400/60"
            />
            <button
              type="submit"
              className="mono mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-3 text-[11px] font-semibold text-white transition-colors hover:bg-blue-400"
            >
              Transmit <span aria-hidden>↗</span>
            </button>
          </form>

          {/* circular transmit motif + direct links */}
          <div className="reveal flex flex-col items-center gap-6">
            <a
              href={`mailto:${email}`}
              aria-label="Email Sam"
              className="group relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-violet-400/50"
            >
              <span className="absolute inset-3 rounded-full border border-dashed border-white/10 transition-transform duration-700 group-hover:rotate-180" />
              <span className="mono text-center text-[10px] leading-4 text-neutral-300">
                Direct
                <br />
                line ↗
              </span>
            </a>
            <div className="mono flex flex-col items-center gap-2 text-[10px] text-neutral-500">
              <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                GitHub ↗
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-5 py-8 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="mono text-[10px] text-neutral-600">
          © {new Date().getFullYear()} Sam Gabriel · End of transmission
        </p>
        <div className="flex items-center gap-5 text-neutral-500">
          <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-blue-300">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-blue-300">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a href={`mailto:${email}`} className="mono text-[10px] hover:text-blue-300">
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function Home() {
  // reveal-on-scroll
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
    <div className="relative pb-10">
      <BackgroundLoop />
      <Nebula />
      <div className="fx-vignette" />
      <div className="fx-grain" />
      <TopBar />
      <CaptionBar />
      <main>
        <Hero />
        <Work />
        <TechBand />
        <Numbers />
        <Log />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
