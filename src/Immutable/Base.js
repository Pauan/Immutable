import { hash } from "./hash";

export var MutableBase   = {};
export var ImmutableBase = {};

function toString() {
  return hash(this);
}

MutableBase.toString = ImmutableBase.toString = toString;
MutableBase.inspect  = ImmutableBase.inspect  = toString;
