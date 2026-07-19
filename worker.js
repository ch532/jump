// worker.js
// Logic defined directly inside the worker to bypass file path issues
function wasm_calculate_layout(hold_duration, target) {
    let mode = (hold_duration > 500 && target === "target-zone") 
        ? "DEEP_FOCUS" 
        : "DEFAULT";

    return {
        mode: mode,
        target: target
    };
}

self.onmessage = async (e) => {
    if (e.data.type === 'CAPTURE_INTENT') {
        const { dwellDuration, target } = e.data.data;
        
        // Call the local function
        const layoutSchema = wasm_calculate_layout(dwellDuration, target);
        
        self.postMessage({ type: 'APPLY_LAYOUT', layout: layoutSchema });
    }
};
