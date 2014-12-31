var _immutable = require("../index");
var assert     = require("./assert");

// TODO hacky
var nil = _immutable._nil;
var defaultSort = _immutable.defaultSort;
var simpleSort = _immutable.simpleSort;
var Dict = _immutable.Dict;
var Set = _immutable.Set;
var List = _immutable.List;
var Queue = _immutable.Queue;
var Stack = _immutable.Stack;
var equal = _immutable.equal;
var toJS = _immutable.toJS;
var SortedSet = _immutable.SortedSet;
var SortedDict = _immutable.SortedDict;
var isDict = _immutable.isDict;
var isSet = _immutable.isSet;
var isList = _immutable.isList;
var isSortedDict = _immutable.isSortedDict;
var isSortedSet = _immutable.isSortedSet;
var isQueue = _immutable.isQueue;
var isStack = _immutable.isStack;
var isImmutable = _immutable.isImmutable;


// TODO move this into a different module
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// http://bost.ocks.org/mike/shuffle/
// TODO test whether this algorithm has statistical bias or not
// TODO this is only needed for "test/test.js"
function shuffle(array) {
  var i = array.length;

  while (i) {
    var j = randomInt(0, i);
    --i;
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}


var TESTS_SUCCEEDED = 0;
var TESTS_FAILED = 0;
var CONTEXT = null;

function context(s, f) {
  var old_context = CONTEXT;
  CONTEXT = s;
  try {
    f();
  } finally {
    CONTEXT = old_context;
  }
}

function test(s, f) {
  try {
    f();
    ++TESTS_SUCCEEDED;
  } catch (e) {
    ++TESTS_FAILED;
    console.log("");
    console.log("*** " + (CONTEXT ? CONTEXT + "." : "") + s + " FAILED");
    console.log(e.stack);
    console.log("");
  }
}

function assert_raises(f, message) {
  try {
    f();
    throw new Error("Expected an error, but it did not happen");
  } catch (e) {
    if (e.message !== message) {
      throw new Error("Expected " + message + " but got " + e.message);
    }
  }
}

//var { zip, toArray } = require('sjs:sequence');

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

function deepEqual(x, y) {
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

function test_forEach(constructor, input) {
  var a = [];
  constructor(input).forEach(function (x) {
    a.push(x);
  });
  assert(deepEqual(a, input));
}



// TODO test that this works correctly
function verify_dict(tree, obj) {
  var sort = tree.sort;

  function loop(node, lt, gt) {
    if (node !== nil) {
      var left  = node.left;
      var right = node.right;

      assert(node.depth === Math.max(left.depth, right.depth) + 1);

      var diff = left.depth - right.depth;
      assert(diff === -1 || diff === 0 || diff === 1);

      // Every left node must be lower than the parent node
      lt.forEach(function (parent) {
        assert(sort(node.key, parent.key) < 0);
      });

      // Every right node must be greater than the parent node
      gt.forEach(function (parent) {
        assert(sort(node.key, parent.key) > 0);
      });

      loop(left,  lt.concat([node]), gt);
      loop(right, lt, gt.concat([node]));
    }
  }
  loop(tree.root, [], []);

  assert(deepEqual(toJS(tree), obj));

  return tree;
}

function verify_set(tree, array) {
  return verify_dict(tree, array);
}

function verify_list(tree, array) {
  function loop(node) {
    if (node !== nil) {
      var left  = node.left;
      var right = node.right;

      assert(node.depth === Math.max(left.depth, right.depth) + 1);

      var diff = left.depth - right.depth;
      assert(diff === -1 || diff === 0 || diff === 1);

      assert(node.array.length <= 125);

      assert(node.size === left.size + right.size + node.array.length);
      loop(left);
      loop(right);
    }
  }
  loop(tree.root);

  var count = 0;
  var cons = tree.tail;
  while (cons !== nil) {
    ++count;
    cons = cons.cdr;
  }

  assert(count === tree.tail_size);
  assert(tree.tail_size <= 125);

  assert(deepEqual(toJS(tree), array));

  return tree;
}

function verify_queue(queue, array) {
  if (!queue.isEmpty()) {
    assert(queue.left !== nil);
  }

  assert(deepEqual(toJS(queue), array));

  return queue;
}

function verify_stack(stack, array) {
  assert(deepEqual(toJS(stack), array));

  return stack;
}

function random_int(max) {
  return Math.floor(Math.random() * max);
}

function random_list(max) {
  var out = [];
  for (var i = 0; i < max; ++i) {
    out.push(i);
  }
  shuffle(out);
  return out;
}


context("Dict", function () {
  var dict_empty = Dict();
  var dict_foo   = Dict().set("foo", 1);

  test("isDict", function () {
    assert(!isDict(Set()));

    assert(isDict(Dict()));
    assert(isDict(SortedDict(defaultSort)));

    assert(isSortedDict(SortedDict(simpleSort)));
    assert(!isSortedDict(SortedDict(defaultSort)));
    assert(!isSortedDict(Dict()));
  });

  test("verify", function () {
    verify_dict(dict_empty, {});
    verify_dict(dict_foo, { foo: 1 });
  });

  test("init", function () {
    var x = Dict({ foo: 1 });
    verify_dict(x, { foo: 1 });
    assert(equal(x, dict_foo));
    assert(equal(dict_foo, x));
  });

  test("isEmpty", function () {
    assert(dict_empty.isEmpty());
    assert(!dict_foo.isEmpty());
  });

  test("has", function () {
    assert(!dict_empty.has("foo"));
    assert(!dict_empty.has("bar"));

    assert(dict_foo.has("foo"));
    assert(!dict_foo.has("bar"));
  });

  test("get", function () {
    assert_raises(function () {
      dict_empty.get("foo");
    }, "Key foo not found");

    assert(dict_empty.get("foo", 50) === 50);

    assert(dict_foo.get("foo") === 1);
    assert(dict_foo.get("foo", 50) === 1);
  });

  test("set", function () {
    var dict_bar = dict_empty.set("bar", 2);
    assert(!dict_empty.has("bar"));
    assert(dict_bar.has("bar"));
    assert(dict_bar.get("bar") === 2);

    var dict_foo2 = dict_foo.set("foo", 3);
    assert(dict_foo.get("foo") === 1);
    assert(dict_foo2.get("foo") === 3);
  });

  test("modify", function () {
    var ran = false;

    assert_raises(function () {
      dict_empty.modify("foo", function (x) {
        ran = true;
        return x + 1;
      });
    }, "Key foo not found");

    assert(ran === false);


    var ran = false;

    var dict_foo2 = dict_foo.modify("foo", function (x) {
      ran = true;
      assert(x === 1);
      return x + 5;
    });

    assert(ran === true);

    assert(dict_foo.get("foo") === 1);
    assert(dict_foo2.get("foo") === 6);
  });

  test("remove", function () {
    assert(!dict_empty.has("foo"));

    var dict_empty2 = dict_empty.remove("foo");
    assert(!dict_empty2.has("foo"));

    var dict_foo2 = dict_foo.remove("foo");
    assert(dict_foo.has("foo"));
    assert(!dict_foo2.has("foo"));
  });

  test("complex keys", function () {
    var o = Dict();

    var m1 = {};
    var m2 = {};

    var i1 = Dict();
    var i2 = Dict();
    var i3 = Dict({ foo: 10 });

    o = o.set(m1, 1);
    o = o.set(m2, 2);
    o = o.set(i1, 3);
    o = o.set(i2, 4);
    o = o.set(i3, 5);

    assert(o.has(m1));
    assert(o.has(m2));
    assert(o.has(i1));
    assert(o.has(i2));
    assert(o.has(i3));

    assert(o.get(m1) === 1);
    assert(o.get(m2) === 2);
    assert(o.get(i1) === 4);
    assert(o.get(i2) === 4);
    assert(o.get(i3) === 5);

    o = o.remove(m1);
    o = o.remove(m2);
    o = o.remove(i1);
    o = o.remove(i3);

    assert(!o.has(m1));
    assert(!o.has(m2));
    assert(!o.has(i1));
    assert(!o.has(i2));
    assert(!o.has(i3));
  });

  test("=== when not modified", function () {
    assert(Dict(dict_foo) === dict_foo);
    assert(SortedDict(defaultSort, dict_foo) === dict_foo);
    assert(SortedDict(simpleSort, dict_foo) !== dict_foo);

    assert(dict_empty.remove("foo") === dict_empty);

    assert(dict_foo.set("foo", 1) === dict_foo);
    assert(dict_foo.set("foo", 2) !== dict_foo);
    assert(dict_foo.set("bar", 3) !== dict_foo);
    assert(dict_foo.remove("foo") !== dict_foo);

    var dict1 = Dict().set(Dict({ foo: 1 }), Dict({ bar: 2 }));

    assert(dict1.modify(Dict({ foo: 1 }), function () {
      return Dict({ bar: 2 });
    }) !== dict1);

    assert(dict1.modify(Dict({ foo: 1 }), function () {
      return Dict({ bar: 3 });
    }) !== dict1);

    assert(dict_foo.modify("foo", function () {
      return 1;
    }) === dict_foo);

    assert(dict_foo.modify("foo", function () {
      return 2;
    }) !== dict_foo);
  });

  test("equal", function () {
    assert(!equal(dict_empty, dict_foo));
    assert(equal(dict_empty, dict_empty));
    assert(equal(dict_foo, dict_foo));
    assert(equal(Dict(), Dict()));
    assert(equal(Dict({ foo: 1 }), Dict({ foo: 1 })));
    assert(equal(Dict({ foo: Dict({ bar: 2 }) }),
                 Dict({ foo: Dict({ bar: 2 }) })));
    assert(!equal(Dict({ foo: Dict({ bar: 2 }) }),
                  Dict({ foo: Dict({ bar: 3 }) })));

    assert(equal(SortedDict(defaultSort, { foo: 1 }),
                 Dict({ foo: 1 })));

    assert(!equal(SortedDict(simpleSort, { foo: 1 }),
                  Dict({ foo: 1 })));
  });

  test("toJS", function () {
    assert(deepEqual(toJS(dict_empty), {}));
    assert(deepEqual(toJS(dict_foo), { foo: 1 }));
    assert(deepEqual(toJS(Dict({ foo: Dict({ bar: 2 }) })),
                     { foo: { bar: 2 } }));
  });

  test("random keys", function () {
    var o = Dict();
    var js = {};
    verify_dict(o, js);

    random_list(200).forEach(function (i) {
      o = o.set("foo" + i, 5);
      js["foo" + i] = 5;
      verify_dict(o, js);
    });

    random_list(200).forEach(function (i) {
      o = o.modify("foo" + i, function (x) {
        return x + 15;
      });
      js["foo" + i] = js["foo" + i] + 15;
      verify_dict(o, js);
    });

    random_list(200).forEach(function (i) {
      o = o.remove("foo" + i);
      delete js["foo" + i];
      verify_dict(o, js);
    });
  });

  test("forEach", function () {
    test_forEach(Dict, []);

    var corge = Dict({ corge: 3 });
    test_forEach(Dict, [["bar", 2], ["foo", 1], ["qux", corge]]);
  });

  test("toString", function () {
    assert("" + Dict() === "(Dict)");
    assert("" + SortedDict(defaultSort) === "(Dict)");
    assert("" + SortedDict(simpleSort) === "(SortedDict (Mutable 3))");
    assert("" + SortedDict(simpleSort, { foo: 1 }) === "(SortedDict (Mutable 3)\n  \"foo\" = 1)");
    assert("" + SortedDict(simpleSort, { foo: 1, bar: 2 }) === "(SortedDict (Mutable 3)\n  \"bar\" = 2\n  \"foo\" = 1)");

    assert("" + Dict({ foo: 1 }) === "(Dict\n  \"foo\" = 1)");
    assert("" + Dict({ foo: 1, bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\" = 1)");
    assert("" + Dict({ "foo\nbar\nqux": 1, bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = 1)");
    assert("" + Dict({ foo: Dict({ qux: 3 }), bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\" = (Dict\n            \"qux\" = 3))");
    assert("" + Dict({ "foo\nbar\nqux": Dict({ qux: 3 }), bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = (Dict\n            \"qux\" = 3))");

    assert("" + Dict({ foobarquxcorgenou: 1, bar: 2 }) === "(Dict\n  \"bar\"               = 2\n  \"foobarquxcorgenou\" = 1)");
    assert("" + Dict({ "foobar\nquxcorgenou": 1, bar: 2 }) === "(Dict\n  \"bar\"         = 2\n  \"foobar\n   quxcorgenou\" = 1)");
    assert("" + Dict({ "foo\nbar\nqux": 1, "barquxcorgenou": 2 }) === "(Dict\n  \"barquxcorgenou\" = 2\n  \"foo\n   bar\n   qux\"            = 1)");

    assert("" + Dict([[Dict({ foo: 1 }), Dict({ bar: 2 })]]) === "(Dict\n  (Dict\n    \"foo\" = 1) = (Dict\n                   \"bar\" = 2))");
  });

  // TODO
  /*test("zip", function () {
    var a = [["a", 1], ["b", 2], ["c", 3], ["d", 4],
             ["e", 5], ["f", 6], ["g", 7], ["h", 8]];
    assert.equal(toArray(zip(Dict(a))), toArray(zip(a)));
  });*/
});


context("Set", function () {
  var empty_set = Set();
  var five_set  = Set().add(1).add(2).add(3).add(4).add(5);

  test("isSet", function () {
    assert(!isSet(Dict()));

    assert(isSet(Set()));
    assert(isSet(SortedSet(defaultSort)));

    assert(isSortedSet(SortedSet(simpleSort)));
    assert(!isSortedSet(SortedSet(defaultSort)));
    assert(!isSortedSet(Set()));
  });

  test("verify", function () {
    verify_set(empty_set, []);
    verify_set(five_set, [1, 2, 3, 4, 5]);
  });

  test("init", function () {
    verify_set(Set([1, 2, 3]), [1, 2, 3]);
  });

  test("isEmpty", function () {
    assert(empty_set.isEmpty());
    assert(!five_set.isEmpty());
  });

  test("has", function () {
    assert(!empty_set.has(1));
    assert(!five_set.has(0));
    assert(five_set.has(1));
    assert(five_set.has(2));
    assert(five_set.has(3));
    assert(five_set.has(4));
    assert(five_set.has(5));
    assert(!five_set.has(6));
  });

  test("add", function () {
    verify_set(empty_set, []);
    verify_set(empty_set.add(5), [5]);
    verify_set(empty_set, []);

    verify_set(five_set, [1, 2, 3, 4, 5]);
    verify_set(five_set.add(5), [1, 2, 3, 4, 5]);
    verify_set(five_set, [1, 2, 3, 4, 5]);
  });

  test("remove", function () {
    verify_set(empty_set.remove(1), []);

    verify_set(five_set.remove(1), [2, 3, 4, 5]);
    verify_set(five_set.remove(1).remove(4), [2, 3, 5]);
  });

  test("union", function () {
    verify_set(five_set.union(five_set), [1, 2, 3, 4, 5]);
    verify_set(five_set.union(Set([1, 2, 6, 9])), [1, 2, 3, 4, 5, 6, 9]);
    verify_set(Set([1, 2]).union(five_set), [1, 2, 3, 4, 5]);
    verify_set(Set([1, 2, 6]).union(five_set), [1, 2, 3, 4, 5, 6]);
    verify_set(five_set.union([1, 2, 6, 9]), [1, 2, 3, 4, 5, 6, 9]);
  });

  test("intersect", function () {
    verify_set(five_set.intersect(five_set), [1, 2, 3, 4, 5]);
    verify_set(empty_set.intersect(five_set), []);
    verify_set(five_set.intersect(empty_set), []);
    verify_set(five_set.intersect([1, 3, 4]), [1, 3, 4]);
    verify_set(five_set.intersect([1, 3, 4, 6, 10, 20]), [1, 3, 4]);
  });

  test("disjoint", function () {
    verify_set(five_set.disjoint(five_set), []);
    verify_set(five_set.disjoint(empty_set), [1, 2, 3, 4, 5]);
    verify_set(empty_set.disjoint(five_set), [1, 2, 3, 4, 5]);
    verify_set(five_set.disjoint([1, 2, 3]), [4, 5]);
    verify_set(five_set.disjoint([1, 2, 3, 6, 7, 8]), [4, 5, 6, 7, 8]);
  });

  test("subtract", function () {
    verify_set(five_set.subtract(empty_set), [1, 2, 3, 4, 5]);
    verify_set(empty_set.subtract(five_set), []);
    verify_set(five_set.subtract(five_set), []);
    verify_set(five_set.subtract([1, 2, 3]), [4, 5]);
    verify_set(five_set.subtract([1, 2, 3, 6, 7, 9]), [4, 5]);
  });

  test("complex elements", function () {
    var o = Set();

    var m1 = {};
    var m2 = {};

    var i1 = Set();
    var i2 = Set();
    var i3 = Set([1, 2, 3]);

    o = o.add(m1);
    o = o.add(m2);
    o = o.add(i1);
    o = o.add(i2);
    o = o.add(i3);

    assert(o.has(m1));
    assert(o.has(m2));
    assert(o.has(i1));
    assert(o.has(i2));
    assert(o.has(i3));

    o = o.remove(m1);
    o = o.remove(m2);
    o = o.remove(i1);
    o = o.remove(i3);

    assert(!o.has(m1));
    assert(!o.has(m2));
    assert(!o.has(i1));
    assert(!o.has(i2));
    assert(!o.has(i3));
  });

  test("=== when not modified", function () {
    assert(empty_set.union(empty_set) === empty_set);
    assert(empty_set.union(five_set) !== five_set);
    assert(five_set.union(empty_set) === five_set);
    assert(five_set.union(five_set) === five_set);
    assert(five_set.union(Set([1, 2, 3])) === five_set);

    assert(Set(five_set) === five_set);
    assert(SortedSet(defaultSort, five_set) === five_set);
    assert(SortedSet(simpleSort, five_set) !== five_set);

    assert(empty_set.remove(1) === empty_set);

    var set1 = Set([Set([])]);

    assert(set1.add(Set([])) !== set1);

    assert(five_set.add(5) === five_set);
    assert(five_set.add(6) !== five_set);
    assert(five_set.remove(5) !== five_set);
  });

  test("equal", function () {
    assert(!equal(empty_set, five_set));
    assert(equal(empty_set, empty_set));
    assert(equal(five_set, five_set));
    assert(equal(Set(), Set()));
    assert(equal(Set([1]), Set([1])));
    assert(equal(Set([Set([1])]), Set([Set([1])])));
    assert(!equal(Set([Set([1])]), Set([Set([2])])));

    assert(equal(SortedSet(defaultSort, [1, 2, 3]),
                 Set([1, 2, 3])));
    assert(!equal(SortedSet(simpleSort, [1, 2, 3]),
                  Set([1, 2, 3])));
  });

  test("toJS", function () {
    assert(deepEqual(toJS(empty_set), []));
    assert(deepEqual(toJS(five_set), [1, 2, 3, 4, 5]));
    assert(deepEqual(toJS(Set([1, 2, Set([3])])),
                     [[3], 1, 2]));
  });

  test("random elements", function () {
    var o = Set();
    var a = [];

    var sort = o.sort;

    // TODO utilities for these
    function push_sorted(a, x, sort) {
      for (var i = 0, l = a.length; i < l; ++i) {
        if (sort(x, a[i]) <= 0) {
          a.splice(i, 0, x);
          return;
        }
      }
      a.push(x);
    }

    function remove(a, x) {
      var index = a.indexOf(x);
      assert(index !== -1);
      a.splice(index, 1);
    }

    verify_set(o, a);

    random_list(200).forEach(function (i) {
      o = o.add(i);
      push_sorted(a, i, sort);
      verify_set(o, a);
    });

    random_list(200).forEach(function (i) {
      o = o.remove(i);
      remove(a, i);
      verify_set(o, a);
    });

    verify_set(o, []);
  });

  test("forEach", function () {
    test_forEach(Set, []);

    var four = Set([4]);
    test_forEach(Set, [four, 1, 2, 3]);
  });

  test("toString", function () {
    assert("" + Set() === "(Set)");
    assert("" + SortedSet(defaultSort) === "(Set)");
    assert("" + SortedSet(simpleSort) === "(SortedSet (Mutable 3))");
    assert("" + Set([1, 2, 3, 4, 5]) === "(Set\n  1\n  2\n  3\n  4\n  5)");
    assert("" + SortedSet(simpleSort, [1, 2, 3, 4, 5]) === "(SortedSet (Mutable 3)\n  1\n  2\n  3\n  4\n  5)");
    assert("" + Set([Set([1, 2, 3])]) === "(Set\n  (Set\n    1\n    2\n    3))");
  });

  // TODO
  /*test("zip", function () {
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    assert.equal(toArray(zip(Set(a))), toArray(zip(a)));
  });*/
});


context("List", function () {
  var empty_list = List();
  var five_list  = List().insert(1).insert(2).insert(3).insert(4).insert(5);

  test("isList", function () {
    assert(!isList(Dict()));
    assert(isList(List()));
  });

  test("verify", function () {
    verify_list(empty_list, []);
    verify_list(five_list, [1, 2, 3, 4, 5]);
  });

  test("init", function () {
    verify_list(List([1, 2, 3]), [1, 2, 3]);
  });

  test("isEmpty", function () {
    assert(empty_list.isEmpty());
    assert(!five_list.isEmpty());
  });

  test("size", function () {
    assert(empty_list.size() === 0);
    assert(five_list.size() === 5);
  });

  test("has", function () {
    assert(!empty_list.has(0));
    assert(!empty_list.has(-1));

    assert(five_list.has(0));
    assert(five_list.has(4));
    assert(five_list.has(-1));
    assert(five_list.has(-5));
    assert(!five_list.has(5));
    assert(!five_list.has(-6));
  });

  test("get", function () {
    assert(empty_list.get(0, 50) === 50);
    assert(empty_list.get(-1, 50) === 50);

    assert_raises(function () {
      empty_list.get(0);
    }, "Index 0 is not valid");

    assert_raises(function () {
      empty_list.get(-1);
    }, "Index -1 is not valid");

    assert(empty_list.get(0, 50) === 50);

    assert(five_list.get(0, 50) === 1);
    assert(five_list.get(4, 50) === 5);
    assert(five_list.get(-1, 50) === 5);
    assert(five_list.get(-2, 50) === 4);
  });

  test("insert", function () {
    assert_raises(function () {
      empty_list.insert(5, 1);
    }, "Index 1 is not valid");

    assert_raises(function () {
      empty_list.insert(5, -2);
    }, "Index -1 is not valid");

    var x = empty_list.insert(10);

    verify_list(empty_list, []);
    verify_list(x, [10]);

    assert(empty_list.size() === 0);
    assert(x.size() === 1);
    assert(x.get(0) === 10);
    assert(x.get(-1) === 10);

    verify_list(five_list.insert(10), [1, 2, 3, 4, 5, 10]);
    verify_list(five_list.insert(10).insert(20), [1, 2, 3, 4, 5, 10, 20]);
    verify_list(five_list.insert(10, 0), [10, 1, 2, 3, 4, 5]);
    verify_list(five_list.insert(10, 1), [1, 10, 2, 3, 4, 5]);
    verify_list(five_list.insert(10, -1), [1, 2, 3, 4, 5, 10]);
    verify_list(five_list.insert(10, -2), [1, 2, 3, 4, 10, 5]);
    verify_list(five_list, [1, 2, 3, 4, 5]);

    verify_list(List().insert(5, 0).insert(4, 0).insert(3, 0).insert(2, 0).insert(1, 0),
                [1, 2, 3, 4, 5]);
  });

  test("remove", function () {
    assert_raises(function () {
      empty_list.remove();
    }, "Index -1 is not valid");

    assert_raises(function () {
      empty_list.remove(0);
    }, "Index 0 is not valid");

    assert_raises(function () {
      empty_list.remove(-1);
    }, "Index -1 is not valid");

    verify_list(five_list.remove(), [1, 2, 3, 4]);
    verify_list(five_list.remove().remove(), [1, 2, 3]);
    verify_list(five_list.remove(-1), [1, 2, 3, 4]);
    verify_list(five_list.remove(-2), [1, 2, 3, 5]);
    verify_list(five_list.remove(0), [2, 3, 4, 5]);
    verify_list(five_list.remove(1), [1, 3, 4, 5]);
  });

  test("modify", function () {
    var ran = false;

    assert_raises(function () {
      empty_list.modify(0, function () { ran = true; });
    }, "Index 0 is not valid");

    assert_raises(function () {
      empty_list.modify(-1, function () { ran = true; });
    }, "Index -1 is not valid");

    assert(ran === false);


    var ran = false;

    verify_list(five_list.modify(0, function (x) {
      ran = true;
      assert(x === 1);
      return x + 100;
    }), [101, 2, 3, 4, 5]);

    assert(ran === true);


    verify_list(five_list.modify(-1, function (x) { return x + 100 }), [1, 2, 3, 4, 105]);
    verify_list(five_list.modify(1, function (x) { return x + 100 }), [1, 102, 3, 4, 5]);
    verify_list(five_list.modify(-2, function (x) { return x + 100 }), [1, 2, 3, 104, 5]);
  });

  test("slice", function () {
    verify_list(empty_list.slice(0, 0), []);
    verify_list(five_list.slice(0, 0), []);
    verify_list(five_list.slice(0, 2), [1, 2]);
    verify_list(five_list.slice(2, 3), [3]);
    verify_list(five_list.slice(3, 5), [4, 5]);
    verify_list(five_list.slice(0, 5), [1, 2, 3, 4, 5]);

    verify_list(empty_list.slice(), []);

    assert_raises(function () {
      five_list.slice(5, 1);
    }, "Index 5 is greater than index 1");

    assert_raises(function () {
      five_list.slice(6, 7);
    }, "Index 6 is not valid");

    assert_raises(function () {
      five_list.slice(0, 6);
    }, "Index 6 is not valid");

    assert_raises(function () {
      five_list.slice(10, 10);
    }, "Index 10 is not valid");

    verify_list(five_list.slice(null, 5), [1, 2, 3, 4, 5]);
    verify_list(five_list.slice(0, null), [1, 2, 3, 4, 5]);
    verify_list(five_list.slice(null, null), [1, 2, 3, 4, 5]);

    verify_list(five_list.slice(), [1, 2, 3, 4, 5]);
    verify_list(five_list.slice(0), [1, 2, 3, 4, 5]);
    verify_list(five_list.slice(-1), [5]);
    verify_list(five_list.slice(-3), [3, 4, 5]);
    verify_list(five_list.slice(-3, 4), [3, 4]);

    verify_list(five_list.slice(0, -1), [1, 2, 3, 4]);
    verify_list(five_list.slice(-2, -1), [4]);
    verify_list(five_list.slice(-4, -1), [2, 3, 4]);
    verify_list(five_list.slice(-4, 4), [2, 3, 4]);


    var double_list  = List();
    var double_array = [];

    var len = 125 * 2;
    for (var i = 0; i < len; ++i) {
      double_list = double_list.insert(i);
      double_array.push(i);
    }

    verify_list(double_list.slice(0, 124), double_array.slice(0, 124));
    verify_list(double_list.slice(0, 125), double_array.slice(0, 125));
    verify_list(double_list.slice(0, 126), double_array.slice(0, 126));

    verify_list(double_list.slice(124, 250), double_array.slice(124, 250));
    verify_list(double_list.slice(125, 250), double_array.slice(125, 250));
    verify_list(double_list.slice(126, 250), double_array.slice(126, 250));

    verify_list(double_list.slice(124, 125), double_array.slice(124, 125));
    verify_list(double_list.slice(125, 126), double_array.slice(125, 126));

    verify_list(double_list.slice(0, 250), double_array.slice(0, 250));


    var big_list  = List();
    var big_array = [];

    var len = 125 * 1000;
    for (var i = 0; i < len; ++i) {
      big_list = big_list.insert(i);
      big_array.push(i);
    }

    verify_list(big_list.slice(0, 125), big_array.slice(0, 125));
    verify_list(big_list.slice(0, 126), big_array.slice(0, 126));
    verify_list(big_list.slice(125, 250), big_array.slice(125, 250));
    verify_list(big_list.slice(50, 125), big_array.slice(50, 125));
    verify_list(big_list.slice(50, 126), big_array.slice(50, 126));
    verify_list(big_list.slice(50, 2546), big_array.slice(50, 2546));

    verify_list(big_list.slice(0, len), big_array.slice(0, len));
    verify_list(big_list.slice(0, len - 1), big_array.slice(0, len - 1));
    verify_list(big_list.slice(1, len), big_array.slice(1, len));
    verify_list(big_list.slice(1, len - 1), big_array.slice(1, len - 1));
    verify_list(big_list.slice(50, 60), big_array.slice(50, 60));
    verify_list(big_list.slice(50, 125), big_array.slice(50, 125));
    verify_list(big_list.slice(50, 126), big_array.slice(50, 126));
    verify_list(big_list.slice(125, 126), big_array.slice(125, 126));
    verify_list(big_list.slice(124, 126), big_array.slice(124, 126));
    verify_list(big_list.slice(Math.ceil(len / 2)), big_array.slice(Math.ceil(len / 2)));
  });

  test("concat", function () {
    verify_list(empty_list.concat(empty_list), []);
    verify_list(five_list.concat(five_list), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
    verify_list(List([10, 20, 30]).concat(five_list), [10, 20, 30, 1, 2, 3, 4, 5]);
    verify_list(five_list.concat(List([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
    verify_list(five_list.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
  });

  test("=== when not modified", function () {
    assert(List(five_list) === five_list);

    assert(empty_list.concat(empty_list) === empty_list);
    assert(five_list.concat(empty_list) === five_list);
    assert(empty_list.concat(five_list) === five_list);

    assert(empty_list.slice() === empty_list);
    assert(five_list.slice() === five_list);
    assert(five_list.slice(0, 5) === five_list);
    assert(five_list.slice(1, 5) !== five_list);
    assert(five_list.slice(0, 4) !== five_list);

    var list1 = List([List([])]);

    assert(list1.modify(0, function () {
      return List([]);
    }) !== list1);

    assert(five_list.modify(0, function () {
      return 1;
    }) === five_list);

    assert(five_list.modify(0, function () {
      return 2;
    }) !== five_list);

    assert(five_list.modify(1, function () {
      return 2;
    }) === five_list);

    assert(five_list.modify(1, function () {
      return 3;
    }) !== five_list);

    assert(five_list.modify(-1, function () {
      return 5;
    }) === five_list);

    assert(five_list.modify(-1, function () {
      return 6;
    }) !== five_list);
  });

  test("equal", function () {
    assert(equal(empty_list, empty_list));
    assert(equal(five_list, five_list));

    assert(equal(List([1, 2, 3]), List([1, 2, 3])));
    assert(!equal(List([1, 2, 3]), List([1, 2, 4])));
    assert(!equal(List([1, 2, 3]), List([1, 3, 2])));

    assert(equal(List([1, 2, 3, 4, 5]), five_list));
    assert(equal(five_list, List([1, 2, 3, 4, 5])));

    assert(equal(List([List([1, 2, 3])]), List([List([1, 2, 3])])));
  });

  test("toJS", function () {
    assert(deepEqual(toJS(empty_list), []));
    assert(deepEqual(toJS(five_list), [1, 2, 3, 4, 5]));
    assert(deepEqual(toJS(List([1, 2, List([3])])), [1, 2, [3]]));
  });

  test("random elements", function () {
    var o = List();
    var a = [];

    verify_list(o, a);

    random_list(200).forEach(function (x) {
      var index = random_int(o.size());

      o = o.insert(x, index);
      a.splice(index, 0, x);

      verify_list(o, a);
    });

    random_list(200).forEach(function (i) {
      o = o.modify(i, function (x) {
        return x + 15;
      });

      a[i] = a[i] + 15;

      verify_list(o, a);
    });

    while (o.size()) {
      var index = random_int(o.size());
      o = o.remove(index);
      a.splice(index, 1);
      verify_list(o, a);
    }

    assert(o.isEmpty());
    verify_list(o, []);


    var a = random_list(200);
    var pivot = random_int(200);

    function test_concat(pivot) {
      var al = [];
      var ar = [];

      var il = List();
      var ir = List();

      a.slice(0, pivot).forEach(function (x) {
        var index = random_int(il.size());
        il = il.insert(x, index);
        al.splice(index, 0, x);
        verify_list(il, al);
      });

      a.slice(pivot).forEach(function (x) {
        var index = random_int(ir.size());
        ir = ir.insert(x, index);
        ar.splice(index, 0, x);
        verify_list(ir, ar);
      });

      verify_list(il.concat(ir), al.concat(ar));
      verify_list(ir.concat(il), ar.concat(al));
    }

    test_concat(0);
    test_concat(5);
    test_concat(pivot);
    test_concat(194);
    test_concat(199);
  });

  test("forEach", function () {
    test_forEach(List, []);

    var list = List([4]);
    test_forEach(List, [1, 2, 3, list]);

    var expected = random_list(200);
    test_forEach(List, expected);
  });

  test("toString", function () {
    assert("" + empty_list === "(List)");
    assert("" + List([1, 2, 3]) === "(List\n  1\n  2\n  3)");
    assert("" + List([1, List([2]), 3]) === "(List\n  1\n  (List\n    2)\n  3)");
  });

  // TODO
  /*test("zip", function () {
    assert.equal(toArray(zip(List())), toArray(zip([])));

    assert.equal(toArray(zip(List([1, 2, 3, 4, 5]))), [[1], [2], [3], [4], [5]]);

    var a = random_list(200);
    assert.equal(toArray(zip(List(a))), toArray(zip(a)));
  });*/
});


context("Queue", function () {
  var empty_queue = Queue();
  var five_queue  = Queue().push(1).push(2).push(3).push(4).push(5);

  test("isQueue", function () {
    assert(!isQueue(List()));
    assert(isQueue(Queue()));
  });

  test("verify", function () {
    verify_queue(empty_queue, []);
    verify_queue(five_queue, [1, 2, 3, 4, 5]);
  });

  test("init", function () {
    verify_queue(Queue([1, 2, 3]), [1, 2, 3]);
  });

  test("isEmpty", function () {
    assert(empty_queue.isEmpty());
    assert(!five_queue.isEmpty());
  });

  test("size", function () {
    assert(empty_queue.size() === 0);
    assert(five_queue.size() === 5);
  });

  test("peek", function () {
    assert_raises(function () {
      empty_queue.peek();
    }, "Cannot peek from an empty queue");

    assert(empty_queue.peek(50) === 50);

    assert(five_queue.peek() === 1);
    assert(five_queue.peek(50) === 1);
  });

  test("push", function () {
    var x = empty_queue.push(10);

    verify_queue(empty_queue, []);
    verify_queue(x, [10]);

    assert(empty_queue.size() === 0);
    assert(x.size() === 1);
    assert(x.peek() === 10);

    verify_queue(five_queue.push(10), [1, 2, 3, 4, 5, 10]);
    verify_queue(five_queue.push(10).push(20), [1, 2, 3, 4, 5, 10, 20]);
    verify_queue(five_queue, [1, 2, 3, 4, 5]);

    verify_queue(Queue().push(5).push(4).push(3).push(2).push(1),
                 [5, 4, 3, 2, 1]);
  });

  test("pop", function () {
    assert_raises(function () {
      empty_queue.pop();
    }, "Cannot pop from an empty queue");

    verify_queue(five_queue.pop(), [2, 3, 4, 5]);
    verify_queue(five_queue.pop().pop(), [3, 4, 5]);

    verify_queue(Queue(), []);
    verify_queue(Queue().push(5).push(10).push(20).push(30), [5, 10, 20, 30]);
    verify_queue(Queue().push(5).push(10).push(20).push(30).pop(), [10, 20, 30]);
  });

  test("concat", function () {
    verify_queue(empty_queue.concat(empty_queue), []);
    verify_queue(five_queue.concat(five_queue), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
    verify_queue(Queue([10, 20, 30]).concat(five_queue), [10, 20, 30, 1, 2, 3, 4, 5]);
    verify_queue(five_queue.concat(Queue([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
    verify_queue(five_queue.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
  });

  test("=== when not modified", function () {
    assert(Queue(five_queue) === five_queue);

    assert(empty_queue.concat(empty_queue) === empty_queue);
    assert(five_queue.concat(empty_queue) === five_queue);
    assert(empty_queue.concat(five_queue) !== five_queue);
  });

  test("equal", function () {
    assert(equal(empty_queue, empty_queue));
    assert(equal(five_queue, five_queue));

    assert(equal(Queue([1, 2, 3]), Queue([1, 2, 3])));
    assert(!equal(Queue([1, 2, 3]), Queue([1, 2, 4])));
    assert(!equal(Queue([1, 2, 3]), Queue([1, 3, 2])));

    assert(equal(Queue([1, 2, 3, 4, 5]), five_queue));
    assert(equal(five_queue, Queue([1, 2, 3, 4, 5])));

    assert(equal(Queue([Queue([1, 2, 3])]), Queue([Queue([1, 2, 3])])));
  });

  test("toJS", function () {
    assert(deepEqual(toJS(empty_queue), []));
    assert(deepEqual(toJS(five_queue), [1, 2, 3, 4, 5]));
    assert(deepEqual(toJS(Queue([1, 2, Queue([3])])), [1, 2, [3]]));
  });

  test("forEach", function () {
    test_forEach(Queue, []);

    var x = Queue([3]);
    test_forEach(Queue, [1, 2, x, 4]);
  });

  test("toString", function () {
    assert("" + empty_queue === "(Queue)");
    assert("" + Queue([1, 2, 3]) === "(Queue\n  1\n  2\n  3)");
    assert("" + Queue([1, Queue([2]), 3]) === "(Queue\n  1\n  (Queue\n    2)\n  3)");
  });

  // TODO
  /*test("zip", function () {
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    assert.equal(toArray(zip(Queue(a))), toArray(zip(a)));
  });*/
});


context("Stack", function () {
  var empty_stack = Stack();
  var five_stack  = Stack().push(1).push(2).push(3).push(4).push(5);

  test("isStack", function () {
    assert(!isStack(Queue()));
    assert(isStack(Stack()));
  });

  test("verify", function () {
    verify_stack(empty_stack, []);
    verify_stack(five_stack, [1, 2, 3, 4, 5]);
  });

  test("init", function () {
    verify_stack(Stack([1, 2, 3]), [1, 2, 3]);
  });

  test("isEmpty", function () {
    assert(empty_stack.isEmpty());
    assert(!five_stack.isEmpty());
  });

  test("size", function () {
    assert(empty_stack.size() === 0);
    assert(five_stack.size() === 5);
  });

  test("peek", function () {
    assert_raises(function () {
      empty_stack.peek();
    }, "Cannot peek from an empty stack");

    assert(empty_stack.peek(50) === 50);

    assert(five_stack.peek() === 5);
    assert(five_stack.peek(50) === 5);
  });

  test("push", function () {
    var x = empty_stack.push(10);

    verify_stack(empty_stack, []);
    verify_stack(x, [10]);

    assert(empty_stack.size() === 0);
    assert(x.size() === 1);
    assert(x.peek() === 10);

    verify_stack(five_stack.push(10), [1, 2, 3, 4, 5, 10]);
    verify_stack(five_stack.push(10).push(20), [1, 2, 3, 4, 5, 10, 20]);
    verify_stack(five_stack, [1, 2, 3, 4, 5]);

    verify_stack(Stack().push(5).push(4).push(3).push(2).push(1),
                 [5, 4, 3, 2, 1]);
  });

  test("pop", function () {
    assert_raises(function () {
      empty_stack.pop();
    }, "Cannot pop from an empty stack");

    verify_stack(five_stack.pop(), [1, 2, 3, 4]);
    verify_stack(five_stack.pop().pop(), [1, 2, 3]);
  });

  test("concat", function () {
    verify_stack(empty_stack.concat(empty_stack), []);
    verify_stack(five_stack.concat(five_stack), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
    verify_stack(Stack([10, 20, 30]).concat(five_stack), [10, 20, 30, 1, 2, 3, 4, 5]);
    verify_stack(five_stack.concat(Stack([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
    verify_stack(five_stack.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
  });

  test("=== when not modified", function () {
    assert(Stack(five_stack) === five_stack);

    assert(empty_stack.concat(empty_stack) === empty_stack);
    assert(five_stack.concat(empty_stack) === five_stack);
    assert(empty_stack.concat(five_stack) !== five_stack);
  });

  test("equal", function () {
    assert(equal(empty_stack, empty_stack));
    assert(equal(five_stack, five_stack));

    assert(equal(Stack([1, 2, 3]), Stack([1, 2, 3])));
    assert(!equal(Stack([1, 2, 3]), Stack([1, 2, 4])));
    assert(!equal(Stack([1, 2, 3]), Stack([1, 3, 2])));

    assert(equal(Stack([1, 2, 3, 4, 5]), five_stack));
    assert(equal(five_stack, Stack([1, 2, 3, 4, 5])));

    assert(equal(Stack([Stack([1, 2, 3])]), Stack([Stack([1, 2, 3])])));
  });

  test("toJS", function () {
    assert(deepEqual(toJS(empty_stack), []));
    assert(deepEqual(toJS(five_stack), [1, 2, 3, 4, 5]));
    assert(deepEqual(toJS(Stack([1, 2, Stack([3])])), [1, 2, [3]]));
  });

  test("forEach", function () {
    test_forEach(Stack, []);

    var x = Stack([3]);
    test_forEach(Stack, [1, 2, x, 4]);
  });

  test("toString", function () {
    assert("" + empty_stack === "(Stack)");
    assert("" + Stack([1, 2, 3]) === "(Stack\n  1\n  2\n  3)");
    assert("" + Stack([1, Stack([2]), 3]) === "(Stack\n  1\n  (Stack\n    2)\n  3)");
  });

  // TODO
  /*test("zip", function () {
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    assert.equal(toArray(zip(Stack(a))), toArray(zip(a)));
  });*/
});


test("isImmutable", function () {
  assert(!isImmutable(5));
  assert(!isImmutable({}));
  assert(!isImmutable([]));
  assert(isImmutable(Dict()));
  assert(isImmutable(Set()));
  assert(isImmutable(List()));
  assert(isImmutable(Queue()));
  assert(isImmutable(Stack()));
  assert(isImmutable(SortedDict(defaultSort)));
  assert(isImmutable(SortedDict(simpleSort)));
  assert(isImmutable(SortedSet(defaultSort)));
  assert(isImmutable(SortedSet(simpleSort)));
});


console.log("SUCCEEDED: " + TESTS_SUCCEEDED + ", FAILED: " + TESTS_FAILED);
