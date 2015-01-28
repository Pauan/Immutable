import { isObject } from "./Immutable/util";

import { equal } from "./Immutable/equal";
import { toJS, fromJS } from "./Immutable/toJS";
import { toJSON, fromJSON } from "./Immutable/toJSON";
import { simpleSort } from "./Immutable/Sorted";
import { SortedDict, Dict, isDict, isSortedDict } from "./Immutable/ImmutableDict";
import { SortedSet, Set, isSet, isSortedSet } from "./Immutable/ImmutableSet";
import { isList, List } from "./Immutable/ImmutableList";
import { isTuple, Tuple } from "./Immutable/ImmutableTuple";
import { isType, Type } from "./Immutable/ImmutableType";
import { isQueue, Queue } from "./Immutable/ImmutableQueue";
import { isStack, Stack } from "./Immutable/ImmutableStack";
import { isRecord, Record } from "./Immutable/ImmutableRecord";
import { deref, Ref, isRef } from "./Immutable/MutableRef";
import { isTag, isUUIDTag, Tag, UUIDTag } from "./Immutable/Tag";
import { each, map, keep, findIndex, reverse, foldl,
         foldr, join, zip, toArray, isIterable,
         any, all, find, partition, range, take, indexOf,
         toIterator, Iterable, repeat, skip } from "./Immutable/iter";

export { equal, toJS, fromJS, simpleSort, toJSON, fromJSON,
         SortedDict, Dict, isDict, isSortedDict,
         SortedSet, Set, isSet, isSortedSet,
         isList, List, isQueue, Queue,
         isTuple, Tuple,
         isStack, Stack, isRecord, Record,
         deref, Ref, isRef,
         isTag, isUUIDTag, Tag, UUIDTag,
         each, map, keep, findIndex, reverse, foldl,
         foldr, join, zip, toArray, isIterable, any, all,
         find, partition, range, take, indexOf,
         toIterator, Iterable, repeat, skip,
         isType, Type };

// TODO use `x instanceof ImmutableBase` ? What about ImmutableRef ?
export function isImmutable(x) {
  if (isObject(x)) {
    return Object.isFrozen(x) ||
           isDict(x)  ||
           isSet(x)   ||
           isList(x)  ||
           isTuple(x) ||
           isQueue(x) ||
           isStack(x) ||
           isRecord(x) ||
           isType(x);
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
