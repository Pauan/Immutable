import { each, isTuple, fromJSON, toJSON, equal, toJS } from "../Immutable";
import { nil } from "../Immutable/static";
import { assert } from "./assert";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function random_int(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function otherSort(x, y) {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else {
    return 1;
  }
}

// http://bost.ocks.org/mike/shuffle/
// TODO test whether this algorithm has statistical bias or not
// TODO this is only needed for "test/test.js"
function shuffle(array) {
  var i = array.length;

  while (i) {
    var j = random_int(0, i);
    --i;
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export function random_list(max) {
  var out = [];
  for (var i = 0; i < max; ++i) {
    out.push(i);
  }
  shuffle(out);
  return out;
}


//var { zip, toArray } = require('sjs:sequence');

// TODO code duplication with Immutable/util
function isObject(x) {
  return Object(x) === x;
}

var hasOwnProperty = {}.hasOwnProperty;

/*function shallowEqual(x, y) {
  if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length === y.length) {
      for (var i = 0, l = x.length; i < l; ++i) {
        if (x[i] !== y[i]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  } else {
    return x === y;
  }
}*/

export function deepEqual(x, y) {
  if (x === y) {
    return true;

  } else if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length === y.length) {
      for (var i = 0, l = x.length; i < l; ++i) {
        if (!deepEqual(x[i], y[i])) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }

  } else if (isObject(x) && isObject(y)) {
    if (Object.getPrototypeOf(x) === Object.getPrototypeOf(y)) {
      var x_keys = Object.getOwnPropertyNames(x);
      var y_keys = Object.getOwnPropertyNames(y);

      for (var i = 0, l = x_keys.length; i < l; ++i) {
        var s = x_keys[i];
        if (hasOwnProperty.call(y, s)) {
          if (!deepEqual(x[s], y[s])) {
            return false;
          }
        } else {
          return false;
        }
      }

      for (var i = 0, l = y_keys.length; i < l; ++i) {
        var s = y_keys[i];
        if (!hasOwnProperty.call(x, s)) {
          return false;
        }
      }

      return true;

    } else {
      return false;
    }

  } else {
    return false;
  }
}

// TODO test that this works correctly
export function verify_tree(tree) {
  var sort = tree.sort;
  var hash_fn = tree.hash_fn;

  function loop(node, lt, gt) {
    if (node !== nil) {
      var left  = node.left;
      var right = node.right;

      assert(node.depth === Math.max(left.depth, right.depth) + 1);

      var diff = left.depth - right.depth;
      assert(diff === -1 || diff === 0 || diff === 1);

      // Every left node must be lower than the parent node
      lt.forEach(function (parent) {
        assert(sort(hash_fn(node.key), hash_fn(parent.key)) < 0);
      });

      // Every right node must be greater than the parent node
      gt.forEach(function (parent) {
        assert(sort(hash_fn(node.key), hash_fn(parent.key)) > 0);
      });

      loop(left,  lt.concat([node]), gt);
      loop(right, lt, gt.concat([node]));
    }
  }
  loop(tree.root, [], []);
}

export function test_each(constructor, input) {
  var a = [];
  each(constructor(input), function (x) {
    a.push(x);
  });
  assert(deepEqual(a, input));
}

export function test_each_dict(input, expected) {
  var a = [];
  each(input, function (x) {
    assert(isTuple(x));
    a.push(x.values);
  });
  assert(deepEqual(a, expected));
}

export function verify_json_equal(x) {
  var y = toJSON(x);
  assert(y !== x);

  var z = fromJSON(y);
  assert(z !== y);

  assert(equal(x, z));
}


export function verify_json(x, expected) {
  var y = toJSON(x);
  assert(y !== x);

  var z = fromJSON(y);
  assert(z !== y);

  assert(equal(x, z));
  assert(deepEqual(toJS(x), expected));
  assert(deepEqual(toJS(z), expected));
}
