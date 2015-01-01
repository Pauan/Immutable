import { hash } from "./hash";
import { toJS } from "./toJS";
import { isJSLiteral } from "./util";
import { simpleSort, defaultSort } from "./Sorted";
import { ImmutableDict } from "./ImmutableDict";
import { ImmutableSet } from "./ImmutableSet";
import { ImmutableList } from "./ImmutableList";
import { ImmutableQueue } from "./ImmutableQueue";
import { ImmutableStack } from "./ImmutableStack";
import { nil } from "./nil";


// TODO support -0 and 0 ?
export function equal(x, y) {
  return x === y || hash(x) === hash(y);
}

export function isDict(x) {
  return x instanceof ImmutableDict;
}

export function isSet(x) {
  return x instanceof ImmutableSet;
}

export function isSortedDict(x) {
  return isDict(x) && x.sort !== defaultSort;
}

export function isSortedSet(x) {
  return isSet(x) && x.sort !== defaultSort;
}

export function isList(x) {
  return x instanceof ImmutableList;
}

export function isQueue(x) {
  return x instanceof ImmutableQueue;
}

export function isStack(x) {
  return x instanceof ImmutableStack;
}

export function isImmutable(x) {
  return isDict(x) || isSet(x) || isList(x) || isQueue(x) || isStack(x);
}

export function fromJS(x) {
  if (Array.isArray(x)) {
    var out = List();

    for (var i = 0, l = x.length; i < l; ++i) {
      out = out.insert(fromJS(x[i]));
    }

    return out;

  } else if (isJSLiteral(x)) {
    var out = Dict();

    // TODO should this only include own properties ...?
    for (var s in x) {
      out = out.set(s, fromJS(x[s]));
    }

    return out;

  } else {
    return x;
  }
}

export function SortedDict(sort, obj) {
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

export function SortedSet(sort, array) {
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

export function Dict(obj) {
  return SortedDict(defaultSort, obj);
}

export function Set(array) {
  return SortedSet(defaultSort, array);
}

export function List(array) {
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

export function Queue(x) {
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

export function Stack(x) {
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


// UMD https://github.com/umdjs/umd
;(function (root, fn) {
  if (typeof define === 'function' && define.amd) {
    define(["exports"], fn);
  } else if (typeof exports === 'object') {
    fn(exports);
  } else {
    root.Immutable = {};
    fn(root.Immutable);
  }
})(this, function (exports) {
  exports.equal = equal;
  exports.fromJS = fromJS;
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
  exports.simpleSort = simpleSort;
  exports.defaultSort = defaultSort;
  exports._nil = nil; // TODO hacky
});
