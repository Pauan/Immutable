import { insert as insert_at, modify as modify_at, remove as remove_at, copy as array_copy } from "../Immutable/Array";

export { array_copy };

export function array_has(i, len) {
  return i >= 0 && i < len;
}

export function array_get(array, i, def) {
  var len = array.length;

  if (i < 0) {
    i += len;
  }

  if (array_has(i, len)) {
    return array[i];
  } else if (arguments.length === 3) {
    return def;
  } else {
    throw new Error("Invalid index: " + i);
  }
}

export function array_insert(array, i, value) {
  var len = array.length;

  if (i < 0) {
    i += (len + 1);
  }

  if (i >= 0 && i <= len) {
    return insert_at(array, i, value);
  } else {
    throw new Error("Invalid index: " + i);
  }
}

export function array_modify(array, i, f) {
  var len = array.length;

  if (i < 0) {
    i += len;
  }

  if (array_has(i, len)) {
    return modify_at(array, i, f);
  } else {
    throw new Error("Invalid index: " + i);
  }
}

export function array_remove(array, i) {
  var len = array.length;

  if (i < 0) {
    i += len;
  }

  if (array_has(i, len)) {
    return remove_at(array, i);
  } else {
    throw new Error("Invalid index: " + i);
  }
}

export function array_slice(array, from, to) {
  var len = array.length;

  if (arguments.length < 2) {
    from = 0;
  }
  if (arguments.length < 3) {
    to = len;
  }

  if (from < 0) {
    from += len;
  }
  if (to < 0) {
    to += len;
  }

  if (from === 0 && to === len) {
    return array;

  } else if (from > to) {
    throw new Error("Index " + from + " is greater than index " + to);

  } else if (array_has(from, len)) {
    if (from === to) {
      return [];

    // TODO code duplication with array_has ?
    } else if (to > 0 && to <= len) {
      return array.slice(from, to);

    } else {
      throw new Error("Index " + to + " is not valid");
    }

  } else {
    throw new Error("Index " + from + " is not valid");
  }
}

export function array_concat(array, other) {
  if (array.length === 0) {
    return other;
  } else if (other.length === 0) {
    return array;
  } else {
    return array.concat(other);
  }
}
