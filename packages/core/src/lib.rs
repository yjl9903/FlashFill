mod lang;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the globals allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

use lang::*;

#[wasm_bindgen]
pub fn greet() {
  log("This is flashfill.");

  let expr = Expr::single(Trace::new(vec![]));
  let out = format!("{:?}", expr);
  log(&out);
}
