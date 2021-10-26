use crate::{lang::regexp::ALL_PUNCTUATION, CharClass, Position, RegExp, Token};

impl Ord for Position {
  fn cmp(&self, other: &Self) -> std::cmp::Ordering {
    fn id(pos: &Position) -> usize {
      match pos {
        Position::LoopPos(_, _, _, _) => 0,
        Position::Pos(_, _, _) => 1,
        Position::CPos(_) => 2,
      }
    }

    let id_a = id(self);
    let id_b = id(other);

    if id_a != id_b {
      id_a.cmp(&id_b)
    } else {
      match (self, other) {
        (Position::CPos(cp1), Position::CPos(cp2)) => cp2.cmp(cp1),
        (Position::Pos(r11, r12, _), Position::Pos(r21, r22, _)) => {
          if r11 < r21 && r12 < r22 {
            std::cmp::Ordering::Less
          } else if r11 == r21 && r12 == r22 {
            std::cmp::Ordering::Equal
          } else {
            std::cmp::Ordering::Greater
          }
        }
        (Position::LoopPos(r11, r12, _, _), Position::LoopPos(r21, r22, _, _)) => {
          if r11 < r21 && r12 < r22 {
            std::cmp::Ordering::Less
          } else if r11 == r21 && r12 == r22 {
            std::cmp::Ordering::Equal
          } else {
            std::cmp::Ordering::Greater
          }
        }
        _ => panic!(),
      }
    }
  }
}

impl PartialOrd for Position {
  fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
    Some(self.cmp(other))
  }
}

impl Ord for RegExp {
  fn cmp(&self, other: &Self) -> std::cmp::Ordering {
    if self.len() != other.len() {
      self.len().cmp(&other.len())
    } else if self == other {
      std::cmp::Ordering::Equal
    } else {
      for i in 0..self.len() {
        let a = &self.tokens[i];
        let b = &other.tokens[i];
        if let std::cmp::Ordering::Greater = a.cmp(b) {
          return std::cmp::Ordering::Greater;
        }
      }
      std::cmp::Ordering::Less
    }
  }
}

impl PartialOrd for RegExp {
  fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
    Some(self.cmp(other))
  }
}

impl CharClass {
  pub const ALL_SIZE: usize = 7;

  pub fn index(&self) -> usize {
    match self {
      CharClass::Numeric => 0,
      CharClass::Whitespace => 1,
      CharClass::Lowercase => 2,
      CharClass::Uppercase => 3,
      CharClass::Alphabet => 4,
      CharClass::AlphaNumeric => 5,
      CharClass::All => 6,
    }
  }
}

impl Token {
  pub const ALL_SIZE: usize =
    2 + CharClass::ALL_SIZE + ALL_PUNCTUATION.len() + CharClass::ALL_SIZE + ALL_PUNCTUATION.len();

  pub fn index(&self) -> usize {
    match self {
      Token::Start => 0,
      Token::End => 1,
      Token::Chars(class) => 2 + class.index(),
      Token::Punctuation(p) => {
        2 + CharClass::ALL_SIZE + ALL_PUNCTUATION.iter().position(|q| *q == *p).unwrap()
      }
      Token::NotChars(class) => 2 + CharClass::ALL_SIZE + ALL_PUNCTUATION.len() + class.index(),
      Token::NotPunctuation(p) => {
        2 + CharClass::ALL_SIZE
          + ALL_PUNCTUATION.len()
          + CharClass::ALL_SIZE
          + ALL_PUNCTUATION.iter().position(|q| *q == *p).unwrap()
      }
    }
  }
}

impl Ord for Token {
  fn cmp(&self, other: &Self) -> std::cmp::Ordering {
    self.index().cmp(&other.index())
  }
}

impl PartialOrd for Token {
  fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
    Some(self.cmp(other))
  }
}
