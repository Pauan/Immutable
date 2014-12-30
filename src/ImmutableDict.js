var _AVL      = require("./AVL");
var _Sorted   = require("./Sorted");
var _hash     = require("./hash");
var _util     = require("./util");
var _toJS     = require("./toJS");

var nil       = require("./nil");
var Immutable = require("./Immutable");

var max = _AVL.max;

var defaultSort = _Sorted.defaultSort;
var key_get = _Sorted.key_get;
var key_set = _Sorted.key_set;
var key_modify = _Sorted.key_modify;
var key_remove = _Sorted.key_remove;

var pad_right = _util.pad_right;
var repeat = _util.repeat;
var join_lines = _util.join_lines;

var hash = _hash.hash;
var hash_interface = _hash.hash_interface;

var toJS_object = _toJS.toJS_object;
var toJS_interface = _toJS.toJS_interface;


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


function ImmutableDict(root, sort) {
  this.root = root;
  this.sort = sort;
  this.hash = null;
}

ImmutableDict.prototype = Object.create(Immutable);

ImmutableDict.prototype[hash_interface] = function (x) {
  if (x.hash === null) {
    var a = [];

    var max_key = 0;

    x.forEach(function (_array) {
      var key   = hash(_array[0]);
      var value = hash(_array[1]);

      key = key.split(/\n/);

      key.forEach(function (key) {
        max_key = Math.max(max_key, key.length);
      });

      a.push({
        key: key,
        value: value
      });
    });

    var spaces = "  ";

    a = a.map(function (x) {
      var last = x.key.length - 1;
      x.key[last] = pad_right(x.key[last], max_key, " ");

      var key = x.key.join("\n");

      var value = x.value.replace(/\n/g, "\n" + repeat(" ", max_key + 3));

      return key + " = " + value;
    });

    // We don't use equal, for increased speed
    if (x.sort === defaultSort) {
      x.hash = "(Dict" + join_lines(a, spaces) + ")";
    } else {
      x.hash = "(SortedDict " + hash(x.sort) + join_lines(a, spaces) + ")";
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


module.exports = ImmutableDict;
