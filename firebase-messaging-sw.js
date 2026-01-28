// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/12.8.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBVStzO1vycmJXYzJOahpBaR7llgAmalKc",
  authDomain: "air-skye-ce6f0.firebaseapp.com",
  projectId: "air-skye-ce6f0",
  storageBucket: "air-skye-ce6f0.firebasestorage.app",
  messagingSenderId: "652683865516",
  appId: "1:652683865516:web:ec0ed66bbef70bfe391e09",
  measurementId: "G-X28P6BHMLS"
});

const messaging = firebase.messaging();

// Optional: Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/skylpworld256x256.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
