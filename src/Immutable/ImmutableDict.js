import { max } from "./AVL";
import { defaultSort, key_get, key_set, key_modify, key_remove } from "./Sorted";
import { hash, hash_interface, hash_dict } from "./hash";
import { toJS_object, toJS_interface } from "./toJS";
import { nil } from "./nil";
import { ImmutableBase } from "./ImmutableBase";

function KeyNode(left, right, key, value) {
  this.left  = left;
  this.right = right;
  this.key   = key;
  this.value = value;
  this.depth = max(left.depth, right.depth) + 1;
}

KeyNode.prototype.copy = function (left, right) {
  return new KeyNode(left, right, this.key, this.value);
};

KeyNode.prototype.modify = function (info) {
  var key   = info.key;
  var value = info.value;
  // We don't use equal, for increased speed
  if (this.key === key && this.value === value) {
    return this;
  } else {
    return new KeyNode(this.left, this.right, key, value);
  }
};

KeyNode.prototype.forEach = function (f) {
  this.left.forEach(f);
  f([this.key, this.value]);
  this.right.forEach(f);
};


export function ImmutableDict(root, sort) {
  this.root = root;
  this.sort = sort;
  this.hash = null;
}

ImmutableDict.prototype = Object.create(ImmutableBase);

ImmutableDict.prototype[hash_interface] = function (x) {
  if (x.hash === null) {
    // We don't use equal, for increased speed
    if (x.sort === defaultSort) {
      x.hash = "(Dict" + hash_dict(x, "  ") + ")";
    } else {
      x.hash = "(SortedDict " + hash(x.sort) + hash_dict(x, "  ") + ")";
    }
  }

  return x.hash;
};

ImmutableDict.prototype[toJS_interface] = toJS_object;

// TODO Symbol.iterator
ImmutableDict.prototype.forEach = function (f) {
  this.root.forEach(f);
};

ImmutableDict.prototype.isEmpty = function () {
  return this.root === nil;
};

// TODO what if `sort` suspends ?
ImmutableDict.prototype.has = function (key) {
  return key_get(this.root, this.sort, key) !== nil;
};

// TODO what if `sort` suspends ?
ImmutableDict.prototype.get = function (key, def) {
  var node = key_get(this.root, this.sort, key);
  if (node === nil) {
    if (arguments.length === 2) {
      return def;
    } else {
      throw new Error("Key " + key + " not found");
    }
  } else {
    return node.value;
  }
};

// TODO code duplication
// TODO what if `sort` suspends ?
ImmutableDict.prototype.set = function (key, value) {
  var root = this.root;
  var sort = this.sort;
  var node = key_set(root, sort, key, new KeyNode(nil, nil, key, value));
  if (node === root) {
    return this;
  } else {
    return new ImmutableDict(node, sort);
  }
};

// TODO code duplication
// TODO what if `sort` suspends ?
ImmutableDict.prototype.remove = function (key) {
  var root = this.root;
  var sort = this.sort;
  var node = key_remove(root, sort, key);
  if (node === root) {
    return this;
  } else {
    return new ImmutableDict(node, sort);
  }
};

// TODO code duplication
// TODO what if `sort` suspends ?
ImmutableDict.prototype.modify = function (key, f) {
  var root = this.root;
  var sort = this.sort;
  var node = key_modify(root, sort, key, f);
  if (node === root) {
    return this;
  } else {
    return new ImmutableDict(node, sort);
  }
};

// TODO code duplication with ImmutableRecord
ImmutableDict.prototype.merge = function (other) {
  var self = this;

  other.forEach(function (_array) {
    var key   = _array[0];
    var value = _array[1];

    self = self.set(key, value);
  });

  return self;
};
