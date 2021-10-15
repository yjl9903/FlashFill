use super::{CharClass, CharItem, CharItems, Match, Position, RegExp, Token};

impl RegExp {
  /**
   * find next math range
   */
  pub fn run(&self, input: &CharItems) -> Option<(usize, usize)> {
    if self.is_empty() {
      return Some((0, 0));
    }

    let tokens = &self.tokens;

    let items = input;
    for i in 0..items.len() {
      let mut pt = i;
      let mut cur = 0 as usize;
      while pt < items.len() && cur < tokens.len() {
        let token = &tokens[cur];
        let mut flag = false;
        while pt < items.len() && token.test(items[pt]) {
          flag = true;
          pt = pt + 1;
        }
        if !flag {
          break;
        }
        cur = cur + 1;
      }
      if cur == tokens.len() {
        return Some((i, pt));
      }
    }
    return None;
  }

  /**
   * test whether input prefix match the regexp
   */
  pub fn test_prefix(&self, input: &CharItems) -> bool {
    if self.is_empty() {
      return true;
    }

    let mut pt = 0 as usize;
    let mut cur = 0 as usize;
    while pt < input.len() && cur < self.tokens.len() {
      let token = &self.tokens[cur];
      let mut flag = false;
      while pt < input.len() && token.test(input[pt]) {
        flag = true;
        pt = pt + 1;
      }
      if !flag {
        break;
      }
      cur = cur + 1;
      if cur == self.tokens.len() {
        return true;
      }
    }

    false
  }

  /**
   * test whether input suffix match the regexp
   */
  pub fn test_suffix(&self, input: &CharItems) -> bool {
    if self.is_empty() {
      return true;
    }
    if input.is_empty() {
      return false;
    }

    let mut pt = (input.len() - 1) as i32;
    let mut cur = (self.tokens.len() - 1) as i32;

    while pt >= 0 && cur >= 0 {
      let token = &self.tokens[cur as usize];
      let mut flag = false;
      while pt >= 0 && token.test(input[pt as usize]) {
        flag = true;
        pt = pt - 1;
      }
      if !flag {
        break;
      }
      cur = cur - 1;
      if cur == -1 {
        return true;
      }
    }

    false
  }
}

impl Token {
  pub fn test(&self, c: CharItem) -> bool {
    match c {
      CharItem::Char(c) => match self {
        Token::Chars(class) => class.test(c),
        Token::NotChars(class) => !class.test(c),
        Token::Start => false,
        Token::End => false,
        Token::Punctuation(p) => c == *p,
      },
      CharItem::Start => {
        if let Token::Start = self {
          true
        } else {
          false
        }
      }
      CharItem::End => {
        if let Token::End = self {
          true
        } else {
          false
        }
      }
    }
  }
}

impl CharClass {
  fn test(&self, c: char) -> bool {
    match self {
      CharClass::Numeric => c.is_numeric(),
      CharClass::Alphabet => c.is_alphabetic(),
      CharClass::Lowercase => c.is_lowercase(),
      CharClass::Uppercase => c.is_uppercase(),
      CharClass::AlphaNumeric => c.is_alphanumeric(),
      CharClass::Whitespace => c.is_whitespace(),
      CharClass::All => true,
    }
  }
}

impl Match {
  pub fn test(&self, input: &Vec<CharItems>) -> bool {
    let Match(index, regexp, k) = self;

    if regexp.is_empty() {
      return true;
    }

    let input = &input[*index];
    let mut end = 0 as usize;
    let mut matched = 0 as usize;
    while end <= input.len() && matched < *k {
      let input = &input[end..];
      if let Some((_, right)) = regexp.run(&input.into()) {
        end = end + right;
        matched = matched + 1;
      } else {
        break;
      }
    }

    matched == *k
  }
}

impl Position {
  pub fn get(&self, input: &CharItems, loop_index: usize) -> Option<usize> {
    match self {
      Position::CPos(k) => {
        let k = *k;
        if k >= 0 {
          let k = k as usize;
          if k < input.len() {
            Some(k)
          } else {
            None
          }
        } else {
          let k = (input.len() as i32 + k) as usize;
          if k < input.len() {
            Some(k)
          } else {
            None
          }
        }
      }
      Position::Pos(r1, r2, k) => find_position(input, r1, r2, *k),
      Position::LoopPos(r1, r2, k1, k2) => {
        let loop_index = loop_index as i32;
        find_position(input, r1, r2, k1 * loop_index + k2)
      }
    }
  }
}

fn find_position(str: &CharItems, r1: &RegExp, r2: &RegExp, k: i32) -> Option<usize> {
  let mut matched = 0;
  assert!(str.len() >= 2);
  assert_ne!(k, 0);

  let range = if k > 0 {
    Box::new(1..str.len() - 1) as Box<dyn Iterator<Item = usize>>
  } else {
    Box::new((1..str.len() - 1).rev()) as Box<dyn Iterator<Item = usize>>
  };

  let k = if k > 0 { k } else { -k };

  for i in range {
    let left = &str[..i];
    let left = r1.test_suffix(&left.into());
    let right = &str[i..];
    let right = r2.test_prefix(&right.into());
    if left && right {
      matched = matched + 1;
    }
    if matched == k {
      return Some(i);
    }
  }

  return None;
}

#[cfg(test)]
mod regexp_test {
  use super::*;

  #[test]
  fn test_regexp() {
    let input = &String::from("123a456b789c");

    let regexp = RegExp::new(vec![Token::numeric()]);
    assert_eq!(regexp.run(&input.into()), Some((1, 4)));

    let regexp = RegExp::new(vec![Token::numeric(), Token::alphabet()]);
    assert_eq!(regexp.run(&input.into()), Some((1, 5)));

    let regexp = RegExp::new(vec![Token::alphabet()]);
    assert_eq!(regexp.run(&input.into()), Some((4, 5)))
  }

  #[test]
  fn test_empty_regexp() {
    let input = &String::from("123");
    let regexp = RegExp::new(vec![]);
    assert_eq!(regexp.run(&input.into()), Some((0, 0)));
  }
}

#[cfg(test)]
mod match_test {
  use super::*;

  #[test]
  fn test_match() {
    let text = &String::from("123a456b789c");
    let input: &Vec<CharItems> = &vec![text.into()];

    let regexp = RegExp::new(vec![Token::numeric()]);
    let m = Match(0, regexp, 0);
    assert!(m.test(input));

    let regexp = RegExp::new(vec![Token::numeric()]);
    let m = Match(0, regexp, 1);
    assert!(m.test(input));

    let regexp = RegExp::new(vec![Token::numeric()]);
    let m = Match(0, regexp, 2);
    assert!(m.test(input));

    let regexp = RegExp::new(vec![Token::numeric()]);
    let m = Match(0, regexp, 3);
    assert!(m.test(input));

    let regexp = RegExp::new(vec![Token::numeric()]);
    let m = Match(0, regexp, 4);
    assert!(!m.test(input));
  }

  #[test]
  fn test_empty_match() {
    let text = &String::from("123a456b789c");
    let input: &Vec<CharItems> = &vec![text.into()];
    let regexp = RegExp::new(vec![]);
    let m = Match(0, regexp, 1000);
    assert!(m.test(input));
  }
}

#[cfg(test)]
mod test_position {
  use super::*;

  #[test]
  fn test_pos() {
    let text = &String::from("123a456b789c");

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, 1);
    assert_eq!(pos.get(&text.into(), Default::default()), Some(4));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, 2);
    assert_eq!(pos.get(&text.into(), Default::default()), Some(8));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, 3);
    assert_eq!(pos.get(&text.into(), Default::default()), Some(12));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, -3);
    assert_eq!(pos.get(&text.into(), Default::default()), Some(4));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, -2);
    assert_eq!(pos.get(&text.into(), Default::default()), Some(8));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, -1);
    assert_eq!(pos.get(&text.into(), Default::default()), Some(12));
  }

  #[test]
  fn test_pos_num_empty() {
    let text = &String::from("abc123d");

    let r1 = RegExp::new(vec![]);
    let r2 = RegExp::new(vec![Token::numeric()]);
    let pos = Position::Pos(r1, r2, 1);
    assert_eq!(pos.get(&text.into(), Default::default()), Some(4));

    let r1 = RegExp::new(vec![]);
    let r2 = RegExp::new(vec![Token::numeric()]);
    let pos = Position::Pos(r1, r2, -1);
    assert_eq!(pos.get(&text.into(), Default::default()), Some(6));
  }

  #[test]
  fn test_cpos() {
    let text = &String::from("abc123d");

    let cpos = Position::CPos(1);
    assert_eq!(cpos.get(&text.into(), Default::default()), Some(1));

    let cpos = Position::CPos(-2);
    assert_eq!(cpos.get(&text.into(), Default::default()), Some(7));
  }
}
