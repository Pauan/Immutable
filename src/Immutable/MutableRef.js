import { hash } from "./hash";
import { MutableBase } from "./Base";
import { tag_hash } from "./static";

var ref_id = 0;

export function MutableRef(value, onchange) {
  this._id = ++ref_id;
  this._value = value;
  this._onchange = onchange;
}

MutableRef.prototype = Object.create(MutableBase);

MutableRef.prototype[tag_hash] = function (x) {
  return "(Ref " + hash(x._id) + ")";
};

MutableRef.prototype.get = function () {
  return this._value;
};

MutableRef.prototype.set = function (value) {
  var old = this._value;
  if (value !== old) {
    this._value = value;
    if (this._onchange != null) {
      this._onchange(old, value);
    }
  }
};

MutableRef.prototype.modify = function (f) {
  this.set(f(this.get()));
};


export function deref(x) {
  if (isRef(x)) {
    return x.get();
  } else {
    return x;
  }
}

export function isRef(x) {
  return x instanceof MutableRef;
}

export function Ref(value, onchange) {
  if (arguments.length < 1 || arguments.length > 2) {
    throw new Error("Expected 1 to 2 arguments but got " + arguments.length);
  }

  return new MutableRef(value, onchange);
}
