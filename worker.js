// Load your Wasm module here (e.g., importScripts or instantiateStreaming)
// For this pattern, we assume you have a module with a calculateLayout export
importScripts('./path/to/wasm_wrapper.js'); 

self.onmessage = async (e) => {
    if (e.data.type === 'CAPTURE_INTENT') {
        const { dwellDuration, target } = e.data.data;

        // Desktop-Class Synthesis: Call your Rust function
        // This logic determines the interface shape based on dwell
        const layoutSchema = wasm_calculate_layout(dwellDuration, target);
        
        self.postMessage({ type: 'APPLY_LAYOUT', layout: layoutSchema });
    }
};
