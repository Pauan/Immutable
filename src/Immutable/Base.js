import { hash } from "./hash";
import { iter } from "./iter";
import { Symbol_iterator } from "./Tag";

// TODO circular import ?
import { toJSON } from "./toJSON";

export var MutableBase   = {};
export var ImmutableBase = {};

function toString() {
  return hash(this);
}

// TODO Infinite cycle detection ?
function _toJSON() {
  return toJSON(this);
}

MutableBase.toString = ImmutableBase.toString = toString;
MutableBase.inspect  = ImmutableBase.inspect  = toString;

// Mutable things cannot be converted to JSON
ImmutableBase.toJSON = _toJSON;

if (Symbol_iterator !== null) {
  MutableBase[Symbol_iterator] = ImmutableBase[Symbol_iterator] = function () {
    return iter(this);
  };
}
