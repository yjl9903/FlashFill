use std::vec;

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
  let expr = expr!(atom_loop![Atom::match_loop_substr(
    0,
    Token::uppercase().into(),
    1,
    0
  )]);

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
  let expr = expr!(atom_loop![sub_str!(0, p1, p2), const_str!(" # ")]);

  run_expr_test(
    &expr,
    vec![
      (vec!["(6/7)(4/5)(14/1)"], "6/7 # 4/5 # 14/1 # "),
      (vec!["49(28/11)(14/1)"], "28/11 # 14/1 # "),
      (vec!["() (28/11)(14/1)"], "28/11 # 14/1 # "),
    ],
  );
}

/**
 * Example 6
 *
 * Task: Remove excess spaces
 */
#[test]
fn test_example6() {
  let p1 = Position::LoopPos(RegExp::empty(), Token::not_whitespace().into(), 1, 0);
  let p2 = Position::LoopPos(
    Token::not_whitespace().into(),
    regexp!(Token::whitespace(), Token::not_whitespace()),
    1,
    0,
  );
  let expr = expr!(
    atom_loop![sub_str!(0, p1, p2), const_str!(" ")],
    Atom::match_substr(0, Token::not_whitespace().into(), -1)
  );

  run_expr_test(
    &expr,
    vec![
      (vec!["   Oege  de    Moor"], "Oege de Moor"),
      (
        vec!["  Kathleen   Fisher   AT&T  Labs"],
        "Kathleen Fisher AT&T Labs",
      ),
      (vec!["   abc    "], "abc"),
      (vec!["abc    def"], "abc def"),
      (vec!["abc    def   "], "abc def"),
      (vec!["   abc    def   "], "abc def"),
    ],
  );
}

/**
 * Example 7
 *
 * Conditional Concatenation
 */
#[test]
fn test_example7() {
  let expr = expr! {
    cond![
      and![
        match_str!(0, Token::all()),
        match_str!(1, Token::all())
      ]
    ] => [
      sub_str!(0),
      const_str!("("),
      sub_str!(1),
      const_str!(")")
    ],
    Bool::truthy() => []
  };

  run_expr_test(
    &expr,
    vec![
      (vec!["Alex", "Asst."], "Alex(Asst.)"),
      (vec!["Jim", "Manager"], "Jim(Manager)"),
      (vec!["Ryan", ""], ""),
      (vec!["", "Asst."], ""),
    ],
  );
}

/**
 * Example 8
 *
 * Task: Mixed Date Parsing
 */
#[test]
fn test_example8() {
  let expr = expr! {
    cond![match_str!(0, punctuation!('/'))] => [
      sub_str!(0, Position::Pos(Token::start().into(), regexp!(), 1), Position::Pos(regexp!(), punctuation!('/').into(), 1))
    ],
    cond![match_str!(0, punctuation!('.'))] => [
      sub_str!(0, Position::Pos(punctuation!('.').into(), regexp!(), 1), Position::Pos(regexp!(), punctuation!('.').into(), 2))
    ],
    cond![match_str!(0, punctuation!('-'))] => [
      sub_str!(0, Position::Pos(punctuation!('-').into(), regexp!(), 2), Position::Pos(regexp!(), Token::end().into(), 1))
    ]
  };

  run_expr_test(
    &expr,
    vec![
      (vec!["01/21/2001"], "01"),
      (vec!["22.02.2002"], "02"),
      (vec!["2003-23-03"], "03"),
    ],
  );
}
