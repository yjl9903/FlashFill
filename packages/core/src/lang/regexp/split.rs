use std::{
  collections::{HashMap, HashSet},
  rc::Rc,
};

use crate::{CharClass, CharItems, Token, ALL_PUNCTUATION, ALL_PUNCTUATION_SET};

#[derive(Debug)]
pub struct SplitResult {
  cache: Vec<Option<Rc<Vec<Token>>>>,
}

impl SplitResult {
  pub fn new() -> SplitResult {
    SplitResult {
      cache: vec![None; Token::ALL_SIZE],
    }
  }

  pub fn contains(&self, token: &Token) -> bool {
    self.get(token).is_some()
  }

  pub fn get(&self, token: &Token) -> Option<Rc<Vec<Token>>> {
    self.cache.get(token.index()).unwrap().clone()
  }

  pub fn set(&mut self, token: &Token, group: Rc<Vec<Token>>) {
    self.cache[token.index()] = Some(group);
  }
}

impl Token {
  pub fn split(input: &CharItems) -> SplitResult {
    let exist_punc: HashSet<char> = input
      .iter()
      .filter_map(|c| match c {
        crate::CharItem::Start => None,
        crate::CharItem::End => None,
        crate::CharItem::Char(p) => {
          if ALL_PUNCTUATION_SET.contains(p) {
            Some(*p)
          } else {
            None
          }
        }
      })
      .collect();

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
        .filter(|p| exist_punc.contains(p))
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

    let mut split_result = SplitResult::new();

    group.into_values().for_each(|g| {
      let g = Rc::new(g);
      for token in g.iter() {
        split_result.set(token, g.clone());
      }
    });

    split_result
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

#[cfg(test)]
mod test_split {
  use crate::lang::regexp::ALL_PUNCTUATION;
  use crate::*;

  #[test]
  fn test_simple_split() {
    let input = vec![
      CharItem::Start,
      CharItem::Char('a'),
      CharItem::Char('b'),
      CharItem::Char('c'),
      CharItem::End,
    ];

    let out = Token::split(&input.into());

    assert!(out.contains(&Token::Start));
    assert!(out.contains(&Token::End));
    assert!(out.contains(&Token::Chars(CharClass::Alphabet)));
    assert!(out.contains(&Token::Chars(CharClass::Lowercase)));
    assert!(!out.contains(&Token::Chars(CharClass::Uppercase)));
    assert!(!out.contains(&Token::Chars(CharClass::Numeric)));
    assert_ne!(
      out.get(&Token::Start).unwrap(),
      out.get(&Token::Chars(CharClass::AlphaNumeric)).unwrap()
    );
    assert_ne!(
      out.get(&Token::End).unwrap(),
      out.get(&Token::Chars(CharClass::AlphaNumeric)).unwrap()
    );

    for &p in ALL_PUNCTUATION {
      assert!(!out.contains(&Token::NotPunctuation(p)));
    }
  }

  #[test]
  fn test_lower_upper_numeric() {
    let input = vec![
      CharItem::Start,
      CharItem::Char('a'),
      CharItem::Char('B'),
      CharItem::Char('C'),
      CharItem::Char('1'),
      CharItem::Char('2'),
      CharItem::Char('3'),
      CharItem::End,
    ];

    let out = Token::split(&input.into());

    assert_ne!(
      out.get(&Token::Chars(CharClass::Numeric)).unwrap(),
      out.get(&Token::Chars(CharClass::Lowercase)).unwrap()
    );
    assert_ne!(
      out.get(&Token::Chars(CharClass::Numeric)).unwrap(),
      out.get(&Token::Chars(CharClass::Uppercase)).unwrap()
    );
    assert_ne!(
      out.get(&Token::Chars(CharClass::Lowercase)).unwrap(),
      out.get(&Token::Chars(CharClass::Uppercase)).unwrap()
    );
  }
}
