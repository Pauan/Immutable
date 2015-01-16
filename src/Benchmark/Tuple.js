var immutablejs = require("immutable");
var mori        = require("mori");
var immutable   = require("./Immutable.min.js");

import * as benchmark from "./Benchmark";
import { nil } from "../Immutable/static";
import { Cons } from "../Immutable/Cons";
import { array_has, array_get, array_insert, array_modify, array_remove, array_slice, array_concat, array_copy } from "./Array";

function cons_push(x, i) {
  return new Cons(i, x);
}

function random(max) {
  return Math.floor(Math.random() * max);
}

export function run(counter) {
  var values = [];

  for (var i = 0; i < counter; ++i) {
    values.push(i);
  }

  benchmark.group("Tuple with " + counter + " values", function () {
    benchmark.group("Creating", function () {
      benchmark.time("JavaScript Array", function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }
      });

      benchmark.time("JavaScript Array Copying", function () {
        array_copy(values);
      });

      benchmark.time("Immutable-js List", function () {
        immutablejs.List(values);
      });

      benchmark.time("Mori Vector", function () {
        mori.vector.apply(null, values);
      });

      /*benchmark.time("Mori List", function () {
        mori.list.apply(null, values);
      });

      benchmark.time("Mori Queue", function () {
        mori.queue.apply(null, values);
      });*/

      benchmark.time("Immutable List", function () {
        immutable.List(values);
      });

      benchmark.time("Immutable Tuple", function () {
        immutable.Tuple(values);
      });

      /*benchmark.time("Immutable Queue", function () {
        immutable.Queue(values);
      });*/

      benchmark.time("Immutable Stack", function () {
        immutable.Stack(values);
      });

      benchmark.time("Cons", function () {
        var a = nil;

        for (var i = 0; i < counter; ++i) {
          a = cons_push(a, i);
        }
      });
    });


    benchmark.group("Retrieving at the end", function () {
      benchmark.time("JavaScript Array", function () {
        values[values.length - 1];
      });

      ;(function () {
        var last = values.length - 1;

        benchmark.time("JavaScript Array (error checking)", function () {
          array_get(values, last);
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        var last = a.size - 1;

        /*benchmark.time("Immutable-js List (last)", function () {
          a.last();
        });*/

        benchmark.time("Immutable-js List", function () {
          a.get(last);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        var last = mori.count(a) - 1;

        benchmark.time("Mori Vector (nth)", function () {
          mori.nth.f2(a, last);
        });

        /*benchmark.time("Mori Vector (last)", function () {
          mori.last(a);
        });*/

        benchmark.time("Mori Vector (peek)", function () {
          mori.peek(a);
        });
      })();

      /*;(function () {
        var a = mori.list.apply(null, values);

        var last = mori.count(a) - 1;

        benchmark.time("Mori List (nth)", function () {
          mori.nth(a, last);
        });

        benchmark.time("Mori List (last)", function () {
          mori.last(a);
        });
      })();

      ;(function () {
        var a = mori.queue.apply(null, values);

        var last = mori.count(a) - 1;

        benchmark.time("Mori Queue (nth)", function () {
          mori.nth(a, last);
        });

        benchmark.time("Mori Queue (last)", function () {
          mori.last(a);
        });
      })();*/

      ;(function () {
        var a = immutable.List(values);

        var last = a.size() - 1;

        benchmark.time("Immutable List", function () {
          a.get(last);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        var last = a.size() - 1;

        benchmark.time("Immutable Tuple", function () {
          a.get(last);
        });
      })();
    });


    benchmark.group("Retrieving at the start", function () {
      benchmark.time("JavaScript Array", function () {
        values[0];
      });

      benchmark.time("JavaScript Array (error checking)", function () {
        array_get(values, 0);
      });

      ;(function () {
        var a = immutablejs.List(values);

        /*benchmark.time("Immutable-js List (first)", function () {
          a.first();
        });*/

        benchmark.time("Immutable-js List", function () {
          a.get(0);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        benchmark.time("Mori Vector", function () {
          mori.nth.f2(a, 0);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        benchmark.time("Immutable List", function () {
          a.get(0);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        benchmark.time("Immutable Tuple", function () {
          a.get(0);
        });
      })();
    });


    benchmark.group("Retrieving at random", function () {
      ;(function () {
        var size = values.length;

        benchmark.time("JavaScript Array", function () {
          values[random(size)];
        });

        benchmark.time("JavaScript Array (error checking)", function () {
          array_get(values, random(size));
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        var size = a.size;

        benchmark.time("Immutable-js List", function () {
          a.get(random(size));
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        var size = mori.count(a);

        benchmark.time("Mori Vector", function () {
          mori.nth.f2(a, random(size));
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        var size = a.size();

        benchmark.time("Immutable List", function () {
          a.get(random(size));
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        var size = a.size();

        benchmark.time("Immutable Tuple", function () {
          a.get(random(size));
        });
      })();
    });


    benchmark.group("Setting at the end", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var last = values.length - 1;

        benchmark.time("JavaScript Array Copying", function () {
          array_modify(values, last, function () {
            return -50;
          });
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        var last = a.size - 1;

        benchmark.time("Immutable-js List", function () {
          a.set(last, -50);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        var last = mori.count(a) - 1;

        benchmark.time("Mori Vector", function () {
          mori.assoc.f3(a, last, -50);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        var last = a.size() - 1;

        benchmark.time("Immutable List", function () {
          a.set(last, -50);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        var last = a.size() - 1;

        benchmark.time("Immutable Tuple", function () {
          a.set(last, -50);
        });
      })();
    });


    benchmark.group("Setting at the start", function () {
      benchmark.message("JavaScript Array");

      benchmark.time("JavaScript Array Copying", function () {
        array_modify(values, 0, function () {
          return -50;
        });
      });

      ;(function () {
        var a = immutablejs.List(values);

        benchmark.time("Immutable-js List", function () {
          a.set(0, -50);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        benchmark.time("Mori Vector", function () {
          mori.assoc.f3(a, 0, -50);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        benchmark.time("Immutable List", function () {
          a.set(0, -50);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        benchmark.time("Immutable Tuple", function () {
          a.set(0, -50);
        });
      })();
    });


    benchmark.group("Setting at random", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var size = values.length;

        benchmark.time("JavaScript Array Copying", function () {
          array_modify(values, random(size), function () {
            return -50;
          });
        });
      })();

      ;(function () {
        var a = immutablejs.List(values);

        var size = a.size;

        benchmark.time("Immutable-js List", function () {
          a.set(random(size), -50);
        });
      })();

      ;(function () {
        var a = mori.vector.apply(null, values);

        var size = mori.count(a);

        benchmark.time("Mori Vector", function () {
          mori.assoc.f3(a, random(size), -50);
        });
      })();

      ;(function () {
        var a = immutable.List(values);

        var size = a.size();

        benchmark.time("Immutable List", function () {
          a.set(random(size), -50);
        });
      })();

      ;(function () {
        var a = immutable.Tuple(values);

        var size = a.size();

        benchmark.time("Immutable Tuple", function () {
          a.set(random(size), -50);
        });
      })();
    });
  });
}
