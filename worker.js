// worker.js - Synthesis Engine for Cross-Browser SDK
self.onmessage = function(e) {
    if (e.data.type === 'CAPTURE_INTENT') {
        const { dwellDuration } = e.data.data;
        if (dwellDuration >= 800) { // 800ms threshold
            self.postMessage({ type: 'APPLY_LAYOUT', layout: { action: 'OPEN_MENU' } });
        }
    }
};
