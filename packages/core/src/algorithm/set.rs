use std::{
  collections::{HashMap, HashSet, LinkedList},
  rc::Rc,
};

use crate::{Bool, CharItems, Token};

use super::SizeType;

#[derive(Debug)]
pub struct ExprSet {
  pub switches: Vec<SwitchSet>,
}

#[derive(Debug)]
pub struct SwitchSet {
  pub condition: Bool,
  pub trace: Dag,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Dag {
  size: usize,
  start: usize,
  end: usize,
  edge: HashMap<usize, HashMap<usize, Vec<AtomSet>>>,
  rev_edge: HashMap<usize, HashSet<usize>>,
  pub(super) cache_size: Option<SizeType>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum AtomSet {
  LoopSet(Dag),
  SubStrSet(usize, Vec<PositionSet>, Vec<PositionSet>),
  ConstStr(CharItems),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PositionSet {
  CPos(i32),
  Pos(RegExpSet, RegExpSet, Vec<IntegerExpr>),
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum IntegerExpr {
  Pos(i32),
  Loop(i32, i32),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RegExpSet {
  pub tokens: Vec<Rc<Vec<Token>>>,
}

impl Dag {
  pub fn new(size: usize, start: usize, end: usize) -> Dag {
    Dag {
      size,
      start,
      end,
      edge: HashMap::new(),
      rev_edge: HashMap::new(),
      cache_size: None,
    }
  }

  pub fn empty() -> Dag {
    Dag {
      size: 1,
      start: 0,
      end: 0,
      edge: HashMap::new(),
      rev_edge: HashMap::new(),
      cache_size: None,
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

  pub fn minimize(&self) -> Dag {
    let mut visited_forward: HashSet<usize> = HashSet::new();
    let mut visited_backward: HashSet<usize> = HashSet::new();
    {
      let mut queue: LinkedList<usize> = LinkedList::new();
      queue.push_back(self.start);
      while let Some(cur) = queue.pop_front() {
        visited_forward.insert(cur);
        for (to, _) in self.edge_of(cur) {
          if !visited_forward.contains(to) {
            queue.push_back(to.clone());
          }
        }
      }
    }
    {
      let mut queue: LinkedList<usize> = LinkedList::new();
      queue.push_back(self.end);
      while let Some(cur) = queue.pop_front() {
        visited_backward.insert(cur);
        for (to, _) in self.in_edge_of(cur) {
          if !visited_backward.contains(to) {
            queue.push_back(to.clone());
          }
        }
      }
    }
    let visited: HashMap<usize, usize> = visited_forward
      .iter()
      .cloned()
      .filter(|v| visited_backward.contains(v))
      .enumerate()
      .map(|(val, key)| (key, val))
      .collect();
    if let Some(start) = visited.get(&self.start) {
      if let Some(end) = visited.get(&self.end) {
        let mut dag = Dag::new(visited.len(), *start, *end);
        for (old_from, from) in visited.iter() {
          for (old_to, f) in self.edge_of(*old_from) {
            if let Some(to) = visited.get(old_to) {
              for atomset in f {
                dag.add_edge(*from, *to, atomset.clone());
              }
            }
          }
        }
        dag
      } else {
        Dag::empty()
      }
    } else {
      Dag::empty()
    }
  }
}

impl RegExpSet {
  pub fn new(tokens: Vec<Vec<Token>>) -> RegExpSet {
    RegExpSet {
      tokens: tokens.into_iter().map(|tokens| Rc::new(tokens)).collect(),
    }
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
