use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wasm_calculate_layout(dwell: u64, target: &str) -> JsValue {
    // Decision logic
    let mode = if dwell > 3000 && target == "interaction-zone" {
        "DEEP_FOCUS"
    } else {
        "DEFAULT"
    };

    // Return object to JS
    serde_wasm_bindgen::to_value(&serde_json::json!({
        "mode": mode,
        "target": target
    })).unwrap()
}
