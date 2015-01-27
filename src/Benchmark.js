import { group, message, run } from "./Benchmark/util";
import { list } from "./Benchmark/List";
import { record } from "./Benchmark/Record";
import { queue } from "./Benchmark/Queue";
import { tuple } from "./Benchmark/Tuple";

var package = require("../package.json");

var dependencies = package.devDependencies;

function header() {
  group("Information", function () {
    group("Node.js", function () {
      message("URL: http://nodejs.org/");
      message("Version: " + process.version);
    });
    group("Benchmark.js", function () {
      message("URL: https://github.com/bestiejs/benchmark.js");
      message("Version: " + dependencies.benchmark);
    });
    group("Immutable-js", function () {
      message("URL: https://github.com/facebook/immutable-js");
      message("Version: " + dependencies.immutable);
    });
    group("Mori", function () {
      message("URL: https://github.com/swannodette/mori");
      message("Version: " + dependencies.mori);
    });
    group("Immutable", function () {
      message("URL: https://github.com/Pauan/Immutable");
      message("Version: " + package.version);
    });
    /*group("Elm", function () {
      message("URL: http://elm-lang.org/");
      message("Version: 0.13");
    });*/
  });
}


/*header();
list(5);
list(10);
list(100);
list(1000);*/

header();
record(5);
record(10);
record(100);
record(1000);
record(10000);

/*header();
queue(1);
queue(10);
queue(100);
queue(1000);
queue(10000);*/

/*header();
tuple(5);
tuple(10);
tuple(100);
tuple(1000);
tuple(10000);*/

run();
