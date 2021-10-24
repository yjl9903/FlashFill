mod semantic;

use std::collections::{HashMap, HashSet};

use super::{CharItem, CharItems};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RegExp {
  tokens: Vec<Token>,
}

const ALL_PUNCTUATION: &'static [char] = &[
  '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=',
  '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~',
];

const ALL_CHAR_SIZE: usize = 10 + 52 + 4 + ALL_PUNCTUATION.len();

#[derive(Debug, Clone, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub enum Token {
  Chars(CharClass),
  NotChars(CharClass),
  Start,
  End,
  Punctuation(char),
  NotPunctuation(char),
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub enum CharClass {
  Numeric,
  Alphabet,
  Lowercase,
  Uppercase,
  AlphaNumeric,
  Whitespace,
  All,
}

#[derive(Debug)]
pub struct Match(pub usize, pub RegExp, pub usize);

#[derive(Debug)]
pub enum Position {
  CPos(i32),
  /**
   * Pos(r1, r2, k)
   */
  Pos(RegExp, RegExp, i32),
  /**
   * Pos(r1, r2, k1, k2)
   * k = k1 * w + k2
   * where w is the loop index
   */
  LoopPos(RegExp, RegExp, i32, i32),
}

impl RegExp {
  pub fn new(tokens: Vec<Token>) -> RegExp {
    RegExp { tokens }
  }

  pub fn concat(mut r1: RegExp, mut r2: RegExp) -> RegExp {
    r1.tokens.append(&mut r2.tokens);
    RegExp::new(r1.tokens)
  }

  pub fn empty() -> RegExp {
    RegExp { tokens: Vec::new() }
  }

  pub fn is_empty(&self) -> bool {
    self.tokens.is_empty()
  }

  pub fn iter(&self) -> std::slice::Iter<Token> {
    self.tokens.iter()
  }
}

impl Token {
  pub fn start() -> Token {
    Token::Start
  }

  pub fn end() -> Token {
    Token::End
  }

  pub fn punctuation(p: char) -> Token {
    assert!(ALL_PUNCTUATION.contains(&p));
    Token::Punctuation(p)
  }

  pub fn not_punctuation(p: char) -> Token {
    assert!(ALL_PUNCTUATION.contains(&p));
    Token::NotPunctuation(p)
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

  pub fn uppercase() -> Token {
    Token::Chars(CharClass::Uppercase)
  }

  pub fn not_uppercase() -> Token {
    Token::NotChars(CharClass::Uppercase)
  }

  pub fn whitespace() -> Token {
    Token::Chars(CharClass::Whitespace)
  }

  pub fn not_whitespace() -> Token {
    Token::NotChars(CharClass::Whitespace)
  }

  pub fn all() -> Token {
    Token::Chars(CharClass::All)
  }

  pub fn size(&self) -> usize {
    match self {
      Token::Chars(class) => class.size(),
      Token::NotChars(class) => ALL_CHAR_SIZE - class.size(),
      Token::Start => 1,
      Token::End => 1,
      Token::Punctuation(_) => 1,
      Token::NotPunctuation(_) => ALL_CHAR_SIZE - 1,
    }
  }

  pub fn find_token(c: char) -> Token {
    if c.is_numeric() {
      Token::numeric()
    } else if c.is_lowercase() {
      Token::lowercase()
    } else if c.is_uppercase() {
      Token::uppercase()
    } else if c.is_whitespace() {
      Token::whitespace()
    } else if ALL_PUNCTUATION.contains(&c) {
      Token::punctuation(c)
    } else {
      Token::all()
    }
  }

  pub fn split(input: &CharItems) -> HashMap<Token, Vec<Token>> {
    let mut group: HashMap<Vec<usize>, Vec<Token>> = HashMap::new();

    [
      CharClass::Numeric,
      CharClass::Alphabet,
      CharClass::Lowercase,
      CharClass::Uppercase,
      CharClass::AlphaNumeric,
      CharClass::Whitespace,
      CharClass::All,
    ]
    .iter()
    .map(|class| [Token::Chars(class.clone()), Token::NotChars(class.clone())])
    .chain(
      ALL_PUNCTUATION
        .iter()
        .cloned()
        .map(|p| [Token::Punctuation(p), Token::NotPunctuation(p)]),
    )
    .chain([[Token::Start, Token::End]])
    .flatten()
    .for_each(|token| {
      let matched: Vec<usize> = input
        .iter()
        .enumerate()
        .filter(|(_, c)| token.test(**c))
        .map(|(index, _)| index)
        .collect();
      if !matched.is_empty() {
        if !group.contains_key(&matched) {
          group.insert(matched.clone(), Vec::new());
        }
        let group = group.get_mut(&matched).unwrap();
        group.push(token);
      }
    });

    group
      .values()
      .cloned()
      .map(|g| {
        g.iter()
          .map(|token| (token.clone(), g.clone()))
          .collect::<Vec<(Token, Vec<Token>)>>()
      })
      .flatten()
      .collect()
  }

  pub fn norm(&self) -> Vec<Token> {
    match self {
      Token::Chars(_) => vec![self.clone()],
      Token::NotChars(class) => {
        let all_punctuation = ALL_PUNCTUATION.iter().map(|p| Token::Punctuation(*p));
        let mut all_char: HashSet<CharClass> = [
          CharClass::Numeric,
          CharClass::Uppercase,
          CharClass::Lowercase,
          CharClass::Whitespace,
        ]
        .iter()
        .cloned()
        .collect();

        match class {
          CharClass::Numeric => {
            all_char.remove(&CharClass::Numeric);
          }
          CharClass::Alphabet => {
            all_char.remove(&CharClass::Lowercase);
            all_char.remove(&CharClass::Uppercase);
          }
          CharClass::Lowercase => {
            all_char.remove(&CharClass::Lowercase);
          }
          CharClass::Uppercase => {
            all_char.remove(&CharClass::Uppercase);
          }
          CharClass::AlphaNumeric => {
            all_char.remove(&CharClass::Numeric);
            all_char.remove(&CharClass::Lowercase);
            all_char.remove(&CharClass::Uppercase);
          }
          CharClass::Whitespace => {
            all_char.remove(&CharClass::Whitespace);
          }
          CharClass::All => {
            return vec![];
          }
        };

        all_char
          .iter()
          .map(|class| Token::Chars(class.clone()))
          .chain(all_punctuation)
          .collect()
      }
      Token::Start => vec![Token::Start],
      Token::End => vec![Token::End],
      Token::Punctuation(_) => vec![self.clone()],
      Token::NotPunctuation(p) => [
        Token::Chars(CharClass::Numeric),
        Token::Chars(CharClass::Lowercase),
        Token::Chars(CharClass::Uppercase),
        Token::Chars(CharClass::Whitespace),
      ]
      .iter()
      .cloned()
      .chain(
        ALL_PUNCTUATION
          .iter()
          .cloned()
          .filter(|q| *p != *q)
          .map(|q| Token::Punctuation(q)),
      )
      .collect(),
    }
  }
}

impl From<Token> for RegExp {
  fn from(token: Token) -> Self {
    RegExp {
      tokens: vec![token],
    }
  }
}

impl CharClass {
  pub fn size(&self) -> usize {
    match self {
      CharClass::Numeric => 10,
      CharClass::Alphabet => 52,
      CharClass::Lowercase => 26,
      CharClass::Uppercase => 26,
      CharClass::AlphaNumeric => 10 + 52,
      CharClass::Whitespace => 4, // '\r', '\n', '\t', ' '
      CharClass::All => ALL_CHAR_SIZE,
    }
  }
}

#[macro_export]
macro_rules! regexp {
  ( $( $x: expr ), * ) => {
    {
      let mut temp_vec: Vec<Token> = Vec::new();
      $(
        temp_vec.push($x);
      )*
      RegExp::new(temp_vec)
    }
  };
}
