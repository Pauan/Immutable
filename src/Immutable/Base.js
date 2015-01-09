import { hash } from "./hash";
import { iter } from "./iter";
import { Symbol_iterator } from "./Tag";

export var MutableBase   = {};
export var ImmutableBase = {};

function toString() {
  return hash(this);
}

MutableBase.toString = ImmutableBase.toString = toString;
MutableBase.inspect  = ImmutableBase.inspect  = toString;

if (Symbol_iterator !== null) {
  MutableBase[Symbol_iterator] = ImmutableBase[Symbol_iterator] = function () {
    return iter(this);
  };
}
