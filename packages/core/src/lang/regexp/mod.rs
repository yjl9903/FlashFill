mod semantic;

pub use super::{CharItem, CharItems};
use crate::CharItem::Char;

#[derive(Debug, Clone)]
pub struct RegExp {
  tokens: Vec<Token>,
}

#[derive(Debug, Clone)]
pub enum Token {
  Chars(CharClass),
  NotChars(CharClass),
  Special(SpecialToken),
}

#[derive(Debug, Clone)]
pub enum CharClass {
  Numeric,
  Alphabet,
  Lowercase,
  Uppercase,
  AlphaNumeric,
  Whitespace,
  All,
}

#[derive(Debug, Clone)]
pub enum SpecialToken {
  Start,
  End,
  Punctuation(char),
}

#[derive(Debug)]
pub struct Match(usize, RegExp, usize);

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

  pub fn empty() -> RegExp {
    RegExp { tokens: Vec::new() }
  }

  pub fn is_empty(&self) -> bool {
    self.tokens.is_empty()
  }
}

impl Token {
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
}

impl From<Token> for RegExp {
  fn from(token: Token) -> Self {
    RegExp {
      tokens: vec![token],
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
