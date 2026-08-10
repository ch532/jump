const API_URL = 'http://localhost:3000/api/v1/wallet';

document.getElementById('genBtn').addEventListener('click', async () => {
    const pin = document.getElementById('pinInput').value;
    if (!pin || pin.length < 4) {
        alert('Enter a PIN with at least 4 digits');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin })
        });
        const data = await res.json();

        if (data.address) {
            document.getElementById('activeAddr').innerText = data.address;
            fetchBalance(data.address);
        } else {
            alert('Generation error: ' + data.error);
        }
    } catch (e) {
        alert('Cannot reach Ember AS core on localhost:3000');
    }
});

async function fetchBalance(addr) {
    try {
        const res = await fetch(`${API_URL}/balance/${addr}`);
        const data = await res.json();
        if (data.balanceSats !== undefined) {
            document.getElementById('satsDisplay').innerText = `${data.balanceSats.toLocaleString()} Sats`;
        }
    } catch (e) {}
}
