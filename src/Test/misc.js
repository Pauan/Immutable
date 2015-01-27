import { isImmutable, Ref, Dict, Set, List, Queue, Stack,
         SortedDict, simpleSort, SortedSet, Tag, Tuple,
         UUIDTag, Record, isIterable, toJS, fromJS, toJSON,
         fromJSON, deref, equal } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { deepEqual } from "./util";
import { verify_dict } from "./Dict";
import { verify_list } from "./List";

export function test_misc() {
  test("isImmutable", function () {
    assert(!isImmutable({}));
    assert(!isImmutable([]));
    assert(!isImmutable(Ref(5)));

    assert(isImmutable(null));
    assert(isImmutable(5));
    assert(isImmutable("foo"));
    assert(isImmutable(Object.freeze({})));
    assert(isImmutable(Dict()));
    assert(isImmutable(Set()));
    assert(isImmutable(List()));
    assert(isImmutable(Queue()));
    assert(isImmutable(Stack()));
    assert(isImmutable(SortedDict(simpleSort)));
    assert(isImmutable(SortedSet(simpleSort)));
    assert(isImmutable(Tag()));
    assert(isImmutable(Tuple()));
    assert(isImmutable(UUIDTag("051eca86-038c-43c8-85cf-01e20f394501")));

    var Foo = Record({});
    assert(isImmutable(Foo));
  });

  test("isIterable", function () {
    assert(!isIterable({}));
    assert(!isIterable(Ref(5)));
    assert(!isIterable(5));
    assert(!isIterable(null));
    assert(!isIterable(Object.freeze({})));
    assert(!isIterable(Tag()));
    assert(!isIterable(UUIDTag("051eca86-038c-43c8-85cf-01e20f394501")));

    assert(isIterable([]));
    assert(isIterable("foo"));
    assert(isIterable(Dict()));
    assert(isIterable(Set()));
    assert(isIterable(List()));
    assert(isIterable(Queue()));
    assert(isIterable(Stack()));
    assert(isIterable(SortedDict(simpleSort)));
    assert(isIterable(SortedSet(simpleSort)));
    assert(isIterable(Tuple()));

    var Foo = Record({});
    assert(isIterable(Foo));
  });

  test("toJS", function () {
    var x = { foo: 1 };
    assert(toJS(x) !== x);
    assert(deepEqual(toJS(x), { foo: 1 }));

    var x = Object.create(null);
    assert(toJS(x) === x);

    var x = [5];
    assert(toJS(x) !== x);
    assert(deepEqual(toJS(x), [5]));

    var x = new Date();
    assert(toJS(x) === x);

    var x = /foo/;
    assert(toJS(x) === x);

    assert(toJS("foo") === "foo");
    assert(toJS(5) === 5);

    var x = Ref(5);
    assert(toJS(x) === x);

    function Foo() {
      this.bar = {};
    }
    var x = new Foo();
    assert(toJS(x) === x);
    assert(deepEqual(toJS(x), new Foo()));


    var x = {
      foo: [Tuple([Set([1]), 2, 3]), Record({ foo: List([1]), bar: 2 })]
    };
    assert(toJS(x) !== x);
    assert(deepEqual(toJS(x), { foo: [[[1], 2, 3], { foo: [1], bar: 2 }] }));
  });

  test("fromJS", function () {
    verify_dict(fromJS({ foo: 1 }), { foo: 1 });
    verify_list(fromJS([1, 2, 3]), [1, 2, 3]);

    verify_dict(fromJS({ foo: { bar: 1 } }), { foo: { bar: 1 } });
    verify_list(fromJS([1, [2], 3]), [1, [2], 3]);

    verify_dict(fromJS({ foo: { bar: 1 } }).get("foo"), { bar: 1 });
    verify_list(fromJS([1, [2], 3]).get(1), [2]);

    var x = Object.create(null);
    assert(fromJS(x) === x);

    var x = new Date();
    assert(fromJS(x) === x);

    var x = /foo/;
    assert(fromJS(x) === x);

    assert(fromJS("foo") === "foo");
    assert(fromJS(5) === 5);

    var x = Ref(5);
    assert(fromJS(x) === x);

    function Foo() {
      this.bar = {};
    }
    var x = new Foo();
    assert(fromJS(x) === x);
    assert(deepEqual(fromJS(x), new Foo()));
  });

  test("toJSON", function () {
    var x = { foo: 1 };
    assert(toJSON(x) !== x);
    assert(deepEqual(toJSON(x), { foo: 1 }));

    assert_raises(function () {
      toJSON(Object.create(null));
    }, "Cannot convert object to primitive value");

    var x = [5];
    assert(toJSON(x) !== x);
    assert(deepEqual(toJSON(x), [5]));

    assert(toJSON("foo") === "foo");
    assert(toJSON(5) === 5);
    assert(toJSON(5.5) === 5.5);
    assert(toJSON(true) === true);
    assert(toJSON(null) === null);

    var x = new Date(2000, 0, 1);
    assert(toJSON(x) !== x);
    assert(deepEqual(toJSON(x), "2000-01-01T10:00:00.000Z"));

    assert_raises(function () {
      toJSON(/foo/);
    }, "Cannot convert to JSON: /foo/");

    assert_raises(function () {
      toJSON(NaN);
    }, "Cannot convert to JSON: NaN");

    assert_raises(function () {
      toJSON(Infinity);
    }, "Cannot convert to JSON: Infinity");

    assert_raises(function () {
      toJSON(-Infinity);
    }, "Cannot convert to JSON: -Infinity");

    assert_raises(function () {
      toJSON(undefined);
    }, "Cannot convert to JSON: undefined");

    assert_raises(function () {
      function Foo() {
        this.foo = 1;
      }
      var x = new Foo();
      toJSON(x);
    }, "Cannot convert to JSON: [object Object]");

    assert_raises(function () {
      toJSON(Ref(5));
    }, "Cannot convert to JSON: (Ref 17)");


    var x = {};
    x.toJSON = function () {
      return "foo";
    };

    assert(toJSON(x) !== x);
    assert(deepEqual(toJSON(x), "foo"));


    var x = {};
    x.toJSON = function () {
      return function (){};
    };

    assert_raises(function () {
      toJSON(x);
    }, "Cannot convert to JSON: function (){}");


    var x = {};
    x.toJSON = 5;
    assert(toJSON(x) !== x);
    assert(deepEqual(toJSON(x), { toJSON: 5 }));


    var x = {
      test: [Tuple([1, 2, 3]), Record({ foo: 1, bar: 2 })]
    };
    assert(toJSON(x) !== x);
    assert(deepEqual(toJSON(x), {
      test: [toJSON(Tuple([1, 2, 3])), toJSON(Record({ foo: 1, bar: 2 }))]
    }));

    assert(JSON.stringify(Record({ foo: 1})) === '{"(UUIDTag 89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37)":"Record","keys":["foo"],"values":[1]}');
    assert(deepEqual(JSON.stringify(Record({ foo: 1})),
                     JSON.stringify(toJSON(Record({ foo: 1 })))));
  });

  test("fromJSON", function () {
    var x = { foo: 1 };
    assert(fromJSON(x) !== x);
    assert(deepEqual(fromJSON(x), { foo: 1 }));

    assert_raises(function () {
      fromJSON(Object.create(null));
    }, "Cannot convert object to primitive value");

    var x = [5];
    assert(fromJSON(x) !== x);
    assert(deepEqual(fromJSON(x), [5]));

    assert(fromJSON("foo") === "foo");
    assert(fromJSON(5) === 5);
    assert(fromJSON(5.5) === 5.5);
    assert(fromJSON(true) === true);
    assert(fromJSON(null) === null);

    assert_raises(function () {
      fromJSON(new Date(2000, 0, 1));
    }, "Cannot convert from JSON: Sat Jan 01 2000 00:00:00 GMT-1000 (HST)");

    assert_raises(function () {
      fromJSON(/foo/);
    }, "Cannot convert from JSON: /foo/");

    assert_raises(function () {
      fromJSON(NaN);
    }, "Cannot convert from JSON: NaN");

    assert_raises(function () {
      fromJSON(Infinity);
    }, "Cannot convert from JSON: Infinity");

    assert_raises(function () {
      fromJSON(-Infinity);
    }, "Cannot convert from JSON: -Infinity");

    assert_raises(function () {
      fromJSON(undefined);
    }, "Cannot convert from JSON: undefined");

    assert_raises(function () {
      function Foo() {
        this.foo = 1;
      }
      var x = new Foo();
      fromJSON(x);
    }, "Cannot convert from JSON: [object Object]");

    assert_raises(function () {
      fromJSON(Ref(5));
    }, "Cannot convert from JSON: (Ref 18)");


    var x = toJSON({
      test: [Tuple([1, 2, 3]), Record({ foo: 1, bar: 2 })]
    });
    assert(fromJSON(x) !== x);
    assert(deepEqual(fromJSON(x), {
      test: [Tuple([1, 2, 3]), Record({ foo: 1, bar: 2 })]
    }));
    assert(equal(fromJSON(x.test[0]), Tuple([1, 2, 3])));
    assert(equal(fromJSON(x.test[1]), Record({ foo: 1, bar: 2 })));
  });

  test("deref", function () {
    assert(deref(5) === 5);

    var x = Dict();
    assert(deref(x) === x);

    assert(deref(Ref(5)) === 5);
    assert(deref(Ref(x)) === x);
  });

  test("equal", function () {
    assert(equal(0, 0));
    assert(equal(-0, -0));
    assert(equal(0, -0));
    assert(equal(-0, 0));
    assert(equal(1, 1));
    assert(equal(null, null));
    assert(equal(void 0, void 0));
    assert(equal(NaN, NaN));
    assert(equal(true, true));
    assert(equal(false, false));
    assert(equal("foo", "foo"));

    var x = {};
    assert(equal(x, x));

    assert(!equal(1, 2));
    assert(!equal(null, void 0));
    assert(!equal(void 0, null));
    assert(!equal(NaN, 0));
    assert(!equal(NaN, 1));
    assert(!equal(NaN, "foo"));
    assert(!equal(true, false));
    assert(!equal(false, true));
    assert(!equal("foo", "foo2"));
    assert(!equal({}, {}));
  });
}
