import { hash, hash_interface } from "./hash";
import { ImmutableBase } from "./ImmutableBase";

var ref_id = 0;

export function ImmutableRef(value, onchange) {
  this._id = ++ref_id;
  this._value = value;
  this._onchange = onchange;
}

ImmutableRef.prototype = Object.create(ImmutableBase);

ImmutableRef.prototype[hash_interface] = function (x) {
  return "(Ref " + hash(x._id) + ")";
};

ImmutableRef.prototype.get = function () {
  return this._value;
};

ImmutableRef.prototype.set = function (value) {
  var old = this._value;
  if (value !== old) {
    this._value = value;
    if (this._onchange != null) {
      this._onchange(old, value);
    }
  }
};

ImmutableRef.prototype.modify = function (f) {
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
  return x instanceof ImmutableRef;
}

export function Ref(value, onchange) {
  if (arguments.length < 1 || arguments.length > 2) {
    throw new Error("Expected 1 to 2 arguments but got " + arguments.length);
  }

  return new ImmutableRef(value, onchange);
}
