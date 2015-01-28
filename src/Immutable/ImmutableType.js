import { modify as array_modify } from "./Array";
import { hash, join_lines } from "./hash";
import { toJSON_array, fromJSON_array, toJSON, fromJSON } from "./toJSON";
import { toJS_array, toJS } from "./toJS";
import { each, map } from "./iter";
import { tag_hash, tag_toJSON, fromJSON_registry, tag_toJS } from "./static";
import { nth_has } from "./Ordered";
import { ImmutableTuple } from "./ImmutableTuple";

export function ImmutableType(type, values) {
  this._type   = type;
  this._values = values;
  this.hash    = null;
}

ImmutableType.prototype = Object.create(ImmutableTuple.prototype);

// TODO hacky
// TODO code duplication
ImmutableType.prototype[tag_hash] = function (x) {
  if (x.hash === null) {
    var a = map(x, function (x) {
      return hash(x);
    });

    x.hash = "(Type " + hash(x._type) + join_lines(a, "  ") + ")";
  }

  return x.hash;
};

ImmutableType.prototype[tag_toJS] = function (x) {
  return {
    type: toJS(x._type),
    values: toJS_array(x)
  };
};

fromJSON_registry["Type"] = function (x) {
  // TODO hacky
  return Type(fromJSON(x.type), fromJSON_array(x));
};

ImmutableType.prototype[tag_toJSON] = function (x) {
  var x2 = toJSON_array("Type", x);
  // TODO hacky
  x2.type = toJSON(x._type);
  return x2;
};

ImmutableType.prototype.type = function () {
  return this._type;
};

// TODO code duplication
ImmutableType.prototype.modify = function (index, f) {
  var len = this.size();

  if (nth_has(index, len)) {
    var values = this._values;
    var array  = array_modify(values, index, f);
    if (array === values) {
      return this;
    } else {
      return new ImmutableType(this._type, array);
    }

  } else {
    throw new Error("Index " + index + " is not valid");
  }
};


export function isType(x) {
  return x instanceof ImmutableType;
}

// TODO code duplication
export function Type(type, array) {
  if (arguments.length === 1) {
    return new ImmutableType(type, []);

  } else if (arguments.length === 2) {
    // We don't use equal, for increased speed
    if (isType(array) && array._type === type) {
      return array;

    } else {
      var values = [];

      // We can't use toArray, because `array` might be mutated
      each(array, function (x) {
        values.push(x);
      });

      return new ImmutableType(type, values);
    }

  } else {
    throw new Error("Expected 1 to 2 arguments but got " + arguments.length);
  }
}
