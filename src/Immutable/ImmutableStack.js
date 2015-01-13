import { toJSON_array, fromJSON_array } from "./toJSON";
import { toJS_array } from "./toJS";
import { hash_array } from "./hash";
import { ImmutableBase } from "./Base";
import { Cons, iter_cons } from "./Cons";
import { reverse_iter } from "./iter";
import { sorted_isEmpty, stack_size, stack_concat } from "./Sorted";
import { nil, tag_toJSON, fromJSON_registry, tag_toJS, tag_hash, tag_iter } from "./static";

export function ImmutableStack(root, len) {
  this.root = root;
  this.len  = len;
  this.hash = null;
}

ImmutableStack.prototype = Object.create(ImmutableBase);

ImmutableStack.prototype[tag_toJS] = toJS_array;
ImmutableStack.prototype[tag_hash] = hash_array("Stack");
ImmutableStack.prototype.isEmpty = sorted_isEmpty;
ImmutableStack.prototype.size = stack_size;
ImmutableStack.prototype.concat = stack_concat;

fromJSON_registry["Stack"] = function (x) {
  return Stack(fromJSON_array(x));
};

ImmutableStack.prototype[tag_iter] = function () {
  return reverse_iter(iter_cons(this.root));
};

ImmutableStack.prototype[tag_toJSON] = function (x) {
  return toJSON_array("Stack", x);
};

ImmutableStack.prototype.removeAll = function () {
  return new ImmutableStack(nil, 0);
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


export function isStack(x) {
  return x instanceof ImmutableStack;
}

export function Stack(x) {
  if (arguments.length === 0) {
    return new ImmutableStack(nil, 0);
  } else {
    if (x instanceof ImmutableStack) {
      return x;
    } else {
      return new ImmutableStack(nil, 0).concat(x);
    }
  }
}
