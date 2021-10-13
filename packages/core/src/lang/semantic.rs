use super::{Atom, Bool, CharItem, CharItems, Conjunct, Expr, Predicate, Switch, Trace};

pub struct ExprRunContext<'a> {
  input: &'a Vec<CharItems>,
  result: &'a mut Vec<char>,
  loop_index: usize,
}

pub struct ExprRunError(String);

impl<'a> ExprRunContext<'a> {
  fn new(input: &'a Vec<CharItems>, result: &'a mut Vec<char>) -> ExprRunContext<'a> {
    ExprRunContext {
      input,
      result,
      loop_index: 1,
    }
  }

  fn index<'b>(&'b mut self, index: usize) -> ExprRunContext<'b> {
    ExprRunContext {
      input: self.input,
      result: self.result,
      loop_index: index,
    }
  }
}

impl Expr {
  pub fn run(&self, input: &Vec<String>) -> String {
    let input: &Vec<CharItems> = &input.iter().map(|text| text.into()).collect();
    let mut result: Vec<char> = Vec::new();
    for Switch { condition, trace } in &self.switches {
      let mut context = ExprRunContext::new(input, &mut result);
      if condition.test(&context) {
        if let Err(_) = trace.run(&mut context) {
          panic!()
        }
        return result.iter().collect();
      }
    }
    panic!("Expr must have a default branch");
  }

  pub fn run_sub(&self, context: &mut ExprRunContext) -> Result<(), ExprRunError> {
    for Switch { condition, trace } in &self.switches {
      if condition.test(context) {
        trace.run(context)?;
      }
      return Ok(());
    }
    Err(ExprRunError("No matched branch".into()))
  }
}

impl Trace {
  pub fn run(&self, context: &mut ExprRunContext) -> Result<(), ExprRunError> {
    for atom in &self.atoms {
      atom.run(context)?;
    }
    Ok(())
  }
}

impl Atom {
  pub fn run(&self, context: &mut ExprRunContext) -> Result<(), ExprRunError> {
    match self {
      Atom::SubStr { index, left, right } => {
        let input = context.input;
        let input = &input[*index];
        let left = left.get(input, context.loop_index);
        let right = right.get(input, context.loop_index);
        if let Some(left) = left {
          if let Some(right) = right {
            for i in left..right {
              if let CharItem::Char(c) = input[i] {
                context.result.push(c);
              } else {
                // start or end here
              }
            }
            return Ok(());
          }
        }
        // no match here
        Err(ExprRunError("No matched SubStr position".into()))
      }
      Atom::ConstStr(text) => {
        text.chars().for_each(|c| context.result.push(c));
        Ok(())
      }
      Atom::Loop(sub_expr) => {
        for i in 1.. {
          let mut sub_context = context.index(i);
          if let Err(_) = sub_expr.run_sub(&mut sub_context) {
            break;
          }
        }
        Err(ExprRunError("Unsupport operation".into()))
      }
    }
  }
}

impl Bool {
  pub fn test(&self, context: &ExprRunContext) -> bool {
    for conj in &self.disjunct {
      if conj.test(context) {
        return true;
      }
    }
    false
  }
}

impl Conjunct {
  pub fn test(&self, context: &ExprRunContext) -> bool {
    for pred in &self.predicate {
      if !pred.test(context) {
        return false;
      }
    }
    true
  }
}

impl Predicate {
  pub fn test(&self, context: &ExprRunContext) -> bool {
    match self {
      Predicate::True => true,
      Predicate::False => false,
      Predicate::MatchPredicate(mat) => mat.test(context.input),
      Predicate::NotMatchPredicate(mat) => !mat.test(context.input),
    }
  }
}
