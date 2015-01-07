import { isTag, UUIDTag } from "./Tag";
import { pad_right, repeat, destructure_pair } from "./util";
import { map, each, join } from "./iter";

export var tag_hash = UUIDTag("e1c3818d-4c4f-4703-980a-00969e4ca900");

var mutable_hash_id = 0;

export function hash_string(x) {
  return "\"" + x.replace(/[\\\"\n]/g, function (s) {
    if (s === "\n") {
      return s + " ";
    } else {
      return "\\" + s;
    }
  }) + "\"";
}

export function hash(x) {
  var type = typeof x;
  // TODO this is probably pretty inefficient
  if (type === "string") {
    if (isTag(x)) {
      return x;
    } else {
      return hash_string(x);
    }

  } else if (type === "number"    ||
             type === "boolean"   ||
             type === "undefined" ||
             x === null) {
    return "" + x;

  } else {
    var hasher = x[tag_hash];
    if (hasher != null) {
      return hasher(x);

    } else {
      var id = "(Mutable " + (++mutable_hash_id) + ")";

      Object.defineProperty(x, tag_hash, {
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

export function hash_dict(x, spaces) {
  var max_key = 0;

  var a = [];

  each(x, function (_array) {
    destructure_pair(_array, function (key, value) {
      key   = hash(key);
      value = hash(value);

      key = key.split(/\n/);

      each(key, function (key) {
        max_key = Math.max(max_key, key.length);
      });

      a.push({
        key: key,
        value: value
      });
    });
  });

  var spaces = "  ";

  a = map(a, function (x) {
    var last = x.key.length - 1;
    x.key[last] = pad_right(x.key[last], max_key, " ");

    var key = join(x.key, "\n");

    var value = x.value.replace(/\n/g, "\n" + repeat(" ", max_key + 3));

    return key + " = " + value;
  });

  return join_lines(a, spaces);
}

export function hash_array(s) {
  return function (x) {
    if (x.hash === null) {
      var a = map(x, function (x) {
        return hash(x);
      });

      x.hash = "(" + s + join_lines(a, "  ") + ")";
    }

    return x.hash;
  };
}

export function join_lines(a, spaces) {
  var separator = "\n" + spaces;

  return join(map(a, function (x) {
    return separator + x.replace(/\n/g, separator);
  }));
}
