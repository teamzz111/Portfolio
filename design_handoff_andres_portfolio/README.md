# Handoff: Andrés Largo — Cinematic Developer Portfolio

## Overview
A dark, cinematic, immersive one-page portfolio for **Andrés Largo** (Sr. Software Engineer, FullStack / AI). Concept: *"FullStack developer in search of beyond."* The signature element is a 3D **living-system graph** (nodes + edges + data flows) in the hero that reacts to mouse and scroll, followed by scrollytelling sections (About, Experience, Selected Work, Skills constellation, Contact + form). Two locales (EN default, ES).

## About the Design Files
The files in this bundle are **design references authored in HTML/JS** — a working prototype that demonstrates the intended look, motion, and behavior. They are **not** the production codebase and should not be shipped as-is.

Your task: **recreate this design in the target stack below**, using clean, maintainable, componentized architecture. The prototype is the source of truth for visuals, geometry, timings, copy, and the 3D concept. Re-implement, don't copy-paste.

### Target stack (as specified by the client)
- **Next.js 15 (App Router) + TypeScript**, clean component architecture.
- **React Three Fiber + Drei + three.js** for the 3D hero (the prototype uses raw three.js r128 — port the scene to R3F components/hooks).
- **GSAP + ScrollTrigger** for scrollytelling (pinning, scrub, precise timelines); **Framer Motion / Motion** for UI micro-interactions & transitions.
- **Tailwind CSS** + custom CSS for grain/noise and the type system.
- **Lenis** smooth scroll, synced with ScrollTrigger via GSAP ticker **or** a shared rAF (see "Motion architecture — critical" below).
- **next-intl** (`[locale]` segment + middleware) — translate **text only**; the 3D scene is language-agnostic.

### Performance requirements (client mandate)
- Lazy-load the 3D (`React.lazy` + `Suspense`, mount on viewport enter), code-split three.js, adaptive DPR (`performance` min/max on `<Canvas>`), `useGLTF.preload` where relevant, antialias **off** on mobile.
- Progressive enhancement; respect `prefers-reduced-motion` (GSAP `matchMedia`).
- **Elegant no-3D fallback** (poster/gradient/CSS) for weak devices or reduced-motion.
- Target 60fps; degrade gracefully; never break focus or accessibility while animating.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, geometry, copy and interactions are all defined here and in the prototype. Recreate pixel-close, then adapt to Tailwind/React idioms.

---

## Motion architecture — critical (learned in the prototype)
Do **not** drive the 3D render loop or reveal animations off `gsap.ticker` alone — it can sleep and freeze everything. Use a single **own `requestAnimationFrame` loop** that (a) calls `lenis.raf(time)`, (b) renders the R3F/three scene, (c) applies mouse-parallax; and wire `lenis.on('scroll', ScrollTrigger.update)`. Use **ScrollTrigger scrub** only for scroll-linked tweens (they update on scroll, not the ticker). Use **IntersectionObserver + CSS transitions** (not gsap timelines) for enter reveals, with a geometry-scan fallback and a safety timeout so content is **never** left at `opacity:0`. Element reveals must have a visible default state if JS fails.

In R3F this maps to: a `useFrame` loop for the scene; a Lenis provider; ScrollTrigger created in a `useLayoutEffect` with `gsap.context`; reveal via a `useInView` hook + CSS/Motion.

---

## Global layout & structure
Single scrolling page, z-layered:
- **Atmosphere (fixed, behind everything):** gradient stage background (z0) → WebGL canvas (z2) → vignette (z5) → animated film-grain overlay (z6, `pointer-events:none`).
- **Fixed nav** (z20) always on top.
- **Fixed hero overlay** (z10) that fades/recedes on scroll.
- **Scroll track**: a `~170vh` spacer drives the hero fly-through via ScrollTrigger scrub (progress 0→1). Sections start after it.
- **Content sections** (z10) in normal flow, each `background: var(--bg)` (About's top is a transparent→solid gradient so the receding 3D shows through, then solidifies — the cinematic hand-off from hero to content).

---

## Screens / Sections

### Nav (fixed header)
- **Left:** `A—L` monogram (mono, 12px, letter-spacing .34em) + `©2026` (faint).
- **Center:** links `About · Work · Skills · Contact` (mono 11px, uppercase, .16em; muted → fg on hover; Contact is cyan). Smooth-scroll to section via `lenis.scrollTo(el, {duration:1.1})`. **Hidden below 820px.**
- **Right:** availability dot (6px cyan, glow) + status text (mono 10.5px) · **EN / ES** language toggle (active = fg, inactive = faint).
- Padding: `clamp(18px,2.4vw,30px) clamp(20px,4vw,58px)`. `pointer-events:none` on the bar, `auto` on the groups.

### 1 · Hero (immersive)
- **Layout:** headline block anchored left, vertically centered (`top:50%; translateY(-46%)`); location top-right; index + scroll-cue at bottom corners.
- **Eyebrow:** mono, uppercase, .2em, muted — `FullStack developer in search of` + the word **beyond** as Instrument Serif *italic* cyan at `clamp(1.7rem,4.2vw,3.4rem)` (3×+ size jump).
- **Name:** `Andrés` (Clash Display weight **200**) / `Largo.` (weight **500**, the period cyan), `clamp(3.4rem,15vw,14rem)`, line-height .8, letter-spacing -.03em, second line indented `clamp(30px,7vw,120px)`. Each line in an `overflow:hidden` mask with `padding-bottom: clamp(14px,2.6vw,46px)` + matching negative margin (so descenders/period aren't clipped). Reveal = CSS `@keyframes` mask-rise (translateY 116%→0), staggered, cubic-bezier(.16,1,.3,1). Mouse parallax translates the name group (±14px x / ±8px y), applied in the rAF loop.
- **Role:** mono `clamp(.72rem,1vw,.9rem)`, .06em, muted — `Sr. Software Engineer · FullStack · AI Workflows · Cloud & Mobile` + a blinking cyan block caret.
- **Location:** mono — `Bogotá D.C., Colombia` + `04°42′N · 74°04′W` (faint).
- **Index / cue:** `(01) — SYSTEM` bottom-left; `Scroll to enter the system` + animated scanning 1px cyan line bottom-right.

#### 3D hero concept — the "living system" graph
Abstract representation of a system Andrés designed: a volumetric **constellation of nodes and connections** that breathes, with **data flows** travelling along the edges. Reacts to mouse (parallax + gentle node attraction toward cursor) and scroll (camera flies **through** the system revealing depth). Thin luminous lines over midnight, volumetric depth, one accent color.

Prototype implementation (port to R3F):
- **Camera:** perspective FOV 52; `z = 62 - progress*80` (fly-through); slight x/y from mouse + `sin(progress*π)*5`; `lookAt(0, progress*3, z-22)`; group rotation from mouse + slow time + progress.
- **Nodes:** ~132 desktop / ~84 mobile, in **6 clustered subsystems** (Gaussian spread around 6 cluster centers). `THREE.Points` + custom `ShaderMaterial`, **additive blending**, `depthWrite:false`. Vertex: `gl_PointSize = size*(1+0.32*sin(uTime*0.9+phase)) * PR * (320/-mv.z)` (size breathing + perspective). Fragment: soft circular glow (`smoothstep`) + bright core; alpha faded by depth (`1 - (-mv.z)/130`).
- **Edges:** each node → 2–3 nearest neighbours (mostly intra-cluster). `LineSegments`, additive, opacity ~0.16, positions rebuilt each frame from node positions.
- **Data flows:** ~58 desktop / ~34 mobile bright particles lerping `a→b` along random edges (`t += speed*dt`), additive bright cyan.
- **Node motion (per frame, CPU):** base + `sin/cos` drift (~1.3 amp) + cursor attraction `k = 0.16*exp(-dist²*0.0016)` in the group's xy plane.
- **Renderer:** `alpha:true`, transparent clear (CSS gradient shows through), `pixelRatio = min(dpr, mobile?1.5:2)`, `antialias = !mobile`.
- **Fallback:** on no-WebGL / reduced-motion, skip the scene; the CSS gradient + grain + vignette already read as a cinematic poster.

### 2 · About
- Kicker `(02) — About`. Two-column flex (wraps): **left rail** = 3-stat ledger with hairline separators — `07+` *Years shipping systems*, `200+` *Engineers enabled*, `$1M` *MVP funding raised* (last value cyan), + role footnote `Systems Engineer`. **Main** = big statement, Clash Display weight 300 `clamp(1.9rem,4.4vw,4rem)` line-height 1.06 + a lighter body paragraph ending in Instrument Serif italic cyan *"think in systems."*
- Section top background: `linear-gradient(180deg, transparent 0%, rgba(6,5,7,.72) 12%, var(--bg) 26%)`.

### 3 · Experience / Trajectory
Editorial list "with depth", **not** a flat list. Header: kicker `(03) — Trajectory` + right-aligned title `A trajectory in` + serif italic *systems.*
Each of 7 rows (`<article>`): top hairline; flex-wrap `[index 38px][role+company block][description]`; a large **ghost year** (Clash Display 500, `clamp(4rem,10vw,10.5rem)`, `rgba(233,238,240,.035)`) absolutely positioned behind. Hover: `background rgba(66,230,221,.045)` + `translateX(12px)`, transition .28s cubic-bezier(.16,1,.3,1).
Row content: role (display 400, `clamp(1.5rem,3vw,2.35rem)`), company (Instrument Serif italic cyan `clamp(1.15rem,1.7vw,1.55rem)`), meta (mono 10.5px uppercase muted), description (display 300, `#97a0a4`).
Entries (newest→oldest): Lula—Smarter Property (Sr. Frontend, 08/2025–Present, Remote) · ByYuto LLC (Sr. FullStack, 2024–2025, Fort Lauderdale) · Nowports (Sr. Full Stack, 2022–2023, Bogotá) · Chamba App (2021–2022) · Creci Finance (2021–2022) · Chamba LLC (Founding Engineer, 2019–2021, Denver) · Imaginamos (Mobile, Shell Colombia). Full copy in the prototype's `T` dictionary.

### 4 · Selected Work
Header kicker `(04) — Selected work` + title `Things I've shipped.` 4 projects, alternating image side (use `order` on flex children), gap `clamp(80px,12vh,180px)`.
Each: **figure** = 16:10 framed image (1px border, `var(--bg2)` fill, hover `translateY(-6px)` + cyan border) containing a user-fillable image slot + a `/ 0N` mono index overlay (`mix-blend-mode:difference`). **Text** = tag (mono cyan uppercase) · title (display 300 `clamp(2.2rem,4.4vw,3.6rem)`) · tagline (Instrument Serif italic `#c3cccf`) · description (`#97a0a4`) · optional big metric (`200+`, `$1M` in cyan) · stack line (mono faint, hairline top).
Projects: **ByYuto** (Betting·Payments·AI; Claude+GPT-4 claims automation) · **Nowports** (design system, 200+ engineers) · **Chamba** ($1M MVP) · **Shell Colombia** (native mobile, Imaginamos). Replace the image slots with real screenshots (client to provide).

### 5 · Skills / Stack constellation
Header kicker `(05) — Skills` + title `A stack, wired as a system.` **Must be a connected constellation, not an icon grid or tag cloud.** SVG viz built from data: a central **SYSTEM** core, 6 category **hubs** on an ellipse, each hub linking to its skill nodes; core→hub and hub→skill edges. Nodes breathe via a gated rAF (`base + sin(t)*amp`), edges follow. Hover a cluster → it stays at opacity 1, others dim to 0.2. Cyan nodes with `drop-shadow` glow on core/hubs; mono labels (hub 12.5px fg, skill 10.5px `#98a1a5`), label anchor flips by side.
Categories & skills: **AI & Prompt Eng.** (Claude API, GPT-4, Cursor, MCP servers, RAG, Agentic workflows) · **Frontend** (React, Next.js, TypeScript, Tailwind) · **Mobile** (React Native, Flutter, Expo) · **Backend** (Node/Nest, .NET, Laravel, GraphQL, Microservices, DDD) · **Cloud & DevOps** (AWS, Docker, Serverless, Stripe, Plaid) · **Databases** (PostgreSQL, MySQL, MongoDB, Prisma).
**Fallback** (width < 760 or reduced-motion): a structured list — each category name (display) + skills joined by ` · ` (mono cyan) with hairline rows. In R3F/React, keep this SVG (it's cheap) or reuse the hero shader approach; the fallback is required.

### 6 · Contact + Form
Kicker `(06) — Contact`, radial cyan glow top-right. Big headline `Let's build systems that` + serif italic cyan *outlive us.* (Clash Display weight 200, `clamp(2.6rem,8vw,7rem)`). Sub paragraph. **Email** as a large underlined link `contacto@andreslargo.com` (`mailto:`, hover → cyan). Two link cards: **LinkedIn** `/in/andreslargo` → https://www.linkedin.com/in/andreslargo/ · **GitHub** `@teamzz111` → https://github.com/teamzz111 (hairline top, hover `padding-left:14px`, cyan ↗).
**Form** (last block): Name + Email (side by side, wrap) + Message textarea + submit `Send message`. Inputs = transparent, 1px bottom border `rgba(255,255,255,.18)`, focus border cyan, display font. Submit = 1px cyan outline button, hover fills cyan with dark text (`#04100f`). On submit: compose `mailto:contacto@andreslargo.com` with subject/body from fields and show a confirmation line. In production, consider wiring to a real endpoint (Resend/Formspree/route handler) instead of mailto.
Footer: hairline, mono uppercase faint — `© 2026 Andrés Largo · Bogotá D.C.` / `FullStack developer in search of beyond`.

---

## Interactions & Behavior
- **Scroll:** Lenis smooth scroll; hero fades/recedes (`yPercent:-14, opacity:0`) over the first 55% of the track (scrub); camera flies through the graph across the whole track.
- **Mouse:** name parallax + 3D group parallax + node attraction (all via the rAF loop; smoothed with lerp ~0.05).
- **Hover:** nav links, experience rows (translateX + tint), work figures (lift + border), skill clusters (dim others), links (padding shift), buttons (fill).
- **Reveals:** IntersectionObserver adds `.al-in` (opacity/translateY transition .95s) with geometry-scan + 2.6s safety fallback.
- **Micro-interactions:** transform/opacity only, <300ms, cubic-bezier(.16,1,.3,1).
- **i18n:** EN/ES toggle rewrites all `[data-i18n]` text + `[data-i18n-ph]` placeholders; the 3D scene is untouched. In Next.js use next-intl message catalogs keyed like the prototype's `T` object.
- **Reduced motion:** no grain animation, no mask/stagger intros (content visible), list fallback for skills, static/absent 3D.

## State Management
- `locale: 'en' | 'es'` (next-intl handles this via routing).
- 3D refs: renderer/scene/camera/geometry buffers, `progress` (0–1 from ScrollTrigger), smoothed mouse `{x,y}` — in R3F these live in refs + `useFrame`.
- Reveal state via `useInView`. Form state: name/email/message (uncontrolled or RHF).
- Singleton guard for the rAF/scene so hot-reload/remount never stacks canvases (the prototype tore down a prior instance on mount — R3F's `<Canvas>` unmount handles this, but guard the Lenis/ScrollTrigger singletons).

## Design Tokens
```
--bg:      #060507      /* near-black canvas */
--bg2:     #0a0c0e
--bg3:     #0e1417
--fg:      #e9eef0
--muted:   #727f85
--faint:   #3a4247
--accent:  #42e6dd      /* cold technical cyan (single sharp accent) */
--accent-2:#8ff6ef
--line:    rgba(66,230,221,.14)
body text (dim): #97a0a4 / #aeb7bb / #c3cccf
hairline: rgba(255,255,255,.08–.12)
hover tint: rgba(66,230,221,.045)
```
- **Type families:** Display = **Clash Display** (Fontshare) — weights 200/300/400/500; Editorial = **Instrument Serif** italic (Google); Mono = **JetBrains Mono** (Google) 300/400/500. Use extreme weight/size contrast (200 vs 500; 3×+ size jumps).
- **Spacing / rhythm:** section padding `clamp(60px,10vh,120px)` top / `clamp(120px,18vh,200px)` bottom, gutters `clamp(20px,4vw,58px)`; max content width 1360px.
- **Radius:** none (sharp, technical). **Borders:** 1px hairlines. **Grain:** SVG `feTurbulence` fractalNoise baseFrequency 0.85, `mix-blend-mode:overlay`, opacity ~0.075 (tweakable), animated via `steps()` translate keyframes.
- **Easing:** `cubic-bezier(.16,1,.3,1)` (expo-out feel) for reveals/hover; `ease-none` for scrubbed scroll tweens.

## Assets
- **Fonts:** Clash Display via `https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700`; Instrument Serif + JetBrains Mono via Google Fonts. In Next.js prefer `next/font` (self-host Clash from Fontshare download; the real client fonts are **PP Neue Montreal** + **PP Editorial New** — swap in if licensed).
- **Images:** project screenshots are user-provided (drop zones in the prototype). No decorative imagery is generated — all depth is procedural (3D + gradients + grain).
- **Icons:** none required (mono glyphs `↗`, block caret only).
- **No logo file**; brand is set in type (`A—L` monogram).

## Files
- `Andres Largo.dc.html` — the full prototype (all sections, 3D scene, shaders, GSAP/Lenis/IO wiring, EN/ES `T` dictionary). This is the reference to read for exact geometry, shader code, timings, and copy.
- `image-slot.js` — the user-fillable image placeholder web component used in Selected Work (replace with real `<img>`/`next/image` + provided screenshots).

> Note: the prototype is authored as a single streaming component with inline styles for instant paint. In Next.js, decompose into `Nav`, `Hero`, `SystemGraph` (R3F), `About`, `Experience`, `SelectedWork`, `SkillsConstellation`, `Contact`, `ContactForm`, plus a `LenisProvider` and a `useReveal` hook. Move the `T` object to next-intl `messages/en.json` + `messages/es.json`.
