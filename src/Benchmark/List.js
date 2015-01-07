var immutablejs = require("immutable");
var mori        = require("mori");

import * as benchmark from "./Benchmark";
import * as immutable from "../Immutable/Immutable";
import { insert as insert_at, modify as modify_at, remove as remove_at } from "../Immutable/Array";
import { nil } from "../Immutable/static";
import { Cons } from "../Immutable/Cons";
import { header } from "./Header";

header();

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

function array_has(i, len) {
  return i >= 0 && i < len;
}

function array_get(array, i, def) {
  var len = array.length;

  if (i < 0) {
    i += len;
  }

  if (array_has(i, len)) {
    return array[i];
  } else if (arguments.length === 3) {
    return def;
  } else {
    throw new Error("Invalid index: " + i);
  }
}

function array_insert(array, value, i) {
  if (arguments.length === 2) {
    i = -1;
  }

  var len = array.length;

  if (i < 0) {
    i += (len + 1);
  }

  if (i >= 0 && i <= len) {
    return insert_at(array, i, value);
  } else {
    throw new Error("Invalid index: " + i);
  }
}

function array_modify(array, i, f) {
  var len = array.length;

  if (i < 0) {
    i += len;
  }

  if (array_has(i, len)) {
    return modify_at(array, i, f);
  } else {
    throw new Error("Invalid index: " + i);
  }
}

function array_remove(array, i) {
  if (arguments.length === 1) {
    i = -1;
  }

  var len = array.length;

  if (i < 0) {
    i += len;
  }

  if (array_has(i, len)) {
    return remove_at(array, i);
  } else {
    throw new Error("Invalid index: " + i);
  }
}

function array_slice(array, from, to) {
  var len = array.length;

  if (from == null) {
    from = 0;
  }
  if (to == null) {
    to = len;
  }

  if (from < 0) {
    from += len;
  }
  if (to < 0) {
    to += len;
  }

  if (from === 0 && to === len) {
    return array;

  } else if (from > to) {
    throw new Error("Index " + from + " is greater than index " + to);

  } else if (array_has(from, len)) {
    if (from === to) {
      return [];

    // TODO code duplication with array_has ?
    } else if (to > 0 && to <= len) {
      return array.slice(from, to);

    } else {
      throw new Error("Index " + to + " is not valid");
    }

  } else {
    throw new Error("Index " + from + " is not valid");
  }
}

function array_concat(array, other) {
  if (array.length === 0) {
    return other;
  } else if (other.length === 0) {
    return array;
  } else {
    return array.concat(other);
  }
}


function run(counter) {
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
          a = array_insert(a, i);
        }
      });

      benchmark.time("Immutable-js List", function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }
      });

      benchmark.time("Mori Vector", function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj(a, i);
        }
      });

      benchmark.time("Immutable List", function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
        }
      });

      /*benchmark.time("Immutable List (push)", function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }
      });*/

      /*benchmark.time("Stack (reversed Cons)", function () {
        var a = nil;

        for (var i = 0; i < counter; ++i) {
          a = cons_push(a, i);
        }
      });*/

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
          a = array_insert(a, i, 0);
        }
      });

      benchmark.time("Immutable-js List", function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.unshift(i);
        }
      });

      benchmark.message("Mori Vector");

      /*benchmark.time("Mori List", function () {
        var a = mori.list();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj(a, i);
        }
      });*/

      benchmark.time("Immutable List", function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i, 0);
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
          a = array_insert(a, i, pivot);
        }
      });

      benchmark.time("Immutable-js List", function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          var pivot = Math.floor(Math.random() * a.size);
          a = a.splice(pivot, 0, i);
        }
      });

      benchmark.message("Mori Vector");

      benchmark.time("Immutable List", function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          var pivot = Math.floor(Math.random() * a.size());
          a = a.insert(i, pivot);
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
          a = array_insert(a, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
          array_get(a, -1);
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.last();
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          // `mori.last` is O(n)
          mori.get(a, mori.count(a) - 1);
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
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
          a = array_insert(a, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
          array_get(a, 0);
        });
      })();

      ;(function () {
        var a = immutablejs.List();

        for (var i = 0; i < counter; ++i) {
          a = a.push(i);
        }

        benchmark.time("Immutable-js List", function () {
          a.first();
        });
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.get(a, 0);
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
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
          a = array_insert(a, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
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
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          var pivot = Math.floor(Math.random() * mori.count(a));
          mori.get(a, pivot);
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
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
          a = array_insert(a, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = array_remove(b);
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
      })();

      ;(function () {
        var a = mori.vector();

        for (var i = 0; i < counter; ++i) {
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = mori.pop(b);
          }
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
        }

        benchmark.time("Immutable List", function () {
          var b = a;
          for (var i = 0; i < counter; ++i) {
            b = b.remove();
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
          a = array_insert(a, i);
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
      })();

      benchmark.message("Mori Vector");

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

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
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
          a = array_insert(a, i);
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
      })();

      benchmark.message("Mori Vector");

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
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
          a = array_insert(a, i);
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
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.assoc(a, mori.count(a) - 1, -50);
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
        }

        benchmark.time("Immutable List", function () {
          a.modify(-1, function () {
            return -50;
          });
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Modifying at the start", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, i);
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
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.assoc(a, 0, -50);
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
        }

        benchmark.time("Immutable List", function () {
          a.modify(0, function () {
            return -50;
          });
        });
      })();

      //benchmark.message("Elm Array");
    });


    benchmark.group("Modifying at random", function () {
      benchmark.message("JavaScript Array");

      ;(function () {
        var a = [];

        for (var i = 0; i < counter; ++i) {
          a = array_insert(a, i);
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
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          var pivot = Math.floor(Math.random() * mori.count(a));
          mori.assoc(a, pivot, -50);
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
        }

        benchmark.time("Immutable List", function () {
          var pivot = Math.floor(Math.random() * a.size());
          a.modify(pivot, function () {
            return -50;
          });
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
          a = array_insert(a, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
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
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.concat(a, a);
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
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
          a = array_insert(a, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
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
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.subvec(a, 1, 2);
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
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
          a = array_insert(a, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
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
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.subvec(a, 1, Math.floor(mori.count(a) / 2));
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
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
          a = array_insert(a, i);
        }

        benchmark.time("JavaScript Array Copying", function () {
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
          a = mori.conj(a, i);
        }

        benchmark.time("Mori Vector", function () {
          mori.subvec(a, 1);
        });
      })();

      ;(function () {
        var a = immutable.List();

        for (var i = 0; i < counter; ++i) {
          a = a.insert(i);
        }

        benchmark.time("Immutable List", function () {
          a.slice(1);
        });
      })();

      //benchmark.message("Elm Array");
    });
  });
}


//run(1);
run(10);
run(100);
run(1000);
//run(10000);
//run(100000);
//run(1000000);

benchmark.run();
