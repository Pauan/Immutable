Version 6.4.0
=============

* **New features**

  * Adding in ``Record isEmpty`` method, which returns ``true`` if the Record has no keys / values.

  * Adding in ``Tuple isEmpty`` method, which returns ``true`` if the Tuple has no values.


Version 6.3.0
=============

* **New features**

  * Adding in ``skip`` function, which skips a certain number of values.


Version 6.2.0
=============

* **New features**

  * Adding in ``repeat`` function, which repeats a value a certain number of times.


Version 6.1.1
=============

* **Bug fixes**

  * Using ``List slice`` where the first index is at the end of the list was an error, now it returns an empty list.


Version 6.1.0
=============

* **New features**

  * Adding in ``Record has``.

  * ``Record get`` now has an optional second argument, with the same behavior as ``Dict get``.


Version 6.0.1
=============

* **Bug fixes**

  * Fixing the incorrect behavior of ``Queue peek``.


Version 6.0.0
=============

* **Breaking changes**

  * ``build/Immutable.js`` has been renamed to ``build/Immutable.min.js``.

  * Before, the ``onchange`` function of a ``Ref`` was not called if the
    old and new values were ``===``. Now the ``onchange`` function is
    always called.

    In addition, whatever the ``onchange`` function returns becomes the
    new value. This enables it to do validation, returning the old
    value, or modifying the value before returning it.

    The old system:

    .. code:: javascript

      var ref = Ref(5, function (before, after) {
        // We can't really do much inside of the `onchange` function
        console.log("change", before, after);
      });

      // The `onchange` function is not called, because the old and new values are `===`
      ref.set(5);

      // The `onchange` function is called, but it can't really do much.
      ref.set(10);

    The new system:

    .. code:: javascript

      var ref = Ref(5, function (before, after) {
        // Whatever the `onchange` function returns becomes the new value
        return before + after + 50;
      });

      // The `onchange` function is called
      ref.set(5);

      // returns 60
      ref.get();

      // The `onchange` function is called
      ref.set(10);

      // returns 120
      ref.get();

  * The various constructor functions now use ``arguments.length``
    to check for missing arguments, rather than checking for ``null``.

    To migrate to the new version:

    * ``Dict(null)       -> Dict()``
    * ``List(null)       -> List()``
    * ``Queue(null)      -> Queue()``
    * ``Record(null)     -> Record()``
    * ``Set(null)        -> Set()``
    * ``SortedDict(null) -> SortedDict()``
    * ``SortedSet(null)  -> SortedSet()``
    * ``Stack(null)      -> Stack()``
    * ``Tuple(null)      -> Tuple()``

  * ``List slice``: now uses ``arguments.length`` to check
    for missing arguments, rather than checking for ``null``.
    It also checks that its arguments are numbers.

    To migrate to the new version:

    * ``slice(null)       -> slice()``
    * ``slice(5, null)    -> slice(5)``
    * ``slice(null, 5)    -> slice(0, 5)``
    * ``slice(null, null) -> slice()``

  * ``List remove``: the index argument is now mandatory.

    This was done for consistency with the other ``remove``
    methods.

    To migrate to the new version:

    * ``remove() -> remove(-1)``

  * ``List insert``: swapped the arguments so that the index
    is now the first argument, with the value as the second
    argument. The first argument (index) is now mandatory.

    This was done for consistency with the other methods.

    To migrate to the new version:

    * ``insert(value)        -> push(value)``
    * ``insert(value, index) -> insert(index, value)``

* **New features**

  * ``List push`` is a faster version of ``List insert``
    that only inserts at the end of the list.
