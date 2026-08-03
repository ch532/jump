// sw.js - Background Service Worker

const WORKER_URL = "https://white-rain-9773.trustconnect713.workers.dev/telemetry";

// Listen for system message events to force an immediate push
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'triggerNotification') {
    event.waitUntil(fetchAndShowNotification());
  }
});

// Periodic Sync Listener
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-awareness-stack') {
    event.waitUntil(fetchAndShowNotification());
  }
});

// Core Notification Renderer
async function fetchAndShowNotification() {
  try {
    const payload = {
      location: "Abuja, Nigeria",
      wifi: navigator.onLine ? "Connected" : "Offline",
      screenStatus: "Web Service Worker"
    };

    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.status === "success" && data.items && data.items.length > 0) {
      const topCard = data.items[0];     // e.g., Local Time
      const secondCard = data.items[1];  // e.g., Current Date

      // Post directly to Android status/notification panel
      await self.registration.showNotification(`${topCard.title}: ${topCard.content}`, {
        body: `${secondCard.title}: ${secondCard.content}`,
        icon: "https://cdn-icons-png.flaticon.com/512/3119/3119338.png",
        tag: "awareness-notification-stack",
        renotify: true,
        silent: false // Ensures Android shows the icon in the top status bar
      });
    }
  } catch (err) {
    console.error("Failed to render background notification:", err);
  }
}
