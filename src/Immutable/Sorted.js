import { concat, balanced_node } from "./AVL";
import { nil } from "./nil";

export function simpleSort(x, y) {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else {
    return 1;
  }
}

// TODO what if `sort` suspends ?
export function key_get(node, sort, hash) {
  while (node !== nil) {
    var order = sort(hash, node.hash);
    if (order === 0) {
      break;

    } else if (order < 0) {
      node = node.left;

    } else {
      node = node.right;
    }
  }

  return node;
}

// TODO what if `sort` suspends ?
export function key_set(node, sort, hash, new_node) {
  if (node === nil) {
    return new_node;

  } else {
    var left  = node.left;
    var right = node.right;

    var order = sort(hash, node.hash);
    if (order === 0) {
      return node.modify(new_node);

    } else if (order < 0) {
      var child = key_set(left, sort, hash, new_node);
      if (child === left) {
        return node;
      } else {
        return balanced_node(node, child, right);
      }

    } else {
      var child = key_set(right, sort, hash, new_node);
      if (child === right) {
        return node;
      } else {
        return balanced_node(node, left, child);
      }
    }
  }
}

// TODO code duplication with key_set
// TODO what if `sort` suspends ?
export function key_modify(node, sort, hash, key, f) {
  if (node === nil) {
    throw new Error("Key " + key + " not found");

  } else {
    var left  = node.left;
    var right = node.right;

    var order = sort(hash, node.hash);
    if (order === 0) {
      // TODO what if `f` suspends?
      return node.modify({ key: key, hash: hash, value: f(node.value) });

    } else if (order < 0) {
      var child = key_modify(left, sort, hash, key, f);
      if (child === left) {
        return node;
      } else {
        return balanced_node(node, child, right);
      }

    } else {
      var child = key_modify(right, sort, hash, key, f);
      if (child === right) {
        return node;
      } else {
        return balanced_node(node, left, child);
      }
    }
  }
}

// TODO what if `sort` suspends ?
export function key_remove(node, sort, hash) {
  if (node === nil) {
    return node;

  } else {
    var left  = node.left;
    var right = node.right;

    var order = sort(hash, node.hash);
    if (order === 0) {
      return concat(left, right);

    } else if (order < 0) {
      var child = key_remove(left, sort, hash);
      if (child === left) {
        return node;
      } else {
        return balanced_node(node, child, right);
      }

    } else {
      var child = key_remove(right, sort, hash);
      if (child === right) {
        return node;
      } else {
        return balanced_node(node, left, child);
      }
    }
  }
}
