use flashfill_core::algorithm::*;

// #[test]
// fn test() {
//   let input = vec![
//     vec!["John DOE 3 Data [TS]865-000-0000 - - 453442-00 06-23-2009".to_string()],
//     vec!["A FF MARILYN 30’S 865-000-0030 4535871-00 07-07-2009".to_string()],
//     vec!["A GEDA-MARY 100MG 865-001-0020 - - 5941-00 06-23-2009".to_string()],
//   ];

//   let result = vec![Some("865-000-0000".to_string()), None, None];

//   let result = run(input, result);

//   dbg!(&result);
// }

#[test]
fn test_add() {
  let input = vec![
    vec!["(abc".to_string()],
    vec!["(def".to_string()],
    vec!["(ghi".to_string()],
  ];

  let result = vec![Some("(abc)".to_string()), None, None];

  let result = run(input, result);

  dbg!(&result);

  assert!(result[0].ends_with(")"));
  assert!(result[1].ends_with(")"));
  assert!(result[2].ends_with(")"));
}
