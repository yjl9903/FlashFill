use flashfill_core::*;

fn run_expr_test(expr: &Expr, samples: Vec<(Vec<&str>, &str)>) {
  for (input, ans) in samples {
    assert_eq!(expr.run(&input.iter().map(|s| (*s).into()).collect()), ans)
  }
}

/**
 * Example 1
 *
 * Task: extract phone number
 */
#[test]
fn test_example1() {
  let pattern = regexp!(
    Token::numeric(),
    Token::punctuation('-'),
    Token::numeric(),
    Token::punctuation('-'),
    Token::numeric()
  );

  let expr = expr!(Atom::SubStr {
    index: 0,
    left: Position::Pos(Token::not_numeric().into(), pattern.clone(), 1),
    right: Position::Pos(pattern, Token::not_numeric().into(), 1)
  });

  run_expr_test(
    &expr,
    vec![
      (
        vec!["John DOE 3 Data [TS]865-000-0000 - - 453442-00 06-23-2009"],
        "865-000-0000",
      ),
      (
        vec!["A FF MARILYN 30’S 865-000-0030 4535871-00 07-07-2009"],
        "865-000-0030",
      ),
      (
        vec!["A GEDA-MARY 100MG 865-001-0020 - - 5941-00 06-23-2009"],
        "865-001-0020",
      ),
    ],
  )
}

/**
 * Example 2
 *
 * Task: extract weight and its unit
 */
#[test]
fn test_example2() {
  let expr = expr!(Atom::SubStr {
    index: 0,
    left: Position::Pos(RegExp::empty(), Token::numeric().into(), 1),
    right: Position::CPos(-1)
  });

  run_expr_test(
    &expr,
    vec![
      (vec!["BTR KRNL WK CORN 15Z"], "15Z"),
      (vec!["CAMP DRY DBL NDL 3.6 OZ"], "3.6 OZ"),
      (vec!["CHORE BOY HD SC SPNG 1 PK"], "1 PK"),
      (vec!["FRENCH WORCESTERSHIRE 5 Z"], "5 Z"),
      (vec!["O F TOMATO PASTE 6 OZ"], "6 OZ"),
    ],
  );
}

/**
 * Example 3
 *
 * Task: directory extract
 */
#[test]
fn test_example3() {
  let expr = expr!(Atom::SubStr {
    index: 0,
    left: Position::CPos(0),
    right: Position::Pos(Token::punctuation('\\').into(), RegExp::empty(), -1)
  });

  run_expr_test(
    &expr,
    vec![
      (vec!["Company\\Code\\index.html"], "Company\\Code\\"),
      (
        vec!["Company\\Docs\\Spec\\specs.doc"],
        "Company\\Docs\\Spec\\",
      ),
      (vec!["\\Users\\xlor\\FlashFill"], "\\Users\\xlor\\"),
    ],
  )
}

/**
 * Example 4
 *
 * Task: Generate Abbreviation
 */
#[test]
fn test_example4() {
  let expr = expr!(Atom::Loop(expr!(Atom::match_loop_substr(
    0,
    Token::uppercase().into(),
    1,
    0
  ))));

  run_expr_test(
    &expr,
    vec![
      (vec!["International Business Machines"], "IBM"),
      (vec!["Principles Of Programming Languages"], "POPL"),
      (
        vec!["International Conference on Software Engineering"],
        "ICSE",
      ),
    ],
  )
}

/**
 * Example 5
 *
 * Task: Split Odds
 */
#[test]
fn test_example5() {
  let p1 = Position::LoopPos(
    Token::punctuation('(').into(),
    regexp!(Token::numeric(), Token::punctuation('/')),
    1,
    0,
  );
  let p2 = Position::LoopPos(
    regexp!(Token::punctuation('/'), Token::numeric()),
    Token::punctuation(')').into(),
    1,
    0,
  );
  let expr = expr!(Atom::Loop(expr!(
    Atom::SubStr {
      index: 0,
      left: p1,
      right: p2
    },
    Atom::ConstStr(" # ".into())
  )));

  run_expr_test(
    &expr,
    vec![
      (vec!["(6/7)(4/5)(14/1)"], "6/7 # 4/5 # 14/1 # "),
      (vec!["49(28/11)(14/1)"], "28/11 # 14/1 # "),
      (vec!["() (28/11)(14/1)"], "28/11 # 14/1 # "),
    ],
  );
}
