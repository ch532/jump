let deferredPrompt; 
const installBtn = document.getElementById('installBtn');

// 1. Listen for the browser's install availability event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default mini-infobar from appearing on mobile
  e.preventDefault();
  
  // Save the event so it can be triggered later
  deferredPrompt = e;
  
  // Unhide your custom install button
  installBtn.style.display = 'block';
});

// 2. Trigger the prompt when the user clicks your button
installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  
  // Show the native browser install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response to install prompt: ${outcome}`);
  
  // Clean up memory; the prompt can only be used once
  deferredPrompt = null;
  
  // Hide your install button again
  installBtn.style.display = 'none';
});

// 3. Optional: Hide button if the app is successfully installed
window.addEventListener('appinstalled', () => {
  console.log('PWA was successfully installed!');
  deferredPrompt = null;
  installBtn.style.display = 'none';
});
