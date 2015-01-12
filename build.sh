#! /bin/sh

compile-modules convert --output build/Immutable.js --format bundle src/Immutable/Immutable.js &&
compile-modules convert --output build/Benchmark.js --format bundle src/Benchmark/run.js &&
compile-modules convert --output build/Test.js --format bundle src/Test/Test.js &&

rm build/Immutable.js.map &&
rm build/Benchmark.js.map &&
rm build/Test.js.map &&

uglifyjs build/Immutable.js --screw-ie8 --mangle --compress unsafe --output build/Immutable.min.js &&
uglifyjs build/Benchmark.js --screw-ie8 --mangle --compress unsafe --output build/Benchmark.min.js &&
uglifyjs build/Test.js --screw-ie8 --mangle --compress unsafe --output build/Test.min.js &&
#         --in-source-map build/Immutable.js.map --source-map build/Immutable.js.map

node build/Test.min.js
