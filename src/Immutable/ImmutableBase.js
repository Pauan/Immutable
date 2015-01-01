import { hash } from "./hash";

export var ImmutableBase = {};

ImmutableBase.toString = function () {
  return hash(this);
};

ImmutableBase.inspect = ImmutableBase.toString;
