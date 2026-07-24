# Task plan — Portfolio Andrés Largo

Spec: `docs/SPEC.md`. Prototipo de referencia: `design_handoff_andres_portfolio/`.
Ejecución en orden (cada tarea depende de la anterior salvo nota). Una tarea = un commit.

## T0 — Scaffold Next.js 15 static export — [x]
Borrar `index.html` (mantenimiento). Scaffold manual en el root: package.json (next ^15.5, react ^19, TS ^5, tailwind ^4), tsconfig, next.config.ts (`output:'export'`, `trailingSlash:true`, `images.unoptimized`), postcss, .gitignore, src/app mínimo, vitest + @testing-library/react configurados.
**AC:** `npm run build` emite `out/` con HTML estático; `npm test` corre (smoke test verde).

## T1 — Tokens + fuentes — [x]
Clash Display woff2 self-hosted (Fontshare) via `next/font/local`; Instrument Serif + JetBrains Mono via `next/font/google`. Tokens del README en `globals.css` (colores, easing, hairlines, container 1360px, keyframes base).
**AC:** build OK; página specimen temporal muestra 3 familias con pesos 200/300/400/500; test: CSS vars presentes en globals.css.

## T2 — next-intl estático + mensajes — [x]
`src/i18n/request.ts` (sin middleware), `app/[locale]/layout.tsx` con `generateStaticParams` + `setRequestLocale`, port completo del objeto `T` (prototipo líneas 754–841) a `messages/en.json` + `messages/es.json` anidado por sección.
**AC:** build emite `out/en/index.html` y `out/es/index.html` con `lang` correcto; test RED→GREEN: en.json y es.json tienen conjuntos de claves idénticos y no vacíos.

## T3 — Atmosphere + Nav + Hero estático — [x]
Capas fixed (gradiente z0, slot z2, vignette z5, grain z6 con feTurbulence + steps(4)), Nav fixed z20 (monograma, links centro ocultos <820px, dot, toggle EN/ES como Links), Hero overlay z10 (eyebrow+beyond serif, nombre enmascarado con riseLine, role+caret, location, idx, cue) + track 170vh.
**AC:** render de ambos locales con copy exacto; intro CSS con stagger; reduced-motion desactiva animaciones (CSS); test: componentes renderizan textos clave de messages.

## T4 — Motion core (Lenis + rAF único + ScrollTrigger) — [x]
`lib/motion-state.ts` singleton, `LenisProvider` (dueño del único rAF: lenis.raf → lerps → onFrame → advance), `lenis.on('scroll', ScrollTrigger.update)`, refresh tras fonts.ready, ScrollTriggers del hero (progress scrub + recede 55% con `gsap.matchMedia`), mousemove → parallax nombre (callback onFrame).
**AC:** test unit: lerp de smoothProgress/mouse en motion-state; build OK; verificación manual: scroll suave, hero recede, progress 0→1.

## T5 — SystemGraph R3F — [x]
`lib/graph.ts` (port puro: 6 clusters, N=132/84, aristas 2–3 vecinos i<j, flows 58/34), `lib/shaders.ts` (GLSL literal), `SystemGraph.tsx` (`<Canvas frameloop="never" flat>`, useFrame = port de renderFrame con delta real clamp 0.05, registra advance), `SystemGraphLoader` (dynamic ssr:false + gates WebGL/reduced-motion).
**AC:** tests unit de graph.ts (conteos de nodos/aristas/flows, dedupe, clusters); build OK con three en chunk aparte; verificación manual side-by-side con prototipo.

## T6 — Secciones + reveals (About, Experience, SelectedWork) — [x]
`useReveal` (IO + geometry-scan + safety 2.6s; sin JS visible), `Reveal.tsx`, About (ledger 3 stats + statement + gradiente hand-off), Experience (7 filas de content.ts+messages, ghost years, hover), SelectedWork (4 proyectos alternados con placeholders 16:10, overlay /0N).
**AC:** tests: render con copy EN y ES exacto del prototipo; content.ts consistente (7 exp, 4 proyectos); build OK.

## T7 — Skills constellation + fallback — [x]
`skills-data.ts`, `SkillsList` (render por defecto/SSR), `SkillsConstellation` (SVG imperativa: layout ellipse del prototipo, rAF gated por IO, ResizeObserver, hover dim 0.2/0.12), swap ≥760px && !reduced.
**AC:** tests: skills-data (6 categorías, skills correctos), layout puro (hubs en ellipse, anchors por lado); build OK.

## T8 — Contact + ContactForm — [ ]
Contact (glow radial, headline serif, email link, cards LinkedIn/GitHub, footer), ContactForm (uncontrolled, mailto compose con subject/body codificados, confirmación formSent).
**AC:** test unit RED→GREEN de `buildMailto(name,email,msg)`; test render en ambos locales; build OK.

## T9 — A11y / reduced-motion audit — [ ]
Landmarks, aria-hidden en decorativos (atmósfera, ghost years, caret), skip link, focus-visible, hreflang/aria-current en toggle, matriz reduced-motion completa.
**AC:** revisión manual con emulación; tests de atributos aria clave; build OK.

## T10 — Performance pass — [ ]
Verificar code-split (three/R3F lazy), DPR adaptativo, will-change solo en grain, sin FOUT que rompa la intro (next/font preload).
**AC:** build production; inspección de chunks en salida de build; notas de Lighthouse para el usuario.

## T11 — Amplify config — [ ]
`amplify.yml` (baseDirectory `out`), documentar reglas de redirect en `docs/DEPLOY.md` (/ → /en/ 302, /en → /en/ 301, /es → /es/ 301, /<*> → 404).
**AC:** amplify.yml válido; DEPLOY.md con las reglas JSON listas para pegar en la consola.
