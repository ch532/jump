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
        }).then(() => self.clients.claim())
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
// 4. BACKGROUND SYNC: Handle queued actions when connection returns
// =========================================================================
self.addEventListener('sync', (e) => {
    if (e.tag === 'sync-video-actions') {
        e.waitUntil(
            // Place your logic here to process offline requests/data sync
            console.log('Background sync triggered: uploading queued data...')
        );
    }
});

// =========================================================================
// 5. PERIODIC BACKGROUND SYNC: Update cached media data periodically
// =========================================================================
self.addEventListener('periodicsync', (e) => {
    if (e.tag === 'update-content') {
        e.waitUntil(
            // Place your logic here to fetch fresh video lists or updates in the background
            console.log('Periodic background sync triggered.')
        );
    }
});

// =========================================================================
// 6. PUSH NOTIFICATIONS: Receive and display incoming push messages
// =========================================================================
self.addEventListener('push', (e) => {
    let data = { title: 'Goldtech', body: 'New video available!' };
    
    if (e.data) {
        try {
            data = e.data.json();
        } catch (err) {
            data.body = e.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: '/connectgold_2.png',
        badge: '/connectgold_2.png',
        data: { url: data.url || '/' }
    };

    e.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// =========================================================================
// 7. NOTIFICATION CLICK: Open app when user taps push notification
// =========================================================================
self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Focus if window already open
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if ('focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise open a new window
            if (clients.openWindow) {
                return clients.openWindow(e.notification.data.url || '/');
            }
        })
    );
});
