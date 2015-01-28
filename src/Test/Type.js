import { isType, toJS, Type, Tuple, equal } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { deepEqual, verify_json, test_each, random_list } from "./util";

function verify(x, type, array) {
  assert(isType(x));

  assert(x.type() === type);
  assert(deepEqual(x._values, array));
  assert(deepEqual(toJS(x), { type: type, values: array }));

  return x;
}

export function test_Type() {
  context("Type", function () {
    var type = 500;
    var empty = Type(type, []);
    var five = Type(type, [1, 2, 3, 4, 5]);

    test("isType", function () {
      assert(!isType(Tuple()));
      assert(isType(empty));
    });

    test("verify", function () {
      verify(empty, type, []);
      verify(five, type, [1, 2, 3, 4, 5]);
    });

    test("init", function () {
      verify(Type(type), type, []);
      verify(Type(type, [1, 2, 3]), type, [1, 2, 3]);
      verify(Type(200, [1, 2, 3]), 200, [1, 2, 3]);

      assert_raises(function () {
        Type();
      }, "Expected 1 to 2 arguments but got 0");
    });

    test("isEmpty", function () {
      assert(empty.isEmpty());
      assert(!five.isEmpty());
    });

    test("size", function () {
      assert(empty.size() === 0);
      assert(five.size() === 5);
    });

    test("get", function () {
      assert_raises(function () {
        empty.get(0);
      }, "Index 0 is not valid");

      assert_raises(function () {
        empty.get(-1);
      }, "Index -1 is not valid");

      assert(five.get(0) === 1);
      assert(five.get(4) === 5);

      assert_raises(function () {
        five.get(-1);
      }, "Index -1 is not valid");

      assert_raises(function () {
        five.get(-2);
      }, "Index -2 is not valid");
    });

    test("set", function () {
      verify(five.set(0, 50), type, [50, 2, 3, 4, 5]);
      verify(five.set(4, 50), type, [1, 2, 3, 4, 50]);

      assert_raises(function () {
        empty.set(0, 50);
      }, "Index 0 is not valid");

      assert_raises(function () {
        empty.set(-1, 50);
      }, "Index -1 is not valid");

      assert_raises(function () {
        five.set(-1, 50);
      }, "Index -1 is not valid");

      assert_raises(function () {
        five.set(-2, 50);
      }, "Index -2 is not valid");
    });

    test("modify", function () {
      var ran = false;

      assert_raises(function () {
        empty.modify(0, function () { ran = true; });
      }, "Index 0 is not valid");

      assert_raises(function () {
        empty.modify(-1, function () { ran = true; });
      }, "Index -1 is not valid");

      assert(ran === false);


      var ran = false;

      verify(five.modify(0, function (x) {
        ran = true;
        assert(x === 1);
        return x + 100;
      }), type, [101, 2, 3, 4, 5]);

      assert(ran === true);

      verify(five.modify(1, function (x) { return x + 100 }), type, [1, 102, 3, 4, 5]);

      assert_raises(function () {
        five.modify(-1, function (x) { return x + 100 })
      }, "Index -1 is not valid");

      assert_raises(function () {
        five.modify(-2, function (x) { return x + 100 })
      }, "Index -2 is not valid");
    });

    test("=== when not modified", function () {
      assert(Type(type, five) === five);
      assert(Type(200, five) !== five);

      assert(five.set(0, 1) === five);
      assert(five.set(0, 2) !== five);

      var type1 = Type(type, [Type(type)]);

      assert(type1.modify(0, function () {
        return Type(type);
      }) !== type1);

      assert(five.modify(0, function () {
        return 1;
      }) === five);

      assert(five.modify(0, function () {
        return 2;
      }) !== five);

      assert(five.modify(1, function () {
        return 2;
      }) === five);

      assert(five.modify(1, function () {
        return 3;
      }) !== five);

      assert(five.modify(4, function () {
        return 5;
      }) === five);

      assert(five.modify(4, function () {
        return 6;
      }) !== five);
    });

    test("equal", function () {
      assert(equal(empty, empty));
      assert(equal(five, five));

      assert(equal(Type(type, [1, 2, 3]), Type(type, [1, 2, 3])));
      assert(!equal(Type(type, [1, 2, 3]), Type(200, [1, 2, 3])));
      assert(!equal(Type(type, [1, 2, 3]), Type(type, [1, 2, 3, 4])));
      assert(!equal(Type(type, [1, 2, 3]), Type(type, [1, 2, 4])));
      assert(!equal(Type(type, [1, 2, 3]), Type(type, [1, 3, 2])));

      assert(equal(Type(type, [1, 2, 3, 4, 5]), five));
      assert(equal(five, Type(type, [1, 2, 3, 4, 5])));

      assert(equal(Type(type, [Type(type, [1, 2, 3])]), Type(type, [Type(type, [1, 2, 3])])));
    });

    test("toJS", function () {
      assert(deepEqual(toJS(empty), { type: type, values: [] }));
      assert(deepEqual(toJS(five), { type: type, values: [1, 2, 3, 4, 5] }));
      assert(deepEqual(toJS(Type(type, [1, 2, Type(type, [3])])), { type: type, values: [1, 2, { type: type, values: [3] }] }));
    });

    test("toJSON", function () {
      verify_json(empty, { type: type, values: [] });
      verify_json(five, { type: type, values: [1, 2, 3, 4, 5] });
      verify_json(Type(type, [4, 5, Type(type, [1, 2, 3])]), { type: type, values: [4, 5, { type: type, values: [1, 2, 3] }] });
    });

    test("each", function () {
      test_each(Type(type), []);

      var x = Type(type, [4]);
      test_each(Type(type, [1, 2, 3, x]), [1, 2, 3, x]);

      var expected = random_list(200);
      test_each(Type(type, expected), expected);
    });

    test("toString", function () {
      assert("" + empty === "(Type 500)");
      assert("" + Type(type, [1, 2, 3]) === "(Type 500\n  1\n  2\n  3)");
      assert("" + Type(200, [1, 2, 3]) === "(Type 200\n  1\n  2\n  3)");
      assert("" + Type(type, [1, Type(200, [2]), 3]) === "(Type 500\n  1\n  (Type 200\n    2)\n  3)");
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
