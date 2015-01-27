import { isList, toJS, List, Dict, equal, toArray, zip } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { deepEqual, verify_json, random_list, random_int, test_each } from "./util";
import { nil } from "../Immutable/static";
import { array_limit } from "../Immutable/ImmutableList";

function verify_list1(tree, array, strict) {
  assert(isList(tree));

  function loop(node) {
    if (node !== nil) {
      var left  = node.left;
      var right = node.right;

      assert(node.depth === Math.max(left.depth, right.depth) + 1);

      var diff = left.depth - right.depth;
      assert(diff === -1 || diff === 0 || diff === 1);

      assert(node.array.length <= array_limit);

      if (strict && left !== nil) {
        assert(node.array.length + left.array.length > array_limit);
      }

      if (strict && right !== nil) {
        assert(node.array.length + right.array.length > array_limit);
      }

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
  assert(tree.tail_size <= array_limit);

  assert(deepEqual(toJS(tree), array));

  return tree;
}

function verify_list_loose(tree, array) {
  return verify_list1(tree, array, false);
}

export function verify_list(tree, array) {
  return verify_list1(tree, array, true);
}

export function test_List() {
  context("List", function () {
    var empty_list = List();
    var five_list  = List().push(1).push(2).push(3).push(4).push(5);

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

      assert_raises(function () {
        List(null);
      }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

      verify_list(List(), []);
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

    test("set", function () {
      assert_raises(function () {
        empty_list.set(0, 50);
      }, "Index 0 is not valid");

      assert_raises(function () {
        empty_list.set(-1, 50);
      }, "Index -1 is not valid");

      verify_list(five_list.set(0, 50), [50, 2, 3, 4, 5]);
      verify_list(five_list.set(4, 50), [1, 2, 3, 4, 50]);
      verify_list(five_list.set(-1, 50), [1, 2, 3, 4, 50]);
      verify_list(five_list.set(-2, 50), [1, 2, 3, 50, 5]);
    });

    test("insert", function () {
      verify_list(List().insert(0, 5).insert(0, 10).insert(0, 15).push(20).push(25).insert(-2, 30),
                  [15, 10, 5, 20, 30, 25]);

      assert_raises(function () {
        five_list.insert(2);
      }, "Expected 2 arguments but got 1");

      assert_raises(function () {
        empty_list.insert(1, 5);
      }, "Index 1 is not valid");

      assert_raises(function () {
        empty_list.insert(-2, 5);
      }, "Index -1 is not valid");

      var x = empty_list.insert(-1, 10);

      verify_list(empty_list, []);
      verify_list(x, [10]);

      assert(empty_list.size() === 0);
      assert(x.size() === 1);
      assert(x.get(0) === 10);
      assert(x.get(-1) === 10);

      verify_list(five_list.insert(-1, 10), [1, 2, 3, 4, 5, 10]);
      verify_list(five_list.insert(-1, 10).insert(-1, 20), [1, 2, 3, 4, 5, 10, 20]);
      verify_list(five_list.insert(0, 10), [10, 1, 2, 3, 4, 5]);
      verify_list(five_list.insert(1, 10), [1, 10, 2, 3, 4, 5]);
      verify_list(five_list.insert(-1, 10), [1, 2, 3, 4, 5, 10]);
      verify_list(five_list.insert(-2, 10), [1, 2, 3, 4, 10, 5]);
      verify_list(five_list, [1, 2, 3, 4, 5]);

      verify_list(List().insert(0, 5).insert(0, 4).insert(0, 3).insert(0, 2).insert(0, 1),
                  [1, 2, 3, 4, 5]);
    });

    test("push", function () {
      verify_list(empty_list.push(5), [5]);
      verify_list(five_list.push(5).push(6).push(0), [1, 2, 3, 4, 5, 5, 6, 0]);
    });

    test("remove", function () {
      verify_list(List().insert(0, 5).insert(0, 10).insert(0, 15).push(20).push(25).remove(-2),
                  [15, 10, 5, 25]);

      assert_raises(function () {
        empty_list.remove(0);
      }, "Index 0 is not valid");

      assert_raises(function () {
        empty_list.remove(-1);
      }, "Index -1 is not valid");

      assert_raises(function () {
        empty_list.remove();
      }, "Expected 1 argument but got 0");

      assert_raises(function () {
        five_list.remove();
      }, "Expected 1 argument but got 0");

      verify_list(five_list.remove(-1), [1, 2, 3, 4]);
      verify_list(five_list.remove(-1).remove(-1), [1, 2, 3]);
      verify_list(five_list.remove(-2), [1, 2, 3, 5]);
      verify_list(five_list.remove(0), [2, 3, 4, 5]);
      verify_list(five_list.remove(1), [1, 3, 4, 5]);
    });

    test("removeAll", function () {
      verify_list(empty_list.removeAll(), []);
      verify_list(five_list.removeAll(), []);
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

      assert_raises(function () {
        five_list.slice(null, 5);
      }, "Expected a number but got null");

      assert_raises(function () {
        five_list.slice(0, null);
      }, "Expected a number but got null");

      assert_raises(function () {
        five_list.slice(null, null);
      }, "Expected a number but got null");

      verify_list(five_list.slice(4), [5]);
      verify_list(five_list.slice(5), []);

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
        double_list = double_list.push(i);
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
        big_list = big_list.push(i);
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

      assert(five_list.set(0, 1) === five_list);
      assert(five_list.set(0, 2) !== five_list);

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
      assert(!equal(List([1, 2, 3]), List([1, 2, 3, 4])));
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

    test("toJSON", function () {
      verify_json(empty_list, []);
      verify_json(five_list, [1, 2, 3, 4, 5]);
      verify_json(List([4, 5, List([1, 2, 3])]), [4, 5, [1, 2, 3]]);
    });

    test("random elements", function () {
      var o = List();
      var a = [];

      verify_list(o, a);

      random_list(200).forEach(function (x) {
        var index = random_int(0, o.size());

        o = o.insert(index, x);
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
        var index = random_int(0, o.size());
        o = o.remove(index);
        a.splice(index, 1);
        verify_list_loose(o, a);
      }

      assert(o.isEmpty());
      verify_list(o, []);


      var a = random_list(200);
      var pivot = random_int(0, 200);

      function test_concat(pivot) {
        var al = [];
        var ar = [];

        var il = List();
        var ir = List();

        a.slice(0, pivot).forEach(function (x) {
          var index = random_int(0, il.size());
          il = il.insert(index, x);
          al.splice(index, 0, x);
          verify_list(il, al);
        });

        a.slice(pivot).forEach(function (x) {
          var index = random_int(0, ir.size());
          ir = ir.insert(index, x);
          ar.splice(index, 0, x);
          verify_list(ir, ar);
        });

        verify_list_loose(il.concat(ir), al.concat(ar));
        verify_list_loose(ir.concat(il), ar.concat(al));
      }

      test_concat(0);
      test_concat(5);
      test_concat(pivot);
      test_concat(194);
      test_concat(199);
    });

    test("each", function () {
      test_each(List, []);

      var list = List([4]);
      test_each(List, [1, 2, 3, list]);

      var expected = random_list(200);
      test_each(List, expected);
    });

    test("toString", function () {
      assert("" + empty_list === "(List)");
      assert("" + List([1, 2, 3]) === "(List\n  1\n  2\n  3)");
      assert("" + List([1, List([2]), 3]) === "(List\n  1\n  (List\n    2)\n  3)");
    });

    // TODO code duplication
    test("zip", function () {
      function equal(x, y) {
        return deepEqual(toJS(toArray(zip([x]))), y);
      }

      assert(equal(List(), []));
      assert(equal(List([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]]));

      var a = random_list(200);
      assert(equal(List(a), a.map(function (x) { return [x] })));
    });
  });
}
