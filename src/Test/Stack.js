import { isStack, toJS, Stack, Queue, equal } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { deepEqual, verify_json, test_each } from "./util";

function verify_stack(stack, array) {
  assert(isStack(stack));

  assert(deepEqual(toJS(stack), array));

  return stack;
}

export function test_Stack() {
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

      assert_raises(function () {
        Stack(null);
      }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

      verify_stack(Stack(), []);
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

    test("removeAll", function () {
      verify_stack(empty_stack.removeAll(), []);
      verify_stack(five_stack.removeAll(), []);
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

    test("toJSON", function () {
      verify_json(empty_stack, []);
      verify_json(five_stack, [1, 2, 3, 4, 5]);
      verify_json(Stack([4, 5, Stack([1, 2, 3])]), [4, 5, [1, 2, 3]]);
    });

    test("each", function () {
      test_each(Stack(), []);

      var x = Stack([3]);
      test_each(Stack([1, 2, x, 4]), [1, 2, x, 4]);
    });

    test("toString", function () {
      assert("" + empty_stack === "(Stack)");
      assert("" + Stack([1, 2, 3]) === "(Stack\n  1\n  2\n  3)");
      assert("" + Stack([1, Stack([2]), 3]) === "(Stack\n  1\n  (Stack\n    2)\n  3)");
    });

    /*
    // TODO code duplication
    test("zip", function () {
      var a = random_list(200);
      assert(deepEqual(toArray(zip(Stack(a))), toArray(zip(a))));
    });*/
  });
}
