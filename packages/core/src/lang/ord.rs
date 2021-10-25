use crate::{Atom, Trace};

impl Ord for Trace {
  fn cmp(&self, other: &Self) -> std::cmp::Ordering {
    if self.len() != other.len() {
      self.len().cmp(&other.len())
    } else if self == other {
      std::cmp::Ordering::Equal
    } else {
      for i in 0..self.len() {
        let a = &self.atoms[i];
        let b = &other.atoms[i];
        if let std::cmp::Ordering::Greater = a.cmp(b) {
          return std::cmp::Ordering::Greater;
        }
      }
      std::cmp::Ordering::Less
    }
  }
}

impl PartialOrd for Trace {
  fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
    Some(self.cmp(other))
  }
}

impl Ord for Atom {
  fn cmp(&self, other: &Self) -> std::cmp::Ordering {
    fn id(atom: &Atom) -> usize {
      match atom {
        Atom::SubStr {
          index: _,
          left: _,
          right: _,
        } => 0,
        Atom::Loop(_) => 1,
        Atom::ConstStr(_) => 2,
      }
    }

    let id_a = id(self);
    let id_b = id(other);

    if id_a != id_b {
      id_a.cmp(&id_b)
    } else {
      match (self, other) {
        (
          Atom::SubStr {
            index: i1,
            left: l1,
            right: r1,
          },
          Atom::SubStr {
            index: i2,
            left: l2,
            right: r2,
          },
        ) => {
          if i1 == i2 {
            if l1 < l2 && r1 < r2 {
              std::cmp::Ordering::Less
            } else if l1 == l2 && r1 == r2 {
              std::cmp::Ordering::Equal
            } else {
              std::cmp::Ordering::Greater
            }
          } else {
            i1.cmp(i2)
          }
        }
        (Atom::ConstStr(c1), Atom::ConstStr(c2)) => c1.cmp(c2),
        (Atom::Loop(tr1), Atom::Loop(tr2)) => tr1.cmp(tr2),
        _ => panic!(),
      }
    }
  }
}

impl PartialOrd for Atom {
  fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
    Some(self.cmp(other))
  }
}
