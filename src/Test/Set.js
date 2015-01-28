import { isSet, toJS, Set, Dict, SortedSet, simpleSort,
         isSortedSet, equal, toJSON, toArray, zip } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { verify_tree, deepEqual, otherSort, verify_json, random_list,
         test_each } from "./util";

function verify_set(tree, array) {
  assert(isSet(tree));

  verify_tree(tree);

  assert(deepEqual(toJS(tree), array));

  return tree;
}

export function test_Set() {
  context("Set", function () {
    var empty_set = Set();
    var five_set  = Set().add(1).add(2).add(3).add(4).add(5);

    test("isSet", function () {
      assert(!isSet(Dict()));

      assert(isSet(Set()));
      assert(isSet(SortedSet(simpleSort)));

      assert(isSortedSet(SortedSet(simpleSort)));
      assert(!isSortedSet(Set()));
    });

    test("verify", function () {
      verify_set(empty_set, []);
      verify_set(five_set, [1, 2, 3, 4, 5]);
    });

    test("init", function () {
      verify_set(Set([1, 2, 3]), [1, 2, 3]);

      assert_raises(function () {
        Set(null);
      }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

      assert_raises(function () {
        SortedSet(simpleSort, null);
      }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

      assert_raises(function () {
        SortedSet();
      }, "Expected 1 to 2 arguments but got 0");

      verify_set(Set(), []);
      verify_set(SortedSet(simpleSort), []);
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

    test("removeAll", function () {
      verify_set(empty_set.removeAll(), []);
      verify_set(five_set.removeAll(), []);

      var empty_sorted_set = SortedSet(simpleSort, []);
      var five_sorted_set = SortedSet(simpleSort, [1, 2, 3, 4, 5]);

      verify_set(empty_sorted_set.removeAll(), []);
      verify_set(five_sorted_set.removeAll(), []);

      assert(empty_sorted_set.sort === empty_sorted_set.removeAll().sort);
      assert(empty_sorted_set.hash_fn === empty_sorted_set.removeAll().hash_fn);

      assert(five_sorted_set.sort === five_sorted_set.removeAll().sort);
      assert(five_sorted_set.hash_fn === five_sorted_set.removeAll().hash_fn);
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
      verify_set(five_set.disjoint([1, 2, 3, 3, 6, 7, 8]), [4, 5, 6, 7, 8]);
      verify_set(five_set.disjoint([1, 2, 3, 3, 3, 6, 7, 8]), [4, 5, 6, 7, 8]);
      verify_set(five_set.disjoint([1, 2, 3, 3, 6, 6, 6, 7, 8]), [4, 5, 6, 7, 8]);
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
      assert(Set(five_set) === five_set);

      var x = SortedSet(simpleSort, five_set);
      assert(x !== five_set);
      assert(Set(x) !== x);
      assert(SortedSet(simpleSort, x) === x);

      var x = SortedSet(simpleSort, five_set);
      assert(SortedSet(otherSort, x) !== x);

      var x = SortedSet(otherSort, five_set);
      assert(SortedSet(simpleSort, x) !== x);

      var x = SortedSet(otherSort, five_set);
      assert(SortedSet(otherSort, x) === x);


      assert(empty_set.union(empty_set) === empty_set);
      assert(empty_set.union(five_set) !== five_set);
      assert(five_set.union(empty_set) === five_set);
      assert(five_set.union(five_set) === five_set);
      assert(five_set.union(Set([1, 2, 3])) === five_set);

      assert(Set(five_set) === five_set);
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

      assert(equal(SortedSet(simpleSort, [1, 2, 3]),
                   SortedSet(simpleSort, [1, 2, 3])));

      assert(!equal(SortedSet(simpleSort, [1, 2, 3]),
                    SortedSet(otherSort, [1, 2, 3])));

      assert(!equal(SortedSet(simpleSort, [1, 2, 3]),
                    Set([1, 2, 3])));
    });

    test("toJS", function () {
      assert(deepEqual(toJS(empty_set), []));
      assert(deepEqual(toJS(five_set), [1, 2, 3, 4, 5]));
      assert(deepEqual(toJS(Set([1, 2, Set([3])])),
                       [[3], 1, 2]));
    });

    test("toJSON", function () {
      verify_json(empty_set, []);
      verify_json(five_set, [1, 2, 3, 4, 5]);
      verify_json(Set([4, 5, Set([1, 2, 3])]), [[1, 2, 3], 4, 5]);

      assert_raises(function () {
        toJSON(SortedSet(simpleSort, []));
      }, "Cannot convert SortedSet to JSON");
    });

    test("random elements", function () {
      var o = Set();
      var a = [];

      var sort = o.sort;
      var hash_fn = o.hash_fn;

      // TODO utilities for these
      function push_sorted(a, x, sort) {
        for (var i = 0, l = a.length; i < l; ++i) {
          if (sort(hash_fn(x), hash_fn(a[i])) <= 0) {
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

    test("each", function () {
      test_each(Set(), []);

      var four = Set([4]);
      test_each(Set([four, 1, 2, 3]), [four, 1, 2, 3]);
    });

    test("toString", function () {
      assert("" + Set([0, -0]) === "(Set\n  0)");
      assert("" + Set() === "(Set)");
      assert("" + SortedSet(simpleSort) === "(SortedSet (Mutable 4))");
      assert("" + Set([1, 2, 3, 4, 5]) === "(Set\n  1\n  2\n  3\n  4\n  5)");
      assert("" + SortedSet(simpleSort, [1, 2, 3, 4, 5]) === "(SortedSet (Mutable 4)\n  1\n  2\n  3\n  4\n  5)");
      assert("" + Set([Set([1, 2, 3])]) === "(Set\n  (Set\n    1\n    2\n    3))");
      assert("" + Set([{}]) === "(Set\n  (Mutable 10))");
      assert("" + Set([{}]) === "(Set\n  (Mutable 11))");
    });

    // TODO
    /*test("zip", function () {
      var a = random_list(200);
      assert(deepEqual(toArray(zip(Set(a))), toArray(zip(a))));
    });*/
  });
}
