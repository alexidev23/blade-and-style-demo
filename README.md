# Blade & Style

Landing page de demostración para una barbería de autor en Córdoba. Incluye reserva online con
selector de servicio/barbero, secciones de servicios, equipo y testimonios, y metadatos SEO
completos (canonical, Open Graph, JSON-LD `HairSalon`, manifest, robots y sitemap).

> **Demo:** todos los datos comerciales (dirección, teléfono, redes, precios) son de ejemplo y
> viven en `src/lib/data/site.ts`. No provienen de un negocio real.

## Stack

- SvelteKit 3 + Svelte 5 (runes) + TypeScript
- Tailwind CSS v4 (`@theme` tokens en `src/routes/layout.css`)
- Vitest para pruebas unitarias
- pnpm como gestor de paquetes

## Scripts

```sh
pnpm dev        # servidor de desarrollo
pnpm build      # build de producción
pnpm preview    # preview del build
pnpm test       # Vitest (una pasada)
pnpm check      # svelte-check + sync
pnpm lint       # Prettier + ESLint
pnpm format     # Prettier --write
```

## Estructura

```
src/
	routes/
		+layout.svelte        # fuentes, estilos globales, head SEO y JSON-LD
		+page.svelte          # landing
		robots.txt/+server.ts # robots prerenderizado
		sitemap.xml/+server.ts# sitemap prerenderizado
	env.ts                  # variables de entorno tipadas
	lib/
		components/           # secciones, UI y pasos del modal
		data/                 # site.ts, servicios, barberos, testimonios
		types.ts
	utils/                  # lógica de reserva y formateo
static/                   # íconos, manifest, assets
odd/tasks/                # documento de la feature de hardening
```

## Despliegue en Vercel

El proyecto usa `@sveltejs/adapter-auto`, que detecta Vercel automáticamente. No hace falta
cambiar el adaptador.

1. Importá el repositorio en Vercel (framework preset: SvelteKit).
2. Build command: `pnpm build`. Install command: `pnpm install`.
3. Definí `PUBLIC_SITE_URL` con el origen final del sitio (por ejemplo
   `https://blade-and-style-demo.vercel.app`), sin barra final. Se usa para canonical, Open Graph,
   `robots.txt` y `sitemap.xml`. Si no se define, se usa el origen de demo como fallback.
4. Desplegá. Los endpoints `robots.txt` y `sitemap.xml` se prerenderizan en el build.

## Variables de entorno

| Variable          | Pública | Default                                   | Uso                                         |
| ----------------- | ------- | ----------------------------------------- | ------------------------------------------- |
| `PUBLIC_SITE_URL` | Sí      | `https://blade-and-style-demo.vercel.app` | Origen canónico para SEO, robots y sitemap. |

En desarrollo local podés exportarla en la shell (`PUBLIC_SITE_URL=http://localhost:5173 pnpm dev`)
o crear un `.env` propio (ignorado por git) con `PUBLIC_SITE_URL=...`.
