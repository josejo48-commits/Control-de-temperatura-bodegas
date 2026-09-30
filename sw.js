// Service worker — Control de temperatura bodegas
// Estrategia: primero internet (siempre la versión más nueva de GitHub),
// y si no hay señal, usa la copia guardada (funciona offline).
// Para forzar actualización en el futuro basta con cambiar este número.
const CACHE = 'temp-bodegas-v3';

self.addEventListener('install', e => {
  self.skipWaiting(); // activa la versión nueva de inmediato
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))) // borra cachés viejas
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  // Solo archivos propios de la app (no toca Firebase ni otros servidores)
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    fetch(req, { cache: 'no-store' })
      .then(res => {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put(req, copia));
        return res;
      })
      .catch(() => caches.match(req)) // sin internet: versión guardada
  );
});
