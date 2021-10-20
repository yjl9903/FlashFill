use super::super::{Bool, Token};

pub struct ExprSet {
  pub switches: Vec<SwitchSet>,
}

pub struct SwitchSet {
  pub condition: Bool,
  pub trace: Dag,
}

#[derive(Clone)]
pub struct Dag {
  start: usize,
  end: usize,
  edge: Vec<Vec<(usize, AtomSet)>>,
}

#[derive(Clone)]
pub enum AtomSet {
  LoopSet(Dag),
  SubStrSet(usize, PositionSet, PositionSet),
  ConstStr(String),
  Empty,
}

#[derive(Clone)]
pub enum PositionSet {
  CPos(i32),
  Pos(RegExpSet, RegExpSet, Vec<IntegerExpr>),
  Empty,
}

#[derive(Clone, PartialEq, Eq, Hash)]
pub enum IntegerExpr {
  Pos(i32),
  Loop(i32, i32),
}

#[derive(Clone)]
pub struct RegExpSet {
  pub tokens: Vec<Vec<Token>>,
}

impl Dag {
  pub fn new(size: usize, start: usize, end: usize) -> Dag {
    Dag {
      start,
      end,
      edge: vec![Vec::new(); size],
    }
  }

  pub fn start(&self) -> usize {
    self.start
  }

  pub fn end(&self) -> usize {
    self.end
  }

  pub fn len(&self) -> usize {
    self.edge.len()
  }

  pub fn edge_of(&self, node: usize) -> &Vec<(usize, AtomSet)> {
    self.edge.get(node).unwrap()
  }

  pub fn add_edge(&mut self, from: usize, to: usize, atomset: AtomSet) {
    self.edge[from].push((to, atomset))
  }
}

impl RegExpSet {
  pub fn new(tokens: Vec<Vec<Token>>) -> RegExpSet {
    RegExpSet { tokens }
  }

  pub fn empty() -> RegExpSet {
    RegExpSet { tokens: Vec::new() }
  }

  pub fn len(&self) -> usize {
    self.tokens.len()
  }

  pub fn get(&self, index: usize) -> &Vec<Token> {
    &self.tokens[index]
  }
}
