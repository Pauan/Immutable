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

  Returns :js:`true` if ``fn`` returns :js:`true` for any
  of the values in ``x``

  This function calls ``fn`` for each value in ``x``, and
  if ``fn`` returns :js:`true`, it will return :js:`true`.

  If ``fn`` never returns :js:`true`, then this function returns
  :js:`false`.

  Examples:

  .. code:: javascript

    // returns true
    any([1, 2, 3], function (x) {
      return x > 2;
    });

    // returns false
    any([1, 2, 3], function (x) {
      return x > 3;
    });

----

.. _deref:

* ::

    deref(x: Any) -> Any

  * If ``x`` is a Ref_, it will return the ref's current value.

  * Otherwise it returns ``x`` as-is.

  This is useful if you want to make sure you have a value, and
  you're not sure whether something is a Ref_ or not.

----

.. _each:

* ::

    each(x: Iterable, fn: Function) -> Void

  Calls ``fn`` for each value in ``x``.

  This is the same as a ``for..of`` loop in ECMAScript 6.

  Examples:

  .. code:: javascript

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

  Returns :js:`true` if ``x`` and ``y`` are equal.

  * Simple things like numbers and strings are
    treated as equal if they have the same value:

    .. code:: javascript

      equal(1, 1); // true
      equal("foo", "foo"); // true

    This works correctly with :js:`NaN`. Also,
    :js:`0` and :js:`-0` are treated as equal:

    .. code:: javascript

      equal(NaN, NaN); // true
      equal(0, -0); // true

    This takes ``O(1)`` time.

  * Mutable objects (including Ref_) are treated
    as equal if they are exactly the same object:

    .. code:: javascript

      var obj = {};

      equal(obj, obj); // true

    This takes ``O(1)`` time.

  * Dict_ are treated as equal if they have
    the same keys/values:

    .. code:: javascript

      equal(Dict({ foo: 1 }),
            Dict({ foo: 1 })); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Set_ are treated as equal if they have
    the same values:

    .. code:: javascript

      equal(Set([1]),
            Set([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * List_ are treated as equal if they have
    the same values in the same order:

    .. code:: javascript

      equal(List([1]),
            List([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Tuple_ are treated as equal if they have
    the same values in the same order:

    .. code:: javascript

      equal(Tuple([1]),
            Tuple([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Queue_ are treated as equal if they have
    the same values in the same order:

    .. code:: javascript

      equal(Queue([1]),
            Queue([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Stack_ are treated as equal if they have
    the same values in the same order:

    .. code:: javascript

      equal(Stack([1]),
            Stack([1])); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Record_ are treated as equal if they have
    the same keys/values:

    .. code:: javascript

      equal(Record({ foo: 1 }),
            Record({ foo: 1 })); // true

    This takes ``O(n)`` time, except the results
    are cached so that afterwards it takes ``O(1)``
    time.

  * Tag_ are treated as equal if they are
    exactly the same tag:

    .. code:: javascript

      var tag = Tag();

      equal(tag, tag); // true

    This takes ``O(1)`` time.

  * UUIDTag_ are treated as equal if they have
    the same UUID:

    .. code:: javascript

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
  the first value where ``fn`` returns :js:`true`.

  If ``fn`` never returns :js:`true`:

  * If ``default`` is provided, it is returned.
  * Otherwise it throws an error.

  Examples:

  .. code:: javascript

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
  the index that ``fn`` first returns :js:`true`.

  If ``fn`` never returns :js:`true`:

  * If ``default`` is provided, it is returned.
  * Otherwise it throws an error.

  Examples:

  .. code:: javascript

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

  Examples:

  .. code:: javascript

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

  Examples:

  .. code:: javascript

    // returns 15
    foldr([1, 2, 3, 4, 5], 0, function (x, y) {
      return x + y;
    });

    // returns "(1 (2 (3 (4 (5 0)))))"
    foldr([1, 2, 3, 4, 5], 0, function (x, y) {
      return "(" + x + " " + y + ")";
    });

----

.. _fromJS:

* ::

    fromJS(x: Any) -> Any

  Converts a JavaScript object into its immutable equivalent.

  This function has the following behavior:

  * JavaScript object literals are deeply converted
    into a Dict_, with fromJS_ called on all
    the keys/values.

    This conversion takes ``O(n)`` time.

  * JavaScript arrays are deeply converted into a
    List_, with fromJS_ called on all the
    values.

    This conversion takes ``O(n)`` time.

  * Everything else is returned as-is.

  This is useful if you like using Dict_ or List_,
  but you want to use a library that gives you ordinary
  JavaScript objects/arrays.

  If you want to losslessly store an immutable object on
  disk, or send it over the network, you can use toJSON_
  and fromJSON_ instead.

----

.. _fromJSON:

* ::

    fromJSON(x: Any) -> Any

  Converts specially marked JSON to a Dict_,
  Set_, List_, Queue_, Stack_, Tuple_,
  or _Record.

  This function has the following behavior:

  * JavaScript object literals are deeply copied, with
    fromJSON_ called on all the keys/values.

    This copying takes ``O(n)`` time.

  * JavaScript arrays are deeply copied, with fromJSON_
    called on all the values.

    This copying takes ``O(n)`` time.

  * :js:`null`, booleans, strings, and UUIDTag_ are
    returned as-is.

  * Numbers are returned as-is, except :js:`NaN`,
    :js:`Infinity`, and :js:`-Infinity` throw an error.

  * Specially marked JSON objects are converted into a
    Dict_, Set_, List_, Queue_, Stack_, Tuple_, or
    Record_, with fromJSON_ called on all the
    keys/values.

    This conversion takes ``O(n)`` time.

  * Everything else throws an error.

  You *cannot* use Tag_ with fromJSON_, but you
  *can* use UUIDTag_.

  This function is useful because it's *lossless*: if you
  use toJSON_ followed by fromJSON_, the two objects
  will be equal_:

  .. code:: javascript

    var x = Record({ foo: 1 });

    // true
    equal(x, fromJSON(toJSON(x)));

  This makes it possible to store immutable objects on disk,
  or send them over the network with JSON, reconstructing
  them on the other side.

  If you just want to use a library that expects normal
  JavaScript objects, use toJS_ and fromJS_ instead.

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

  Examples:

  .. code:: javascript

    // returns 1
    indexOf([1, 2, 3], 2);

    // throws an error
    indexOf([1, 2, 3], 4);

    // returns -1
    indexOf([1, 2, 3], 4, -1);

----

.. _isDict:

* ::

    isDict(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Dict_ or SortedDict_.

----

.. _isImmutable:

* ::

    isImmutable(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a string, number, boolean,
  :js:`null`, :js:`undefined`, symbol, frozen object, Dict_,
  List_, Queue_, Record_, Set_, Stack_, Tuple_, or Tag_.

  Returns :js:`false` for everything else.

----

.. _isIterable:

* ::

    isIterable(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is Iterable_.

----

.. _isList:

* ::

    isList(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a List_.

----

.. _isQueue:

* ::

    isQueue(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Queue_.

----

.. _isRecord:

* ::

    isRecord(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Record_.

----

.. _isRef:

* ::

    isRef(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Ref_.

----

.. _isSet:

* ::

    isSet(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Set_ or SortedSet_.

----

.. _isSortedDict:

* ::

    isSortedDict(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a SortedDict_.

----

.. _isSortedSet:

* ::

    isSortedSet(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a SortedSet_.

----

.. _isStack:

* ::

    isStack(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Stack_.

----

.. _isTag:

* ::

    isTag(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Tag_ or UUIDTag_.

----

.. _isUUIDTag:

* ::

    isUUIDTag(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a UUIDTag_.

----

.. _join:

* ::

    join(x: Iterable, [separator: String = ""]) -> String

  Returns a string which contains all the
  values of ``x``, separated by ``separator``.

  This is the same as :js:`Array.prototype.join`, except
  it works on all Iterable_.

  Examples:

  .. code:: javascript

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
  values of ``x`` where ``fn`` returns :js:`true`.

  This function calls ``fn`` for each value in ``x``,
  and if ``fn`` returns :js:`true`, it keeps the value,
  otherwise it doesn't.

  This function returns an Iterable_, which is lazy:
  it only generates the values as needed. If you want
  an array, use toArray_.

  Examples:

  .. code:: javascript

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

  Examples:

  .. code:: javascript

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
  :js:`true`, and the second contains the values of ``x`` for
  which ``fn`` returns :js:`false`.

  This function calls ``fn`` for each value in ``x``, and
  if the function returns :js:`true` then the value will be
  in the first iterable, otherwise it will be in the second.

  This function returns a Tuple_ which contains Iterable_,
  which are lazy: they only generate the values as needed.
  If you want an array, use toArray_.

  Examples:

  .. code:: javascript

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
  infinite sequence of integers starting at :js:`0`:

  .. code:: javascript

    // returns [0, 1, 2, 3, 4, 5...]
    range();

  With a single argument, you control where the sequence
  starts:

  .. code:: javascript

    // returns [5, 6, 7, 8, 9, 10...]
    range(5);

  With two arguments, you control where the sequence stops:

  .. code:: javascript

    // returns [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    range(0, 10);

  ``start`` is always included in the sequence, but ``end`` is
  never included in the sequence.

  With three arguments, you can change how much to increment
  each number:

  .. code:: javascript

    // returns [0, 2, 4, 6, 8]
    range(0, 10, 2);

  If ``start`` is greater than ``end``, it will count down rather
  than up:

  .. code:: javascript

    // returns [10, 8, 6, 4, 2]
    range(10, 0, 2);

  You can use a ``step`` of :js:`0` to repeat ``start`` forever:

  .. code:: javascript

    // returns [0, 0, 0, 0, 0...]
    range(0, 10, 0);

  Although integers are most common, you can also use
  floating-point numbers for any of the three arguments:

  .. code:: javascript

    // returns [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]
    range(2.5, 6.2, 0.5);

  Negative numbers are allowed for ``start`` or ``end``:

  .. code:: javascript

    // returns [-10, -9, -8, -7, -6, -5, -4, -3]
    range(-10, -2);

    // returns [-5, -4, -3, -2, -1, 0, 1, 2]
    range(-5, 3);

  The only restriction is that ``step`` cannot be negative:

  .. code:: javascript

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

  Examples:

  .. code:: javascript

    // returns [3, 2, 1]
    reverse([1, 2, 3]);

----

.. _simpleSort:

* ::

    simpleSort(x: Any, y: Any) -> Integer

  This function can be used with SortedDict_ and SortedSet_.

  * If ``x`` is lower than ``y``, it returns :js:`-1`.
  * If ``x`` is equal to ``y``, it returns :js:`0`.
  * If ``x`` is greater than ``y``, it returns :js:`1`.

  This function only works on simple types (numbers, strings, and booleans).

  In addition, it requires all the values to be the same type.
  Mixing two or more types together will not work correctly.

  *e.g.* You shouldn't use this function if you want to use both
  numbers and strings as keys in the same Dict_/Set_.

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
  infinite Iterable_:

  .. code:: javascript

    // returns [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    take(range(), 10);

  ``count`` must be an integer, and may not be negative:

  .. code:: javascript

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

  This is useful because most iteration functions return
  Iterable_\ s, not arrays.

  Examples:

  .. code:: javascript

    // returns [0, 1, 2, 3, 4]
    toArray(range(0, 5));

----

.. _toIterator:

* ::

    toIterator(x: Iterable) -> Iterator

  Converts an Iterable_ into an Iterator_.

  This is useful if you want to create your own iterator
  functions.

  See also Iterable_ for creating Iterable_\ s.

----

.. _toJS:

* ::

    toJS(x: Any) -> Any

  Converts a Dict_, Set_, List_, Queue_, Stack_, Tuple_, or
  Record_ to its JavaScript equivalent.

  This function has the following behavior:

  * JavaScript object literals are deeply copied, with
    toJS_ called on all the keys/values.

    This copying takes ``O(n)`` time.

  * JavaScript arrays are deeply copied, with toJS_
    called on all the values.

    This copying takes ``O(n)`` time.

  * Dict_ and Record_ are converted into a JavaScript
    object, with toJS_ called on all the keys/values.
    The keys must be strings or Tag_.

    This conversion takes ``O(n)`` time.

  * Set_, List_, Queue_, Stack_, and Tuple_ are
    converted into a JavaScript array, with toJS_
    called on all the values.

    This conversion takes ``O(n)`` time.

  * Everything else is returned as-is.

  This is useful if you like using Dict_, Set_, List_,
  Queue_, Stack_, Tuple_, or Record_ but you want to
  use a library that requires ordinary JavaScript
  objects/arrays.

  If you want to losslessly store an immutable object on
  disk, or send it over the network, you can use toJSON_
  and fromJSON_ instead.

----

.. _toJSON:

* ::

    toJSON(x: Any) -> Any

  Converts a Dict_, Set_, List_, Queue_, Stack_, Tuple_,
  or Record_ to JSON.

  This function has the following behavior:

  * JavaScript object literals are deeply copied, with
    toJSON_ called on all the keys/values.

    This copying takes ``O(n)`` time.

  * JavaScript arrays are deeply copied, with toJSON_
    called on all the values.

    This copying takes ``O(n)`` time.

  * If an object has a :js:`toJSON` method, it will be called,
    with toJSON_ called on whatever it returns.

  * :js:`null`, booleans, strings, and UUIDTag_ are returned
    as-is.

  * Numbers are returned as-is, except :js:`NaN`,
    :js:`Infinity`, and :js:`-Infinity` throw an error.

  * Dict_, Set_, List_, Queue_, Stack_, Tuple_, and
    Record_ are converted into specially marked JSON
    objects, with toJSON_ called on all the keys/values.

    This conversion takes ``O(n)`` time.

  * Everything else throws an error.

  You *cannot* use Tag_ with toJSON_, but you *can* use
  UUIDTag_.

  This function is useful because it's *lossless*: if you
  use toJSON_ followed by fromJSON_, the two objects
  will be equal_:

  .. code:: javascript

      var x = Record({ foo: 1 });

      // true
      equal(x, fromJSON(toJSON(x)));

  This makes it possible to store immutable objects on disk,
  or send them over the network with JSON, reconstructing
  them on the other side.

  If you just want to use a library that expects normal
  JavaScript objects, use toJS_ and fromJS_ instead.

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
  from each Iterable_ in ``x``:

  .. code:: javascript

    // returns [[1, 4], [2, 5], [3, 6]]
    zip([[1, 2, 3], [4, 5, 6]]);

  You can think of it as being similar to a `real-world zipper <http://en.wikipedia.org/wiki/Zipper>`_.

  It stops when it reaches the end of the smallest iterable:

  .. code:: javascript

    // returns [[1, 4, 7]]
    zip([[1, 2, 3], [4, 5, 6], [7]]);

  But if you provide a second argument, it will be used to fill
  in the missing spots:

  .. code:: javascript

    // returns [[1, 4, 7], [2, 5, 0], [3, 6, 0]]
    zip([[1, 2, 3], [4, 5, 6], [7]], 0);

  You can undo a zip by simply using zip_ a second time:

  .. code:: javascript

    // returns [[1, 4], [2, 5], [3, 6]]
    var x = zip([[1, 2, 3], [4, 5, 6]]);

    // returns [[1, 2, 3], [4, 5, 6]]
    zip(x);

  Using zip_, it's easy to collect all the keys/values
  of a Dict_ or Record_:

  .. code:: javascript

    var x = Record({
      foo: 1,
      bar: 2
    });

    // returns [["bar", "foo"], [2, 1]]
    zip(x);
