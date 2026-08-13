const CACHE_NAME = 'pro-media-v1';
const ASSETS_TO_CACHE = ['/', '/index.html'];

// =========================================================================
// 1. INSTALL EVENT: Cache essential shell assets
// =========================================================================
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting()) // Forces immediate activation
    );
});

// =========================================================================
// 2. ACTIVATE EVENT: Clean up old caches if the version name changes
// =========================================================================
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

// =========================================================================
// 3. FETCH EVENT: Safe Network-First fallback strategy
// =========================================================================
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

// =========================================================================
// 4. WEB PUSH NOTIFICATION LISTENERS
// =========================================================================

// Listen for incoming server push notifications
self.addEventListener('push', (event) => {
  let data = { title: 'Gold Technology', body: 'New update available!' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: 'https://www.chyke.com/connectgold_2.png',
    badge: 'https://www.chyke.com/connectgold_2.png',
    vibrate:, // Corrected: valid millisecond array
    data: {
      url: '/' // Opens your root app link when clicked
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle clicking on the notification banner
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
