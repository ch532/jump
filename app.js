let deferredPrompt; 
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = 'block';
  }
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    installBtn.style.display = 'none';
  });
}

window.addEventListener('appinstalled', () => {
  console.log('Gold Technology PWA was successfully installed!');
  deferredPrompt = null;
  if (installBtn) {
    installBtn.style.display = 'none';
  }
});

// =========================================================================
// 2. SERVICE WORKER REGISTRATION LOGIC
// =========================================================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker registered!', reg.scope))
      .catch((err) => console.error('Registration failed:', err));
  });
}


// =========================================================================
// 3. DETECT IF RUNNING IN STANDALONE MODE (Place it here)
// =========================================================================
function checkDisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
    || window.navigator.standalone 
    || document.referrer.includes('android-app://');

  if (isStandalone) {
    console.log('App is running in Standalone Mode');
    if (installBtn) {
      installBtn.style.display = 'none';
    }
    document.body.classList.add('pwa-mode');
  } else {
    console.log('App is running in a standard Browser Tab');
  }
}

// Execute check on page load
window.addEventListener('DOMContentLoaded', checkDisplayMode);
