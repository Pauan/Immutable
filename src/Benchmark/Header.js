import * as benchmark from "./Benchmark";

export function header() {
  benchmark.group("Information", function () {
    benchmark.group("Node.js", function () {
      benchmark.message("URL: http://nodejs.org/");
      benchmark.message("Version: 0.10.22");
    });
    benchmark.group("Benchmark.js", function () {
      benchmark.message("URL: https://github.com/bestiejs/benchmark.js");
      benchmark.message("Version: 1.0.0");
    });
    benchmark.group("Immutable-js", function () {
      benchmark.message("URL: https://github.com/facebook/immutable-js");
      benchmark.message("Version: 3.4.1");
    });
    benchmark.group("Mori", function () {
      benchmark.message("URL: https://github.com/swannodette/mori");
      benchmark.message("Version: 0.2.9");
    });
    benchmark.group("Immutable", function () {
      benchmark.message("URL: https://github.com/Pauan/Immutable");
      benchmark.message("Version: 3.0.0");
    });
    /*benchmark.group("Elm", function () {
      benchmark.message("URL: http://elm-lang.org/");
      benchmark.message("Version: 0.13");
    });*/
  });
}
