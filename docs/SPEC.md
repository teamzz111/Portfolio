# Plan — Portfolio Andrés Largo (Next.js 15, static export en Amplify)

## Context

El repo hoy solo contiene una página de mantenimiento (`index.html`). El design handoff en `design_handoff_andres_portfolio/` (README.md + prototipo funcional `Andres Largo.dc.html` + `image-slot.js`) define un portfolio one-page cinematográfico para Andrés Largo: hero 3D "living system graph" (nodos/aristas/flujos que reaccionan a mouse y scroll), scrollytelling (About, Experience, Selected Work, Skills constellation, Contact + form), EN/ES. El prototipo es la fuente de verdad de geometría, shaders, timings y copy — se debe **recrear** en el stack de producción, no copiar.

**Decisiones tomadas con el usuario:**
- Deploy: **AWS Amplify capa gratuita → sitio 100% estático** (`output:'export'`, next-intl SIN middleware, redirect `/` → `/en/` con reglas de Amplify).
- Proyecto en el **root del repo** (se elimina el `index.html` de mantenimiento; el handoff se conserva como referencia).
- Formulario de contacto: **`mailto:`** (sin backend).

**Fuentes de verdad (leer durante implementación):**
- `design_handoff_andres_portfolio/README.md` — spec completa: tokens, motion architecture, secciones, performance.
- `design_handoff_andres_portfolio/Andres Largo.dc.html` — GLSL exacto (líneas 930–941 y 980–986), escena 3D (879–1062), diccionario `T` EN/ES (754–841), skills viz (1141–1288).

## Stack y versiones

| Paquete | Versión | Nota |
|---|---|---|
| next | ^15.5 | App Router, `output:'export'`, `trailingSlash:true`, `images.unoptimized` |
| react / react-dom | ^19 | requerido por R3F v9 |
| @react-three/fiber | ^9 | línea React 19 (v8 no sirve) |
| @react-three/drei | ^10 | usar poco; quitar si queda sin uso |
| three | ^0.180 | APIs usadas son estables; usar `<Canvas flat>` (NoToneMapping) para que el cian aditivo coincida con el prototipo |
| gsap + @gsap/react | ^3.13 / ^2 | `useGSAP` = patrón useLayoutEffect + gsap.context del README |
| lenis | ^1.3 | paquete `lenis` (no @studio-freight) |
| motion | ^12 | solo micro-interacciones que CSS no cubra; la mayoría de hovers quedan en Tailwind |
| next-intl | ^4 | static export sin middleware: `[locale]` + `generateStaticParams` + `setRequestLocale` |
| tailwindcss | ^4 | `@theme` CSS-first mapea 1:1 los tokens del README |

Sin zustand (singleton mutable basta), sin react-hook-form (3 campos uncontrolled).

## Estructura de archivos

```
Portfolio/
├─ amplify.yml                       # build spec estático (artifacts: out/)
├─ next.config.ts                    # output:'export', trailingSlash, images.unoptimized, plugin next-intl
├─ messages/{en,es}.json             # port del objeto T del prototipo, anidado por sección
├─ public/images/work/               # screenshots (cliente los provee; placeholders mientras)
└─ src/
   ├─ app/globals.css                # tokens, grain/vignette, keyframes (grain, blink, cue, riseLine, fadeUp), clases reveal, reduced-motion
   ├─ app/[locale]/layout.tsx        # generateStaticParams(en,es), setRequestLocale, fonts, NextIntlClientProvider, LenisProvider, Atmosphere, Nav
   ├─ app/[locale]/page.tsx          # Hero → track 170vh → About → Experience → SelectedWork → Skills → Contact
   ├─ i18n/request.ts                # getRequestConfig con fallback 'en' (SIN middleware.ts)
   ├─ fonts/index.ts + clash-display/*.woff2  # next/font: localFont Clash Display (200–500) + Instrument Serif + JetBrains Mono (google)
   ├─ components/
   │  ├─ Atmosphere.tsx              # 4 capas fixed: gradiente z0, slot canvas z2, vignette z5, grain z6 (aria-hidden, pointer-events-none)
   │  ├─ Nav.tsx                     # fixed z20, lenis.scrollTo, dot disponibilidad, toggle EN/ES (Link a /en|/es)
   │  ├─ Hero.tsx                    # overlay fixed z10 + track 170vh + ScrollTriggers (progress + recede)
   │  ├─ SystemGraphLoader.tsx       # next/dynamic(ssr:false) + gates WebGL/reduced-motion → poster CSS
   │  ├─ SystemGraph.tsx             # <Canvas frameloop="never" flat> + port de renderFrame() en useFrame
   │  ├─ About.tsx / Experience.tsx / SelectedWork.tsx / Contact.tsx / ContactForm.tsx
   │  ├─ SkillsConstellation.tsx     # SVG viz imperativa (rAF gated por IO + ResizeObserver, hover dim)
   │  ├─ SkillsList.tsx              # fallback lista (render por defecto SSR; requerido <760px / reduced-motion)
   │  └─ Reveal.tsx                  # wrapper de useReveal
   ├─ hooks/useReveal.ts             # IO + geometry-scan + safety timeout 2.6s; sin JS = visible
   ├─ hooks/useMediaFlags.ts         # reduced-motion + mobile (<760), SSR-safe
   ├─ providers/LenisProvider.tsx    # ÚNICO rAF: lenis.raf → lerps → callbacks → motionState.advance
   └─ lib/
      ├─ motion-state.ts             # singleton mutable {progress, smoothProgress, mouse, advance, onFrame} — cero re-renders
      ├─ graph.ts                    # buildGraph(mobile): clusters, buffers, aristas vecino-cercano, flows (port puro)
      ├─ shaders.ts                  # GLSL de nodos y flows, literal del prototipo
      ├─ skills-data.ts              # 6 categorías + skills
      └─ content.ts                  # contenido no traducible: empresas, años, stacks, links
```

## Soluciones a las partes difíciles

- **(a) Progress compartido sin re-renders:** singleton mutable en `lib/motion-state.ts`. ScrollTrigger `onUpdate` escribe `progress`; el rAF hace lerp de `smoothProgress` (0.06) y mouse (0.05); `useFrame` lee.
- **(b) Un solo rAF:** LenisProvider es el dueño. Canvas con `frameloop="never"`; SystemGraph registra `motionState.advance = (ms) => advance(ms/1000, true)` (de `useThree(s=>s.advance)`, toma **segundos**). Si el canvas no está montado, el loop sigue moviendo Lenis + parallax. Nunca usar gsap.ticker para esto.
- **(c) Lenis + ScrollTrigger:** creados una vez en `useLayoutEffect`; `lenis.on('scroll', ScrollTrigger.update)`; `ScrollTrigger.refresh()` tras `document.fonts.ready` (las alturas de las máscaras del nombre dependen de las fuentes). Triggers por sección con `useGSAP({scope})`. Strict-mode: cleanup simétrico (no globals `window.__AL_*`).
- **(d) next-intl estático:** sin middleware ni navigation APIs; toggle de idioma = `next/link` a la ruta hermana. `/` no existe en el export → regla de redirect de Amplify. `trailingSlash:true` hace que `/es/` sea un index real.
- **(e) Shaders:** `THREE.ShaderMaterial` crudo (no drei), GLSL literal en `lib/shaders.ts`, geometrías/materiales en `useMemo` keyed por `mobile`, mutación imperativa en `useFrame` (`needsUpdate`, `uTime`). `uPR` desde `gl.getPixelRatio()`.
- **(f) Atmósfera:** CSS puro en un server component tonto; el grain usa el data-URI feTurbulence exacto + keyframes `steps(4)`; apagado por media query reduced-motion. Es a la vez el poster fallback sin JS/WebGL.

## Qué NO portar del prototipo

- `support.js`, `<x-dc>`, `DCLogic`, panel de props → hardcodear: accent `#42e6dd`, grain `0.075`, multiplicador motion `4/7`.
- `style-hover="..."` → variantes `hover:` de Tailwind.
- `image-slot.js` → placeholder enmarcado ahora, `next/image` (unoptimized) cuando lleguen screenshots.
- `data-i18n` + `paint()` → next-intl.
- CDN unpkg → imports npm con code splitting.
- Bug de `dt` (siempre 0.016) → `delta` real clamp 0.05 en `useFrame` (verificar visualmente velocidad de flows).

## Fases de implementación (cada una verificable)

0. **Scaffold**: borrar `index.html`, `create-next-app` (TS, Tailwind v4, src dir), config export estático. ✔ `npm run build` emite `out/`.
1. **Tokens + fuentes**: descargar Clash Display woff2 de Fontshare, `next/font`, tokens del README en globals.css. ✔ specimen renderiza las 3 familias/pesos.
2. **next-intl estático + port de mensajes**: `T` → `messages/{en,es}.json`. ✔ build emite `out/en/` y `out/es/`.
3. **Atmosphere + Nav + Hero estático**: capas fixed, intro CSS (mask-rise/fadeUp con stagger). ✔ comparación visual con el prototipo; con JS deshabilitado todo visible.
4. **Motion core**: motion-state, LenisProvider (rAF único), ScrollTriggers del hero (progress + recede 55%), parallax del nombre. ✔ scroll suave, hero recede, progress 0→1; reduced-motion → scroll nativo.
5. **SystemGraph R3F**: port de graph.ts/shaders.ts/useFrame, loader lazy con gates. ✔ side-by-side con el prototipo (densidad, breathing, flows, atracción, fly-through); ~60fps; sin WebGL → poster sin errores; three en chunk propio.
6. **Secciones + reveals**: useReveal, About (gradiente de hand-off), Experience (7 filas, ghost years, hover), SelectedWork (4 proyectos alternados, placeholders). ✔ copy exacto en ambos idiomas; nada atascado en opacity:0.
7. **Skills**: lista SSR por defecto, constelación SVG swap-in ≥760px && motion OK, rAF gated. ✔ breathing solo en viewport; hover dim; narrow/reduced → lista.
8. **Contact + form**: mailto compose + línea de confirmación `formSent`. ✔ abre cliente de correo con subject/body correctos en ambos locales.
9. **A11y / reduced-motion / i18n audit**: matriz completa reduced-motion, landmarks, aria-hidden decorativos, focus-visible, skip link, contraste (revisar #727f85 sobre #060507). ✔ axe limpio; tab order sano.
10. **Performance**: bundle analyzer, DPR adaptativo móvil, Lighthouse sobre `out/` servido (Perf ≥90 móvil). ✔ LCP = nombre del hero sin FOUT que rompa la intro.
11. **Amplify**: `amplify.yml` (baseDirectory `out`), reglas de redirect:
    ```json
    [
      { "source": "/",    "target": "/en/", "status": "302" },
      { "source": "/en",  "target": "/en/", "status": "301" },
      { "source": "/es",  "target": "/es/", "status": "301" },
      { "source": "/<*>", "target": "/404.html", "status": "404" }
    ]
    ```
    ✔ deploy: `/` → `/en/`, `/es/` carga español, ruta basura → 404.

## Verificación end-to-end

- `npm run build && npx serve out` en cada fase relevante; comparar visualmente contra `Andres Largo.dc.html` abierto en el navegador.
- Probar: scroll completo EN y ES, toggle de idioma, reduced-motion (emulación DevTools + OS), JS deshabilitado (contenido visible), móvil emulado (nodos 84, DPR 1.5, antialias off, skills lista), form mailto.
- Pendiente del cliente: screenshots reales para los 4 proyectos (mientras tanto, placeholders enmarcados).
