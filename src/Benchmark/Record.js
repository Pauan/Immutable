var immutablejs = require("immutable");
var mori        = require("mori");
var immutable   = require("./Immutable.min.js");

import { group, message, time } from "./Benchmark";

function copy(input) {
  var output = {};

  var a = Object.keys(input);
  for (var i = 0, l = a.length; i < l; ++i) {
    var key = a[i];
    output[key] = input[key];
  }

  return output;
}

function random(input) {
  return input[Math.floor(Math.random() * input.length)];
}

export function record(counter) {
  var only_keys = [];
  var object_keys = {};
  var record_keys = [];
  var mori_keys = [];

  for (var i = 0; i < counter; ++i) {
    only_keys.push("foo" + i);
    object_keys["foo" + i] = i;
    record_keys.push(["foo" + i, i]);
    mori_keys.push("foo" + i, i);
  }

  var ImmutableJSRecord = immutablejs.Record(object_keys);

  group("Record with " + counter + " keys", function () {
    group("Creating", function () {
      time("JavaScript Object", function () {
        var o = {};

        for (var i = 0; i < counter; ++i) {
          o["foo" + i] = i;
        }
      });

      time("JavaScript Object Copying", function () {
        copy(object_keys);
      });

      time("Immutable-js Map", function () {
        immutablejs.Map(record_keys);
      });

      time("Immutable-js Record", function () {
        new ImmutableJSRecord(record_keys);
      });

      time("Mori Hash Map", function () {
        mori.hashMap.apply(null, mori_keys);
      });

      time("Mori Sorted Map", function () {
        mori.sortedMap.apply(null, mori_keys);
      });

      time("Immutable Dict", function () {
        immutable.Dict(record_keys);
      });

      time("Immutable SortedDict", function () {
        immutable.SortedDict(immutable.simpleSort, record_keys);
      });

      time("Immutable Record", function () {
        immutable.Record(record_keys);
      });
    });


    group("Retrieving at random", function () {
      message("JavaScript Object");

      ;(function () {
        var o = object_keys;

        time("JavaScript Object Copying", function () {
          o[random(only_keys)];
        });
      })();

      ;(function () {
        var o = immutablejs.Map(record_keys);

        time("Immutable-js Map", function () {
          o.get(random(only_keys));
        });
      })();

      ;(function () {
        var o = new ImmutableJSRecord(record_keys);

        time("Immutable-js Record", function () {
          o.get(random(only_keys));
        });
      })();

      ;(function () {
        var o = mori.hashMap.apply(null, mori_keys);

        time("Mori Hash Map", function () {
          mori.get.f2(o, random(only_keys));
        });
      })();

      ;(function () {
        var o = mori.sortedMap.apply(null, mori_keys);

        time("Mori Sorted Map", function () {
          mori.get.f2(o, random(only_keys));
        });
      })();

      ;(function () {
        var o = immutable.Dict(record_keys);

        time("Immutable Dict", function () {
          o.get(random(only_keys));
        });
      })();

      ;(function () {
        var o = immutable.SortedDict(immutable.simpleSort, record_keys);

        time("Immutable SortedDict", function () {
          o.get(random(only_keys));
        });
      })();

      ;(function () {
        var o = immutable.Record(record_keys);

        time("Immutable Record", function () {
          o.get(random(only_keys));
        });
      })();
    });


    group("Setting at random", function () {
      ;(function () {
        var o = copy(object_keys);

        time("JavaScript Object", function () {
          o[random(only_keys)] = -1;
        });
      })();

      ;(function () {
        var o = object_keys;

        time("JavaScript Object Copying", function () {
          var x = copy(o);
          x[random(only_keys)] = -1;
        });
      })();

      ;(function () {
        var o = immutablejs.Map(record_keys);

        time("Immutable-js Map", function () {
          o.set(random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = new ImmutableJSRecord(record_keys);

        time("Immutable-js Record", function () {
          o.set(random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = mori.hashMap.apply(null, mori_keys);

        time("Mori Hash Map", function () {
          mori.assoc.f3(o, random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = mori.sortedMap.apply(null, mori_keys);

        time("Mori Sorted Map", function () {
          mori.assoc.f3(o, random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = immutable.Dict(record_keys);

        time("Immutable Dict", function () {
          o.set(random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = immutable.SortedDict(immutable.simpleSort, record_keys);

        time("Immutable SortedDict", function () {
          o.set(random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = immutable.Record(record_keys);

        time("Immutable Record", function () {
          o.set(random(only_keys), -1);
        });
      })();
    });
  });
}
