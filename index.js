var _hash = require("./src/hash");
var _toJS = require("./src/toJS");
var _Sorted = require("./src/Sorted");

var ImmutableDict = require("./src/ImmutableDict");
var ImmutableSet = require("./src/ImmutableSet");
var ImmutableList = require("./src/ImmutableList");
var ImmutableQueue = require("./src/ImmutableQueue");
var ImmutableStack = require("./src/ImmutableStack");
var nil = require("./src/nil");

var hash = _hash.hash;
var toJS = _toJS.toJS;
var defaultSort = _Sorted.defaultSort;


function equal(x, y) {
  return x === y || hash(x) === hash(y);
}

function isDict(x) {
  return x instanceof ImmutableDict;
}

function isSet(x) {
  return x instanceof ImmutableSet;
}

function isSortedDict(x) {
  return isDict(x) && x.sort !== defaultSort;
}

function isSortedSet(x) {
  return isSet(x) && x.sort !== defaultSort;
}

function isList(x) {
  return x instanceof ImmutableList;
}

function isQueue(x) {
  return x instanceof ImmutableQueue;
}

function isStack(x) {
  return x instanceof ImmutableStack;
}

function isImmutable(x) {
  return isDict(x) || isSet(x) || isList(x) || isQueue(x) || isStack(x);
}


// TODO move into a different module
function isJSLiteral(x) {
  var proto = Object.getPrototypeOf(x);
  // TODO this won't work cross-realm
  return proto === null || proto === Object.prototype;
}

function SortedDict(sort, obj) {
  if (obj != null) {
    // We don't use equal, for increased speed
    if (obj instanceof ImmutableDict && obj.sort === sort) {
      return obj;

    } else {
      var o = new ImmutableDict(nil, sort);

      if (isJSLiteral(obj)) {
        Object.keys(obj).forEach(function (key) {
          o = o.set(key, obj[key]);
        });

      } else {
        obj.forEach(function (_array) {
          var key   = _array[0];
          var value = _array[1];
          o = o.set(key, value);
        });
      }

      return o;
    }
  } else {
    return new ImmutableDict(nil, sort);
  }
}

function SortedSet(sort, array) {
  if (array != null) {
    // We don't use equal, for increased speed
    if (array instanceof ImmutableSet && array.sort === sort) {
      return array;

    } else {
      // TODO use concat ?
      var o = new ImmutableSet(nil, sort);

      array.forEach(function (x) {
        o = o.add(x);
      });

      return o;
    }
  } else {
    return new ImmutableSet(nil, sort);
  }
}

function Dict(obj) {
  return SortedDict(defaultSort, obj);
}

function Set(array) {
  return SortedSet(defaultSort, array);
}

function List(array) {
  if (array != null) {
    if (array instanceof ImmutableList) {
      return array;

    } else {
      var o = new ImmutableList(nil, nil, 0);

      array.forEach(function (x) {
        o = o.insert(x);
      });

      return o;
    }
  } else {
    return new ImmutableList(nil, nil, 0);
  }
}

function Queue(x) {
  if (x != null) {
    if (x instanceof ImmutableQueue) {
      return x;

    } else {
      // TODO use concat ?
      var o = new ImmutableQueue(nil, nil, 0);

      x.forEach(function (x) {
        o = o.push(x);
      });

      return o;
    }
  } else {
    return new ImmutableQueue(nil, nil, 0);
  }
}

function Stack(x) {
  if (x != null) {
    if (x instanceof ImmutableStack) {
      return x;

    } else {
      // TODO use concat ?
      var o = new ImmutableStack(nil, 0);

      x.forEach(function (x) {
        o = o.push(x);
      });

      return o;
    }
  } else {
    return new ImmutableStack(nil, 0);
  }
}


exports.equal = equal;
exports.toJS = toJS;
exports.isDict = isDict;
exports.isSet = isSet;
exports.isSortedDict = isSortedDict;
exports.isSortedSet = isSortedSet;
exports.isList = isList;
exports.isQueue = isQueue;
exports.isStack = isStack;
exports.isImmutable = isImmutable;
exports.SortedDict = SortedDict;
exports.SortedSet = SortedSet;
exports.Dict = Dict;
exports.Set = Set;
exports.List = List;
exports.Queue = Queue;
exports.Stack = Stack;
