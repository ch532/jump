const CACHE_NAME = 'pro-media-v1';
const ASSETS_TO_CACHE = ['/', '/index.html'];

// 1. Install Event: Cache essential shell assets
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting()) // Forces immediate activation
    );
});

// 2. Activate Event: Clean up old caches if the version name changes
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// 3. Fetch Event: Safe Network-First fallback strategy
self.addEventListener('fetch', (e) => {
    // Only intercept standard HTTP/HTTPS requests (ignores browser extensions)
    if (!e.request.url.startsWith(self.location.origin)) return;

    e.respondWith(
        fetch(e.request)
            .then((networkResponse) => {
                // If network succeeds, dynamically update the cache for next offline use
                if (networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // If network fails (offline), serve from cache
                return caches.match(e.request);
            })
    );
});
