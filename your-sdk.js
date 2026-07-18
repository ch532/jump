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


/**
 * 2. THE INITIALIZER
 * This function uses the loader to fetch Paystack, then triggers the payment.
 */
async function initializePayment(config) {
    const PAYSTACK_URL = 'https://js.paystack.co/v2/inline.js';

    try {
        // Wait for the script to load
        await loadPaymentGatewayScript(PAYSTACK_URL);

        // Initialize Paystack with the developer's public key
        const paystack = new PaystackPop();
        
        paystack.newTransaction({
            key: config.public_key, 
            email: config.email,
            amount: config.amount * 100, // Paystack requires amount in kobo
            channels: ['card'], // Restrict to card only
            onSuccess: (transaction) => {
                console.log("Payment successful", transaction);
                // Trigger the developer's custom success logic
                if (config.onSuccess) config.onSuccess(transaction);
            },
            onCancel: () => {
                console.log("Payment cancelled");
            }
        });
    } catch (error) {
        console.error("SDK Initialization Error:", error);
    }
}
