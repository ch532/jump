// sdk-init.js - Global SDK Injector
// Owner: Okoye Chibuike

// 1. Inject Styles
const sdkStyles = `
    #action-menu { display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); z-index: 10000; width: 85%; max-width: 320px; }
    .menu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
    .sdk-btn { padding: 10px; border: none; background: #e0e0e0; border-radius: 5px; font-size: 13px; cursor: pointer; }
    .close-btn { width: 100%; margin-top: 10px; background: #ff5e5e; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = sdkStyles;
document.head.appendChild(styleSheet);

// 2. Inject Full Menu
const menuDiv = document.createElement("div");
menuDiv.id = "action-menu";
menuDiv.innerHTML = `
    <h3>Browser Actions</h3>
    <div class="menu-grid">
        <button class="sdk-btn" onclick="performAction('COPY')">Copy</button>
        <button class="sdk-btn" onclick="performAction('PASTE')">Paste</button>
        <button class="sdk-btn" onclick="performAction('SHARE')">Share</button>
        <button class="sdk-btn" onclick="performAction('REFRESH')">Refresh</button>
        <button class="sdk-btn" onclick="performAction('SELECT_ALL')">Select All</button>
        <button class="sdk-btn" onclick="performAction('EXPORT_STATE')">Export State</button>
    </div>
    <h3>Formatting</h3>
    <div class="menu-grid">
        <button class="sdk-btn" onclick="performAction('BOLD')">Bold</button>
        <button class="sdk-btn" onclick="performAction('ITALIC')">Italic</button>
        <button class="sdk-btn" onclick="performAction('COLOR')">Color</button>
        <button class="sdk-btn" onclick="performAction('SIZE')">Size</button>
    </div>
    <button class="close-btn" onclick="document.getElementById('action-menu').style.display='none'">Close</button>
`;
document.body.appendChild(menuDiv);

// 3. Logic
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const worker = new Worker('worker.js');
let isHolding = false;
let touchStartTime = 0;

const handleStart = (e) => { 
    if(!['INPUT','TEXTAREA','BUTTON','IFRAME'].includes(e.target.tagName)) { 
        isHolding = true; touchStartTime = Date.now(); 
    }
};
const handleEnd = () => { isHolding = false; };

if (isTouchDevice) {
    document.addEventListener('touchstart', handleStart, { passive: false });
    document.addEventListener('touchend', handleEnd, { passive: false });
} else {
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mouseup', handleEnd);
}

setInterval(() => {
    if (isHolding) worker.postMessage({ type: 'CAPTURE_INTENT', data: { dwellDuration: Date.now() - touchStartTime } });
}, 500);

worker.onmessage = (e) => { if (e.data.layout?.action === 'OPEN_MENU') document.getElementById('action-menu').style.display = 'block'; };

// --- NEW: Scan and Integrate Features ---
// Perform scan once the page is fully loaded
window.addEventListener('load', () => {
    const domStructure = {
        hasArticle: !!document.querySelector('article, section, p'),
        hasSearch: !!document.querySelector('input[type="search"], #search, .search'),
        hasForms: !!document.querySelector('form'),
        hasLinks: document.querySelectorAll('a').length > 5
    };
    
    // Send structural data to worker for analysis
    worker.postMessage({ type: 'ANALYZE_PAGE', data: { domStructure } });
});

// Update the worker message handler to include 'INTELLIGENCE_REPORT'
worker.onmessage = (e) => {
    if (e.data.layout?.action === 'OPEN_MENU') {
        document.getElementById('action-menu').style.display = 'block';
    } 
    
    // Handle feature recommendations
    if (e.data.type === 'INTELLIGENCE_REPORT') {
        const menu = document.getElementById('action-menu');
        if (e.data.recommendations.length > 0 && !document.getElementById('rec-section')) {
            const recDiv = document.createElement("div");
            recDiv.id = "rec-section";
            recDiv.innerHTML = `<h3>Promoted Features</h3><div class="menu-grid" id="rec-grid"></div>`;
            
            e.data.recommendations.forEach(rec => {
                const btn = document.createElement("button");
                btn.className = "sdk-btn";
                btn.innerText = rec;
                btn.onclick = () => alert("Feature active: " + rec);
                recDiv.querySelector('#rec-grid').appendChild(btn);
            });
            // Insert before the Close button
            menu.insertBefore(recDiv, menu.querySelector('.close-btn'));
        }
    }
};

window.performAction = function(type) {
    const content = document.activeElement; 
    switch(type) {
        case 'COPY': document.execCommand('copy'); break;
        case 'PASTE': navigator.clipboard.readText().then(text => document.execCommand('insertText', false, text)); break;
        case 'SELECT_ALL': document.execCommand('selectAll', false, null); break;
        case 'REFRESH': location.reload(); break;
        case 'SHARE': if (navigator.share) {
            navigator.share({
                title: document.title,
                text: 'Check out this terminal event update:',
                url: window.location.href
            }).catch((error) => console.log('Sharing failed', error));
        } else {
            alert('Sharing is not supported on this browser.');
        }
        break;
        case 'BOLD': document.execCommand('bold', false, null); break;
        case 'ITALIC': document.execCommand('italic', false, null); break;
        case 'COLOR': const c = prompt("Color:", "red"); if(c) document.execCommand('foreColor', false, c); break;
        case 'SIZE': const s = prompt("Size (1-7):", "5"); if(s) document.execCommand('fontSize', false, s); break;
        case 'EXPORT_STATE': 
            const blob = new Blob([document.body.innerText], {type: 'text/plain'});
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'data.txt'; a.click();
            break;
    }
    document.getElementById('action-menu').style.display = 'none';
};


