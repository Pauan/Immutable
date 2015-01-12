.. role:: js(code)
   :language: javascript

This documentation uses the following format::

  foo(x: Array, [y: Boolean], [z: Number = 5]) -> String | Boolean

* ``foo`` is the name of the function.

  * ``x`` is the name of the first argument.

    * ``Array`` is the required type for ``x``.

  * ``y`` is the name of the second argument.

    * The ``[...]`` means that ``y`` is *optional* and doesn't need to be provided.

    * ``Boolean`` is the required type for ``y``, if it is provided.

  * ``z`` is the name of the third argument.

    * The ``[...]`` means that ``z`` is *optional* and doesn't need to be provided.

    * ``Number`` is the required type for ``z``, if it is provided.

    * The ``=`` means that if ``z`` is not provided, it will default to ``5``.

  * ``String | Boolean`` is the return type for the function ``foo``.

    * The ``|`` means that it will return either a ``String`` or a ``Boolean``.

Here are some examples of how you might call the function ``foo``:

.. code:: javascript

  foo([1]);
  foo([1], true);
  foo([1], true, 2);

The types are either JavaScript built-ins or are defined by this library.
However, there are some exceptions:

* ``Any`` can be any type.

* ``Integer`` is a JavaScript ``Number`` that is restricted to be an integer.

* ``Void`` is the JavaScript value :js:`undefined`.

Table of Contents
=================

* **Types**

  * Dict_
  * Iterable_
  * Iterator_
  * List_
  * Queue_
  * Record_
  * Ref_
  * Set_
  * SortedDict_
  * SortedSet_
  * Stack_
  * Tag_
  * Tuple_
  * UUIDTag_

* **Utilities**

  * deref_
  * equal_
  * fromJS_
  * fromJSON_
  * simpleSort_
  * toJS_
  * toJSON_

* **Iteration**

  * all_
  * any_
  * each_
  * find_
  * findIndex_
  * foldl_
  * foldr_
  * indexOf_
  * join_
  * keep_
  * map_
  * partition_
  * range_
  * reverse_
  * take_
  * toArray_
  * toIterator_
  * zip_

* **Predicates**

  * isDict_
  * isImmutable_
  * isIterable_
  * isList_
  * isQueue_
  * isRecord_
  * isRef_
  * isSet_
  * isSortedDict_
  * isSortedSet_
  * isStack_
  * isTag_
  * isUUIDTag_

----

.. _all:

* ::

    all(x: Iterable, fn: Function) -> Boolean

  Returns :js:`true` if ``fn`` returns :js:`true` for all
  of the values in ``x``.

  This function calls ``fn`` for each value in ``x``, and
  if ``fn`` returns :js:`false`, it will return :js:`false`.

  If ``fn`` never returns :js:`false`, then this function returns
  :js:`true`.

  Examples:

  .. code:: javascript

    // returns true
    all([1, 2, 3], function (x) {
      return x < 4;
    });

    // returns false
    all([1, 2, 3], function (x) {
      return x < 3;
    });

----

.. _any:

* ::

    any(x: Iterable, fn: Function) -> Boolean

  Returns ``true`` if ``fn`` returns ``true`` for any
  of the values in ``x``

  This function calls ``fn`` for each value in ``x``, and
  if ``fn`` returns ``true``, it will return ``true``.

  If ``fn`` never returns ``true``, then this function returns
  ``false``.

  Examples::

    // returns true
    any([1, 2, 3], function (x) {
      return x > 2;
    });

    // returns false
    any([1, 2, 3], function (x) {
      return x > 3;
    });

----

.. _each:

* ::

    each(x: Iterable, fn: Function) -> Void

  Calls ``fn`` for each value in ``x``.

  This is the same as a ``for..of`` loop in ECMAScript 6.

  Examples::

    // 1
    // 2
    // 3
    each([1, 2, 3], function (x) {
      console.log(x);
    });

    // 1
    // 2
    // 3
    each(Tuple([1, 2, 3]), function (x) {
      console.log(x);
    });

    // ["bar", 2]
    // ["foo", 1]
    each(Record({ foo: 1, bar: 2 }), function (x) {
      console.log(x);
    });

----

.. _equal:

* ::

    equal(x: Any, y: Any) -> Boolean

  Returns ``true`` if ``x`` and ``y`` are equal.

  * Simple things like numbers and strings are
    treated as equal if they have the same value::

      equal(1, 1); // true
      equal("foo", "foo"); // true

    This works correctly with ``NaN``. Also,
    ``0`` and ``-0`` are treated as equal::

      equal(NaN, NaN); // true
      equal(0, -0); // true

    This takes ``O(1)`` time.

  * Mutable objects (including Ref_) are treated
    as equal if they are exactly the same object::

      var obj = {};

      equal(obj, obj); // true

    This takes ``O(1)`` time.

  * Dict_ are treated as equal if they have
    the same keys/values::

      equal(Dict({ foo: 1 }),
            Dict({ foo: 1 })); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Set_ are treated as equal if they have
    the same values::

      equal(Set([1]),
            Set([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * List_ are treated as equal if they have
    the same values in the same order::

      equal(List([1]),
            List([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Tuple_ are treated as equal if they have
    the same values in the same order::

      equal(Tuple([1]),
            Tuple([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Queue_ are treated as equal if they have
    the same values in the same order::

      equal(Queue([1]),
            Queue([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Stack_ are treated as equal if they have
    the same values in the same order::

      equal(Stack([1]),
            Stack([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Record_ are treated as equal if they have
    the same keys/values::

      equal(Record({ foo: 1 }),
            Record({ foo: 1 })); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Tag_ are treated as equal if they are
    exactly the same tag::

      var tag = Tag();

      equal(tag, tag); // true

    This takes ``O(1)`` time.

  * UUIDTag_ are treated as equal if they have
    the same UUID::

      equal(UUIDTag("fce81b71-9793-4f8b-b090-810a5e82e9aa"),
            UUIDTag("fce81b71-9793-4f8b-b090-810a5e82e9aa")); // true

    This takes ``O(1)`` time.

  * SortedDict_ and SortedSet_ are the
    same as Dict_ and Set_ except that
    the sort order must also be the same.

----

.. _find:

* ::

    find(x: Iterable, fn: Function, [default: Any]) -> Any

  Applies ``fn`` to each value in ``x`` and returns
  the first value where ``fn`` returns ``true``.

  If ``fn`` never returns ``true``:

  * If ``default`` is provided, it is returned.
  * Otherwise it throws an error.

  Examples::

    // returns 2
    find([1, 2, 3], function (x) {
      return x === 2;
    });

    // throws an error
    find([1, 2, 3], function (x) {
      return x === 4;
    });

    // returns 50
    find([1, 2, 3], function (x) {
      return x === 4;
    }, 50);

----

.. _findIndex:

* ::

    findIndex(x: Iterable, fn: Function, [default: Any]) -> Integer | Any

  Applies ``fn`` to each value in ``x`` and returns
  the index that ``fn`` first returns ``true``.

  If ``fn`` never returns ``true``:

  * If ``default`` is provided, it is returned.
  * Otherwise it throws an error.

  Examples::

    // returns 1
    findIndex([1, 2, 3], function (x) {
      return x === 2;
    });

    // throws an error
    findIndex([1, 2, 3], function (x) {
      return x === 4;
    });

    // returns 50
    findIndex([1, 2, 3], function (x) {
      return x === 4;
    }, 50);

----

.. _foldl:

* ::

    foldl(x: Iterable, init: Any, fn: Function) -> Any

  For each value in ``x``, this function calls ``fn`` with two
  arguments: ``init`` and the value in ``x``. Whatever ``fn``
  returns becomes the new ``init``. When ``x`` is finished,
  this function returns ``init``.

  Examples::

    // returns 15
    foldl([1, 2, 3, 4, 5], 0, function (x, y) {
      return x + y;
    });

    // returns "(((((0 1) 2) 3) 4) 5)"
    foldl([1, 2, 3, 4, 5], 0, function (x, y) {
      return "(" + x + " " + y + ")";
    });

----

.. _foldr:

* ::

    foldr(x: Iterable, init: Any, fn: Function) -> Any

  For each value in ``x``, this function calls ``fn`` with two
  arguments: the value in ``x`` and ``init``. Whatever ``fn``
  returns becomes the new ``init``. When ``x`` is finished,
  this function returns ``init``.

  This function requires ``O(n)`` space, because it must
  reach the end of ``x`` before it can call ``fn``.

  Examples::

    // returns 15
    foldr([1, 2, 3, 4, 5], 0, function (x, y) {
      return x + y;
    });

    // returns "(1 (2 (3 (4 (5 0)))))"
    foldr([1, 2, 3, 4, 5], 0, function (x, y) {
      return "(" + x + " " + y + ")";
    });

----

.. _indexOf:

* ::

    indexOf(x: Iterable, value: Any, [default: Any]) -> Integer | Any

  Returns the first index within ``x`` where
  the value is equal_ to ``value``.

  If ``x`` does not contain ``value``:

  * If ``default`` is provided, it is returned.
  * Otherwise it throws an error.

  This function uses equal_ to determine whether
  the two values match or not. If you want to use a
  different function for equality, use findIndex_.

  Examples::

    // returns 1
    indexOf([1, 2, 3], 2);

    // throws an error
    indexOf([1, 2, 3], 4);

    // returns -1
    indexOf([1, 2, 3], 4, -1);

----

.. _join:

* ::

    join(x: Iterable, [separator: String = ""]) -> String

  Returns a string which contains all the
  values of ``x``, separated by ``separator``.

  This is the same as ``Array.prototype.join``, except
  it works on all Iterable_.

  Examples::

    // returns "123"
    join([1, 2, 3])

    // returns "1 2 3"
    join([1, 2, 3], " ")

    // returns "1 2 3"
    join(Tuple([1, 2, 3]), " ")

    // returns "1 2 3"
    join("123", " ")

----

.. _keep:

* ::

    keep(x: Iterable, fn: Function) -> Iterable

  Returns a new Iterable_ which contains all the
  values of ``x`` where ``fn`` returns ``true``.

  This function calls ``fn`` for each value in ``x``,
  and if ``fn`` returns ``true``, it keeps the value,
  otherwise it doesn't.

  This function returns an Iterable_, which is lazy:
  it only generates the values as needed. If you want
  an array, use toArray_.

  Examples::

    // returns [1, 2, 3, 0]
    keep([1, 2, 3, 4, 5, 0], function (x) {
      return x < 4;
    });

----

.. _map:

* ::

    map(x: Iterable, fn: Function) -> Iterable

  Returns a new Iterable_ which is the same as ``x``,
  but with ``fn`` applied to each value.

  This function calls ``fn`` for each value in ``x``, and
  whatever the function returns is used as the new value.

  This function returns an Iterable_, which is lazy:
  it only generates the values as needed. If you want
  an array, use toArray_.

  Examples::

    // returns [21, 22, 23]
    map([1, 2, 3], function (x) {
      return x + 20;
    });

----

.. _partition:

* ::

    partition(x: Iterable, fn: Function) -> Tuple

  Returns a Tuple_ with two Iterable_: the first
  contains the values of ``x`` for which ``fn`` returns
  ``true``, and the second contains the values of ``x`` for
  which ``fn`` returns ``false``.

  This function calls ``fn`` for each value in ``x``, and
  if the function returns ``true`` then the value will be
  in the first iterable, otherwise it will be in the second.

  This function returns a Tuple_ which contains Iterable_,
  which are lazy: they only generate the values as needed.
  If you want an array, use toArray_.

  Examples::

    var tuple = partition([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], function (x) {
      return x < 5;
    });

    // returns [1, 2, 3, 4, 0]
    tuple.get(0);

    // returns [5, 6, 7, 8, 9]
    tuple.get(1);

----

.. _range:

* ::

    range([start: Number = 0], [end: Number = Infinity], [step: Number = 1]) -> Iterable

  Returns an Iterable_ that contains numbers
  starting at ``start``, ending just before ``end``,
  and incremented by ``step``.

  This function returns an Iterable_, which is lazy:
  it only generates the values as needed. If you want
  an array, use toArray_.

  Without any arguments, this function generates an
  infinite sequence of integers starting at ``0``::

    // returns [0, 1, 2, 3, 4, 5...]
    range();

  With a single argument, you control where the sequence
  starts::

    // returns [5, 6, 7, 8, 9, 10...]
    range(5);

  With two arguments, you control where the sequence stops::

    // returns [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    range(0, 10);

  ``start`` is always included in the sequence, but ``end`` is
  never included in the sequence.

  With three arguments, you can change how much to increment
  each number::

    // returns [0, 2, 4, 6, 8]
    range(0, 10, 2);

  If ``start`` is greater than ``end``, it will count down rather
  than up::

    // returns [10, 8, 6, 4, 2]
    range(10, 0, 2);

  You can use a ``step`` of ``0`` to repeat ``start`` forever::

    // returns [0, 0, 0, 0, 0...]
    range(0, 10, 0);

  Although integers are most common, you can also use
  floating-point numbers for any of the three arguments::

    // returns [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]
    range(2.5, 6.2, 0.5);

  Negative numbers are allowed for ``start`` or ``end``::

    // returns [-10, -9, -8, -7, -6, -5, -4, -3]
    range(-10, -2);

    // returns [-5, -4, -3, -2, -1, 0, 1, 2]
    range(-5, 3);

  The only restriction is that ``step`` cannot be negative::

    // throws an error
    range(0, 10, -1);

----

.. _reverse:

* ::

    reverse(x: Iterable) -> Iterable

  Returns a new Iterable_ which contains all
  the values of ``x``, but in reversed order.

  This function is *not* lazy: it requires ``O(n)`` space,
  because it must reach the end of ``x`` before it can
  return anything.

  This function returns an Iterable_. If you want an
  array, use toArray_.

  Examples::

    // returns [3, 2, 1]
    reverse([1, 2, 3]);

----

.. _take:

* ::

    take(x: Iterable, count: Integer) -> Iterable

  Returns an Iterable_ that contains the first
  ``count`` number of values from ``x``.

  This function returns an Iterable_, which is lazy:
  it only generates the values as needed. If you want
  an array, use toArray_.

  This function is a simple way of dealing with
  infinite Iterable_::

    // returns [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    take(range(), 10);

  `count` must be an integer, and may not be negative::

    // throws an error
    take(range(), 0.5);

    // throws an error
    take(range(), -1);

----

.. _toArray:

* ::

    toArray(x: Iterable) -> Array

  Converts an Iterable_ to a JavaScript Array:

  * If ``x`` is already a JavaScript Array, it is returned as-is.

  * If ``x`` is an Iterable_, it is converted into a JavaScript Array
    and returned.

  This is useful because most iteration functions do not return
  arrays, they return Iterable_\ s.

----

.. _toIterator:

* ::

    toIterator(x: Iterable) -> Iterator

  Converts an Iterable_ into an Iterator_.

  This is useful if you want to create your own iterator
  functions.

  See also Iterable_ for creating Iterable_\ s.

----

.. _zip:

* ::

    zip(x: Iterable, [default: Any]) -> Iterable

  This function returns an Iterable_, which is lazy:
  it only generates the values as needed. If you want
  an array, use toArray_.

  ``x`` must be an Iterable_ which contains multiple
  Iterable_.

  This function returns an Iterable_ which contains
  multiple Tuple_ which contain alternating values
  from each Iterable_ in ``x``::

    // returns [[1, 4], [2, 5], [3, 6]]
    zip([[1, 2, 3], [4, 5, 6]]);

  You can think of it as being similar to a `real-world zipper <http://en.wikipedia.org/wiki/Zipper>`_.

  It stops when it reaches the end of the shortest iterable::

    // returns [[1, 4, 7]]
    zip([[1, 2, 3], [4, 5, 6], [7]]);

  If you provide a second argument, it will be used to fill
  in the missing spots::

    // returns [[1, 4, 7], [2, 5, 0], [3, 6, 0]]
    zip([[1, 2, 3], [4, 5, 6], [7]], 0);

  You can undo a zip by simply using zip_ a second time::

    // returns [[1, 4], [2, 5], [3, 6]]
    var x = zip([[1, 2, 3], [4, 5, 6]]);

    // returns [[1, 2, 3], [4, 5, 6]]
    zip(x);

  Using zip_, it's easy to collect all the keys/values
  of a Dict_ or Record_::

    var x = Record({
      foo: 1,
      bar: 2
    });

    // returns [["foo", "bar"], [1, 2]]
    zip(x);
