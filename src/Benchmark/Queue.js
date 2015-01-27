var immutablejs = require("immutable");
var mori        = require("mori");
var immutable   = require("./Immutable.min.js");

import { group, message, time } from "./util";
import { insert as array_insert, remove as array_remove, copy as array_copy } from "../Immutable/Array";

function array_get(array, i) {
  return array[i];
}

export function queue(counter) {
  var values = [];

  for (var i = 0; i < counter; ++i) {
    values.push(i);
  }

  group("Queue with " + counter + " values", function () {
    group("Creating", function () {
      time("JavaScript Array", function () {
        var values = [];

        for (var i = 0; i < counter; ++i) {
          values.push(i);
        }
      });

      time("JavaScript Array Copying", function () {
        array_copy(values);
      });

      time("Immutable-js List", function () {
        immutablejs.List(values);
      });

      time("Mori Queue", function () {
        mori.queue.apply(null, values);
      });

      time("Immutable List", function () {
        immutable.List(values);
      });

      time("Immutable Queue", function () {
        immutable.Queue(values);
      });
    });


    group("Drain", function () {
      message("JavaScript Array");

      time("JavaScript Array Copying", function () {
        var b = values;
        while (b.length) {
          array_get(b, 0);
          b = array_remove(b, 0);
        }
      });

      ;(function () {
        var a = immutablejs.List(values);

        time("Immutable-js List", function () {
          var b = a;
          while (b.size) {
            b.get(0);
            b = b.shift();
          }
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        time("Mori Queue", function () {
          var b = a;
          while (!mori.isEmpty(b)) {
            mori.peek(b);
            b = mori.pop(b);
          }
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        time("Immutable List", function () {
          var b = a;
          while (!b.isEmpty()) {
            b.get(0);
            b = b.remove(0);
          }
        });
      })();

      ;(function () {
        var a = immutable.Queue(values);

        time("Immutable Queue", function () {
          var b = a;
          while (!b.isEmpty()) {
            b.peek();
            b = b.pop();
          }
        });
      })();
    });


    /*group("Peek left", function () {
      ;(function () {
        var a = values;

        time("JavaScript Array", function () {
          a[0];
        });

        time("JavaScript Array Copying", function () {
          array_get(a, 0);
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        time("Immutable-js List (first)", function () {
          a.first();
        });

        time("Immutable-js List (get)", function () {
          a.get(0);
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        time("Mori Queue", function () {
          mori.peek(a);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        time("Immutable List", function () {
          a.get(0);
        });
      })();

      ;(function () {
        var a = immutable.Queue(values);

        time("Immutable Queue", function () {
          a.peek();
        });
      })();
    });


    group("Pop left", function () {
      ;(function () {
        var a = values;

        message("JavaScript Array");

        time("JavaScript Array Copying", function () {
          array_remove(a, 0);
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        time("Immutable-js List (shift)", function () {
          a.shift();
        });

        time("Immutable-js List (delete)", function () {
          a.delete(0);
        });

        time("Immutable-js List (rest)", function () {
          a.rest();
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        time("Mori Queue (pop)", function () {
          mori.pop(a);
        });

        time("Mori Queue (rest)", function () {
          mori.rest(a);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        time("Immutable List", function () {
          a.remove(0);
        });
      })();

      ;(function () {
        var a = immutable.Queue(values);

        time("Immutable Queue", function () {
          a.pop();
        });
      })();
    });


    group("Pop left all", function () {
      ;(function () {
        var a = values;

        message("JavaScript Array");

        time("JavaScript Array Copying", function () {
          var b = a;
          while (b.length) {
            b = array_remove(b, 0);
          }
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        time("Immutable-js List (shift)", function () {
          var b = a;
          while (b.size) {
            b = b.shift();
          }
        });

        time("Immutable-js List (delete)", function () {
          var b = a;
          while (b.size) {
            b = b.delete(0);
          }
        });

        time("Immutable-js List (rest)", function () {
          var b = a;
          while (b.size) {
            b = b.rest();
          }
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        time("Mori Queue (pop)", function () {
          var b = a;
          while (!mori.isEmpty(b)) {
            b = mori.pop(b);
          }
        });

        time("Mori Queue (rest)", function () {
          var b = a;
          while (!mori.isEmpty(b)) {
            b = mori.rest(b);
          }
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        time("Immutable List", function () {
          var b = a;
          while (!b.isEmpty()) {
            b = b.remove(0);
          }
        });
      })();

      ;(function () {
        var a = immutable.Queue(values);

        time("Immutable Queue", function () {
          var b = a;
          while (!b.isEmpty()) {
            b = b.pop();
          }
        });
      })();
    });


    group("Push right", function () {
      ;(function () {
        var a = values;

        message("JavaScript Array");

        time("JavaScript Array Copying", function () {
          array_insert(a, a.length, 50);
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        time("Immutable-js List (push)", function () {
          a.push(50);
        });

        time("Immutable-js List (set)", function () {
          a.set(a.size, 50);
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        time("Mori Queue", function () {
          mori.conj.f2(a, 50);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        time("Immutable List", function () {
          a.push(50);
        });
      })();

      ;(function () {
        var a = immutable.Queue(values);

        time("Immutable Queue", function () {
          a.push(50);
        });
      })();
    });


    group("Push right all", function () {
      ;(function () {
        var a = [];

        message("JavaScript Array");

        time("JavaScript Array Copying", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = array_insert(b, b.length, i);
          }
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        time("Immutable-js List (push)", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.push(i);
          }
        });

        time("Immutable-js List (set)", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.set(b.size, i);
          }
        });
      })();

      ;(function () {
        var a = mori.queue();

        time("Mori Queue", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = mori.conj.f2(b, i);
          }
        });
      })();

      ;(function () {
        var a = immutable.List();

        time("Immutable List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.push(i);
          }
        });
      })();

      ;(function () {
        var a = immutable.Queue();

        time("Immutable Queue", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.push(i);
          }
        });
      })();
    });*/
  });
}
