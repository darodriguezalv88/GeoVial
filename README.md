# GeoVial — actualización de diseño (Next.js / Tailwind)

Este paquete contiene el código fuente **listo para copiar sobre tu repo**
`GeoVialWeb`, con el mismo stack (Next.js App Router + Tailwind v4) y la
**misma funcionalidad** (rutas, formulario de licencia, API, Prisma) —
solo se actualizó el diseño visual, aplicando la paleta y tipografía de la
identidad I.C. Diego Rodríguez (navy / azul civil / verde eco, Poppins +
Source Sans 3 + IBM Plex Mono).

## Cómo instalar

Copia estas carpetas sobre las mismas rutas en tu proyecto local
`C:\Users\darod\source\repos\GeoVialWeb`, reemplazando los archivos
existentes:

```
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx
src/app/descarga/page.tsx
src/app/licencia/page.tsx
src/app/licencia/LicenseForm.tsx
src/app/servicios/page.tsx        ← nuevo
src/components/Navbar.tsx
src/components/Footer.tsx
src/components/Logo.tsx
src/components/icons.tsx
src/components/McpVideoModal.tsx  ← nuevo (tarjeta MCP + modal + video)
public/images/hero-dusk.png       ← nuevo
public/images/gis-analisis.png    ← nuevo
```

Además, coloca tu video en:

```
public/videos/mcp-demo.mp4
```

(ya lo copiaste ahí según lo último que me confirmaste — si no, es la ruta
que espera `McpVideoModal.tsx`).

**No se tocan** `src/app/api/**`, `src/lib/**` ni `prisma/**` — la lógica de
licencias, activaciones y base de datos sigue exactamente igual.

Después de copiar:

```bash
npm run dev
```

## Qué cambió

- **Hero de inicio**: ahora es una foto a sangre completa (atardecer, puente
  atirantado, autopista, tren de carga, buque y ciudad encendiéndose), con
  degradados para legibilidad y pequeños destellos animados (CSS) que dan
  sensación de movimiento en la autopista, el tren, el buque y las luces de
  la ciudad.
- **Ficha técnica** movida al final de la página de inicio, como banda oscura.
- **Nueva sección "Análisis geoespacial"** con foto satelital de apoyo.
- **Nueva pestaña /servicios**: levantamientos fotogramétricos con dron
  (metodología de 4 pasos + entregables: ortomosaico, DEM/DTM, nube de
  puntos, modelo 3D).
- **Tarjeta "Servidor MCP embebido" (8ª tarjeta de Capacidades) ahora es
  clicable**: abre un modal con tu video (`/videos/mcp-demo.mp4`, reproducción
  nativa con audio). Al terminar el video aparece una cortinilla de cierre con
  la marca GeoVial y un botón "Ver de nuevo".
- Paleta, tipografía y componentes (tarjetas, botones, badges) unificados
  con la identidad de marca en `globals.css` (variables `--color-*` +
  `@theme inline`, generan utilidades Tailwind como `bg-navy-700`,
  `text-blue-600`, `font-display`, etc.).

## Pendiente / notas

- Las imágenes del hero y de análisis geoespacial son **generadas por IA**
  (no son fotos reales del corredor). Reemplázalas cuando tengas material
  propio en `public/images/`.
- En `/servicios`, los 4 entregables (ortomosaico, DEM, nube de puntos,
  modelo 3D) usan placeholders con ícono — no se pudieron generar imágenes
  de muestra por límite de créditos al momento de construir esto. Puedes
  añadir capturas reales en `public/images/servicios/` y reemplazar el
  bloque de ícono por un `<Image>` en `src/app/servicios/page.tsx`.
- El botón "Solicitar cotización" de Servicios usa un `mailto:` a
  `contacto@geovial.app` — cámbialo por tu correo real o por un formulario
  si prefieres capturarlo en base de datos.
- `McpVideoModal.tsx` reproduce el `<video>` de forma nativa (con `autoPlay`
  al abrir el modal). Algunos navegadores bloquean el audio en autoplay si
  no viene de un clic real del usuario — como el modal solo se abre por un
  clic en la tarjeta, esto normalmente funciona; el atributo `controls`
  queda como respaldo por si el navegador lo bloquea igual.
- Corrigiendo el mismo bug de orden de `@import` que encontró Claude Code:
  en `globals.css`, el `@import` de Google Fonts va **antes** de
  `@import "tailwindcss"` (la spec de CSS exige que todo `@import` preceda
  cualquier otra regla).
