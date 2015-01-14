.. role:: js(code)
   :language: javascript

This documentation uses the following format for functions::

  foo(x: Array | Object, [y: String], [z: Number = 5]) -> String | Boolean

* ``foo`` is the name of the function.

  * ``x`` is the name of the first argument.

    * ``Array | Object`` is the required type for ``x``.

      * The ``|`` means that ``x`` must be either an ``Array`` or an ``Object``.

  * ``y`` is the name of the second argument.

    * The ``[...]`` means that ``y`` is *optional* and doesn't need to be provided.

    * ``String`` is the required type for ``y``, if it is provided.

  * ``z`` is the name of the third argument.

    * The ``[...]`` means that ``z`` is *optional* and doesn't need to be provided.

    * ``Number`` is the required type for ``z``, if it is provided.

    * The ``=`` means that if ``z`` is not provided, it will default to ``5``.

  * ``String | Boolean`` is the return type for the function ``foo``.

    * The ``|`` means that ``foo`` will return either a ``String`` or a ``Boolean``.

Here are some examples of how you might call the function ``foo``:

.. code:: javascript

  foo([1]);
  foo([1], "qux");
  foo([1], "qux", 2);

  foo({ bar: 1 });
  foo({ bar: 1 }, "qux");
  foo({ bar: 1 }, "qux", 2);

In addition, this is the format used for methods::

  Foo bar(x: Number) -> Foo

Here are some examples of how you might call the ``bar`` method:

.. code:: javascript

  var foo = Foo();

  foo.bar(5);

The types are either JavaScript built-ins or are defined by this library.
However, there are some exceptions:

* ``Any`` can be any type.

* ``Integer`` is a JavaScript ``Number`` that is restricted to be an integer.

* ``Void`` is the JavaScript value :js:`undefined`. It is used to mean
  the lack of a meaningful value.

Table of Contents
=================

* **Types**

  * Dict_

    * `Dict get`_
    * `Dict has`_
    * `Dict isEmpty`_
    * `Dict merge`_
    * `Dict modify`_
    * `Dict remove`_
    * `Dict removeAll`_
    * `Dict set`_

  * Iterable_
  * Iterator_

  * List_

    * `List concat`_
    * `List get`_
    * `List has`_
    * `List insert`_
    * `List isEmpty`_
    * `List modify`_
    * `List push`_
    * `List remove`_
    * `List removeAll`_
    * `List set`_
    * `List size`_
    * `List slice`_

  * Queue_

    * `Queue concat`_
    * `Queue isEmpty`_
    * `Queue peek`_
    * `Queue pop`_
    * `Queue push`_
    * `Queue removeAll`_
    * `Queue size`_

  * Record_

    * `Record get`_
    * `Record modify`_
    * `Record set`_
    * `Record update`_

  * Ref_

    * `Ref get`_
    * `Ref modify`_
    * `Ref set`_

  * Set_

    * `Set add`_
    * `Set disjoint`_
    * `Set has`_
    * `Set intersect`_
    * `Set isEmpty`_
    * `Set remove`_
    * `Set removeAll`_
    * `Set subtract`_
    * `Set union`_

  * SortedDict_
  * SortedSet_

  * Stack_

    * `Stack concat`_
    * `Stack isEmpty`_
    * `Stack peek`_
    * `Stack pop`_
    * `Stack push`_
    * `Stack removeAll`_
    * `Stack size`_

  * Tag_

  * Tuple_

    * `Tuple get`_
    * `Tuple modify`_
    * `Tuple set`_
    * `Tuple size`_

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

  * This function calls ``fn`` for each value in ``x``, and
    if ``fn`` returns :js:`false`, it will return :js:`false`.

  * If ``fn`` never returns :js:`false`, then this function returns
    :js:`true`.

  This function runs in ``O(n)`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns true
    all([10, 20, 30], function (x) {
      return x < 40;
    });

    // Returns false
    all([10, 20, 30], function (x) {
      return x < 30;
    });

----

.. _any:

* ::

    any(x: Iterable, fn: Function) -> Boolean

  Returns :js:`true` if ``fn`` returns :js:`true` for any
  of the values in ``x``.

  * This function calls ``fn`` for each value in ``x``, and
    if ``fn`` returns :js:`true`, it will return :js:`true`.

  * If ``fn`` never returns :js:`true`, then this function returns
    :js:`false`.

  This function runs in ``O(n)`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns true
    any([10, 20, 30], function (x) {
      return x > 20;
    });

    // Returns false
    any([10, 20, 30], function (x) {
      return x > 30;
    });

----

.. _deref:

* ::

    deref(x: Any) -> Any

  * If ``x`` is a Ref_, it returns the Ref_'s current value.

  * If ``x`` is not a Ref_, it returns ``x`` as-is.

  This is useful if you're not sure whether something is a Ref_
  or not, but you want a value.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns 5
    deref(Ref(5));

    // Returns 5
    deref(5);

----

.. _Dict:

* ::

    Dict([x: Object | Iterable]) -> Dict

  A Dict_ is an immutable unordered dictionary mapping keys
  to values.

  You should **not** rely upon the order of the keys in
  a Dict_. If you need a specific key order, use a
  SortedDict_ instead.

  * If ``x`` is an Iterable_, the values must be arrays / Tuple_\ s
    of :js:`[key, value]`, which will be added to the Dict_.

  * If ``x`` is a JavaScript object literal like :js:`{ foo: 1 }`,
    then the keys / values will be added to the Dict_.

  This takes ``O(n * log2(n))`` time, unless ``x`` is already
  a Dict_, in which case it takes ``O(1)`` time.

  Mutable objects can be used as keys, and they are treated as
  equal_ only if they are exactly the same object:

  .. code:: javascript

    var obj1 = { foo: 1 };
    var obj2 = { foo: 1 };

    var dict = Dict().set(obj1, "bar")
                     .set(obj2, "qux");

    // Returns "bar"
    dict.get(obj1);

    // Returns "qux"
    dict.get(obj2);

  You can also use immutable objects (like Dict_, Set_, List_,
  etc.) as keys, and they are treated as equal_ if their
  keys / values are equal_:

  .. code:: javascript

    var obj1 = Dict({ foo: 1 });
    var obj2 = Dict({ foo: 1 });

    var dict = Dict().set(obj1, "bar")
                     .set(obj2, "qux");

    // Returns "qux"
    dict.get(obj1);

    // Returns "qux"
    dict.get(obj2);

  Because :js:`obj1` and :js:`obj2` have the same keys / values,
  they are equal_.

  Examples:

  .. code:: javascript

    // Returns { "foo": 1, "bar": 2 }
    Dict({ "foo": 1, "bar": 2 });

    // Returns { "foo": 1, "bar": 2 }
    Dict([["foo", 1], ["bar", 2]]);

----

.. _Dict get:

* ::

    Dict get(key: Any, [default: Any]) -> Any

  * If ``key`` is in the Dict_, the value for ``key`` is returned.

  * If ``key`` is not in the Dict_:

    * If ``default`` is provided, it is returned.
    * If ``default`` is not provided, an error is thrown.

  This function runs in ``O(log2(n))`` worst-case time.

  Examples:

  .. code:: javascript

    // Throws an error
    Dict().get("foo");

    // Returns 5
    Dict().get("foo", 5);

    // Returns 10
    Dict({ "foo": 10 }).get("foo");

----

.. _Dict has:

* ::

    Dict has(key: Any) -> Boolean

  Returns :js:`true` if ``key`` is in the Dict_.

  This function runs in ``O(log2(n))`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns false
    Dict().has("foo");

    // Returns true
    Dict({ "foo": 1 }).has("foo");

----

.. _Dict isEmpty:

* ::

    Dict isEmpty() -> Boolean

  Returns :js:`true` if the Dict_ has no keys / values in it.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns true
    Dict().isEmpty();

    // Returns false
    Dict({ "foo": 1 }).isEmpty();

----

.. _Dict merge:

* ::

    Dict merge(x: Object | Iterable) -> Dict

  Returns a new Dict_ with all the keys / values of ``x`` added
  to this Dict_.

  This does not mutate the Dict_, it returns a new Dict_.

  ``x`` must be either a JavaScript object literal, or an
  Iterable_ where each value is an array / Tuple_ of
  :js:`[key, value]`.

  * If a ``key`` from ``x`` is not in this Dict_, it is added.

  * If a ``key`` from ``x`` is already in this Dict_, it is overwritten.

  This function runs in ``O(log2(n) * m)`` worst-case time.

  You can use this to merge two Dict_:

  .. code:: javascript

    var foo = Dict({
      "foo": 1
    });

    var bar = Dict({
      "bar": 2
    });

    // Returns { "foo": 1, "bar": 2 }
    foo.merge(bar);

  You can also use this to merge with a JavaScript object literal:

  .. code:: javascript

    var foo = Dict({
      "foo": 1
    });

    // Returns { "foo": 1, "bar": 2 }
    foo.merge({
      "bar": 2
    });

----

.. _Dict modify:

* ::

    Dict modify(key: Any, fn: Function) -> Dict

  Returns a new Dict_ with ``key`` modified by ``fn``.

  This does not mutate the Dict_, it returns a new Dict_.

  * If ``key`` is not in the Dict_, it will throw an error.

  This function calls ``fn`` with the value for ``key``, and
  whatever ``fn`` returns will be used as the new value for
  ``key``.

  This function runs in ``O(log2(n))`` worst-case time.

  Examples:

  .. code:: javascript

    var dict = Dict({
      "foo": 1,
      "bar": 2
    });

    function add10(x) {
      return x + 10;
    }

    // Returns { "foo": 11, "bar": 2 }
    dict.modify("foo", add10);

    // Returns { "foo": 1, "bar": 12 }
    dict.modify("bar", add10);

    // Throws an error
    dict.modify("qux", add10);

----

.. _Dict remove:

* ::

    Dict remove(key: Any) -> Dict

  Returns a new Dict_ with ``key`` removed.

  This does not mutate the Dict_, it returns a new Dict_.

  * If ``key`` is not in the Dict_, this function does nothing.

  This function runs in ``O(log2(n))`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns {}
    Dict({ "foo": 1 }).remove("foo");

    // Returns { "foo": 1 }
    Dict({ "foo": 1 }).remove("bar");

----

.. _Dict removeAll:

* ::

    Dict removeAll() -> Dict

  Returns a new Dict_ with no keys / values.

  This does not mutate the Dict_, it returns a new Dict_.

  This function runs in ``O(1)`` time.

  This function is useful because it preserves the
  sort of a SortedDict_:

  .. code:: javascript

    var x = SortedDict(...);

    // No keys / values, but has the same sort as `x`
    x.removeAll();

----

.. _Dict set:

* ::

    Dict set(key: Any, value: Any) -> Dict

  Returns a new Dict_ with ``key`` set to ``value``.

  This does not mutate the Dict_, it returns a new Dict_.

  * If ``key`` is in the Dict_, it is overwritten.
  * If ``key`` is not in the Dict_, it is created.

  This function runs in ``O(log2(n))`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns { "foo": 5 }
    Dict().set("foo", 5);

    // Returns { "foo": 5, "bar": 10, "qux": 15 }
    Dict().set("foo", 5)
          .set("bar", 10)
          .set("qux", 15);

    // Returns { "foo": 10 }
    Dict({ "foo": 5 }).set("foo", 10);

----

.. _each:

* ::

    each(x: Iterable, fn: Function) -> Void

  Calls ``fn`` for each value in ``x``.

  This is the same as a ``for..of`` loop in ECMAScript 6.

  This function runs in ``O(n)`` time.

  Examples:

  .. code:: javascript

    // Logs 10
    // Logs 20
    // Logs 30
    each([10, 20, 30], function (x) {
      console.log(x);
    });

    // Logs 10
    // Logs 20
    // Logs 30
    each(Tuple([10, 20, 30]), function (x) {
      console.log(x);
    });

    // Logs ["bar", 2]
    // Logs ["foo", 1]
    each(Record({ "foo": 1, "bar": 2 }), function (x) {
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

  * Dict_ and Record_ are treated as equal if they
    have the same keys / values:

    .. code:: javascript

      equal(Dict({ "foo": 1 }),
            Dict({ "foo": 1 })); // true

      equal(Record({ "foo": 1 }),
            Record({ "foo": 1 })); // true

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

  * List_, Tuple_, Queue_, and Stack_ are treated as
    equal if they have the same values in the same
    order:

    .. code:: javascript

      equal(List([1]),
            List([1])); // true

      equal(Tuple([1]),
            Tuple([1])); // true

      equal(Queue([1]),
            Queue([1])); // true

      equal(Stack([1]),
            Stack([1])); // true

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

  * If ``fn`` never returns :js:`true`:

    * If ``default`` is provided, it is returned.
    * If ``default`` is not provided, it throws an error.

  This function runs in ``O(n)`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns 20
    find([10, 20, 30], function (x) {
      return x === 20;
    });

    // Throws an error
    find([10, 20, 30], function (x) {
      return x === 40;
    });

    // Returns -1
    find([10, 20, 30], function (x) {
      return x === 40;
    }, -1);

----

.. _findIndex:

* ::

    findIndex(x: Iterable, fn: Function, [default: Any]) -> Integer | Any

  Applies ``fn`` to each value in ``x`` and returns
  the index that ``fn`` first returns :js:`true`.

  * If ``fn`` never returns :js:`true`:

    * If ``default`` is provided, it is returned.
    * If ``default`` is not provided, it throws an error.

  This function runs in ``O(n)`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns 1
    findIndex([10, 20, 30], function (x) {
      return x === 20;
    });

    // Throws an error
    findIndex([10, 20, 30], function (x) {
      return x === 40;
    });

    // Returns -1
    findIndex([10, 20, 30], function (x) {
      return x === 40;
    }, -1);

----

.. _foldl:

* ::

    foldl(x: Iterable, init: Any, fn: Function) -> Any

  For each value in ``x``, this function calls ``fn`` with two
  arguments: ``init`` and the value in ``x``. Whatever ``fn``
  returns becomes the new ``init``. When ``x`` is finished,
  this function returns ``init``.

  This function runs in ``O(n)`` time.

  Examples:

  .. code:: javascript

    // Returns 15
    // Equivalent to (((((0 + 1) + 2) + 3) + 4) + 5)
    foldl([1, 2, 3, 4, 5], 0, function (x, y) {
      return x + y;
    });

----

.. _foldr:

* ::

    foldr(x: Iterable, init: Any, fn: Function) -> Any

  For each value in ``x``, this function calls ``fn`` with two
  arguments: the value in ``x`` and ``init``. Whatever ``fn``
  returns becomes the new ``init``. When ``x`` is finished,
  this function returns ``init``.

  This function requires ``O(n)`` space because it must
  reach the end of ``x`` before it can call ``fn``.

  That means it has to iterate over ``x`` twice. This
  is inefficient, so unless you *really* need to use
  foldr_, you should use foldl_ instead.

  This function runs in ``O(2 * n)`` time.

  Examples:

  .. code:: javascript

    // Returns 15
    // Equivalent to (1 + (2 + (3 + (4 + (5 + 0)))))
    foldr([1, 2, 3, 4, 5], 0, function (x, y) {
      return x + y;
    });

----

.. _fromJS:

* ::

    fromJS(x: Any) -> Any

  Converts a JavaScript object into its immutable equivalent.

  This function has the following behavior:

  * JavaScript object literals are deeply converted
    into a Dict_, with fromJS_ called on all
    the keys / values.

    This conversion takes ``O(n)`` time.

  * JavaScript arrays are deeply converted into a
    List_, with fromJS_ called on all the
    values.

    This conversion takes ``O(n)`` time.

  * Everything else is returned as-is.

  This is useful if you like using Dict_ or List_,
  but you want to use a library that gives you ordinary
  JavaScript objects / arrays.

  If you want to losslessly store an immutable object on
  disk, or send it over the network, you can use toJSON_
  and fromJSON_ instead.

----

.. _fromJSON:

* ::

    fromJSON(x: Any) -> Any

  Converts specially marked JSON to a Dict_,
  List_, Queue_, Record_, Set_, Stack_, or
  Tuple_.

  This function has the following behavior:

  * JavaScript object literals are deeply copied, with
    fromJSON_ called on all the keys / values.

    This copying takes ``O(n)`` time.

  * JavaScript arrays are deeply copied, with fromJSON_
    called on all the values.

    This copying takes ``O(n)`` time.

  * :js:`null`, booleans, strings, and UUIDTag_ are
    returned as-is.

  * Numbers are returned as-is, except :js:`NaN`,
    :js:`Infinity`, and :js:`-Infinity` throw an error.

  * Specially marked JSON objects are converted into a
    Dict_, List_, Queue_, Record_, Set_, Stack_, or
    Tuple_, with fromJSON_ called on all the
    keys / values.

    This conversion takes ``O(n)`` time.

  * Everything else throws an error.

  You *cannot* use Tag_ with fromJSON_, but you
  *can* use UUIDTag_.

  This function is useful because it's *lossless*: if you
  use toJSON_ followed by fromJSON_, the two objects
  will be equal_:

  .. code:: javascript

    var x = Record({ "foo": 1 });

    // Returns true
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

  * If ``x`` does not contain ``value``:

    * If ``default`` is provided, it is returned.
    * If ``default`` is not provided, an error is thrown.

  This function uses equal_ to determine whether
  the two values match or not. If you want to use a
  different function for equality, use findIndex_.

  This function runs in ``O(n)`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns 1
    indexOf([10, 20, 30], 20);

    // Throws an error
    indexOf([10, 20, 30], 40);

    // Returns -1
    indexOf([10, 20, 30], 40, -1);

----

.. _isDict:

* ::

    isDict(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Dict_ or SortedDict_.

  This function runs in ``O(1)`` time.

----

.. _isImmutable:

* ::

    isImmutable(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a string, number, boolean,
  :js:`null`, :js:`undefined`, symbol, frozen object, Dict_,
  List_, Queue_, Record_, Set_, Stack_, Tuple_, or Tag_.

  Returns :js:`false` for everything else.

  This function runs in ``O(1)`` time.

----

.. _isIterable:

* ::

    isIterable(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is Iterable_.

  This function runs in ``O(1)`` time.

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

  This function runs in ``O(1)`` time.

----

.. _isRecord:

* ::

    isRecord(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Record_.

  This function runs in ``O(1)`` time.

----

.. _isRef:

* ::

    isRef(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Ref_.

  This function runs in ``O(1)`` time.

----

.. _isSet:

* ::

    isSet(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Set_ or SortedSet_.

  This function runs in ``O(1)`` time.

----

.. _isSortedDict:

* ::

    isSortedDict(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a SortedDict_.

  This function runs in ``O(1)`` time.

----

.. _isSortedSet:

* ::

    isSortedSet(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a SortedSet_.

  This function runs in ``O(1)`` time.

----

.. _isStack:

* ::

    isStack(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Stack_.

  This function runs in ``O(1)`` time.

----

.. _isTag:

* ::

    isTag(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a Tag_ or UUIDTag_.

  This function runs in ``O(1)`` time.

----

.. _isUUIDTag:

* ::

    isUUIDTag(x: Any) -> Boolean

  Returns :js:`true` if ``x`` is a UUIDTag_.

  This function runs in ``O(1)`` time.

----

.. _Iterable:

* ::

    Iterable(fn: Function) -> Iterable

  This function calls ``fn`` with no arguments.
  ``fn`` is supposed to return an Iterator_. It will then
  wrap the Iterator_ so that it is recognized as being
  Iterable_.

  This function runs in ``O(1)`` time.

  All Iterable_ things can be converted into an Iterator_ by
  using toIterator_.

  This is useful for creating your own iteration functions.

  If something is Iterable_, it can be used by the iteration
  functions like each_, map_, zip_, etc.

  Most iteration functions are lazy, which means they only
  generate their values when needed. That means they run in
  ``O(1)`` time, and they only need to iterate over the data
  once.

  So you can freely add as many iteration functions as you
  want, and it won't decrease the performance:

  .. code:: javascript

    var list = List(...);

    // This does not iterate over `list`, so it takes O(1) time.
    var mapped = map(list, function (x) {
      ...
    });

    // This does not iterate over `mapped`, so it takes O(1) time.
    var filtered = keep(mapped, function (x) {
      ...
    });

    // This iterates over `list` only one time, so it
    // takes O(n) time rather than O(3 * n) time.
    each(filtered, function (x) {
      console.log(x);
    });

  These things are Iterable_:

  * JavaScript Array

  * JavaScript String

  * ECMAScript 6 Iterable

  * The return value of the Iterable_ function

  * Dict_, List_, Queue_, Record_, Set_, Stack_, and Tuple_

  Examples:

  .. code:: javascript

    // Don't use this function, use the `map` function instead!
    function my_map(x, f) {
      return Iterator(function () {
        var iterator = toIterator(x);

        return {
          next: function () {
            var info = iterator.next();
            if (info.done) {
              return { done: true };
            } else {
              return { value: f(info.value) };
            }
          }
        };
      });
    }

----

.. _Iterator:

* ::

    Iterator

  All Iterable_ things can be converted into an Iterator_
  by using toIterator_.

  An Iterator_ isn't really a type or a function. Instead,
  an Iterator_ is simply an object that has a :js:`next` method.

  Calling the :js:`next` method will return an object with
  the following properties:

  * If the Iterator_ is finished, :js:`done` will be :js:`true`.

  * If the Iterator_ is not finished, :js:`value` will be the
    next value in the Iterator_.

  .. code:: javascript

    var iterator = toIterator([1, 2, 3]);

    // returns { value: 1 }
    iterator.next();

    // returns { value: 2 }
    iterator.next();

    // returns { value: 3 }
    iterator.next();

    // returns { done: true }
    iterator.next();

  As you can see above, Iterator_\ s are *mutable*: every time
  you call the :js:`next` method it will return the next value,
  or :js:`done` if it's finished.

  It is recommended to not use Iterator_\ s directly, instead
  you should use the higher-level functions like each_, map_,
  foldl_, etc.

  But if you want to create your own iteration functions, you
  will need to use toIterator_ and Iterable_.

----

.. _join:

* ::

    join(x: Iterable, [separator: String = ""]) -> String

  Returns a string which contains all the
  values of ``x``, separated by ``separator``.

  This is the same as :js:`Array.prototype.join`, except
  it works on all Iterable_.

  This function runs in ``O(n)`` time.

  Examples:

  .. code:: javascript

    // Returns "123"
    join([1, 2, 3]);

    // Returns "1 2 3"
    join([1, 2, 3], " ");

    // Returns "1 2 3"
    join(Tuple([1, 2, 3]), " ");

    // Returns "1 2 3"
    join("123", " ");

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

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns [1, 2, 3, 0]
    keep([1, 2, 3, 4, 5, 0], function (x) {
      return x < 4;
    });

----

.. _List:

* ::

    List([x: Iterable]) -> List

  A List_ is an immutable ordered sequence of values.

  The values from ``x`` will be inserted into
  the List_, in the same order as ``x``.

  This takes ``O(n)`` time, unless ``x`` is already a
  List_, in which case it takes ``O(1)`` time.

  Duplicate values are allowed, and duplicates don't
  have to be in the same order.

  The values in the List_ can have whatever order you
  want, but they are not sorted. If you want the values
  to be sorted, use a SortedSet_ instead.

  Examples:

  .. code:: javascript

    // Returns [1, 2, 3]
    List([1, 2, 3]);

    // Returns [["bar", 2], ["foo", 1]]
    List(Dict({ "foo": 1, "bar": 2 }));

----

.. _List concat:

* ::

    List concat(x: Iterable) -> List

  Returns a new List_ with all the values of this List_
  followed by all the values of ``x``.

  This does not mutate the List_, it returns a new List_.

  If ``x`` is a List_, this function runs in
  ``O(125 + log2(n / 125) + log2(min(n / 125, m / 125)))``
  worst-case time. Otherwise this function runs in amortized
  ``O(m)`` time.

  Examples:

  .. code:: javascript

    // Returns [1, 2, 3, 4, 5, 6, 0]
    List([1, 2, 3]).concat([4, 5, 6, 0]);

----

.. _List get:

* ::

    List get(index: Integer, [default: Any]) -> Any

  Returns the value in the List_ at ``index``.

  * If ``index`` is negative, it starts counting from
    the end of the List_, so :js:`-1` is the last value
    in the List_, :js:`-2` is the second-from-last value,
    etc.

  * If ``index`` is not in the List_:

    * If ``default`` is provided, it is returned.
    * If ``default`` is not provided, an error is thrown.

  This function runs in ``O(log2(n / 125))``
  worst-case time.

  Examples:

  .. code:: javascript

    var list = List([10, 20, 30]);

    // Returns 10
    list.get(0);

    // Returns 20
    list.get(1);

    // Returns 30
    list.get(2);

    // Throws an error
    list.get(3);

    // Returns 50
    list.get(3, 50);

    // Returns 30
    list.get(-1);

    // Returns 20
    list.get(-2);

----

.. _List has:

* ::

    List has(index: Integer) -> Boolean

  Returns :js:`true` if ``index`` is in the List_.

  * If ``index`` is negative, it starts counting from
    the end of the List_, so :js:`-1` is the last index of
    the List_, :js:`-2` is the second-from-last index, etc.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    var list = List([10, 20, 30]);

    // Returns true
    list.has(0);

    // Returns true
    list.has(2);

    // Returns false
    list.has(3);

    // Returns true
    list.has(-1);

----

.. _List insert:

* ::

    List insert(index: Integer, value: Any) -> List

  Returns a new List_ with ``value`` inserted at ``index``.

  If you just want to insert at the end of a List_,
  it's much faster to use `List push`_ instead.

  This does not mutate the List_, it returns a new List_.

  * If ``index`` is negative, it starts counting from
    the end of the List_, so :js:`-1` inserts ``value``
    as the last value, :js:`-2` inserts ``value`` as the
    second-from-last value, etc.

  This function runs in ``O(log2(n / 125) + 125)``
  worst-case time.

  Examples:

  .. code:: javascript

    var list = List([10, 20, 30]);

    // Returns [50, 10, 20, 30]
    list.insert(0, 50);

    // Returns [10, 20, 30, 50]
    list.insert(3, 50);

    // Throws an error
    list.insert(4, 50);

    // Returns [10, 20, 30, 50]
    list.insert(-1, 50);

    // Returns [10, 20, 50, 30]
    list.insert(-2, 50);

----

.. _List isEmpty:

* ::

    List isEmpty() -> Boolean

  Returns :js:`true` if the List_ has no values in it.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns true
    List().isEmpty();

    // Returns false
    List([1, 2, 3]).isEmpty();

----

.. _List modify:

* ::

    List modify(index: Integer, fn: Function) -> List

  Returns a new List_ with the value at ``index`` modified by ``fn``.

  This does not mutate the List_, it returns a new List_.

  This function calls ``fn`` with the value at ``index``, and
  whatever ``fn`` returns is used as the new value at ``index``.

  * If ``index`` is negative, it starts counting from
    the end of the List_, so :js:`-1` modifies the last value,
    :js:`-2` modifies the second-from-last value, etc.

  * If ``index`` is not in the List_, an error is thrown.

  This function runs in ``O(log2(n / 125) + 125)`` worst-case time.

  Examples:

  .. code:: javascript

      var list = List([1, 2, 3]);

      function add10(x) {
        return x + 10;
      }

      // Returns [11, 2, 3]
      list.modify(0, add10);

      // Returns [1, 12, 3]
      list.modify(1, add10);

      // Returns [1, 2, 13]
      list.modify(-1, add10);

----

.. _List push:

* ::

    List push(value: Any) -> List

  Returns a new List_ with ``value`` inserted at the end of
  the List_.

  This does not mutate the List_, it returns a new List_.

  If you want to insert at arbitrary indexes, use
  `List insert`_ instead.

  This function runs in amortized ``O(1)`` time.

  Examples:

  .. code:: javascript

    var list = List([1, 2, 3]);

    // Returns [1, 2, 3, 4]
    list.push(4);

    // Returns [1, 2, 3, 4, 5, 0]
    list.push(4).push(5).push(0);

----

.. _List remove:

* ::

    List remove(index: Integer) -> List

  Returns a new List_ with the value at ``index`` removed.

  This does not mutate the List_, it returns a new List_.

  * If ``index`` is negative, it starts counting from
    the end of the List_, so :js:`-1` removes the last value,
    :js:`-2` removes the second-from-last value, etc.

  * If ``index`` is not in the List_, an error is thrown.

  This function runs in ``O(log2(n / 125) + 125)``
  worst-case time.

  Examples:

  .. code:: javascript

    var list = List([10, 20, 30]);

    // Returns [20, 30]
    list.remove(0);

    // Returns [10, 20]
    list.remove(2);

    // Throws an error
    list.remove(3);

    // Returns [10, 20]
    list.remove(-1);

    // Returns [10, 30]
    list.remove(-2);

----

.. _List removeAll:

* ::

    List removeAll() -> List

  Returns a new List_ with no values.

  This does not mutate the List_, it returns a new List_.

  This function runs in ``O(1)`` time.

----

.. _List set:

* ::

    List set(index: Integer, value: Any) -> List

  Returns a new List_ with the value at ``index`` set to ``value``.

  This does not mutate the List_, it returns a new List_.

  * If ``index`` is negative, it starts counting from
    the end of the List_, so :js:`-1` sets the last value,
    :js:`-2` sets the second-from-last value, etc.

  * If ``index`` is not in the List_, an error is thrown.

  This function runs in ``O(log2(n / 125) + 125)`` worst-case time.

  Examples:

  .. code:: javascript

    var list = List([10, 20, 30]);

    // Returns [50, 20, 30]
    list.set(0, 50);

    // Returns [10, 20, 50]
    list.set(2, 50);

    // Throws an error
    list.set(3, 50);

    // Returns [10, 20, 50]
    list.set(-1, 50);

    // Returns [10, 50, 30]
    list.set(-2, 50);

----

.. _List size:

* ::

    List size() -> Integer

  Returns the number of values in the List_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns 0
    List().size();

    // Returns 3
    List([10, 20, 30]).size();

----

.. _List slice:

* ::

    List slice([from: Integer], [to: Integer]) -> List

  Returns a new List_ with all the values of this List_
  between indexes ``from`` (included) and ``to`` (excluded).

  This does not mutate the List_, it returns a new List_.

  * If ``from`` is not provided, it defaults to the start of the List_.

  * If ``to`` is not provided, it defaults to the end of the List_.

  * If ``from`` or ``to`` is negative, it starts counting from
    the end of the List_, so :js:`-1` means the last value,
    :js:`-2` means the second-from-last value, etc.

  * If ``from`` is not in the List_, an error is thrown.

  * If ``from`` is greater than ``to``, an error is thrown.

  This function runs in ``O(log2(n / 125) + 249 + (2 * (m / 125)))``
  worst-case time.

  Examples:

  .. code:: javascript

    var list = List([10, 20, 30, 40]);

    list.slice();        // Returns [10, 20, 30, 40]
    list.slice(1);       // Returns [20, 30, 40]
    list.slice(1, 3);    // Returns [20, 30]
    list.slice(4);       // Throws an error
    list.slice(3, 4);    // Returns [40]
    list.slice(3, 5);    // Throws an error
    list.slice(-1);      // Returns [40]
    list.slice(-2);      // Returns [30, 40]
    list.slice(-2, -1);  // Returns [30]

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

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns [21, 22, 23]
    map([1, 2, 3], function (x) {
      return x + 20;
    });

----

.. _partition:

* ::

    partition(x: Iterable, fn: Function) -> Tuple

  Returns a Tuple_ with two Iterable_\ s: the first Iterable_
  contains the values of ``x`` for which ``fn`` returns
  :js:`true`, and the second Iterable_ contains the values of
  ``x`` for which ``fn`` returns :js:`false`.

  This function calls ``fn`` for each value in ``x``, and
  if the function returns :js:`true` then the value will be
  in the first Iterable_, otherwise it will be in the second
  Iterable_.

  This function returns a Tuple_ which contains Iterable_\ s,
  which are lazy: they only generate the values as needed.
  If you want an array, use toArray_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    var tuple = partition([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], function (x) {
      return x < 5;
    });

    // Returns [1, 2, 3, 4, 0]
    tuple.get(0);

    // Returns [5, 6, 7, 8, 9]
    tuple.get(1);

----

.. _Queue:

* ::

    Queue([x: Iterable]) -> Queue

  A Queue_ is an immutable ordered sequence of values that
  can efficiently add values to the right and remove values
  from the left.

  The values from ``x`` will be inserted into
  the Queue_, in the same order as ``x``.

  This takes ``O(n)`` time, unless ``x`` is already a
  Queue_, in which case it takes ``O(1)`` time.

  Duplicate values are allowed, and duplicates don't
  have to be in the same order.

  The values in the Queue_ can have whatever order you
  want, but they are not sorted. If you want the values
  to be sorted, use a SortedSet_ instead.

----

.. _Queue concat:

* ::

    Queue concat(x: Iterable) -> Queue

  Returns a new Queue_ with all the values of this Queue_
  followed by all the values of ``x``.

  This does not mutate the Queue_, it returns a new Queue_.

  This function runs in ``O(n)`` time.

  Examples:

  .. code:: javascript

    // Returns [1, 2, 3, 4, 5, 0]
    Queue([1, 2, 3]).concat([4, 5, 0]);

----

.. _Queue isEmpty:

* ::

    Queue isEmpty() -> Boolean

  Returns :js:`true` if the Queue_ has no values in it.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns true
    Queue().isEmpty();

    // Returns false
    Queue([1, 2, 3]).isEmpty();

----

.. _Queue peek:

* ::

    Queue peek([default: Any]) -> Any

  * If the Queue_ is empty:

    * If ``default`` is provided, it is returned.
    * If ``default`` is not provided, an error is thrown.

  * If the Queue_ is not empty:

    * It returns the left-most value of the Queue_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns 1
    Queue([1, 2, 3]).peek();

    // Throws an error
    Queue().peek();

    // Returns 5
    Queue().peek(5);

----

.. _Queue pop:

* ::

    Queue pop() -> Queue

  Returns a new Queue_ with the left-most value removed.

  * If the Queue_ is empty, an error is thrown.

  This does not mutate the Queue_, it returns a new Queue_.

  This function runs in amortized ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns [2, 3]
    Queue([1, 2, 3]).pop();

    // Throws an error
    Queue().pop();

----

.. _Queue push:

* ::

    Queue push(value: Any) -> Queue

  Returns a new Queue_ with ``value`` inserted to the right.

  This does not mutate the Queue_, it returns a new Queue_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns [1, 2, 3, 4]
    Queue([1, 2, 3]).push(4);

    // Returns [1, 2, 3, 4, 5, 0]
    Queue([1, 2, 3]).push(4).push(5).push(0);

----

.. _Queue removeAll:

* ::

    Queue removeAll() -> Queue

  Returns a new Queue_ with no values.

  This does not mutate the Queue_, it returns a new Queue_.

  This function runs in ``O(1)`` time.

----

.. _Queue size:

* ::

    Queue size() -> Integer

  Returns the number of values in the Queue_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns 0
    Queue().size();

    // Returns 3
    Queue([10, 20, 30]).size();

----

.. _range:

* ::

    range([start: Number = 0], [end: Number = Infinity], [step: Number = 1]) -> Iterable

  Returns an Iterable_ that contains numbers between
  ``start`` (included) and ``end`` (excluded),
  incremented by ``step``.

  * If ``step`` is negative, an error is thrown.

  This function returns an Iterable_, which is lazy:
  it only generates the values as needed. If you want
  an array, use toArray_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    range();               // Returns [0, 1, 2, 3, 4, 5...]
    range(5);              // Returns [5, 6, 7, 8, 9, 10...]
    range(0, 10);          // Returns [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    range(0, 10, -1);      // Throws an error
    range(0, 10, 2);       // Returns [0, 2, 4, 6, 8]
    range(10, 0, 2);       // Returns [10, 8, 6, 4, 2]
    range(0, 10, 0);       // Returns [0, 0, 0, 0, 0...]
    range(2.5, 6.2, 0.5);  // Returns [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]
    range(-10, -2);        // Returns [-10, -9, -8, -7, -6, -5, -4, -3]
    range(-5, 3);          // Returns [-5, -4, -3, -2, -1, 0, 1, 2]
    range(5, -3);          // Returns [5, 4, 3, 2, 1, 0, -1, -2]

----

.. _Record:

* ::

    Record([x: Object | Iterable]) -> Record

  A Record_ is an immutable fixed-size dictionary mapping
  strings / Tag_\ s to values.

  * If ``x`` is an Iterable_, the values must be arrays / Tuple_\ s
    of :js:`[key, value]`, which will be added to the Record_.

  * If ``x`` is a JavaScript object literal like :js:`{ foo: 1 }`,
    then the keys / values will be added to the Record_.

  In either case, the keys must be strings or Tag_\ s.

  This takes ``O(n + (n * log2(n)) + n)`` time, unless ``x``
  is already a Record_, in which case it takes ``O(1)``
  time.

  You should **not** rely upon the order of the keys in
  a Record_. If you need a specific key order, use a
  SortedDict_ instead.

  A Record_ is **much** faster and lighter-weight than a Dict_,
  but in exchange for that they can only have strings or Tag_\ s
  for keys, and you cannot add or remove keys from a Record_.

----

.. _Record get:

* ::

    Record get(key: String | Tag) -> Any

  * If ``key`` is in the Record_, the value for ``key`` is returned.

  * If ``key`` is not in the Record_, an error is thrown.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Throws an error
    Record().get("foo");

    // Returns 10
    Record({ "foo": 10 }).get("foo");

----

.. _Record modify:

* ::

    Record modify(key: String | Tag, fn: Function) -> Record

  Returns a new Record_ with ``key`` modified by ``fn``.

  This does not mutate the Record_, it returns a new Record_.

  This function calls ``fn`` with the value for ``key``, and
  whatever ``fn`` returns will be used as the new value for
  ``key``.

  * If ``key`` is not in the Record_, it will throw an error.

  This function runs in ``O(n)`` time.

  Examples:

  .. code:: javascript

    var record = Record({
      "foo": 1,
      "bar": 2
    });

    function add10(x) {
      return x + 10;
    }

    // Returns { "foo": 11, "bar": 2 }
    record.modify("foo", add10);

    // Returns { "foo": 1, "bar": 12 }
    record.modify("bar", add10);

    // Throws an error
    record.modify("qux", add10);

----

.. _Record set:

* ::

    Record set(key: String | Tag, value: Any) -> Record

  Returns a new Record_ with ``key`` set to ``value``.

  This does not mutate the Record_, it returns a new Record_.

  * If ``key`` does not exist, an error is thrown.

  This function runs in ``O(n)`` time.

  Examples:

  .. code:: javascript

    // Returns { "foo": 10 }
    Record({ "foo": 5 }).set("foo", 10);

    // Throws an error
    Record({ "foo": 5 }).set("bar", 10);

----

.. _Record update:

* ::

    Record update(x: Object | Iterable) -> Record

  Returns a new Record_ with the keys / values of this Record_
  updated with ``x``.

  This does not mutate the Record_, it returns a new Record_.

  ``x`` must be either a JavaScript object literal, or an
  Iterable_ where each value is an array / Tuple_ of
  :js:`[key, value]`.

  * If a ``key`` from ``x`` already exists in this Record_, it is overwritten.

  * If a ``key`` from ``x`` does not exist in this Record_, an error is thrown.

  This function runs in ``O(n * m)`` time.

  You can use this to update a Record_ with another Record_:

  .. code:: javascript

    var defaults = Record({
      "foo": 1,
      "bar": 2
    });

    var other = Record({
      "foo": 50
    });

    // Returns { "foo": 50, "bar": 2 }
    defaults.update(other);

  You can also use this to update a Record_ with a JavaScript
  object literal:

  .. code:: javascript

    var defaults = Record({
      "foo": 1,
      "bar": 2
    });

    // Returns { "foo": 50, "bar": 2 }
    defaults.update({
      "foo": 50
    });

----

.. _Ref:

* ::

    Ref(initial: Any, [onchange: Function]) -> Ref

  A Ref_ is the only mutable data type provided by
  this library. It holds a single value, which can be
  anything.

  The initial value of the Ref_ is ``initial``.

  Whenever the Ref_ changes, the function ``onchange``
  is called with the old value and the new value.
  Whatever the ``onchange`` function returns becomes
  the new value:

  .. code:: javascript

      var ref = Ref(5, function (before, after) {
        // Whatever the `onchange` function returns becomes the new value
        return before + after + 50;
      });

      // The `onchange` function is called
      ref.set(5);

      // Returns 60
      ref.get();

      // The `onchange` function is called
      ref.set(10);

      // Returns 120
      ref.get();

  This allows the ``onchange`` function to do validation,
  return the old value, or modify the value. You can also
  use this to notify something else about the change (e.g.
  an event listener).

  Because Ref_\ s are mutable, they are only treated as
  equal_ if they are exactly the same Ref_:

  .. code:: javascript

    var x = Ref(0);
    var y = Ref(0);

    // Returns false
    equal(x, y);

  Generally you should use immutable data as much as possible,
  but occasionally it's useful to have a little bit of
  mutability.

  It's common to have a Ref_ which contains immutable data.
  The only way to "change" the data is to change the Ref_,
  replacing the old immutable data with new immutable data.

  As an example:

  .. code:: javascript

      var car = Ref(Record({
        "mph": 0
      }));

  Let's now change the :js:`"mph"` property of the :js:`car`:

  .. code:: javascript

      car.modify(function (record) {
        // Returns { "mph": 10 }
        return record.set("mph", 10);
      });

  The above code calls the function with the current value of
  the Ref_ (in this case, :js:`record`), and whatever the
  function returns is the new value for the Ref_.

  In other words, we took the *current* immutable Record_, returned
  a *new* immutable Record_ with :js:`"mph"` set to :js:`10`, and now
  the Ref_ contains the new immutable Record_.

  This is very different from JavaScript, where every property
  is mutable.

  This has three major advantages:

  1) It gives fine-grained control over mutability. You can
     have a Dict_ which is contained within a single Ref_,
     or you can have a Dict_ where each key contains a Ref_,
     or even a combination of the two.

  2) In JavaScript, your objects could change at any time,
     making your code difficult to understand.

     But if you're using immutable objects, your code is
     easier to understand, because now Ref_\ s are the only
     places in your code where you have to worry about
     mutability.

     In addition, although the Ref_ itself is mutable,
     the data it contains is immutable, so if you get the
     data out of a Ref_, you can be assured that it will
     never change.

  3) Ref_\ s provide an easy and efficient way to be notified
     when their value changes. Although JavaScript has
     :js:`Proxy` and :js:`Object.observe`, Ref_ provides a
     simpler alternative.

----

.. _Ref get:

* ::

    Ref get() -> Any

  Returns the current value of the Ref_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    var ref = Ref(10);

    // Returns 10
    ref.get();

    // Mutates the ref
    ref.set(20);

    // Returns 20
    ref.get();

----

.. _Ref modify:

* ::

    Ref modify(fn: Function) -> Void

  This function modifies the current value of the Ref_.

  This mutates the Ref_, it does **not** return a new Ref_!

  This function calls ``fn`` with the current value of the
  Ref_, and whatever ``fn`` returns is used as the new value
  for the Ref_.

  This will call the ``onchange`` function of the Ref_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    var ref = Ref(5);

    function add10(x) {
      return x + 10;
    }

    // Returns 5
    ref.get();

    // Mutates the ref
    ref.modify(add10);

    // Returns 15
    ref.get();

    // Mutates the ref
    ref.modify(add10);

    // Returns 25
    ref.get();

----

.. _Ref set:

* ::

    Ref set(value: Any) -> Void

  This function sets the current value of the Ref_ to ``value``.

  This mutates the Ref_, it does **not** return a new Ref_!

  This will call the ``onchange`` function of the Ref_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    var ref = Ref(5);

    // Returns 5
    ref.get();

    // Mutates the ref
    ref.set(10);

    // Returns 10
    ref.get();

    // Mutates the ref
    ref.set(50);

    // Returns 50
    ref.get();

----

.. _reverse:

* ::

    reverse(x: Iterable) -> Iterable

  Returns a new Iterable_ which contains all
  the values of ``x``, but in reverse order.

  This function is **not** lazy: it requires ``O(n)`` space,
  because it must reach the end of ``x`` before it can
  return anything.

  That means it has to iterate over ``x`` twice. This is
  inefficient, and so you should try to avoid using reverse_
  unless you need to.

  This function returns an Iterable_. If you want an
  array, use toArray_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns [3, 2, 1]
    reverse([1, 2, 3]);

----

.. _Set:

* ::

    Set([x: Iterable]) -> Set

  A Set_ is an immutable unordered sequence of values,
  without duplicates.

  The values from ``x`` will be inserted into the Set_,
  without duplicates.

  This takes ``O(log2(n) * m)`` time, unless ``x`` is already
  a Set_, in which case it takes ``O(1)`` time.

  You should **not** rely upon the order of the values in
  a Set_. If you need a specific order, use a SortedSet_ or
  List_ instead.

  Mutable objects can be used as values, and they are treated
  as equal_ only if they are exactly the same object:

  .. code:: javascript

      var obj1 = { foo: 1 };
      var obj2 = { foo: 1 };

      var set = Set([obj1, obj2]);

      // Returns true
      set.has(obj1);

      // Returns true
      set.has(obj2);

      // Removes obj1 from the set
      set = set.remove(obj1);

      // Returns false
      set.has(obj1);

      // Returns true
      set.has(obj2);

  You can also use immutable objects (like Dict_, Set_, List_,
  etc.) as values, and they are treated as equal_ if their
  keys / values are equal_:

  .. code:: javascript

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
      set.has(obj1);

      // Returns false
      set.has(obj2);

  Because :js:`obj1` and :js:`obj2` have the same keys / values,
  they are equal_, and so they are treated as duplicates.

----

.. _Set add:

* ::

    Set add(value: Any) -> Set

  Returns a new Set_ with ``value`` added to it.

  This does not mutate the Set_, it returns a new Set_.

  * If ``value`` is already in the Set_, this function does nothing.

  This function runs in ``O(log2(n))`` worst-case time.

  Examples:

  .. code:: javascript

    var set = Set([1, 2, 3]);

    // Returns [1, 2, 3, 4]
    set.add(4);

    // Returns [0, 1, 2, 3, 4, 5]
    set.add(4).add(5).add(0);

----

.. _Set disjoint:

* ::

    Set disjoint(x: Iterable) -> Set

  Returns a new Set_ which contains all the values in this
  Set_, and all the values in ``x``, but **not** the values
  which are in both this Set_ and ``x``.

  This is also called the `symmetric difference <http://en.wikipedia.org/wiki/Symmetric_difference>`__ of the two Set_\ s.

  This does not mutate the Set_, it returns a new Set_.

  This function runs in ``O(2 * log2(n) * m)`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns [1, 4]
    Set([1, 2, 3]).disjoint([2, 3, 4]);

    // Returns [1, 2, 3]
    Set([1, 2, 3]).disjoint([]);

----

.. _Set has:

* ::

    Set has(value: Any) -> Boolean

  Returns :js:`true` if ``value`` is in this Set_.

  This function runs in ``O(log2(n))`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns false
    Set().has(1);

    // Returns true
    Set([1, 2, 3]).has(1);

----

.. _Set intersect:

* ::

    Set intersect(x: Iterable) -> Set

  Returns a new Set_ which contains all the values that
  are in both this Set_ **and** ``x``.

  This is a standard `set intersection <http://en.wikipedia.org/wiki/Intersection_%28set_theory%29>`__.

  This does not mutate the Set_, it returns a new Set_.

  This function runs in ``O(2 * log2(n) * m)`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns [2, 3]
    Set([1, 2, 3]).intersect([2, 3, 4]);

    // Returns []
    Set([1, 2, 3]).intersect([]);

----

.. _Set isEmpty:

* ::

    Set isEmpty() -> Boolean

  Returns :js:`true` if the Set_ has no values in it.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns true
    Set().isEmpty();

    // Returns false
    Set([1, 2, 3]).isEmpty();

----

.. _Set remove:

* ::

    Set remove(value: Any) -> Set

  Returns a new Set_ with ``value`` removed.

  This does not mutate the Set_, it returns a new Set_.

  * If ``value`` is not in the Set_, this function does nothing.

  This function runs in ``O(log2(n))`` worst-case time.

  Examples:

  .. code:: javascript

    var set = Set([1, 2, 3]);

    // Returns [2, 3]
    set.remove(1);

    // Returns [1]
    set.remove(2).remove(3);

    // Returns [1, 2, 3]
    set.remove(4);

----

.. _Set removeAll:

* ::

    Set removeAll() -> Set

  Returns a new Set_ with no values.

  This does not mutate the Set_, it returns a new Set_.

  This function runs in ``O(1)`` time.

  This function is useful because it preserves the
  sort of a SortedSet_:

  .. code:: javascript

    var x = SortedSet(...);

    // No values, but has the same sort as `x`
    x.removeAll();

----

.. _Set subtract:

* ::

    Set subtract(x: Iterable) -> Set

  Returns a new Set_ which contains all the values in
  this Set_, but without the values in ``x``.

  This is also called the `relative complement <http://en.wikipedia.org/wiki/Complement_%28set_theory%29>`__ of the two Set_\ s.

  This does not mutate the Set_, it returns a new Set_.

  This function runs in ``O(log2(n) * m)`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns [1]
    Set([1, 2, 3]).subtract([2, 3, 4]);

    // Returns [1, 2, 3]
    Set([1, 2, 3]).subtract([]);

----

.. _Set union:

* ::

    Set union(x: Iterable) -> Set

  Returns a new Set_ which contains all the values in
  this Set_, and also all the values in ``x``.

  This is a standard `set union <http://en.wikipedia.org/wiki/Union_%28set_theory%29>`__.

  This does not mutate the Set_, it returns a new Set_.

  This function runs in ``O(log2(n) * m)`` worst-case time.

  Examples:

  .. code:: javascript

    // Returns [1, 2, 3, 4]
    Set([1, 2, 3]).union([2, 3, 4]);

    // Returns [1, 2, 3]
    Set([1, 2, 3]).union([]);

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
  numbers and strings as keys in the same Dict_ / Set_.

----

.. _SortedDict:

* ::

    SortedDict(sort: Function, [x: Object | Iterable]) -> Dict

  Returns a Dict_ where the keys are sorted by ``sort``.

  The ``x`` argument is exactly the same as for Dict_,
  except that the keys are sorted.

  The sort order for the keys is determined by the ``sort`` function.

  The ``sort`` function is given two keys:

  * If it returns :js:`0` the keys are treated as equal.
  * If it returns :js:`-1` the first key is lower than the second key.
  * If it returns :js:`1` the first key is greater than the second key.

  The sort order must be consistent:

  * If given the same keys, the function must return the same result.

  * If it returns :js:`0` for :js:`foo` and :js:`bar`, it must return
    :js:`0` for :js:`bar` and :js:`foo`.

  * If it returns :js:`-1` for :js:`foo` and :js:`bar`, it must return
    :js:`1` for :js:`bar` and :js:`foo`.

  * If it returns :js:`1` for :js:`foo` and :js:`bar`, it must return
    :js:`-1` for :js:`bar` and :js:`foo`.

  If the sort order is not consistent, the behavior of
  SortedDict_ will be unpredictable. This is not a
  bug in SortedDict_, it is a bug in your sort function.

----

.. _SortedSet:

* ::

    SortedSet(sort: Function, [x: Iterable]) -> Set

  Returns a Set_ where the keys are sorted by ``sort``.

  The ``x`` argument is exactly the same as for Set_,
  except that the values are sorted.

  The sort order for the values is determined by the ``sort`` function.

  The ``sort`` function is given two values:

  * If it returns :js:`0` the values are treated as equal.
  * If it returns :js:`-1` the first value is lower than the second value.
  * If it returns :js:`1` the first value is greater than the second value.

  The sort order must be consistent:

  * If given the same values, the function must return the same result.

  * If it returns :js:`0` for :js:`foo` and :js:`bar`, it must return
    :js:`0` for :js:`bar` and :js:`foo`.

  * If it returns :js:`-1` for :js:`foo` and :js:`bar`, it must return
    :js:`1` for :js:`bar` and :js:`foo`.

  * If it returns :js:`1` for :js:`foo` and :js:`bar`, it must return
    :js:`-1` for :js:`bar` and :js:`foo`.

  If the sort order is not consistent, the behavior of
  SortedSet_ will be unpredictable. This is not a
  bug in SortedSet_, it is a bug in your sort function.

----

.. _Stack:

* ::

    Stack([x: Iterable]) -> Stack

  A Stack_ is an immutable ordered sequence of values that
  can efficiently add and remove values from the right.

  The values from ``x`` will be inserted into
  the Stack_, in the same order as ``x``.

  This takes ``O(n)`` time, unless ``x`` is already a
  Stack_, in which case it takes ``O(1)`` time.

  Duplicate values are allowed, and duplicates don't
  have to be in the same order.

  The values in a Stack_ can have whatever order you
  want, but they are not sorted. If you want the values
  to be sorted, use a SortedSet_ instead.

----

.. _Stack concat:

* ::

    Stack concat(x: Iterable) -> Stack

  Returns a new Stack_ with all the values of this Stack_
  followed by all the values of ``x``.

  This does not mutate the Stack_, it returns a new Stack_.

  This function runs in ``O(n)`` time.

  Examples:

  .. code:: javascript

    // Returns [1, 2, 3, 4, 5, 0]
    Stack([1, 2, 3]).concat([4, 5, 0]);

----

.. _Stack isEmpty:

* ::

    Stack isEmpty() -> Boolean

  Returns :js:`true` if the Stack_ has no values in it.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns true
    Stack().isEmpty();

    // Returns false
    Stack([1, 2, 3]).isEmpty();


----

.. _Stack peek:

* ::

    Stack peek([default: Any]) -> Any

  * If the Stack_ is empty:

    * If ``default`` is provided, it is returned.
    * If ``default`` is not provided, an error is thrown.

  * If the Stack_ is not empty, the right-most value is returned.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns 3
    Stack([1, 2, 3]).peek();

    // Throws an error
    Stack().peek();

    // Returns 5
    Stack().peek(5);

----

.. _Stack pop:

* ::

    Stack pop() -> Stack

  Returns a new Stack_ with the right-most value removed.

  This does not mutate the Stack_, it returns a new Stack_.

  * If the Stack_ is empty, an error is thrown.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns [1, 2]
    Stack([1, 2, 3]).pop();

    // Throws an error
    Stack().pop();

----

.. _Stack push:

* ::

    Stack push(value: Any) -> Stack

  Returns a new Stack_ with ``value`` inserted at the right.

  This does not mutate the Stack_, it returns a new Stack_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns [1, 2, 3, 4]
    Stack([1, 2, 3]).push(4);

    // Returns [1, 2, 3, 4, 5, 0]
    Stack([1, 2, 3]).push(4).push(5).push(0);

----

.. _Stack removeAll:

* ::

    Stack removeAll() -> Stack

  Returns a new Stack_ with no values.

  This does not mutate the Stack_, it returns a new Stack_.

  This function runs in ``O(1)`` time.

----

.. _Stack size:

* ::

    Stack size() -> Integer

  Returns the number of values in the Stack_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns 0
    Stack().size();

    // Returns 3
    Stack([10, 20, 30]).size();

----

.. _Tag:

* ::

    Tag() -> Tag

  A Tag_ is an immutable **unique** value. If you call Tag_
  twice, you get two different Tag_\ s:

  .. code:: javascript

      var x = Tag();
      var y = Tag();

      // false
      equal(x, y);

  In addition to using equal_, you can also use JavaScript's
  :js:`===` and :js:`!==` operators for Tag_\ s:

  .. code:: javascript

      // false
      x === y;

      // true
      x === x;

  The *only* purpose of a Tag_ is to be unique. You should
  **not** rely upon anything other than the uniqueness of a
  Tag_.

  A Tag_ can be used anywhere that a string can be used.
  Unlike strings, Tag_\ s are guaranteed (with very high
  probability) to not collide with anything else,
  including other Tag_\ s and strings.

  There is one major limitation: you can't use a Tag_
  with toJSON_ or fromJSON_.

  The reason for this is that it's essentially
  impossible to guarantee uniqueness when using
  multiple processes. See UUIDTag_ for a more
  detailed explanation.

  If you want to use toJSON_ and fromJSON_, you should
  use UUIDTag_ instead. For this reason, it's strongly
  recommended that libraries use UUIDTag_, when they can.

  So, if a Tag_ is just a unique value, what can it be
  used for?

  You can use it to create private data that only you
  can access:

  .. code:: javascript

      var my_tag = Tag();

      var obj = {};

      obj[my_tag] = 50;

      // Returns 50
      obj[my_tag];

  However, because of certain features of JavaScript,
  it's possible for a malicious person to access the
  Tag_, so you should **not** store sensitive data like
  passwords with a Tag_.

  But you can use this to attach data to an existing
  object (e.g. from another library) so that it
  doesn't interfere with the object's existing
  properties.

  Another thing you can do is to create interfaces.
  An interface is the combination of a function and
  a Tag_. This allows you to change the behavior of the
  function based upon the type of its argument.

  Here's an example:

  .. code:: javascript

      var tag_print = Tag();

      function print(x) {
        var fn = x[tag_print];
        if (fn != null) {
          return fn(x);
        } else {
          throw new Error("Cannot print object!");
        }
      }

  Any object that has a :js:`tag_print` method can be
  printed. Let's create a printable object:

  .. code:: javascript

      function Foo(x) {
        this.foo = x;
      }

      Foo.prototype[tag_print] = function (x) {
        return "(Foo " + x.foo + ")";
      };

  Now if we call :js:`print(new Foo(5))` it returns
  :js:`"(Foo 5)"`. This lets us create new data types and
  give them custom printing behavior without needing to
  change the :js:`print` function!

  Unlike normal methods, Tag_\ s are unique, so there's no
  chance of a name collision. You can have two different
  modules which both export a :js:`tag_print` Tag_, and it
  will work just fine, because each Tag_ is unique.

  If the :js:`print` function is part of a library, it
  would be better if it used UUIDTag_ instead of Tag_.

  Another use of Tag_\ s is event listeners. It's common
  to use things like this:

  .. code:: javascript

      foo.on("click", function () {
        ...
      });

      foo.on("keypress", function () {
        ...
      });

  The problem is, what if somebody else defines a new
  :js:`"click"` event with different behavior? Oops, now
  there's a name collision. With Tag_\ s, there is no
  collision:

  .. code:: javascript

      foo.on(tag_click, function () {
        ...
      });

      foo.on(tag_keypress, function () {
        ...
      });

  Yet another use case is to create a `nominal type
  system <http://en.wikipedia.org/wiki/Nominal_type_system>`__.
  Immutable objects are treated as equal_ if they have
  the same keys / values:

  .. code:: javascript

    var foo = Record({
      "prop1": 1,
      "prop2": 2
    });

    var bar = Record({
      "prop1": 1,
      "prop2": 2
    });

    // Returns true
    equal(foo, bar);

  This is known as `structural typing <http://en.wikipedia.org/wiki/Structural_type_system>`__.
  Sometimes that's exactly what you want, but sometimes
  you want a little more precision.

  Let's say you wanted to have a :js:`Human` type. A
  :js:`Human` would have various properties, like
  eyes, arms, legs, etc. But other animals also have
  those properties. So you need a reliable way to
  determine whether something is a :js:`Human` or not.
  We can solve this problem by using a Tag_:

  .. code:: javascript

    var tag_Human = Tag();

    var human = Record({
      "type" : tag_Human,
      "arms" : ...,
      "legs" : ...
    });

  Because Tag_\ s are unique, now our :js:`human` will
  only be equal_ to other :js:`Human`\ s, and not other
  animals.

  We can go further and give each individual :js:`Human`
  a Tag_:

  .. code:: javascript

    function Human(name, age, gender) {
      var id = Tag();

      return Record({
        "type"   : tag_Human,
        "id"     : id,
        "name"   : name,
        "age"    : age,
        "gender" : gender,
        "arms"   : ...,
        "legs"   : ...
      });
    }

    var Bob1 = Human("Bob", 50, "male");
    var Bob2 = Human("Bob", 50, "male");

    // Returns false
    equal(Bob1, Bob2);

  Now each individual :js:`Human` has a unique :js:`"id"`,
  which can be used to reliably tell one :js:`Human` apart
  from another :js:`Human`.

  Basically, anything that requires a unique id that
  doesn't collide can probably benefit from Tag_\ s.

----

.. _take:

* ::

    take(x: Iterable, count: Integer) -> Iterable

  Returns an Iterable_ that contains the first
  ``count`` number of values from ``x``.

  * ``count`` must be an integer, and must not be negative.

  This function returns an Iterable_, which is lazy:
  it only generates the values as needed. If you want
  an array, use toArray_.

  This function runs in ``O(1)`` time.

  This function is a simple way of dealing with
  infinite Iterable_\ s:

  .. code:: javascript

    // Returns [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    take(range(), 10);

----

.. _toArray:

* ::

    toArray(x: Iterable) -> Array

  Converts an Iterable_ to a JavaScript Array:

  * If ``x`` is already a JavaScript Array, it is returned as-is.

  * If ``x`` is an Iterable_, it is converted into a JavaScript Array
    and returned. This conversion takes ``O(n)`` time.

  This is useful because most iteration functions return
  Iterable_\ s, not arrays.

  Examples:

  .. code:: javascript

    // Returns [0, 1, 2, 3, 4]
    toArray(range(0, 5));

----

.. _toIterator:

* ::

    toIterator(x: Iterable) -> Iterator

  Converts an Iterable_ into an Iterator_.

  This is useful if you want to create your own iterator
  functions.

  See also Iterable_, for creating Iterable_\ s.

  This function runs in ``O(1)`` time.

----

.. _toJS:

* ::

    toJS(x: Any) -> Any

  Converts a Dict_, List_, Queue_, Record_, Set_, Stack_,
  or Tuple_ to its JavaScript equivalent.

  This function has the following behavior:

  * JavaScript object literals are deeply copied, with
    toJS_ called on all the keys / values.

    This copying takes ``O(n)`` time.

  * JavaScript arrays are deeply copied, with toJS_
    called on all the values.

    This copying takes ``O(n)`` time.

  * Dict_ and Record_ are converted into a JavaScript
    object, with toJS_ called on all the keys / values.
    The keys must be strings or Tag_.

    This conversion takes ``O(n)`` time.

  * List_, Queue_, Set_, Stack_, and Tuple_ are
    converted into a JavaScript array, with toJS_
    called on all the values.

    This conversion takes ``O(n)`` time.

  * Everything else is returned as-is.

  This is useful if you like using Dict_, List_, Queue_, 
  Record_, Set_, Stack_, or Tuple_ but you want to
  use a library that requires ordinary JavaScript
  objects / arrays.

  If you want to losslessly store an immutable object on
  disk, or send it over the network, you can use toJSON_
  and fromJSON_ instead.

----

.. _toJSON:

* ::

    toJSON(x: Any) -> Any

  Converts a Dict_, List_, Queue_, Record_, Set_, Stack_,
  or Tuple_ to JSON.

  This function has the following behavior:

  * JavaScript object literals are deeply copied, with
    toJSON_ called on all the keys / values.

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

  * Dict_, List_, Queue_, Record_, Set_, Stack_, and Tuple_
    are converted into specially marked JSON objects, with
    toJSON_ called on all the keys / values.

    This conversion takes ``O(n)`` time.

  * Everything else throws an error.

  You *cannot* use Tag_ with toJSON_, but you *can* use
  UUIDTag_.

  This function is useful because it's *lossless*: if you
  use toJSON_ followed by fromJSON_, the two objects
  will be equal_:

  .. code:: javascript

      var x = Record({ "foo": 1 });

      // Returns true
      equal(x, fromJSON(toJSON(x)));

  This makes it possible to store immutable objects on disk,
  or send them over the network with JSON, reconstructing
  them on the other side.

  If you just want to use a library that expects normal
  JavaScript objects, use toJS_ and fromJS_ instead.

----

.. _Tuple:

* ::

    Tuple([x: Iterable]) -> Tuple

  A Tuple_ is an immutable fixed-size ordered sequence of values.

  The values from ``x`` will be inserted into
  the Tuple_, in the same order as ``x``.

  This takes ``O(n)`` time, unless ``x`` is already a
  Tuple_, in which case it takes ``O(1)`` time.

  A Tuple_ is **much** faster and lighter-weight than a List_,
  but in exchange for that they are fixed size: you cannot insert
  or remove values from a Tuple_.

  Duplicate values are allowed, and duplicates don't
  have to be in the same order.

  The values in a Tuple_ can have whatever order you
  want, but they are not sorted. If you want the values
  to be sorted, use a SortedSet_ instead.

----

.. _Tuple get:

* ::

    Tuple get(index: Integer) -> Any

  Returns the value in the Tuple_ at ``index``.

  * If ``index`` is not in the Tuple_, an error is thrown.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns 10
    Tuple([10, 20, 30]).get(0);

    // Returns 20
    Tuple([10, 20, 30]).get(1);

    // Returns 30
    Tuple([10, 20, 30]).get(2);

    // Throws an error
    Tuple([10, 20, 30]).get(3);

----

.. _Tuple modify:

* ::

    Tuple modify(index: Integer, fn: Function) -> Tuple

  Returns a new Tuple_ with the value at ``index`` modified by ``fn``.

  This function calls ``fn`` with the value at ``index``, and
  whatever ``fn`` returns is used as the new value at
  ``index``.

  * If ``index`` is not in the Tuple_, an error is thrown.

  This does not mutate the Tuple_, it returns a new Tuple_.

  This function runs in ``O(n)`` time.

  Examples:

  .. code:: javascript

      var tuple = Tuple([1, 2, 3]);

      function add10(x) {
        return x + 10;
      }

      // Returns [11, 2, 3]
      tuple.modify(0, add10);

      // Returns [1, 12, 3]
      tuple.modify(1, add10);

      // Returns [1, 2, 13]
      tuple.modify(2, add10);

      // Throws an error
      tuple.modify(3, add10);

----

.. _Tuple set:

* ::

    Tuple set(index: Integer, value: Any) -> Tuple

  Returns a new Tuple_ with the value at ``index`` set to ``value``.

  * If ``index`` is not in the Tuple_, an error is thrown.

  This does not mutate the Tuple_, it returns a new Tuple_.

  This function runs in ``O(n)`` time.

  Examples:

  .. code:: javascript

    var tuple = Tuple([1, 2, 3]);

    // Returns [50, 2, 3]
    tuple.set(0, 50);

    // Returns [1, 50, 3]
    tuple.set(1, 50);

    // Returns [1, 2, 50]
    tuple.set(2, 50);

    // Throws an error
    tuple.set(4, 50);

----

.. _Tuple size:

* ::

    Tuple size() -> Integer

  Returns the number of values in the Tuple_.

  This function runs in ``O(1)`` time.

  Examples:

  .. code:: javascript

    // Returns 0
    Tuple().size();

    // Returns 3
    Tuple([10, 20, 30]).size();

----

.. _UUIDTag:

* ::

    UUIDTag(uuid: String) -> Tag

  Returns a Tag_ which uses ``uuid`` for equality.

  * If ``uuid`` is not a lower-case `UUID <http://en.wikipedia.org/wiki/Universally_unique_identifier>`__,
    an error is thrown.

  Using Tag_ is very easy and convenient, but it
  has a major limitation: you can't use a Tag_ with toJSON_
  or fromJSON_.

  The reason is: imagine a server and client that both use
  the same library. The library uses some Tag_\ s. The server
  sends some data to the client (using toJSON_), which the
  client then receives (using fromJSON_). Because both the
  client and server are using the same library, you would
  expect the Tag_\ s to be the same, but they're not!

  Another example: imagine some data that uses Tag_\ s. The
  data is saved to a database using toJSON_. The program
  is restarted, and the data is read from the database
  (using fromJSON_). You would expect the Tag_\ s to match
  up, but they don't.

  There's not that many good ways to solve this problem.
  `UUIDs <http://en.wikipedia.org/wiki/Universally_unique_identifier>`__
  are one solution, so that's what UUIDTag_ uses.

  Rather than doing this:

  .. code:: javascript

    var tag_foo = Tag();

  You should instead do this:

  .. code:: javascript

    var tag_foo = UUIDTag("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

  Replace :js:`"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"` with a UUID
  that you have generated.

  If two Tag_\ s use the same UUID, they are treated as the same
  Tag_, and so now the server can correctly send the data to
  the client. And the Tag_\ s will match with the database.

  But you have to be careful that different Tag_\ s have different
  UUIDs, or you will have a collision. You can't reuse the same
  UUID over and over again, you have to generate a new one every
  time.

  You can search Google for "uuid generator". I personally
  use `this site <https://www.uuidgenerator.net/version4>`__.

  So, why does this library provide both Tag_ and UUIDTag_?

  * Tag_ works just fine as long as everything is in a single
    process. And it's much more convenient, so it's useful
    when prototyping.

  * Not every use of Tag_ can be replaced with UUIDTag_.
    If you're generating lots of tags dynamically, then you
    have to use Tag_. UUIDTag_ is for tags which are *stable*
    and don't change.

  So the recommendation is that *libraries* that have
  *stable* tags (e.g. interfaces) should use UUIDTag_.
  But not every usage of Tag_ is bad. You will have to
  make that judgement yourself.

----

.. _zip:

* ::

    zip(x: Iterable, [default: Any]) -> Iterable

  ``x`` must be an Iterable_ which contains multiple
  Iterable_\ s.

  This function returns an Iterable_, which is lazy:
  it only generates the values as needed. If you want
  an array, use toArray_.

  This function is **not** lazy for ``x``, but it
  *is* lazy for each Iterable_ in ``x``.

  This function runs in ``O(1)`` time.

  This function returns an Iterable_ which contains
  multiple Tuple_\ s which contain alternating values
  from each Iterable_ in ``x``:

  .. code:: javascript

    // Returns [[1, 4], [2, 5], [3, 6]]
    zip([[1, 2, 3], [4, 5, 6]]);

  You can think of it as being similar to a `real-world zipper <http://en.wikipedia.org/wiki/Zipper>`__.

  It stops when it reaches the end of the smallest Iterable_:

  .. code:: javascript

    // Returns [[1, 4, 7]]
    zip([[1, 2, 3], [4, 5, 6], [7]]);

  But if you provide a second argument, it will be used to fill
  in the missing spots:

  .. code:: javascript

    // Returns [[1, 4, 7], [2, 5, 0], [3, 6, 0]]
    zip([[1, 2, 3], [4, 5, 6], [7]], 0);

  You can undo a zip by simply using zip_ a second time:

  .. code:: javascript

    // Returns [[1, 4], [2, 5], [3, 6]]
    var x = zip([[1, 2, 3], [4, 5, 6]]);

    // Returns [[1, 2, 3], [4, 5, 6]]
    zip(x);

  Using zip_, it's easy to collect all the keys / values
  of a Dict_ or Record_:

  .. code:: javascript

    var x = Record({
      "foo": 1,
      "bar": 2
    });

    // Returns [["bar", "foo"], [2, 1]]
    zip(x);