use std::collections::HashMap;

use super::{AtomSet, Dag, ExprSet, PositionSet, RegExpSet};

impl ExprSet {
  pub fn size(&self) -> usize {
    let switches = &self.switches;
    switches
      .into_iter()
      .fold(1, |res, switch| res * switch.trace.size())
  }
}

impl Dag {
  fn reverse(&self) -> Dag {
    let mut new_dag = Dag::new(self.size(), self.end(), self.start());
    for u in 0..self.len() {
      for (v, f) in self.edge_of(u) {
        new_dag.add_edge(*v, u, f.clone());
      }
    }
    new_dag
  }

  fn dfs(&self, u: usize, cache: &mut HashMap<usize, usize>) -> usize {
    if u == self.end() {
      return 1;
    }
    if let Some(sz) = cache.get(&u) {
      return *sz;
    }
    let mut sum = 0 as usize;
    for (to, f) in self.edge_of(u) {
      sum += self.dfs(*to, cache) * f.size();
    }
    cache.insert(u, sum);
    sum
  }

  pub fn size(&self) -> usize {
    self.reverse().dfs(self.end(), &mut HashMap::new())
  }
}

impl AtomSet {
  pub fn size(&self) -> usize {
    match self {
      AtomSet::LoopSet(e) => e.size(),
      AtomSet::SubStrSet(_, pj, pk) => pj.size() * pk.size(),
      AtomSet::ConstStr(_) => 1,
      AtomSet::Empty => 0,
    }
  }
}

impl PositionSet {
  pub fn size(&self) -> usize {
    match self {
      PositionSet::CPos(_) => 1,
      PositionSet::Pos(r1, r2, _) => todo!(),
      PositionSet::Empty => 0,
    }
  }
}

impl RegExpSet {
  pub fn size(&self) -> usize {
    let tokens = &self.tokens;
    tokens.iter().fold(1, |res, token| res * 1)
  }
}
