use super::{CharClass, CharItem, CharItems, Match, Position, RegExp, Token};

pub struct RegExpMatches<'a> {
  regexp: &'a RegExp,
  items: &'a CharItems,
  start: usize,
}

impl RegExpMatches<'_> {
  fn new<'a>(regexp: &'a RegExp, items: &'a CharItems) -> RegExpMatches<'a> {
    RegExpMatches {
      regexp,
      items,
      start: 0,
    }
  }
}

impl Iterator for RegExpMatches<'_> {
  type Item = (usize, usize);

  fn next(&mut self) -> Option<Self::Item> {
    if self.regexp.is_empty() {
      if self.start < self.items.len() {
        let result = Some((self.start, self.start));
        self.start = self.start + 1;
        return result;
      } else {
        return None;
      }
    }

    let tokens = &self.regexp.tokens;
    let items = self.items;
    while self.start < items.len() {
      let mut pt = self.start;
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
        let result = Some((self.start, pt));
        self.start = core::cmp::max(pt, self.start + 1);
        return result;
      }
      self.start = core::cmp::max(pt, self.start + 1);
    }

    return None;
  }
}

impl RegExp {
  /**
   * find all match range
   */
  pub fn run<'a>(&'a self, input: &'a CharItems) -> RegExpMatches {
    RegExpMatches::new(self, input)
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

    if *k == 0 {
      return true;
    }

    if regexp.is_empty() {
      return true;
    }

    let input = &input[*index];
    if let Some(_) = regexp.run(input).nth(*k - 1) {
      true
    } else {
      false
    }
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
  assert!(str.len() >= 2);
  assert_ne!(k, 0);

  let mut matched = 0;
  let mut positions: Vec<usize> = Vec::new();

  let mut m1 = r1.run(str).peekable();
  let mut m2 = r2.run(str).peekable();
  while let (Some(cur1), Some(cur2)) = (m1.peek(), m2.peek()) {
    if cur1.1 == cur2.0 {
      matched = matched + 1;
      positions.push(cur1.1);
      if matched == k {
        return Some(cur1.1);
      }
      m1.next();
      m2.next();
    } else if cur1.1 < cur2.0 {
      m1.next();
    } else {
      m2.next();
    }
  }

  if k > 0 {
    None
  } else {
    let k = positions.len() as i32 + k;
    match positions.get(k as usize) {
      Some(k) => Some(*k),
      None => None,
    }
  }
}

#[cfg(test)]
mod regexp_test {
  use super::*;

  #[test]
  fn test_regexp() {
    let input = &String::from("123a456b789c");

    let regexp = RegExp::new(vec![Token::numeric()]);
    assert_eq!(regexp.run(&input.into()).next(), Some((1, 4)));

    let regexp = RegExp::new(vec![Token::numeric(), Token::alphabet()]);
    assert_eq!(regexp.run(&input.into()).next(), Some((1, 5)));

    let regexp = RegExp::new(vec![Token::alphabet()]);
    assert_eq!(regexp.run(&input.into()).next(), Some((4, 5)))
  }

  #[test]
  fn test_empty_regexp() {
    let input = &String::from("123");
    let regexp = RegExp::new(vec![]);
    assert_eq!(regexp.run(&input.into()).next(), Some((0, 0)));
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
    assert_eq!(pos.get(&text.into(), Default::default()), Some(4));
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
