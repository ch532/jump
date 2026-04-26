// blockchain.js - Powers the Goldtech Node Connection
const NODE_URL = "https://json-rpc.16jdibmti2npacszmsydxgvlc.blockchainnodeengine.com"; // Copy full URL from Google Cloud

async function connectToGoldtech() {
    // Check if Ethers library is loaded
    if (typeof ethers === "undefined") {
        console.error("Ethers.js not found. Make sure to include the script tag in HTML.");
        return;
    }

    const provider = new ethers.providers.JsonRpcProvider(NODE_URL);

    try {
        const blockNumber = await provider.getBlockNumber();
        
        // Update the UI elements
        const statusEl = document.getElementById("node-status");
        const blockEl = document.getElementById("block-height");

        if (statusEl) statusEl.innerText = "Running (Mainnet)";
        if (blockEl) blockEl.innerText = blockNumber.toLocaleString(); // Adds commas like 24,959,975

        console.log("Goldtech Node Success: Syncing at " + blockNumber);
    } catch (error) {
        console.error("Goldtech Connection Error:", error);
        if (document.getElementById("node-status")) {
            document.getElementById("node-status").innerText = "Connection Failed";
        }
    }
}

// Run the connection when the page loads
window.addEventListener('load', connectToGoldtech);

// Refresh every 20 seconds to show the newest block
setInterval(connectToGoldtech, 20000);
