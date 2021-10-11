#[derive(Debug)]
pub struct Expr {
  pub switches: Vec<Switch>
}

#[derive(Debug)]
pub struct Switch {
  pub condition: Bool,
  pub trace: Trace
}

#[derive(Debug)]
pub struct Bool {
  disjunct: Vec<Conjunct>
}

#[derive(Debug)]
pub struct Conjunct {
  predicate: Vec<Predicate>
}

#[derive(Debug)]
pub enum Predicate {
  True,
  False,
  Match,
  NotMatch
}

#[derive(Debug)]
pub struct Trace {
  pub atoms: Vec<Atom>
}

#[derive(Debug)]
pub enum Atom {
  SubStr { index: i32, left: i32, right: i32 },
  ConstStr(String),
  Loop(fn(i32) -> Expr)
}

impl Expr {
  pub fn new(switches: Vec<Switch>) -> Expr {
    Expr { switches }
  }

  pub fn single(trace: Trace) -> Expr {
    Expr { switches: vec![Switch { condition: Bool::truthy(), trace }] }
  }
}

impl Trace {
  pub fn new(atoms: Vec<Atom>) -> Trace {
    Trace { atoms }
  }
}

impl Bool {
  pub fn truthy() -> Bool {
    Bool { disjunct: vec![Conjunct::truthy()] }
  }

  pub fn falsy() -> Bool {
    Bool { disjunct: vec![Conjunct::falsy()] }
  }
}

impl Conjunct {
  pub fn truthy() -> Conjunct {
    Conjunct { predicate: vec![Predicate::True] }
  }

  pub fn falsy() -> Conjunct {
    Conjunct { predicate: vec![Predicate::False] }
  }
}

// pub fn expr()
