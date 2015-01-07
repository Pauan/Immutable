import { max, iter_tree } from "./AVL";
import { simpleSort, key_get, key_set, key_modify, key_remove } from "./Sorted";
import { hash, tag_hash, hash_dict } from "./hash";
import { toJS_object, tag_toJS } from "./toJS";
import { toJSON_object, fromJSON_object, tag_toJSON, fromJSON_registry } from "./toJSON";
import { nil } from "./nil";
import { ImmutableBase } from "./Base";
import { tag_iter, iter_object, map_iter, foldl } from "./iter";
import { identity } from "./util";

function KeyNode(left, right, hash, key, value) {
  this.left  = left;
  this.right = right;
  this.hash  = hash;
  this.key   = key;
  this.value = value;
  this.depth = max(left.depth, right.depth) + 1;
}

KeyNode.prototype.copy = function (left, right) {
  return new KeyNode(left, right, this.hash, this.key, this.value);
};

KeyNode.prototype.modify = function (info) {
  var hash  = info.hash;
  var key   = info.key;
  var value = info.value;
  // We don't use equal, for increased speed
  if (this.hash === hash && this.key === key && this.value === value) {
    return this;
  } else {
    return new KeyNode(this.left, this.right, hash, key, value);
  }
};


export function ImmutableDict(root, sort, hash_fn) {
  this.root = root;
  this.sort = sort;
  this.hash_fn = hash_fn;
  this.hash = null;
}

ImmutableDict.prototype = Object.create(ImmutableBase);

ImmutableDict.prototype[tag_iter] = function () {
  return map_iter(iter_tree(this.root), function (node) {
    return [node.key, node.value];
  });
};

ImmutableDict.prototype[tag_hash] = function (x) {
  if (x.hash === null) {
    // We don't use equal, for increased speed
    if (isDict(x) && !isSortedDict(x)) {
      x.hash = "(Dict" + hash_dict(x, "  ") + ")";
    } else {
      x.hash = "(SortedDict " + hash(x.sort) + hash_dict(x, "  ") + ")";
    }
  }

  return x.hash;
};

fromJSON_registry["Dict"] = function (x) {
  return Dict(fromJSON_object(x));
};

ImmutableDict.prototype[tag_toJSON] = function (x) {
  if (isDict(x) && !isSortedDict(x)) {
    return toJSON_object("Dict", x);
  } else {
    throw new Error("Cannot convert SortedDict to JSON");
  }
};

ImmutableDict.prototype[tag_toJS] = toJS_object;

ImmutableDict.prototype.isEmpty = function () {
  return this.root === nil;
};

ImmutableDict.prototype.removeAll = function () {
  return new ImmutableDict(nil, this.sort, this.hash_fn);
};

// TODO what if `sort` suspends ?
ImmutableDict.prototype.has = function (key) {
  return key_get(this.root, this.sort, this.hash_fn(key)) !== nil;
};

// TODO what if `sort` suspends ?
ImmutableDict.prototype.get = function (key, def) {
  var node = key_get(this.root, this.sort, this.hash_fn(key));
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
  var hash_fn = this.hash_fn;
  var hash = hash_fn(key);
  var node = key_set(root, sort, hash, new KeyNode(nil, nil, hash, key, value));
  if (node === root) {
    return this;
  } else {
    return new ImmutableDict(node, sort, hash_fn);
  }
};

// TODO code duplication
// TODO what if `sort` suspends ?
ImmutableDict.prototype.remove = function (key) {
  var root = this.root;
  var sort = this.sort;
  var hash_fn = this.hash_fn;
  var node = key_remove(root, sort, hash_fn(key));
  if (node === root) {
    return this;
  } else {
    return new ImmutableDict(node, sort, hash_fn);
  }
};

// TODO code duplication
// TODO what if `sort` suspends ?
ImmutableDict.prototype.modify = function (key, f) {
  var root = this.root;
  var sort = this.sort;
  var hash_fn = this.hash_fn;
  var node = key_modify(root, sort, hash_fn(key), key, f);
  if (node === root) {
    return this;
  } else {
    return new ImmutableDict(node, sort, hash_fn);
  }
};

// TODO code duplication with ImmutableRecord
ImmutableDict.prototype.merge = function (other) {
  return foldl(iter_object(other), this, function (self, _array) {
    var key   = _array[0];
    var value = _array[1];
    return self.set(key, value);
  });
};


export function isDict(x) {
  return x instanceof ImmutableDict;
}

export function isSortedDict(x) {
  return isDict(x) && x.hash_fn === identity;
}

export function SortedDict(sort, obj) {
  if (obj != null) {
    // We don't use equal, for increased speed
    if (isSortedDict(obj) && obj.sort === sort) {
      return obj;
    } else {
      return new ImmutableDict(nil, sort, identity).merge(obj);
    }
  } else {
    return new ImmutableDict(nil, sort, identity);
  }
}

export function Dict(obj) {
  if (obj != null) {
    if (isDict(obj) && !isSortedDict(obj)) {
      return obj;
    } else {
      return new ImmutableDict(nil, simpleSort, hash).merge(obj);
    }
  } else {
    return new ImmutableDict(nil, simpleSort, hash);
  }
}
