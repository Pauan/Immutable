import { hash } from "./hash";

export var Immutable = {};

Immutable.toString = function () {
  return hash(this);
};

Immutable.inspect = Immutable.toString;
