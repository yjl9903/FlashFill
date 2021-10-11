mod item;

use self::item::{CharItem, CharItems};

pub struct RegExp {
  tokens: Vec<Token>,
}

pub enum Token {
  Chars(CharClass),
  NotChars(CharClass),
  Special(SpecialToken),
}

pub enum CharClass {
  Numeric,
  Alphabet,
  Lowercase,
  Uppercase,
  AlphaNumeric,
  Whitespace,
  All,
}

pub enum SpecialToken {
  Start,
  End,
  Punctuation(char),
}

pub struct Match(usize, RegExp, usize);

pub enum Position {
  CPos(i32),
  Pos(RegExp, RegExp, i32),
}

impl RegExp {
  pub fn new(tokens: Vec<Token>) -> RegExp {
    RegExp { tokens }
  }

  pub fn is_empty(&self) -> bool {
    self.tokens.is_empty()
  }

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
  pub fn testPrefix(&self, input: &CharItems) -> bool {
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
  pub fn testSuffix(&self, input: &CharItems) -> bool {
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
        Token::Special(special) => match special {
          SpecialToken::Start => false,
          SpecialToken::End => false,
          SpecialToken::Punctuation(p) => c == *p,
        },
      },
      CharItem::Start => {
        if let Token::Special(SpecialToken::Start) = self {
          true
        } else {
          false
        }
      }
      CharItem::End => {
        if let Token::Special(SpecialToken::End) = self {
          true
        } else {
          false
        }
      }
    }
  }

  pub fn start() -> Token {
    Token::Special(SpecialToken::Start)
  }

  pub fn end() -> Token {
    Token::Special(SpecialToken::End)
  }

  pub fn punctuation(c: char) -> Token {
    Token::Special(SpecialToken::Punctuation(c))
  }

  pub fn numeric() -> Token {
    Token::Chars(CharClass::Numeric)
  }

  pub fn not_numeric() -> Token {
    Token::NotChars(CharClass::Numeric)
  }

  pub fn alphabet() -> Token {
    Token::Chars(CharClass::Alphabet)
  }

  pub fn not_alphabet() -> Token {
    Token::NotChars(CharClass::Alphabet)
  }

  pub fn lowercase() -> Token {
    Token::Chars(CharClass::Lowercase)
  }

  pub fn not_lowercase() -> Token {
    Token::NotChars(CharClass::Lowercase)
  }

  pub fn all() -> Token {
    Token::Chars(CharClass::All)
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
  fn test(&self, input: &Vec<CharItems>) -> bool {
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
  fn get(&self, str: &CharItems) -> Option<usize> {
    match self {
      Position::CPos(k) => {
        let k = *k;
        if k >= 0 {
          let k = k as usize;
          if k < str.len() {
            Some(k)
          } else {
            None
          }
        } else {
          let k = (str.len() as i32 + k) as usize;
          if k < str.len() {
            Some(k)
          } else {
            None
          }
        }
      }
      Position::Pos(r1, r2, k) => {
        let k = *k;
        let mut matched = 0;
        assert!(str.len() >= 2);
        assert!(k != 0);

        let range = if k > 0 {
          Box::new(1..str.len() - 1) as Box<dyn Iterator<Item = usize>>
        } else {
          Box::new((1..str.len() - 1).rev()) as Box<dyn Iterator<Item = usize>>
        };

        let k = if k > 0 { k } else { -k };

        for i in range {
          let left = &str[..i];
          let left = r1.testSuffix(&left.into());
          let right = &str[i..];
          let right = r2.testPrefix(&right.into());
          if left && right {
            matched = matched + 1;
          }
          if matched == k {
            return Some(i);
          }
        }
        return None;
      }
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
    assert_eq!(pos.get(&text.into()), Some(4));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, 2);
    assert_eq!(pos.get(&text.into()), Some(8));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, 3);
    assert_eq!(pos.get(&text.into()), Some(12));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, -3);
    assert_eq!(pos.get(&text.into()), Some(4));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, -2);
    assert_eq!(pos.get(&text.into()), Some(8));

    let r1 = RegExp::new(vec![Token::numeric()]);
    let r2 = RegExp::new(vec![Token::alphabet()]);
    let pos = Position::Pos(r1, r2, -1);
    assert_eq!(pos.get(&text.into()), Some(12));
  }

  #[test]
  fn test_pos_num_empty() {
    let text = &String::from("abc123d");

    let r1 = RegExp::new(vec![]);
    let r2 = RegExp::new(vec![Token::numeric()]);
    let pos = Position::Pos(r1, r2, 1);
    assert_eq!(pos.get(&text.into()), Some(4));

    let r1 = RegExp::new(vec![]);
    let r2 = RegExp::new(vec![Token::numeric()]);
    let pos = Position::Pos(r1, r2, -1);
    assert_eq!(pos.get(&text.into()), Some(6));
  }

  #[test]
  fn test_cpos() {
    let text = &String::from("abc123d");

    let cpos = Position::CPos(1);
    assert_eq!(cpos.get(&text.into()), Some(1));

    let cpos = Position::CPos(-2);
    assert_eq!(cpos.get(&text.into()), Some(7));
  }
}
