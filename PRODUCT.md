# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: a technical hiring manager or recruiter, skimming.** They arrive from a
CV, a LinkedIn profile, or a GitHub link, usually with limited time and several
other candidates open in other tabs. Their job is to judge whether this person has
real depth, and then decide whether to make contact.

Confirmed with the owner on 2026-09-08. Two consequences follow, and both are
product requirements rather than taste preferences:

- **Scan speed is a feature.** Anything that slows a skimming reader is a product
  cost, not just an aesthetic trade.
- **The contact path is the conversion.** The site succeeds when a message is sent
  through the Transmit form or one of the listed channels; everything else is
  supporting evidence.

Secondary audiences (engineers reading the source, collaborators) are served by the
same material and were not confirmed as drivers of product decisions.

## Product Purpose

A single-page portfolio and working log for Sam Gabriel, a machine-learning and
software engineer based in Indore, India. It exists to establish technical depth
quickly and to open a conversation.

Success is a message sent. Not time on page, not scroll depth.

## Positioning

The differentiator is the nature of the work itself, not a claim about the person.
The catalogue is weighted toward systems-level and scientific computing that most
early-career portfolios do not contain: a CUDA Barnes-Hut N-body simulator, an
offline desktop planetarium with a real star catalogue, a gated medical-imaging
classifier. The honest claim is range plus depth in GPU, ML and applied astronomy,
evidenced by shipped artefacts with public source.

## Operating Context

- Evaluated in a browser, often on a phone, frequently in a short first pass with a
  longer second visit if the first one lands.
- The reader typically cannot run the projects. Source links, live instrument links
  and imagery carry the burden of proof.
- Owner's station is Indore, India (22.72°N, 75.86°E); relevant to timezone and to
  the live sidereal-time and moon-phase readout the hero displays.
- Status is currently "Open to work" and is presented as a live product fact.

## Capabilities and Constraints

- **Single page, static.** Next.js 16 App Router with `output: "export"` and
  `images: { unoptimized: true }`. There is no server at runtime, so nothing may
  depend on server-side execution, API routes, or runtime environment variables.
- **Deploys to Vercel on push to `main`.** The repository remote is
  `samgabriel-here.github.io`; the live host is `samgabriel.vercel.app`.
- **Contact is client-only.** The Transmit form composes a `mailto:` link; there is
  no backend, no database, and no form service. It therefore cannot confirm
  delivery, and the email address and social links must remain visible as a fallback
  for anyone without a configured mail client.
- **Terminology is a deliberate conceit.** Projects are "objects" with catalogue
  designations (SG-1 to SG-8), the skills list is the "Instrument", history is the
  "Record", and contact is "Transmit". Keep the metaphor consistent, and keep it
  from obstructing a reader who does not care about it.

## Brand Commitments

- Name shown as "Sam Gabriel". Site titled "Observation Log".
- Voice: precise, plain, understated. Specific numbers over adjectives. No hype, no
  exclamation, no growth-marketing register.
- The observational-astronomy framing is binding; it is the site's identity, not
  decoration.

## Evidence on Hand

Real and verifiable — do not alter these claims without the owner:

- Eight projects with public repositories under `github.com/SamGabriel-Here`, four
  with live deployments. Screenshots and video captures in `public/`.
- One measured benchmark: the Barnes-Hut tree code ran **176× faster than brute
  force at one million particles on a single Tesla T4**. This is the only
  performance figure on the site and it must not be rounded, restated, or joined by
  invented siblings.
- NovaSky's "8,900+ naked-eye stars" is a real catalogue size.
- B.Tech in Computer Science & Engineering, Prestige Institute of Engineering
  Management & Research, Indore, 2022–2026.
- Web Development Intern, InternPe, remote, July–August 2025.
- Contact: samgabrielofficial@gmail.com; linkedin.com/in/samgabrielofficially.

**Absences that future work must not fabricate:**

- No testimonials, endorsements, clients, employers, or press.
- No user counts, download numbers, traffic, or revenue.
- No awards or certifications.
- The SG-1..SG-8 designations are a presentational conceit. Real celestial
  coordinates, magnitudes, or catalogue cross-references must **not** be invented
  for these objects; fabricated data presented next to genuine work is misleading.
  Live astronomical values shown on the site (sidereal time, moon phase) are
  computed for real and are fine.
- PapVision is described as "a research and learning project, not a diagnostic
  tool". That boundary is a safety claim and must survive any rewrite.

## Product Principles

1. **The reader is skimming.** Depth must be reachable, never mandatory. Any
   interaction that gates information behind time or effort has to earn it.
2. **Show the artefact.** Evidence beats description; a running simulation or a
   screenshot outranks an adjective.
3. **Precision over enthusiasm.** One real benchmark is worth more than a page of
   claims.
4. **The conceit serves the content.** The astronomy framing may shape structure
   and language, but a reader who ignores it entirely must still get the facts.
5. **Contact is never more than one action away.**

## Accessibility & Inclusion

- Target is **WCAG 2.1 AA**, and it is treated as a hard gate rather than an
  aspiration. Text contrast is verified against rendered pixels, not palette math;
  see `DESIGN.md` for the method and the specific luminance ceiling the background
  must respect.
- The site is heavily animated. `prefers-reduced-motion` must always yield a
  complete, readable, static page — never a degraded one.
- The reader may be on a phone, on a slow connection, or using a keyboard only. All
  three are expected, not edge cases.
