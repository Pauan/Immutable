import { isRecord, toJS, Record, Dict, equal, isTuple, toArray, Tuple, List, zip, map } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { deepEqual, verify_json, test_each_dict } from "./util";

function verify_record(record, obj) {
  assert(isRecord(record));

  var count = 0;

  for (var _ in record.keys) {
    ++count;
  }

  assert(count === record.values.length);

  assert(deepEqual(toJS(record), obj));

  return record;
}

export function test_Record() {
  context("Record", function () {
    var Empty = Record({});
    var Foo   = Record({ foo: 1 });

    test("isRecord", function () {
      assert(!isRecord(Dict()));
      assert(isRecord(Empty));
      assert(isRecord(Foo));
    });

    test("verify", function () {
      verify_record(Empty, {});
      verify_record(Foo, { foo: 1 });
    });

    test("toString", function () {
      assert("" + Empty === "(Record)");
      assert("" + Foo === "(Record\n  \"foo\" = 1)");
      assert("" + Record({ foo: 2 }) === "(Record\n  \"foo\" = 2)");
      assert("" + Record({ foo: 1 }) === "(Record\n  \"foo\" = 1)");
      assert("" + Record({ foo: 1, bar: 2 }) === "(Record\n  \"bar\" = 2\n  \"foo\" = 1)");
      assert("" + Record({ "foo\nbar\nqux": 1, bar: 2 }) === "(Record\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = 1)");
      assert("" + Record({ foo: Record({ qux: 3 }), bar: 2 }) === "(Record\n  \"bar\" = 2\n  \"foo\" = (Record\n            \"qux\" = 3))");
      assert("" + Record({ "foo\nbar\nqux": Record({ qux: 3 }), bar: 2 }) === "(Record\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = (Record\n            \"qux\" = 3))");

      assert("" + Record({ foobarquxcorgenou: 1, bar: 2 }) === "(Record\n  \"bar\"               = 2\n  \"foobarquxcorgenou\" = 1)");
      assert("" + Record({ "foobar\nquxcorgenou": 1, bar: 2 }) === "(Record\n  \"bar\"         = 2\n  \"foobar\n   quxcorgenou\" = 1)");
      assert("" + Record({ "foo\nbar\nqux": 1, "barquxcorgenou": 2 }) === "(Record\n  \"barquxcorgenou\" = 2\n  \"foo\n   bar\n   qux\"            = 1)");
    });

    test("init", function () {
      assert_raises(function () {
        Record(null);
      }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

      verify_record(Record(), {});

      var x = Record({ foo: 1 });
      verify_record(x, { foo: 1 });
      assert(equal(x, Foo));
      assert(equal(Foo, x));

      assert_raises(function () {
        Record(Object.create(null));
      }, "Cannot convert object to primitive value");

      verify_record(Record({ foo: 2 }), { foo: 2 });

      verify_record(Record(), {});


      verify_record(Record([["foo", 2]]), { foo: 2 });

      verify_record(Record([["foo", 2], ["foo", 3]]), { foo: 3 });
      verify_record(Record([["bar", 1], ["foo", 2], ["qux", 4], ["foo", 3], ["corge", 5]]), { bar: 1, foo: 3, qux: 4, corge: 5 });

      var x = map(Record([["bar", 1], ["foo", 2], ["qux", 4], ["foo", 3], ["corge", 5]]), function (x) {
        assert(isTuple(x));
        return toArray(x);
      });
      assert(deepEqual(toArray(x), [["bar", 1], ["corge", 5], ["foo", 3], ["qux", 4]]));

      verify_record(Record([Tuple(["foo", 2])]), { foo: 2 });

      assert_raises(function () {
        Record([List(["foo", 2])]);
      }, "Expected array or Tuple but got: (List\n  \"foo\"\n  2)");

      assert_raises(function () {
        Record([{}]);
      }, "Expected array or Tuple but got: [object Object]");

      assert_raises(function () {
        Record([[]]);
      }, "Expected array with 2 elements but got 0 elements");

      assert_raises(function () {
        Record([["foo"]]);
      }, "Expected array with 2 elements but got 1 element");

      assert_raises(function () {
        Record([["foo", 2, 3]]);
      }, "Expected array with 2 elements but got 3 elements");

      assert_raises(function () {
        Record([Tuple([])]);
      }, "Expected Tuple with 2 elements but got 0 elements");

      assert_raises(function () {
        Record([Tuple(["foo"])]);
      }, "Expected Tuple with 2 elements but got 1 element");

      assert_raises(function () {
        Record([Tuple(["foo", 2, 3])]);
      }, "Expected Tuple with 2 elements but got 3 elements");
    });

    test("isEmpty", function () {
      assert(Empty.isEmpty());
      assert(!Foo.isEmpty());
    });

    test("has", function () {
      assert(!Empty.has("foo"));
      assert(!Empty.has("bar"));

      assert(Foo.has("foo"));
      assert(!Foo.has("bar"));
    });

    test("get", function () {
      assert_raises(function () {
        Empty.get("foo");
      }, "Key foo not found");

      assert(Empty.get("foo", 50) === 50);

      assert(Foo.get("foo") === 1);
      assert(Foo.get("foo", 50) === 1);
    });

    test("set", function () {
      assert_raises(function () {
        Empty.set("bar", 2);
      }, "Key bar not found");

      var x  = Foo;
      var x2 = x.set("foo", 3);
      assert(x.get("foo") === 1);
      assert(x2.get("foo") === 3);
    });

    test("modify", function () {
      var ran = false;

      assert_raises(function () {
        Empty.modify("foo", function (x) {
          ran = true;
          return x + 1;
        });
      }, "Key foo not found");

      assert(ran === false);


      var ran = false;

      var x  = Foo;
      var x2 = x.modify("foo", function (x) {
        ran = true;
        assert(x === 1);
        return x + 5;
      });

      assert(ran === true);

      assert(x.get("foo") === 1);
      assert(x2.get("foo") === 6);
    });

    test("update", function () {
      verify_record(Record({ foo: 1 }), { foo: 1 });
      verify_record(Record({ foo: 1 }).update(Record({ foo: 2 })), { foo: 2 });
      verify_record(Record({ foo: 1 }).update([["foo", 3]]), { foo: 3 });
      verify_record(Record({ foo: 1 }).update({ foo: 3 }), { foo: 3 });

      assert_raises(function () {
        Record({ foo: 1 }).update(Record({ foo: 2, bar: 3 }));
      }, "Key bar not found");


      verify_record(Record([["foo", 2]]).update([["foo", 3]]), { foo: 3 });
      verify_record(Record([["foo", 2]]).update([Tuple(["foo", 3])]), { foo: 3 });

      assert_raises(function () {
        Record().update(Object.create(null));
      }, "Cannot convert object to primitive value");

      assert_raises(function () {
        Record([["foo", 2]]).update([List(["foo", 3])]);
      }, "Expected array or Tuple but got: (List\n  \"foo\"\n  3)");

      assert_raises(function () {
        Record([["foo", 2]]).update([{}]);
      }, "Expected array or Tuple but got: [object Object]");

      assert_raises(function () {
        Record([["foo", 2]]).update([[]]);
      }, "Expected array with 2 elements but got 0 elements");

      assert_raises(function () {
        Record([["foo", 2]]).update([["foo"]]);
      }, "Expected array with 2 elements but got 1 element");

      assert_raises(function () {
        Record([["foo", 2]]).update([["foo", 2, 3]]);
      }, "Expected array with 2 elements but got 3 elements");

      assert_raises(function () {
        Record([["foo", 2]]).update([Tuple([])]);
      }, "Expected Tuple with 2 elements but got 0 elements");

      assert_raises(function () {
        Record([["foo", 2]]).update([Tuple(["foo"])]);
      }, "Expected Tuple with 2 elements but got 1 element");

      assert_raises(function () {
        Record([["foo", 2]]).update([Tuple(["foo", 2, 3])]);
      }, "Expected Tuple with 2 elements but got 3 elements");
    });

    test("complex keys", function () {
      var o = Dict().set({}, 1);

      assert_raises(function () {
        Record(o);
      }, "Expected key to be a string or Tag but got [object Object]");

      assert_raises(function () {
        Record([[{}, 1]]);
      }, "Expected key to be a string or Tag but got [object Object]");

      assert_raises(function () {
        Foo.get({});
      }, "Expected key to be a string or Tag but got [object Object]");

      assert_raises(function () {
        Foo.set({}, 5);
      }, "Expected key to be a string or Tag but got [object Object]");

      assert_raises(function () {
        Foo.modify({}, function () { throw new Error("FAIL") });
      }, "Expected key to be a string or Tag but got [object Object]");
    });

    test("=== when not modified", function () {
      var x = Foo;

      assert(x.set("foo", 1) === x);
      assert(x.set("foo", 2) !== x);

      assert(x.modify("foo", function () {
        return 1;
      }) === x);

      assert(x.modify("foo", function () {
        return 2;
      }) !== x);

      var x = Record({ foo: 1 });
      assert(Record(x) === x);
      assert(Record({ foo: 1 }) !== x);

      assert(x.update([]) === x);
      assert(x.update([["foo", 1]]) === x);
      assert(x.update([["foo", 2]]) !== x);
    });

    test("equal", function () {
      assert(!equal(Empty, Foo));
      assert(equal(Empty, Empty));
      assert(equal(Foo, Foo));

      assert(equal(Record({}), Record({})));
      assert(equal(Record({ foo: 1 }), Record({ foo: 1 })));

      assert(!equal(Foo, Record({ foo: 2 })));
      assert(equal(Foo, Record({ foo: 1 })));
      assert(equal(Record({ foo: 2 }), Record({ foo: 2 })));
      assert(!equal(Record({ foo: 2 }), Record({ foo: 3 })));

      assert(equal(Record([["foo", 1], ["bar", 2]]), Record([["bar", 2], ["foo", 1]])));
    });

    test("toJS", function () {
      assert(deepEqual(toJS(Empty), {}));
      assert(deepEqual(toJS(Foo), { foo: 1 }));
      assert(deepEqual(toJS(Record({ foo: Record({ bar: 2 }) })),
                       { foo: { bar: 2 } }));
    });

    test("toJSON", function () {
      verify_json(Empty, {});
      verify_json(Foo, { foo: 1 });
      verify_json(Record({ foo: Record({ bar: 2 }) }), { foo: { bar: 2 } });
    });

    test("each", function () {
      test_each_dict(Record([]), []);
      test_each_dict(Record([["foo", 2]]), [["foo", 2]]);
      test_each_dict(Record([["foo", 2], ["bar", 3]]), [["bar", 3], ["foo", 2]]);
      test_each_dict(Record([["bar", 3], ["foo", 2]]), [["bar", 3], ["foo", 2]]);
      test_each_dict(Record([["2", 1], ["1", 2]]), [["1", 2], ["2", 1]]);

      var corge = Record({ corge: 3 });
      test_each_dict(Record([["foo", 1], ["qux", corge], ["bar", 2]]), [["bar", 2], ["foo", 1], ["qux", corge]]);
    });

    // TODO code duplication
    test("zip", function () {
      var a = [["a", 1], ["b", 2], ["c", 3], ["d", 4],
               ["e", 5], ["f", 6], ["g", 7], ["h", 8]];
      assert(deepEqual(toArray(zip(Record(a))), toArray(zip(a))));
    });
  });
}
