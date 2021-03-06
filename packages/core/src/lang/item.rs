use std::ops::Deref;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CharItem {
  Start,
  End,
  Char(char),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CharItems(Vec<CharItem>);

impl CharItems {
  pub fn same(&self, items: Vec<CharItem>) -> bool {
    self.0 == items
  }
}

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

impl ToString for CharItems {
  fn to_string(&self) -> String {
    let mut text = String::new();
    for item in &self.0 {
      match item {
        CharItem::Char(c) => text.push(*c),
        _ => {}
      };
    }
    text
  }
}
