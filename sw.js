const CACHE_NAME = 'faro-cache-v2';   // Cambia la versión cuando actualices la app

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  // Agrega aquí iconos cuando los tengas
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  console.log('Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto, agregando archivos...');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve del cache si existe, sino va a la red
        return response || fetch(event.request);
      })
  );
});

// Limpieza de caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
