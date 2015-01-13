#! /bin/sh

compile() {
  compile-modules convert --output "${2}.js" --format bundle "${1}" &&
  rm "${2}.js.map" &&
  cat "LICENSE" "${2}.js" > "build/tmp" && mv "build/tmp" "${2}.js"
  #         --in-source-map build/Immutable.js.map --source-map build/Immutable.js.map
}

minify() {
  uglifyjs "${1}.js" --comments --screw-ie8 --mangle --compress unsafe --output "${1}.min.js"
}

compile "src/Immutable/Immutable.js" "build/Immutable" && minify "build/Immutable" &&
compile "src/Benchmark/run.js"       "build/Benchmark" &&
compile "src/Test/Test.js"           "build/Test" &&

rm --force "build/Benchmark.min.js" &&
rm --force "build/Test.min.js" &&

node "build/Test.js"
