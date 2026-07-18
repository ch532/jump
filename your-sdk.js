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
 * 2. THE INITIALIZER (Updated for 20% Split via Split Code)
 */
async function initializePayment(config) {
    const PAYSTACK_URL = 'https://js.paystack.co/v2/inline.js';

    try {
        await loadPaymentGatewayScript(PAYSTACK_URL);

        const paystack = new PaystackPop();
        
        paystack.newTransaction({
            key: config.public_key,
            email: config.email,
            amount: config.amount * 100, 
            channels: ['card'],
            // Use the split_code from your Dashboard instead of a subaccount ID
            split_code: 'SPL_your_split_code_here', 
            onSuccess: (transaction) => {
                console.log("Payment successful", transaction);
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
