const CACHE_NAME = "sipencar-cache-v1";
const ASSETS = [
  "./index.html",
  "./manifest.json",
  "./LogoSipencar-192.png",
  "./LogoSipencar-512.png",
  "./LogoSipencar.png",
  // tambahkan CSS/JS jika ada
];

// Install SW & cache semua aset
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate SW & bersihkan cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Fetch dari cache, fallback ke network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
