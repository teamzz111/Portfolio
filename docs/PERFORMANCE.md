# Performance notes

Estado tras el build de producción (`npm run build`, export estático en `out/`).

## Bundle / code-splitting

- **First Load JS: ~174 KB** (framework + next-intl + gsap/lenis + secciones).
- **three.js + React Three Fiber viven en chunks lazy** (~374 KB + ~351 KB) cargados
  solo vía `next/dynamic(ssr:false)` cuando pasa el gate de WebGL/reduced-motion.
  No bloquean el primer render ni se descargan en dispositivos sin WebGL.
- Sin CSS ni fuentes externas: Clash Display self-hosted, Instrument Serif y
  JetBrains Mono self-hosteadas por `next/font` en build (cero requests a
  Google/Fontshare en runtime).

## Fuentes

- Los subsets críticos se emiten como `*-s.p.woff2` (marcados para preload por
  next/font). El export estático de Next no inyecta los `<link rel="preload">`
  de fuentes en el HTML; con `font-display: swap` el texto pinta con fallback y
  `document.fonts.ready → ScrollTrigger.refresh()` recalcula las máscaras del
  hero al cargar, así el intro no se rompe.

## Runtime

- Un único rAF (LenisProvider) mueve Lenis + lerps + escena R3F
  (`frameloop="never"` + `advance`): sin loops duplicados.
- DPR adaptativo: cap 1.5 en móvil, 2 en desktop; antialias off en móvil;
  84 nodos / 34 flows en móvil vs 132 / 58 en desktop.
- `will-change: transform` solo en el grain y el overlay del hero.
- La constelación de skills anima solo mientras está en viewport
  (IntersectionObserver gate) mutando atributos SVG sin estado React.
- Reveals por IntersectionObserver + transiciones CSS (no timelines JS).

## Pendiente de verificación en dispositivo real

Correr Lighthouse contra el sitio servido (`npx serve out` o el dominio de
Amplify): objetivo Perf ≥ 90 móvil, 100 A11y/BP/SEO. Verificar 60fps del hero
en un dispositivo móvil de gama media (DevTools > Performance).
