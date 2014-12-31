export var hash_interface = "__CFB38D33-7CD8-419E-A1B6-61D1B8AC7C83_hash__";

var mutable_hash_id = 0;

export function hash(x) {
  var type = typeof x;
  // TODO this is probably pretty inefficient
  if (type === "string") {
    return "\"" + x.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"").replace(/\n/g, "\n ") + "\"";

  } else if (type === "number"    ||
             type === "boolean"   ||
             type === "undefined" ||
             x === null) {
    return "" + x;

  } else {
    var hasher = x[hash_interface];
    if (hasher != null) {
      return hasher(x);

    } else {
      var id = "(Mutable " + (++mutable_hash_id) + ")";

      Object.defineProperty(x, hash_interface, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function () {
          return id;
        }
      });

      return id;
    }
  }
}
