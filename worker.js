// worker.js
self.onmessage = function(e) {
    // Discovery Engine
    if (e.data.type === 'ANALYZE_PAGE') {
        self.postMessage({ type: 'INTELLIGENCE_REPORT', recommendations: e.data.features });
    }
    // Menu Trigger Logic
    if (e.data.type === 'CAPTURE_INTENT' && e.data.data.dwellDuration >= 800) {
        self.postMessage({ type: 'APPLY_LAYOUT', layout: { action: 'OPEN_MENU' } });
    }
};
