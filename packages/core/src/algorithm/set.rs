use std::collections::{HashMap, HashSet};

use crate::CharItems;

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
  size: usize,
  start: usize,
  end: usize,
  edge: HashMap<usize, HashMap<usize, Vec<AtomSet>>>,
  rev_edge: HashMap<usize, HashSet<usize>>,
}

#[derive(Clone)]
pub enum AtomSet {
  LoopSet(Dag),
  SubStrSet(usize, Vec<PositionSet>, Vec<PositionSet>),
  ConstStr(CharItems),
}

#[derive(Clone)]
pub enum PositionSet {
  CPos(i32),
  Pos(RegExpSet, RegExpSet, Vec<IntegerExpr>),
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
      size,
      start,
      end,
      edge: HashMap::new(),
      rev_edge: HashMap::new(),
    }
  }

  pub fn len(&self) -> usize {
    self.size
  }

  pub fn start(&self) -> usize {
    self.start
  }

  pub fn end(&self) -> usize {
    self.end
  }

  pub fn edge_of(&self, node: usize) -> Vec<(&usize, &Vec<AtomSet>)> {
    match self.edge.get(&node) {
      Some(out_edge) => out_edge.iter().collect(),
      None => Vec::new(),
    }
  }

  pub fn in_edge_of(&self, node: usize) -> Vec<(&usize, &Vec<AtomSet>)> {
    match self.rev_edge.get(&node) {
      Some(in_edges) => in_edges
        .iter()
        .map(|pred| (pred, &self.edge[pred][&node]))
        .collect(),
      None => Vec::new(),
    }
  }

  pub fn add_edge(&mut self, from: usize, to: usize, atomset: AtomSet) {
    if !self.edge.contains_key(&from) {
      self.edge.insert(from, HashMap::new());
    }
    let out_edges: &mut HashMap<usize, Vec<AtomSet>> = self.edge.get_mut(&from).unwrap();
    if !out_edges.contains_key(&to) {
      out_edges.insert(to, Vec::new());
    }
    let atoms = out_edges.get_mut(&to).unwrap();
    atoms.push(atomset);

    if !self.rev_edge.contains_key(&to) {
      self.rev_edge.insert(to, HashSet::new());
    }
    let rev_edges = self.rev_edge.get_mut(&to).unwrap();
    rev_edges.insert(from);
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
