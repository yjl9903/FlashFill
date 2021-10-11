use crate::lang::CharItem;

use super::{CharItems, Match, Position};

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
  disjunct: Vec<Conjunct>,
}

#[derive(Debug)]
pub struct Conjunct {
  predicate: Vec<Predicate>,
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
  SubStr { index: usize, left: Position, right: Position },
  ConstStr(String),
  // Loop(fn(i32) -> Expr),
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

  pub fn run(&self, input: &Vec<String>) -> String {
    let input: &Vec<CharItems> = &input.iter().map(|text| text.into()).collect();
    for Switch { condition , trace } in &self.switches {
      if condition.test(input) {
        let mut result: Vec<char> = Vec::new();
        trace.run(input, &mut result);
        return result.iter().collect();
      }
    }
    panic!("Expr must have a default branch");
  }
}

impl Trace {
  pub fn new(atoms: Vec<Atom>) -> Trace {
    Trace { atoms }
  }

  pub fn run(&self, input: &Vec<CharItems>, result: &mut Vec<char>) {
    for atom in &self.atoms {
      atom.run(input, result);
    }
  }
}

impl Atom {
  pub fn run(&self, input: &Vec<CharItems>, result: &mut Vec<char>) {
    match self {
      Atom::SubStr { index, left, right } => {
        let input = &input[*index];
        let left = left.get(input);
        let right = right.get(input);
        if let Some(left) = left {
          if let Some(right) = right {
            for i in left .. right {
              if let CharItem::Char(c) = input[i] {
                result.push(c);
              } else {
                // start or end here
              }
            }
          }
        }
        // no match here
      },
      Atom::ConstStr(text) => {
        text.chars().for_each(|c| result.push(c));
      },
      // Atom::Loop(_) => {
      //   todo!();
      // },
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

  pub fn test(&self, input: &Vec<CharItems>) -> bool {
    for conj in &self.disjunct {
      if conj.test(input) {
        return true;
      }
    }
    false
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

  pub fn test(&self, input: &Vec<CharItems>) -> bool {
    for pred in &self.predicate {
      if !pred.test(input) {
        return false;
      }
    }
    true
  }
}

impl Predicate {
  pub fn test(&self, input: &Vec<CharItems>) -> bool {
    match self {
      Predicate::True => true,
      Predicate::False => false,
      Predicate::MatchPredicate(mat) => mat.test(input),
      Predicate::NotMatchPredicate(mat) => !mat.test(input),
    }
  }
}
