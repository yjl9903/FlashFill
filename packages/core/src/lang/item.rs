use std::ops::Deref;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CharItem {
  Start,
  End,
  Char(char),
}

#[derive(Debug, Clone, PartialEq)]
pub struct CharItems(Vec<CharItem>);

impl Deref for CharItems {
  type Target = Vec<CharItem>;

  fn deref(&self) -> &Self::Target {
    &self.0
  }
}

impl From<&String> for CharItems {
  fn from(s: &String) -> Self {
    CharItems(
      vec![
        vec![CharItem::Start],
        s.chars().map(|c| CharItem::Char(c)).collect(),
        vec![CharItem::End],
      ]
      .concat(),
    )
  }
}

impl From<String> for CharItems {
  fn from(s: String) -> Self {
    let s = &s;
    s.into()
  }
}

impl From<&[CharItem]> for CharItems {
  fn from(items: &[CharItem]) -> Self {
    CharItems(items.into())
  }
}

impl From<Vec<CharItem>> for CharItems {
  fn from(items: Vec<CharItem>) -> Self {
    CharItems(items)
  }
}
