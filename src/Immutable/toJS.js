import { UUIDTag } from "./Tag";
import { isObject } from "./util";
import { each } from "./iter";

export var tag_toJS = UUIDTag("1b75a273-16bd-4248-be8a-e4b5e8c4b523");

export function toJS(x) {
  if (isObject(x)) {
    var fn = x[tag_toJS];
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

  each(x, function (_array) {
    var key   = _array[0];
    var value = _array[1];

    // Tags are currently implemented as strings
    // TODO use isString test ?
    if (typeof key !== "string") {
      throw new Error("Cannot convert to JavaScript: expected key to be string or Tag but got " + key);
    }

    o[key] = toJS(value);
  });

  return o;
}

export function toJS_array(x) {
  var a = [];

  each(x, function (value) {
    a.push(toJS(value));
  });

  return a;
}
