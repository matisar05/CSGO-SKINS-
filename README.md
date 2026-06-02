# CS2 Weapons Catalog

Catalogo interactivo de las 34 armas del Counter-Strike 2 con stats, skins y sonidos.

## Requisitos

- Node.js 18+
- Expo Go (en el celular, para la funcionalidad shake)

## Instalacion

```bash
npm install
cd app-expo && npm install && cd ..
```

## Levantar el proyecto

### Web (PC y mobile browser)

```bash
npm run dev -- --host
```

Abrir en el navegador `http://localhost:5173` (PC) o la IP que muestra (celular, misma WiFi).

### Mobile con shake nativo (Expo Go)

Un solo comando levanta ambas cosas:

```bash
npm run dev:all
```

1. Actualizar `SVELTEKIT_URL` en `app-expo/App.js` con la IP que muestra el log amarillo de SvelteKit
2. El QR de Expo aparece en la terminal o en `http://localhost:8081`
3. Escanear con Expo Go, navegar a un arma, tocar "Activar shake", agitar

### Imagenes de armas

```bash
npm run images
```

Descarga las 34 imagenes default desde `cdn.cstrike.app` a `static/weapons/`. Solo necesario la primera vez.

### Sonidos

Los archivos `.wav`/`.mp3` deben colocarse en `static/sounds/` con el formato `{slug}-draw.wav` y `{slug}-shoot.wav`.
