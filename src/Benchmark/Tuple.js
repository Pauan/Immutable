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
