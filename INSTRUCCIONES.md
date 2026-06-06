# Instrucciones para convertir tu app en PWA real

## Estructura de archivos en GitHub

Tu repositorio debe tener esta estructura:
```
Control-de-temperatura-bodegas/
├── index.html           ← tu archivo ingreso.html renombrado
├── manifest.json        ← el archivo que te damos aquí
├── sw.js                ← el service worker que te damos aquí
└── icons/
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## En tu index.html, agrega en el <head>:

```html
<!-- Manifest para PWA -->
<link rel="manifest" href="/Control-de-temperatura-bodegas/manifest.json">

<!-- Ícono para iOS -->
<link rel="apple-touch-icon" href="/Control-de-temperatura-bodegas/icons/icon-192x192.png">

<!-- Metadatos PWA -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Temp Bodegas">
<meta name="theme-color" content="#0f2d4a">
```

## El script del service worker (al final del <body>):

```html
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Control-de-temperatura-bodegas/sw.js', {
      scope: '/Control-de-temperatura-bodegas/'
    }).then(reg => console.log('SW registrado'))
      .catch(err => console.log('Error SW:', err));
  });
}
</script>
```

## Para que funcione como APP (no solo acceso directo):

### En Android (Chrome):
1. Abre la web en Chrome
2. Espera que aparezca el banner "Agregar a pantalla de inicio"
   O ve al menú ⋮ → "Instalar aplicación"
3. ¡Listo! Se instala como app real

### En iOS (Safari):
1. Abre la web en Safari
2. Toca el botón Compartir (cuadrado con flecha)
3. "Agregar a pantalla de inicio"

## Requisitos para que aparezca el botón de instalar:
- Debe ser HTTPS (GitHub Pages lo da automáticamente ✓)
- Debe tener manifest.json con íconos de al menos 192x192 y 512x512 ✓
- Debe tener service worker registrado ✓
