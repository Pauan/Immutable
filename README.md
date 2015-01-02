How to use
==========

Just load up `build/Immutable.js`. It works with AMD, CommonJS / Node.js, and browser globals.

You can find documentation in the `doc` folder.

You can find benchmarks in the `benchmarks` folder.


Quick overview
==============

* Dict, SortedDict

  * has, get, set, remove, modify, merge

* Set, SortedSet

  * has, add, remove, union, intersect, disjoint, subtract

* List

  * size, has, get, insert, remove, modify, slice, concat

* Queue

  * size, peek, push, pop, concat

* Stack

  * size, peek, push, pop, concat

* Record

  * get, set, modify, update

`Dict` and `Set` can have anything as keys, including mutable objects and immutable objects (`Dict`, `Set`, `List`, etc.)

You can also use `SortedDict` and `SortedSet` to define your own custom sorting.

----

Equality is well defined, and is based on [egal](http://home.pipeline.com/~hbaker1/ObjectIdentity.html). What that means is that mutable objects are only equal if they are exactly the same object, while immutable objects are equal if they have the same value. That means this is true:

    equal(Dict({ foo: 1 }),
          Dict({ foo: 1 }));

Even though they are two different objects, they have the same keys/values, so they are treated as equal. This is the only sane default behavior for equality.

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


For developers
==============

You'll probably need to use `npm install` to get the required dependencies. Every time you make a change to the `src` directory, you have to run `npm install` to rebuild.

Run the benchmarks with `node build/Benchmark.js`. This will take a long time (several minutes, possibly hours).

Run the tests by using `node build/Test.js`.
