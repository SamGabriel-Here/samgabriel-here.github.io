---
name: Observation Log
description: An astronomer's catalogue rendered as a deep field — void-violet ground, emission colour at the edges, sodium amber for anything a human should act on.
colors:
  ground: "#070512"
  ground-2: "#0e0b20"
  ground-deep: "#030208"
  starlight: "#f2eff9"
  dim: "#a49ec4"
  faint: "#948eb8"
  amber: "#ffb454"
  amber-deep: "#e0873a"
  ion: "#67e8f0"
  rose: "#ff7ab0"
  violet: "#b18cff"
  ink: "#0b0716"
  line: "rgba(242, 239, 249, 0.09)"
  line-strong: "rgba(242, 239, 249, 0.18)"
  field-line: "rgba(242, 239, 249, 0.4)"
typography:
  display:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(3.4rem, 12vw, 8.5rem)"
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: "-0.035em"
    fontFeature: "optical sizing auto"
  headline:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.15
  subtitle:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.2
  lede:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "ss01"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "ss01"
  body-sm:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  input:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
  caption:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
  data:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
  label:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.06em"
  label-sm:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  none: "0"
  hairline: "1px"
  sm: "2px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "96px"
  section-wide: "128px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 0"
    typography: "{typography.label}"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.amber-deep}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.amber}"
    rounded: "{rounded.sm}"
    padding: "6px 14px"
    typography: "{typography.label}"
  button-ghost-hover:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.starlight}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
  card-plate:
    backgroundColor: "transparent"
    textColor: "{colors.starlight}"
    rounded: "{rounded.none}"
    padding: "20px"
---

# Observation Log — design system

## Overview

A single-page portfolio built as an astronomer's observation log. The reader is a
technical hiring manager, skimming; the visual world is a deep field, and the
content sits in the dark centre of it.

The world has one organising rule that everything else follows: **colour lives at
the edges, never under the text.** Emission lobes bloom in the corners and margins;
a scrim holds the middle dark so type stays legible. Amber is reserved for things a
human should act on or care about — status, the guide star, actions. Ion cyan, rose
and violet are atmosphere and appear as text only rarely.

See `PRODUCT.md` for the audience and product truth. This file governs appearance
only.

## Colors

Three grounds, three text weights, one action accent, three emission accents.

| Token | Value | Role | Contrast on ground |
|---|---|---|---|
| `--ground` | `#070512` | page ground, void violet | — |
| `--ground-2` | `#0e0b20` | raised panel, row hover | — |
| `--ground-deep` | `#030208` | scrollbar track | — |
| `--starlight` | `#f2eff9` | primary text, headings | 17.8:1 |
| `--dim` | `#a49ec4` | secondary text, body copy | 8.0:1 |
| `--faint` | `#948eb8` | tertiary: labels, meta, dates | 6.6:1 |
| `--amber` | `#ffb454` | **the human accent** — status, actions, guide star | 11.5:1 |
| `--amber-deep` | `#e0873a` | amber pressed/hover fill | 7.3:1 |
| `--ion` | `#67e8f0` | data and instrument readouts | 13.8:1 |
| `--rose` | `#ff7ab0` | emission; atmosphere, sparing as text | 8.3:1 |
| `--violet` | `#b18cff` | emission; atmosphere, sparing as text | 7.8:1 |
| `--ink` | `#0b0716` | text on amber or ion fills | 11.3:1 on amber |

`--ground-rgb`, `--amber-rgb`, `--ion-rgb`, `--rose-rgb` and `--violet-rgb` carry
the raw channels for alpha compositing and for canvas `fillStyle`, which cannot read
a custom property.

Three line weights, and the distinction is not cosmetic:

- `--line` (0.09 alpha) — decorative dividers. No contrast floor.
- `--line-strong` (0.18) — structural dividers. No contrast floor.
- `--field-line` (0.40) — **interactive boundaries only.** Form controls need 3:1
  under WCAG 1.4.11; this measures 3.4:1. Do not use `--line-strong` on an input.

`color-scheme: dark` is set on `:root` so native checkboxes, the caret and
scrollbars match the panel instead of arriving bright white.

## Typography

Three faces, three jobs, no overlap.

- **Fraunces** — display only. Headings and project names. Optical sizing on.
  Tracking tightens as size grows, down to `-0.035em` on the hero.
- **Geist** — body copy, 15–18px, `ss01` enabled. Never used for headings.
- **Space Mono** — data. Catalogue designations, coordinates, dates, tech stacks,
  labels, the sidereal readout. This is the one place monospace is legitimate: it
  marks measurement, not "technical vibes".

Hero name runs `clamp(3.4rem, 12vw, 8.5rem)` at the full measure. Section headings
step down to `text-5xl sm:text-7xl`. Body copy is capped at `52ch`; the intro at
`54ch`.

**The ramp is small-stepped by design and every step is in the frontmatter.** The
data roles run 10–13px because they are catalogue entries, not prose; the prose
roles run 14–18px. A literal size outside this list is drift — either use a step or
add one here deliberately.

| px | Role | Typical use |
|---|---|---|
| 10 | `label-sm` | designation chips, dates, footer |
| 11 | `label` | markers, nav, meta, tech stacks |
| 12 | `data` | wordmark, sidereal readout, section counts |
| 13 | `caption` | timeline detail |
| 14 | `input` | form fields |
| 15 | `body-sm` | card blurbs, dense copy |
| 16 | `body` | section body copy |
| 18 | `lede` | hero intro |
| 20 | `subtitle` | hero plate object name |

## Layout

One shared measure, defined once as `.shell`, so every section keeps the same
rhythm. Never reintroduce a per-section `max-w-*`.

| Viewport | Measure |
|---|---|
| below 1280px | 72rem |
| 1280px and up | 82rem |
| 1600px and up | 92rem |

Gutters are `px-5` rising to `sm:px-8`. Section rhythm is `py-24 sm:py-32`. The hero
is `min-h-[100svh]` with the name at full measure and a two-column row beneath it,
top-aligned — bottom-aligning opens a large dead gap under the name.

The catalogue is a pinned horizontal journey on large viewports: a `position: sticky`
frame with the track moved by a single transform driven by `--travel`. It falls back
to a vertical list below 1024px wide, under 720px tall, and under reduced motion.
The 720px floor exists because the pinned frame is ~668px tall and would otherwise
be silently clipped.

## Elevation & Depth

**There are no drop shadows anywhere, and that is deliberate.** Depth comes from
three other sources:

1. **Tonal layering** — `--ground` behind, `--ground-2` for raised rows and panels.
2. **Parallax** — background layers move at different rates against scroll and
   pointer, which reads as distance rather than as a lifted surface.
3. **Light** — the amber `.bloom` glow, used only on things that are genuinely
   alight: the status dot and the guide star.

Hairline borders do the separation work a shadow would do elsewhere. Do not
introduce a shadow scale; it would fight the flat, printed-plate feel.

## Shapes

Square. Corners are `0` almost everywhere — plates, inputs, the primary button,
catalogue cards, the designation chip. The exceptions are deliberate and few:

- `rounded-sm` (2px) on the ghost CTA in the header.
- `rounded-full` on the status dot and the cursor glow, because they are points of
  light, not panels.
- `border-radius: 1px` on the focus ring so it does not read as a rounded chip.

The form language is a photographic plate: a hairline rectangle with a caption bar.
Keep it.

## Components

**Header.** Fixed, 56px tall, `rgba(var(--ground-rgb), 0.8)` with `backdrop-blur-md`
and a `--line` bottom border. Retreats on scroll down and returns on scroll up via
`.nav-shell[data-hidden]`, throttled to one frame with a 6px jitter threshold.
Focus-capture forces it back so a keyboard user is never trapped behind it. Active
section is marked with `aria-current` as well as amber, never colour alone.

**Plate (catalogue card).** An `<article>`, not an anchor. Hairline border, media at
`aspect-[16/10]`, a scrim gradient at the foot of the media, the designation chip in
amber with `--ink` text at top-left. The title carries a **stretched link**
(`after:absolute after:inset-0`) so the whole card is one target, and the "Source"
link sits above it at `z-10` as a genuinely separate destination. This structure is
load-bearing: an earlier version had "Source" as a span inside a link pointing at
the live site, which lied about where it went.

**Media.** Video is held on its poster until the client confirms motion is welcome —
so a reduced-motion visitor never gets an unpausable loop, and no video bytes are
fetched for them at all.

**Form fields.** Transparent fill, `--field-line` border, amber on focus.
Placeholder is `--faint`, which clears 4.5:1. The channel checkboxes are wrapped in a
`fieldset` with a `legend`, not a paragraph label.

**Reticle (the pointer).** The system cursor is replaced by a finder scope: a
starlight ring with four graticule ticks, plus an amber sight dot. The sight
tracks the pointer exactly; the ring lags at a 0.18 lerp. That split is what makes
it read as an instrument being aimed rather than a shape being dragged. Over
anything actionable the ring scales to 1.45, turns amber, and the ticks step
outward.

**This is gated and the gate is not optional.** It activates only behind
`canHover()` — a fine pointer with `prefers-reduced-motion: no-preference`. Touch,
coarse pointers and reduced-motion visitors keep their own cursor with nothing
overridden, because hiding the system cursor takes away an affordance some people
depend on, including anyone using OS cursor-size settings. Do not widen the gate,
and do not apply `cursor: none` outside `.reticle-on`.

**Backgrounds.** Four fixed layers, by explicit owner decision: a video loop
(desktop and motion-ok only), the nebula field, the canvas star field, and the
coordinate grid. Optimising how they run is welcome; removing one is the owner's
call, not a maintainer's.

## Do's and Don'ts

**Two constraints look like timid design and are load-bearing. Do not "fix" them.**

1. **The nebula scrim.** `.nebula-field` puts its emission lobes at the edges and
   corners with a heavy scrim through the middle, tuned so the content column stays
   under **0.0155 luminance** — the measured ceiling for `--faint` to hold 4.5:1.
   Brightening the lobes or shrinking the scrim pushes small text below AA. A
   version with lobes at 0.50/0.42/0.30 alpha measured **2.11:1** for `--faint`.
2. **The guide star's halo is deliberately dim** (radius 26, peak alpha 0.26). At
   radius 34 / alpha 0.55 it measured **0.082 luminance** and broke contrast for any
   text passing behind it.

**How to verify after touching either.** Palette math against a flat ground is not
sufficient and will pass things that actually fail:

```bash
# render the page with text hidden, so you measure the real background
printf '\nheader,main,footer{visibility:hidden !important}\n' >> <built-css>
# screenshot at 1853x1081, then block-average at 16x16 and check the brightest
# block inside the content band against every text token
```

The binding token is `--faint`. It must stay at or above 4.5:1 against the
**brightest** local background in the content column, not the median.

**Do**

- Keep amber scarce. Its power is entirely in how little of it there is.
- Route every colour through the tokens. Canvas is the sole exception, and it names
  its constants at the top of the module.
- Animate `transform` and `opacity` only.
- Give every animated surface a reduced-motion path that is complete and readable,
  never degraded.
- Scale work to the viewport: the star field's density is derived from viewport
  area, so a phone never draws a desktop's field.

**Don't**

- Don't add a shadow scale, a gradient headline, or a second display face.
- Don't use monospace for prose. It marks data here.
- Don't reintroduce per-section `max-w-*`; the measure is `.shell`.
- Don't put `--line-strong` on an interactive boundary; that is `--field-line`.
- Don't invent celestial coordinates or magnitudes for the catalogue objects. Live
  astronomical values that are actually computed, such as the sidereal time and moon
  phase in the hero, are fine. Fabricated data next to real work is not.
- Don't remove the coordinate grid to satisfy the impeccable detector's
  `codex-grid-background` advisory. It is an accepted exception.
