import { max } from "./AVL";
import { defaultSort, key_get, key_set, key_remove } from "./Sorted";
import { hash, tag_hash } from "./hash";
import { join_lines } from "./util";
import { toJSON_array, fromJSON_array, tag_toJSON, fromJSON_registry } from "./toJSON";
import { toJS_array, tag_toJS } from "./toJS";
import { nil } from "./nil";
import { ImmutableBase } from "./Base";

function SetNode(left, right, key) {
  this.left  = left;
  this.right = right;
  this.key   = key;
  this.depth = max(left.depth, right.depth) + 1;
}

SetNode.prototype.copy = function (left, right) {
  return new SetNode(left, right, this.key);
};

SetNode.prototype.modify = function (info) {
  var key = info.key;
  // We don't use equal, for increased speed
  if (this.key === key) {
    return this;
  } else {
    return new SetNode(this.left, this.right, key);
  }
};

SetNode.prototype.forEach = function (f) {
  this.left.forEach(f);
  f(this.key);
  this.right.forEach(f);
};


export function ImmutableSet(root, sort) {
  this.root = root;
  this.sort = sort;
  this.hash = null;
}

ImmutableSet.prototype = Object.create(ImmutableBase);

fromJSON_registry["Set"] = function (x) {
  return Set(fromJSON_array(x));
};

ImmutableSet.prototype[tag_toJSON] = function (x) {
  if (x.sort === defaultSort) {
    return toJSON_array("Set", x);
  } else {
    throw new Error("Cannot convert SortedSet to JSON");
  }
};

ImmutableSet.prototype[tag_hash] = function (x) {
  if (x.hash === null) {
    var a = [];

    x.forEach(function (value) {
      a.push(hash(value));
    });

    var spaces = "  ";

    // We don't use equal, for increased speed
    if (x.sort === defaultSort) {
      x.hash = "(Set" + join_lines(a, spaces) + ")";
    } else {
      x.hash = "(SortedSet " + hash(x.sort) + join_lines(a, spaces) + ")";
    }
  }

  return x.hash;
};

ImmutableSet.prototype[tag_toJS] = toJS_array;

// TODO code duplication with ImmutableDict
// TODO Symbol.iterator
ImmutableSet.prototype.forEach = function (f) {
  this.root.forEach(f);
};

// TODO code duplication with ImmutableDict
ImmutableSet.prototype.isEmpty = function () {
  return this.root === nil;
};

// TODO code duplication with ImmutableDict
// TODO what if `sort` suspends ?
ImmutableSet.prototype.has = function (key) {
  return key_get(this.root, this.sort, key) !== nil;
};

// TODO what if `sort` suspends ?
ImmutableSet.prototype.add = function (key) {
  var root = this.root;
  var sort = this.sort;
  var node = key_set(root, sort, key, new SetNode(nil, nil, key));
  if (node === root) {
    return this;
  } else {
    return new ImmutableSet(node, sort);
  }
};

// TODO what if `sort` suspends ?
ImmutableSet.prototype.remove = function (key) {
  var root = this.root;
  var sort = this.sort;
  var node = key_remove(root, sort, key);
  if (node === root) {
    return this;
  } else {
    return new ImmutableSet(node, sort);
  }
};

ImmutableSet.prototype.union = function (other) {
  var self = this;

  // TODO iterator
  other.forEach(function (value) {
    self = self.add(value);
  });

  return self;
};

ImmutableSet.prototype.intersect = function (other) {
  var self = this;
  if (self.root === nil) {
    return self;

  } else {
    var out = new ImmutableSet(nil, self.sort);

    // TODO iterator
    other.forEach(function (value) {
      if (self.has(value)) {
        out = out.add(value);
      }
    });

    return out;
  }
};

ImmutableSet.prototype.disjoint = function (other) {
  var self = this;

  // TODO iterator
  other.forEach(function (value) {
    if (self.has(value)) {
      self = self.remove(value);
    } else {
      self = self.add(value);
    }
  });

  return self;
};

// TODO what about the empty set ?
ImmutableSet.prototype.subtract = function (other) {
  var self = this;

  if (self.root !== nil) {
    // TODO iterator
    other.forEach(function (value) {
      self = self.remove(value);
    });
  }

  return self;
};


export function isSet(x) {
  return x instanceof ImmutableSet;
}

export function isSortedSet(x) {
  return isSet(x) && x.sort !== defaultSort;
}

export function SortedSet(sort, array) {
  if (array != null) {
    // We don't use equal, for increased speed
    if (array instanceof ImmutableSet && array.sort === sort) {
      return array;

    } else {
      // TODO use concat ?
      var o = new ImmutableSet(nil, sort);

      array.forEach(function (x) {
        o = o.add(x);
      });

      return o;
    }
  } else {
    return new ImmutableSet(nil, sort);
  }
}

export function Set(array) {
  return SortedSet(defaultSort, array);
}
