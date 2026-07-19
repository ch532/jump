// worker.js - Intelligence Engine
self.onmessage = function(e) {
    // 1. Feature Discovery Report
    if (e.data.type === 'ANALYZE_PAGE') {
        self.postMessage({ type: 'INTELLIGENCE_REPORT', recommendations: e.data.features });
    }
    
    // 2. Menu Trigger Logic
    if (e.data.type === 'CAPTURE_INTENT' && e.data.data.dwellDuration >= 800) {
        self.postMessage({ type: 'APPLY_LAYOUT', layout: { action: 'OPEN_MENU' } });
    }
};
