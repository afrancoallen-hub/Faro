const CACHE_NAME = 'faro-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Agrega aquí otros archivos importantes si los tienes separados (css, js externos)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
