var _hash = require("./hash");
var _AVL  = require("./AVL");

var nil   = require("./nil");

var concat = _AVL.concat;
var balanced_node = _AVL.balanced_node;

var hash = _hash.hash;


function simpleSort(x, y) {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else {
    return 1;
  }
}

// TODO store the hash rather than the key for Dict and Set ?
function defaultSort(x, y) {
  x = hash(x);
  y = hash(y);
  return simpleSort(x, y);
}

// TODO what if `sort` suspends ?
function key_get(node, sort, key) {
  while (node !== nil) {
    var order = sort(key, node.key);
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
function key_set(node, sort, key, new_node) {
  if (node === nil) {
    return new_node;

  } else {
    var left  = node.left;
    var right = node.right;

    var order = sort(key, node.key);
    if (order === 0) {
      return node.modify(new_node);

    } else if (order < 0) {
      var child = key_set(left, sort, key, new_node);
      if (child === left) {
        return node;
      } else {
        return balanced_node(node, child, right);
      }

    } else {
      var child = key_set(right, sort, key, new_node);
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
function key_modify(node, sort, key, f) {
  if (node === nil) {
    throw new Error("Key " + key + " not found");

  } else {
    var left  = node.left;
    var right = node.right;

    var order = sort(key, node.key);
    if (order === 0) {
      // TODO what if `f` suspends?
      return node.modify({ key: key, value: f(node.value) });

    } else if (order < 0) {
      var child = key_modify(left, sort, key, f);
      if (child === left) {
        return node;
      } else {
        return balanced_node(node, child, right);
      }

    } else {
      var child = key_modify(right, sort, key, f);
      if (child === right) {
        return node;
      } else {
        return balanced_node(node, left, child);
      }
    }
  }
}

// TODO what if `sort` suspends ?
function key_remove(node, sort, key) {
  if (node === nil) {
    return node;

  } else {
    var left  = node.left;
    var right = node.right;

    var order = sort(key, node.key);
    if (order === 0) {
      return concat(left, right);

    } else if (order < 0) {
      var child = key_remove(left, sort, key);
      if (child === left) {
        return node;
      } else {
        return balanced_node(node, child, right);
      }

    } else {
      var child = key_remove(right, sort, key);
      if (child === right) {
        return node;
      } else {
        return balanced_node(node, left, child);
      }
    }
  }
}


exports.simpleSort = simpleSort;
exports.defaultSort = defaultSort;
exports.key_get = key_get;
exports.key_set = key_set;
exports.key_modify = key_modify;
exports.key_remove = key_remove;
