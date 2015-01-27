import { modify as array_modify } from "./Array";
import { hash, hash_dict } from "./hash";
import { toJSON_object, fromJSON_object } from "./toJSON";
import { toJS_object } from "./toJS";
import { ImmutableBase } from "./Base";
import { unsafe_Tuple } from "./ImmutableTuple";
import { iter_object, map, toIterator, each, toArray } from "./iter";
import { destructure_pair } from "./util";
import { simpleSort, sorted_merge } from "./Sorted";
import { tag_hash, tag_toJSON, fromJSON_registry, tag_toJS, tag_iter } from "./static";

function checkKey(key) {
  // Tags are currently implemented as strings
  if (typeof key !== "string") {
    throw new Error("Expected key to be a string or Tag but got " + key);
  }
}

export function ImmutableRecord(keys, values) {
  this.keys   = keys;
  this.values = values;
  this.hash   = null;
}

ImmutableRecord.prototype = Object.create(ImmutableBase);

ImmutableRecord.prototype.update = sorted_merge;
ImmutableRecord.prototype[tag_toJS] = toJS_object;

fromJSON_registry["Record"] = function (x) {
  return Record(fromJSON_object(x));
};

ImmutableRecord.prototype[tag_toJSON] = function (x) {
  return toJSON_object("Record", x);
};

ImmutableRecord.prototype[tag_hash] = function (x) {
  if (x.hash === null) {
    x.hash = "(Record" + hash_dict(x, "  ") + ")";
  }

  return x.hash;
};

ImmutableRecord.prototype[tag_iter] = function () {
  var keys   = this.keys;
  var values = this.values;

  // TODO a little gross
  return toIterator(map(iter_object(keys), function (_array) {
    // TODO should this use destructure_pair ?
    return destructure_pair(_array, function (s, index) {
      return unsafe_Tuple([s, values[index]]);
    });
  }));
};

ImmutableRecord.prototype.has = function (key) {
  checkKey(key);

  return this.keys[key] != null;
};

ImmutableRecord.prototype.isEmpty = function () {
  return this.values.length === 0;
};

ImmutableRecord.prototype.get = function (key, def) {
  checkKey(key);

  var index = this.keys[key];
  if (index == null) {
    if (arguments.length === 2) {
      return def;
    } else {
      throw new Error("Key " + key + " not found");
    }

  } else {
    return this.values[index];
  }
};

ImmutableRecord.prototype.set = function (key, value) {
  return this.modify(key, function () {
    return value;
  });
};

ImmutableRecord.prototype.modify = function (key, f) {
  checkKey(key);

  var keys  = this.keys;
  var index = keys[key];
  if (index == null) {
    throw new Error("Key " + key + " not found");

  } else {
    var values = this.values;
    var array  = array_modify(values, index, f);
    if (array === values) {
      return this;
    } else {
      return new ImmutableRecord(keys, array);
    }
  }
};


export function isRecord(x) {
  return x instanceof ImmutableRecord;
}

export function Record(obj) {
  if (arguments.length === 0) {
    return new ImmutableRecord({}, []);

  } else {
    if (isRecord(obj)) {
      return obj;

    } else {
      var keys   = {};
      var values = [];

      var mapped = map(iter_object(obj), function (_array) {
        return destructure_pair(_array, function (key, value) {
          checkKey(key);
          return [key, value];
        });
      });

      // TODO "sort" function in "iter.js" ?
      // TODO can this be made any faster/more efficient ?
      var sorted = toArray(mapped).sort(function (x, y) {
        return simpleSort(x[0], y[0]);
      });

      each(sorted, function (_array) {
        var key   = _array[0];
        var value = _array[1];

        var index = keys[key];
        if (index == null) {
          keys[key] = values.push(value) - 1;
        } else {
          values[index] = value;
        }
      });

      return new ImmutableRecord(keys, values);
    }
  }
}
