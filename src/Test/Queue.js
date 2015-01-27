import { isQueue, toJS, Queue, List, equal } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { deepEqual, verify_json, test_each } from "./util";
import { nil } from "../Immutable/static";

function verify_queue(queue, array) {
  assert(isQueue(queue));

  var size = queue.size();
  if (size === 0) {
    assert(queue.left === nil);
    assert(queue.right === nil);
  } else if (size === 1) {
    assert(queue.left !== nil);
    assert(queue.right === nil);
  } else {
    assert(queue.left !== nil);
    //assert(queue.right !== nil);
  }

  assert(deepEqual(toJS(queue), array));

  return queue;
}

export function test_Queue() {
  context("Queue", function () {
    var empty_queue = Queue();
    var five_queue  = Queue().push(1).push(2).push(3).push(4).push(5);

    test("isQueue", function () {
      assert(!isQueue(List()));
      assert(isQueue(Queue()));
    });

    test("verify", function () {
      verify_queue(empty_queue, []);
      verify_queue(five_queue, [1, 2, 3, 4, 5]);
    });

    test("init", function () {
      verify_queue(Queue([1, 2, 3]), [1, 2, 3]);

      assert_raises(function () {
        Queue(null);
      }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

      verify_queue(Queue(), []);
    });

    test("isEmpty", function () {
      assert(empty_queue.isEmpty());
      assert(!five_queue.isEmpty());
    });

    test("size", function () {
      assert(empty_queue.size() === 0);
      assert(five_queue.size() === 5);
    });

    test("peek", function () {
      assert_raises(function () {
        empty_queue.peek();
      }, "Cannot peek from an empty queue");

      assert(empty_queue.peek(50) === 50);

      assert(five_queue.peek() === 1);
      assert(five_queue.peek(50) === 1);

      assert(Queue().push(5).push(10).pop().peek() === 10);
      assert(Queue().push(5).push(10).push(15).pop().peek() === 10);
    });

    test("push", function () {
      var x = empty_queue.push(10);

      verify_queue(empty_queue, []);
      verify_queue(x, [10]);

      assert(empty_queue.size() === 0);
      assert(x.size() === 1);
      assert(x.peek() === 10);

      assert(Queue().push(1).peek() === 1);

      verify_queue(five_queue.push(10), [1, 2, 3, 4, 5, 10]);
      verify_queue(five_queue.push(10).push(20), [1, 2, 3, 4, 5, 10, 20]);
      verify_queue(five_queue, [1, 2, 3, 4, 5]);

      verify_queue(Queue().push(5).push(4).push(3).push(2).push(1),
                   [5, 4, 3, 2, 1]);

      verify_queue(Queue().push(5).push(10).pop().push(15), [10, 15]);
    });

    test("removeAll", function () {
      verify_queue(empty_queue.removeAll(), []);
      verify_queue(five_queue.removeAll(), []);
    });

    test("pop", function () {
      assert_raises(function () {
        empty_queue.pop();
      }, "Cannot pop from an empty queue");

      verify_queue(Queue().push(5).pop(), []);
      verify_queue(Queue().push(5).push(10).pop(), [10]);
      verify_queue(Queue().push(5).push(10).push(15).pop(), [10, 15]);

      verify_queue(five_queue.pop(), [2, 3, 4, 5]);
      verify_queue(five_queue.pop().pop(), [3, 4, 5]);

      verify_queue(Queue(), []);
      verify_queue(Queue().push(5).push(10).push(20).push(30), [5, 10, 20, 30]);
      verify_queue(Queue().push(5).push(10).push(20).push(30).pop(), [10, 20, 30]);
    });

    test("concat", function () {
      verify_queue(empty_queue.concat(empty_queue), []);
      verify_queue(five_queue.concat(five_queue), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
      verify_queue(Queue([10, 20, 30]).concat(five_queue), [10, 20, 30, 1, 2, 3, 4, 5]);
      verify_queue(five_queue.concat(Queue([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
      verify_queue(five_queue.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
    });

    test("=== when not modified", function () {
      assert(Queue(five_queue) === five_queue);

      assert(empty_queue.concat(empty_queue) === empty_queue);
      assert(five_queue.concat(empty_queue) === five_queue);
      assert(empty_queue.concat(five_queue) !== five_queue);
    });

    test("equal", function () {
      assert(equal(empty_queue, empty_queue));
      assert(equal(five_queue, five_queue));

      assert(equal(Queue([1, 2, 3]), Queue([1, 2, 3])));
      assert(!equal(Queue([1, 2, 3]), Queue([1, 2, 4])));
      assert(!equal(Queue([1, 2, 3]), Queue([1, 3, 2])));

      assert(equal(Queue([1, 2, 3, 4, 5]), five_queue));
      assert(equal(five_queue, Queue([1, 2, 3, 4, 5])));

      assert(equal(Queue([Queue([1, 2, 3])]), Queue([Queue([1, 2, 3])])));
    });

    test("toJS", function () {
      assert(deepEqual(toJS(empty_queue), []));
      assert(deepEqual(toJS(five_queue), [1, 2, 3, 4, 5]));
      assert(deepEqual(toJS(Queue([1, 2, Queue([3])])), [1, 2, [3]]));
    });

    test("toJSON", function () {
      verify_json(empty_queue, []);
      verify_json(five_queue, [1, 2, 3, 4, 5]);
      verify_json(Queue([4, 5, Queue([1, 2, 3])]), [4, 5, [1, 2, 3]]);
    });

    test("each", function () {
      test_each(Queue, []);

      var x = Queue([3]);
      test_each(Queue, [1, 2, x, 4]);
    });

    test("toString", function () {
      assert("" + empty_queue === "(Queue)");
      assert("" + Queue([1, 2, 3]) === "(Queue\n  1\n  2\n  3)");
      assert("" + Queue([1, Queue([2]), 3]) === "(Queue\n  1\n  (Queue\n    2)\n  3)");
    });

    /*
    // TODO code duplication
    test("zip", function () {
      var a = random_list(200);
      assert(deepEqual(toArray(zip(Queue(a))), toArray(zip(a))));
    });*/
  });
}
