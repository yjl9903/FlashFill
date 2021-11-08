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

  pub fn size(&self) -> SizeType {
    self.size
  }

  pub fn intersect(&self, other: &PartitionItem) -> Dag {
    Dag::intersect(&self.trace, &other.trace)
  }

  pub fn merge(self, mut other: PartitionItem, index: usize, trace: Dag) -> PartitionItem {
    let mut inputs = self.inputs;
    inputs.append(&mut other.inputs);

    PartitionItem {
      index,
      inputs,
      size: trace.size(),
      trace,
    }
  }
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
  let mut next_index = all_traces.len();
  let mut cache_intersect: HashMap<(usize, usize), Option<Dag>> = HashMap::new();
  let mut cache_rank: HashMap<(usize, usize), (usize, f64)> = HashMap::new();

  for i in 0..all_traces.len() {
    for j in i + 1..all_traces.len() {
      let ta = &all_traces[i];
      let tb = &all_traces[j];
      let result = ta.intersect(tb);
      if result.size() > 0 {
        cache_intersect.insert((ta.index(), tb.index()), Some(result));
      } else {
        cache_intersect.insert((ta.index(), tb.index()), None);
      }
    }
  }

  let mut cache_partition: HashMap<usize, PartitionItem> =
    all_traces.into_iter().map(|f| (f.index(), f)).collect();

  fn calc_cs(
    cache_partition: &HashMap<usize, PartitionItem>,
    cache_intersect: &HashMap<(usize, usize), Option<Dag>>,
    pair: (&PartitionItem, &PartitionItem),
    dag: &Dag,
  ) -> (usize, f64) {
    let get_intersect = |i: usize, j: usize| {
      let x = std::cmp::min(i, j);
      let y = std::cmp::max(i, j);
      if let Some(Some(dag)) = cache_intersect.get(&(x, y)) {
        Some(dag)
      } else {
        None
      }
    };

    let is_comp = |i: usize, j: usize| get_intersect(i, j).map_or_else(|| false, |_| true);

    let cs1 = cache_partition
      .values()
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
  }

  for ((x, y), dag) in cache_intersect.iter() {
    if let Some(dag) = dag {
      let x = cache_partition.get(x).unwrap();
      let y = cache_partition.get(y).unwrap();
      let rank = calc_cs(&cache_partition, &cache_intersect, (x, y), dag);
      cache_rank.insert((x.index(), y.index()), rank);
    }
  }

  fn select_merge(
    cache_partition: &HashMap<usize, PartitionItem>,
    cache_rank: &HashMap<(usize, usize), (usize, f64)>,
    cache_intersect: &HashMap<(usize, usize), Option<Dag>>,
  ) -> Option<(usize, usize)> {
    let mut all_traces: Vec<&PartitionItem> = cache_partition.values().collect();
    all_traces.sort_by_key(|t| t.index());
    let mut ans = (0 as usize, 0.0);
    let mut pos: Option<(usize, usize)> = None;
    for i in 0..all_traces.len() {
      for j in i + 1..all_traces.len() {
        let ta = &all_traces[i];
        let tb = &all_traces[j];
        if let Some(Some(_)) = cache_intersect.get(&(ta.index(), tb.index())) {
          let cur = cache_rank.get(&(ta.index(), tb.index()));
          if let Some(cur) = cur {
            if *cur > ans {
              ans = *cur;
              pos = Some((ta.index(), tb.index()));
            }
          }
        }
      }
    }
    pos
  }

  while let Some((x, y)) = select_merge(&cache_partition, &cache_rank, &cache_intersect) {
    let tx = cache_partition.remove(&x).unwrap();
    let ty = cache_partition.remove(&y).unwrap();
    let dag = cache_intersect
      .remove(&(tx.index(), ty.index()))
      .unwrap()
      .unwrap();
    cache_intersect = cache_intersect
      .into_iter()
      .filter(|&((l, r), _)| l != x && l != y && r != x && r != y)
      .collect();
    cache_rank = cache_rank
      .into_iter()
      .filter(|&((l, r), _)| l != x && l != y && r != x && r != y)
      .collect();

    let cur_index = next_index;
    next_index = next_index + 1;

    let merged = tx.merge(ty, cur_index, dag);
    for pat in cache_partition.values() {
      let result = merged.intersect(pat);
      if result.size() > 0 {
        let rank = calc_cs(&cache_partition, &cache_intersect, (pat, &merged), &result);
        cache_intersect.insert((pat.index(), merged.index()), Some(result));
        cache_rank.insert((pat.index(), merged.index()), rank);
      } else {
        cache_intersect.insert((pat.index(), merged.index()), None);
      }
    }
    cache_partition.insert(merged.index(), merged);
  }

  cache_partition.into_values().collect()
}
