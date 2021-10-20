mod intersect;
mod set;
mod size;

pub(crate) use set::*;
// pub(crate) use intersect::*;
// pub(crate) use size::*;

pub fn run(input: Vec<Vec<String>>, result: Vec<Option<String>>) -> Vec<String> {
  let examples: Vec<(Vec<String>, String)> = result
    .iter()
    .enumerate()
    .filter(|(_, res)| res.is_some())
    .map(|(index, res)| (input[index].clone(), res.clone().unwrap()))
    .collect();

  examples.iter().map(|(_, result)| result.clone()).collect()
}
