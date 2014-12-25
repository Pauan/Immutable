// It's faster to use arrays for small lists
var array_limit = 125;

var ceiling = Math.ceil;

function array_insert_at(array, index, value) {
  var len = array.length + 1;

  var out = new Array(len);

  var i = 0;
  while (i < index) {
    out[i] = array[i];
    ++i;
  }

  out[i] = value;
  ++i;

  while (i < len) {
    out[i] = array[i - 1];
    ++i;
  }

  return out;
}

function array_modify_at(array, index, f) {
  var old_value = array[index];
  var new_value = f(old_value);

  if (old_value === new_value) {
    return array;

  } else {
    // It's fast enough to just use `array.slice`, rather than a custom function
    var new_array = array.slice();
    new_array[index] = new_value;
    return new_array;
  }
}

function array_remove_at(array, index) {
  var len = array.length - 1;

  var out = new Array(len);

  var i = 0;
  while (i < index) {
    out[i] = array[i];
    ++i;
  }

  while (i < len) {
    out[i] = array[i + 1];
    ++i;
  }

  return out;
}


// We use conses at the very end of the list for very fast O(1) push
function Cons(car, cdr) {
  this.car = car;
  this.cdr = cdr;
}

Cons.prototype.forEach = function (f) {
  var self = this;
  while (self !== nil) {
    f(self.car);
    self = self.cdr;
  }
};

// TODO this isn't tail recursive
Cons.prototype.forEachRev = function (f) {
  this.cdr.forEachRev(f);
  f(this.car);
};

// Converts a stack (reversed cons) into an array
function stack_to_array(a, size) {
  var out = new Array(size);

  while (size--) {
    out[size] = a.car;
    a = a.cdr;
  }

  return out;
}

function stack_nth(a, size, i) {
  while (--size !== i) {
    a = a.cdr;
  }

  return a.car;
}


function ArrayNode(left, right, array) {
  this.left  = left;
  this.right = right;
  this.array = array;
  this.size  = left.size + right.size + array.length;
  this.depth = max(left.depth, right.depth) + 1;
}

ArrayNode.prototype.copy = function (left, right) {
  return new ArrayNode(left, right, this.array);
};

ArrayNode.prototype.forEach = function (f) {
  this.left.forEach(f);
  this.array.forEach(function (x) {
    f(x);
  });
  this.right.forEach(f);
};


function nth_has(index, len) {
  return index >= 0 && index < len;
}

function nth_get(node, index) {
  for (;;) {
    var left    = node.left;
    var l_index = left.size;

    if (index < l_index) {
      node = left;

    } else {
      index -= l_index;

      var array = node.array;
      var len   = array.length;
      if (index < len) {
        return array[index];

      } else {
        index -= len;
        node  = node.right;
      }
    }
  }
}

function nth_insert(node, index, value) {
  // TODO is this necessary ?
  if (node === nil) {
    return new ArrayNode(nil, nil, [value]);

  } else {
    var left    = node.left;
    var right   = node.right;
    var l_index = left.size;

    if (index < l_index) {
      var child = nth_insert(left, index, value);
      return balanced_node(node, child, right);

    } else {
      index -= l_index;

      var array = node.array;
      var len   = array.length;
      // TODO test this
      if (index <= len) {
        array = array_insert_at(array, index, value);

        // TODO this fails when array_limit is 1
        if (len === array_limit) {
          var pivot  = ceiling(array.length / 2);
          var aleft  = array.slice(0, pivot);
          var aright = array.slice(pivot);

          if (left.depth < right.depth) {
            return new ArrayNode(insert_max(left, new ArrayNode(nil, nil, aleft)), right, aright);
          } else {
            return new ArrayNode(left, insert_min(right, new ArrayNode(nil, nil, aright)), aleft);
          }

        } else {
          return new ArrayNode(left, right, array);
        }

      } else {
        var child = nth_insert(right, index - len, value);
        return balanced_node(node, left, child);
      }
    }
  }
}

function nth_modify(node, index, f) {
  var left    = node.left;
  var right   = node.right;
  var l_index = left.size;

  if (index < l_index) {
    var child = nth_modify(left, index, f);
    if (child === left) {
      return node;
    } else {
      return node.copy(child, right); // TODO test this
    }

  } else {
    index -= l_index;

    var array = node.array;
    var len   = array.length;
    // TODO test this
    if (index < len) {
      var new_array = array_modify_at(array, index, f);
      if (new_array === array) {
        return node;
      } else {
        return new ArrayNode(left, right, new_array);
      }

    } else {
      var child = nth_modify(right, index - len, f);
      if (child === right) {
        return node;
      } else {
        return node.copy(left, child); // TODO test this
      }
    }
  }
}

function nth_remove(node, index) {
  var left    = node.left;
  var right   = node.right;
  var l_index = left.size;

  if (index < l_index) {
    var child = nth_remove(left, index);
    return balanced_node(node, child, right);

  } else {
    index -= l_index;

    var array = node.array;
    var len   = array.length;
    // TODO test this
    if (index < len) {
      // TODO use `array.length === 1` so we can skip the call to `array_remove_at`
      array = array_remove_at(array, index);

      if (array.length === 0) {
        return concat(left, right);
      } else {
        return new ArrayNode(left, right, array);
      }

    } else {
      var child = nth_remove(right, index - len);
      return balanced_node(node, left, child);
    }
  }
}


function ImmutableList(root, tail, tail_size) {
  this.root = root;
  this.tail = tail;
  this.tail_size = tail_size;
  this.hash = null;
}

// TODO is this a good idea ?
ImmutableList.prototype = Object.create(null);

ImmutableList.prototype.forEach = function (f) {
  this.root.forEach(f);
  this.tail.forEachRev(f);
};

ImmutableList.prototype.toJS = function () {
  var a = [];

  this.forEach(function (x) {
    a.push(toJS(x));
  });

  return a;
};

ImmutableList.prototype.isEmpty = function () {
  return this.root === nil && this.tail === nil;
};

ImmutableList.prototype.size = function () {
  return this.root.size + this.tail_size;
};

ImmutableList.prototype.has = function (index) {
  var len = this.size();

  if (index < 0) {
    index += len;
  }

  return nth_has(index, len);
};

ImmutableList.prototype.get = function (index, def) {
  var len = this.size();

  if (index < 0) {
    index += len;
  }

  if (nth_has(index, len)) {
    var root = this.root;
    var size = root.size;
    if (index < size) {
      return nth_get(root, index);
    } else {
      return stack_nth(this.tail, this.tail_size, index - size);
    }

  } else if (arguments.length === 2) {
    return def;

  } else {
    throw new Error("Index " + index + " is not valid");
  }
};

ImmutableList.prototype.insert = function (value, index) {
  if (arguments.length === 1) {
    index = -1;
  }

  var len = this.size();

  if (index < 0) {
    index += (len + 1);
  }

  var root      = this.root;
  var tail      = this.tail;
  var tail_size = this.tail_size;
  if (index === len) {
    if (tail_size === array_limit) {
      var node = insert_max(root, new ArrayNode(nil, nil, stack_to_array(tail, tail_size)));
      return new ImmutableList(node, new Cons(value, nil), 1);

    } else {
      return new ImmutableList(root, new Cons(value, tail), tail_size + 1);
    }

  } else if (nth_has(index, len)) {
    var size = root.size;
    if (index < size) {
      return new ImmutableList(nth_insert(root, index, value), tail, tail_size);

    } else {
      var array = array_insert_at(stack_to_array(tail, tail_size), index - size, value);
      var node  = insert_max(root, new ArrayNode(nil, nil, array));
      return new ImmutableList(node, nil, 0);
    }

  } else {
    throw new Error("Index " + index + " is not valid");
  }
};

ImmutableList.prototype.remove = function (index) {
  if (arguments.length === 0) {
    index = -1;
  }

  var len = this.size();

  if (index < 0) {
    index += len;
  }

  var root      = this.root;
  var tail      = this.tail;
  var tail_size = this.tail_size;

  if (tail !== nil && index === len - 1) {
    return new ImmutableList(root, tail.cdr, tail_size - 1);

  } else if (nth_has(index, len)) {
    var size = root.size;
    if (index < size) {
      return new ImmutableList(nth_remove(root, index), tail, tail_size);

    } else {
      var array = array_remove_at(stack_to_array(tail, tail_size), index - size);
      var node  = insert_max(root, new ArrayNode(nil, nil, array));
      return new ImmutableList(node, nil, 0);
    }

  } else {
    throw new Error("Index " + index + " is not valid");
  }
};

ImmutableList.prototype.modify = function (index, f) {
  var len = this.size();

  if (index < 0) {
    index += len;
  }

  if (nth_has(index, len)) {
    var root = this.root;
    var tail = this.tail;
    var tail_size = this.tail_size;
    var size = root.size;

    if (tail !== nil && index === len - 1) {
      var value = f(tail.car);
      if (value === tail.car) {
        return this;
      } else {
        return new ImmutableList(root, new Cons(value, tail.cdr), tail_size);
      }

    } else if (index < size) {
      var node = nth_modify(root, index, f);
      if (node === root) {
        return this;
      } else {
        return new ImmutableList(node, tail, tail_size);
      }

    } else {
      var stack = stack_to_array(tail, tail_size);
      var array = array_modify_at(stack, index - size, f);
      if (array === stack) {
        return this;
      } else {
        var node = insert_max(root, new ArrayNode(nil, nil, array));
        return new ImmutableList(node, nil, 0);
      }
    }

  } else {
    throw new Error("Index " + index + " is not valid");
  }
};

ImmutableList.prototype.concat = function (right) {
  if (right instanceof ImmutableList) {
    var lroot = this.root;
    var ltail = this.tail;

    var rroot = right.root;
    var rtail = right.tail;

    if (rroot === nil && rtail === nil) {
      return this;

    } else if (lroot === nil && ltail === nil) {
      return right;

    } else {
      if (ltail !== nil) {
        lroot = insert_max(lroot, new ArrayNode(nil, nil, stack_to_array(ltail, this.tail_size)));
      }

      var node = concat(lroot, rroot);
      return new ImmutableList(node, rtail, right.tail_size);
    }

  } else {
    var self = this;

    right.forEach(function (x) {
      self = self.insert(x);
    });

    return self;
  }
};


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

      array.forEach(function (x) {
        o = o.insert(x);
      });

      return o;
    }
  } else {
    return new ImmutableList(nil, nil, 0);
  }
}


exports.List = List;
exports.isList = isList;
