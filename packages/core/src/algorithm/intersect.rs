use std::collections::HashSet;

use crate::Token;

use super::{AtomSet, Dag, IntegerExpr, PositionSet, RegExpSet};

impl Dag {
  pub fn intersect(lhs: &Dag, rhs: &Dag) -> Dag {
    let new_start = lhs.start() * rhs.len() + rhs.start();
    let new_end = lhs.end() * rhs.len() + rhs.end();
    let mut new_dag = Dag::new(lhs.len() * rhs.len(), new_start, new_end);
    for a in 0..lhs.len() {
      for b in 0..rhs.len() {
        let new_from = a * rhs.len() + b;
        for (toa, fa) in lhs.edge_of(a) {
          for (tob, fb) in rhs.edge_of(b) {
            let new_to = toa * rhs.len() + tob;
            for fx in fa {
              for fy in fb {
                if let Some(new_f) = AtomSet::intersect(fx, fy) {
                  new_dag.add_edge(new_from, new_to, new_f.clone());
                }
              }
            }
          }
        }
      }
    }
    new_dag
  }
}

impl AtomSet {
  pub fn intersect(lhs: &AtomSet, rhs: &AtomSet) -> Option<AtomSet> {
    match (lhs, rhs) {
      (AtomSet::LoopSet(d1), AtomSet::LoopSet(d2)) => {
        Some(AtomSet::LoopSet(Dag::intersect(d1, d2)))
      }
      (AtomSet::SubStrSet(i1, j1, k1), AtomSet::SubStrSet(i2, j2, k2)) => {
        if *i1 == *i2 {
          Some(AtomSet::SubStrSet(
            *i1,
            PositionSet::intersect_vec(j1, j2),
            PositionSet::intersect_vec(k1, k2),
          ))
        } else {
          None
        }
      }
      (AtomSet::ConstStr(s1), AtomSet::ConstStr(s2)) => {
        if s1 == s2 {
          Some(AtomSet::ConstStr(s1.clone()))
        } else {
          None
        }
      }
      _ => None,
    }
  }
}

impl PositionSet {
  pub fn intersect_vec(lhs: &Vec<PositionSet>, rhs: &Vec<PositionSet>) -> Vec<PositionSet> {
    let mut result = Vec::new();
    for x in lhs {
      for y in rhs {
        if let Some(pos) = PositionSet::intersect(x, y) {
          result.push(pos);
        }
      }
    }
    result
  }

  fn intersect(lhs: &PositionSet, rhs: &PositionSet) -> Option<PositionSet> {
    match (lhs, rhs) {
      (PositionSet::CPos(k1), PositionSet::CPos(k2)) => {
        if *k1 == *k2 {
          Some(PositionSet::CPos(*k1))
        } else {
          None
        }
      }
      (PositionSet::Pos(p1, q1, c1), PositionSet::Pos(p2, q2, c2)) => {
        let r1 = RegExpSet::intersect(p1, p2);
        let r2 = RegExpSet::intersect(q1, q2);
        let pos = IntegerExpr::intersect(c1, c2);
        if r1.len() > 0 && r2.len() > 0 && pos.len() > 0 {
          Some(PositionSet::Pos(r1, r2, pos))
        } else {
          None
        }
      }
      _ => None,
    }
  }
}

impl IntegerExpr {
  pub fn intersect(lhs: &Vec<IntegerExpr>, rhs: &Vec<IntegerExpr>) -> Vec<IntegerExpr> {
    let set: HashSet<IntegerExpr> = lhs.iter().cloned().collect();
    rhs
      .iter()
      .filter(|expr| set.contains(*expr))
      .cloned()
      .collect()
  }
}

impl RegExpSet {
  pub fn intersect(lhs: &RegExpSet, rhs: &RegExpSet) -> RegExpSet {
    if lhs.len() == rhs.len() {
      let mut tokens: Vec<Vec<Token>> = Vec::with_capacity(lhs.len());
      for i in 0..lhs.len() {
        let lhs = lhs.get(i);
        let rhs = rhs.get(i);
        let result = Token::intersect(lhs, rhs);
        if result.is_empty() {
          return RegExpSet::empty();
        }
        tokens.push(result);
      }
      RegExpSet::new(tokens)
    } else {
      RegExpSet::empty()
    }
  }
}

impl Token {
  pub fn intersect(lhs: &Vec<Token>, rhs: &Vec<Token>) -> Vec<Token> {
    let set: HashSet<Token> = lhs.iter().cloned().collect();
    rhs
      .iter()
      .filter(|token| set.contains(*token))
      .cloned()
      .collect()
  }
}
