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

    * The ``|`` means that it could return either a ``String`` or a ``Boolean``.

Here are some examples of how you might call the function ``foo``::

  foo([1]);
  foo([1], true);
  foo([1], true, 2);

The types are straight-forward, and are either JavaScript built-ins or
are defined by this library. However, there are some exceptions:

* ``Any`` can be any type.

* ``Integer`` is a JavaScript ``Number`` that is restricted to be an integer.

* ``Void`` is the JavaScript value ``undefined``.

Table of Contents
=================

* **Utilities**

  * equal_

* **Iteration**

  * all_
  * any_
  * each_
  * find_
  * findIndex_
  * foldl_
  * foldr_
  * indexOf_

----

.. _all:

* ::

    all(x: Iterable, fn: Function) -> Boolean

  Returns ``true`` if ``fn`` returns ``true`` for all
  of the values in ``x``.

  This function calls ``fn`` for each value in ``x``, and
  if ``fn`` returns ``false``, it will return ``false``.

  If ``fn`` never returns ``false``, then this function returns
  ``true``.

  Examples::

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
    the same UUID:

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
