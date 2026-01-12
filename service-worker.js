const CACHE_NAME = "sipencar-cache-v1";

const ASSETS = [
  "/sipencar-app/",
  "/sipencar-app/index.html",
  "/sipencar-app/manifest.json",
  "/sipencar-app/icon-192.png",
  "/sipencar-app/icon-512.png",
  // tambahkan CSS / JS kamu di sini
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
