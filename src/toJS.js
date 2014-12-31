import { isObject } from "./util";

export var toJS_interface = "__DEE5921D-20A6-40D0-9A74-40C5BAC8C663_toJS__";

export function toJS(x) {
  if (isObject(x)) {
    var fn = x[toJS_interface];
    if (fn != null) {
      return fn(x);
    } else {
      return x;
    }
  } else {
    return x;
  }
}

export function toJS_object(x) {
  var o = {};

  x.forEach(function (_array) {
    var key   = _array[0];
    var value = _array[1];

    // TODO use isString test ?
    if (typeof key !== "string") {
      throw new Error("Cannot convert to JavaScript: expected string key but got " + key);
    }

    o[key] = toJS(value);
  });

  return o;
}

export function toJS_array(x) {
  var a = [];

  x.forEach(function (value) {
    a.push(toJS(value));
  });

  return a;
}
