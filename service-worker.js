const CACHE_NAME = "sipencar-cache-v2"; // ganti versi cache
const ASSETS = [
  "/sipencar-app/",
  "/sipencar-app/index.html",
  "/sipencar-app/manifest.json",
  "/sipencar-app/icon-192.png",
  "/sipencar-app/icon-512.png",
  // tambahkan CSS / JS kamu di sini
];

self.addEventListener("install", event => {
  self.skipWaiting(); // Paksa service worker baru aktif
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  clients.claim(); // kontrol halaman langsung
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
