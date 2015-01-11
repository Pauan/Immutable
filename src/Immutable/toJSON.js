import { isTag, isUUIDTag } from "./Tag";
import { isObject, isJSLiteral, isFinite, destructure_pair } from "./util";
import { each } from "./iter";
import { tag_toJSON, tag_toJSON_type, fromJSON_registry } from "./static";

export function fromJSON(x) {
  var type = typeof x;

  if (isTag(x)) {
    if (isUUIDTag(x)) {
      return x;
    } else {
      throw new Error("Cannot convert Tag from JSON, use UUIDTag instead: " + x);
    }

  } else if (type === "string" || type === "boolean" || x === null || isFinite(x)) {
    return x;

  } else if (isObject(x)) {
    var type = x[tag_toJSON_type];
    if (type != null) {
      var register = fromJSON_registry[type];
      if (register != null) {
        return register(x);
      } else {
        throw new Error("Cannot handle type " + type);
      }

    } else if (Array.isArray(x)) {
      return x.map(fromJSON);

    } else if (isJSLiteral(x)) {
      var out = {};
      // TODO is Object.keys correct here ?
      Object.keys(x).forEach(function (key) {
            // TODO unit tests for this
        out[fromJSON(key)] = fromJSON(x[key]);
      });
      return out;

    } else {
      throw new Error("Cannot convert from JSON: " + x);
    }

  } else {
    throw new Error("Cannot convert from JSON: " + x);
  }
}

export function toJSON(x) {
  var type = typeof x;

  if (isTag(x)) {
    if (isUUIDTag(x)) {
      return x;
    } else {
      throw new Error("Cannot convert Tag to JSON, use UUIDTag instead: " + x);
    }

  } else if (type === "string" || type === "boolean" || x === null || isFinite(x)) {
    return x;

  } else if (isObject(x)) {
    var fn = x[tag_toJSON];
    if (fn != null) {
      return fn(x);

    // TODO isFunction ?
    // TODO should this be before or after tag_toJSON ?
    } else if (typeof x.toJSON === "function") {
      return toJSON(x.toJSON());

    } else if (Array.isArray(x)) {
      return x.map(toJSON);

    } else if (isJSLiteral(x)) {
      var out = {};
      // TODO is Object.keys correct here ?
      Object.keys(x).forEach(function (key) {
            // TODO unit tests for this
        out[toJSON(key)] = toJSON(x[key]);
      });
      return out;

    } else {
      throw new Error("Cannot convert to JSON: " + x);
    }

  } else {
    throw new Error("Cannot convert to JSON: " + x);
  }
}

export function toJSON_object(type, x) {
  var o = {};

  o[tag_toJSON_type] = type;

  o.keys   = [];
  o.values = [];

  each(x, function (_array) {
    destructure_pair(_array, function (key, value) {
      o.keys.push(toJSON(key));
      o.values.push(toJSON(value));
    });
  });

  return o;
}

export function toJSON_array(type, x) {
  var o = {};

  o[tag_toJSON_type] = type;

  o.values = [];

  each(x, function (value) {
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
