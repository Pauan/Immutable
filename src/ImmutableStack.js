var _toJS     = require("./toJS");
var _hash     = require("./hash");
var _util     = require("./util");

var Immutable = require("./Immutable");
var nil       = require("./nil");
var Cons      = require("./Cons");

var toJS_array = _toJS.toJS_array;
var toJS_interface = _toJS.toJS_interface;

var hash = _hash.hash;
var hash_interface = _hash.hash_interface;

var join_lines = _util.join_lines;


function ImmutableStack(root, len) {
  this.root = root;
  this.len  = len;
  this.hash = null;
}

ImmutableStack.prototype = Object.create(Immutable);

ImmutableStack.prototype[toJS_interface] = toJS_array;

// TODO code duplication with ImmutableSet
ImmutableStack.prototype.isEmpty = function () {
  return this.root === nil;
};

// TODO code duplication
ImmutableStack.prototype[hash_interface] = function (x) {
  if (x.hash === null) {
    var a = [];

    x.forEach(function (x) {
      a.push(hash(x));
    });

    x.hash = "(Stack" + join_lines(a, "  ") + ")";
  }

  return x.hash;
};

ImmutableStack.prototype.forEach = function (f) {
  this.root.forEachRev(f);
};

// TODO code duplication with ImmutableQueue
ImmutableStack.prototype.size = function () {
  return this.len;
};

ImmutableStack.prototype.peek = function (def) {
  if (this.isEmpty()) {
    if (arguments.length === 1) {
      return def;
    } else {
      throw new Error("Cannot peek from an empty stack");
    }
  } else {
    return this.root.car;
  }
};

ImmutableStack.prototype.push = function (value) {
  return new ImmutableStack(new Cons(value, this.root), this.len + 1);
};

ImmutableStack.prototype.pop = function () {
  if (this.isEmpty()) {
    throw new Error("Cannot pop from an empty stack");
  } else {
    return new ImmutableStack(this.root.cdr, this.len - 1);
  }
};

// TODO code duplication with ImmutableQueue
ImmutableStack.prototype.concat = function (right) {
  var self = this;

  right.forEach(function (x) {
    self = self.push(x);
  });

  return self;
};


module.exports = ImmutableStack;
