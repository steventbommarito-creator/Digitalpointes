# DIGITAL POINTES — Website Rebuild Specification

**Project:** Full redesign of digitalpointes.com
**Deliverable:** A single, self-contained `index.html` (vanilla HTML/CSS/JS, no build step)
**Version:** v2 spec — includes all client feedback rounds to date
**Reference build:** A working prototype (`digital-pointes-v2.html`) exists and implements this spec. You may be given it as reference, but this document is the source of truth. Build fresh from this spec.

---

## 0. How to use this document

You are building an immersive, scroll-driven marketing website. This document contains everything: company context, brand system, the creative concept, scene-by-scene specifications with final copy, the particle-system technical spec, and hard constraints. Follow the copy verbatim unless a section marks it as flexible. Where the spec is silent, favor restraint, performance, and conversion over decoration.

**The one-sentence brief:** The entire site is a single living canvas of orange "data pointes" (dots = households) that reorganize themselves scene by scene to tell the company's story — targeting → channels → conversion → proof — overlaid with a hand-drawn, human annotation layer, ending in a warm, human, lead-capturing final section.

---

## 1. Company & brand context

### 1.1 Who Digital Pointes is

Digital Pointes is a Metro Detroit–based marketing company specializing in:

- **Audience curation** — building precise audiences from full-funnel intent triggers, geofencing, household-level data, and unparalleled tracking
- **Multimedia / cross-channel marketing** — digital (display + social), email, SMS, CTV (connected TV), and direct mail, run as one coordinated system
- **Cross-channel measurement, attribution, and optimization** — household-level match-back, foot-traffic lift, pixel and promo-code tracking, even on saturation and broad-reach campaigns
- **AI agents** — chat and phone AI receptionists that answer every inbound call/message, book appointments, and hand off warm leads (includes healthcare-grade voice agent experience)
- **Visitor identity** — anonymous website traffic identified and matched back to real households for follow-up

**Tagline:** *Engagement Through Data*

### 1.2 Core positioning ideas (must come through on the site)

1. **The household, not the device.** Digital Pointes targets and measures at the household level — hundreds of attributes per home (children, income, homeownership, pets, purchase history).
2. **Every channel, one system.** Digital, email, CTV, SMS, and direct mail are fully interconnected — never presented as a linear list or silos. Same audience, one story, sequenced across touchpoints.
3. **Hand raisers.** Any household/device that takes an action — site visit, QR scan, call, click — gets flagged as a "hand raiser" and worked persistently, across every channel, until it converts. This is central to the brand's philosophy: *rally around the hand raisers.*
4. **Proof, down to the household.** Attribution is not a black box. Match-back reports at household level, even on saturation mail and broad campaigns.
5. **Human where it counts.** Data does the targeting; people do the work. Small team, on call, plain-English reporting, no bloated retainers — backed by AI receptionists so no lead ever rings out.

### 1.3 Known offerings (final section cards)

- **Predictive Movers** — online + offline triggers spot households likely to move, before they list
- **Digital Carrier Routes** — saturation direct mail with a digital overlay, household-level attribution on every route
- **Conquest & Capture** — win customers from complementary and competitive locations (geofencing)
- **Loyalty Ads** — re-engage anonymous foot traffic; turn visits into repeat patrons
- **AI Receptionists** — chat + voice agents answering every call and message, booking appointments, handing off warm leads
- **Visitor Identity** — anonymous website traffic identified and matched to real households

### 1.4 Trust markers & contact (real, use verbatim)

- Clients have included: **Ford, eXp Realty, Epique Realty, Xpress**
- Phone: **586.265.8858**
- Email: **Sales@digitalpointes.com**
- Footer: `© 2026 DIGITAL POINTES, LLC · ENGAGEMENT THROUGH DATA`

### 1.5 The current site (what we're replacing)

WordPress/Elementor brochure site. White background, charcoal text, brand orange **#FF9E1B** accents. Standard hero + service cards. Competent but static — zero wow factor. The color theme must be preserved; everything else is being reimagined.

---

## 2. The creative concept (client-approved direction)

Two concepts were chosen and merged:

**Concept A — "One canvas, one story."** The whole site is a single field of hundreds of orange data pointes rendered on one fixed, full-viewport `<canvas>`. As the user scrolls, the dots *behave*: they drift, light up with intent, assemble into a family, cluster inside a hand-drawn geofence, stream into a fully interconnected channel network, raise their hands, and finally trace attribution lines back to revenue. No page sections in the traditional sense — one continuous scroll-driven film.

**Concept B — "The human layer."** Over the precision data visuals sits a hand-drawn annotation layer: marker-style handwritten notes (Caveat font) with sketched SVG arrows, slightly rotated, imperfect. These notes read like a strategist scribbling on a map: *"your competitor's parking lot," "was on your website at 11:40 last night."* The contrast — machine precision + human hand — IS the brand.

**The ending flips.** After six dark data scenes, the final section is warm paper (#FAF6EF), rounded top corners, sliding up over the canvas like a letter over a map: *"Data does the targeting. People do the work."* Dark→light is the narrative arc from data to humans.

---

## 3. Design system

### 3.1 Color tokens (brand orange is non-negotiable)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#12151B` | Canvas/page background (deep night-map, NOT pure black) |
| `--slate` | `#3A4150` | Dormant dots, dim UI |
| `--orange` | `#FF9E1B` | THE brand color — active dots, fences, lines, CTAs, eyebrows |
| `--orange-glow` | `#FFB85C` | Annotations, converted dots, glows |
| `--chalk` | `#F4EFE6` | Headlines and body on dark |
| `--paper` | `#FAF6EF` | Final human section background |
| `--char` | `#1C1F26` | Text on paper, button text |
| (paper accent) | `#C97300` | Orange darkened for legibility on paper |

### 3.2 Typography (Google Fonts)

| Role | Face | Notes |
|---|---|---|
| Display | **Archivo** (variable, wdth+wght) | Headlines at weight 900, width ~88; the wordmark at width ~118, letterspaced |
| Body | **Archivo** 400 | 15–17px, line-height 1.55 |
| Data/utility | **IBM Plex Mono** 400/500 | HUD counter, eyebrows, coordinates, chips, node labels, footer |
| Handwriting | **Caveat** 500/600 | Annotations, scroll cue, sign-off — the human layer only |

Eyebrows: mono, 10px, letter-spacing ~.24em, orange. H1 clamp(42px, 9vw, 84px); H2 clamp(32px, 6.6vw, 60px), line-height ~0.98.

### 3.3 Texture rules

- Hand-drawn elements (fence circle, arrows, underlines) must wobble — never geometrically perfect
- Dashed lines animate (marching ants via `lineDashOffset`) — the system always feels alive
- Everything mono = machine; everything Caveat = human. Never mix roles.

---

## 4. Page architecture

Eight full-viewport sections. Sections 0–6 are transparent scroll "scenes" over the fixed canvas; section 7 is the opaque paper section.

**Fixed chrome:**
- **HUD (top):** left = wordmark `DIGITAL POINTES` ("POINTES" in orange); right = live mono counter (number + tiny label) that refines per scene. HUD fades out over the paper section.
- **Floating CTA pill (bottom-right):** "Build your audience ↗" → anchors to `#contact`. Appears after ~0.9 viewport of scroll, hides when the paper section (with its own CTA) is in view.
- **Floating annotation layer:** the handwritten notes are NOT scoped to their sections. They live in a `position:fixed` overlay, each with a scroll range (`data-from` / `data-to` in viewport units of scroll progress `f`). A note fades in when `f` enters its range, **stays pinned and floating on screen while its related animation forms** (gentle 5s vertical bob), and fades out when `f` leaves. Ranges can span multiple scenes: the *"visits the competitor down the street every Friday"* note appears during the intent scene and persists all the way through the geofence draw (range ≈ 1.15 → 3.9) — the signal you saw earlier is the one being fenced. Bob and transitions disabled under reduced motion.

**Responsive layout system (critical — text must NEVER overlap at any viewport):**
- **Desktop (≥900px): the left third belongs to the copy.** Copy blocks sit vertically centered in a left rail (max-width ~31vw, ~5vw left padding) behind a fixed gradient scrim (`rgba(18,21,27,.96) → transparent` across ~44vw of width) so dots never fight the text. **All canvas action centers on x ≈ 66%** — fence, family portrait (width clamped to ≤ ~52vw), channel ring, raiser cluster, revenue node — and every floating note is positioned inside the right two-thirds (left ≥ ~48vw or right-anchored). Headline type scales for the rail (H1 caps ~66px, H2 ~48px).
- **Mobile (<900px): copy gets a legibility card.** Blocks sit at the bottom on a translucent ink card (`rgba(18,21,27,.78)`, thin orange-tinted border, 14px radius) guaranteeing contrast over any dots. Canvas action stays centered (x = 50%); notes keep to the upper ~46vh so they never meet the card.
- Note positions are defined per-breakpoint in CSS by element ID — never inline — so each breakpoint fully owns placement.

**HUD counter sequence** (number eases toward target ~8%/frame, tabular-nums, `en-US` comma formatting):

| Scene | Value | Label |
|---|---|---|
| 0 | 2,412,847 | HOUSEHOLDS INDEXED |
| 1 | 61,204 | INTENT SIGNALS |
| 2 | 38,566 | HOMES WITH CHILDREN |
| 3 | 8,412 | DEVICES IN FENCE |
| 4 | 8,412 | HOUSEHOLDS REACHED |
| 5 | 1,318 | HAND RAISERS |
| 6 | $214,700 | ATTRIBUTED REVENUE |

---

## 5. Scene-by-scene specification (copy is FINAL — use verbatim)

Each scene: text block (eyebrow → headline → paragraph) in the copy zone. **Reveals are scroll-driven and EARLY:** scene *i*'s block fades in (0.45s, slight rise) as soon as `f ≥ i − 0.35` — roughly 15% of the section into view — so copy is fully loaded well before it reaches 2/3 up the screen. Never wait for the section to near the viewport top. Once revealed, a block stays revealed. Handwritten notes follow their own ranges (floating layer, §4).

### Scene 0 — Hero
- **Dots:** full field drifting gently (sine-noise wobble), dim slate. In the last half of the scene, intent dots pre-warm faintly orange.
- **Eyebrow:** `METRO DETROIT, MI · 42.67°N 82.94°W`
- **H1:** `Every dot is a household.`
- **Body:** `Digital Pointes curates audiences from real-world signals — then reaches them on every channel and proves what worked.`
- **Note (top-right, arrow pointing into field):** `every dot is someone's front porch`
- **Scroll cue (Caveat):** `scroll — watch what we do with them ↓`

### Scene 1 — Intent signals
- **Dots:** ~16% (the "intent" subset) turn brand orange and pulse in size; the rest dim further as the scene progresses.
- **Eyebrow:** `FULL-FUNNEL INTENT TRIGGERS`
- **H2:** `Some of them are in-market right now.`
- **Body:** `Searches, site visits, store loyalty, life events, even the questions they ask their community. Our intent triggers surface the households that are actually shopping — before your competitors know they exist.`
- **Three notes scattered over the field (this multiplicity is deliberate — client asked for MORE human signals):**
  - `was on your website at 11:40 last night` (with sketched arrow)
  - `visits the competitor down the street every Friday` — **persists through Scene 3** (see floating layer, §4)
  - `asked the Facebook group for financial advisor recs`
- **THE LIVE SEARCH SIGNAL (client-requested):** a **Google-esque search bar** forms in the field — white pill, gray magnifier icon, dark text, blinking caret, small Caveat label beneath (`a live intent trigger ↑`). On desktop it sits **horizontally centered on the action zone** (left 66vw with a -50% `translate`, ~34vh down); on mobile it's centered full-width near the top. It **types with the scroll**: `best {INDUSTRY} in {CITY}`, one character band per scroll increment (fully typed by ~mid-scene; instantly complete under reduced motion).
  - `{CITY}` resolves dynamically from the browser: (1) IP geolocation via `https://ipapi.co/json/` → `city`, falling back to `region` (state); (2) fallback: last segment of `Intl.DateTimeFormat().resolvedOptions().timeZone` with underscores replaced (e.g. `America/Detroit` → `Detroit`); (3) final fallback string `your city`. **Never trigger a browser geolocation permission prompt.**
  - `{INDUSTRY}` comes from a URL parameter: `?industry=hvac` → `best hvac in Detroit`. **Default: `roofer`.** Lowercase it, trim, cap at 40 chars, and inject via `textContent` only (never innerHTML).
  - The bar is the machine layer — no handwriting styling, no rotation.

### Scene 2 — Household targeting (THE FAMILY MOMENT — signature scene)
- **The family is a real portrait, not a pictogram.** A supplied stipple-style family portrait image (two parents, two kids, smiling — orange-on-white) is the source. Embed it as a small base64 JPEG (~300px wide, lightly blurred, ~5KB) and sample it at runtime on an offscreen canvas.
- **Dots are not confined to the field pool.** A dedicated portrait pool (~5,200 desktop / ~2,600 mobile) "splits" into existence — each dot spawns from the current position of a random field dot and flies to its sampled pixel, with staggered fade-in, so the portrait visibly multiplies out of the crowd. Field dots all dim beneath it.
- **Sampling:** skip near-white background pixels (lum > ~231); accept points with probability proportional to ink darkness so density follows the image (hair/clothing dense, skin lighter, teeth/eye-whites become natural gaps).
- **Tone ramp (4 buckets, darkest → brightest):** deep burnt `rgb(150,74,6)` small/dim → `#E07B00` → `#FF9E1B` → `#FFB85C` largest/brightest. Sort points by tone bucket and group draws by fillStyle for performance. Result: a glowing orange engraving of a real family — faces, smiles, hair — on the dark field.
- Portrait fades out on scroll-past and re-forms on re-entry. If the image finishes loading while the user is already in Scene 2, re-aim targets immediately.
- **Eyebrow:** `DATA · HOUSEHOLD TARGETING`
- **H2:** `Target the household, not just the device.`
- **Body:** `Hundreds of attributes per home — kids, income, homeownership, pets, purchase history. Build the exact audience: homeowners with children, five miles out, in-market for you.`
- **Note (arrow at the family):** `two kids and a mortgage`

### Scene 3 — Geofence
- **Dots:** intent dots migrate into a blob at canvas center; a **hand-drawn dashed circle** draws itself around them (wobble the radius with layered sines; dash offset animates; sweep progress tied to scroll).
- **Eyebrow:** `GEOFENCING · CAPTURE`
- **H2:** `We can draw the line anywhere.`
- **Body:** `A competitor's lot. A conference floor. A carrier route. Devices that cross the fence become an audience you own — and keep.`
- **Note (arrow at fence):** `your competitor's parking lot`

### Scene 4 — Channel network (NOT linear — client explicitly corrected this)
- **Visual:** **Five channel nodes in a ring** (pentagon): `DIGITAL · EMAIL · CTV · SMS · DIRECT MAIL`. Small square outline nodes with mono labels. **Every node connects to every other node** (all 10 edges) with animated dashed lines — adjacent ring edges brighter, cross edges fainter. Edges draw in with scroll. Intent dots stream to and swarm the nodes.
- **Eyebrow:** `DIGITAL · EMAIL · CTV · SMS · DIRECT MAIL`
- **H2:** `One audience. Every channel, connected.`
- **Body:** `Display, social, CTV, email, SMS, and direct mail run as one system — the same household, one story, sequenced across every touchpoint. No duplicate spend, no dead ends.`
- **Note:** `no silos — every channel talks to the others`

### Scene 5 — Hand raisers (core brand philosophy)
- **Visual:** network stays faint in the background. A subset of intent dots (the "raisers," ~28% of intent) fly to a loose center cluster. Each un-converted raiser gets a **pulsing halo ring** (the raised hand). As the scene scrolls, raisers **convert one by one** (each has a random conversion threshold): halo collapses, dot goes solid bright glow, slightly larger.
- **Eyebrow:** `HAND RAISERS · IDENTITY · RETARGETING`
- **H2:** `When a hand goes up, we don't let go.`
- **Body:** `A site visit, a QR scan, a call, a click — any action flags the household as a hand raiser. Anonymous website visitors get identified and matched back to a real home. Then we stay on them, across every channel, until they convert.`
- **Notes:** `clicked the mailer QR ✓` and `called, didn't book — yet` (with arrow)

### Scene 6 — Attribution
- **Visual:** network at half strength; **dashed bezier lines draw from all five channel nodes down to a single orange REVENUE node** near the bottom (draw partially, tied to scroll; node + mono label `REVENUE` pop at ~85% progress). Converted raisers pile in a glowing cluster just above the revenue node.
- **Eyebrow:** `MEASUREMENT · ATTRIBUTION · OPTIMIZATION`
- **H2:** `Then we prove it — down to the household.`
- **Body:** `Household-level match-back, even on saturation and broad-reach campaigns. Foot-traffic lift, pixels, promo codes — every dollar traced from impression to revenue, in reports you can actually read.`
- **Chips (mono, bordered):** `SATURATION MATCH-BACK HH-LEVEL` · `STORE VISITS +38%` · `ROAS 5.2×`
- **Note (honesty device — keep it):** `sample numbers — yours come from your dashboard`

### Scene 7 — The human layer (paper section, `id="contact"`)
Opaque `--paper` background, rounded top corners (≈28px), strong upward shadow — reads as a letter sliding over the map. Dark charcoal text; orange accents darkened to `#C97300` for contrast.

- **Eyebrow:** `THE PART THE DATA CAN'T DO`
- **H2:** `Data does the targeting.` (line break) `People do the work.`
- **Lede:** `No black box, no bloated retainer. A small team on call builds the plan, runs every channel, and walks you through the numbers in plain English — backed by AI chat and phone receptionists so no lead ever rings out. Rooted in client satisfaction, priced for any budget.`
- **Offer grid:** the six cards from §1.3 (white cards, tan border, mono tag + bold title + 13px description). Tags: MOVERS, MAIL + DIGITAL, CAPTURE, RETENTION, AI AGENTS, IDENTITY.
- **CTA row:** big orange button `Build your audience` (mailto:Sales@digitalpointes.com) + mono contact block (phone `tel:` link, email `mailto:` link).
- **Handwritten sign-off (Caveat, rotated):** `— the Digital Pointes team` with a wobbly SVG underline.
- **Footer:** per §1.4.

---

## 6. Particle system — technical spec

- Single fixed full-viewport `<canvas>`, 2D context. `devicePixelRatio` capped at 2.
- **Count:** ~950 desktop, ~380 mobile (breakpoint: `min(vw, vh) < 640`), **plus a dedicated portrait pool of ~5,200 desktop / ~2,600 mobile** that only renders in (and near) Scene 2. Each pool dot stores a sampled image point (unit u/v + tone bucket 0–3); on scene entry it spawns from a random field dot's position and fades in with a per-dot stagger. Points come from rejection-sampling the embedded portrait JPEG on an offscreen canvas (skip white, accept ∝ darkness), sorted by tone for grouped fills. Figure box: ~72% of min-dimension tall at the image's aspect ratio, clamped to 94% of viewport width, top ≈ 10% H.
- **Per particle:** home position (random unit space), current + target position, phase + speed for sine wobble, and flags: `intent` (~16%), `fam` (~30%), `raiser` (intent × ~28%), channel index (0–4), fence angle/radius, random conversion threshold (0.2–0.85).
- **Motion:** every frame, position lerps toward target (`p += (t - p) * 0.06`); a sine drift (±6px) sits on top, damped to ~25% for particles that are "in formation." All motion through one `requestAnimationFrame` loop.
- **Scene targets** recomputed only on scene change and on resize:
  - 0–1: home field
  - 2: `fam` → sampled family pictogram points (figure box ≈ 62% of min-dimension tall, centered upper-middle); others home
  - 3: `intent` → fence blob (radius ~0.20 × min-dimension, center ≈ 50%/44%); others home
  - 4: `intent` → jittered positions at their pentagon node; others home
  - 5: `raiser` → loose center cluster; other intent stay at nodes; rest home
  - 6: `raiser` → tight pile above the revenue node; other intent at nodes; rest home
- **Scroll driver:** `f = clamp(scrollY / vh, 0, 7)`; `scene = min(6, floor(f))`; `sceneT = f - scene`. Read in the rAF loop — no scroll-event thrash.
- **Draw order:** background fill → scene overlays that belong under dots (network, attribution lines) → dots → fence circle on top.
- **Pentagon geometry:** ring centered ≈ (50% W, 42% H), radius = min(W,H) × 0.28 desktop / 0.36 portrait, first node at −90°.

---

## 7. Motion, accessibility, performance

- **`prefers-reduced-motion`:** honor it fully — targets snap (lerp = 1), no pulsing/wobble/dash animation, fence and lines fully drawn, counters jump to final values, CSS transitions disabled.
- **Keyboard/focus:** visible focus outlines on pill, button, and links.
- **Canvas is decorative:** `aria-hidden="true"`; the full story must read as plain text (it does — every scene has real copy in the DOM).
- **Performance budget:** 60fps on a mid-range phone; no layout thrash (transform/opacity only for DOM animation); single canvas, no shadows/blur filters on dots; Google Fonts the only external request. Lighthouse mobile performance ≥ 90.
- **Responsive floor:** clean at 360px wide. Notes shrink (max-width ~160px) and must never overlap headline blocks on small screens.

---

## 8. Client feedback log (all incorporated above — context for judgment calls)

Round 1 (concept selection): chose "one canvas" + "human layer," combined. Loved v1.

Round 2 (verbatim intent, paraphrased):
1. Add **anonymous browser identification** → became Visitor Identity (Scene 5 copy + offer card)
2. Add **email and SMS** to the channel mix → 5-channel network
3. Integrate **AI agents — chat and phone receptionists** → lede + AI Receptionists card
4. Channels must be **interconnected, not linear** ("triangle all interconnected" — generalized to a fully-connected 5-node ring since the mix grew to five)
5. **More human touches/signals** — e.g. "was on your website," "visits competitor down the street regularly," "asked Facebook community for best financial advisors" → three notes in Scene 1
6. **Household targeting + attribution even in saturation and broad campaigns** → Scene 6 headline/copy + chip + Digital Carrier Routes card
7. **"Rally around hand raisers"** — homes/devices that take action get worked until they convert → Scene 5
8. **Data & targeting section: target homes with children — dots become a family** → Scene 2 (client called it silly; it is the signature moment — keep it)

Standing client requirements: fully immersive and seamless; "blur the line between professional marketing company and incoherence into a beautiful display of wow factor" — but with **proven lead capture** and a clean display of who they are; **organic and human**; **keep the current color theme** (the orange).

---

## 9. Guardrails — what NOT to do

- No pure-black background, no generic acid-green/neon accent, no template SaaS hero (big number + gradient blob). The orange **#FF9E1B** on deep ink is the palette.
- No scroll-jacking. Native scroll only; the canvas responds to scroll position, never controls it.
- No linear channel presentation. No silo language.
- No heavy libraries (no Three.js, GSAP, React, Tailwind). Vanilla only — this is also the benchmark condition.
- No lorem ipsum, no stock photos, no testimonial carousels.
- Don't fabricate client results as real — the `sample numbers` handwritten note must stay attached to the stat chips.
- Wow must never cost conversion: CTA pill always reachable mid-journey; paper section always ends the story with contact.

## 10. Acceptance criteria

1. Single `index.html`, opens from disk, works in current Chrome/Safari/Firefox, desktop + mobile.
2. All 8 scenes present with the exact copy in §5; HUD counter runs the §4 sequence.
3. The Scene 2 portrait is recognizable as the supplied family image — faces, smiles, and hair readable — within ~1.5s of entering the scene, with dots visibly splitting in from the field rather than the image just appearing. (The portrait source image is provided alongside this spec as `family-portrait.png`.)
4. Channel network shows all 10 interconnections; fence circle visibly hand-drawn (wobble + dashes).
5. Hand raisers visibly convert (halo → solid) as the user scrolls Scene 5.
6. Reduced-motion mode is fully static but complete.
7. 60fps scroll on mobile; Lighthouse mobile ≥ 90 performance.
8. Every phone/email touchpoint is a working `tel:`/`mailto:` link.
9. Annotations are pinned/floating (fixed overlay with scroll ranges), the competitor note remains visible while the geofence circle draws, and the search bar — centered on the desktop action zone — types `best {industry} in {detected city/state}` with the scroll, honoring the `?industry=` URL parameter (default `roofer`), with the ipapi → timezone → fallback chain and no permission prompt.
10. No text ever overlaps other text or sits illegibly over dense dots at ANY viewport from 360px phones to ultrawide desktops: desktop uses the left-rail + right action zone split; mobile uses the legibility card; resize mid-scroll must not break either.

## 11. Stretch ideas (discussed, NOT required — do not attempt at the cost of §10)

- Visitor "meta-demo": a moment that reflects the visitor's own context (time of day, device, referrer) back at them — "That took 2 seconds. Imagine what we do with real intent data."
- Cursor-trail intent scoring on desktop (scroll-depth variant on mobile)
- Interactive "Build your audience" configurator replacing the mailto CTA (vertical + radius + goal chips → live audience sketch → email gate)
