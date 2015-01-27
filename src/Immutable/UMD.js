import { equal, fromJS, toJS, isDict, isSet, isSortedDict, isSortedSet,
         isList, isQueue, isTuple, isStack, isImmutable, SortedDict,
         SortedSet, isIterable, Dict, Set, List, Tuple, Queue, Stack,
         simpleSort, isRecord, Record, toJSON, fromJSON, deref, Ref,
         isRef, isTag, isUUIDTag, Tag, UUIDTag, each, map, keep,
         findIndex, reverse, foldl, foldr, join, zip, toArray, any,
         all, find, partition, range, take, indexOf, toIterator, Iterable,
         repeat, skip } from "../Immutable";

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
  exports.isTuple = isTuple;
  exports.isStack = isStack;
  exports.isImmutable = isImmutable;
  exports.SortedDict = SortedDict;
  exports.SortedSet = SortedSet;
  exports.isIterable = isIterable;
  exports.Dict = Dict;
  exports.Set = Set;
  exports.List = List;
  exports.Tuple = Tuple;
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
  exports.zip = zip;
  exports.toArray = toArray;
  exports.any = any;
  exports.all = all;
  exports.find = find;
  exports.partition = partition;
  exports.range = range;
  exports.take = take;
  exports.indexOf = indexOf;
  exports.toIterator = toIterator;
  exports.Iterable = Iterable;
  exports.repeat = repeat;
  exports.skip = skip;
});
