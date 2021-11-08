mod lang;

pub mod algorithm;

pub use lang::*;

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

#[wasm_bindgen]
pub fn greet() {
  log("This is flashfill.");

  let expr = Expr::single(Trace::new(vec![]));
  let out = format!("{:?}", expr);
  log(&out);
}

#[wasm_bindgen]
pub fn run(inputs: JsValue, results: JsValue) -> JsValue {
  let inputs: Vec<Vec<String>> = inputs.into_serde().unwrap();
  let results: Vec<Option<String>> = results.into_serde().unwrap();
  let answer: Vec<String> = algorithm::run(inputs, results);
  JsValue::from_serde(&answer).unwrap()
}
