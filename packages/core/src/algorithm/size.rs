use std::collections::{HashMap, HashSet};

use crate::Token;

use super::{AtomSet, Dag, ExprSet, PositionSet, RegExpSet};

pub type SizeType = u128;

// impl ExprSet {
//   pub fn size(&self) -> SizeType {
//     let switches = &self.switches;
//     switches
//       .into_iter()
//       .fold(1, |res, switch| res * switch.trace.size())
//   }
// }

impl Dag {
  fn dfs(&self, u: usize, cache: &mut HashMap<usize, SizeType>) -> SizeType {
    if u == self.start() {
      return 1;
    }
    if let Some(sz) = cache.get(&u) {
      return *sz;
    }
    let mut sum: SizeType = 0;
    for (to, f) in self.in_edge_of(u) {
      let fsize: SizeType = f.iter().map(|f| f.size()).sum();
      sum += self.dfs(*to, cache) * fsize;
    }
    cache.insert(u, sum);
    sum
  }

  pub fn size(&self) -> SizeType {
    self.dfs(self.end(), &mut HashMap::new())
  }
}

impl AtomSet {
  pub fn size(&self) -> SizeType {
    match self {
      AtomSet::LoopSet(e) => e.size(),
      AtomSet::SubStrSet(_, pj, pk) => {
        let jsize: SizeType = pj.iter().map(|p| p.size()).sum();
        let ksize: SizeType = pk.iter().map(|p| p.size()).sum();
        jsize * ksize
      }
      AtomSet::ConstStr(_) => 1,
    }
  }
}

impl PositionSet {
  pub fn size(&self) -> SizeType {
    match self {
      PositionSet::CPos(_) => 1,
      PositionSet::Pos(r1, r2, c) => r1.size() * r2.size() * c.len() as SizeType,
    }
  }
}

impl RegExpSet {
  pub fn size(&self) -> SizeType {
    let tokens = &self.tokens;
    tokens
      .iter()
      .fold(1, |res, tokens| res * RegExpSet::tokens_size(tokens))
  }

  fn tokens_size(tokens: &Vec<Token>) -> SizeType {
    let mut set: HashSet<Token> = HashSet::new();
    for token in tokens {
      for token in token.norm() {
        set.insert(token);
      }
    }
    set.iter().map(|token| token.size() as SizeType).sum()
  }
}
