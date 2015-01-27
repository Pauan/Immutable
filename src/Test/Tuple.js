import { isTuple, toJS, Tuple, List, equal } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { deepEqual, verify_json, test_each, random_list } from "./util";

function verify_tuple(tuple, array) {
  assert(isTuple(tuple));

  assert(deepEqual(tuple.values, array));
  assert(deepEqual(toJS(tuple), array));

  return tuple;
}

export function test_Tuple() {
  context("Tuple", function () {
    var empty_tuple = Tuple();
    var five_tuple  = Tuple([1, 2, 3, 4, 5]);

    test("isTuple", function () {
      assert(!isTuple(List()));
      assert(isTuple(Tuple()));
    });

    test("verify", function () {
      verify_tuple(empty_tuple, []);
      verify_tuple(five_tuple, [1, 2, 3, 4, 5]);
    });

    test("init", function () {
      verify_tuple(Tuple([1, 2, 3]), [1, 2, 3]);

      assert_raises(function () {
        Tuple(null);
      }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

      verify_tuple(Tuple(), []);
    });

    test("isEmpty", function () {
      assert(empty_tuple.isEmpty());
      assert(!five_tuple.isEmpty());
    });

    test("size", function () {
      assert(empty_tuple.size() === 0);
      assert(five_tuple.size() === 5);
    });

    test("get", function () {
      assert_raises(function () {
        empty_tuple.get(0);
      }, "Index 0 is not valid");

      assert_raises(function () {
        empty_tuple.get(-1);
      }, "Index -1 is not valid");

      assert(five_tuple.get(0) === 1);
      assert(five_tuple.get(4) === 5);

      assert_raises(function () {
        five_tuple.get(-1);
      }, "Index -1 is not valid");

      assert_raises(function () {
        five_tuple.get(-2);
      }, "Index -2 is not valid");
    });

    test("set", function () {
      verify_tuple(five_tuple.set(0, 50), [50, 2, 3, 4, 5]);
      verify_tuple(five_tuple.set(4, 50), [1, 2, 3, 4, 50]);

      assert_raises(function () {
        empty_tuple.set(0, 50);
      }, "Index 0 is not valid");

      assert_raises(function () {
        empty_tuple.set(-1, 50);
      }, "Index -1 is not valid");

      assert_raises(function () {
        five_tuple.set(-1, 50);
      }, "Index -1 is not valid");

      assert_raises(function () {
        five_tuple.set(-2, 50);
      }, "Index -2 is not valid");
    });

    test("modify", function () {
      var ran = false;

      assert_raises(function () {
        empty_tuple.modify(0, function () { ran = true; });
      }, "Index 0 is not valid");

      assert_raises(function () {
        empty_tuple.modify(-1, function () { ran = true; });
      }, "Index -1 is not valid");

      assert(ran === false);


      var ran = false;

      verify_tuple(five_tuple.modify(0, function (x) {
        ran = true;
        assert(x === 1);
        return x + 100;
      }), [101, 2, 3, 4, 5]);

      assert(ran === true);

      verify_tuple(five_tuple.modify(1, function (x) { return x + 100 }), [1, 102, 3, 4, 5]);

      assert_raises(function () {
        five_tuple.modify(-1, function (x) { return x + 100 })
      }, "Index -1 is not valid");

      assert_raises(function () {
        five_tuple.modify(-2, function (x) { return x + 100 })
      }, "Index -2 is not valid");
    });

    test("=== when not modified", function () {
      assert(Tuple(five_tuple) === five_tuple);

      var tuple1 = Tuple([Tuple([])]);

      assert(five_tuple.set(0, 1) === five_tuple);
      assert(five_tuple.set(0, 2) !== five_tuple);

      assert(tuple1.modify(0, function () {
        return Tuple([]);
      }) !== tuple1);

      assert(five_tuple.modify(0, function () {
        return 1;
      }) === five_tuple);

      assert(five_tuple.modify(0, function () {
        return 2;
      }) !== five_tuple);

      assert(five_tuple.modify(1, function () {
        return 2;
      }) === five_tuple);

      assert(five_tuple.modify(1, function () {
        return 3;
      }) !== five_tuple);

      assert(five_tuple.modify(4, function () {
        return 5;
      }) === five_tuple);

      assert(five_tuple.modify(4, function () {
        return 6;
      }) !== five_tuple);
    });

    test("equal", function () {
      assert(equal(empty_tuple, empty_tuple));
      assert(equal(five_tuple, five_tuple));

      assert(equal(Tuple([1, 2, 3]), Tuple([1, 2, 3])));
      assert(!equal(Tuple([1, 2, 3]), Tuple([1, 2, 3, 4])));
      assert(!equal(Tuple([1, 2, 3]), Tuple([1, 2, 4])));
      assert(!equal(Tuple([1, 2, 3]), Tuple([1, 3, 2])));

      assert(equal(Tuple([1, 2, 3, 4, 5]), five_tuple));
      assert(equal(five_tuple, Tuple([1, 2, 3, 4, 5])));

      assert(equal(Tuple([Tuple([1, 2, 3])]), Tuple([Tuple([1, 2, 3])])));
    });

    test("toJS", function () {
      assert(deepEqual(toJS(empty_tuple), []));
      assert(deepEqual(toJS(five_tuple), [1, 2, 3, 4, 5]));
      assert(deepEqual(toJS(Tuple([1, 2, Tuple([3])])), [1, 2, [3]]));
    });

    test("toJSON", function () {
      verify_json(empty_tuple, []);
      verify_json(five_tuple, [1, 2, 3, 4, 5]);
      verify_json(Tuple([4, 5, Tuple([1, 2, 3])]), [4, 5, [1, 2, 3]]);
    });

    test("each", function () {
      test_each(Tuple, []);

      var x = Tuple([4]);
      test_each(Tuple, [1, 2, 3, x]);

      var expected = random_list(200);
      test_each(Tuple, expected);
    });

    test("toString", function () {
      assert("" + empty_tuple === "(Tuple)");
      assert("" + Tuple([1, 2, 3]) === "(Tuple\n  1\n  2\n  3)");
      assert("" + Tuple([1, Tuple([2]), 3]) === "(Tuple\n  1\n  (Tuple\n    2)\n  3)");
    });

    /*
    // TODO code duplication
    test("zip", function () {
      assert(deepEqual(toArray(zip(Tuple())), toArray(zip([]))));

      assert(deepEqual(toArray(zip(Tuple([1, 2, 3, 4, 5]))), [[1], [2], [3], [4], [5]]));

      var a = random_list(200);
      assert(deepEqual(toArray(zip(Tuple(a))), toArray(zip(a))));
    });*/
  });
}
