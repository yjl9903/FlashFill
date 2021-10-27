use std::collections::HashMap;

use crate::CharItems;

use super::{Dag, SizeType};

pub struct PartitionItem {
  index: usize,
  inputs: Vec<Vec<CharItems>>,
  trace: Dag,
  size: SizeType,
}

impl PartitionItem {
  pub fn index(&self) -> usize {
    self.index
  }

  pub fn own_trace(self) -> Dag {
    self.trace
  }

  pub fn trace(&self) -> &Dag {
    &self.trace
  }

  pub fn size(&mut self) -> SizeType {
    self.size
  }

  pub fn intersect(&self, other: &PartitionItem) -> Dag {
    Dag::intersect(&self.trace, &other.trace)
  }

  // pub fn merge(self, mut other: PartitionItem, index: usize) -> PartitionItem {
  //   let trace = Dag::intersect(&self.trace, &other.trace);
  //   let mut inputs = self.inputs;
  //   inputs.append(&mut other.inputs);

  //   PartitionItem {
  //     index,
  //     inputs,
  //     trace
  //   }
  // }
}

impl From<(usize, Vec<CharItems>, Dag)> for PartitionItem {
  fn from((index, input, trace): (usize, Vec<CharItems>, Dag)) -> Self {
    PartitionItem {
      index,
      inputs: vec![input],
      size: trace.size(),
      trace,
    }
  }
}

pub fn generate_partitions(all_traces: Vec<PartitionItem>) -> Vec<PartitionItem> {
  // let next_index = all_traces.len();
  let mut cache_intersect: HashMap<(usize, usize), Dag> = HashMap::new();
  // let mut cs_rank: HashMap<(usize, usize), (usize, f64)> = HashMap::new();

  for i in 0..all_traces.len() {
    for j in i + 1..all_traces.len() {
      let ta = &all_traces[i];
      let tb = &all_traces[j];
      let result = ta.intersect(tb);
      if result.size() > 0 {
        cache_intersect.insert((ta.index(), tb.index()), result);
      }
    }
  }

  let is_comp = |i: usize, j: usize| {
    if i < j {
      cache_intersect.contains_key(&(i, j))
    } else if i > j {
      cache_intersect.contains_key(&(j, i))
    } else {
      panic!();
    }
  };

  let calc_cs = |pair: (&mut PartitionItem, &mut PartitionItem), dag: &mut Dag| -> (usize, f64) {
    let cs1 = all_traces
      .iter()
      .map(|trace| {
        if trace.index() == pair.0.index() || trace.index() == pair.1.index() {
          0 as usize
        } else {
          let f1 = is_comp(trace.index(), pair.0.index());
          let f2 = is_comp(trace.index(), pair.1.index());
          if f1 == f2 {
            if f1 == (Dag::intersect(dag, &trace.trace()).size() > 0) {
              1
            } else {
              0
            }
          } else {
            0
          }
        }
      })
      .sum();

    let cs2 = dag.size() as f64 / std::cmp::max(pair.0.size(), pair.1.size()) as f64;

    (cs1, cs2)
  };

  // for i in 0 .. all_traces.len() {
  //   for j in i + 1 .. all_traces.len() {
  //     let ta = &mut all_traces[i];
  //     let tb = &mut all_traces[j];
  //     if is_comp(ta.index(), tb.index()) {
  //       // let cs = calc_cs((ta, tb), )
  //     }
  //   }
  // }

  todo!()
}
