How to use
==========

Just load up ``build/Immutable.min.js``. It works with AMD / Require.js, CommonJS / Node.js, or the ``Immutable`` global variable.

You can find documentation in the ``doc/doc.rst`` file.

You can find benchmarks in the ``benchmarks`` folder.


Quick overview
==============

See the documentation for a list of types / functions provided by this library.

----

``Dict`` and ``Set`` can have anything as keys, including mutable objects and immutable objects (``Dict``, ``Set``, ``List``, etc.)

You can also use ``SortedDict`` and ``SortedSet`` to define your own custom sorting.

----

Equality is well defined, and is based on `egal <http://home.pipeline.com/~hbaker1/ObjectIdentity.html>`__.

What that means is that mutable objects are only equal if they are exactly the same object, but immutable objects are equal if they have the same value.

These two mutable objects are different, and so they are not equal:

.. code:: javascript

    // false
    equal({ foo: 1 },
          { foo: 1 });

These two immutable objects are different, but they have the same keys / values, and so they are equal:

.. code:: javascript

    // true
    equal(Dict({ "foo": 1 }),
          Dict({ "foo": 1 }));

This is the only sane default behavior for equality.

----

You can easily convert to / from JavaScript:

.. code:: javascript

    var obj  = { foo: 1 };
    var dict = fromJS(obj);
    var obj  = toJS(dict);

You can also easily convert from one data type to another:

.. code:: javascript

    var dict   = Dict({ "foo": 1 });
    var list   = List(dict);
    var stack  = Stack(list);
    var record = Record(stack);

You can also losslessly convert to / from JSON, allowing for sending immutable objects over the network:

... code:: javascript

    var record1 = Record({ "foo": 1 });
    var json    = toJSON(record);
    var record2 = fromJSON(json);

    // true
    equal(record1, record2);

----

For most operations, if the new value is the same as the old value, then it just returns the old value:

.. code:: javascript

    var dict1 = Dict({
      "foo": 1,
      "bar": 2
    });

    var dict2 = dict1.set("foo", 1);

    // true
    dict2 === dict1;

This means you can use this library with `React <https://facebook.github.io/react/>`__, `Mercury <https://github.com/Raynos/mercury>`__, etc. and it will be **very** fast.

This is also useful anytime you want to efficiently check if something has changed or not:

.. code:: javascript

    var old_value = null;

    // Saving to the database is expensive, so we want to avoid doing it as much as possible
    function save_to_database(value) {
      // Do nothing, the data has not changed
      if (value === old_value) {
        return;
      }

      old_value = value;

      // Save to the database
      ...
    }

In the above function, if the immutable data has not changed, then it will be ``===`` to the old data, so we can avoid doing the expensive save operation.

This should **only** be used as an optimization to speed things up: you should use ``equal`` to test whether two immutable objects are equal or not. How do you determine whether to use ``===`` or ``equal``? If using ``===`` changes the behavior of the program, then you should use ``equal``.

In this case, if the data is ``===``, we can safely choose to not save to the database. And if it's not ``===``, that's fine too: it just means we have to do the expensive save operation. So either way, the behavior is identical. But in a different situation, using ``===`` would change the behavior of the program, and so in that case you should use ``equal`` instead.

----

All data types accept an `ECMAScript 6 Iterable <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol>`__ and can be used as an ECMAScript 6 Iterable:

.. code:: javascript

    var tuple = Tuple([1, 2, 3]);

    // 1
    // 2
    // 3
    for (var x of tuple) {
      console.log(x);
    }

In addition, the various iteration functions (``each``, ``map``, ``zip``, etc.) accept and return Iterables:

.. code:: javascript

    var tuple2 = map(tuple, function (x) {
      return x + 20;
    });

    // 21
    // 22
    // 23
    for (var x of tuple2) {
      console.log(x);
    }


For developers
==============

You'll probably need to use ``npm install`` to get the required dependencies. Every time you make a change to the ``src`` directory, you have to run ``npm install`` to rebuild.

Run the benchmarks with ``node build/Benchmark.js``. This will take a long time (several minutes, possibly hours).

The unit tests are automatically run when using ``npm install``, but you can also run them manually by using ``node build/Test.js``.
