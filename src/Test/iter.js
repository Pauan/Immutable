import { each, Tag, Tuple, Record, isTuple, toJS, map, toArray,
         keep, any, all, partition, toIterator, Iterable, findIndex,
         indexOf, find, reverse, foldl, foldr, join, zip, take, skip,
         range, repeat, List } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { deepEqual } from "./util";

export function test_iter() {
  test("each", function () {
    var ran = false;

    assert_raises(function () {
      each(Tag(), function () {
        ran = true;
      });
    }, "Cannot iter: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 12)");

    assert(ran === false);


    var ran = false;
    each([], function () {
      ran = true;
    });
    assert(ran === false);

    var a = [];

    each([1, 2, 3], function (x) {
      a.push(x);
    });

    assert(deepEqual(a, [1, 2, 3]));


    var a = [];

    each("foo", function (x) {
      a.push(x);
    });

    assert(deepEqual(a, ["f", "o", "o"]));


    var a = [];

    each(Tuple([1, 2, 3]), function (x) {
      a.push(x);
    });

    assert(deepEqual(a, [1, 2, 3]));


    var a = [];

    each(Record([["foo", 1], ["bar", 2]]), function (x) {
      assert(isTuple(x));
      a.push(toJS(x));
    });

    assert(deepEqual(a, [["bar", 2], ["foo", 1]]));
  });

  test("map", function () {
    var x = map([], function (x) { return x + 10 });
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), []));

    var x = map([1, 2, 3], function (x) { return x + 10 });
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), [11, 12, 13]));

    var x = map(Tuple([1, 2, 3]), function (x) { return x + 10 });
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), [11, 12, 13]));

    var x = map(Record([["foo", 1], ["bar", 2]]), function (x) { return [x.get(0), x.get(1) + 10] });
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), [["bar", 12], ["foo", 11]]));
  });

  test("keep", function () {
    var x = keep([], function (x) { return x > 3 });
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), []));

    var x = keep([1, 2, 3, 4, 5], function (x) { return x > 3 });
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), [4, 5]));
  });

  test("any", function () {
    assert(any([], function (x) { return x > 3 }) === false);
    assert(any([1, 2, 3], function (x) { return x > 3 }) === false);
    assert(any([1, 2, 3, 4], function (x) { return x > 3 }) === true);
  });

  test("all", function () {
    assert(all([], function (x) { return x < 3 }) === true);
    assert(all([1, 2], function (x) { return x < 3 }) === true);
    assert(all([1, 2, 3], function (x) { return x < 3 }) === false);
  });

  test("partition", function () {
    var x = partition([], function (x) {
      return x < 5;
    });

    assert(isTuple(x));
    var yes = x.get(0);
    var no  = x.get(1);
    assert(!Array.isArray(yes));
    assert(!Array.isArray(no));
    assert(deepEqual(toArray(yes), []));
    assert(deepEqual(toArray(no), []));


    var x = partition([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], function (x) {
      return x < 5;
    });

    assert(isTuple(x));
    var yes = x.get(0);
    var no  = x.get(1);
    assert(!Array.isArray(yes));
    assert(!Array.isArray(no));
    assert(deepEqual(toArray(yes), [1, 2, 3, 4, 0]));
    assert(deepEqual(toArray(no), [5, 6, 7, 8, 9]));


    var x = partition([1, 2, 3, 4], function (x) {
      return x < 5;
    });

    assert(isTuple(x));
    var yes = x.get(0);
    var no  = x.get(1);
    assert(!Array.isArray(yes));
    assert(!Array.isArray(no));
    assert(deepEqual(toArray(yes), [1, 2, 3, 4]));
    assert(deepEqual(toArray(no), []));


    var x = partition([5, 6, 7, 8, 9], function (x) {
      return x < 5;
    });

    assert(isTuple(x));
    var yes = x.get(0);
    var no  = x.get(1);
    assert(!Array.isArray(yes));
    assert(!Array.isArray(no));
    assert(deepEqual(toArray(yes), []));
    assert(deepEqual(toArray(no), [5, 6, 7, 8, 9]));
  });

  test("toIterator", function () {
    var iterator = toIterator([1, 2, 3]);
    assert(typeof iterator.next === "function");
    assert(deepEqual(iterator.next(), { value: 1 }));
    assert(deepEqual(iterator.next(), { value: 2 }));
    assert(deepEqual(iterator.next(), { value: 3 }));
    assert(deepEqual(iterator.next(), { done: true }));


    var iterator = toIterator(List([1, 2, 3]));
    assert(typeof iterator.next === "function");
    assert(deepEqual(iterator.next(), { value: 1 }));
    assert(deepEqual(iterator.next(), { value: 2 }));
    assert(deepEqual(iterator.next(), { value: 3 }));
    assert(deepEqual(iterator.next(), { done: true }));
  });

  test("Iterable", function () {
    var iterable = Iterable(function () {
      assert(this === void 0);

      var i = 0;
      return {
        next: function () {
          if (i < 4) {
            return { value: i++ };
          } else {
            return { done: true };
          }
        }
      };
    });

    assert(deepEqual(toArray(iterable), [0, 1, 2, 3]));

    var iterator = toIterator(iterable);
    assert(typeof iterator.next === "function");
    assert(deepEqual(iterator.next(), { value: 0 }));
    assert(deepEqual(iterator.next(), { value: 1 }));
    assert(deepEqual(iterator.next(), { value: 2 }));
    assert(deepEqual(iterator.next(), { value: 3 }));
    assert(deepEqual(iterator.next(), { done: true }));
  });

  test("findIndex", function () {
    var x = findIndex([1, 2, 3, 4, 5], function (x) { return x > 3 });
    assert(x === 3);

    assert_raises(function () {
      findIndex([1, 2, 3, 4, 5], function (x) { return x > 5 });
    }, "Did not find anything");

    var x = findIndex([1, 2, 3, 4, 5], function (x) { return x > 5 }, 500);
    assert(x === 500);
  });

  test("indexOf", function () {
    var x = indexOf([1, 2, 3, 4, 5], 4);
    assert(x === 3);

    assert_raises(function () {
      indexOf([1, 2, 3, 4, 5], 6);
    }, "Did not find anything");

    var x = indexOf([1, 2, 3, 4, 5], 6, 500);
    assert(x === 500);

    var x = [Tuple([1, 2, 3]), Record({ foo: 1, bar: 2 })];

    assert_raises(function () {
      indexOf(x, Tuple([1, 2, 4]))
    }, "Did not find anything");

    assert(indexOf(x, Tuple([1, 2, 4]), -1) === -1);
    assert(indexOf(x, Tuple([1, 2, 3])) === 0);
  });

  test("find", function () {
    var x = find([1, 2, 3, 4, 5], function (x) { return x > 3 });
    assert(x === 4);

    assert_raises(function () {
      find([1, 2, 3, 4, 5], function (x) { return x > 5 });
    }, "Did not find anything");

    var x = find([1, 2, 3, 4, 5], function (x) { return x > 5 }, 500);
    assert(x === 500);
  });

  test("reverse", function () {
    var x = reverse([]);
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), []));

    var x = reverse([1, 2, 3]);
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), [3, 2, 1]));

    var x = reverse(Tuple([1, 2, 3]));
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), [3, 2, 1]));

    var x = reverse(map(Record([["bar", 2], ["foo", 1]]), function (x) {
      assert(isTuple(x));
      return toArray(x);
    }));
    assert(!Array.isArray(x));
    assert(deepEqual(toArray(x), [["foo", 1], ["bar", 2]]));
  });

  test("foldl", function () {
    var init = "0";
    var ran = false;
    var out = foldl(["1", "2", "3"], init, function (x, y) {
      assert(x === init);
      assert(y === "1" || y === "2" || y === "3");
      ran = true;
      init = "(" + x + " " + y + ")";
      return init;
    });
    assert(out === init);
    assert(out === "(((0 1) 2) 3)");
    assert(ran === true);


    var init = 0;
    var ran = false;
    var out = foldl([], init, function () {
      ran = true;
    });

    assert(out === init);
    assert(ran === false);
  });

  test("foldr", function () {
    var init = "0";
    var ran = false;
    var out = foldr(["1", "2", "3"], init, function (x, y) {
      assert(y === init);
      assert(x === "1" || x === "2" || x === "3");
      ran = true;
      init = "(" + x + " " + y + ")";
      return init;
    });
    assert(out === init);
    assert(out === "(1 (2 (3 0)))");
    assert(ran === true);


    var init = 0;
    var ran = false;
    var out = foldr([], init, function () {
      ran = true;
    });

    assert(out === init);
    assert(ran === false);
  });

  test("join", function () {
    assert(join([]) === "");
    assert(join([], " ") === "");
    assert(join([1, 2, 3]) === "123");
    assert(join("123") === "123");
    assert(join(Tuple([1, 2, 3])) === "123");
    assert(join([1, 2, 3], " ") === "1 2 3");
    assert(join("123", " ") === "1 2 3");
    assert(join("123", " --- ") === "1 --- 2 --- 3");
  });

  test("zip", function () {
    function mapper(x) {
      assert(!Array.isArray(x));

      x = map(x, function (x) {
        assert(isTuple(x));
        return toArray(x);
      });

      assert(!Array.isArray(x));

      return x;
    }

    var x = mapper(zip([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

    var x = mapper(zip(List([List([1, 2, 3]), List([4, 5, 6]), List([7, 8, 9])])));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

    var x = mapper(zip(Tuple([Tuple([1, 2, 3]), Tuple([4, 5, 6]), Tuple([7, 8, 9])])));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));


    var x = mapper(zip([[1, 2, 3, 0], [4, 5, 6], [7, 8, 9]]));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

    var x = mapper(zip([[1, 2, 3], [4, 5, 6, 0], [7, 8, 9]]));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

    var x = mapper(zip([[1, 2, 3], [4, 5, 6], [7, 8, 9, 0]]));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

    var x = mapper(zip([[1, 2, 3, 0], [4, 5, 6], [7, 8, 9, 0]]));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

    var x = mapper(zip([[1, 2, 3, 0], [4, 5, 6, 0], [7, 8, 9]]));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));


    var x = mapper(zip([[1, 2, 3, 0], [4, 5, 6], [7, 8, 9]], 50));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [0, 50, 50]]));

    var x = mapper(zip([[1, 2, 3], [4, 5, 6, 0], [7, 8, 9]], 50));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [50, 0, 50]]));

    var x = mapper(zip([[1, 2, 3], [4, 5, 6], [7, 8, 9, 0]], 50));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [50, 50, 0]]));

    var x = mapper(zip([[1, 2, 3, 0], [4, 5, 6], [7, 8, 9, 0]], 50));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [0, 50, 0]]));

    var x = mapper(zip([[1, 2, 3, 0], [4, 5, 6, 0], [7, 8, 9]], 50));
    assert(deepEqual(toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [0, 0, 50]]));
  });

  test("toArray", function () {
    var x = [1, 2, 3, 4, 5];
    assert(toArray(x) === x);

    assert(deepEqual(toArray("foo"), ["f", "o", "o"]));
    assert(deepEqual(toArray(Tuple([1, 2, 3])), [1, 2, 3]));

    var x = map(Record([["foo", 1], ["bar", 2]]), function (x) {
      assert(isTuple(x));
      return toArray(x);
    });
    assert(deepEqual(toArray(x), [["bar", 2], ["foo", 1]]));
  });

  test("take", function () {
    assert(deepEqual(toArray(take([1, 2, 3, 4, 5], 0)), []));
    assert(deepEqual(toArray(take([1, 2, 3, 4, 5], 2)), [1, 2]));
    assert(deepEqual(toArray(take([1, 2, 3, 4, 5], 200)), [1, 2, 3, 4, 5]));

    assert_raises(function () {
      take([1, 2, 3, 4, 5], -5);
    }, "Count cannot be negative: -5");

    assert_raises(function () {
      take([1, 2, 3, 4, 5], 5.1);
    }, "Count must be an integer: 5.1");
  });

  test("skip", function () {
    assert(deepEqual(toArray(skip([1, 2, 3, 4, 5], 0)), [1, 2, 3, 4, 5]));
    assert(deepEqual(toArray(skip([1, 2, 3, 4, 5], 2)), [3, 4, 5]));
    assert(deepEqual(toArray(skip([1, 2, 3, 4, 5], 200)), []));

    assert_raises(function () {
      skip([1, 2, 3, 4, 5], -5);
    }, "Count cannot be negative: -5");

    assert_raises(function () {
      skip([1, 2, 3, 4, 5], 5.1);
    }, "Count must be an integer: 5.1");
  });

  test("range", function () {
    assert(deepEqual(toArray(take(range(), 12)), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
    assert(deepEqual(toArray(take(range(6), 12)), [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

    assert(deepEqual(toArray(range(0, 10)), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    assert(deepEqual(toArray(range(5, 5)), []));
    assert(deepEqual(toArray(range(4, 5)), [4]));
    assert(deepEqual(toArray(range(5, 4)), [5]));
    assert(deepEqual(toArray(range(10, 0)), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

    assert(deepEqual(toArray(range(0, 10, 2)), [0, 2, 4, 6, 8]));
    assert(deepEqual(toArray(range(10, 0, 2)), [10, 8, 6, 4, 2]));
    assert(deepEqual(toArray(range(4.2, 6.9, 0.5)), [4.2, 4.7, 5.2, 5.7, 6.2, 6.7]));
    assert(deepEqual(toArray(range(-10, -2)), [-10, -9, -8, -7, -6, -5, -4, -3]));

    assert(deepEqual(toArray(range(-0, 0)), []));
    assert(deepEqual(toArray(range(0, -0)), []));
    assert(deepEqual(toArray(range(0, 1)), [0]));
    assert(deepEqual(toArray(range(-0, 1)), [-0]));

    assert(deepEqual(toArray(range(0, 0.5, 0.1)), [0, 0.1, 0.2, 0.30000000000000004, 0.4]));
    assert(deepEqual(toArray(take(range(5, 4, 0), 5)), [5, 5, 5, 5, 5]));

    assert_raises(function () {
      range(5, 4, -1);
    }, "Step cannot be negative: -1");
  });

  test("repeat", function () {
    assert(deepEqual(toArray(repeat(1, 5)), [1, 1, 1, 1, 1]));
    assert(deepEqual(toArray(repeat(1, 0)), []));
    assert(deepEqual(toArray(repeat(1, 2)), [1, 1]));
    assert(deepEqual(toArray(take(repeat(1), 12)), [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]));

    assert_raises(function () {
      repeat(1, 0.5);
    }, "Count must be an integer: 0.5");

    assert_raises(function () {
      repeat(1, -5);
    }, "Count cannot be negative: -5");
  });
}
