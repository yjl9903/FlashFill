mod intersect;
mod rank;
mod set;
mod size;

pub(crate) use set::*;
// pub(crate) use intersect::*;
// pub(crate) use size::*;

use crate::{CharItems, Expr, RegExp, SplitResult, Token};

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

  let expr = generate_string_program(examples.clone());

  if let Some(expr) = expr {
    println!("{:?}", expr);

    result
      .into_iter()
      .enumerate()
      .map(|(index, res)| res.unwrap_or_else(|| expr.run(&input[index])))
      .collect()
  } else {
    Vec::new()
  }
}

fn generate_string_program(examples: Vec<(Vec<CharItems>, CharItems)>) -> Option<Expr> {
  println!("Start gen");
  let mut dags: Vec<Dag> = Vec::new();
  for (input, output) in examples {
    dags.push(generate_str(&input, &output));
  }
  println!("End gen");
  let dag = dags.remove(0);
  dag.rank().map(|t| Expr::single(t))
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
  dag.minimize()
}

fn generate_substring(input: &Vec<CharItems>, output: &CharItems) -> Vec<AtomSet> {
  println!("start substring {:?}", output);
  let mut result: Vec<AtomSet> = Vec::new();
  for (index, text) in input.iter().enumerate() {
    for i in 0..text.len() {
      if i + output.len() > text.len() {
        break;
      }
      // i .. i + output.len()
      // cache (index, i) position
      let y1 = generate_position(text, i);
      let y2 = generate_position(text, i + output.len());
      result.push(AtomSet::SubStrSet(index, y1, y2));
    }
  }
  // sort atomset
  result
}

fn generate_position(input: &CharItems, k: usize) -> Vec<PositionSet> {
  let mut result = vec![
    PositionSet::CPos(k as i32),
    PositionSet::CPos(-(input.len() as i32 - k as i32)),
  ];
  let mut reg_left: Vec<RegExp> = vec![RegExp::empty()];
  let mut reg_right: Vec<RegExp> = vec![RegExp::empty()];
  for i in (0..k).rev() {
    let input = &input[i..k];
    let reg = RegExp::generate(&input.into());
    if *reg_left.last().unwrap() != reg {
      reg_left.push(reg);
    }
  }
  for i in k + 1..input.len() {
    let input = &input[k..i];
    let reg = RegExp::generate(&input.into());
    if *reg_right.last().unwrap() != reg {
      reg_right.push(reg);
    }
  }
  let grouped = Token::split(input);
  for r1 in reg_left.iter() {
    for r2 in reg_right.iter() {
      if !r1.is_empty() && !r2.is_empty() && r1.tokens.last().unwrap() == r2.tokens.first().unwrap()
      {
        continue;
      }
      let reg = RegExp::concat(r1.clone(), r2.clone());
      let matched: Vec<(usize, usize)> = reg.run(input).collect();
      let pos = matched.binary_search(&(k, k)).map_or_else(|k| k, |k| k);

      fn try_get(r: Option<&(usize, usize)>, k: usize) -> Option<(usize, usize)> {
        match r {
          Some((l, r)) => {
            if *l <= k && k < *r {
              Some((*l, *r))
            } else {
              None
            }
          }
          None => None,
        }
      }

      if let Some(_) = try_get(matched.get(pos), k)
        .or_else(|| {
          if pos > 0 {
            try_get(matched.get(pos - 1), k)
          } else {
            None
          }
        })
        .or_else(|| try_get(matched.get(pos + 1), k))
      {
        let r1 = generate_regex(r1, &grouped);
        let r2 = generate_regex(r2, &grouped);
        result.push(PositionSet::Pos(
          r1,
          r2,
          vec![
            IntegerExpr::Pos(pos as i32 + 1),
            IntegerExpr::Pos(-(matched.len() as i32 - pos as i32)),
          ],
        ));
      }
    }
  }
  // sort position set
  result
}

fn generate_regex(reg: &RegExp, grouped: &SplitResult) -> RegExpSet {
  RegExpSet {
    tokens: reg
      .iter()
      .map(|token| grouped.get(token).unwrap().clone())
      .collect(),
  }
}
