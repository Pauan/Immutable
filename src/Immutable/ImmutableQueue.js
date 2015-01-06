import { toJSON_array, fromJSON_array, tag_toJSON, fromJSON_registry } from "./toJSON";
import { toJS_array, tag_toJS } from "./toJS";
import { hash, tag_hash } from "./hash";
import { join_lines } from "./util";
import { Cons, iter_cons, each_cons } from "./Cons";
import { nil } from "./nil";
import { tag_iter, concat_iter, reverse_iter, each } from "./iter";
import { ImmutableBase } from "./Base";

export function ImmutableQueue(left, right, len) {
  this.left  = left;
  this.right = right;
  this.len   = len;
  this.hash  = null;
}

ImmutableQueue.prototype = Object.create(ImmutableBase);

fromJSON_registry["Queue"] = function (x) {
  return Queue(fromJSON_array(x));
};

ImmutableQueue.prototype[tag_toJSON] = function (x) {
  return toJSON_array("Queue", x);
};

ImmutableQueue.prototype[tag_toJS] = toJS_array;

ImmutableQueue.prototype.isEmpty = function () {
  return this.left === nil && this.right === nil;
};

ImmutableQueue.prototype[tag_iter] = function (x) {
  return concat_iter(iter_cons(x.left), reverse_iter(iter_cons(x.right)));
};

ImmutableQueue.prototype[tag_hash] = function (x) {
  if (x.hash === null) {
    var a = [];

    each(x, function (x) {
      a.push(hash(x));
    });

    x.hash = "(Queue" + join_lines(a, "  ") + ")";
  }

  return x.hash;
};

ImmutableQueue.prototype.size = function () {
  return this.len;
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
      each_cons(this.right, function (x) {
        right = new Cons(x, right);
      });

      return new ImmutableQueue(right, nil, this.len - 1);
    } else {
      return new ImmutableQueue(left, this.right, this.len - 1);
    }
  }
};

ImmutableQueue.prototype.concat = function (right) {
  var self = this;

  each(right, function (x) {
    self = self.push(x);
  });

  return self;
};


export function isQueue(x) {
  return x instanceof ImmutableQueue;
}

export function Queue(x) {
  if (x != null) {
    if (x instanceof ImmutableQueue) {
      return x;
    } else {
      return new ImmutableQueue(nil, nil, 0).concat(x);
    }
  } else {
    return new ImmutableQueue(nil, nil, 0);
  }
}
