import { isObject, destructure_pair } from "./util";
import { each } from "./iter";
import { tag_toJS } from "./static";

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
    destructure_pair(_array, function (key, value) {
      // Tags are currently implemented as strings
      // TODO use isString test ?
      if (typeof key !== "string") {
        throw new Error("Cannot convert to JavaScript: expected key to be string or Tag but got " + key);
      }

      o[key] = toJS(value);
    });
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
