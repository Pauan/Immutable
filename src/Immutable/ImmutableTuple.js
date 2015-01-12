import { modify as array_modify } from "./Array";
import { hash_array } from "./hash";
import { toJSON_array, fromJSON_array } from "./toJSON";
import { toJS_array } from "./toJS";
import { ImmutableBase } from "./Base";
import { toIterator, each } from "./iter";
import { tag_hash, tag_toJSON, fromJSON_registry, tag_toJS, tag_iter } from "./static";
import { ordered_has, nth_has } from "./Ordered";

export function ImmutableTuple(values) {
  this.values = values;
  this.hash   = null;
}

ImmutableTuple.prototype = Object.create(ImmutableBase);

ImmutableTuple.prototype[tag_hash] = hash_array("Tuple");
ImmutableTuple.prototype[tag_toJS] = toJS_array;

fromJSON_registry["Tuple"] = function (x) {
  return Tuple(fromJSON_array(x));
};

ImmutableTuple.prototype[tag_toJSON] = function (x) {
  return toJSON_array("Tuple", x);
};

ImmutableTuple.prototype[tag_iter] = function () {
  return toIterator(this.values);
};

ImmutableTuple.prototype.size = function () {
  return this.values.length;
};

ImmutableTuple.prototype.get = function (index) {
  var len = this.size();

  if (nth_has(index, len)) {
    return this.values[index];
  } else {
    throw new Error("Index " + index + " is not valid");
  }
};

ImmutableTuple.prototype.modify = function (index, f) {
  var len = this.size();

  if (nth_has(index, len)) {
    var values = this.values;
    var array  = array_modify(values, index, f);
    if (array === values) {
      return this;
    } else {
      return new ImmutableTuple(array);
    }

  } else {
    throw new Error("Index " + index + " is not valid");
  }
};

// TODO a bit of code duplication
ImmutableTuple.prototype.set = function (index, value) {
  return this.modify(index, function () {
    return value;
  });
};

export function isTuple(x) {
  return x instanceof ImmutableTuple;
}

export function unsafe_Tuple(array) {
  return new ImmutableTuple(array);
}

export function Tuple(array) {
  if (array != null) {
    if (isTuple(array)) {
      return array;

    } else {
      var values = [];

      // We can't use toArray, because `array` might be mutated
      each(array, function (x) {
        values.push(x);
      });

      return new ImmutableTuple(values);
    }
  } else {
    return new ImmutableTuple([]);
  }
}
