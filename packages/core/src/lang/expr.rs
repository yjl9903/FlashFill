use super::{Match, Position, RegExp};

#[derive(Debug)]
pub struct Expr {
  pub switches: Vec<Switch>,
}

#[derive(Debug)]
pub struct Switch {
  pub condition: Bool,
  pub trace: Trace,
}

#[derive(Debug)]
pub struct Bool {
  pub disjunct: Vec<Conjunct>,
}

#[derive(Debug)]
pub struct Conjunct {
  pub predicate: Vec<Predicate>,
}

#[derive(Debug)]
pub enum Predicate {
  True,
  False,
  MatchPredicate(Match),
  NotMatchPredicate(Match),
}

#[derive(Debug)]
pub struct Trace {
  pub atoms: Vec<Atom>,
}

#[derive(Debug)]
pub enum Atom {
  SubStr {
    index: usize,
    left: Position,
    right: Position,
  },
  ConstStr(String),
  Loop(Expr),
}

impl Expr {
  pub fn new(switches: Vec<Switch>) -> Expr {
    Expr { switches }
  }

  pub fn single(trace: Trace) -> Expr {
    Expr {
      switches: vec![Switch {
        condition: Bool::truthy(),
        trace,
      }],
    }
  }
}

impl Trace {
  pub fn new(atoms: Vec<Atom>) -> Trace {
    Trace { atoms }
  }
}

impl Atom {
  pub fn match_substr(index: usize, regexp: RegExp, k: i32) -> Atom {
    Atom::SubStr {
      index,
      left: Position::Pos(RegExp::empty(), regexp.clone(), k),
      right: Position::Pos(regexp, RegExp::empty(), k),
    }
  }

  pub fn match_loop_substr(index: usize, regexp: RegExp, k1: i32, k2: i32) -> Atom {
    Atom::SubStr {
      index,
      left: Position::LoopPos(RegExp::empty(), regexp.clone(), k1, k2),
      right: Position::LoopPos(regexp, RegExp::empty(), k1, k2),
    }
  }
}

impl Bool {
  pub fn new(disjunct: Vec<Conjunct>) -> Bool {
    Bool { disjunct }
  }

  pub fn truthy() -> Bool {
    Bool {
      disjunct: vec![Conjunct::truthy()],
    }
  }

  pub fn falsy() -> Bool {
    Bool {
      disjunct: vec![Conjunct::falsy()],
    }
  }
}

impl Conjunct {
  pub fn new(predicate: Vec<Predicate>) -> Conjunct {
    Conjunct { predicate }
  }

  pub fn truthy() -> Conjunct {
    Conjunct {
      predicate: vec![Predicate::True],
    }
  }

  pub fn falsy() -> Conjunct {
    Conjunct {
      predicate: vec![Predicate::False],
    }
  }
}

impl Predicate {
  pub fn match_str(index: usize, regexp: RegExp, k: usize) -> Predicate {
    Predicate::MatchPredicate(Match(index, regexp, k))
  }

  pub fn not_match_str(index: usize, regexp: RegExp, k: usize) -> Predicate {
    Predicate::NotMatchPredicate(Match(index, regexp, k))
  }
}

impl From<Predicate> for Bool {
  fn from(predicate: Predicate) -> Self {
    Bool {
      disjunct: vec![predicate.into()],
    }
  }
}

impl From<Predicate> for Conjunct {
  fn from(predicate: Predicate) -> Self {
    Conjunct {
      predicate: vec![predicate],
    }
  }
}

impl From<Conjunct> for Bool {
  fn from(conj: Conjunct) -> Self {
    Bool {
      disjunct: vec![conj],
    }
  }
}

#[macro_export]
macro_rules! expr {
  [ $( $x: expr ), * ] => {
    {
      let mut temp_vec: Vec<Atom> = Vec::new();
      $(
        temp_vec.push($x);
      )*
      Expr::single(Trace::new(temp_vec))
    }
  };

  { $($cond: expr => [$($e: expr),*]),+ } => {
    {
      let mut temp_vec: Vec<Switch> = Vec::new();
      $(
        temp_vec.push(Switch {
          condition: $cond,
          trace: Trace::new(vec![ $($e,)* ])
        });
      )*
      Expr::new(temp_vec)
    }
  }
}

#[macro_export]
macro_rules! const_str {
  ($str: expr) => {
    Atom::ConstStr($str.into())
  };
}

#[macro_export]
macro_rules! sub_str {
  ($index: expr , $left: expr , $right: expr) => {
    Atom::SubStr {
      index: $index,
      left: $left,
      right: $right,
    }
  };

  ($index: expr) => {
    Atom::SubStr {
      index: $index,
      left: Position::CPos(0),
      right: Position::CPos(-1),
    }
  };
}

#[macro_export]
macro_rules! atom_loop {
  [ $( $x: expr ), * ] => {
    Atom::Loop(expr![$($x),*])
  };
}

#[macro_export]
macro_rules! cond {
  [ $( $x: expr ), * ] => {
    Bool::new(vec![ $($x.into(),)* ])
  };
}

#[macro_export]
macro_rules! and {
  [ $( $x: expr ), * ] => {
    Conjunct::new(vec![ $($x.into(),)* ])
  };
}

#[macro_export]
macro_rules! match_str {
  ($index: expr, $regexp: expr, $k: expr) => {
    Predicate::match_str($index, $regexp.into(), $k)
  };

  ($index: expr, $regexp: expr) => {
    Predicate::match_str($index, $regexp.into(), 1)
  };
}

#[macro_export]
macro_rules! punctuation {
  ($c: expr) => {
    Token::Punctuation($c)
  };
}
