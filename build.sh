#! /bin/sh

compile() {
  compile-modules convert --output "${2}.js" --format bundle "${1}" &&
  rm "${2}.js.map" &&
  cat "LICENSE" "${2}.js" > "build/tmp" && mv "build/tmp" "${2}.js" &&
  uglifyjs "${2}.js" --comments --screw-ie8 --mangle --compress unsafe --output "${2}.min.js"
  #         --in-source-map build/Immutable.js.map --source-map build/Immutable.js.map
}

compile "src/Immutable/Immutable.js" "build/Immutable" &&
compile "src/Benchmark/run.js"       "build/Benchmark" &&
compile "src/Test/Test.js"           "build/Test" &&

node "build/Test.min.js"
