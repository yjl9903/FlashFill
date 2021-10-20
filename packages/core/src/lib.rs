mod lang;

mod algorithm;

extern crate serde_json;

use wasm_bindgen::prelude::*;

// #[macro_use]
// extern crate serde_derive;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the globals allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

pub use lang::*;

#[wasm_bindgen]
pub fn greet() {
  log("This is flashfill.");

  let expr = Expr::single(Trace::new(vec![]));
  let out = format!("{:?}", expr);
  log(&out);
}

#[wasm_bindgen]
pub fn run(js_objects: &JsValue) -> JsValue {
  let inputs: Vec<Vec<String>> = js_objects.into_serde().unwrap();
  let mut result: Vec<String> = Vec::new();
  for input in inputs {
    let line = input.join(", ");
    log(&line);
    result.push(line);
  }
  JsValue::from_serde(&result).unwrap()
}
