// worker.js - Unified Synthesis & Intelligence Engine
// Owner: Okoye Chibuike

self.onmessage = function(e) {
    // 1. Existing Synthesis Engine for Menu Trigger
    if (e.data.type === 'CAPTURE_INTENT') {
        const { dwellDuration } = e.data.data;
        const DWELL_THRESHOLD = 800; // 800ms threshold
        
        if (dwellDuration >= DWELL_THRESHOLD) {
            self.postMessage({ type: 'APPLY_LAYOUT', layout: { action: 'OPEN_MENU' } });
        }
    }

    // 2. New Generic Intelligence Engine for Feature Detection
    if (e.data.type === 'ANALYZE_PAGE') {
        const { domStructure } = e.data.data;
        const recommendations = [];

        // Generic structural detection
        if (domStructure.hasArticle) recommendations.push("Read Mode");
        if (domStructure.hasSearch) recommendations.push("Site Search");
        if (domStructure.hasForms) recommendations.push("Quick Contact");
        if (domStructure.hasLinks) recommendations.push("Explore Resources");
        
        // Report findings back to the main thread
        self.postMessage({ type: 'INTELLIGENCE_REPORT', recommendations: recommendations });
    }
};
