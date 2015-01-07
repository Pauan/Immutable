import { hash } from "./hash";
import { isObject, isJSLiteral } from "./util";

import { toJS } from "./toJS";
import { toJSON, fromJSON } from "./toJSON";
import { simpleSort } from "./Sorted";
import { SortedDict, Dict, isDict, isSortedDict } from "./ImmutableDict";
import { SortedSet, Set, isSet, isSortedSet } from "./ImmutableSet";
import { isList, List } from "./ImmutableList";
import { isQueue, Queue } from "./ImmutableQueue";
import { isStack, Stack } from "./ImmutableStack";
import { isRecord, Record } from "./ImmutableRecord";
import { deref, Ref, isRef } from "./MutableRef";
import { isTag, isUUIDTag, Tag, UUIDTag } from "./Tag";
import { each, map, keep, findIndex, reverse, foldl, foldr, join } from "./iter";

export { toJS, simpleSort, toJSON, fromJSON,
         SortedDict, Dict, isDict, isSortedDict,
         SortedSet, Set, isSet, isSortedSet,
         isList, List, isQueue, Queue,
         isStack, Stack, isRecord, Record,
         deref, Ref, isRef,
         isTag, isUUIDTag, Tag, UUIDTag,
         each, map, keep, findIndex, reverse, foldl, foldr, join };


// TODO support -0 and 0 ?
export function equal(x, y) {
  return x === y || hash(x) === hash(y);
}

// TODO use `x instanceof ImmutableBase` ? What about ImmutableRef ?
export function isImmutable(x) {
  if (isObject(x)) {
    return Object.isFrozen(x) ||
           isDict(x)  ||
           isSet(x)   ||
           isList(x)  ||
           isQueue(x) ||
           isStack(x) ||
           isRecord(x);
  // TODO just return true? are there any mutable value types?
  } else {
    var type = typeof x;
    // Tags are currently implemented with strings
    return type === "string"  ||
           type === "number"  ||
           type === "boolean" ||
           type === "symbol"  ||
           x == null;
  }
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
  exports.isRecord = isRecord;
  exports.Record = Record;
  exports.toJSON = toJSON;
  exports.fromJSON = fromJSON;
  exports.deref = deref;
  exports.Ref = Ref;
  exports.isRef = isRef;
  exports.isTag = isTag;
  exports.isUUIDTag = isUUIDTag;
  exports.Tag = Tag;
  exports.UUIDTag = UUIDTag;
  exports.each = each;
  exports.map = map;
  exports.keep = keep;
  exports.findIndex = findIndex;
  exports.reverse = reverse;
  exports.foldl = foldl;
  exports.foldr = foldr;
  exports.join = join;
});
