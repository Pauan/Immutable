function assert(x) {
  if (arguments.length !== 1) {
    throw new Error("Invalid argument length");
  }
  if (!x) {
    throw new Error("Failed: " + x);
  }
}

module.exports = assert;
