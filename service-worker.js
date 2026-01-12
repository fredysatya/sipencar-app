const CACHE_NAME = "sipencar-cache-v2"; // versi baru
const ASSETS = [
  "/sipencar-app/",
  "/sipencar-app/index.html",
  "/sipencar-app/manifest.json",
  "/sipencar-app/LogoSipencar-192.png",
  "/sipencar-app/LogoSipencar-512.png",
  // tambahkan CSS / JS kamu di sini
];

// Install event
self.addEventListener("install", event => {
  self.skipWaiting(); // langsung aktifkan SW baru
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate event: hapus cache lama
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // pastikan SW baru mengontrol semua tab
});

// Fetch event
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
