// worker.js
function wasm_calculate_layout(hold_duration, target) {
    let mode = "DEFAULT";

    if (target === "target-zone") {
        if (hold_duration > 3000) {
            mode = "SYSTEM_CONFIG";   // Ultra-long hold: Access global settings
        } else if (hold_duration > 1500) {
            mode = "DEEP_FOCUS";      // Mid hold: Focus on element
        } else if (hold_duration > 500) {
            mode = "EXPLORATION_FLOW"; // Short hold: Surface related info
        }
    }

    return { mode: mode, target: target };
}

self.onmessage = async (e) => {
    if (e.data.type === 'CAPTURE_INTENT') {
        const { dwellDuration, target } = e.data.data;
        const layoutSchema = wasm_calculate_layout(dwellDuration, target);
        self.postMessage({ type: 'APPLY_LAYOUT', layout: layoutSchema });
    }
};
