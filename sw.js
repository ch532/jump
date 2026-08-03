// sw.js - Background Service Worker

const WORKER_URL = "https://white-rain-9773.trustconnect713.workers.dev/telemetry";

// 1. Listen for Periodic Sync events (triggered by browser background scheduler)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-awareness-stack') {
    event.waitUntil(fetchAndShowNotification());
  }
});

// 2. Fallback Push listener (if you trigger push events from Cloudflare Worker)
self.addEventListener('push', (event) => {
  event.waitUntil(fetchAndShowNotification());
});

async function fetchAndShowNotification() {
  try {
    // Collect browser telemetry
    const payload = {
      location: "Abuja, Nigeria",
      wifi: navigator.onLine ? "Online (Web)" : "Offline",
      screenStatus: "Background Sync"
    };

    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.status === "success" && data.items && data.items.length > 0) {
      // Pick the primary card (e.g., Local Time / Weather) to display in the notification
      const topCard = data.items[0]; 
      const secondCard = data.items[1];

      await self.registration.showNotification(topCard.title + ": " + topCard.content, {
        body: `${secondCard.title}: ${secondCard.content}`,
        icon: "https://cdn-icons-png.flaticon.com/512/3119/3119338.png", // Replace with your icon URL
        tag: "awareness-system-notification", // Fixed tag ensures notifications overwrite cleanly without stack clutter
        renotify: false,
        silent: true
      });
    }
  } catch (err) {
    console.error("Background fetch failed:", err);
  }
}
