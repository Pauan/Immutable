Version 5.0.0
=============

* **Breaking changes**

  * ``build/Immutable.js`` has been renamed to ``build/Immutable.min.js``.

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
