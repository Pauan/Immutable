import { modify as array_modify } from "./Array";
import { hash, tag_hash, hash_dict } from "./hash";
import { toJSON_object, fromJSON_object, tag_toJSON, fromJSON_registry } from "./toJSON";
import { toJS_object, tag_toJS } from "./toJS";
import { ImmutableBase } from "./Base";
import { isJSLiteral } from "./util";

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

fromJSON_registry["Record"] = function (x) {
  return Record(fromJSON_object(x));
};

ImmutableRecord.prototype[tag_toJSON] = function (x) {
  return toJSON_object("Record", x);
};

ImmutableRecord.prototype[tag_toJS] = toJS_object;

ImmutableRecord.prototype[tag_hash] = function (x) {
  if (x.hash === null) {
    x.hash = "(Record" + hash_dict(x, "  ") + ")";
  }

  return x.hash;
};

ImmutableRecord.prototype.forEach = function (f) {
  var keys   = this.keys;
  var values = this.values;
  for (var s in keys) {
    var index = keys[s];
    f([s, values[index]]);
  }
};

ImmutableRecord.prototype.get = function (key) {
  checkKey(key);

  var index = this.keys[key];
  if (index == null) {
    throw new Error("Key " + key + " not found");

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

// TODO code duplication with ImmutableDict
ImmutableRecord.prototype.update = function (other) {
  var self = this;

  if (isJSLiteral(other)) {
    Object.keys(other).forEach(function (key) {
      self = self.set(key, other[key]);
    });

  } else {
    other.forEach(function (_array) {
      var key   = _array[0];
      var value = _array[1];

      self = self.set(key, value);
    });
  }

  return self;
};


export function isRecord(x) {
  return x instanceof ImmutableRecord;
}

export function Record(obj) {
  var keys   = {};
  var values = [];

  if (obj != null) {
    if (isRecord(obj)) {
      return obj;

    } else if (isJSLiteral(obj)) {
      Object.keys(obj).forEach(function (key) {
        checkKey(key);

        keys[key] = values.push(obj[key]) - 1;
      });

    } else {
      obj.forEach(function (_array) {
        var key   = _array[0];
        var value = _array[1];

        checkKey(key);

        keys[key] = values.push(value) - 1;
      });
    }
  }

  return new ImmutableRecord(keys, values);
}
