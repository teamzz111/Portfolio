# Deploy — AWS Amplify (hosting estático)

El sitio es un export 100% estático (`output: 'export'` → carpeta `out/`).
No requiere cómputo SSR: en Amplify se sirve como hosting puro (capa gratuita).

## 1. Conectar el repo

Amplify Console → **New app → Host web app** → GitHub → `teamzz111/Portfolio`,
rama `master`. Amplify detecta `amplify.yml` en el root (baseDirectory `out`).

## 1.b Node 20 en el build (obligatorio)

La imagen por defecto (Amazon Linux 2) trae Node 16 y su GLIBC no puede
ejecutar Node 20 (falla con `GLIBC_2.28 not found` aunque nvm lo instale).
Cambia la imagen en **App settings → Build settings → Build image settings**:

- Opción A: imagen **`Amazon Linux:2023`** (el preBuild usa nvm para fijar 20).
- Opción B: **Custom Build Image** → `public.ecr.aws/docker/library/node:20`.

Guarda y lanza un build nuevo (push o Redeploy después de guardar). El paso
`node -v` del log debe imprimir `v20.x` sin errores de GLIBC.

## 2. Rewrites & redirects (obligatorio)

El export no genera una página en `/` — solo `/en/` y `/es/`. En
**App settings → Rewrites and redirects → Open text editor**, pegar (el orden
importa):

```json
[
  { "source": "/", "target": "/en/", "status": "302" },
  { "source": "/en", "target": "/en/", "status": "301" },
  { "source": "/es", "target": "/es/", "status": "301" },
  { "source": "/<*>", "target": "/404.html", "status": "404-200" }
]
```

- `/` → `/en/` (locale por defecto).
- `/en` y `/es` sin slash → versión con slash (los archivos reales son
  `out/en/index.html`, `out/es/index.html` gracias a `trailingSlash: true`).
- Cualquier otra ruta sirve el `404.html` exportado por Next.

## 3. Verificación post-deploy

- `https://<dominio>/` redirige a `/en/` y carga el hero.
- `https://<dominio>/es/` carga la versión en español (deep link directo).
- Toggle EN/ES navega entre locales.
- Una ruta inexistente muestra el 404.
- El formulario abre el cliente de correo (mailto) sobre HTTPS.

## Pendientes del cliente

- Screenshots reales de los 4 proyectos → `public/images/work/` y reemplazar
  los placeholders de `SelectedWork.tsx` por `next/image` (unoptimized).
- Dominio custom (Amplify → Domain management) si aplica.
- Fuentes licenciadas PP Neue Montreal / PP Editorial New si se licencian
  (swap en `src/fonts/`).
