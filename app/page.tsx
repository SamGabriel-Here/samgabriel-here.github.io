"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact Me" },
];

const roles = [
  "ML Developer",
  "Python Developer",
  "AI Enthusiast",
  "Roblox Game Developer",
  "Always Learning",
];

type ExperienceItem = {
  title: string;
  subtitle: string;
  detail: string;
  live?: string;
  source?: string;
  media?: string;
  thumb?: string;
};

const internship = {
  title: "InternPe",
  role: "Web Development Intern",
  subtitle:
    "Built responsive web interfaces with HTML, CSS, and JavaScript in a project-based internship",
  detail: "Jul 2025 – Aug 2025 · Remote",
};

const experience: ExperienceItem[] = [
  {
    title: "nbodyssey",
    subtitle:
      "GPU galaxy-collision simulator — Barnes-Hut tree code measured 176× faster than brute force at one million particles on a Tesla T4",
    detail: "CUDA C++ · C++17 · CMake",
    source: "https://github.com/SamGabriel-Here/nbodyssey",
    media: "/nbodyssey.mp4",
  },
  {
    title: "NestWorth",
    subtitle: "House price prediction for five Indian metros",
    detail: "Python · XGBoost · Streamlit",
    live: "https://nestworth.streamlit.app",
    source: "https://github.com/SamGabriel-Here/nestworth",
    thumb: "/nestworth.jpg",
  },
  {
    title: "ShowRush",
    subtitle:
      "Movie ticket booking app with interactive seat selection and checkout",
    detail: "Flutter · Dart · Material 3",
    live: "https://samgabriel-here.github.io/movie-booking-app/",
    source: "https://github.com/SamGabriel-Here/movie-booking-app",
    thumb: "/showrush.jpg",
  },
  {
    title: "Distant LOD (MACLOD)",
    subtitle:
      "Far-terrain renderer for Minecraft — real distant terrain beyond the vanilla horizon",
    detail: "Java · Fabric · OpenGL/GLSL",
    source: "https://github.com/SamGabriel-Here/MACLOD",
    thumb: "/maclod.jpg",
  },
  {
    title: "Internship Allocator",
    subtitle:
      "ML-powered portal that recommends internship companies from student profiles",
    detail: "Python · scikit-learn · Flask",
    source: "https://github.com/SamGabriel-Here/Internship-Allocator",
    thumb: "/nextern.jpg",
  },
  {
    title: "GitHub Repo Analyzer",
    subtitle:
      "Full-stack app that scores README quality with NLP and suggests improvements",
    detail: "React · FastAPI · Python · NLP",
    source: "https://github.com/SamGabriel-Here/Github-Repo-Analyzer",
    thumb: "/repoanalyzer.jpg",
  },
  {
    title: "Personal Portfolio Website",
    subtitle: "This site — designed and built from scratch",
    detail: "Next.js · Tailwind CSS · Vercel",
    live: "https://samgabriel.vercel.app/",
    source: "https://github.com/SamGabriel-Here/samgabriel-here.github.io",
    thumb: "/portfolio.jpg",
  },
];

const stack = [
  {
    category: "ML & Data",
    items: ["Python", "Pandas", "scikit-learn", "XGBoost", "Streamlit"],
  },
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind", "Flutter"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Flask", "WordPress"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL"],
  },
  {
    category: "Languages",
    items: ["C", "C++", "CUDA C++", "Python", "Java", "JavaScript", "SQL", "Dart"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code"],
  },
  {
    category: "Others",
    items: ["OOP", "DBMS", "Prompt Engineering"],
  },
];

const education = [
  {
    title: "10th",
    school: "Holy Family Convent School",
    detail: "CBSE",
    place: "Indore, Madhya Pradesh",
  },
  {
    title: "12th",
    school: "Holy Family Convent School",
    detail: "CBSE",
    place: "Indore, Madhya Pradesh",
  },
  {
    title: "B.Tech",
    school: "Prestige Institute of Engineering Management and Research",
    detail: "Computer Science & Engineering",
    place: "Indore, Madhya Pradesh",
  },
];

const email = "samgabrielofficial@gmail.com";
const github = "https://github.com/SamGabriel-Here";
const linkedin = "https://www.linkedin.com/in/samgabrielofficially/";

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
    tint: rand() < 0.3 ? "153,246,228" : "226,232,240",
  }));
}

type GalaxyParticle = {
  r: number;
  a: number;
  speed: number;
  size: number;
  alpha: number;
};

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

    const clouds = [
      { x: 0.12, y: 0.3, r: 0.5, rgb: "45,212,191", a: 0.13, s: 0.06, p: 0, d: 0.1 },
      { x: 0.5, y: 0.12, r: 0.45, rgb: "99,102,241", a: 0.13, s: 0.045, p: 2, d: 0.07 },
      { x: 0.88, y: 0.35, r: 0.48, rgb: "168,85,247", a: 0.11, s: 0.05, p: 4, d: 0.12 },
      { x: 0.28, y: 0.82, r: 0.45, rgb: "34,211,238", a: 0.12, s: 0.07, p: 1, d: 0.08 },
      { x: 0.75, y: 0.85, r: 0.42, rgb: "59,130,246", a: 0.12, s: 0.055, p: 5, d: 0.11 },
    ];

    const galaxies = [
      {
        particles: makeGalaxy(280, 0),
        tint: "170,240,225",
        phase: 0,
        tilt: 0.5,
        flatten: 0.45,
      },
      {
        particles: makeGalaxy(280, 999),
        tint: "200,180,255",
        phase: Math.PI,
        tilt: -0.7,
        flatten: 0.5,
      },
    ];

    const stars = makeStars(160);

    const renderFrame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const scroll = window.scrollY;

      for (const s of stars) {
        const x = ((s.x + t * 0.000001 * s.vx * 1000) % 1 + 1) % 1;
        const y =
          ((s.y + t * 0.000001 * s.vy * 1000 - (scroll * 0.05) / h) % 1 + 1) %
          1;
        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.phase));
        ctx.fillStyle = `rgba(${s.tint},${alpha})`;
        ctx.fillRect(x * w, y * h, s.size, s.size);
      }

      for (const c of clouds) {
        const cx = c.x * w + Math.sin(t * 0.0001 * c.s * 10 + c.p) * w * 0.06;
        const cy =
          c.y * h +
          Math.cos(t * 0.00008 * c.s * 10 + c.p) * h * 0.05 -
          scroll * c.d;
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

      const orbit = Math.min(w, h) * 0.2;
      const scale = Math.max(Math.min(w, h) * 0.3, w * 0.16);
      for (const g of galaxies) {
        const gx = w * 0.5 + Math.cos(t * 0.00004 + g.phase) * orbit;
        const gy =
          h * 0.5 +
          Math.sin(t * 0.00004 + g.phase) * orbit * 0.5 -
          scroll * 0.18;
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

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      renderFrame(0);
    } else {
      const loop = (t: number) => {
        renderFrame(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}

function Navbar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-3xl items-center justify-between rounded-2xl border border-white/5 bg-neutral-900/80 py-3 pl-5 pr-3 backdrop-blur">
        <a href="#about" className="font-semibold text-teal-400">
          Sam Gabriel
        </a>
        <div className="flex items-center gap-1 text-sm">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                active === item.id
                  ? "bg-teal-400/15 text-teal-300"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="about"
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden text-center"
    >
      <p className="text-lg font-medium">Hello World, I&apos;m</p>
      <h1 className="mt-2 bg-gradient-to-b from-teal-100 to-teal-400 bg-clip-text px-4 font-grotesk text-6xl font-bold tracking-tight text-transparent sm:text-8xl">
        Sam Gabriel
      </h1>
      <p className="mt-16 max-w-xl px-6 font-grotesk leading-relaxed text-neutral-400">
        I build things with data and code — machine learning projects, web
        apps, and whatever else catches my curiosity.
      </p>
      <div className="mt-24 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-[marquee_25s_linear_infinite]">
          {[...roles, ...roles].map((role, i) => (
            <span
              key={i}
              className="mx-8 whitespace-nowrap text-sm text-neutral-500"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 px-6 py-24">
      <h2 className="text-center font-grotesk text-5xl font-bold tracking-tight sm:text-6xl">
        Experience
      </h2>
      <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-teal-400/25 bg-teal-950/20 p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-grotesk text-lg font-semibold">
            {internship.title}{" "}
            <span className="font-normal text-teal-300">
              — {internship.role}
            </span>
          </h3>
          <p className="text-sm text-neutral-500">{internship.detail}</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
          {internship.subtitle}
        </p>
      </div>

      <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
        {experience.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/5 bg-neutral-900/70 p-6 transition-colors hover:border-teal-400/30 hover:bg-teal-950/30"
          >
            {item.media ? (
              <video
                src={item.media}
                poster={item.media.replace(/\.mp4$/, ".jpg")}
                className="mb-4 w-full rounded-xl border border-white/10"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            ) : (
              item.thumb && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.thumb}
                  alt={`${item.title} preview`}
                  className="mb-4 w-full rounded-xl border border-white/10"
                  loading="lazy"
                />
              )
            )}
            <h3 className="font-grotesk text-lg font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-400">
              {item.subtitle}
            </p>
            <p className="mt-1 text-sm text-neutral-500">{item.detail}</p>
            {(item.live || item.source) && (
              <div className="mt-3 flex gap-4 text-sm">
                {item.live && (
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300"
                  >
                    Live app ↗
                  </a>
                )}
                {item.source && (
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300"
                  >
                    Source ↗
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-teal-400/40 bg-neutral-950/80 p-8 shadow-[0_0_60px_rgba(45,212,191,0.15)]">
        <h3 className="font-grotesk text-2xl font-bold">Tech Stack</h3>
        <p className="mt-1 text-sm text-neutral-500">Tools I build with</p>
        {stack.map((group) => (
          <div key={group.category} className="mt-6">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              {group.category}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-700 px-4 py-1.5 text-sm text-neutral-200 transition-colors hover:border-teal-400/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="scroll-mt-28 px-6 py-24">
      <h2 className="text-center font-grotesk text-5xl font-bold tracking-tight sm:text-6xl">
        Education
      </h2>
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
        {education.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/5 bg-neutral-900/70 p-8 text-center transition-colors hover:border-teal-400/30"
          >
            <h3 className="font-grotesk text-2xl font-bold">{item.title}</h3>
            <p className="mt-3 text-neutral-300">{item.school}</p>
            <p className="mt-1 text-sm text-neutral-400">{item.detail}</p>
            <p className="mt-1 text-xs text-neutral-500">{item.place}</p>
          </div>
        ))}
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
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method],
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
    <section id="contact" className="scroll-mt-28 px-6 py-24">
      <h2 className="text-center font-grotesk text-5xl font-bold tracking-tight sm:text-6xl">
        Contact Me
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-14 max-w-md rounded-2xl border border-teal-400/20 bg-neutral-900/70 p-8 shadow-[0_0_40px_rgba(45,212,191,0.08)]"
      >
        <label className="block text-sm text-neutral-300" htmlFor="name">
          Name <span className="text-teal-400">*</span>
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
          className="mt-2 w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-neutral-600 focus:border-teal-400/60"
        />
        <p className="mt-6 text-sm font-semibold text-neutral-200">
          Preferred contact method
        </p>
        <div className="mt-3 flex gap-6">
          {["Email", "Phone"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-2 text-sm text-neutral-300"
            >
              <input
                type="checkbox"
                checked={methods.includes(method)}
                onChange={() => toggleMethod(method)}
                className="h-4 w-4 accent-teal-400"
              />
              {method}
            </label>
          ))}
        </div>
        <label
          className="mt-6 block text-sm text-neutral-300"
          htmlFor="message"
        >
          Message <span className="text-teal-400">*</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder="What's on your mind?"
          className="mt-2 w-full resize-none rounded-lg border border-neutral-700 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-neutral-600 focus:border-teal-400/60"
        />
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-teal-400 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-teal-300"
        >
          Send message
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 px-8 py-10 text-sm text-neutral-400 sm:flex-row sm:justify-between">
      <p>© {new Date().getFullYear()} Sam Gabriel</p>
      <div className="flex items-center gap-5">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transition-colors hover:text-teal-300"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="transition-colors hover:text-teal-300"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </a>
      </div>
      <a href={`mailto:${email}`} className="hover:text-teal-300">
        {email}
      </a>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <Nebula />
      <Navbar />
      <Hero />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
