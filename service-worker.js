const CACHE_NAME = 'sipencar-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './LogoSipencar.png',
  './LogoSipencar-180.png',
  './service-worker.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => { if(key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        // fallback jika offline
        if(event.request.destination === 'document'){
          return caches.match('./index.html');
        }
      })
  );
});
