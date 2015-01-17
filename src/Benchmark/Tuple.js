var immutablejs = require("immutable");
var mori        = require("mori");
var immutable   = require("./Immutable.min.js");

import { group, message, time } from "./Benchmark";
import { nil } from "../Immutable/static";
import { Cons } from "../Immutable/Cons";
import { array_has, array_get, array_insert, array_modify, array_remove, array_slice, array_concat, array_copy } from "./Array";

function cons_push(x, i) {
  return new Cons(i, x);
}

function random(max) {
  return Math.floor(Math.random() * max);
}

export function tuple(counter) {
  var values = [];

  for (var i = 0; i < counter; ++i) {
    values.push(i);
  }

  group("Tuple with " + counter + " values", function () {
    group("Creating", function () {
      time("JavaScript Array", function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }
      });

      time("JavaScript Array Copying", function () {
        array_copy(values);
      });

      time("Immutable-js List", function () {
        immutablejs.List(values);
      });

      time("Mori Vector", function () {
        mori.vector.apply(null, values);
      });

      time("Mori Vector (into)", function () {
        mori.into.f2(mori.vector(), values);
      });

      /*time("Mori List", function () {
        mori.list.apply(null, values);
      });

      time("Mori Queue", function () {
        mori.queue.apply(null, values);
      });*/

      time("Immutable List", function () {
        immutable.List(values);
      });

      time("Immutable Tuple", function () {
        immutable.Tuple(values);
      });

      /*time("Immutable Queue", function () {
        immutable.Queue(values);
      });*/

      time("Immutable Stack", function () {
        immutable.Stack(values);
      });

      time("Cons", function () {
        var a = nil;

        for (var i = 0; i < counter; ++i) {
          a = cons_push(a, i);
        }
      });
    });


    group("Retrieving at the end", function () {
      time("JavaScript Array", function () {
        values[values.length - 1];
      });

      ;(function () {
        var last = values.length - 1;

        time("JavaScript Array (error checking)", function () {
          array_get(values, last);
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        var last = a.size - 1;

        /*time("Immutable-js List (last)", function () {
          a.last();
        });*/

        time("Immutable-js List", function () {
          a.get(last);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        var last = mori.count(a) - 1;

        time("Mori Vector (nth)", function () {
          mori.nth.f2(a, last);
        });

        /*time("Mori Vector (last)", function () {
          mori.last(a);
        });*/

        time("Mori Vector (peek)", function () {
          mori.peek(a);
        });
      })();

      /*;(function () {
        var a = mori.list.apply(null, values);

        var last = mori.count(a) - 1;

        time("Mori List (nth)", function () {
          mori.nth(a, last);
        });

        time("Mori List (last)", function () {
          mori.last(a);
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        var last = mori.count(a) - 1;

        time("Mori Queue (nth)", function () {
          mori.nth(a, last);
        });

        time("Mori Queue (last)", function () {
          mori.last(a);
        });
      })();*/

      ;(function () {
        var a = immutable.List(values);

        var last = a.size() - 1;

        time("Immutable List", function () {
          a.get(last);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        var last = a.size() - 1;

        time("Immutable Tuple", function () {
          a.get(last);
        });
      })();
    });


    group("Retrieving at the start", function () {
      time("JavaScript Array", function () {
        values[0];
      });

      time("JavaScript Array (error checking)", function () {
        array_get(values, 0);
      });

      ;(function () {
        var a = immutablejs.List(values);

        /*time("Immutable-js List (first)", function () {
          a.first();
        });*/

        time("Immutable-js List", function () {
          a.get(0);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        time("Mori Vector", function () {
          mori.nth.f2(a, 0);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        time("Immutable List", function () {
          a.get(0);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        time("Immutable Tuple", function () {
          a.get(0);
        });
      })();
    });


    group("Retrieving at random", function () {
      ;(function () {
        var size = values.length;

        time("JavaScript Array", function () {
          values[random(size)];
        });

        time("JavaScript Array (error checking)", function () {
          array_get(values, random(size));
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        var size = a.size;

        time("Immutable-js List", function () {
          a.get(random(size));
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        var size = mori.count(a);

        time("Mori Vector", function () {
          mori.nth.f2(a, random(size));
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        var size = a.size();

        time("Immutable List", function () {
          a.get(random(size));
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        var size = a.size();

        time("Immutable Tuple", function () {
          a.get(random(size));
        });
      })();
    });


    group("Setting at the end", function () {
      message("JavaScript Array");

      ;(function () {
        var last = values.length - 1;

        time("JavaScript Array Copying", function () {
          array_modify(values, last, function () {
            return -50;
          });
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        var last = a.size - 1;

        time("Immutable-js List", function () {
          a.set(last, -50);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        var last = mori.count(a) - 1;

        time("Mori Vector", function () {
          mori.assoc.f3(a, last, -50);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        var last = a.size() - 1;

        time("Immutable List", function () {
          a.set(last, -50);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        var last = a.size() - 1;

        time("Immutable Tuple", function () {
          a.set(last, -50);
        });
      })();
    });


    group("Setting at the start", function () {
      message("JavaScript Array");

      time("JavaScript Array Copying", function () {
        array_modify(values, 0, function () {
          return -50;
        });
      });

      ;(function () {
        var a = immutablejs.List(values);

        time("Immutable-js List", function () {
          a.set(0, -50);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        time("Mori Vector", function () {
          mori.assoc.f3(a, 0, -50);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        time("Immutable List", function () {
          a.set(0, -50);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        time("Immutable Tuple", function () {
          a.set(0, -50);
        });
      })();
    });


    group("Setting at random", function () {
      message("JavaScript Array");

      ;(function () {
        var size = values.length;

        time("JavaScript Array Copying", function () {
          array_modify(values, random(size), function () {
            return -50;
          });
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        var size = a.size;

        time("Immutable-js List", function () {
          a.set(random(size), -50);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        var size = mori.count(a);

        time("Mori Vector", function () {
          mori.assoc.f3(a, random(size), -50);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        var size = a.size();

        time("Immutable List", function () {
          a.set(random(size), -50);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        var size = a.size();

        time("Immutable Tuple", function () {
          a.set(random(size), -50);
        });
      })();
    });
  });
}
