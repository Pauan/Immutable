import { isTag, isUUIDTag, UUIDTag } from "./Tag";
import { isObject } from "./util";

export var fromJSON_registry = {};

export var tag_toJSON_type = UUIDTag("89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37");
export var tag_toJSON      = UUIDTag("99e14916-bc99-4c48-81aa-299cf1ad6de3");

export function fromJSON(x) {
  if (isObject(x)) {
    var type = x[tag_toJSON_type];
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
  } else if (isTag(x)) {
    if (isUUIDTag(x)) {
      return x;
    } else {
      throw new Error("Cannot convert Tag from JSON, use UUIDTag instead: " + x);
    }
  } else {
    return x;
  }
}

export function toJSON(x) {
  if (isObject(x)) {
    var fn = x[tag_toJSON];
    if (fn != null) {
      return fn(x);
    } else {
      return x;
    }
  } else if (isTag(x)) {
    if (isUUIDTag(x)) {
      return x;
    } else {
      throw new Error("Cannot convert Tag to JSON, use UUIDTag instead: " + x);
    }
  } else {
    return x;
  }
}

export function toJSON_object(type, x) {
  var o = {};

  o[tag_toJSON_type] = type;

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

  o[tag_toJSON_type] = type;

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
