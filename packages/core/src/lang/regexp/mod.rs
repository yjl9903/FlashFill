mod semantic;

pub use super::{CharItem, CharItems};

#[derive(Debug)]
pub struct RegExp {
  tokens: Vec<Token>,
}

#[derive(Debug)]
pub enum Token {
  Chars(CharClass),
  NotChars(CharClass),
  Special(SpecialToken),
}

#[derive(Debug)]
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
  Pos(RegExp, RegExp, i32),
  // LoopPos(RegExp, RegExp, i32, i32)
}

impl RegExp {
  pub fn new(tokens: Vec<Token>) -> RegExp {
    RegExp { tokens }
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

  pub fn all() -> Token {
    Token::Chars(CharClass::All)
  }
}
