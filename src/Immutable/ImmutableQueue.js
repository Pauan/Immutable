import { toJSON_array, fromJSON_array } from "./toJSON";
import { toJS_array } from "./toJS";
import { hash_array } from "./hash";
import { Cons, iter_cons, each_cons } from "./Cons";
import { concat_iter, reverse_iter } from "./iter";
import { ImmutableBase } from "./Base";
import { stack_size, stack_concat } from "./Sorted";
import { nil, tag_hash, tag_toJSON, fromJSON_registry, tag_toJS, tag_iter } from "./static";

export function ImmutableQueue(left, right, len) {
  this.left  = left;
  this.right = right;
  this.len   = len;
  this.hash  = null;
}

ImmutableQueue.prototype = Object.create(ImmutableBase);

ImmutableQueue.prototype[tag_toJS] = toJS_array;
ImmutableQueue.prototype[tag_hash] = hash_array("Queue");
ImmutableQueue.prototype.size = stack_size;
ImmutableQueue.prototype.concat = stack_concat;

fromJSON_registry["Queue"] = function (x) {
  return Queue(fromJSON_array(x));
};

ImmutableQueue.prototype[tag_toJSON] = function (x) {
  return toJSON_array("Queue", x);
};

ImmutableQueue.prototype.isEmpty = function () {
  return this.left === nil && this.right === nil;
};

ImmutableQueue.prototype.removeAll = function () {
  return new ImmutableQueue(nil, nil, 0);
};

ImmutableQueue.prototype[tag_iter] = function () {
  return concat_iter(iter_cons(this.left), reverse_iter(iter_cons(this.right)));
};

ImmutableQueue.prototype.peek = function (def) {
  if (this.isEmpty()) {
    if (arguments.length === 1) {
      return def;
    } else {
      throw new Error("Cannot peek from an empty queue");
    }
  } else {
    return this.left.car;
  }
};

ImmutableQueue.prototype.push = function (value) {
  if (this.isEmpty()) {
    return new ImmutableQueue(new Cons(value, this.left), this.right, this.len + 1);
  } else {
    return new ImmutableQueue(this.left, new Cons(value, this.right), this.len + 1);
  }
};

ImmutableQueue.prototype.pop = function () {
  if (this.isEmpty()) {
    throw new Error("Cannot pop from an empty queue");
  } else {
    var left = this.left.cdr;
    if (left === nil) {
      var right = nil;

      // TODO a little gross
      // TODO replace with foldl ?
      each_cons(this.right, function (x) {
        right = new Cons(x, right);
      });

      return new ImmutableQueue(right, nil, this.len - 1);
    } else {
      return new ImmutableQueue(left, this.right, this.len - 1);
    }
  }
};


export function isQueue(x) {
  return x instanceof ImmutableQueue;
}

export function Queue(x) {
  if (arguments.length === 0) {
    return new ImmutableQueue(nil, nil, 0);
  } else {
    if (x instanceof ImmutableQueue) {
      return x;
    } else {
      return new ImmutableQueue(nil, nil, 0).concat(x);
    }
  }
}
