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

#[macro_export]
macro_rules! expr {
  ( $( $x: expr ), * ) => {
    {
      let mut temp_vec: Vec<Atom> = Vec::new();
      $(
        temp_vec.push($x);
      )*
      Expr::single(Trace::new(temp_vec))
    }
  };
}
