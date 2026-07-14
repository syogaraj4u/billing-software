const CACHE_NAME = "billing-software-v151";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./desktop-view.css",
  "./mobile-view.css",
  "./app.js",
  "./cloud-config.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/logos/kala-nirvana-mark.jpg",
  "./assets/logos/kala-nirvana-wordmark.jpg"
];
const OPTIONAL_ASSETS = [
  "https://unpkg.com/lucide@latest/dist/umd/lucide.min.js",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
  "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all([
        cache.addAll(APP_ASSETS),
        Promise.allSettled(OPTIONAL_ASSETS.map(asset => cache.add(asset)))
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const isAppShell = event.request.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
  const isRuntimeAsset = url.origin === self.location.origin && /\.(?:js|css)$/.test(url.pathname);
  if (isAppShell || isRuntimeAsset) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request)
            || await caches.match(event.request, { ignoreSearch: true });
          if (cached) return cached;
          return isAppShell ? caches.match("./index.html") : Response.error();
        })
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
