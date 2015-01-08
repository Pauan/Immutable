// TODO circular import
import { isTuple } from "./ImmutableTuple";

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

export function plural(i, s) {
  if (i === 1) {
    return s;
  } else {
    return s + "s";
  }
}

export function destructure_pair(x, f) {
  if (Array.isArray(x)) {
    if (x.length === 2) {
      return f(x[0], x[1]);
    } else {
      throw new Error("Expected array with 2 elements but got " + x.length + " " + plural(x.length, "element"));
    }

  } else if (isTuple(x)) {
    if (x.size() === 2) {
      return f(x.get(0), x.get(1));
    } else {
      // TODO code duplication
      throw new Error("Expected Tuple with 2 elements but got " + x.size() + " " + plural(x.size(), "element"));
    }

  } else {
    throw new Error("Expected array or Tuple but got: " + x);
  }
}
