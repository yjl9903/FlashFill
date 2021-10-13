use super::{Match, Position};

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
