import { isObject } from "./util";

import { equal } from "./equal";
import { toJS, fromJS } from "./toJS";
import { toJSON, fromJSON } from "./toJSON";
import { simpleSort } from "./Sorted";
import { SortedDict, Dict, isDict, isSortedDict } from "./ImmutableDict";
import { SortedSet, Set, isSet, isSortedSet } from "./ImmutableSet";
import { isList, List } from "./ImmutableList";
import { isTuple, Tuple } from "./ImmutableTuple";
import { isQueue, Queue } from "./ImmutableQueue";
import { isStack, Stack } from "./ImmutableStack";
import { isRecord, Record } from "./ImmutableRecord";
import { deref, Ref, isRef } from "./MutableRef";
import { isTag, isUUIDTag, Tag, UUIDTag } from "./Tag";
import { each, map, keep, findIndex, reverse, foldl,
         foldr, join, zip, toArray, isIterable,
         any, all, find, partition, range, take, indexOf,
         toIterator, Iterable } from "./iter";

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
         toIterator, Iterable };

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
