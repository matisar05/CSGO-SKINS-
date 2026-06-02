# CS2 Weapons Catalog — Demo con SvelteKit + SteamAnalyst API

## ¿Qué es SvelteKit?

SvelteKit es un **framework full-stack** para construir aplicaciones web. A diferencia de React (que es solo una librería de UI), SvelteKit incluye enrutamiento, renderizado del lado del servidor (SSR), carga de datos y manejo de formularios en un solo paquete. Está construido sobre **Svelte**, un compilador que convierte componentes en JavaScript vanilla optimizado durante el build en lugar de usar un Virtual DOM en runtime.

### Características clave

| Característica | Descripción |
|----------------|-------------|
| **File-based routing** | Las rutas se definen por la estructura de carpetas en `src/routes/` |
| **SSR + CSR** | Renderizado híbrido: server-side para SEO y carga inicial, client-side para interactividad |
| **Server-only code** | Código en `$lib/server/` nunca se envía al cliente |
| **Load functions** | `+page.server.ts` carga datos del lado del servidor antes de renderizar |
| **Sin Virtual DOM** | Svelte compila a actualizaciones de DOM quirúrgicas, resultando en bundles más chicos |
| **TypeScript nativo** | Soporte completo sin configuración adicional |

---

## ¿Para qué sirve?

SvelteKit sirve para construir aplicaciones web que necesitan:
- **SEO** (renderizado del lado del servidor)
- **Performance** (hidratación progresiva, code splitting automático)
- **Backend integrado** (APIs, autenticación, acceso a bases de datos sin necesidad de un servidor aparte)
- **Navegación SPA-like** (client-side routing con precarga de datos)

En este proyecto lo usamos para una app de catálogo de armas de CS2 que consume una API externa de precios (SteamAnalyst) manteniendo la API key secreta del lado del servidor.

---

## ¿Qué problema intenta resolver?

### Fortalezas

| Fortaleza | Explicación |
|-----------|-------------|
| **DX (Developer Experience)** | Menos boilerplate que Next.js. Un componente es un solo archivo `.svelte` con HTML, CSS y JS. |
| **Bundle size** | Al compilar en lugar de interpretar, los bundles son ~30-50% más chicos que equivalentes en React. |
| **Reactividad simple** | `let count = $state(0)` y `{count}` en el template — se actualiza solo, sin hooks ni dependencias. |
| **Server-only por diseño** | `$lib/server/` bloquea imports desde el cliente a nivel de build. Imposible leakear secretos. |
| **Adapters** | `adapter-auto` detecta la plataforma (Vercel, Netlify, Node, Cloudflare) y optimiza el output. |
| **Precarga inteligente** | `data-sveltekit-preload-data="hover"` precarga la página al pasar el mouse sobre un link. |

### Debilidades

| Debilidad | Explicación |
|-----------|-------------|
| **Ecosistema más chico** | Menos librerías y componentes third-party que React. Para UI kits hay que buscar específicamente para Svelte. |
| **Comunidad menor** | Menos tutoriales, respuestas en Stack Overflow y developers disponibles para contratar. |
| **Curva de runas** | Svelte 5 introdujo "runas" (`$state`, `$props`, `$effect`) que rompen con la sintaxis legacy de Svelte 4. |
| **Sin React Native** | Para mobile nativo no hay equivalente. En este proyecto resolvemos el shake con la Web API `devicemotion`. |

---

## ¿Es utilizada/popular?

- **npm trends**: Svelte ~800k descargas semanales, SvelteKit ~500k (creciendo 40% interanual)
- **GitHub stars**: Svelte ~80k, SvelteKit ~19k
- **State of JS 2024**: Svelte es el framework con mayor **satisfacción** (89%) y el que más desarrolladores **quieren aprender**
- **Casos reales**: Apple Music web, Spotify (herramientas internas), New York Times, Square, 1Password

Comparado con React (el dominante absoluto con ~40M descargas semanales), Svelte es chico pero tiene la tasa de adopción más alta entre frameworks nuevos.

---

## ¿Qué otras herramientas son similares?

| Herramienta | Similitud | Diferencias |
|-------------|-----------|-------------|
| **Next.js (React)** | Full-stack, SSR, file-based routing | Usa React + Virtual DOM. Más maduro, más librerías, más pesado. |
| **Nuxt (Vue)** | Full-stack, SSR, file-based routing | Basado en Vue. Similar filosofía a SvelteKit pero con ecosistema Vue. |
| **Remix (React)** | Full-stack, enfocado en Web APIs estándar | Menos abstracción que Next.js. Usa `fetch` nativo y FormData. |
| **Astro** | Orientado a contenido, partial hydration | Ideal para sitios con poco JS. Permite usar Svelte/React/Vue como "islas". |
| **SolidStart (SolidJS)** | Full-stack con fine-grained reactivity | Similar a Svelte en filosofía (sin Virtual DOM) pero con sintaxis JSX. |

### ¿Cuál va ganando?

**Next.js domina en adopción** (~40M descargas semanales, respaldado por Vercel). Pero **SvelteKit lidera en satisfacción** de desarrolladores. Remix y SolidStart crecen rápido pero desde bases más chicas. Astro es el preferido para sitios de contenido (marketing, blogs, documentación).

La tendencia sugiere que el mercado se está fragmentando: Next.js para apps empresariales grandes, SvelteKit para equipos que priorizan DX y performance, Astro para contenido.

---

## ¿Es simple de aprender?

**Nuestra experiencia con SvelteKit en este proyecto:**

1. **Scaffold**: `npm create svelte@latest` en 30 segundos. Sin configuraciones manuales.
2. **Estructura de archivos**: Intuitiva. Sabés qué hace cada archivo por su nombre (`+page.svelte`, `+page.server.ts`, `+layout.svelte`).
3. **Load functions**: El concepto de separar `+page.server.ts` (datos del servidor) de `+page.svelte` (UI) se entiende rápido.
4. **Svelte 5 runas**: `$props()`, `$state()`, `$effect()` — llevan una hora acostumbrarse si venís de Svelte 4, pero son más explícitas.
5. **TypeScript**: Funciona out of the box. Tipar los retornos de `load` con `PageServerLoad` es directo.
6. **Protección de secretos**: `$env/static/private` + `$lib/server/` — el framework te fuerza a hacer lo correcto.

**Curva de aprendizaje**: Baja-media. Un developer con experiencia en React/Vue puede ser productivo en SvelteKit en 2-3 días. Lo más "distinto" es la reactividad por asignación (`count += 1` en lugar de `setCount(count + 1)`).

### ¿Nos interesa incorporarla en futuros desarrollos?

**Sí**, para proyectos donde:
- El equipo valora simplicidad sobre ecosistema masivo
- El SEO y la performance inicial son importantes
- Queremos evitar la complejidad de manejar un backend separado
- El proyecto no requiere un ecosistema enorme de librerías UI

---

## Arquitectura del proyecto

```
src/
├── app.css                          # Tema oscuro gaming, variables CSS, reset
├── app.d.ts                         # Tipos globales (App.Error)
├── app.html                         # HTML base con data-sveltekit-preload-data="hover"
├── lib/
│   ├── data/                        # Datos estáticos (pueden importarse desde cliente)
│   │   ├── weapons.ts               # 34 armas con stats + categorías (MxN)
│   │   ├── categories.ts            # 5 categorías con subcategorías
│   │   └── weapon-market-names.ts   # Mapeo slug → prefijo SteamAnalyst
│   ├── server/                      # Código server-only (NUNCA llega al cliente)
│   │   ├── cache.ts                 # Map en memoria con TTL de 1 hora
│   │   └── steam-analyst.ts         # Cliente HTTP para la API de SteamAnalyst
│   └── components/                  # Componentes reutilizables
│       ├── CategoryCard.svelte      # Tarjeta de categoría (home)
│       ├── WeaponCard.svelte        # Tarjeta de arma (listado)
│       ├── WeaponStats.svelte       # Tabla de stats + daño por hitbox
│       ├── SubcategoryFilter.svelte # Filtro de subcategorías
│       ├── Pagination.svelte        # Paginación genérica
│       ├── SkinCard.svelte          # Tarjeta de skin con precio
│       └── ShakeDetector.svelte     # Detector de shake + reproducción de audio
├── routes/
│   ├── +layout.svelte               # Layout raíz (header + nav + footer)
│   ├── +page.svelte                 # Home: grid de categorías
│   ├── +error.svelte                # Página de error 404/500
│   ├── categoria/[slug]/
│   │   ├── +page.server.ts          # Server load: filtra + pagina armas
│   │   └── +page.svelte             # UI: grid de WeaponCard + paginación
│   └── arma/[slug]/
│       ├── +page.server.ts          # Server load: stats + top 5 skins
│       └── +page.svelte             # UI: ficha completa + skins + shake
├── static/
│   ├── weapons/                     # 34 imágenes default de armas (.webp)
│   └── sounds/                      # 34 archivos de audio (.mp3)
├── scripts/
│   └── download-weapon-images.ts    # Script para descargar imágenes desde cdn.cstrike.app
└── .env                             # STEAMANALYST_API_KEY (nunca commiteado)
```

### Flujo de datos

```
Usuario → Browser → SvelteKit Server → SteamAnalyst API
                                          ↓
[Home]     categories.ts (estático)
[Categoría] weapons.ts → filtrar por categoría + subcategoría → paginar
[Arma]     weapons.ts → stats + getTopSkins() → cache → SteamAnalyst API → top 5 skins
```

---

## Modelo de datos

### Relación MxN: Categoría ↔ Arma

Cada arma pertenece a **varias categorías** y cada categoría contiene **varias armas**. Esto se modela con un array `categories` en cada arma:

```ts
// AK-47 pertenece a 3 categorías simultáneamente
{
  slug: 'ak-47',
  categories: ['rifles', 'asalto', 't']  // MxN
}
```

La categoría "Rifles" tiene todas las armas de asalto + sniper. Pero la AK-47 también está en "asalto" y en "Exclusivo T". Un usuario puede navegar desde cualquiera de estos filtros y llegar a la misma arma.

### Relación 1xN: Arma → Skin

Un arma tiene **muchas skins** (cientos en algunos casos). La API de SteamAnalyst devuelve todos los ítems del mercado. Filtramos por `market_name` que empieza con el nombre del arma (ej: `"AK-47 |"`) y tomamos las 5 más caras.

---

## Decisiones técnicas

| Decisión | Alternativa considerada | Por qué esta |
|----------|------------------------|--------------|
| **SvelteKit sobre Next.js** | Next.js (React) | Menos boilerplate, bundles más chicos, mejor DX para este tamaño de proyecto |
| **Server load sobre universal load** | `+page.ts` (universal) | La API key debe quedar en el servidor. `+page.server.ts` garantiza que nunca se envía al cliente |
| **$env/static/private sobre $env/dynamic/private** | Dynamic (runtime) | La API key no cambia entre deploys. Static es más seguro (inlined en build). |
| **Map con TTL sobre Redis** | Redis, file cache | Proyecto single-server, sin necesidad de cache distribuido. Map es O(1) y cero dependencias. |
| **devicemotion sobre Expo Accelerometer** | Expo (React Native) | No queremos agregar React Native a un proyecto SvelteKit. `devicemotion` funciona en todos los navegadores mobile modernos. |
| **@ianlucas/cs2-lib sobre Steam Web API** | Steam GetSchema API | La Steam API requiere key y tiene rate limits. `cs2-lib` tiene 44K imágenes precargadas en CDN. |
| **CSS vanilla sobre Tailwind** | Tailwind CSS | Para un proyecto de este tamaño, CSS con variables es más simple de entender y explicar en una presentación |
| **adapter-auto sobre adapter-node** | Node específico | Detecta la plataforma automáticamente. Funciona en dev, Vercel, Netlify o Node sin cambios. |

---

## Seguridad: ¿cómo protegemos la API key?

```
.env                          → STEAMANALYST_API_KEY=sa_live_...
$env/static/private           → Lee la key en build time, inyecta solo en server bundle
$lib/server/steam-analyst.ts  → Único archivo que toca la key
+page.server.ts               → Llama a steam-analyst.ts, devuelve solo datos limpios
+page.svelte                  → Recibe skins sin saber de dónde vinieron
```

SvelteKit **bloquea a nivel de build** cualquier intento de importar `$lib/server/` desde un `.svelte` o `+page.ts`. Si intentás, el build falla con un error claro.

La API key existe solo en:
1. El archivo `.env` (no commiteado)
2. El bundle del servidor en producción
3. La memoria del proceso Node.js

Nunca en:
- El bundle del cliente (JS enviado al navegador)
- El HTML renderizado
- Las respuestas de red

---

## Demo paso a paso (guión de exposición)

### 1. Home (`/`)
- Mostrar el grid con 5 categorías
- Cada categoría muestra: ícono, nombre, descripción, subcategorías y conteo de armas
- Explicar que los datos de categorías vienen de `categories.ts` (estático, sin API)

### 2. Categoría (`/categoria/rifles`)
- Mostrar el listado paginado de armas
- Señalar los filtros de subcategoría (Asalto / Francotirador)
- Cambiar de página para mostrar la paginación
- Hacer hover sobre una carta para mostrar `data-sveltekit-preload-data` en acción
- Explicar que el filtrado y paginación ocurren en el servidor (`+page.server.ts`)

### 3. Ficha del arma (`/arma/ak-47`)
- Mostrar la imagen del arma y los tags (precio, equipo, tipo)
- Scroll down a la tabla de stats generales (10 stats en grid)
- Mostrar la tabla de daño por hitbox con colores (rojo = letal, naranja = alto, verde = medio)
- Scroll down a las 5 skins más caras con precios de SteamAnalyst
- Explicar que esta data viene de la API externa, cacheada 1 hora en el servidor

### 4. Shake to shoot
- Agitar el celular para disparar el sonido del arma
- Explicar que usa la Web API `devicemotion` (sin Expo, sin apps nativas)
- Mostrar el mensaje "¡Disparo de AK-47!" que aparece con animación

### 5. Código (mostrar brevemente)
- `steam-analyst.ts`: cómo se protege la API key
- `+page.server.ts` de la ficha: cómo se cargan datos del servidor
- `ShakeDetector.svelte`: cómo funciona el acelerómetro nativo

---

## Setup y ejecución

```bash
# 1. Clonar e instalar
git clone <repo>
cd cs2-weapons
npm install

# 2. Configurar API key
# Crear .env con:  STEAMANALYST_API_KEY=tu_key

# 3. Descargar imágenes de armas (una sola vez)
npm run images

# 4. Copiar sonidos a static/sounds/
# (34 archivos .mp3 con nombres como ak-47.mp3, awp.mp3, etc.)

# 5. Development
npm run dev -- --host     # Abre en el celu con la IP que muestra

# 6. Producción
npm run build
npm run preview
```

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | SvelteKit 5 |
| UI | Svelte 5 (runes) |
| Lenguaje | TypeScript |
| Estilos | CSS vanilla con variables |
| Build | Vite 6 |
| API externa | SteamAnalyst API v2 |
| Imágenes | @ianlucas/cs2-lib + cdn.cstrike.app |
| Sonido | Web Audio API |
| Acelerómetro | DeviceMotion Web API |
| Deploy | adapter-auto (Vercel/Netlify/Node) |
