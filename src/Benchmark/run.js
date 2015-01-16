import * as benchmark from "./Benchmark";
import * as list from "./List";
import * as record from "./Record";
import * as queue from "./Queue";
import * as tuple from "./Tuple";

var package = require("../package.json");

var dependencies = package.devDependencies;

function header() {
  benchmark.group("Information", function () {
    benchmark.group("Node.js", function () {
      benchmark.message("URL: http://nodejs.org/");
      benchmark.message("Version: " + process.version);
    });
    benchmark.group("Benchmark.js", function () {
      benchmark.message("URL: https://github.com/bestiejs/benchmark.js");
      benchmark.message("Version: " + dependencies.benchmark);
    });
    benchmark.group("Immutable-js", function () {
      benchmark.message("URL: https://github.com/facebook/immutable-js");
      benchmark.message("Version: " + dependencies.immutable);
    });
    benchmark.group("Mori", function () {
      benchmark.message("URL: https://github.com/swannodette/mori");
      benchmark.message("Version: " + dependencies.mori);
    });
    benchmark.group("Immutable", function () {
      benchmark.message("URL: https://github.com/Pauan/Immutable");
      benchmark.message("Version: " + package.version);
    });
    /*benchmark.group("Elm", function () {
      benchmark.message("URL: http://elm-lang.org/");
      benchmark.message("Version: 0.13");
    });*/
  });
}


/*header();
list.run(10);
list.run(100);
list.run(1000);*/

header();
record.run(5);
record.run(10);
record.run(100);
record.run(1000);
record.run(10000);

/*header();
queue.run(10);
queue.run(100);
queue.run(1000);
queue.run(10000);*/

/*header();
tuple.run(10);
tuple.run(100);
tuple.run(1000);
tuple.run(10000);*/

benchmark.run();
