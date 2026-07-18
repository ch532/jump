/**
 * 1. THE SCRIPT LOADER
 * This function dynamically injects the Paystack library into the developer's website.
 */
function loadPaymentGatewayScript(url) {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded to prevent duplicates
    if (document.querySelector(`script[src="${url}"]`)) {
      return resolve();
    }

    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));

    document.head.appendChild(script);
  });
}
