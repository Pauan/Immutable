var ImmutableList = require("./src/ImmutableList");
var nil = require("./src/nil");


/**
 * Converts a List into a JavaScript array.
 */
function toJS(x) {
  if (x instanceof ImmutableList) {
    var a = [];

    x.forEach(function (x) {
      a.push(toJS(x));
    });

    return a;
  } else {
    return x;
  }
}


/**
 * Returns true if its argument is a List
 */
function isList(x) {
  return x instanceof ImmutableList;
}


/**
   @class List
   @summary An immutable ordered sequence of values

   @function List
   @param {optional Array} [seq]
   @desc
     The values from `seq` will be inserted into
     the list, in the same order as `seq`.

     This takes `O(n)` time, unless `seq` is already a
     List, in which case it takes `O(1)` time.

     ----

     Duplicate values are allowed, and duplicates don't
     have to be in the same order.

     The values in the list can have whatever order you
     want, but they are not sorted.

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
   @return {List} A new list with `value` inserted at `index`
   @summary Returns a new list with `value` inserted at `index`
   @desc
     If inserting at the end of the list, this function runs in
     amortized `O(1)` time.

     Otherwise this function runs in `O(log2(n / 125) + 125)`
     worst-case time.

     This does not modify the list, it returns a new list.

     `index` defaults to `-1`, which inserts `value` at
     the end of the list.

     If `index` is negative, it starts counting from
     the end of the list, so `-1` inserts `value` as
     the last value, `-2` inserts `value` as the
     second-from-last value, etc.

   @function List.remove
   @param {optional Integer} [index] The index to remove from the list. Defaults to `-1`.
   @return {List} A new list with the value at `index` removed
   @summary Returns a new list with the value at `index` removed
   @desc
     This function runs in `O(log2(n / 125) + 125)` worst-case time.

     This does not modify the list, it returns a new list.

     `index` defaults to `-1`, which removes the value
     at the end of the list.

     If `index` is negative, it starts counting from
     the end of the list, so `-1` removes the last value,
     `-2` removes the second-from-last value, etc.

   @function List.set
   @param {Integer} [index] The index to set in the list
   @param {Any} [value] The value which will be set at `index`
   @return {List} A new list with the value at `index` set to `value`
   @summary Returns a new list with the value at `index` set to `value`
   @desc
     This function runs in `O(log2(n / 125) + 125)` worst-case time.

     This does not modify the list, it returns a new list.

     If `index` is negative, it starts counting from
     the end of the list, so `-1` modifies the last value,
     `-2` modifies the second-from-last value, etc.

   @function List.modify
   @param {Integer} [index] The index to modify in the list
   @param {Function} [fn] The function which will modify the value at `index`
   @return {List} A new list with the value at `index` modified by `fn`
   @summary Returns a new list with the value at `index` modified by `fn`
   @desc
     This function runs in `O(log2(n / 125) + 125)` worst-case time.

     This does not modify the list, it returns a new list.

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

   @function List.concat
   @param {List | Array} [other] The sequence to append to this list
   @return {List} A new list with all the values of this list followed
                  by all the values of `other`.
   @summary Returns a new list with all the values of this list followed
            by all the values of `other`.
   @desc
     If `other` is a List, this function runs in
     `O(125 + log2(n / 125) + log2(min(n / 125, m / 125)))`
     worst-case time.

     Otherwise this function runs in `O(n)` time.

     This does not modify the list, it returns a new list.
*/
function List(array) {
  if (array != null) {
    if (array instanceof ImmutableList) {
      return array;
    } else {
      var o = new ImmutableList(nil, nil, 0);

      // TODO use iterators
      array.forEach(function (x) {
        o = o.insert(x);
      });

      return o;
    }
  } else {
    return new ImmutableList(nil, nil, 0);
  }
}


exports.isList = isList;
exports.List = List;
exports.toJS = toJS;
