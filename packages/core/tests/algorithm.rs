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

#[test]
fn test_multi_add() {
  let input = vec![
    vec!["(abc".to_string()],
    vec!["(def".to_string()],
    vec!["(ghi".to_string()],
    vec!["(jkl".to_string()],
  ];

  let result = vec![
    Some("(abc)".to_string()),
    Some("(def)".to_string()),
    None,
    None,
  ];

  let result = run(input, result);

  dbg!(&result);

  assert_eq!(result[0], "(abc)".to_string());
  assert_eq!(result[1], "(def)".to_string());
  assert_eq!(result[2], "(ghi)".to_string());
  assert_eq!(result[3], "(jkl)".to_string());
}

#[test]
fn test_len_add() {
  let input = vec![
    vec!["(a".to_string()],
    vec!["(bc".to_string()],
    vec!["(def".to_string()],
    vec!["(ghij".to_string()],
  ];

  let result = vec![
    Some("(a)".to_string()),
    Some("(bc)".to_string()),
    None,
    None,
  ];

  let result = run(input, result);

  dbg!(&result);

  assert_eq!(result[0], "(a)".to_string());
  assert_eq!(result[1], "(bc)".to_string());
  assert_eq!(result[2], "(def)".to_string());
  assert_eq!(result[3], "(ghij)".to_string());
}

#[test]
fn test_len_char_add() {
  let input = vec![
    vec!["(1".to_string()],
    vec!["(2a".to_string()],
    vec!["(3bC".to_string()],
    vec!["(4d f".to_string()],
  ];

  let result = vec![
    Some("(1)".to_string()),
    Some("(2a)".to_string()),
    None,
    None,
  ];

  let result = run(input, result);

  dbg!(&result);

  assert_eq!(result[0], "(1)".to_string());
  assert_eq!(result[1], "(2a)".to_string());
  assert_eq!(result[2], "(3bC)".to_string());
  assert_eq!(result[3], "(4d f)".to_string());
}

#[test]
fn test_const() {
  let input = vec![
    vec!["abc".to_string(), "abc".to_string(), "666".to_string()],
    vec!["1234".to_string(), "7777".to_string(), "DEFG".to_string()],
    vec![
      "12345".to_string(),
      "12345".to_string(),
      "12345".to_string(),
    ],
  ];

  let result = vec![Some("abc".to_string()), Some("1234".to_string()), None];

  let result = run(input, result);

  dbg!(&result);

  assert_eq!(result[2], "12345".to_string());
}

#[test]
fn test_const_split() {
  let input = vec![
    vec!["123456789".to_string()],
    vec!["987654321".to_string()],
    vec!["312389123".to_string()],
  ];

  let result = vec![
    Some("123-456-789".to_string()),
    Some("987-654-321".to_string()),
    None,
  ];

  let result = run(input, result);

  dbg!(&result);

  assert_eq!(result[2], "312-389-123".to_string());
}

#[test]
fn test_extract_city() {
  let input = vec![
    vec!["jiangsu, nanjing, nju".to_string()],
    vec!["hubei, wuhan, hust".to_string()],
    vec!["shandong, jinan, sdu".to_string()],
  ];

  let result = vec![Some("nanjing".to_string()), None, None];

  let result = run(input, result);

  dbg!(&result);

  assert_eq!(result[2], "jinan".to_string());
}

#[test]
fn test_extract_switch() {
  let input = vec![
    vec!["123".to_string(), "321".to_string()],
    vec!["124".to_string(), "421".to_string()],
    vec!["125".to_string(), "521".to_string()],
  ];

  let result = vec![
    Some("case 123: return 321;".to_string()),
    Some("case 124: return 421;".to_string()),
    None,
  ];

  let result = run(input, result);

  dbg!(&result);

  assert_eq!(result[2], "case 125: return 521;".to_string());
}
