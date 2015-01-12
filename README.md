How to use
==========

Just load up `build/Immutable.js`. It works with AMD / Require.js, CommonJS / Node.js, or the `Immutable` global variable.

You can find documentation in the `doc` folder.

You can find benchmarks in the `benchmarks` folder.


Quick overview
==============

* `Dict` `SortedDict`

  * `isEmpty` `has` `get` `set` `remove` `removeAll` `modify` `merge`

* `Set` `SortedSet`

  * `isEmpty` `has` `add` `remove` `removeAll` `union` `intersect` `disjoint` `subtract`

* `List`

  * `isEmpty` `size` `has` `get` `set` `insert` `remove` `removeAll` `modify` `slice` `concat`

* `Queue`

  * `isEmpty` `size` `peek` `push` `pop` `concat` `removeAll`

* `Stack`

  * `isEmpty` `size` `peek` `push` `pop` `concat` `removeAll`

* `Tuple`

  * `size` `get` `set` `modify`

* `Record`

  * `get` `set` `modify` `update`

* `Ref`

  * `get` `set` `modify`

* `Iterable`

  * `all` `any` `each` `find` `findIndex` `foldl` `foldr` `indexOf` `join`
    `keep` `map` `partition` `range` `reverse` `take` `toArray`
    `toIterator` `zip`

----

`Dict` and `Set` can have anything as keys, including mutable objects and immutable objects (`Dict`, `Set`, `List`, etc.)

You can also use `SortedDict` and `SortedSet` to define your own custom sorting.

----

Equality is well defined, and is based on [egal](http://home.pipeline.com/~hbaker1/ObjectIdentity.html).

What that means is that mutable objects are only equal if they are exactly the same object, but immutable objects are equal if they have the same value.

These two mutable objects are different, and so they are not equal:

    // false
    equal({ foo: 1 },
          { foo: 1 });

These two immutable objects are different, but they have the same keys/values, and so they are equal:

    // true
    equal(Dict({ foo: 1 }),
          Dict({ foo: 1 }));

This is the only sane default behavior for equality.

----

You can easily convert from JavaScript to Immutable and from Immutable to JavaScript:

    var obj  = { foo: 1 };
    var dict = fromJS(obj);
    var obj  = toJS(dict);

You can also use this to convert from one data type to another:

    var dict   = Dict({ foo: 1 });
    var list   = List(dict);
    var stack  = Stack(list);
    var record = Record(stack);

You can also losslessly convert to/from JSON, allowing for sending Immutable objects over the network:

    var record = Record({ foo: 1 });
    var json   = toJSON(record);
    var record = fromJSON(json);

----

All data types accept an [ECMAScript 6 Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol) and can be used as an ECMAScript 6 Iterable:

    var tuple = Tuple([1, 2, 3]);

    // 1
    // 2
    // 3
    for (var x of tuple) {
      console.log(x);
    }

In addition, the various iteration functions (each, map, zip, etc.) accept and return Iterables:

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

You'll probably need to use `npm install` to get the required dependencies. Every time you make a change to the `src` directory, you have to run `npm install` to rebuild.

Run the benchmarks with `node build/Benchmark.js`. This will take a long time (several minutes, possibly hours).

The unit tests are automatically run when using `npm install`, but you can also run them manually by using `node build/Test.js`.
