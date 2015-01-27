import { Ref, isRef, Dict, equal } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";

export function test_Ref() {
  context("Ref", function () {
    var ref1 = Ref(1);
    var ref2 = Ref(2);

    test("isRef", function () {
      assert(!isRef(Dict()));
      assert(isRef(ref1));
      assert(isRef(ref2));
    });

    test("toString", function () {
      assert("" + ref1 === "(Ref 1)");
      assert("" + ref2 === "(Ref 2)");
      assert("" + Ref(50) === "(Ref 3)");
      assert("" + Ref([100]) === "(Ref 4)");
    });

    test("init", function () {
      assert_raises(function () {
        Ref();
      }, "Expected 1 to 2 arguments but got 0");

      assert_raises(function () {
        Ref(1, 2, 3);
      }, "Expected 1 to 2 arguments but got 3");
    });

    test("get", function () {
      assert(ref1.get() === 1);
      assert(ref2.get() === 2);
    });

    test("set", function () {
      assert(ref1.get() === 1);
      ref1.set(50);
      assert(ref1.get() === 50);

      var ran1 = false;

      var x = Ref(5, function (before, after) {
        assert(ran1 === false);
        assert(before === 5);
        assert(after === 10);
        ran1 = true;
        return after + 1;
      });

      assert(x.get() === 5);
      assert(ran1 === false);

      x.set(10);

      assert(x.get() === 11);
      assert(ran1 === true);


      var ran2 = false;

      var x = Ref(5, function (before, after) {
        assert(ran2 === false);
        ran2 = true;
        return before;
      });

      assert(x.get() === 5);
      assert(ran2 === false);

      x.set(5);

      assert(x.get() === 5);
      assert(ran2 === true);


      var ran3 = false;
      var ran4 = false;

      var x = Ref(5, function (before, after) {
        assert(ran4 === false);

        if (ran3 === false) {
          assert(x.get() === 5);
          assert(before === 5);
          assert(after === 10);

          ran3 = true;

          x.set(20);

          assert(x.get() === 25);
          assert(ran4 === true);
          return x.get();

        } else {
          assert(x.get() === 5);
          assert(before === 5);
          assert(after === 20);

          ran4 = true;
          return after + 5;
        }
      });

      assert(x.get() === 5);
      assert(ran3 === false);
      assert(ran4 === false);

      x.set(10);

      assert(x.get() === 25);
      assert(ran3 === true);
      assert(ran4 === true);
    });

    test("modify", function () {
      var ran1 = false;
      var ran2 = false;

      var x = Ref(5, function (before, after) {
        assert(ran1 === false);
        assert(before === 5);
        assert(after === 10);
        ran1 = true;
        return after + 1;
      });

      assert(x.get() === 5);
      assert(ran1 === false);
      assert(ran2 === false);

      x.modify(function (x) {
        assert(x === 5);
        ran2 = true;
        return 10;
      });

      assert(x.get() === 11);
      assert(ran1 === true);
      assert(ran2 === true);


      var ran3 = false;
      var ran4 = false;

      var x = Ref(5, function (before, after) {
        assert(ran3 === false);
        assert(before === 5);
        assert(after === 5);
        ran3 = true;
        return after;
      });

      assert(x.get() === 5);
      assert(ran3 === false);
      assert(ran4 === false);

      x.modify(function (x) {
        assert(x === 5);
        ran4 = true;
        return 5;
      });

      assert(x.get() === 5);
      assert(ran3 === true);
      assert(ran4 === true);
    });

    test("equal", function () {
      assert(!equal(ref1, ref2));
      assert(equal(ref1, ref1));
      assert(equal(ref2, ref2));

      assert(!equal(Ref(1), Ref(1)));
      assert(!equal(ref1, Ref(1)));
    });
  });
}
