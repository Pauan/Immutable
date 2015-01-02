import { modify as array_modify } from "./Array";
import { hash, hash_interface, hash_dict } from "./hash";
import { toJS_object, toJS_interface } from "./toJS";
import { ImmutableBase } from "./ImmutableBase";

export function ImmutableRecord(keys, values) {
  this.keys   = keys;
  this.values = values;
  this.hash   = null;
}

ImmutableRecord.prototype = Object.create(ImmutableBase);

ImmutableRecord.prototype[toJS_interface] = toJS_object;

ImmutableRecord.prototype[hash_interface] = function (x) {
  if (x.hash === null) {
    x.hash = "(Record" + hash_dict(x, "  ") + ")";
  }

  return x.hash;
};

ImmutableRecord.prototype.forEach = function (f) {
  var keys   = this.keys;
  var values = this.values;
  for (var s in keys) {
    var index = keys[s];
    f([s, values[index]]);
  }
};

ImmutableRecord.prototype.get = function (key) {
  // TODO code duplication
  if (typeof key !== "string") {
    throw new Error("Expected string key but got " + key);
  }

  var index = this.keys[key];
  if (index == null) {
    throw new Error("Key " + key + " not found");

  } else {
    return this.values[index];
  }
};

ImmutableRecord.prototype.set = function (key, value) {
  return this.modify(key, function () {
    return value;
  });
};

ImmutableRecord.prototype.modify = function (key, f) {
  // TODO code duplication
  if (typeof key !== "string") {
    throw new Error("Expected string key but got " + key);
  }

  var keys  = this.keys;
  var index = keys[key];
  if (index == null) {
    throw new Error("Key " + key + " not found");

  } else {
    var values = this.values;
    var array  = array_modify(values, index, f);
    if (array === values) {
      return this;
    } else {
      return new ImmutableRecord(keys, array);
    }
  }
};
