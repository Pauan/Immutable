var toJS_interface = "__DEE5921D-20A6-40D0-9A74-40C5BAC8C663_toJS__";

// TODO move this into another module ?
function isObject(x) {
  return Object(x) === x;
}

function toJS(x) {
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

function toJS_object(x) {
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

function toJS_array(x) {
  var a = [];

  x.forEach(function (value) {
    a.push(toJS(value));
  });

  return a;
}


exports.toJS_interface = toJS_interface;
exports.toJS = toJS;
exports.toJS_object = toJS_object;
exports.toJS_array = toJS_array;
