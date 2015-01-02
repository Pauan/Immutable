import { isObject } from "./util";

export var fromJSON_registry = {};

export var toJSON_type      = "__B81911B5-071E-431E-B82E-AA7ADFEA301F_type__";
export var toJSON_interface = "__836134D4-35C1-46C4-971D-1522F0A1E75A_toJSON__";

export function fromJSON(x) {
  if (isObject(x)) {
    var type = x[toJSON_type];
    if (type != null) {
      var register = fromJSON_registry[type];
      if (register != null) {
        return register(x);
      } else {
        throw new Error("Cannot handle type " + type);
      }
    } else {
      return x;
    }
  } else {
    return x;
  }
}

export function toJSON(x) {
  if (isObject(x)) {
    var fn = x[toJSON_interface];
    if (fn != null) {
      return fn(x);
    } else {
      return x;
    }
  } else {
    return x;
  }
}

export function toJSON_object(type, x) {
  var o = {};

  o[toJSON_type] = type;

  o.keys   = [];
  o.values = [];

  x.forEach(function (_array) {
    var key   = _array[0];
    var value = _array[1];

    o.keys.push(toJSON(key));
    o.values.push(toJSON(value));
  });

  return o;
}

export function toJSON_array(type, x) {
  var o = {};

  o[toJSON_type] = type;

  o.values = [];

  x.forEach(function (value) {
    o.values.push(toJSON(value));
  });

  return o;
}

export function fromJSON_object(x) {
  var keys   = x.keys;
  var values = x.values;

  var l = keys.length;
  var out = new Array(l);

  for (var i = 0; i < l; ++i) {
    out[i] = [fromJSON(keys[i]), fromJSON(values[i])];
  }

  return out;
}

export function fromJSON_array(x) {
  var values = x.values;

  var l = values.length;
  var out = new Array(l);

  for (var i = 0; i < l; ++i) {
    out[i] = fromJSON(values[i]);
  }

  return out;
}
