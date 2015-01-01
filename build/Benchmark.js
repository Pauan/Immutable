(function() {
    "use strict";

    var $$Benchmark$$ = {
            get group() {
                return $$Benchmark$$group;
            },

            get message() {
                return $$Benchmark$$message;
            },

            get time() {
                return $$Benchmark$$time;
            },

            get run() {
                return $$Benchmark$$run;
            }
        },
        $$$Immutable$Immutable$$ = {
            get toJS() {
                return $$$Immutable$Immutable$$toJS;
            },

            get simpleSort() {
                return $$$Immutable$Immutable$$simpleSort;
            },

            get defaultSort() {
                return $$$Immutable$Immutable$$defaultSort;
            },

            get equal() {
                return $$$Immutable$Immutable$$equal;
            },

            get isDict() {
                return $$$Immutable$Immutable$$isDict;
            },

            get isSet() {
                return $$$Immutable$Immutable$$isSet;
            },

            get isSortedDict() {
                return $$$Immutable$Immutable$$isSortedDict;
            },

            get isSortedSet() {
                return $$$Immutable$Immutable$$isSortedSet;
            },

            get isList() {
                return $$$Immutable$Immutable$$isList;
            },

            get isQueue() {
                return $$$Immutable$Immutable$$isQueue;
            },

            get isStack() {
                return $$$Immutable$Immutable$$isStack;
            },

            get isImmutable() {
                return $$$Immutable$Immutable$$isImmutable;
            },

            get fromJS() {
                return $$$Immutable$Immutable$$fromJS;
            },

            get SortedDict() {
                return $$$Immutable$Immutable$$SortedDict;
            },

            get SortedSet() {
                return $$$Immutable$Immutable$$SortedSet;
            },

            get Dict() {
                return $$$Immutable$Immutable$$Dict;
            },

            get Set() {
                return $$$Immutable$Immutable$$Set;
            },

            get List() {
                return $$$Immutable$Immutable$$List;
            },

            get Queue() {
                return $$$Immutable$Immutable$$Queue;
            },

            get Stack() {
                return $$$Immutable$Immutable$$Stack;
            }
        };

    var $$Benchmark$$Benchmark = require("benchmark");

    var $$Benchmark$$suite = new $$Benchmark$$Benchmark.Suite({
      // TODO is this correct ?
      onComplete: function () {
        $$Benchmark$$display_messages($$Benchmark$$messages);
      },
      onCycle: function (event) {
        var s = "" + event.target;
        s = s.replace(/^(.+) x ([0-9,\.]+) ops\/sec ±\d+\.\d+% \(\d+ runs sampled\)$/g, function (_, text, num) {
          if (/\./.test(num)) {
            num = "" + Math.round(+num);
          }
          return $$Benchmark$$rpad(text, 30) + $$Benchmark$$lpad(" " + $$Benchmark$$lpad(num, 13) + " ops/sec", 30);
        });
        console.log(s);
      }
    });

    function $$Benchmark$$repeat(i, x) {
      return new Array(i + 1).join(x);
    }

    function $$Benchmark$$rpad(x, i) {
      return (x + $$Benchmark$$repeat(i, " ")).slice(0, i);
    }

    function $$Benchmark$$lpad(x, i) {
      return ($$Benchmark$$repeat(i, " ") + x).slice(-i);
    }


    var $$Benchmark$$indent = 0;
    var $$Benchmark$$timers = [];
    var $$Benchmark$$messages = [];

    function $$Benchmark$$display_messages(a) {
      a.forEach(function (x) {
        console.log(x);
      });
    }

    function $$Benchmark$$add_timers() {
      var max = 0;

      $$Benchmark$$timers.forEach(function (x) {
        max = Math.max(max, x.name.length);
      });

      $$Benchmark$$timers.forEach(function (x) {
        $$Benchmark$$suite.add($$Benchmark$$repeat($$Benchmark$$indent, " ") + $$Benchmark$$rpad(x.name, max), x.fn, {
          onStart: function () {
            $$Benchmark$$display_messages(x.messages);
          }
        });
      });
    }

    function $$Benchmark$$group(name, f) {
      $$Benchmark$$message($$Benchmark$$repeat(60 - $$Benchmark$$indent, "-"));
      $$Benchmark$$message(name + ":");

      var old_indent = $$Benchmark$$indent;
      var old_timers = $$Benchmark$$timers;

      $$Benchmark$$indent += 2;
      $$Benchmark$$timers = [];

      try {
        f();
      } finally {
        $$Benchmark$$add_timers();
        $$Benchmark$$indent = old_indent;
        $$Benchmark$$timers = old_timers;
      }
    }

    function $$Benchmark$$message(x) {
      $$Benchmark$$messages.push($$Benchmark$$repeat($$Benchmark$$indent, " ") + x);
    }

    function $$Benchmark$$time(s, f) {
      // This is to make sure that the function doesn't
      // have any errors before benchmarking it
      f();

      var a = $$Benchmark$$messages;
      $$Benchmark$$messages = [];

      $$Benchmark$$timers.push({
        name: s,
        fn: f,
        messages: a
      });
    }

    function $$Benchmark$$run() {
      $$Benchmark$$add_timers();
      $$Benchmark$$suite.run();
    }
    var $$hash$$hash_interface = "__CFB38D33-7CD8-419E-A1B6-61D1B8AC7C83_hash__";

    var $$hash$$mutable_hash_id = 0;

    function $$hash$$hash(x) {
      var type = typeof x;
      // TODO this is probably pretty inefficient
      if (type === "string") {
        return "\"" + x.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"").replace(/\n/g, "\n ") + "\"";

      } else if (type === "number"    ||
                 type === "boolean"   ||
                 type === "undefined" ||
                 x === null) {
        return "" + x;

      } else {
        var hasher = x[$$hash$$hash_interface];
        if (hasher != null) {
          return hasher(x);

        } else {
          var id = "(Mutable " + (++$$hash$$mutable_hash_id) + ")";

          Object.defineProperty(x, $$hash$$hash_interface, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
              return id;
            }
          });

          return id;
        }
      }
    }
    function $$util$$isObject(x) {
      return Object(x) === x;
    }

    function $$util$$isJSLiteral(x) {
      if ($$util$$isObject(x)) {
        var proto = Object.getPrototypeOf(x);
        // TODO this won't work cross-realm
        return proto === null || proto === Object.prototype;
      } else {
        return false;
      }
    }

    function $$util$$repeat(s, i) {
      return new Array(i + 1).join(s);
    }

    function $$util$$pad_right(input, i, s) {
      var right = Math.max(0, i - input.length);
      return input + $$util$$repeat(s, right);
    }

    function $$util$$join_lines(a, spaces) {
      if (a.length) {
        var separator = "\n" + spaces;
        return separator + a.map(function (x) {
          return x.replace(/\n/g, separator);
        }).join(separator);
      } else {
        return "";
      }
    }
    var $$toJS$$toJS_interface = "__DEE5921D-20A6-40D0-9A74-40C5BAC8C663_toJS__";

    function $$toJS$$toJS(x) {
      if ($$util$$isObject(x)) {
        var fn = x[$$toJS$$toJS_interface];
        if (fn != null) {
          return fn(x);
        } else {
          return x;
        }
      } else {
        return x;
      }
    }

    function $$toJS$$toJS_object(x) {
      var o = {};

      x.forEach(function (_array) {
        var key   = _array[0];
        var value = _array[1];

        // TODO use isString test ?
        if (typeof key !== "string") {
          throw new Error("Cannot convert to JavaScript: expected string key but got " + key);
        }

        o[key] = $$toJS$$toJS(value);
      });

      return o;
    }

    function $$toJS$$toJS_array(x) {
      var a = [];

      x.forEach(function (value) {
        a.push($$toJS$$toJS(value));
      });

      return a;
    }
    var $$$Immutable$nil$$nil = {};
    $$$Immutable$nil$$nil.depth      = 0;
    $$$Immutable$nil$$nil.size       = 0;
    $$$Immutable$nil$$nil.forEach    = function (f) {};
    $$$Immutable$nil$$nil.forEachRev = function (f) {};
    function $$AVL$$max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }

    function $$AVL$$balanced_node(node, left, right) {
      var l_depth = left.depth;
      var r_depth = right.depth;

      // Left side is deeper
      if (l_depth > r_depth + 1) {
        var lleft  = left.left;
        var lright = left.right;

        // Right side is deeper
        if (lright.depth > lleft.depth) {
          // Left rotate -> Right rotate
          return lright.copy(left.copy(lleft, lright.left),
                             node.copy(lright.right, right));

        // Left side is deeper
        } else {
          // Right rotate
          return left.copy(lleft, node.copy(lright, right));
        }

      // Right side is deeper
      } else if (r_depth > l_depth + 1) {
        var rright = right.right;
        var rleft  = right.left;

        // Left side is deeper
        if (rleft.depth > rright.depth) {
          // Right rotate -> Left rotate
          return rleft.copy(node.copy(left, rleft.left),
                            right.copy(rleft.right, rright));

        // Right side is deeper
        } else {
          // Left rotate
          return right.copy(node.copy(left, rleft), rright);
        }

      // No balancing needed
      } else {
        return node.copy(left, right);
      }
    }

    function $$AVL$$concat(x, y) {
      if (x === $$$Immutable$nil$$nil) {
        return y;

      } else if (y === $$$Immutable$nil$$nil) {
        return x;

      // TODO what if the depths are the same?
      } else if (x.depth < y.depth) {
        var left = $$AVL$$concat(x, y.left);
        return $$AVL$$balanced_node(y, left, y.right);

      } else {
        var right = $$AVL$$concat(x.right, y);
        return $$AVL$$balanced_node(x, x.left, right);
      }
    }

    function $$AVL$$insert_min(node, new_node) {
      if (node === $$$Immutable$nil$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, $$AVL$$insert_min(node.left, new_node), node.right);
      }
    }

    function $$AVL$$insert_max(node, new_node) {
      if (node === $$$Immutable$nil$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, node.left, $$AVL$$insert_max(node.right, new_node));
      }
    }
    function $$Sorted$$simpleSort(x, y) {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else {
        return 1;
      }
    }

    function $$Sorted$$defaultSort(x, y) {
      x = $$hash$$hash(x);
      y = $$hash$$hash(y);
      return $$Sorted$$simpleSort(x, y);
    }

    function $$Sorted$$key_get(node, sort, key) {
      while (node !== $$$Immutable$nil$$nil) {
        var order = sort(key, node.key);
        if (order === 0) {
          break;

        } else if (order < 0) {
          node = node.left;

        } else {
          node = node.right;
        }
      }

      return node;
    }

    function $$Sorted$$key_set(node, sort, key, new_node) {
      if (node === $$$Immutable$nil$$nil) {
        return new_node;

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(key, node.key);
        if (order === 0) {
          return node.modify(new_node);

        } else if (order < 0) {
          var child = $$Sorted$$key_set(left, sort, key, new_node);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Sorted$$key_set(right, sort, key, new_node);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Sorted$$key_modify(node, sort, key, f) {
      if (node === $$$Immutable$nil$$nil) {
        throw new Error("Key " + key + " not found");

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(key, node.key);
        if (order === 0) {
          // TODO what if `f` suspends?
          return node.modify({ key: key, value: f(node.value) });

        } else if (order < 0) {
          var child = $$Sorted$$key_modify(left, sort, key, f);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Sorted$$key_modify(right, sort, key, f);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Sorted$$key_remove(node, sort, key) {
      if (node === $$$Immutable$nil$$nil) {
        return node;

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(key, node.key);
        if (order === 0) {
          return $$AVL$$concat(left, right);

        } else if (order < 0) {
          var child = $$Sorted$$key_remove(left, sort, key);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Sorted$$key_remove(right, sort, key);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }
    var $$ImmutableBase$$ImmutableBase = {};

    $$ImmutableBase$$ImmutableBase.toString = function () {
      return $$hash$$hash(this);
    };

    $$ImmutableBase$$ImmutableBase.inspect = $$ImmutableBase$$ImmutableBase.toString;

    function $$ImmutableDict$$KeyNode(left, right, key, value) {
      this.left  = left;
      this.right = right;
      this.key   = key;
      this.value = value;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$ImmutableDict$$KeyNode.prototype.copy = function (left, right) {
      return new $$ImmutableDict$$KeyNode(left, right, this.key, this.value);
    };

    $$ImmutableDict$$KeyNode.prototype.modify = function (info) {
      var key   = info.key;
      var value = info.value;
      // We don't use equal, for increased speed
      if (this.key === key && this.value === value) {
        return this;
      } else {
        return new $$ImmutableDict$$KeyNode(this.left, this.right, key, value);
      }
    };

    $$ImmutableDict$$KeyNode.prototype.forEach = function (f) {
      this.left.forEach(f);
      f([this.key, this.value]);
      this.right.forEach(f);
    };


    function $$ImmutableDict$$ImmutableDict(root, sort) {
      this.root = root;
      this.sort = sort;
      this.hash = null;
    }

    $$ImmutableDict$$ImmutableDict.prototype = Object.create($$ImmutableBase$$ImmutableBase);

    $$ImmutableDict$$ImmutableDict.prototype[$$hash$$hash_interface] = function (x) {
      if (x.hash === null) {
        var a = [];

        var max_key = 0;

        x.forEach(function (_array) {
          var key   = $$hash$$hash(_array[0]);
          var value = $$hash$$hash(_array[1]);

          key = key.split(/\n/);

          key.forEach(function (key) {
            max_key = Math.max(max_key, key.length);
          });

          a.push({
            key: key,
            value: value
          });
        });

        var spaces = "  ";

        a = a.map(function (x) {
          var last = x.key.length - 1;
          x.key[last] = $$util$$pad_right(x.key[last], max_key, " ");

          var key = x.key.join("\n");

          var value = x.value.replace(/\n/g, "\n" + $$util$$repeat(" ", max_key + 3));

          return key + " = " + value;
        });

        // We don't use equal, for increased speed
        if (x.sort === $$Sorted$$defaultSort) {
          x.hash = "(Dict" + $$util$$join_lines(a, spaces) + ")";
        } else {
          x.hash = "(SortedDict " + $$hash$$hash(x.sort) + $$util$$join_lines(a, spaces) + ")";
        }
      }

      return x.hash;
    };

    $$ImmutableDict$$ImmutableDict.prototype[$$toJS$$toJS_interface] = $$toJS$$toJS_object;

    // TODO Symbol.iterator
    $$ImmutableDict$$ImmutableDict.prototype.forEach = function (f) {
      this.root.forEach(f);
    };

    $$ImmutableDict$$ImmutableDict.prototype.isEmpty = function () {
      return this.root === $$$Immutable$nil$$nil;
    };

    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.has = function (key) {
      return $$Sorted$$key_get(this.root, this.sort, key) !== $$$Immutable$nil$$nil;
    };

    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.get = function (key, def) {
      var node = $$Sorted$$key_get(this.root, this.sort, key);
      if (node === $$$Immutable$nil$$nil) {
        if (arguments.length === 2) {
          return def;
        } else {
          throw new Error("Key " + key + " not found");
        }
      } else {
        return node.value;
      }
    };

    // TODO code duplication
    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.set = function (key, value) {
      var root = this.root;
      var sort = this.sort;
      var node = $$Sorted$$key_set(root, sort, key, new $$ImmutableDict$$KeyNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, key, value));
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableDict$$ImmutableDict(node, sort);
      }
    };

    // TODO code duplication
    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.remove = function (key) {
      var root = this.root;
      var sort = this.sort;
      var node = $$Sorted$$key_remove(root, sort, key);
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableDict$$ImmutableDict(node, sort);
      }
    };

    // TODO code duplication
    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.modify = function (key, f) {
      var root = this.root;
      var sort = this.sort;
      var node = $$Sorted$$key_modify(root, sort, key, f);
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableDict$$ImmutableDict(node, sort);
      }
    };

    function $$ImmutableSet$$SetNode(left, right, key) {
      this.left  = left;
      this.right = right;
      this.key   = key;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$ImmutableSet$$SetNode.prototype.copy = function (left, right) {
      return new $$ImmutableSet$$SetNode(left, right, this.key);
    };

    $$ImmutableSet$$SetNode.prototype.modify = function (info) {
      var key = info.key;
      // We don't use equal, for increased speed
      if (this.key === key) {
        return this;
      } else {
        return new $$ImmutableSet$$SetNode(this.left, this.right, key);
      }
    };

    $$ImmutableSet$$SetNode.prototype.forEach = function (f) {
      this.left.forEach(f);
      f(this.key);
      this.right.forEach(f);
    };


    function $$ImmutableSet$$ImmutableSet(root, sort) {
      this.root = root;
      this.sort = sort;
      this.hash = null;
    }

    $$ImmutableSet$$ImmutableSet.prototype = Object.create($$ImmutableBase$$ImmutableBase);

    $$ImmutableSet$$ImmutableSet.prototype[$$hash$$hash_interface] = function (x) {
      if (x.hash === null) {
        var a = [];

        x.forEach(function (value) {
          a.push($$hash$$hash(value));
        });

        var spaces = "  ";

        // We don't use equal, for increased speed
        if (x.sort === $$Sorted$$defaultSort) {
          x.hash = "(Set" + $$util$$join_lines(a, spaces) + ")";
        } else {
          x.hash = "(SortedSet " + $$hash$$hash(x.sort) + $$util$$join_lines(a, spaces) + ")";
        }
      }

      return x.hash;
    };

    $$ImmutableSet$$ImmutableSet.prototype[$$toJS$$toJS_interface] = $$toJS$$toJS_array;

    // TODO code duplication with ImmutableDict
    // TODO Symbol.iterator
    $$ImmutableSet$$ImmutableSet.prototype.forEach = function (f) {
      this.root.forEach(f);
    };

    // TODO code duplication with ImmutableDict
    $$ImmutableSet$$ImmutableSet.prototype.isEmpty = function () {
      return this.root === $$$Immutable$nil$$nil;
    };

    // TODO code duplication with ImmutableDict
    // TODO what if `sort` suspends ?
    $$ImmutableSet$$ImmutableSet.prototype.has = function (key) {
      return $$Sorted$$key_get(this.root, this.sort, key) !== $$$Immutable$nil$$nil;
    };

    // TODO what if `sort` suspends ?
    $$ImmutableSet$$ImmutableSet.prototype.add = function (key) {
      var root = this.root;
      var sort = this.sort;
      var node = $$Sorted$$key_set(root, sort, key, new $$ImmutableSet$$SetNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, key));
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableSet$$ImmutableSet(node, sort);
      }
    };

    // TODO what if `sort` suspends ?
    $$ImmutableSet$$ImmutableSet.prototype.remove = function (key) {
      var root = this.root;
      var sort = this.sort;
      var node = $$Sorted$$key_remove(root, sort, key);
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableSet$$ImmutableSet(node, sort);
      }
    };

    $$ImmutableSet$$ImmutableSet.prototype.union = function (other) {
      var self = this;

      // TODO iterator
      other.forEach(function (value) {
        self = self.add(value);
      });

      return self;
    };

    $$ImmutableSet$$ImmutableSet.prototype.intersect = function (other) {
      var self = this;
      if (self.root === $$$Immutable$nil$$nil) {
        return self;

      } else {
        var out = new $$ImmutableSet$$ImmutableSet($$$Immutable$nil$$nil, self.sort);

        // TODO iterator
        other.forEach(function (value) {
          if (self.has(value)) {
            out = out.add(value);
          }
        });

        return out;
      }
    };

    $$ImmutableSet$$ImmutableSet.prototype.disjoint = function (other) {
      var self = this;

      // TODO iterator
      other.forEach(function (value) {
        if (self.has(value)) {
          self = self.remove(value);
        } else {
          self = self.add(value);
        }
      });

      return self;
    };

    // TODO what about the empty set ?
    $$ImmutableSet$$ImmutableSet.prototype.subtract = function (other) {
      var self = this;

      if (self.root !== $$$Immutable$nil$$nil) {
        // TODO iterator
        other.forEach(function (value) {
          self = self.remove(value);
        });
      }

      return self;
    };
    function $$$Immutable$Array$$copy(array) {
      var len = array.length;
      var out = new Array(len);

      for (var i = 0; i < len; ++i) {
        out[i] = array[i];
      }

      return out;
    }

    function $$$Immutable$Array$$insert(array, index, value) {
      var len = array.length + 1;

      var out = new Array(len);

      var i = 0;
      while (i < index) {
        out[i] = array[i];
        ++i;
      }

      out[i] = value;
      ++i;

      while (i < len) {
        out[i] = array[i - 1];
        ++i;
      }

      return out;
    }

    function $$$Immutable$Array$$modify(array, index, f) {
      var old_value = array[index];
      var new_value = f(old_value);

      if (old_value === new_value) {
        return array;

      } else {
        var new_array = $$$Immutable$Array$$copy(array);
        new_array[index] = new_value;
        return new_array;
      }
    }

    function $$$Immutable$Array$$remove(array, index) {
      var len = array.length - 1;

      var out = new Array(len);

      var i = 0;
      while (i < index) {
        out[i] = array[i];
        ++i;
      }

      while (i < len) {
        out[i] = array[i + 1];
        ++i;
      }

      return out;
    }
    function $$$Immutable$Cons$$Cons(car, cdr) {
      this.car = car;
      this.cdr = cdr;
    }

    $$$Immutable$Cons$$Cons.prototype.forEach = function (f) {
      var self = this;
      while (self !== $$$Immutable$nil$$nil) {
        f(self.car);
        self = self.cdr;
      }
    };

    // TODO this isn't tail recursive
    $$$Immutable$Cons$$Cons.prototype.forEachRev = function (f) {
      this.cdr.forEachRev(f);
      f(this.car);
    };


    // It's faster to use arrays for small lists
    var $$ImmutableList$$array_limit = 125;

    var $$ImmutableList$$ceiling = Math.ceil;
    var $$ImmutableList$$floor   = Math.floor;


    function $$ImmutableList$$add_slice(slices, slice) {
      if (slices.length) {
        var last = slices[slices.length - 1];
        if (last.length + slice.length <= $$ImmutableList$$array_limit) {
          slices[slices.length - 1] = last.concat(slice);
        } else {
          slices.push(slice);
        }
      } else {
        slices.push(slice);
      }
    }

    function $$ImmutableList$$slices_to_tree1(slices, min, max) {
      if (min < max) {
        var pivot = $$ImmutableList$$floor((min + max) / 2);
        var left  = $$ImmutableList$$slices_to_tree1(slices, min, pivot);
        var right = $$ImmutableList$$slices_to_tree1(slices, pivot + 1, max);
        return new $$ImmutableList$$ArrayNode(left, right, slices[pivot]);
      } else {
        return $$$Immutable$nil$$nil;
      }
    }

    function $$ImmutableList$$slices_to_tree(slices) {
      return $$ImmutableList$$slices_to_tree1(slices, 0, slices.length);
    }

    // TODO move this into Array.js ?
    function $$ImmutableList$$array_slice(array, from, to) {
      if (from < 0) {
        from = 0;
      }

      var len = array.length;
      if (to > len) {
        to = len;
      }

      if (from === 0 && to === len) {
        return array;
      } else {
        return array.slice(from, to);
      }
    }


    // Converts a stack (reversed cons) into an array
    function $$ImmutableList$$stack_to_array(a, size) {
      var out = new Array(size);

      while (size--) {
        out[size] = a.car;
        a = a.cdr;
      }

      return out;
    }

    function $$ImmutableList$$stack_nth(a, size, i) {
      while (--size !== i) {
        a = a.cdr;
      }

      return a.car;
    }


    function $$ImmutableList$$ArrayNode(left, right, array) {
      this.left  = left;
      this.right = right;
      this.array = array;
      this.size  = left.size + right.size + array.length;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$ImmutableList$$ArrayNode.prototype.copy = function (left, right) {
      return new $$ImmutableList$$ArrayNode(left, right, this.array);
    };

    $$ImmutableList$$ArrayNode.prototype.forEach = function (f) {
      this.left.forEach(f);
      this.array.forEach(function (x) {
        f(x);
      });
      this.right.forEach(f);
    };


    function $$ImmutableList$$nth_has(index, len) {
      return index >= 0 && index < len;
    }

    function $$ImmutableList$$nth_get(node, index) {
      for (;;) {
        var left    = node.left;
        var l_index = left.size;

        if (index < l_index) {
          node = left;

        } else {
          index -= l_index;

          var array = node.array;
          var len   = array.length;
          if (index < len) {
            return array[index];

          } else {
            index -= len;
            node  = node.right;
          }
        }
      }
    }

    function $$ImmutableList$$nth_insert(node, index, value) {
      // TODO is this necessary ?
      if (node === $$$Immutable$nil$$nil) {
        return new $$ImmutableList$$ArrayNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, [value]);

      } else {
        var left    = node.left;
        var right   = node.right;
        var l_index = left.size;

        if (index < l_index) {
          var child = $$ImmutableList$$nth_insert(left, index, value);
          return $$AVL$$balanced_node(node, child, right);

        } else {
          index -= l_index;

          var array = node.array;
          var len   = array.length;
          // TODO test this
          if (index <= len) {
            array = $$$Immutable$Array$$insert(array, index, value);

            // TODO this fails when array_limit is 1
            if (len === $$ImmutableList$$array_limit) {
              var pivot  = $$ImmutableList$$ceiling(array.length / 2);
              var aleft  = array.slice(0, pivot);
              var aright = array.slice(pivot);

              if (left.depth < right.depth) {
                return new $$ImmutableList$$ArrayNode($$AVL$$insert_max(left, new $$ImmutableList$$ArrayNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, aleft)), right, aright);
              } else {
                return new $$ImmutableList$$ArrayNode(left, $$AVL$$insert_min(right, new $$ImmutableList$$ArrayNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, aright)), aleft);
              }

            } else {
              return new $$ImmutableList$$ArrayNode(left, right, array);
            }

          } else {
            var child = $$ImmutableList$$nth_insert(right, index - len, value);
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$ImmutableList$$nth_modify(node, index, f) {
      var left    = node.left;
      var right   = node.right;
      var l_index = left.size;

      if (index < l_index) {
        var child = $$ImmutableList$$nth_modify(left, index, f);
        if (child === left) {
          return node;
        } else {
          return node.copy(child, right); // TODO test this
        }

      } else {
        index -= l_index;

        var array = node.array;
        var len   = array.length;
        // TODO test this
        if (index < len) {
          var new_array = $$$Immutable$Array$$modify(array, index, f);
          if (new_array === array) {
            return node;
          } else {
            return new $$ImmutableList$$ArrayNode(left, right, new_array);
          }

        } else {
          var child = $$ImmutableList$$nth_modify(right, index - len, f);
          if (child === right) {
            return node;
          } else {
            return node.copy(left, child); // TODO test this
          }
        }
      }
    }

    function $$ImmutableList$$nth_remove(node, index) {
      var left    = node.left;
      var right   = node.right;
      var l_index = left.size;

      if (index < l_index) {
        var child = $$ImmutableList$$nth_remove(left, index);
        return $$AVL$$balanced_node(node, child, right);

      } else {
        index -= l_index;

        var array = node.array;
        var len   = array.length;
        // TODO test this
        if (index < len) {
          // TODO use `array.length === 1` so we can skip the call to `array_remove`
          array = $$$Immutable$Array$$remove(array, index);

          if (array.length === 0) {
            return $$AVL$$concat(left, right);
          } else {
            return new $$ImmutableList$$ArrayNode(left, right, array);
          }

        } else {
          var child = $$ImmutableList$$nth_remove(right, index - len);
          return $$AVL$$balanced_node(node, left, child);
        }
      }
    }

    function $$ImmutableList$$nth_slice(slices, node, from, to) {
      if (node !== $$$Immutable$nil$$nil) {
        var left = node.left;
        var size = left.size;

        if (from < size) {
          $$ImmutableList$$nth_slice(slices, left, from, to);
        }

        var array = node.array;
        var len   = array.length;

        from -= size;
        to   -= size;

        if (from < len && to > 0) {
          $$ImmutableList$$add_slice(slices, $$ImmutableList$$array_slice(array, from, to));
        }

        if (to > len) {
          $$ImmutableList$$nth_slice(slices, node.right, from - len, to - len);
        }
      }
    }


    function $$ImmutableList$$ImmutableList(root, tail, tail_size) {
      this.root = root;
      this.tail = tail;
      this.tail_size = tail_size;
      this.hash = null;
    }

    $$ImmutableList$$ImmutableList.prototype = Object.create($$ImmutableBase$$ImmutableBase);

    $$ImmutableList$$ImmutableList.prototype[$$hash$$hash_interface] = function (x) {
      if (x.hash === null) {
        var a = [];

        x.forEach(function (x) {
          a.push($$hash$$hash(x));
        });

        x.hash = "(List" + $$util$$join_lines(a, "  ") + ")";
      }

      return x.hash;
    };

    $$ImmutableList$$ImmutableList.prototype[$$toJS$$toJS_interface] = $$toJS$$toJS_array;

    // TODO Symbol.iterator
    $$ImmutableList$$ImmutableList.prototype.forEach = function (f) {
      this.root.forEach(f);
      this.tail.forEachRev(f);
    };

    $$ImmutableList$$ImmutableList.prototype.isEmpty = function () {
      return this.root === $$$Immutable$nil$$nil && this.tail === $$$Immutable$nil$$nil;
    };

    $$ImmutableList$$ImmutableList.prototype.size = function () {
      return this.root.size + this.tail_size;
    };

    $$ImmutableList$$ImmutableList.prototype.has = function (index) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      return $$ImmutableList$$nth_has(index, len);
    };

    $$ImmutableList$$ImmutableList.prototype.get = function (index, def) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      if ($$ImmutableList$$nth_has(index, len)) {
        var root = this.root;
        var size = root.size;
        if (index < size) {
          return $$ImmutableList$$nth_get(root, index);
        } else {
          return $$ImmutableList$$stack_nth(this.tail, this.tail_size, index - size);
        }

      } else if (arguments.length === 2) {
        return def;

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$ImmutableList$$ImmutableList.prototype.insert = function (value, index) {
      if (arguments.length === 1) {
        index = -1;
      }

      var len = this.size();

      if (index < 0) {
        index += (len + 1);
      }

      var root      = this.root;
      var tail      = this.tail;
      var tail_size = this.tail_size;
      if (index === len) {
        if (tail_size === $$ImmutableList$$array_limit) {
          var node = $$AVL$$insert_max(root, new $$ImmutableList$$ArrayNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, $$ImmutableList$$stack_to_array(tail, tail_size)));
          return new $$ImmutableList$$ImmutableList(node, new $$$Immutable$Cons$$Cons(value, $$$Immutable$nil$$nil), 1);

        } else {
          return new $$ImmutableList$$ImmutableList(root, new $$$Immutable$Cons$$Cons(value, tail), tail_size + 1);
        }

      } else if ($$ImmutableList$$nth_has(index, len)) {
        var size = root.size;
        // TODO should this be <= ?
        if (index < size) {
          return new $$ImmutableList$$ImmutableList($$ImmutableList$$nth_insert(root, index, value), tail, tail_size);

        } else {
          var array = $$$Immutable$Array$$insert($$ImmutableList$$stack_to_array(tail, tail_size), index - size, value);
          var node  = $$AVL$$insert_max(root, new $$ImmutableList$$ArrayNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, array));
          return new $$ImmutableList$$ImmutableList(node, $$$Immutable$nil$$nil, 0);
        }

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$ImmutableList$$ImmutableList.prototype.remove = function (index) {
      if (arguments.length === 0) {
        index = -1;
      }

      var len = this.size();

      if (index < 0) {
        index += len;
      }

      var root      = this.root;
      var tail      = this.tail;
      var tail_size = this.tail_size;

      if (tail !== $$$Immutable$nil$$nil && index === len - 1) {
        return new $$ImmutableList$$ImmutableList(root, tail.cdr, tail_size - 1);

      } else if ($$ImmutableList$$nth_has(index, len)) {
        var size = root.size;
        if (index < size) {
          return new $$ImmutableList$$ImmutableList($$ImmutableList$$nth_remove(root, index), tail, tail_size);

        } else {
          var array = $$$Immutable$Array$$remove($$ImmutableList$$stack_to_array(tail, tail_size), index - size);
          var node  = $$AVL$$insert_max(root, new $$ImmutableList$$ArrayNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, array));
          return new $$ImmutableList$$ImmutableList(node, $$$Immutable$nil$$nil, 0);
        }

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$ImmutableList$$ImmutableList.prototype.modify = function (index, f) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      if ($$ImmutableList$$nth_has(index, len)) {
        var root = this.root;
        var tail = this.tail;
        var tail_size = this.tail_size;
        var size = root.size;

        if (tail !== $$$Immutable$nil$$nil && index === len - 1) {
          var value = f(tail.car);
          if (value === tail.car) {
            return this;
          } else {
            return new $$ImmutableList$$ImmutableList(root, new $$$Immutable$Cons$$Cons(value, tail.cdr), tail_size);
          }

        } else if (index < size) {
          var node = $$ImmutableList$$nth_modify(root, index, f);
          if (node === root) {
            return this;
          } else {
            return new $$ImmutableList$$ImmutableList(node, tail, tail_size);
          }

        } else {
          var stack = $$ImmutableList$$stack_to_array(tail, tail_size);
          var array = $$$Immutable$Array$$modify(stack, index - size, f);
          if (array === stack) {
            return this;
          } else {
            var node = $$AVL$$insert_max(root, new $$ImmutableList$$ArrayNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, array));
            return new $$ImmutableList$$ImmutableList(node, $$$Immutable$nil$$nil, 0);
          }
        }

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$ImmutableList$$ImmutableList.prototype.slice = function (from, to) {
      var len = this.size();

      if (from == null) {
        from = 0;
      }
      if (to == null) {
        to = len;
      }

      if (from < 0) {
        from += len;
      }
      if (to < 0) {
        to += len;
      }

      if (from === 0 && to === len) {
        return this;

      } else if (from > to) {
        throw new Error("Index " + from + " is greater than index " + to);

      } else if ($$ImmutableList$$nth_has(from, len)) {
        if (from === to) {
          return new $$ImmutableList$$ImmutableList($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, 0);

        // TODO code duplication with nth_has ?
        } else if (to > 0 && to <= len) {
          var root = this.root;
          var size = root.size;

          var slices = [];

          if (from <= size) {
            $$ImmutableList$$nth_slice(slices, root, from, to);
          }

          if (to > size) {
            var stack = $$ImmutableList$$stack_to_array(this.tail, this.tail_size);
            $$ImmutableList$$add_slice(slices, $$ImmutableList$$array_slice(stack, from - size, to - size));
          }

          return new $$ImmutableList$$ImmutableList($$ImmutableList$$slices_to_tree(slices), $$$Immutable$nil$$nil, 0);

        } else {
          throw new Error("Index " + to + " is not valid");
        }

      } else {
        throw new Error("Index " + from + " is not valid");
      }
    };

    $$ImmutableList$$ImmutableList.prototype.concat = function (right) {
      if (right instanceof $$ImmutableList$$ImmutableList) {
        var lroot = this.root;
        var ltail = this.tail;

        var rroot = right.root;
        var rtail = right.tail;

        if (rroot === $$$Immutable$nil$$nil && rtail === $$$Immutable$nil$$nil) {
          return this;

        } else if (lroot === $$$Immutable$nil$$nil && ltail === $$$Immutable$nil$$nil) {
          return right;

        } else {
          if (ltail !== $$$Immutable$nil$$nil) {
            lroot = $$AVL$$insert_max(lroot, new $$ImmutableList$$ArrayNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, $$ImmutableList$$stack_to_array(ltail, this.tail_size)));
          }

          var node = $$AVL$$concat(lroot, rroot);
          return new $$ImmutableList$$ImmutableList(node, rtail, right.tail_size);
        }

      } else {
        var self = this;

        // TODO use iterator
        right.forEach(function (x) {
          self = self.insert(x);
        });

        return self;
      }
    };

    /*ImmutableList.prototype.push = function (value) {
      var root      = this.root;
      var tail      = this.tail;
      var tail_size = this.tail_size;

      if (tail_size === array_limit) {
        var node = insert_max(root, new ArrayNode(nil, nil, stack_to_array(tail, tail_size)));
        return new ImmutableList(node, new Cons(value, nil), 1);
      } else {
        return new ImmutableList(root, new Cons(value, tail), tail_size + 1);
      }
    };*/;
    function $$ImmutableQueue$$ImmutableQueue(left, right, len) {
      this.left  = left;
      this.right = right;
      this.len   = len;
      this.hash  = null;
    }

    $$ImmutableQueue$$ImmutableQueue.prototype = Object.create($$ImmutableBase$$ImmutableBase);

    $$ImmutableQueue$$ImmutableQueue.prototype[$$toJS$$toJS_interface] = $$toJS$$toJS_array;

    $$ImmutableQueue$$ImmutableQueue.prototype.isEmpty = function () {
      return this.left === $$$Immutable$nil$$nil && this.right === $$$Immutable$nil$$nil;
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.forEach = function (f) {
      this.left.forEach(f);
      this.right.forEachRev(f);
    };

    $$ImmutableQueue$$ImmutableQueue.prototype[$$hash$$hash_interface] = function (x) {
      if (x.hash === null) {
        var a = [];

        x.forEach(function (x) {
          a.push($$hash$$hash(x));
        });

        x.hash = "(Queue" + $$util$$join_lines(a, "  ") + ")";
      }

      return x.hash;
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.size = function () {
      return this.len;
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.peek = function (def) {
      if (this.isEmpty()) {
        if (arguments.length === 1) {
          return def;
        } else {
          throw new Error("Cannot peek from an empty queue");
        }
      } else {
        return this.left.car;
      }
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.push = function (value) {
      if (this.isEmpty()) {
        return new $$ImmutableQueue$$ImmutableQueue(new $$$Immutable$Cons$$Cons(value, this.left), this.right, this.len + 1);
      } else {
        return new $$ImmutableQueue$$ImmutableQueue(this.left, new $$$Immutable$Cons$$Cons(value, this.right), this.len + 1);
      }
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.pop = function () {
      if (this.isEmpty()) {
        throw new Error("Cannot pop from an empty queue");
      } else {
        var left = this.left.cdr;
        if (left === $$$Immutable$nil$$nil) {
          var right = $$$Immutable$nil$$nil;

          this.right.forEach(function (x) {
            right = new $$$Immutable$Cons$$Cons(x, right);
          });

          return new $$ImmutableQueue$$ImmutableQueue(right, $$$Immutable$nil$$nil, this.len - 1);
        } else {
          return new $$ImmutableQueue$$ImmutableQueue(left, this.right, this.len - 1);
        }
      }
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.concat = function (right) {
      var self = this;

      right.forEach(function (x) {
        self = self.push(x);
      });

      return self;
    };
    function $$ImmutableStack$$ImmutableStack(root, len) {
      this.root = root;
      this.len  = len;
      this.hash = null;
    }

    $$ImmutableStack$$ImmutableStack.prototype = Object.create($$ImmutableBase$$ImmutableBase);

    $$ImmutableStack$$ImmutableStack.prototype[$$toJS$$toJS_interface] = $$toJS$$toJS_array;

    // TODO code duplication with ImmutableSet
    $$ImmutableStack$$ImmutableStack.prototype.isEmpty = function () {
      return this.root === $$$Immutable$nil$$nil;
    };

    // TODO code duplication
    $$ImmutableStack$$ImmutableStack.prototype[$$hash$$hash_interface] = function (x) {
      if (x.hash === null) {
        var a = [];

        x.forEach(function (x) {
          a.push($$hash$$hash(x));
        });

        x.hash = "(Stack" + $$util$$join_lines(a, "  ") + ")";
      }

      return x.hash;
    };

    $$ImmutableStack$$ImmutableStack.prototype.forEach = function (f) {
      this.root.forEachRev(f);
    };

    // TODO code duplication with ImmutableQueue
    $$ImmutableStack$$ImmutableStack.prototype.size = function () {
      return this.len;
    };

    $$ImmutableStack$$ImmutableStack.prototype.peek = function (def) {
      if (this.isEmpty()) {
        if (arguments.length === 1) {
          return def;
        } else {
          throw new Error("Cannot peek from an empty stack");
        }
      } else {
        return this.root.car;
      }
    };

    $$ImmutableStack$$ImmutableStack.prototype.push = function (value) {
      return new $$ImmutableStack$$ImmutableStack(new $$$Immutable$Cons$$Cons(value, this.root), this.len + 1);
    };

    $$ImmutableStack$$ImmutableStack.prototype.pop = function () {
      if (this.isEmpty()) {
        throw new Error("Cannot pop from an empty stack");
      } else {
        return new $$ImmutableStack$$ImmutableStack(this.root.cdr, this.len - 1);
      }
    };

    // TODO code duplication with ImmutableQueue
    $$ImmutableStack$$ImmutableStack.prototype.concat = function (right) {
      var self = this;

      right.forEach(function (x) {
        self = self.push(x);
      });

      return self;
    };
    function $$$Immutable$Immutable$$equal(x, y) {
      return x === y || $$hash$$hash(x) === $$hash$$hash(y);
    }

    function $$$Immutable$Immutable$$isDict(x) {
      return x instanceof $$ImmutableDict$$ImmutableDict;
    }

    function $$$Immutable$Immutable$$isSet(x) {
      return x instanceof $$ImmutableSet$$ImmutableSet;
    }

    function $$$Immutable$Immutable$$isSortedDict(x) {
      return $$$Immutable$Immutable$$isDict(x) && x.sort !== $$Sorted$$defaultSort;
    }

    function $$$Immutable$Immutable$$isSortedSet(x) {
      return $$$Immutable$Immutable$$isSet(x) && x.sort !== $$Sorted$$defaultSort;
    }

    function $$$Immutable$Immutable$$isList(x) {
      return x instanceof $$ImmutableList$$ImmutableList;
    }

    function $$$Immutable$Immutable$$isQueue(x) {
      return x instanceof $$ImmutableQueue$$ImmutableQueue;
    }

    function $$$Immutable$Immutable$$isStack(x) {
      return x instanceof $$ImmutableStack$$ImmutableStack;
    }

    function $$$Immutable$Immutable$$isImmutable(x) {
      return $$$Immutable$Immutable$$isDict(x) || $$$Immutable$Immutable$$isSet(x) || $$$Immutable$Immutable$$isList(x) || $$$Immutable$Immutable$$isQueue(x) || $$$Immutable$Immutable$$isStack(x);
    }

    function $$$Immutable$Immutable$$fromJS(x) {
      if (Array.isArray(x)) {
        var out = $$$Immutable$Immutable$$List();

        for (var i = 0, l = x.length; i < l; ++i) {
          out = out.insert($$$Immutable$Immutable$$fromJS(x[i]));
        }

        return out;

      } else if ($$util$$isJSLiteral(x)) {
        var out = $$$Immutable$Immutable$$Dict();

        // TODO should this only include own properties ...?
        for (var s in x) {
          out = out.set(s, $$$Immutable$Immutable$$fromJS(x[s]));
        }

        return out;

      } else {
        return x;
      }
    }

    function $$$Immutable$Immutable$$SortedDict(sort, obj) {
      if (obj != null) {
        // We don't use equal, for increased speed
        if (obj instanceof $$ImmutableDict$$ImmutableDict && obj.sort === sort) {
          return obj;

        } else {
          var o = new $$ImmutableDict$$ImmutableDict($$$Immutable$nil$$nil, sort);

          if ($$util$$isJSLiteral(obj)) {
            Object.keys(obj).forEach(function (key) {
              o = o.set(key, obj[key]);
            });

          } else {
            obj.forEach(function (_array) {
              var key   = _array[0];
              var value = _array[1];
              o = o.set(key, value);
            });
          }

          return o;
        }
      } else {
        return new $$ImmutableDict$$ImmutableDict($$$Immutable$nil$$nil, sort);
      }
    }

    function $$$Immutable$Immutable$$SortedSet(sort, array) {
      if (array != null) {
        // We don't use equal, for increased speed
        if (array instanceof $$ImmutableSet$$ImmutableSet && array.sort === sort) {
          return array;

        } else {
          // TODO use concat ?
          var o = new $$ImmutableSet$$ImmutableSet($$$Immutable$nil$$nil, sort);

          array.forEach(function (x) {
            o = o.add(x);
          });

          return o;
        }
      } else {
        return new $$ImmutableSet$$ImmutableSet($$$Immutable$nil$$nil, sort);
      }
    }

    function $$$Immutable$Immutable$$Dict(obj) {
      return $$$Immutable$Immutable$$SortedDict($$Sorted$$defaultSort, obj);
    }

    function $$$Immutable$Immutable$$Set(array) {
      return $$$Immutable$Immutable$$SortedSet($$Sorted$$defaultSort, array);
    }

    function $$$Immutable$Immutable$$List(array) {
      if (array != null) {
        if (array instanceof $$ImmutableList$$ImmutableList) {
          return array;

        } else {
          var o = new $$ImmutableList$$ImmutableList($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, 0);

          array.forEach(function (x) {
            o = o.insert(x);
          });

          return o;
        }
      } else {
        return new $$ImmutableList$$ImmutableList($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, 0);
      }
    }

    function $$$Immutable$Immutable$$Queue(x) {
      if (x != null) {
        if (x instanceof $$ImmutableQueue$$ImmutableQueue) {
          return x;

        } else {
          // TODO use concat ?
          var o = new $$ImmutableQueue$$ImmutableQueue($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, 0);

          x.forEach(function (x) {
            o = o.push(x);
          });

          return o;
        }
      } else {
        return new $$ImmutableQueue$$ImmutableQueue($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, 0);
      }
    }

    function $$$Immutable$Immutable$$Stack(x) {
      if (x != null) {
        if (x instanceof $$ImmutableStack$$ImmutableStack) {
          return x;

        } else {
          // TODO use concat ?
          var o = new $$ImmutableStack$$ImmutableStack($$$Immutable$nil$$nil, 0);

          x.forEach(function (x) {
            o = o.push(x);
          });

          return o;
        }
      } else {
        return new $$ImmutableStack$$ImmutableStack($$$Immutable$nil$$nil, 0);
      }
    }


    (function (root, fn) {
      if (typeof define === 'function' && define.amd) {
        define(["exports"], fn);
      } else if (typeof exports === 'object') {
        fn(exports);
      } else {
        root.Immutable = {};
        fn(root.Immutable);
      }
    })(this, function (exports) {
      exports.equal = $$$Immutable$Immutable$$equal;
      exports.fromJS = $$$Immutable$Immutable$$fromJS;
      exports.toJS = $$toJS$$toJS;
      exports.isDict = $$$Immutable$Immutable$$isDict;
      exports.isSet = $$$Immutable$Immutable$$isSet;
      exports.isSortedDict = $$$Immutable$Immutable$$isSortedDict;
      exports.isSortedSet = $$$Immutable$Immutable$$isSortedSet;
      exports.isList = $$$Immutable$Immutable$$isList;
      exports.isQueue = $$$Immutable$Immutable$$isQueue;
      exports.isStack = $$$Immutable$Immutable$$isStack;
      exports.isImmutable = $$$Immutable$Immutable$$isImmutable;
      exports.SortedDict = $$$Immutable$Immutable$$SortedDict;
      exports.SortedSet = $$$Immutable$Immutable$$SortedSet;
      exports.Dict = $$$Immutable$Immutable$$Dict;
      exports.Set = $$$Immutable$Immutable$$Set;
      exports.List = $$$Immutable$Immutable$$List;
      exports.Queue = $$$Immutable$Immutable$$Queue;
      exports.Stack = $$$Immutable$Immutable$$Stack;
      exports.simpleSort = $$Sorted$$simpleSort;
      exports.defaultSort = $$Sorted$$defaultSort;
    });
    var src$Benchmark$List$$immutablejs = require("immutable");
    var src$Benchmark$List$$mori        = require("mori");

    function src$Benchmark$List$$cons_push(x, i) {
      return new $$$Immutable$Cons$$Cons(i, x);
    }


    /*var fs = require("fs");
    var vm = require("vm");
    var path = require("path");

    var elm_path = path.join(__dirname, "../Elm-0.13/elm-runtime.js");
    var elm_bench_path = path.join(__dirname, "./build/List.js");
    vm.runInThisContext(fs.readFileSync(elm_path));
    vm.runInThisContext(fs.readFileSync(elm_bench_path));

    var worker = Elm.worker(Elm.Benchmark);

    var elm = {
      insert:     worker.ports.insert,
      insertInit: worker.ports.insertInit
    };*/


    //var counter = +process.argv[2];


    $$Benchmark$$.group("Information", function () {
      $$Benchmark$$.group("Node.js", function () {
        $$Benchmark$$.message("URL: http://nodejs.org/");
        $$Benchmark$$.message("Version: 0.10.22");
      });
      $$Benchmark$$.group("Benchmark.js", function () {
        $$Benchmark$$.message("URL: https://github.com/bestiejs/benchmark.js");
        $$Benchmark$$.message("Version: 1.0.0");
      });
      $$Benchmark$$.group("Immutable-js", function () {
        $$Benchmark$$.message("URL: https://github.com/facebook/immutable-js");
        $$Benchmark$$.message("Version: 3.4.1");
      });
      $$Benchmark$$.group("Mori", function () {
        $$Benchmark$$.message("URL: https://github.com/swannodette/mori");
        $$Benchmark$$.message("Version: 0.2.9");
      });
      $$Benchmark$$.group("Immutable", function () {
        $$Benchmark$$.message("URL: https://github.com/Pauan/Immutable");
        $$Benchmark$$.message("Version: 1.0.0");
      });
      /*benchmark.group("Elm", function () {
        benchmark.message("URL: http://elm-lang.org/");
        benchmark.message("Version: 0.13");
      });*/
    });

    function src$Benchmark$List$$array_has(i, len) {
      return i >= 0 && i < len;
    }

    function src$Benchmark$List$$array_get(array, i, def) {
      var len = array.length;

      if (i < 0) {
        i += len;
      }

      if (src$Benchmark$List$$array_has(i, len)) {
        return array[i];
      } else if (arguments.length === 3) {
        return def;
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function src$Benchmark$List$$array_insert(array, value, i) {
      if (arguments.length === 2) {
        i = -1;
      }

      var len = array.length;

      if (i < 0) {
        i += (len + 1);
      }

      if (i >= 0 && i <= len) {
        return $$$Immutable$Array$$insert(array, i, value);
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function src$Benchmark$List$$array_modify(array, i, f) {
      var len = array.length;

      if (i < 0) {
        i += len;
      }

      if (src$Benchmark$List$$array_has(i, len)) {
        return $$$Immutable$Array$$modify(array, i, f);
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function src$Benchmark$List$$array_remove(array, i) {
      if (arguments.length === 1) {
        i = -1;
      }

      var len = array.length;

      if (i < 0) {
        i += len;
      }

      if (src$Benchmark$List$$array_has(i, len)) {
        return $$$Immutable$Array$$remove(array, i);
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function src$Benchmark$List$$array_slice(array, from, to) {
      var len = array.length;

      if (from == null) {
        from = 0;
      }
      if (to == null) {
        to = len;
      }

      if (from < 0) {
        from += len;
      }
      if (to < 0) {
        to += len;
      }

      if (from === 0 && to === len) {
        return array;

      } else if (from > to) {
        throw new Error("Index " + from + " is greater than index " + to);

      } else if (src$Benchmark$List$$array_has(from, len)) {
        if (from === to) {
          return [];

        // TODO code duplication with array_has ?
        } else if (to > 0 && to <= len) {
          return array.slice(from, to);

        } else {
          throw new Error("Index " + to + " is not valid");
        }

      } else {
        throw new Error("Index " + from + " is not valid");
      }
    }

    function src$Benchmark$List$$array_concat(array, other) {
      if (array.length === 0) {
        return other;
      } else if (other.length === 0) {
        return array;
      } else {
        return array.concat(other);
      }
    }


    function src$Benchmark$List$$run(counter) {
      $$Benchmark$$.group("List with " + counter + " values", function () {
        $$Benchmark$$.group("Inserting at the end", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }
          });

          $$Benchmark$$.time("JavaScript Array Copying", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }
          });

          $$Benchmark$$.time("Immutable-js List", function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });

          $$Benchmark$$.time("Mori Vector", function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }
          });

          $$Benchmark$$.time("Immutable List", function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }
          });

          /*benchmark.time("Immutable List (push)", function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });*/

          /*benchmark.time("Stack (reversed Cons)", function () {
            var a = nil;

            for (var i = 0; i < counter; ++i) {
              a = cons_push(a, i);
            }
          });*/

          /*benchmark.time("Elm Array", function () {
            elm.insert(counter);
          });

          benchmark.time("Elm Array (initialize)", function () {
            elm.insertInit(counter);
          });*/
        });


        $$Benchmark$$.group("Inserting at the start", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.unshift(i);
            }
          });

          $$Benchmark$$.time("JavaScript Array Copying", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i, 0);
            }
          });

          $$Benchmark$$.time("Immutable-js List", function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.unshift(i);
            }
          });

          $$Benchmark$$.message("Mori Vector");

          /*benchmark.time("Mori List", function () {
            var a = mori.list();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj(a, i);
            }
          });*/

          $$Benchmark$$.time("Immutable List", function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i, 0);
            }
          });

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Inserting at random", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.length);
              a.splice(pivot, 0, i);
            }
          });

          $$Benchmark$$.time("JavaScript Array Copying", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.length);
              a = src$Benchmark$List$$array_insert(a, i, pivot);
            }
          });

          $$Benchmark$$.time("Immutable-js List", function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.size);
              a = a.splice(pivot, 0, i);
            }
          });

          $$Benchmark$$.message("Mori Vector");

          $$Benchmark$$.time("Immutable List", function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.size());
              a = a.insert(i, pivot);
            }
          });

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Retrieving at the end", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a[a.length - 1];
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              src$Benchmark$List$$array_get(a, -1);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.last();
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              // `mori.last` is O(n)
              src$Benchmark$List$$mori.get(a, src$Benchmark$List$$mori.count(a) - 1);
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.get(-1);
            });
          })();

          //var elm_array = elm.makeList(counter);

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Retrieving at the start", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a[0];
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              src$Benchmark$List$$array_get(a, 0);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.first();
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              src$Benchmark$List$$mori.get(a, 0);
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.get(0);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Retrieving at random", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              var pivot = Math.floor(Math.random() * a.length);
              a[pivot];
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var pivot = Math.floor(Math.random() * a.length);
              src$Benchmark$List$$array_get(a, pivot);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var pivot = Math.floor(Math.random() * a.size);
              a.get(pivot);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              var pivot = Math.floor(Math.random() * src$Benchmark$List$$mori.count(a));
              src$Benchmark$List$$mori.get(a, pivot);
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.get(pivot);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Removing at the end", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = src$Benchmark$List$$array_remove(b);
              }
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.pop();
              }
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = src$Benchmark$List$$mori.pop(b);
              }
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove();
              }
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Removing at the start", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = src$Benchmark$List$$array_remove(b, 0);
              }
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.shift();
              }
            });
          })();

          $$Benchmark$$.message("Mori Vector");

          /*;(function () {
            var a = mori.list();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj(a, i);
            }

            benchmark.time("Mori List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = mori.pop(b);
              }
            });
          })();*/

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove(0);
              }
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Removing at random", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.length);
                b = src$Benchmark$List$$array_remove(b, pivot);
              }
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.size);
                b = b.splice(pivot, 1);
              }
            });
          })();

          $$Benchmark$$.message("Mori Vector");

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.size());
                b = b.remove(pivot);
              }
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Modifying at the end", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              src$Benchmark$List$$array_modify(a, -1, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.set(-1, -50);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              src$Benchmark$List$$mori.assoc(a, src$Benchmark$List$$mori.count(a) - 1, -50);
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.modify(-1, function () {
                return -50;
              });
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Modifying at the start", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              src$Benchmark$List$$array_modify(a, 0, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.set(0, -50);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              src$Benchmark$List$$mori.assoc(a, 0, -50);
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.modify(0, function () {
                return -50;
              });
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Modifying at random", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var pivot = Math.floor(Math.random() * a.length);
              src$Benchmark$List$$array_modify(a, pivot, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var pivot = Math.floor(Math.random() * a.size);
              a.set(pivot, -50);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              var pivot = Math.floor(Math.random() * src$Benchmark$List$$mori.count(a));
              src$Benchmark$List$$mori.assoc(a, pivot, -50);
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.modify(pivot, function () {
                return -50;
              });
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Concatenating", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a.concat(a);
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              src$Benchmark$List$$array_concat(a, a);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.concat(a);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              src$Benchmark$List$$mori.concat(a, a);
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.concat(a);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Slicing small", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a.slice(1, 2);
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              src$Benchmark$List$$array_slice(a, 1, 2);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.slice(1, 2);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              src$Benchmark$List$$mori.subvec(a, 1, 2);
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.slice(1, 2);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Slicing medium", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a.slice(1, Math.floor(a.length / 2));
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              src$Benchmark$List$$array_slice(a, 1, Math.floor(a.length / 2));
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.slice(1, Math.floor(a.size / 2));
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              src$Benchmark$List$$mori.subvec(a, 1, Math.floor(src$Benchmark$List$$mori.count(a) / 2));
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.slice(1, Math.floor(a.size() / 2));
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Slicing large", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a.slice(1);
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$array_insert(a, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              src$Benchmark$List$$array_slice(a, 1);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.slice(1);
            });
          })();

          ;(function () {
            var a = src$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = src$Benchmark$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              src$Benchmark$List$$mori.subvec(a, 1);
            });
          })();

          ;(function () {
            var a = $$$Immutable$Immutable$$.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.slice(1);
            });
          })();

          //benchmark.message("Elm Array");
        });
      });
    }


    //run(1);
    src$Benchmark$List$$run(10);
    src$Benchmark$List$$run(100);
    src$Benchmark$List$$run(1000);
    //run(10000);
    //run(100000);
    //run(1000000);

    $$Benchmark$$.run();
}).call(this);

//# sourceMappingURL=Benchmark.js.map