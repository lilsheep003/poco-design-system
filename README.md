# Poco Design System

> A gentle productivity app for people with ADHD. *Do a little at a time — no pressure, just progress.*

This document is the entry point for the Poco design system. It covers product context, content & visual foundations, iconography, and a manifest of everything inside this project.

---

## Product Context

**Poco** is a mobile-first productivity app designed for people with ADHD. Where most productivity tools optimize for *output*, Poco optimizes for *starting* — the friction point that ADHD brains know best. The whole product is built around gentle onboarding into work: check in with your state, pick the smallest possible next step, stretch into a calm focus session with a small companion animal, reflect.

### Core surfaces

| Surface | Job |
|---|---|
| **Home** | Morning greeting, state check (Mood / Energy / Focus), suggested smallest-next-step, today's tasks, gentle nudges |
| **Tasks** | Mind-dump inbox, stuck-help, priority / low-energy / in-progress groupings |
| **Focus** | Quiet-space setup, timed sessions with a companion (Mochi the bunny), milestones, reflection |
| **Mood** | Mood / energy / focus check-in, gentle reflection on what feels heaviest |
| **Me** | Profile (not yet in wireframes) |

### Signature interactions

- **Break it down** — any task can be recursively split into a smaller step, then a smaller step, until one feels doable.
- **Friction picker** — "What feels hardest about this task right now?" (don't know where to start / feels too big / overwhelming / can't decide / no energy). The answer tailors the breakdown.
- **State triad** — Mood × Energy × Focus drive every suggestion.
- **Companion focus** — a bunny named Mochi keeps you company during timed sessions; small delightful events happen (*"Mochi found a lucky clover"*).

### Sources used to build this system

- **LoFi wireframes** (mounted folder `LoFi/`, copied into `source_lofi/`):
  - `Home.png`, `Home long.png` — home dashboard
  - `Task.png`, `Task1.png` — tasks screen
  - `Mood1.png`, `Mood2.png`, `Mood long.png` — mood check-in
  - `Friction.png` — friction picker flow
  - `Write.png` — task capture / break-down entry
  - `break1.png`, `break2.png` — task breakdown screens
  - `iPhone-7.png`, `iPhone-8.png` — focus setup screens
  - `iPhone-16.png`, `iPhone-17.png` — focus session + reflection

No codebase, Figma file, or brand guideline was provided — these are *low-fidelity* wireframes, so this system extrapolates from the wires + the written brief. Treat color and type as established, treat component detail as recommended-but-tunable.

---

## Content Fundamentals

Poco's voice is the opposite of a productivity hustle app. It is **calm, lowercase-shaped-energy, and second-person-warm** — it talks *with* you, not *at* you.

### Tone

- **Gentle and permissive.** "No pressure, just progress." "It is okay if the step needs to be tiny before it feels doable."
- **Second person, inclusive "we".** "Let's find one doable next step today." "We made it a little smaller." "We can make the first step even smaller."
- **Questions over commands.** Headings are often questions: *How are you starting? / How are you feeling today? / What feels hardest about this task right now? / Ready for a calm stretch?*
- **Smallness as virtue.** The words *small, smaller, smallest, little, tiny, gentle, calm, quiet, doable, first step* recur throughout. Avoid power/hustle vocabulary (crush, optimize, 10x, peak, maximize).
- **No shame about state.** Low energy is a valid input, not a failure. "If things feel heavy, try starting with just 5 minutes of low-friction work."

### Casing

- **Title Case** for screen titles (`Tasks`, `Mood`, `Session Reflection`, `Gentle Reflection`, `Suggested Start`, `Today`, `Top Priorities`).
- **Sentence case** for body copy, subtitles, and list items. No "Your Mood Right Now" — it's "Your mood right now".
- **Numbered step headings** use sentence case with trailing question marks when asked: `1. Your mood right now`, `2. Energy level`, `3. Ready to focus?`

### Punctuation & grammar

- Exclamation marks are used *sparingly* and only warmly — `Good Morning!`, `Beautifully Focused!`, `That's me today !` (with a thin space). Never for alarm.
- Contractions stay conversational (`let's`, `we'll`, `it's`, `that's`).
- No Oxford-comma rule strictly enforced; follow what reads calm.
- Em dashes acceptable but rare — prefer a short sentence break.

### Example copy (verbatim from wires)

- Home greeting: **Good Morning!** · *Let's find one doable next step today.*
- Tasks greeting: **Tasks** · *Let's find one easy place to start today*
- Mood greeting: **Mood** · *How are you feeling today?* · *A small check-in can help you notice your rhythm.*
- Stuck CTA: **Feeling stuck?** *Break a big task into smaller steps.*
- Reflection CTA: **How are things feeling today?** *A small reflection can help you notice what made today easier or harder.*
- Breakdown screen: **We made it a little smaller** · *You do not need to do it all now. Just start with the first step.*
- Focus intro: **Ready for a calm stretch?** *Let's find your flow at your own pace.*
- Focus setup: **Design your quiet space** · *Configure your session to match your current energy level. No pressure, just presence.*
- Session end: **Beautifully Focused!**

### Button labels

Short, human, verb-leading. Often 2 words. Never ALL CAPS.

- `Break Down` · `Start Focus` · `View` · `Start Now` · `Open reflection` · `Save to mind drop` · `Break it down` · `Make it smaller` · `That's me today !` · `Back to home`

### Emoji

Not used in UI chrome. A single smiley glyph appears inside the mood icon (😐-style face). Otherwise the product relies on simple line icons, not emoji.

---

## Visual Foundations

### Palette

Almost entirely neutral. Color appears as a **status whisper**, never as decoration.

- **Surface** — pure white (`#FFFFFF`) background; soft light-gray (`#F2F2F2`) for cards; slightly deeper gray (`#D9D9D9`) for pressed / primary-ish buttons; medium gray (`#8A8A8A`) for filled secondary buttons ("Break Down", "View").
- **Ink** — near-black (`#0E0E10`) for primary text and icons; mid-gray (`#6B6B6B`) for supporting copy; light-gray (`#B8B8B8`) for hints and disabled.
- **Status** — soft pastel pills only: coral-pink `#F4B4B4` (High priority), sage-green `#B9E2B6` (Easy / low-effort), muted blue `#6FA8DC` dot (In progress). These are the *only* colors in the entire app and each appears as a small pill or dot — never as a fill of a large surface.
- **Warm accent** — a single cream tile `#FCEBD8` behind the Mochi companion on the reflection screen. This is the warm-heart moment of the product.

### Typography

Primary typeface is **PingFang SC** — a humanist sans-serif that ships on Apple platforms and reads calm and friendly at all sizes. On non-Apple platforms we fall back through PingFang TC/HK, Hiragino Sans GB, Microsoft YaHei, Noto Sans SC, then a Latin-only fallback (Plus Jakarta Sans) for environments with none of the above. Headings are **bold (700)**, body is **regular (400)**, secondary weights use **medium (500)** and **semibold (600)**.

- Display / screen titles: 32–34px, 700, tight tracking.
- Section titles: 17–18px, 700.
- Body: 15–16px, 400, generous line-height (1.45).
- Meta / hint: 13–14px, 400, mid-gray.
- Buttons: 15–16px, 600.

> **Font:** PingFang SC is relied on as a system font — no webfont files are bundled. On non-Apple devices without a Chinese-capable PingFang/Noto family, the cascade lands on a Latin fallback; if you need guaranteed cross-platform parity, bundle Noto Sans SC as a webfont.

### Spacing

A soft 4-based scale with generous outer padding on mobile.

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 48`

- Screen horizontal padding: **20px**.
- Card inner padding: **16–20px**.
- Stack gap between sections: **24–32px**.
- Stack gap between items in a list: **8–12px**.

### Corner radii

Roomy and consistent — this is a core visual signature.

- Inputs, chips, list rows: **12px**.
- Cards and grouped panels: **16–20px**.
- Primary buttons and CTAs: **28–999px** (fully pill).
- Icon tiles / square avatars: **14px**.

### Borders & shadows

Poco is a **borders-and-fills** system, not a shadow system.

- Cards rest on the page with **no shadow** — they are differentiated by a fill (`#F2F2F2`) against a white page, or a 1px border (`#E5E5E5`) if nested on a gray surface.
- Inputs use a **1px mid-gray border** (`#C9C9C9`) when unfilled (chip-style), or a fill with no border when filled.
- The only shadow allowed is a **very soft system-level elevation** (`0 1px 2px rgba(0,0,0,0.04)`) on floating things like the bottom tab bar — and even this is optional.

### Imagery

No photography. No illustration except the **Mochi** companion (small rounded-corner square tile, warm cream background, friendly animal face). Everything else is composed of type, icons, and filled rectangles.

### Animation

Calm and almost imperceptible.

- **Fades** 150–200ms for appearing elements; ease-out.
- **Press scale** `0.97` with a spring-ease return; ~120ms.
- **Hover** (web/desktop): opacity 0.8 on icon buttons; surface-darken one step on filled buttons. No color shifts.
- **No bounces, no confetti, no celebratory motion.** The session-complete screen just reads "Beautifully Focused!" — the reward is verbal, not kinetic.

### Hover / press / states

- **Hover (pointer)** — icon buttons drop to `opacity 0.7`; filled buttons darken one step (e.g. `#D9D9D9` → `#C9C9C9`).
- **Press** — `scale(0.97)` and one step darker fill.
- **Focus ring** — 2px ink outline offset 2px. Never the blue system default.
- **Selected** — list row gets a 1.5px ink border (see the Companion Mode "Active" row) or a filled ink dot (see the task checkbox).

### Transparency & blur

Not used in the wireframes. The system is opaque. If an overlay is ever needed, use a flat `rgba(14,14,16,0.4)` scrim — no backdrop-filter.

### Layout

- Fixed **bottom tab bar** on app screens (Home · Task · Focus · Mood · Me). ~80px tall including safe-area; white fill, hairline top border `#EDEDED`.
- Screen header is **inline scrolled**, not sticky — the page title is the first element, not a nav bar.
- Content is a single column, **20px side padding**, sections separated by 24–32px vertical gap.

### Cards

The defining component.

- Fill: `#F2F2F2` (default) or white with 1px `#E5E5E5` border (nested case).
- Radius: 16–20px.
- Padding: 16–20px.
- No shadow. No gradient. No border-accent stripe.
- Content stacks from a bold label → supporting text → action(s).

---

## Iconography

The wireframes use **thin-stroke, rounded line icons** — a single consistent weight across the app. Observed icons include:

- Bell (notifications), person (profile), calendar, settings-cog, search, filter-funnel, back-chevron, right-chevron, battery (low / medium / high), smiley face, plant-sprout, checkmark-circle, trash, chevron-circle-right, close-circle.

### Icon system choice

No custom icon set was provided. **We use [Lucide](https://lucide.dev/)** — same visual DNA (rounded caps, 1.5–2px stroke, 24px grid) — loaded from CDN:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

Map (wireframe → Lucide):

| Wireframe | Lucide name |
|---|---|
| Bell | `bell` |
| Profile person | `user` |
| Calendar | `calendar` |
| Cog | `settings` |
| Magnifier | `search` |
| Funnel | `filter` |
| Back chevron | `chevron-left` |
| Right chevron | `chevron-right` |
| Chevron-in-circle | `arrow-right-circle` |
| Close-in-circle | `x-circle` |
| Battery low / med / high | `battery-low` / `battery-medium` / `battery-full` |
| Smiley (mood) | `smile` |
| Plant-sprout (focus) | `sprout` |
| Checkmark-circle (done) | `check-circle-2` |
| Empty radio | `circle` |
| Trash | `trash-2` |
| Home / list / target / smile / user (tab bar) | `house` · `list` · `target` · `smile` · `user` |

**The Mochi companion** is the only true illustration. We do not have the real asset — `assets/mochi-placeholder.svg` is a simple rounded-square placeholder tile. **Please send the real Mochi artwork and we'll drop it in.**

Emoji are **not** used as icons anywhere. Unicode glyphs are not used as icons. Any icon is a Lucide SVG or the Mochi illustration.

---

## Index — what's in this project

```
README.md                — you are here
SKILL.md                 — portable skill manifest (for Claude Code use)
colors_and_type.css      — CSS variables: color tokens, type tokens, semantic vars
fonts/                   — self-hosted font files (if any; otherwise Google Fonts CDN)
assets/                  — logo, mochi companion, any brand imagery
preview/                 — Design-System-tab preview cards (one per token family / component)
ui_kits/
  poco_app/              — mobile app UI kit (index.html + JSX components)
source_lofi/              — the original wireframes (reference only)
```

### UI Kits

- **`ui_kits/poco_app/`** — iOS-sized mobile app recreation. Click-through across Home, Tasks, Mood, Focus setup, and Focus session.

### No slides

No slide template was provided, so no `slides/` folder. Ask if you want a Poco-branded deck template.
