use core::panic;
use std::collections::HashMap;

use crate::{Atom, CharItems, Position, RegExp, Trace};

use super::{AtomSet, Dag, IntegerExpr, PositionSet, RegExpSet};

impl Dag {
  fn r_dfs(
    &self,
    cur: usize,
    all_path: &mut Vec<Trace>,
    stack: &mut Vec<Atom>,
    edges: &mut HashMap<(usize, usize), Atom>,
  ) {
    if all_path.len() == 100 {
      return;
    }
    if cur == self.end() {
      all_path.push(Trace::new(stack.clone()));
    }
    for (to, f) in self.edge_of(cur) {
      if !edges.contains_key(&(cur, *to)) {
        if let Some(atom) = AtomSet::rank(f) {
          edges.insert((cur, *to), atom);
        }
      }
      let f = edges.get(&(cur, *to)).unwrap();
      stack.push(f.clone());
      self.r_dfs(*to, all_path, stack, edges);
      stack.pop();
    }
  }

  pub fn rank(&self) -> Option<Trace> {
    let mut all_path: Vec<Trace> = Vec::new();
    let mut stack: Vec<Atom> = vec![];
    let mut edges: HashMap<(usize, usize), Atom> = HashMap::new();

    self.r_dfs(self.start(), &mut all_path, &mut stack, &mut edges);

    all_path.into_iter().min()
  }
}

impl AtomSet {
  pub fn rank(sets: &Vec<AtomSet>) -> Option<Atom> {
    let substr: Vec<AtomSet> = sets
      .iter()
      .filter(|set| {
        if let AtomSet::SubStrSet(_, _, _) = set {
          true
        } else {
          false
        }
      })
      .cloned()
      .collect();

    let loop_expr: Vec<Dag> = sets
      .iter()
      .map(|set| {
        if let AtomSet::LoopSet(dag) = set {
          Some(dag)
        } else {
          None
        }
      })
      .filter(Option::is_some)
      .map(Option::unwrap)
      .cloned()
      .collect();

    let mut conststr: Vec<CharItems> = sets
      .iter()
      .map(|set| {
        if let AtomSet::ConstStr(text) = set {
          Some(text)
        } else {
          None
        }
      })
      .filter(Option::is_some)
      .map(Option::unwrap)
      .cloned()
      .collect();

    if !substr.is_empty() {
      substr
        .into_iter()
        .map(|set| {
          if let AtomSet::SubStrSet(index, p1, p2) = set {
            let left = PositionSet::rank(p1);
            let right = PositionSet::rank(p2);
            if let Some(left) = left {
              if let Some(right) = right {
                Some(Atom::SubStr { index, left, right })
              } else {
                None
              }
            } else {
              None
            }
          } else {
            panic!();
          }
        })
        .filter(Option::is_some)
        .map(Option::unwrap)
        .min()
    } else if !loop_expr.is_empty() {
      let traces = loop_expr.into_iter().map(|expr| expr.rank());
      if let Some(Some(trace)) = traces.min() {
        Some(Atom::Loop(trace))
      } else {
        None
      }
    } else if !conststr.is_empty() {
      conststr.sort_by(|lhs, rhs| lhs.len().cmp(&rhs.len()));
      Some(Atom::ConstStr(conststr.first().unwrap().to_string()))
    } else {
      None
    }
  }
}

impl PositionSet {
  fn rank(pos: Vec<PositionSet>) -> Option<Position> {
    let subpos = pos
      .iter()
      .map(|sub| {
        if let PositionSet::Pos(r1, r2, ie) = sub {
          if let Some(r1) = RegExpSet::rank(r1) {
            if let Some(r2) = RegExpSet::rank(r2) {
              let loop_pos = ie.iter().find(|e| {
                if let IntegerExpr::Loop(_, _) = e {
                  true
                } else {
                  false
                }
              });

              if loop_pos.is_some() {
                loop_pos.map(|e| {
                  if let IntegerExpr::Loop(k1, k2) = e {
                    Position::LoopPos(r1, r2, *k1, *k2)
                  } else {
                    panic!();
                  }
                })
              } else if !ie.is_empty() {
                if let IntegerExpr::Pos(k) = ie.first().unwrap() {
                  Some(Position::Pos(r1, r2, *k))
                } else {
                  None
                }
              } else {
                None
              }
            } else {
              None
            }
          } else {
            None
          }
        } else {
          None
        }
      })
      .filter(Option::is_some)
      .map(Option::unwrap)
      .min();

    if subpos.is_some() {
      subpos
    } else {
      // CPos
      pos
        .iter()
        .filter_map(|cpos| match cpos {
          PositionSet::CPos(p) => Some(*p),
          PositionSet::Pos(_, _, _) => None,
        })
        .max()
        .map(|k| Position::CPos(k))
    }
  }
}

impl RegExpSet {
  fn rank(rset: &RegExpSet) -> Option<RegExp> {
    rset
      .tokens
      .iter()
      .map(|tokens| RegExp::new(tokens.clone()))
      .min()
  }
}