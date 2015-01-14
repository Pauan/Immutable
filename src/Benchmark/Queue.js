var immutablejs = require("immutable");
var mori        = require("mori");
var immutable   = require("./Immutable.min.js");

import * as benchmark from "./Benchmark";
import { insert as array_insert, remove as array_remove, copy as array_copy } from "../Immutable/Array";

function array_get(array, i) {
  return array[i];
}

export function run(counter) {
  var values = [];

  for (var i = 0; i < counter; ++i) {
    values.push(i);
  }

  benchmark.group("Queue with " + counter + " values", function () {
    benchmark.group("Creating", function () {
      benchmark.time("JavaScript Array", function () {
        var values = [];

        for (var i = 0; i < counter; ++i) {
          values.push(i);
        }
      });

      benchmark.time("JavaScript Array Copying", function () {
        array_copy(values);
      });

      benchmark.time("Immutable-js List", function () {
        immutablejs.List(values);
      });

      benchmark.time("Mori Queue", function () {
        mori.queue.apply(null, values);
      });

      benchmark.time("Immutable List", function () {
        immutable.List(values);
      });

      benchmark.time("Immutable Queue", function () {
        immutable.Queue(values);
      });
    });


    benchmark.group("Peek left", function () {
      ;(function () {
        var a = values;

        benchmark.time("JavaScript Array", function () {
          a[0];
        });

        benchmark.time("JavaScript Array Copying", function () {
          array_get(a, 0);
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        benchmark.time("Immutable-js List (first)", function () {
          a.first();
        });

        benchmark.time("Immutable-js List (get)", function () {
          a.get(0);
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        benchmark.time("Mori Queue", function () {
          mori.peek(a);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        benchmark.time("Immutable List", function () {
          a.get(0);
        });
      })();

      ;(function () {
        var a = immutable.Queue(values);

        benchmark.time("Immutable Queue", function () {
          a.peek();
        });
      })();
    });


    benchmark.group("Pop left", function () {
      ;(function () {
        var a = values;

        benchmark.message("JavaScript Array");

        benchmark.time("JavaScript Array Copying", function () {
          array_remove(a, 0);
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        benchmark.time("Immutable-js List (shift)", function () {
          a.shift();
        });

        benchmark.time("Immutable-js List (delete)", function () {
          a.delete(0);
        });

        benchmark.time("Immutable-js List (rest)", function () {
          a.rest();
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        benchmark.time("Mori Queue (pop)", function () {
          mori.pop(a);
        });

        benchmark.time("Mori Queue (rest)", function () {
          mori.rest(a);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        benchmark.time("Immutable List", function () {
          a.remove(0);
        });
      })();

      ;(function () {
        var a = immutable.Queue(values);

        benchmark.time("Immutable Queue", function () {
          a.pop();
        });
      })();
    });


    benchmark.group("Pop left all", function () {
      ;(function () {
        var a = values;

        benchmark.message("JavaScript Array");

        benchmark.time("JavaScript Array Copying", function () {
          var b = a;
          while (b.length) {
            b = array_remove(b, 0);
          }
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        benchmark.time("Immutable-js List (shift)", function () {
          var b = a;
          while (b.size) {
            b = b.shift();
          }
        });

        benchmark.time("Immutable-js List (delete)", function () {
          var b = a;
          while (b.size) {
            b = b.delete(0);
          }
        });

        benchmark.time("Immutable-js List (rest)", function () {
          var b = a;
          while (b.size) {
            b = b.rest();
          }
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        benchmark.time("Mori Queue (pop)", function () {
          var b = a;
          while (!mori.is_empty(b)) {
            b = mori.pop(b);
          }
        });

        benchmark.time("Mori Queue (rest)", function () {
          var b = a;
          while (!mori.is_empty(b)) {
            b = mori.rest(b);
          }
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        benchmark.time("Immutable List", function () {
          var b = a;
          while (!b.isEmpty()) {
            b = b.remove(0);
          }
        });
      })();

      ;(function () {
        var a = immutable.Queue(values);

        benchmark.time("Immutable Queue", function () {
          var b = a;
          while (!b.isEmpty()) {
            b = b.pop();
          }
        });
      })();
    });


    benchmark.group("Push right", function () {
      ;(function () {
        var a = values;

        benchmark.message("JavaScript Array");

        benchmark.time("JavaScript Array Copying", function () {
          array_insert(a, a.length, 50);
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        benchmark.time("Immutable-js List (push)", function () {
          a.push(50);
        });

        benchmark.time("Immutable-js List (set)", function () {
          a.set(a.size, 50);
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        benchmark.time("Mori Queue", function () {
          mori.conj(a, 50);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        benchmark.time("Immutable List", function () {
          a.push(50);
        });
      })();

      ;(function () {
        var a = immutable.Queue(values);

        benchmark.time("Immutable Queue", function () {
          a.push(50);
        });
      })();
    });


    benchmark.group("Push right all", function () {
      ;(function () {
        var a = [];

        benchmark.message("JavaScript Array");

        benchmark.time("JavaScript Array Copying", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = array_insert(b, b.length, i);
          }
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        benchmark.time("Immutable-js List (push)", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.push(i);
          }
        });

        benchmark.time("Immutable-js List (set)", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.set(b.size, i);
          }
        });
      })();

      ;(function () {
        var a = mori.queue();

        benchmark.time("Mori Queue", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = mori.conj(b, i);
          }
        });
      })();

      ;(function () {
        var a = immutable.List();

        benchmark.time("Immutable List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.push(i);
          }
        });
      })();

      ;(function () {
        var a = immutable.Queue();

        benchmark.time("Immutable Queue", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.push(i);
          }
        });
      })();
    });
  });
}
