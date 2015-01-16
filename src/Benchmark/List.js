var immutablejs = require("immutable");
var mori        = require("mori");
var immutable   = require("./Immutable.min.js");

import * as benchmark from "./Benchmark";
import { nil } from "../Immutable/static";
import { Cons } from "../Immutable/Cons";
import { array_has, array_get, array_insert, array_modify, array_remove, array_slice, array_concat } from "./Array";

function cons_push(x, i) {
  return new Cons(i, x);
}


/*var fs = require("fs");
var vm = require("vm");
var path = require("path");

var elm_path = path.join(__dirname, "../Elm-0.13/elm-runtime.js");
var elm_bench_path = path.join(__dirname, "./build/List.js");
vm.runInThisContext(fs.readFileSync(elm_path));
vm.runInThisContext(fs.readFileSync(elm_bench_path));

var worker = Elm.worker(Elm.Benchmark);

var elm = {
  insert:     worker.ports.insert,
  insertInit: worker.ports.insertInit
};*/


//var counter = +process.argv[2];

export function run(counter) {
  benchmark.group("List with " + counter + " values", function () {
    benchmark.group("Inserting at the end", function () {
      benchmark.time("JavaScript Array", function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }
      });

      benchmark.time("JavaScript Array Copying", function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }
      });

      benchmark.time("Immutable-js List", function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }
      });

      benchmark.time("Immutable-js List Transient", function () {
        var a = immutablejs.List();

        a.withMutations(function (a) {
          for (var i = 0; i < counter; ++i) {
            a.push(i);
          }
        });
      });

      benchmark.time("Mori Vector", function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }
      });

      benchmark.time("Mori Vector Transient", function () {
        var a = mori.mutable.thaw(mori.vector());

        for (var i = 0; i < counter; ++i) {
          a = mori.mutable.conj.f2(a, i);
        }

        mori.mutable.freeze(a);
      });

      /*benchmark.time("Immutable List (insert)", function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }
      });*/

      benchmark.time("Immutable List", function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }
      });

      benchmark.time("Immutable Queue", function () {
        var a = immutable.Queue();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }
      });

      benchmark.time("Immutable Stack", function () {
        var a = immutable.Stack();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }
      });

      benchmark.time("Cons", function () {
        var a = nil;

        for (var i = 0; i < counter; ++i) {
          a = cons_push(a, i);
        }
      });

      /*benchmark.time("Elm Array", function () {
        elm.insert(counter);
      });

      benchmark.time("Elm Array (initialize)", function () {
        elm.insertInit(counter);
      });*/
    });


    benchmark.group("Inserting at the start", function () {
      benchmark.time("JavaScript Array", function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.unshift(i);
        }
      });

      benchmark.time("JavaScript Array Copying", function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, 0, i);
        }
      });

      benchmark.time("Immutable-js List", function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.unshift(i);
        }
      });

      benchmark.time("Immutable-js List Transient", function () {
        var a = immutablejs.List();

        a.withMutations(function (a) {
          for (var i = 0; i < counter; ++i) {
            a.unshift(i);
          }
        });
      });

      benchmark.message("Mori Vector");
      benchmark.message("Mori Vector Transient");

      /*benchmark.time("Mori List", function () {
        var a = mori.list();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj(a, i);
        }
      });*/

      benchmark.time("Immutable List", function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(0, i);
        }
      });

      //benchmark.message("Elm Array");
    });


    benchmark.group("Inserting at random", function () {
      benchmark.time("JavaScript Array", function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          var pivot = Math.floor(Math.random() * a.length);
          a.splice(pivot, 0, i);
        }
      });

      benchmark.time("JavaScript Array Copying", function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          var pivot = Math.floor(Math.random() * a.length);
          a = array_insert(a, pivot, i);
        }
      });

      benchmark.time("Immutable-js List", function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          var pivot = Math.floor(Math.random() * a.size);
          a = a.splice(pivot, 0, i);
        }
      });

      // splice can't be used inside withMutations
      // https://github.com/facebook/immutable-js/issues/196
      benchmark.message("Immutable-js List Transient");

      benchmark.message("Mori Vector");
      benchmark.message("Mori Vector Transient");

      benchmark.time("Immutable List", function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          var pivot = Math.floor(Math.random() * a.size());
          a = a.insert(pivot, i);
        }
      });

      //benchmark.message("Elm Array");
    });


    benchmark.group("Retrieving at the end", function () {
      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }

        benchmark.time("JavaScript Array", function () {
          a[a.length - 1];
        });
      })();

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array (error checking)", function () {
          array_get(a, -1);
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.get(-1);
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          // `mori.last` is O(n)
          mori.nth.f2(a, mori.count(a) - 1);
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          a.get(-1);
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          a.get(-1);
        });
      })();

      //var elm_array = elm.makeList(counter);

      //benchmark.message("Elm Array");
    });


    benchmark.group("Retrieving at the start", function () {
      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }

        benchmark.time("JavaScript Array", function () {
          a[0];
        });
      })();

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array (error checking)", function () {
          array_get(a, 0);
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.get(0);
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.nth.f2(a, 0);
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          a.get(0);
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          a.get(0);
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Retrieving at random", function () {
      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }

        benchmark.time("JavaScript Array", function () {
          var pivot = Math.floor(Math.random() * a.length);
          a[pivot];
        });
      })();

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array (error checking)", function () {
          var pivot = Math.floor(Math.random() * a.length);
          array_get(a, pivot);
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          var pivot = Math.floor(Math.random() * a.size);
          a.get(pivot);
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          var pivot = Math.floor(Math.random() * mori.count(a));
          mori.nth.f2(a, pivot);
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          var pivot = Math.floor(Math.random() * a.size());
          a.get(pivot);
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          var pivot = Math.floor(Math.random() * a.size());
          a.get(pivot);
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Removing at the end", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = array_remove(b, -1);
          }
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.pop();
          }
        });

        benchmark.time("Immutable-js List Transient", function () {
          a.withMutations(function (b) {
            for (var i = 0; i < counter; ++i) {
              b.pop();
            }
          });
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = mori.pop(b);
          }
        });

        benchmark.time("Mori Vector Transient", function () {
          var b = mori.mutable.thaw(a);
          for (var i = 0; i < counter; ++i) {
            b = mori.mutable.pop(b);
          }
          mori.mutable.freeze(b);
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.remove(-1);
          }
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.remove(-1);
          }
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Removing at the start", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = array_remove(b, 0);
          }
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.shift();
          }
        });

        benchmark.time("Immutable-js List Transient", function () {
          a.withMutations(function (b) {
            for (var i = 0; i < counter; ++i) {
              b.shift();
            }
          });
        });
      })();

      benchmark.message("Mori Vector");
      benchmark.message("Mori Vector Transient");

      /*;(function () {
        var a = mori.list();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj(a, i);
        }

        benchmark.time("Mori List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = mori.pop(b);
          }
        });
      })();*/

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.remove(0);
          }
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.remove(0);
          }
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Removing at random", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            var pivot = Math.floor(Math.random() * b.length);
            b = array_remove(b, pivot);
          }
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            var pivot = Math.floor(Math.random() * b.size);
            b = b.splice(pivot, 1);
          }
        });

        // splice can't be used inside withMutations
        // https://github.com/facebook/immutable-js/issues/196
        benchmark.message("Immutable-js List Transient");
      })();

      benchmark.message("Mori Vector");
      benchmark.message("Mori Vector Transient");

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            var pivot = Math.floor(Math.random() * b.size());
            b = b.remove(pivot);
          }
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            var pivot = Math.floor(Math.random() * b.size());
            b = b.remove(pivot);
          }
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Modifying at the end", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
          array_modify(a, -1, function () {
            return -50;
          });
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.set(-1, -50);
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.assoc.f3(a, mori.count(a) - 1, -50);
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          a.set(-1, -50);
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          a.set(-1, -50);
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Modifying at the start", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
          array_modify(a, 0, function () {
            return -50;
          });
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.set(0, -50);
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.assoc.f3(a, 0, -50);
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          a.set(0, -50);
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          a.set(0, -50);
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Modifying at random", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
          var pivot = Math.floor(Math.random() * a.length);
          array_modify(a, pivot, function () {
            return -50;
          });
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          var pivot = Math.floor(Math.random() * a.size);
          a.set(pivot, -50);
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          var pivot = Math.floor(Math.random() * mori.count(a));
          mori.assoc.f3(a, pivot, -50);
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          var pivot = Math.floor(Math.random() * a.size());
          a.set(pivot, -50);
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          var pivot = Math.floor(Math.random() * a.size());
          a.set(pivot, -50);
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Concatenating", function () {
      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }

        benchmark.time("JavaScript Array", function () {
          a.concat(a);
        });
      })();

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array (error checking)", function () {
          array_concat(a, a);
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.concat(a);
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.vector.f(mori.concat.f2(a, a));
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          a.concat(a);
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          a.concat(a);
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Slicing small", function () {
      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }

        benchmark.time("JavaScript Array", function () {
          a.slice(1, 2);
        });
      })();

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array (error checking)", function () {
          array_slice(a, 1, 2);
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.slice(1, 2);
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.vector.f(mori.subvec.f3(a, 1, 2));
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          a.slice(1, 2);
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          a.slice(1, 2);
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Slicing medium", function () {
      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }

        benchmark.time("JavaScript Array", function () {
          a.slice(1, Math.floor(a.length / 2));
        });
      })();

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array (error checking)", function () {
          array_slice(a, 1, Math.floor(a.length / 2));
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.slice(1, Math.floor(a.size / 2));
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.vector.f(mori.subvec.f3(a, 1, Math.floor(mori.count(a) / 2)));
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          a.slice(1, Math.floor(a.size() / 2));
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          a.slice(1, Math.floor(a.size() / 2));
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Slicing large", function () {
      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a.push(i);
        }

        benchmark.time("JavaScript Array", function () {
          a.slice(1);
        });
      })();

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, -1, i);
        }

        benchmark.time("JavaScript Array (error checking)", function () {
          array_slice(a, 1);
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.slice(1);
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj.f2(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.vector.f(mori.subvec.f2(a, 1));
        });
      })();

      /*;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(-1, i);
        }

        benchmark.time("Immutable List (insert)", function () {
          a.slice(1);
        });
      })();*/

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable List", function () {
          a.slice(1);
        });
      })();

      //benchmark.message("Elm Array");
    });
  });
}
