export function isObject(x) {
  return Object(x) === x;
}

export function isJSLiteral(x) {
  if (isObject(x)) {
    var proto = Object.getPrototypeOf(x);
    // TODO this won't work cross-realm
    return proto === null || proto === Object.prototype;
  } else {
    return false;
  }
}

export function repeat(s, i) {
  return new Array(i + 1).join(s);
}

export function pad_right(input, i, s) {
  var right = Math.max(0, i - input.length);
  return input + repeat(s, right);
}

export function identity(x) {
  return x;
}
