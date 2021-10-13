use std::ops::Deref;

#[derive(Debug, Clone, Copy)]
pub enum CharItem {
  Start,
  End,
  Char(char),
}

pub struct CharItems(pub Vec<CharItem>);

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

impl From<&[CharItem]> for CharItems {
  fn from(items: &[CharItem]) -> Self {
    CharItems(items.into())
  }
}
