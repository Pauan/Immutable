/**
   @function equal
   @param {Any} [x]
   @param {Any} [y]
   @return {Boolean} `true` if `x` and `y` are equal
   @summary Returns whether `x` and `y` are equal
   @desc
     Simple things like numbers and strings are
     treated as equal if they have the same value:

         equal(1, 1); // true
         equal("foo", "foo"); // true

     This takes `O(1)` time.

     ----

     Mutable objects are treated as equal if they
     are exactly the same object:

         var obj = {};

         equal(obj, obj); // true

     This takes `O(1)` time.

     ----

     [::Dict] are treated as equal if they have
     the same keys/values:

         equal(Dict({ foo: 1 }),
               Dict({ foo: 1 })); // true

     This takes `O(n)` time, except the results
     are cached so that afterwards it takes `O(1)`
     time.

     ----

     [::Set] are treated as equal if they have
     the same values:

         equal(Set([1]),
               Set([1])); // true

     This takes `O(n)` time, except the results
     are cached so that afterwards it takes `O(1)`
     time.

     ----

     [::List] are treated as equal if they have
     the same values in the same order:

         equal(List([1]),
               List([1])); // true

     This takes `O(n)` time, except the results
     are cached so that afterwards it takes `O(1)`
     time.

     ----

     [::Queue] are treated as equal if they have
     the same values in the same order:

         equal(Queue([1]),
               Queue([1])); // true

     This takes `O(n)` time, except the results
     are cached so that afterwards it takes `O(1)`
     time.

     ----

     [::Stack] are treated as equal if they have
     the same values in the same order:

         equal(Stack([1]),
               Stack([1])); // true

     This takes `O(n)` time, except the results
     are cached so that afterwards it takes `O(1)`
     time.

     ----

     [::SortedDict] and [::SortedSet] are the
     same as [::Dict] and [::Set] except that
     the sort order must also be the same.
 */

/**
   @function toJS
   @param {Any} [x]
   @return {Any}
   @summary Converts a [::Dict], [::Set], [::List],
            [::Queue], or [::Stack] to its JavaScript
            equivalent
   @desc
     Most things are returned as-is, except:

     * [::Dict] are converted to a JavaScript object. The keys must be strings.
     * [::Set] are converted to a JavaScript array.
     * [::List] are converted to a JavaScript array.
     * [::Queue] are converted to a JavaScript array.
     * [::Stack] are converted to a JavaScript array.

     This conversion takes `O(n)` time.

     This is useful if you like using [::Dict], [::Set],
     [::List], [::Queue], or [::Stack] but you want to use a
     library that requires ordinary JavaScript objects/arrays.
 */

/**
   @function isDict
   @param {Any} [x]
   @return {Boolean} `true` if `x` is a [::Dict] or [::SortedDict]
   @summary Returns whether `x` is a [::Dict] or [::SortedDict]
 */

/**
   @function isSet
   @param {Any} [x]
   @return {Boolean} `true` if `x` is a [::Set] or [::SortedSet]
   @summary Returns whether `x` is a [::Set] or [::SortedSet]
 */

/**
   @function isSortedDict
   @param {Any} [x]
   @return {Boolean} `true` if `x` is a [::SortedDict]
   @summary Returns whether `x` is a [::SortedDict]
 */

/**
   @function isSortedSet
   @param {Any} [x]
   @return {Boolean} `true` if `x` is a [::SortedSet]
   @summary Returns whether `x` is a [::SortedSet]
 */

/**
   @function isList
   @param {Any} [x]
   @return {Boolean} `true` if `x` is a [::List]
   @summary Returns whether `x` is a [::List]
 */

/**
   @function isQueue
   @param {Any} [x]
   @return {Boolean} `true` if `x` is a [::Queue]
   @summary Returns whether `x` is a [::Queue]
 */

/**
   @function isStack
   @param {Any} [x]
   @return {Boolean} `true` if `x` is a [::Stack]
   @summary Returns whether `x` is a [::Stack]
 */

/**
   @function isImmutable
   @param {Any} [x]
   @return {Boolean} `true` if `x` is a [::Dict], [::Set], [::List], [::Queue], or [::Stack]
   @summary Returns whether `x` is a [::Dict], [::Set], [::List], [::Queue], or [::Stack]
 */

/**
   @function SortedDict
   @param {Function} [sort] Function that determines the sort order
   @param {optional sequence::Sequence|Object} [obj]
   @return {::Dict} A dictionary where the keys are sorted by `sort`
   @summary Returns a [::Dict] where the keys are sorted by `sort`
   @desc
     The sort order for the keys is determined by the `sort` function.

     The `sort` function is given two keys:

     * If it returns `0` the keys are treated as equal.
     * If it returns `-1` the first key is lower than the second key.
     * If it returns `1` the first key is greater than the second key.

     The sort order must be consistent:

     * If given the same keys, the function must return the same result.
     * If it returns `0` for `foo` and `bar`, it must return `0` for `bar` and `foo`.
     * If it returns `-1` for `foo` and `bar`, it must return `1` for `bar` and `foo`.
     * If it returns `1` for `foo` and `bar`, it must return `-1` for `bar` and `foo`.

     If the sort order is not consistent, the behavior of
     [::SortedDict] will be unpredictable. This is not a
     bug in [::SortedDict], it is a bug in your sort
     function.

     ----

     The `obj` parameter is exactly the same as for [::Dict],
     except that the keys are sorted.
 */

/**
   @function SortedSet
   @param {Function} [sort] Function that determines the sort order
   @param {optional sequence::Sequence} [seq]
   @return {::Set} A set where the values are sorted by `sort`
   @summary Returns a [::Set] where the values are sorted by `sort`
   @desc
     The sort order for the values is determined by the `sort` function.

     The `sort` function is given two values:

     * If it returns `0` the values are treated as equal.
     * If it returns `-1` the first value is lower than the second value.
     * If it returns `1` the first value is greater than the second value.

     The sort order must be consistent:

     * If given the same values, the function must return the same result.
     * If it returns `0` for `foo` and `bar`, it must return `0` for `bar` and `foo`.
     * If it returns `-1` for `foo` and `bar`, it must return `1` for `bar` and `foo`.
     * If it returns `1` for `foo` and `bar`, it must return `-1` for `bar` and `foo`.

     If the sort order is not consistent, the behavior of
     [::SortedSet] will be unpredictable. This is not a
     bug in [::SortedSet], it is a bug in your sort
     function.

     ----

     The `seq` parameter is exactly the same as for [::Set],
     except that the values are sorted.
 */

/**
   @class Dict
   @summary An immutable dictionary mapping keys to values

   @function Dict
   @param {optional sequence::Sequence|Object} [obj]
   @desc
     If `obj` is a [sequence::Sequence], the values must
     be arrays of `[key, value]`, which will be added to
     the dict.

     If `obj` is a JavaScript literal like `{ foo: 1 }`,
     then the keys/values will be added to the dict.

     This takes `O(n * log2(n))` time, unless `obj` is already
     a [::Dict], in which case it takes `O(1)` time.

     ----

     The keys are in unsorted order, so you cannot rely upon
     the order. If you need to maintain key order, use a [::SortedDict].

     Mutable objects can be used as keys, and they are treated as
     equal only if they are exactly the same object:

         var obj1 = { foo: 1 };
         var obj2 = { foo: 1 };

         var dict = Dict().set(obj1, "bar")
                          .set(obj2, "qux");

         // Returns "bar"
         dict.get(obj1);

         // Returns "qux"
         dict.get(obj2);

     You can also use a [::Dict], [::Set], or [::List] as keys, and
     they are treated as equal if their keys/values are equal:

         var obj1 = Dict({ foo: 1 });
         var obj2 = Dict({ foo: 1 });

         var dict = Dict().set(obj1, "bar")
                          .set(obj2, "qux");

         // Returns "qux"
         dict.get(obj1);

         // Returns "qux"
         dict.get(obj2);

     Because `obj1` and `obj2` have the same keys/values, they are
     equal.

   @function Dict.isEmpty
   @return {Boolean} `true` if the dict is empty
   @summary Returns whether the dict is empty or not
   @desc
     This function runs in `O(1)` time.

     A dict is empty if it has no keys/values in it.

   @function Dict.has
   @param {Any} [key] The key to search for in the dict
   @return {Boolean} `true` if `key` exists in the dict
   @summary Returns whether `key` exists in the dict
   @desc
     This function runs in `O(log2(n))` worst-case time.

   @function Dict.get
   @param {Any} [key] The key to search for in the dict
   @param {optional Any} [default] Value to return if `key` is not in the dict
   @return {Any} The value for `key` in the dict, or `default` if not found
   @summary Returns the value for `key` in the dict, or `default` if not found
   @desc
     This function runs in `O(log2(n))` worst-case time.

     If `key` is not in the dict:

     * If `default` is provided, it is returned.
     * If `default` is not provided, an error is thrown.

   @function Dict.set
   @param {Any} [key] The key to set in the dict
   @param {Any} [value] The value to use for `key`
   @return {::Dict} A new dict with `key` set to `value`
   @summary Returns a new dict with `key` set to `value`
   @desc
     This function runs in `O(log2(n))` worst-case time.

     This does not modify the dict, it returns a new dict.

     If `key` already exists, it is overwritten.

     If `key` does not exist, it is created.

   @function Dict.remove
   @param {Any} [key] The key to remove from the dict
   @return {::Dict} A new dict with `key` removed
   @summary Returns a new dict with `key` removed
   @desc
     This function runs in `O(log2(n))` worst-case time.

     This does not modify the dict, it returns a new dict.

     If `key` is not in the dict, it will do nothing.

   @function Dict.modify
   @param {Any} [key] The key to modify in the dict
   @param {Function} [fn] The function which will modify the value at `key`
   @return {::Dict} A new dict with `key` modified by `fn`
   @summary Returns a new dict with `key` modified by `fn`
   @desc
     This function runs in `O(log2(n))` worst-case time.

     This does not modify the dict, it returns a new dict.

     This function calls `fn` with the value for `key`, and
     whatever `fn` returns will be used as the new value for
     `key`:

         var dict = Dict({
           "foo": 1,
           "bar": 2
         });

         // This returns the dict { "foo": 11, "bar": 2 }
         dict.modify("foo", function (x) { return x + 10 });

         // This returns the dict { "foo": 1, "bar": 12 }
         dict.modify("bar", function (x) { return x + 10 });

     If `key` is not in the dict, it will throw an error.
 */

/**
   @class Set
   @summary An immutable unordered sequence of values, without duplicates

   @function Set
   @param {optional sequence::Sequence} [seq]
   @desc
     The values from `seq` will be inserted into the set,
     without duplicates.

     This takes `O(n)` time, unless `seq` is already a
     [::Set], in which case it takes `O(1)` time.

     ----

     The values are in unsorted order, so you cannot rely upon
     the order. If you need to maintain order, use a [::SortedSet]
     or [::List].

     Mutable objects can be used as values, and they are treated
     as equal only if they are exactly the same object:

         var obj1 = { foo: 1 };
         var obj2 = { foo: 1 };

         var set = Set([obj1, obj2]);

         // Returns true
         set.has(obj1);

         // Returns true
         set.has(obj2);

         // Removes obj1 from the set
         set = set.remove(obj1);

         // Returns true
         set.has(obj2);

     You can also use a [::Dict], [::Set], or [::List] as values,
     and they are treated as equal if their keys/values are equal:

         var obj1 = Dict({ foo: 1 });
         var obj2 = Dict({ foo: 1 });

         var set = Set([obj1, obj2]);

         // Returns true
         set.has(obj1);

         // Returns true
         set.has(obj2);

         // Removes obj1 from the set
         set = set.remove(obj1);

         // Returns false
         set.has(obj2);

     Because `obj1` and `obj2` have the same keys/values, they are
     equal, and so they are treated as duplicates.

   @function Set.isEmpty
   @return {Boolean} `true` if the set is empty
   @summary Returns whether the set is empty or not
   @desc
     This function runs in `O(1)` time.

     A set is empty if it has no values in it.

   @function Set.has
   @param {Any} [value] The value to search for in the set
   @return {Boolean} `true` if `value` exists in the set
   @summary Returns whether `value` exists in the set
   @desc
     This function runs in `O(log2(n))` worst-case time.

   @function Set.add
   @param {Any} [value] The value to add to the set
   @return {::Set} A new set with `value` added to it
   @summary Returns a new set with `value` added to it
   @desc
     This function runs in `O(log2(n))` worst-case time.

     This does not modify the set, it returns a new set.

     If `value` is already in the set, it will do nothing.

   @function Set.remove
   @param {Any} [value] The value to remove from the set
   @return {::Set} A new set with `value` removed
   @summary Returns a new set with `value` removed
   @desc
     This function runs in `O(log2(n))` worst-case time.

     This does not modify the set, it returns a new set.

     If `value` is not in the set, it will do nothing.

   @function Set.union
   @param {sequence::Sequence} [other] Sequence of values to union with this set
   @return {::Set} A new set which is the union of this set and `other`
   @summary Returns a new set which is the union of this set and `other`
   @desc
     This function runs in `O(n * log2(n))` worst-case time.

     This does not modify the set, it returns a new set.

     This function returns a set which contains all the values from
     this set, and also all the values from `other`.

     This is a standard [set union](http://en.wikipedia.org/wiki/Union_%28set_theory%29).

     `other` can be any [sequence::Sequence] of values.

   @function Set.intersect
   @param {sequence::Sequence} [other] Sequence of values to intersect with this set
   @return {::Set} A new set which is the intersection of this set and `other`
   @summary Returns a new set which is the intersection of this set and `other`
   @desc
     This function runs in `O(n * 2 * log2(n))` worst-case time.

     This does not modify the set, it returns a new set.

     This function returns a set which contains all the values that
     are in both this set *and* `other`.

     This is a standard [set intersection](http://en.wikipedia.org/wiki/Intersection_%28set_theory%29).

     `other` can be any [sequence::Sequence] of values.

   @function Set.disjoint
   @param {sequence::Sequence} [other] Sequence of values to disjoint with this set
   @return {::Set} A new set which is disjoint with this set and `other`
   @summary Returns a new set which is disjoint with this set and `other`
   @desc
     This function runs in `O(n * 2 * log2(n))` worst-case time.

     This does not modify the set, it returns a new set.

     This function returns a set which contains all the values in
     this set, and all the values in `other`, but *not* the
     values which are in both this set and `other`.

     This is also called the [symmetric difference](http://en.wikipedia.org/wiki/Symmetric_difference)
     of the two sets.

     `other` can be any [sequence::Sequence] of values.

   @function Set.subtract
   @param {sequence::Sequence} [other] Sequence of values to subtract from this set
   @return {::Set} A new set which is this set subtracted by `other`
   @summary Returns a new set which is this set subtracted by `other`
   @desc
     This function runs in `O(n * log2(n))` worst-case time.

     This does not modify the set, it returns a new set.

     This function returns a set which contains all the values in
     this set, but without the values from `other`.

     This is also called the [relative complement](http://en.wikipedia.org/wiki/Complement_%28set_theory%29) of the two sets.

     `other` can be any [sequence::Sequence] of values.
 */

/**
   @class List
   @summary An immutable ordered sequence of values

   @function List
   @param {optional sequence::Sequence} [seq]
   @desc
     The values from `seq` will be inserted into
     the list, in the same order as `seq`.

     This takes `O(n)` time, unless `seq` is already a
     [::List], in which case it takes `O(1)` time.

     ----

     Duplicate values are allowed, and duplicates don't
     have to be in the same order.

     The values in the list can have whatever order you
     want, but they are not sorted. If you want the values
     to be sorted, use a [::SortedSet] instead.

   @function List.isEmpty
   @return {Boolean} `true` if the list is empty
   @summary Returns whether the list is empty or not
   @desc
     This function runs in `O(1)` time.

     A list is empty if it has no values in it.

   @function List.size
   @return {Integer} The number of values in the list
   @summary Returns the number of values in the list
   @desc
     This function runs in `O(1)` time.

   @function List.has
   @param {Integer} [index] An index within the list
   @return {Boolean} `true` if `index` is valid
   @summary Returns whether `index` is valid for the list
   @desc
     This function runs in `O(1)` time.

     `index` is valid if it is between `0` and
     `list.size() - 1`.

     If `index` is negative, it starts counting from
     the end of the list, so `-1` is the last index for
     the list, `-2` is the second-from-last index, etc.

   @function List.get
   @param {Integer} [index] Index within the list
   @param {optional Any} [default] Value to return if `index` is not in the list
   @return {Any} The value in the list at `index`, or `default` if `index` is not in the list
   @summary Returns the value in the list at `index`, or `default` if `index` is not in the list
   @desc
     This function runs in `O(log2(n / 125))` worst-case time.

     If `index` is negative, it starts counting from
     the end of the list, so `-1` is the last value
     in the list, `-2` is the second-from-last value,
     etc.

     If `index` is not in the list:

     * If `default` is provided, it is returned.
     * If `default` is not provided, an error is thrown.

   @function List.insert
   @param {Any} [value] The value to insert into the list
   @param {optional Integer} [index] The index to insert `value`. Defaults to `-1`.
   @return {::List} A new list with `value` inserted at `index`
   @summary Returns a new list with `value` inserted at `index`
   @desc
     If inserting at the end of the list, this function runs in
     amortized `O(1)` time.

     Otherwise this function runs in `O(log2(n / 125) + 125)`
     worst-case time.

     This does not modify the list, it returns a new list.

     ----

     `index` defaults to `-1`, which inserts `value` at
     the end of the list.

     If `index` is negative, it starts counting from
     the end of the list, so `-1` inserts `value` as
     the last value, `-2` inserts `value` as the
     second-from-last value, etc.

     If `index` is invalid, an error is thrown.

   @function List.remove
   @param {optional Integer} [index] The index to remove from the list. Defaults to `-1`.
   @return {::List} A new list with the value at `index` removed
   @summary Returns a new list with the value at `index` removed
   @desc
     This function runs in `O(log2(n / 125) + 125)` worst-case time.

     This does not modify the list, it returns a new list.

     ----

     `index` defaults to `-1`, which removes the value
     at the end of the list.

     If `index` is negative, it starts counting from
     the end of the list, so `-1` removes the last value,
     `-2` removes the second-from-last value, etc.

     If `index` is not in the list, an error is thrown.

   @function List.modify
   @param {Integer} [index] The index to modify in the list
   @param {Function} [fn] The function which will modify the value at `index`
   @return {::List} A new list with the value at `index` modified by `fn`
   @summary Returns a new list with the value at `index` modified by `fn`
   @desc
     This function runs in `O(log2(n / 125) + 125)` worst-case time.

     This does not modify the list, it returns a new list.

     ----

     This function calls `fn` with the value at `index`, and
     whatever `fn` returns will be used as the new value at
     `index`:

         var list = List([1, 2, 3]);

         // This returns the list [11, 2, 3]
         list.modify(0, function (x) { return x + 10 });

         // This returns the list [1, 12, 3]
         list.modify(1, function (x) { return x + 10 });

     If `index` is negative, it starts counting from
     the end of the list, so `-1` modifies the last value,
     `-2` modifies the second-from-last value, etc.

     If `index` is not in the list, an error is thrown.

   @function List.slice
   @param {optional Integer} [from] The index to start at. Defaults to `0`
   @param {optional Integer} [to] The index to end at. Defaults to `list.size()`
   @return {::List} A new list with all the values between indexes
                    `from` (included) and `to` (excluded).
   @summary Returns a new list with all the values between indexes
            `from` (included) and `to` (excluded).
   @desc
     This function runs in `O(log2(n / 125) + 249 + (2 * (m / 125)))`
     worst-case time.

     This does not modify the list, it returns a new list.

     ----

     `from` defaults to `0`. `to` defaults to `list.size()`.
     This means that `list.slice()` returns all the values
     in `list`.

     If `from` or `to` is negative, it starts counting from
     the end of the list, so `-1` means the last value of
     the list, `-2` means the second-from-last value, etc.

     ----

     If `from` is not in the list, an error is thrown.

     If `to` is invalid, an error is thrown.

     If `from` is greater than `to`, an error is thrown.

     ----

     Some examples:

         var list = List([1, 2, 3, 4]);

         list.slice()       // [1, 2, 3, 4]
         list.slice(1)      // [2, 3, 4]
         list.slice(1, 3)   // [2, 3]
         list.slice(-1)     // [4]
         list.slice(-2, -1) // [3]

   @function List.concat
   @param {sequence::Sequence} [other] The [sequence::Sequence] to append to this list
   @return {::List} A new list with all the values of this list followed
                    by all the values of `other`.
   @summary Returns a new list with all the values of this list followed
            by all the values of `other`.
   @desc
     If `other` is a [::List], this function runs in
     `O(125 + log2(n / 125) + log2(min(n / 125, m / 125)))`
     worst-case time.

     Otherwise this function runs in `O(n)` time.

     This does not modify the list, it returns a new list.
*/

/**
   @class Queue
   @summary An immutable ordered sequence of values that can
            efficiently add to the end and remove from the front

   @function Queue
   @param {optional sequence::Sequence} [seq]
   @desc
     The values from `seq` will be inserted into
     the queue, in the same order as `seq`.

     This takes `O(n)` time, unless `seq` is already a
     [::Queue], in which case it takes `O(1)` time.

     ----

     Duplicate values are allowed, and duplicates don't
     have to be in the same order.

     The values in the queue can have whatever order you
     want, but they are not sorted. If you want the values
     to be sorted, use a [::SortedSet] instead.

   @function Queue.isEmpty
   @return {Boolean} `true` if the queue is empty
   @summary Returns whether the queue is empty or not
   @desc
     This function runs in `O(1)` time.

     A queue is empty if it has no values in it.

   @function Queue.size
   @return {Integer} The number of values in the queue
   @summary Returns the number of values in the queue
   @desc
     This function runs in `O(1)` time.

   @function Queue.peek
   @param {optional Any} [default] Value to return if the queue is empty
   @return {Any} The value at the front of the queue, or `default` if the queue is empty
   @summary Returns the value at the front of the queue, or `default` if the queue is empty
   @desc
     This function runs in `O(1)` time.

     If the queue is empty:

     * If `default` is provided, it is returned.
     * If `default` is not provided, an error is thrown.

   @function Queue.push
   @param {Any} [value] The value to insert at the end of the queue
   @return {::Queue} A new queue with `value` inserted at the end of the queue
   @summary Returns a new queue with `value` inserted at the end of the queue
   @desc
     This function runs in `O(1)` time.

     This does not modify the queue, it returns a new queue.

   @function Queue.pop
   @return {::Queue} A new queue with the value at the front removed
   @summary Returns a new queue with the value at the front removed
   @desc
     This function runs in amortized `O(1)` time.

     This does not modify the queue, it returns a new queue.

     If the queue is empty, an error is thrown.

   @function Queue.concat
   @param {sequence::Sequence} [other] The [sequence::Sequence] to append to this queue
   @return {::Queue} A new queue with all the values of this queue followed
                     by all the values of `other`.
   @summary Returns a new queue with all the values of this queue followed
            by all the values of `other`.
   @desc
     This function runs in `O(n)` time.

     This does not modify the queue, it returns a new queue.
*/

/**
   @class Stack
   @summary An immutable ordered sequence of values that can
            efficiently add and remove from the end

   @function Stack
   @param {optional sequence::Sequence} [seq]
   @desc
     The values from `seq` will be inserted into
     the stack, in the same order as `seq`.

     This takes `O(n)` time, unless `seq` is already a
     [::Stack], in which case it takes `O(1)` time.

     ----

     Duplicate values are allowed, and duplicates don't
     have to be in the same order.

     The values in the stack can have whatever order you
     want, but they are not sorted. If you want the values
     to be sorted, use a [::SortedSet] instead.

   @function Stack.isEmpty
   @return {Boolean} `true` if the stack is empty
   @summary Returns whether the stack is empty or not
   @desc
     This function runs in `O(1)` time.

     A stack is empty if it has no values in it.

   @function Stack.size
   @return {Integer} The number of values in the stack
   @summary Returns the number of values in the stack
   @desc
     This function runs in `O(1)` time.

   @function Stack.peek
   @param {optional Any} [default] Value to return if the stack is empty
   @return {Any} The value at the end of the stack, or `default` if the stack is empty
   @summary Returns the value at the end of the stack, or `default` if the stack is empty
   @desc
     This function runs in `O(1)` time.

     If the stack is empty:

     * If `default` is provided, it is returned.
     * If `default` is not provided, an error is thrown.

   @function Stack.push
   @param {Any} [value] The value to insert at the end of the stack
   @return {::Stack} A new stack with `value` inserted at the end of the stack
   @summary Returns a new stack with `value` inserted at the end of the stack
   @desc
     This function runs in `O(1)` time.

     This does not modify the stack, it returns a new stack.

   @function Stack.pop
   @return {::Stack} A new stack with the value at the end removed
   @summary Returns a new stack with the value at the end removed
   @desc
     This function runs in `O(1)` time.

     This does not modify the stack, it returns a new stack.

     If the stack is empty, an error is thrown.

   @function Stack.concat
   @param {sequence::Sequence} [other] The [sequence::Sequence] to append to this stack
   @return {::Stack} A new stack with all the values of this stack followed
                     by all the values of `other`.
   @summary Returns a new stack with all the values of this stack followed
            by all the values of `other`.
   @desc
     This function runs in `O(n)` time.

     This does not modify the stack, it returns a new stack.
*/


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
