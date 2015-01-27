var SUCCEEDED = 0;
var FAILED = 0;
var CONTEXT = null;

export function assert(x) {
  if (arguments.length !== 1) {
    throw new Error("Invalid argument length");
  }
  if (x) {
    ++SUCCEEDED;
  } else {
    throw new Error("Failed: " + x);
  }
}

export function assert_raises(f, message) {
  try {
    f();
    throw new Error("Expected an error, but it did not happen");
  } catch (e) {
    if (e.message === message) {
      ++SUCCEEDED;
    } else {
      throw new Error("Expected \"" + message + "\" but got \"" + e.message + "\"");
    }
  }
}

export function context(s, f) {
  var old_context = CONTEXT;
  CONTEXT = s;
  try {
    f();
  } finally {
    CONTEXT = old_context;
  }
}

export function test(s, f) {
  try {
    f();
  } catch (e) {
    ++FAILED;
    console.log("");
    console.log("*** " + (CONTEXT ? CONTEXT + "." : "") + s + " FAILED");
    if (e.stack) {
      console.log(e.stack);
    } else {
      console.log(e);
    }
    console.log("");
  }
}

export function test_run(f) {
  var time_start = Date.now();

  f();

  var time_end = Date.now();

  console.log("SUCCEEDED: " + SUCCEEDED + ", FAILED: " + FAILED + ", TOOK: " + (time_end - time_start) + "ms");
}
