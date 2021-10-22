mod intersect;
mod set;
mod size;

pub(crate) use set::*;
// pub(crate) use intersect::*;
// pub(crate) use size::*;

use crate::{CharItems, RegExp};

pub fn run(input: Vec<Vec<String>>, result: Vec<Option<String>>) -> Vec<String> {
  let examples: Vec<(Vec<CharItems>, CharItems)> = result
    .iter()
    .enumerate()
    .filter(|(_, res)| res.is_some())
    .map(|(index, res)| {
      let input: Vec<CharItems> = input[index].iter().map(|text| text.into()).collect();
      let result: CharItems = res.clone().unwrap().into();
      (input, result)
    })
    .collect();

  generate_string_program(examples);

  // examples.iter().map(|(_, result)| result.clone()).collect()
  vec![String::from("123")]
}

fn generate_string_program(examples: Vec<(Vec<CharItems>, CharItems)>) {
  let mut dags: Vec<Dag> = Vec::new();
  for (input, output) in examples {
    dags.push(generate_str(&input, &output));
  }
}

fn generate_str(input: &Vec<CharItems>, output: &CharItems) -> Dag {
  let mut dag = Dag::new(output.len(), 0, output.len() - 1);
  for i in 0..output.len() {
    for j in i + 1..output.len() {
      let const_str: CharItems = (&output[i..j]).into();
      for atomset in generate_substring(input, &const_str) {
        dag.add_edge(i, j, atomset)
      }
      dag.add_edge(i, j, AtomSet::ConstStr(const_str));
    }
  }
  dag
}

fn generate_substring(input: &Vec<CharItems>, output: &CharItems) -> Vec<AtomSet> {
  let mut result: Vec<AtomSet> = Vec::new();
  for (index, text) in input.iter().enumerate() {
    for i in 0..text.len() {
      if i + output.len() > text.len() {
        break;
      }
      // i .. i + output.len()
      let y1 = generate_position(text, i);
      let y2 = generate_position(text, i + output.len());
      result.push(AtomSet::SubStrSet(index, y1, y2));
    }
  }
  result
}

fn generate_position(input: &CharItems, k: usize) -> Vec<PositionSet> {
  let mut result = vec![
    PositionSet::CPos(k as i32),
    PositionSet::CPos(-(input.len() as i32 - k as i32)),
  ];
  let mut reg_left: Vec<(usize, RegExp)> = vec![(k, RegExp::empty())];
  let mut reg_right: Vec<(usize, RegExp)> = vec![(k, RegExp::empty())];
  for i in (0..k).rev() {
    let input = &input[i..k];
    let reg = RegExp::generate(&input.into());
    reg_left.push((i, reg));
  }
  for i in k + 1..input.len() {
    let input = &input[k..i];
    let reg = RegExp::generate(&input.into());
    reg_right.push((i, reg));
  }
  for (l, r1) in reg_left.iter() {
    for (r, r2) in reg_right.iter() {
      let r12 = RegExp::concat(r1.clone(), r2.clone());
      if let Some((index, (x, y))) = r12
        .run(input)
        .enumerate()
        .take_while(|(_, (x, y))| x <= l && y <= r)
        .last()
      {
        if *l == x && *r == y {
          let w = r12.run(input).count();
          let r1 = generate_regex(r1, input);
          let r2 = generate_regex(r2, input);
          result.push(PositionSet::Pos(
            r1,
            r2,
            vec![
              IntegerExpr::Pos(index as i32),
              IntegerExpr::Pos(-(w as i32 - index as i32)),
            ],
          ));
        }
      }
    }
  }
  result
}

fn generate_regex(_reg: &RegExp, _input: &CharItems) -> RegExpSet {
  todo!()
}
