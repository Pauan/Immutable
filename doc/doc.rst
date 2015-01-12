This documentation uses the following format::

  foo(x: Number, [y: Boolean]) -> String

* ``foo`` is the name of the function
* ``x`` is the name of the first argument
* ``Number`` is the expected type for ``x``
* ``y`` is the name of the second argument.
  The ``[...]`` means that it is *optional* and doesn't need to be provided.
* ``Boolean`` is the expected type for ``y``, if it is provided
* ``String`` is the return type for the function ``foo``

Table of Contents
=================

* Iteration

  `all <all_>`_
  `any <any_>`_
  each_

----

  .. _all:

  ::

    all(x: Iterable, fn: Function) -> Boolean

  Returns ``true`` if ``fn`` returns ``true`` for all
  of the values in ``x``.

  ----

  This function calls ``fn`` for each value in ``x``, and
  if ``fn`` returns ``false``, it will return ``false``.

  If ``fn`` never returns ``false``, then this function returns
  ``true``.

----

  .. _any:

  ::

    any(x: Iterable, fn: Function) -> Boolean

  Returns ``true`` if ``fn`` returns ``true`` for any
  of the values in ``x``

  ----

  This function calls ``fn`` for each value in ``x``, and
  if ``fn`` returns ``true``, it will return ``true``.

  If ``fn`` never returns ``true``, then this function returns
  ``false``.

----

  .. _each:

  ::

    each(x: Iterable, fn: Function) -> Void

  Calls ``fn`` for each value in ``x``.

  This is the same as a ``for..of`` loop in ECMAScript 6::

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

  .. _find:

  ::

    find(x: Iterable, fn: Function, [default: Any]) -> Any

  Applies ``fn`` to each value in ``x`` and returns
  the first value where ``fn`` returns ``true``.


  If ``fn`` never returns ``true``:

  * If ``default`` is provided, it is returned.
  * Otherwise it throws an error.

  ::

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
