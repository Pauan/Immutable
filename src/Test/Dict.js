import { Dict, isDict, SortedDict, simpleSort, isSortedDict, toJS, equal, Tuple, List,
         map, isTuple, toArray, zip, Set, toJSON } from "../Immutable";
import { context, test, assert, assert_raises } from "./assert";
import { verify_tree, deepEqual, otherSort, random_list, test_each_dict, verify_json,
         verify_json_equal } from "./util";

export function verify_dict(tree, obj) {
  assert(isDict(tree));

  verify_tree(tree);

  assert(deepEqual(toJS(tree), obj));

  return tree;
}

export function test_Dict() {
  context("Dict", function () {
    var dict_empty = Dict();
    var dict_foo   = Dict().set("foo", 1);

    test("isDict", function () {
      assert(!isDict(Set()));

      assert(isDict(Dict()));
      assert(isDict(SortedDict(simpleSort)));

      assert(isSortedDict(SortedDict(simpleSort)));
      assert(!isSortedDict(Dict()));
    });

    test("verify", function () {
      verify_dict(dict_empty, {});
      verify_dict(dict_foo, { foo: 1 });
    });

    test("init", function () {
      assert_raises(function () {
        Dict(null);
      }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

      assert_raises(function () {
        SortedDict(simpleSort, null);
      }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

      verify_dict(Dict(), {});
      verify_dict(SortedDict(simpleSort), {});

      var x = Dict({ foo: 1 });
      verify_dict(x, { foo: 1 });
      assert(equal(x, dict_foo));
      assert(equal(dict_foo, x));

      verify_dict(Dict([["foo", 2]]), { foo: 2 });
      verify_dict(Dict([Tuple(["foo", 2])]), { foo: 2 });

      assert_raises(function () {
        Dict(Object.create(null));
      }, "Cannot convert object to primitive value");

      assert_raises(function () {
        Dict([List(["foo", 2])]);
      }, "Expected array or Tuple but got: (List\n  \"foo\"\n  2)");

      assert_raises(function () {
        Dict([{}]);
      }, "Expected array or Tuple but got: [object Object]");

      assert_raises(function () {
        Dict([[]]);
      }, "Expected array with 2 elements but got 0 elements");

      assert_raises(function () {
        Dict([["foo"]]);
      }, "Expected array with 2 elements but got 1 element");

      assert_raises(function () {
        Dict([["foo", 2, 3]]);
      }, "Expected array with 2 elements but got 3 elements");

      assert_raises(function () {
        Dict([Tuple([])]);
      }, "Expected Tuple with 2 elements but got 0 elements");

      assert_raises(function () {
        Dict([Tuple(["foo"])]);
      }, "Expected Tuple with 2 elements but got 1 element");

      assert_raises(function () {
        Dict([Tuple(["foo", 2, 3])]);
      }, "Expected Tuple with 2 elements but got 3 elements");

      var x = {};
      var mapped = map(Dict([[x, 1]]), function (x) {
        assert(isTuple(x));
        return toArray(x);
      });
      assert(deepEqual(toArray(mapped), [[x, 1]]));

      assert_raises(function () {
        Dict([[Object.preventExtensions({ foo: 1 }), 1]]);
      }, "Cannot use a non-extensible object as a key: [object Object]");

      assert_raises(function () {
        Dict([[Object.seal({ foo: 1 }), 1]]);
      }, "Cannot use a non-extensible object as a key: [object Object]");

      assert_raises(function () {
        Dict([[Object.freeze({ foo: 1 }), 1]]);
      }, "Cannot use a non-extensible object as a key: [object Object]");
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

    test("merge", function () {
      verify_dict(Dict({ foo: 1 }), { foo: 1 });
      verify_dict(Dict({ foo: 1 }).merge([]), { foo: 1 });
      verify_dict(Dict({ foo: 1 }).merge([["bar", 2]]), { foo: 1, bar: 2 });
      verify_dict(Dict({ foo: 1 }).merge(Dict({ bar: 2 })), { foo: 1, bar: 2 });
      verify_dict(Dict({ foo: 1 }).merge(Dict({ foo: 2 })), { foo: 2 });
      verify_dict(Dict({ foo: 1 }).merge(Dict({ foo: 2, bar: 3 })), { foo: 2, bar: 3 });
      verify_dict(Dict({ foo: 1 }).merge({ bar: 2 }), { foo: 1, bar: 2 });

      verify_dict(Dict().merge([["foo", 2]]), { foo: 2 });
      verify_dict(Dict().merge([Tuple(["foo", 2])]), { foo: 2 });

      assert_raises(function () {
        Dict().merge(Object.create(null));
      }, "Cannot convert object to primitive value");

      assert_raises(function () {
        Dict().merge([List(["foo", 2])]);
      }, "Expected array or Tuple but got: (List\n  \"foo\"\n  2)");

      assert_raises(function () {
        Dict().merge([{}]);
      }, "Expected array or Tuple but got: [object Object]");

      assert_raises(function () {
        Dict().merge([[]]);
      }, "Expected array with 2 elements but got 0 elements");

      assert_raises(function () {
        Dict().merge([["foo"]]);
      }, "Expected array with 2 elements but got 1 element");

      assert_raises(function () {
        Dict().merge([["foo", 2, 3]]);
      }, "Expected array with 2 elements but got 3 elements");

      assert_raises(function () {
        Dict().merge([Tuple([])]);
      }, "Expected Tuple with 2 elements but got 0 elements");

      assert_raises(function () {
        Dict().merge([Tuple(["foo"])]);
      }, "Expected Tuple with 2 elements but got 1 element");

      assert_raises(function () {
        Dict().merge([Tuple(["foo", 2, 3])]);
      }, "Expected Tuple with 2 elements but got 3 elements");
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

      var x = SortedDict(simpleSort, dict_foo);
      assert(x !== dict_foo);
      assert(Dict(x) !== x);
      assert(SortedDict(simpleSort, x) === x);

      var x = SortedDict(simpleSort, dict_foo);
      assert(SortedDict(otherSort, x) !== x);

      var x = SortedDict(otherSort, dict_foo);
      assert(SortedDict(simpleSort, x) !== x);

      var x = SortedDict(otherSort, dict_foo);
      assert(SortedDict(otherSort, x) === x);


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

      assert(dict_foo.merge([]) === dict_foo);
      assert(dict_foo.merge([["foo", 1]]) === dict_foo);
      assert(dict_foo.merge([["foo", 2]]) !== dict_foo);

      assert(dict_empty.merge(dict_foo) !== dict_foo);
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

      assert(equal(SortedDict(simpleSort, { foo: 1 }),
                   SortedDict(simpleSort, { foo: 1 })));

      assert(!equal(SortedDict(simpleSort, { foo: 1 }),
                    Dict({ foo: 1 })));

      assert(!equal(SortedDict(simpleSort, { foo: 1 }),
                    SortedDict(otherSort, { foo: 1 })));
    });

    test("toJS", function () {
      assert(deepEqual(toJS(dict_empty), {}));
      assert(deepEqual(toJS(dict_foo), { foo: 1 }));
      assert(deepEqual(toJS(Dict({ foo: Dict({ bar: 2 }) })),
                       { foo: { bar: 2 } }));

      assert_raises(function () {
        toJS(Dict().set(Dict({ foo: 1 }), 2));
      }, "Cannot convert to JavaScript: expected key to be string or Tag but got (Dict\n  \"foo\" = 1)");
    });

    test("toJSON", function () {
      verify_json(dict_empty, {});
      verify_json(dict_foo, { foo: 1 });
      verify_json(Dict({ foo: Dict({ bar: 2 }) }), { foo: { bar: 2 } });

      verify_json_equal(Dict([[Dict({ foo: 1 }), Dict({ bar: 2 })]]));

      assert_raises(function () {
        toJSON(SortedDict(simpleSort, {}));
      }, "Cannot convert SortedDict to JSON");
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

    test("each", function () {
      test_each_dict(Dict([]), []);

      var corge = Dict({ corge: 3 });
      test_each_dict(Dict([["foo", 1], ["qux", corge], ["bar", 2]]), [["bar", 2], ["foo", 1], ["qux", corge]]);
    });

    test("toString", function () {
      assert("" + Dict() === "(Dict)");
      assert("" + SortedDict(simpleSort) === "(SortedDict (Mutable 4))");
      assert("" + SortedDict(simpleSort, { foo: 1 }) === "(SortedDict (Mutable 4)\n  \"foo\" = 1)");
      assert("" + SortedDict(simpleSort, { foo: 1, bar: 2 }) === "(SortedDict (Mutable 4)\n  \"bar\" = 2\n  \"foo\" = 1)");

      assert("" + Dict([[0, 1]]) === "(Dict\n  0 = 1)");
      assert("" + Dict([[-0, 1]]) === "(Dict\n  0 = 1)");
      assert("" + Dict([[0, 1], [-0, 2]]) === "(Dict\n  0 = 2)");

      assert("" + Dict([[{}, 1]]) === "(Dict\n  (Mutable 6) = 1)");
      assert("" + Dict([[{}, 1]]) === "(Dict\n  (Mutable 7) = 1)");

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

    test("removeAll", function () {
      verify_dict(dict_empty.removeAll(), {});
      verify_dict(dict_foo.removeAll(), {});

      var empty_sorted_dict = SortedDict(simpleSort, {});
      var foo_sorted_dict = SortedDict(simpleSort, { foo: 1 });

      verify_dict(empty_sorted_dict.removeAll(), {});
      verify_dict(foo_sorted_dict.removeAll(), {});

      assert(empty_sorted_dict.sort === empty_sorted_dict.removeAll().sort);
      assert(empty_sorted_dict.hash_fn === empty_sorted_dict.removeAll().hash_fn);

      assert(foo_sorted_dict.sort === foo_sorted_dict.removeAll().sort);
      assert(foo_sorted_dict.hash_fn === foo_sorted_dict.removeAll().hash_fn);
    });

    // TODO code duplication
    test("zip", function () {
      var a = [["a", 1], ["b", 2], ["c", 3], ["d", 4],
               ["e", 5], ["f", 6], ["g", 7], ["h", 8]];
      assert(deepEqual(toArray(zip(Dict(a))), toArray(zip(a))));
    });
  });
}
