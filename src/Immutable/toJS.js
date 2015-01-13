import { isObject, destructure_pair, isJSLiteral } from "./util";
import { each } from "./iter";
import { tag_toJS } from "./static";

// TODO circular import ?
import { List } from "./ImmutableList";

// TODO circular import ?
import { Dict } from "./ImmutableDict";

export function fromJS(x) {
  if (Array.isArray(x)) {
    var out = List();

    for (var i = 0, l = x.length; i < l; ++i) {
      out = out.push(fromJS(x[i]));
    }

    return out;

  } else if (isJSLiteral(x)) {
    var out = Dict();

    // TODO is using Object.keys correct ?
    Object.keys(x).forEach(function (key) {
                    // TODO unit test for this
      out = out.set(fromJS(key), fromJS(x[key]));
    });

    return out;

  } else {
    return x;
  }
}

export function toJS(x) {
  if (isObject(x)) {
    var fn = x[tag_toJS];
    if (fn != null) {
      return fn(x);

    } else if (Array.isArray(x)) {
      return x.map(toJS);

    } else if (isJSLiteral(x)) {
      var out = {};

      // TODO is using Object.keys correct ?
      Object.keys(x).forEach(function (key) {
            // TODO unit test for this
        out[toJS(key)] = toJS(x[key]);
      });

      return out;

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
