function wasm_calculate_layout(hold_duration, target) {
    let mode = "DEFAULT", action = "NONE";

    if (hold_duration > 3000) { mode = "SYSTEM_CONFIG"; } 
    else if (hold_duration > 1500) { mode = "DEEP_FOCUS"; action = "OPEN_MENU"; } 
    else if (hold_duration > 500) { mode = "EXPLORATION_FLOW"; }

    return { mode, target, action };
}

self.onmessage = (e) => {
    const { dwellDuration, target } = e.data.data;
    self.postMessage({ type: 'APPLY_LAYOUT', layout: wasm_calculate_layout(dwellDuration, target) });
};
