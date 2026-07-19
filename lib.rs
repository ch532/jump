use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wasm_calculate_layout(hold_duration: u64, target: &str) -> JsValue {
    // Mobile Intent Logic: Deep focus after 1.5 seconds of holding
    let mode = if hold_duration > 1500 && target == "target-zone" {
        "DEEP_FOCUS"
    } else {
        "DEFAULT"
    };

    serde_wasm_bindgen::to_value(&serde_json::json!({
        "mode": mode
    })).unwrap()
}
