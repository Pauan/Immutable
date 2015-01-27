#! /usr/bin/env node

var fs = require("fs");
var child_process = require("child_process");

var package = require("./package.json");

// TODO is this correct ?
// TODO handle stderr differently ?
function exec(s, args, cb) {
  var process = child_process.spawn(s, args, { stdio: "inherit" });

  var called = false;

  process.on("error", function (err) {
    if (!called) {
      called = true;
      return cb(err);
    }
  });

  process.on("exit", function (code) {
    if (!called) {
      called = true;

      if (code === 0) {
        return cb(null);
      } else {
        return cb(new Error(code));
      }
    }
  });
}

function rm(file, cb) {
  fs.unlink(file, function (err) {
    if (err) {
      if (err.code === "ENOENT") {
        return cb(null);
      } else {
        return cb(err);
      }
    } else {
      return cb(null);
    }
  });
}

function read(file, cb) {
  fs.readFile(file, { encoding: "utf8" }, cb);
}

function write(file, value, cb) {
  fs.writeFile(file, value, { encoding: "utf8" }, cb);
}

function add_license(to, license, cb) {
  license = "@license\n\nVersion " + package.version + "\n\n" + license.trim();

  license = "/**\n" + license.split(/\n/g).map(function (x) {
    if (x === "") {
      return " *";
    } else {
      return " * " + x;
    }
  }).join("\n") + "\n */\n";

  read(to + ".js", function (err, data) {
    if (err) return cb(err);

    write(to + ".js", license + data, cb);
  });
}

function compile(license, from, to, cb) {
  exec("compile-modules", ["convert", "--output", to + ".js", "--format",
                           "bundle", from], function (err) {
    if (err) return cb(err);

    rm(to + ".js.map", function (err) {
      if (err) return cb(err);

      add_license(to, license, cb);
    });
  });
}

function minify(file, cb) {
  // --in-source-map build/Immutable.js.map --source-map build/Immutable.js.map
  exec("uglifyjs", [file + ".js", "--comments", "--screw-ie8", "--mangle",
                    "--compress", "unsafe,pure_getters", "--output", file + ".min.js"], cb);
}

function run(cb) {
  read("./LICENSE", function (err, license) {
    if (err) return cb(err);

    compile(license, "./src/Immutable/UMD.js", "./build/Immutable", function (err) {
      if (err) return cb(err);

      minify("./build/Immutable", function (err) {
        if (err) return cb(err);

        compile(license, "./src/Benchmark.js", "./build/Benchmark", function (err) {
          if (err) return cb(err);

          compile(license, "./src/Test.js", "./build/Test", function (err) {
            if (err) return cb(err);

            rm("./build/Benchmark.min.js", function (err) {
              if (err) return cb(err);

              rm("./build/Test.min.js", function (err) {
                if (err) return cb(err);

                exec("node", ["./build/Test.js"], cb);
              });
            });
          });
        });
      });
    });
  });
}

run(function (err) {
  if (err) throw err;
});
