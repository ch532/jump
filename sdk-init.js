// sdk-init.js - Global SDK Injector
// Owner: Okoye Chibuike

// [1 & 2: Styles and Inject Menu remain the same as your code]
// (Ensure your styleSheet and menuDiv injection code is at the top)

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

// --- UPDATED: Unified Worker Message Handler ---
worker.onmessage = (e) => {
    // Handle menu trigger
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
                // CALL THE EXECUTION FUNCTION HERE
                btn.onclick = () => executeFeature(rec);
                recDiv.querySelector('#rec-grid').appendChild(btn);
            });
            menu.insertBefore(recDiv, menu.querySelector('.close-btn'));
        }
    }
};

// --- NEW: Feature Execution Logic ---
function executeFeature(featureName) {
    switch(featureName) {
        case 'Read Mode':
            window.scrollTo({ top: document.querySelector('article')?.offsetTop || 0, behavior: 'smooth' });
            break;
        case 'Quick Contact':
            window.location.href = 'mailto:info@chyke.online'; // Replace with your email
            break;
        case 'Site Search':
            document.querySelector('input[type="search"], #search')?.focus();
            break;
        case 'Explore Resources':
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            break;
    }
    document.getElementById('action-menu').style.display = 'none';
}

// --- Existing performAction function ---
window.performAction = function(type) {
    switch(type) {
        case 'COPY': document.execCommand('copy'); break;
        case 'PASTE': navigator.clipboard.readText().then(text => document.execCommand('insertText', false, text)); break;
        case 'SELECT_ALL': document.execCommand('selectAll', false, null); break;
        case 'REFRESH': location.reload(); break;
        case 'SHARE': 
            if (navigator.share) navigator.share({title: document.title, url: window.location.href});
            else alert('Sharing not supported.');
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

// Scan on load
window.addEventListener('load', () => {
    const domStructure = {
        hasArticle: !!document.querySelector('article, section, p'),
        hasSearch: !!document.querySelector('input[type="search"], #search, .search'),
        hasForms: !!document.querySelector('form'),
        hasLinks: document.querySelectorAll('a').length > 5
    };
    worker.postMessage({ type: 'ANALYZE_PAGE', data: { domStructure } });
});
