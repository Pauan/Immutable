import { max, iter_tree } from "./AVL";
import { simpleSort, sorted_isEmpty, sorted_has, key_get, key_set, key_modify,
         sorted_remove, sorted_merge } from "./Sorted";
import { hash, hash_dict } from "./hash";
import { toJS_object } from "./toJS";
import { toJSON_object, fromJSON_object } from "./toJSON";
import { unsafe_Tuple } from "./ImmutableTuple";
import { ImmutableBase } from "./Base";
import { map_iter } from "./iter";
import { identity } from "./util";
import { nil, tag_hash, tag_toJS, tag_toJSON, fromJSON_registry, tag_iter } from "./static";


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

ImmutableDict.prototype[tag_toJS] = toJS_object;
ImmutableDict.prototype.isEmpty = sorted_isEmpty;
ImmutableDict.prototype.has = sorted_has;
ImmutableDict.prototype.remove = sorted_remove(ImmutableDict);
ImmutableDict.prototype.merge = sorted_merge;

ImmutableDict.prototype[tag_iter] = function () {
  return map_iter(iter_tree(this.root), function (node) {
    return unsafe_Tuple([node.key, node.value]);
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

ImmutableDict.prototype.removeAll = function () {
  return new ImmutableDict(nil, this.sort, this.hash_fn);
};

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


export function isDict(x) {
  return x instanceof ImmutableDict;
}

export function isSortedDict(x) {
  return isDict(x) && x.hash_fn === identity;
}

export function SortedDict(sort, obj) {
  if (arguments.length === 1) {
    return new ImmutableDict(nil, sort, identity);

  } else if (arguments.length === 2) {
    // We don't use equal, for increased speed
    if (isSortedDict(obj) && obj.sort === sort) {
      return obj;
    } else {
      return new ImmutableDict(nil, sort, identity).merge(obj);
    }

  } else {
    throw new Error("Expected 1 to 2 arguments but got " + arguments.length);
  }
}

export function Dict(obj) {
  if (arguments.length === 0) {
    return new ImmutableDict(nil, simpleSort, hash);

  } else if (arguments.length === 1) {
    if (isDict(obj) && !isSortedDict(obj)) {
      return obj;
    } else {
      return new ImmutableDict(nil, simpleSort, hash).merge(obj);
    }

  } else {
    throw new Error("Expected 0 to 1 arguments but got " + arguments.length);
  }
}
