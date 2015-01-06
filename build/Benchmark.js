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
          return $$Benchmark$$rpad(text, 49) + $$Benchmark$$lpad(" " + $$Benchmark$$lpad(num, 13) + " ops/sec", 21);
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
      $$Benchmark$$message($$Benchmark$$repeat(70 - $$Benchmark$$indent, "-"));
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
    var $$Tag$$tag_uuid = "48de6fff-9d11-472d-a76f-ed77a59a5cbc";
    var $$Tag$$tag_id = 0;

    var $$Tag$$uuid = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
    var $$Tag$$uuid_regexp = new RegExp("^" + $$Tag$$uuid + "$");

    var $$Tag$$is_tag_regexp = new RegExp("^\\(Tag " + $$Tag$$tag_uuid + " [0-9]+\\)$");

    var $$Tag$$is_uuid_tag_regexp = new RegExp("^\\(UUIDTag " + $$Tag$$uuid + "\\)$");

    function $$Tag$$isUUID(x) {
      return typeof x === "string" && $$Tag$$uuid_regexp.test(x);
    }

    function $$Tag$$isTag(x) {
      return typeof x === "string" && ($$Tag$$is_tag_regexp.test(x) || $$Tag$$is_uuid_tag_regexp.test(x));
    }

    function $$Tag$$isUUIDTag(x) {
      return typeof x === "string" && $$Tag$$is_uuid_tag_regexp.test(x);
    }

    function $$Tag$$Tag() {
      if (arguments.length === 0) {
        return "(Tag " + $$Tag$$tag_uuid + " " + (++$$Tag$$tag_id) + ")";
      } else {
        throw new Error("Expected 0 arguments but got " + arguments.length);
      }
    }

    function $$Tag$$UUIDTag(id) {
      if (arguments.length === 1) {
        if ($$Tag$$isUUID(id)) {
          return "(UUIDTag " + id + ")";
        } else {
          throw new Error("Expected a lower-case UUID, but got: " + id);
        }

      } else {
        throw new Error("Expected 1 argument but got " + arguments.length);
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

    function $$util$$identity(x) {
      return x;
    }
    var $$iter$$tag_iter = $$Tag$$UUIDTag("6199065c-b518-4cb3-8b41-ab70a9769ec3");

    function $$iter$$iter_array(array) {
      var i = 0;

      return {
        next: function () {
          if (i < array.length) {
            return { value: array[i++] }
          } else {
            return { done: true }
          }
        }
      };
    }

    function $$iter$$iter(x) {
      var fn = x[$$iter$$tag_iter];
      if (fn != null) {
        return fn(x);

      } else if (Array.isArray(x)) {
        return $$iter$$iter_array(x);

      // TODO this isn't quite correct
      } else if (typeof x === "string") {
        return $$iter$$iter_array(x);

      } else {
        throw new Error("Cannot iter: " + x);
      }
    }

    function $$iter$$make_seq(f) {
      var o = {};
      o[$$iter$$tag_iter] = function () {
        return f();
      };
      return o;
    }

    function $$iter$$each_iter(iterator, f) {
      for (;;) {
        var info = iterator.next();
        // TODO what if it has a value too?
        if (info.done) {
          break;
        } else {
          f(info.value);
        }
      }
    }

    function $$iter$$map_iter(iterator, f) {
      return {
        next: function () {
          var info = iterator.next();
          // TODO what if it has a value too?
          if (info.done) {
            // TODO just return `info` ?
            return { done: true };
          } else {
            return { value: f(info.value) };
          }
        }
      };
    }

    function $$iter$$concat_iter(x, y) {
      var x_done = false;
      var y_done = false;

      return {
        next: function () {
          for (;;) {
            if (x_done) {
              if (y_done) {
                return { done: true };
              } else {
                var info = y.next();
                if (info.done) {
                  y_done = true;
                } else {
                  return info;
                }
              }
            } else {
              var info = x.next();
              if (info.done) {
                x_done = true;
              } else {
                return info;
              }
            }
          }
        }
      };
    }

    function $$iter$$reverse_iter(iterator) {
      var stack = [];

      // TODO should it do this here, or inside `next` ?
      $$iter$$each_iter(iterator, function (x) {
        stack.push(x);
      });

      var i = stack.length;

      return {
        next: function () {
          if (i) {
            return { value: stack[--i] };
          } else {
            return { done: true };
          }
        }
      };
    }

    function $$iter$$mapcat_iter(iterator, f) {
      var done = false;
      var sub  = null;

      return {
        next: function () {
          for (;;) {
            if (done) {
              return { done: true };

            } else if (sub === null) {
              var info = iterator.next();
              // TODO what if it has a value too?
              if (info.done) {
                done = true;
              } else {
                sub = f(info.value);
              }

            } else {
              var info = sub.next();
              if (info.done) {
                sub = null;
              } else {
                return info;
              }
            }
          }
        }
      };
    }

    function $$iter$$iter_object(x) {
      if ($$util$$isJSLiteral(x)) {
        return $$iter$$map(Object.keys(x), function (key) {
          return [key, x[key]];
        });
      } else {
        return x;
      }
    }


    function $$iter$$each(x, f) {
      $$iter$$each_iter($$iter$$iter(x), f);
    }

    function $$iter$$findIndex(x, f, def) {
      var iterator = $$iter$$iter(x);

      var index = 0;

      for (;;) {
        var info = iterator.next();
        // TODO what if it has a value too?
        if (info.done) {
          if (arguments.length === 3) {
            return def;
          } else {
            throw new Error("findIndex did not find anything");
          }

        } else if (f(info.value)) {
          return index;

        } else {
          ++index;
        }
      }
    }

    function $$iter$$map(x, f) {
      return $$iter$$make_seq(function () {
        return $$iter$$map_iter($$iter$$iter(x), f);
      });
    }

    function $$iter$$reverse(x) {
      return $$iter$$make_seq(function () {
        return $$iter$$reverse_iter($$iter$$iter(x));
      });
    }

    function $$iter$$keep(x, f) {
      return $$iter$$make_seq(function () {
        var iterator = $$iter$$iter(x);
        return {
          next: function () {
            for (;;) {
              var info = iterator.next();
              // TODO what if it has a value too?
              if (info.done) {
                // TODO just return `info` ?
                return { done: true };
              } else if (f(info.value)) {
                return info;
              }
            }
          }
        };
      });
    }

    var $$hash$$tag_hash = $$Tag$$UUIDTag("e1c3818d-4c4f-4703-980a-00969e4ca900");

    var $$hash$$mutable_hash_id = 0;

    function $$hash$$hash_string(x) {
      return "\"" + x.replace(/[\\\"\n]/g, function (s) {
        if (s === "\n") {
          return s + " ";
        } else {
          return "\\" + s;
        }
      }) + "\"";
    }

    function $$hash$$hash(x) {
      var type = typeof x;
      // TODO this is probably pretty inefficient
      if (type === "string") {
        if ($$Tag$$isTag(x)) {
          return x;
        } else {
          return $$hash$$hash_string(x);
        }

      } else if (type === "number"    ||
                 type === "boolean"   ||
                 type === "undefined" ||
                 x === null) {
        return "" + x;

      } else {
        var hasher = x[$$hash$$tag_hash];
        if (hasher != null) {
          return hasher(x);

        } else {
          var id = "(Mutable " + (++$$hash$$mutable_hash_id) + ")";

          Object.defineProperty(x, $$hash$$tag_hash, {
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

    function $$hash$$hash_dict(x, spaces) {
      var a = [];

      var max_key = 0;

      $$iter$$each(x, function (_array) {
        var key   = $$hash$$hash(_array[0]);
        var value = $$hash$$hash(_array[1]);

        key = key.split(/\n/);

        $$iter$$each(key, function (key) {
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

      return $$util$$join_lines(a, spaces);
    }
    var $$toJS$$tag_toJS = $$Tag$$UUIDTag("1b75a273-16bd-4248-be8a-e4b5e8c4b523");

    function $$toJS$$toJS(x) {
      if ($$util$$isObject(x)) {
        var fn = x[$$toJS$$tag_toJS];
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

      $$iter$$each(x, function (_array) {
        var key   = _array[0];
        var value = _array[1];

        // Tags are currently implemented as strings
        // TODO use isString test ?
        if (typeof key !== "string") {
          throw new Error("Cannot convert to JavaScript: expected key to be string or Tag but got " + key);
        }

        o[key] = $$toJS$$toJS(value);
      });

      return o;
    }

    function $$toJS$$toJS_array(x) {
      var a = [];

      $$iter$$each(x, function (value) {
        a.push($$toJS$$toJS(value));
      });

      return a;
    }
    var $$toJSON$$fromJSON_registry = {};

    var $$toJSON$$tag_toJSON_type = $$Tag$$UUIDTag("89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37");
    var $$toJSON$$tag_toJSON      = $$Tag$$UUIDTag("99e14916-bc99-4c48-81aa-299cf1ad6de3");

    function $$toJSON$$fromJSON(x) {
      if ($$util$$isObject(x)) {
        var type = x[$$toJSON$$tag_toJSON_type];
        if (type != null) {
          var register = $$toJSON$$fromJSON_registry[type];
          if (register != null) {
            return register(x);
          } else {
            throw new Error("Cannot handle type " + type);
          }
        } else {
          return x;
        }
      } else if ($$Tag$$isTag(x)) {
        if ($$Tag$$isUUIDTag(x)) {
          return x;
        } else {
          throw new Error("Cannot convert Tag from JSON, use UUIDTag instead: " + x);
        }
      } else {
        return x;
      }
    }

    function $$toJSON$$toJSON(x) {
      if ($$util$$isObject(x)) {
        var fn = x[$$toJSON$$tag_toJSON];
        if (fn != null) {
          return fn(x);
        } else {
          return x;
        }
      } else if ($$Tag$$isTag(x)) {
        if ($$Tag$$isUUIDTag(x)) {
          return x;
        } else {
          throw new Error("Cannot convert Tag to JSON, use UUIDTag instead: " + x);
        }
      } else {
        return x;
      }
    }

    function $$toJSON$$toJSON_object(type, x) {
      var o = {};

      o[$$toJSON$$tag_toJSON_type] = type;

      o.keys   = [];
      o.values = [];

      $$iter$$each(x, function (_array) {
        var key   = _array[0];
        var value = _array[1];

        o.keys.push($$toJSON$$toJSON(key));
        o.values.push($$toJSON$$toJSON(value));
      });

      return o;
    }

    function $$toJSON$$toJSON_array(type, x) {
      var o = {};

      o[$$toJSON$$tag_toJSON_type] = type;

      o.values = [];

      $$iter$$each(x, function (value) {
        o.values.push($$toJSON$$toJSON(value));
      });

      return o;
    }

    function $$toJSON$$fromJSON_object(x) {
      var keys   = x.keys;
      var values = x.values;

      var l = keys.length;
      var out = new Array(l);

      for (var i = 0; i < l; ++i) {
        out[i] = [$$toJSON$$fromJSON(keys[i]), $$toJSON$$fromJSON(values[i])];
      }

      return out;
    }

    function $$toJSON$$fromJSON_array(x) {
      var values = x.values;

      var l = values.length;
      var out = new Array(l);

      for (var i = 0; i < l; ++i) {
        out[i] = $$toJSON$$fromJSON(values[i]);
      }

      return out;
    }
    var $$nil$$nil = {};
    $$nil$$nil.depth      = 0;
    $$nil$$nil.size       = 0;
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
      if (x === $$nil$$nil) {
        return y;

      } else if (y === $$nil$$nil) {
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
      if (node === $$nil$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, $$AVL$$insert_min(node.left, new_node), node.right);
      }
    }

    function $$AVL$$insert_max(node, new_node) {
      if (node === $$nil$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, node.left, $$AVL$$insert_max(node.right, new_node));
      }
    }

    function $$AVL$$iter_tree(node) {
      var parents = [];

      while (node !== $$nil$$nil) {
        parents.push(node);
        node = node.left;
      }

      return {
        next: function () {
          if (parents.length) {
            var parent = parents.pop();

            node = parent.right;

            while (node !== $$nil$$nil) {
              parents.push(node);
              node = node.left;
            }

            return { value: parent };
          } else {
            return { done: true };
          }
        }
      };
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

    function $$Sorted$$key_get(node, sort, hash) {
      while (node !== $$nil$$nil) {
        var order = sort(hash, node.hash);
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

    function $$Sorted$$key_set(node, sort, hash, new_node) {
      if (node === $$nil$$nil) {
        return new_node;

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(hash, node.hash);
        if (order === 0) {
          return node.modify(new_node);

        } else if (order < 0) {
          var child = $$Sorted$$key_set(left, sort, hash, new_node);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Sorted$$key_set(right, sort, hash, new_node);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Sorted$$key_modify(node, sort, hash, key, f) {
      if (node === $$nil$$nil) {
        throw new Error("Key " + key + " not found");

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(hash, node.hash);
        if (order === 0) {
          // TODO what if `f` suspends?
          return node.modify({ key: key, hash: hash, value: f(node.value) });

        } else if (order < 0) {
          var child = $$Sorted$$key_modify(left, sort, hash, key, f);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Sorted$$key_modify(right, sort, hash, key, f);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Sorted$$key_remove(node, sort, hash) {
      if (node === $$nil$$nil) {
        return node;

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(hash, node.hash);
        if (order === 0) {
          return $$AVL$$concat(left, right);

        } else if (order < 0) {
          var child = $$Sorted$$key_remove(left, sort, hash);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Sorted$$key_remove(right, sort, hash);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }
    var $$Base$$MutableBase   = {};
    var $$Base$$ImmutableBase = {};

    function $$Base$$toString() {
      return $$hash$$hash(this);
    }

    $$Base$$MutableBase.toString = $$Base$$ImmutableBase.toString = $$Base$$toString;
    $$Base$$MutableBase.inspect  = $$Base$$ImmutableBase.inspect  = $$Base$$toString;

    function $$ImmutableDict$$KeyNode(left, right, hash, key, value) {
      this.left  = left;
      this.right = right;
      this.hash  = hash;
      this.key   = key;
      this.value = value;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$ImmutableDict$$KeyNode.prototype.copy = function (left, right) {
      return new $$ImmutableDict$$KeyNode(left, right, this.hash, this.key, this.value);
    };

    $$ImmutableDict$$KeyNode.prototype.modify = function (info) {
      var hash  = info.hash;
      var key   = info.key;
      var value = info.value;
      // We don't use equal, for increased speed
      if (this.hash === hash && this.key === key && this.value === value) {
        return this;
      } else {
        return new $$ImmutableDict$$KeyNode(this.left, this.right, hash, key, value);
      }
    };


    function $$ImmutableDict$$ImmutableDict(root, sort, hash_fn) {
      this.root = root;
      this.sort = sort;
      this.hash_fn = hash_fn;
      this.hash = null;
    }

    $$ImmutableDict$$ImmutableDict.prototype = Object.create($$Base$$ImmutableBase);

    $$ImmutableDict$$ImmutableDict.prototype[$$iter$$tag_iter] = function (x) {
      return $$iter$$map_iter($$AVL$$iter_tree(x.root), function (node) {
        return [node.key, node.value];
      });
    };

    $$ImmutableDict$$ImmutableDict.prototype[$$hash$$tag_hash] = function (x) {
      if (x.hash === null) {
        // We don't use equal, for increased speed
        if ($$ImmutableDict$$isDict(x) && !$$ImmutableDict$$isSortedDict(x)) {
          x.hash = "(Dict" + $$hash$$hash_dict(x, "  ") + ")";
        } else {
          x.hash = "(SortedDict " + $$hash$$hash(x.sort) + $$hash$$hash_dict(x, "  ") + ")";
        }
      }

      return x.hash;
    };

    $$toJSON$$fromJSON_registry["Dict"] = function (x) {
      return $$ImmutableDict$$Dict($$toJSON$$fromJSON_object(x));
    };

    $$ImmutableDict$$ImmutableDict.prototype[$$toJSON$$tag_toJSON] = function (x) {
      if ($$ImmutableDict$$isDict(x) && !$$ImmutableDict$$isSortedDict(x)) {
        return $$toJSON$$toJSON_object("Dict", x);
      } else {
        throw new Error("Cannot convert SortedDict to JSON");
      }
    };

    $$ImmutableDict$$ImmutableDict.prototype[$$toJS$$tag_toJS] = $$toJS$$toJS_object;

    $$ImmutableDict$$ImmutableDict.prototype.isEmpty = function () {
      return this.root === $$nil$$nil;
    };

    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.has = function (key) {
      return $$Sorted$$key_get(this.root, this.sort, this.hash_fn(key)) !== $$nil$$nil;
    };

    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.get = function (key, def) {
      var node = $$Sorted$$key_get(this.root, this.sort, this.hash_fn(key));
      if (node === $$nil$$nil) {
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
      var hash_fn = this.hash_fn;
      var hash = hash_fn(key);
      var node = $$Sorted$$key_set(root, sort, hash, new $$ImmutableDict$$KeyNode($$nil$$nil, $$nil$$nil, hash, key, value));
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableDict$$ImmutableDict(node, sort, hash_fn);
      }
    };

    // TODO code duplication
    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.remove = function (key) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var node = $$Sorted$$key_remove(root, sort, hash_fn(key));
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableDict$$ImmutableDict(node, sort, hash_fn);
      }
    };

    // TODO code duplication
    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.modify = function (key, f) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var node = $$Sorted$$key_modify(root, sort, hash_fn(key), key, f);
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableDict$$ImmutableDict(node, sort, hash_fn);
      }
    };

    // TODO code duplication with ImmutableRecord
    $$ImmutableDict$$ImmutableDict.prototype.merge = function (other) {
      var self = this;

      $$iter$$each($$iter$$iter_object(other), function (_array) {
        var key   = _array[0];
        var value = _array[1];

        self = self.set(key, value);
      });

      return self;
    };


    function $$ImmutableDict$$isDict(x) {
      return x instanceof $$ImmutableDict$$ImmutableDict;
    }

    function $$ImmutableDict$$isSortedDict(x) {
      return $$ImmutableDict$$isDict(x) && x.hash_fn === $$util$$identity;
    }

    function $$ImmutableDict$$SortedDict(sort, obj) {
      if (obj != null) {
        // We don't use equal, for increased speed
        if ($$ImmutableDict$$isSortedDict(obj) && obj.sort === sort) {
          return obj;
        } else {
          return new $$ImmutableDict$$ImmutableDict($$nil$$nil, sort, $$util$$identity).merge(obj);
        }
      } else {
        return new $$ImmutableDict$$ImmutableDict($$nil$$nil, sort, $$util$$identity);
      }
    }

    function $$ImmutableDict$$Dict(obj) {
      if (obj != null) {
        if ($$ImmutableDict$$isDict(obj) && !$$ImmutableDict$$isSortedDict(obj)) {
          return obj;
        } else {
          return new $$ImmutableDict$$ImmutableDict($$nil$$nil, $$Sorted$$simpleSort, $$hash$$hash).merge(obj);
        }
      } else {
        return new $$ImmutableDict$$ImmutableDict($$nil$$nil, $$Sorted$$simpleSort, $$hash$$hash);
      }
    }

    function $$ImmutableSet$$SetNode(left, right, hash, key) {
      this.left  = left;
      this.right = right;
      this.hash  = hash;
      this.key   = key;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$ImmutableSet$$SetNode.prototype.copy = function (left, right) {
      return new $$ImmutableSet$$SetNode(left, right, this.hash, this.key);
    };

    $$ImmutableSet$$SetNode.prototype.modify = function (info) {
      var hash = info.hash;
      var key  = info.key;
      // We don't use equal, for increased speed
      if (this.hash === hash && this.key === key) {
        return this;
      } else {
        return new $$ImmutableSet$$SetNode(this.left, this.right, hash, key);
      }
    };


    function $$ImmutableSet$$ImmutableSet(root, sort, hash_fn) {
      this.root = root;
      this.sort = sort;
      this.hash_fn = hash_fn;
      this.hash = null;
    }

    $$ImmutableSet$$ImmutableSet.prototype = Object.create($$Base$$ImmutableBase);

    $$toJSON$$fromJSON_registry["Set"] = function (x) {
      return $$ImmutableSet$$Set($$toJSON$$fromJSON_array(x));
    };

    $$ImmutableSet$$ImmutableSet.prototype[$$iter$$tag_iter] = function (x) {
      return $$iter$$map_iter($$AVL$$iter_tree(x.root), function (node) {
        return node.key;
      });
    };

    $$ImmutableSet$$ImmutableSet.prototype[$$toJSON$$tag_toJSON] = function (x) {
      if ($$ImmutableSet$$isSet(x) && !$$ImmutableSet$$isSortedSet(x)) {
        return $$toJSON$$toJSON_array("Set", x);
      } else {
        throw new Error("Cannot convert SortedSet to JSON");
      }
    };

    $$ImmutableSet$$ImmutableSet.prototype[$$hash$$tag_hash] = function (x) {
      if (x.hash === null) {
        var a = [];

        $$iter$$each(x, function (value) {
          a.push($$hash$$hash(value));
        });

        var spaces = "  ";

        if ($$ImmutableSet$$isSet(x) && !$$ImmutableSet$$isSortedSet(x)) {
          x.hash = "(Set" + $$util$$join_lines(a, spaces) + ")";
        } else {
          x.hash = "(SortedSet " + $$hash$$hash(x.sort) + $$util$$join_lines(a, spaces) + ")";
        }
      }

      return x.hash;
    };

    $$ImmutableSet$$ImmutableSet.prototype[$$toJS$$tag_toJS] = $$toJS$$toJS_array;

    // TODO code duplication with ImmutableDict
    $$ImmutableSet$$ImmutableSet.prototype.isEmpty = function () {
      return this.root === $$nil$$nil;
    };

    // TODO code duplication with ImmutableDict
    // TODO what if `sort` suspends ?
    $$ImmutableSet$$ImmutableSet.prototype.has = function (key) {
      return $$Sorted$$key_get(this.root, this.sort, this.hash_fn(key)) !== $$nil$$nil;
    };

    // TODO what if `sort` suspends ?
    $$ImmutableSet$$ImmutableSet.prototype.add = function (key) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var hash = hash_fn(key);
      var node = $$Sorted$$key_set(root, sort, hash, new $$ImmutableSet$$SetNode($$nil$$nil, $$nil$$nil, hash, key));
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableSet$$ImmutableSet(node, sort, hash_fn);
      }
    };

    // TODO what if `sort` suspends ?
    $$ImmutableSet$$ImmutableSet.prototype.remove = function (key) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var node = $$Sorted$$key_remove(root, sort, hash_fn(key));
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableSet$$ImmutableSet(node, sort, hash_fn);
      }
    };

    $$ImmutableSet$$ImmutableSet.prototype.union = function (other) {
      var self = this;

      $$iter$$each(other, function (value) {
        self = self.add(value);
      });

      return self;
    };

    $$ImmutableSet$$ImmutableSet.prototype.intersect = function (other) {
      var self = this;

      if (self.isEmpty()) {
        return self;

      } else {
        var out = new $$ImmutableSet$$ImmutableSet($$nil$$nil, self.sort, self.hash_fn);

        $$iter$$each(other, function (value) {
          if (self.has(value)) {
            out = out.add(value);
          }
        });

        return out;
      }
    };

    $$ImmutableSet$$ImmutableSet.prototype.disjoint = function (other) {
      var self = this;

      $$iter$$each(other, function (value) {
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

      if (!self.isEmpty()) {
        $$iter$$each(other, function (value) {
          self = self.remove(value);
        });
      }

      return self;
    };


    function $$ImmutableSet$$isSet(x) {
      return x instanceof $$ImmutableSet$$ImmutableSet;
    }

    function $$ImmutableSet$$isSortedSet(x) {
      return $$ImmutableSet$$isSet(x) && x.hash_fn === $$util$$identity;
    }

    function $$ImmutableSet$$SortedSet(sort, array) {
      if (array != null) {
        // We don't use equal, for increased speed
        if ($$ImmutableSet$$isSortedSet(array) && array.sort === sort) {
          return array;
        } else {
          return new $$ImmutableSet$$ImmutableSet($$nil$$nil, sort, $$util$$identity).union(array);
        }
      } else {
        return new $$ImmutableSet$$ImmutableSet($$nil$$nil, sort, $$util$$identity);
      }
    }

    function $$ImmutableSet$$Set(array) {
      if (array != null) {
        if ($$ImmutableSet$$isSet(array) && !$$ImmutableSet$$isSortedSet(array)) {
          return array;
        } else {
          return new $$ImmutableSet$$ImmutableSet($$nil$$nil, $$Sorted$$simpleSort, $$hash$$hash).union(array);
        }
      } else {
        return new $$ImmutableSet$$ImmutableSet($$nil$$nil, $$Sorted$$simpleSort, $$hash$$hash);
      }
    }
    function $$Array$$copy(array) {
      var len = array.length;
      var out = new Array(len);

      for (var i = 0; i < len; ++i) {
        out[i] = array[i];
      }

      return out;
    }

    function $$Array$$insert(array, index, value) {
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

    function $$Array$$modify(array, index, f) {
      var old_value = array[index];
      var new_value = f(old_value);

      if (old_value === new_value) {
        return array;

      } else {
        var new_array = $$Array$$copy(array);
        new_array[index] = new_value;
        return new_array;
      }
    }

    function $$Array$$remove(array, index) {
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
    function $$Cons$$Cons(car, cdr) {
      this.car = car;
      this.cdr = cdr;
    }

    function $$Cons$$iter_cons(x) {
      return {
        next: function () {
          if (x === $$nil$$nil) {
            return { done: true };
          } else {
            var value = x.car;
            x = x.cdr;
            return { value: value };
          }
        }
      };
    }

    function $$Cons$$each_cons(x, f) {
      while (x !== $$nil$$nil) {
        f(x.car);
        x = x.cdr;
      }
    }


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
        return $$nil$$nil;
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
      if (node === $$nil$$nil) {
        return new $$ImmutableList$$ArrayNode($$nil$$nil, $$nil$$nil, [value]);

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
            array = $$Array$$insert(array, index, value);

            // TODO this fails when array_limit is 1
            if (len === $$ImmutableList$$array_limit) {
              var pivot  = $$ImmutableList$$ceiling(array.length / 2);
              var aleft  = array.slice(0, pivot);
              var aright = array.slice(pivot);

              if (left.depth < right.depth) {
                return new $$ImmutableList$$ArrayNode($$AVL$$insert_max(left, new $$ImmutableList$$ArrayNode($$nil$$nil, $$nil$$nil, aleft)), right, aright);
              } else {
                return new $$ImmutableList$$ArrayNode(left, $$AVL$$insert_min(right, new $$ImmutableList$$ArrayNode($$nil$$nil, $$nil$$nil, aright)), aleft);
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
          var new_array = $$Array$$modify(array, index, f);
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
          array = $$Array$$remove(array, index);

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
      if (node !== $$nil$$nil) {
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

    $$ImmutableList$$ImmutableList.prototype = Object.create($$Base$$ImmutableBase);

    $$toJSON$$fromJSON_registry["List"] = function (x) {
      return $$ImmutableList$$List($$toJSON$$fromJSON_array(x));
    };

    $$ImmutableList$$ImmutableList.prototype[$$toJSON$$tag_toJSON] = function (x) {
      return $$toJSON$$toJSON_array("List", x);
    };

    $$ImmutableList$$ImmutableList.prototype[$$hash$$tag_hash] = function (x) {
      if (x.hash === null) {
        var a = [];

        $$iter$$each(x, function (x) {
          a.push($$hash$$hash(x));
        });

        x.hash = "(List" + $$util$$join_lines(a, "  ") + ")";
      }

      return x.hash;
    };

    $$ImmutableList$$ImmutableList.prototype[$$toJS$$tag_toJS] = $$toJS$$toJS_array;

    $$ImmutableList$$ImmutableList.prototype[$$iter$$tag_iter] = function (x) {
      var tree = $$iter$$mapcat_iter($$AVL$$iter_tree(x.root), function (node) {
        return $$iter$$iter(node.array);
      });
      return $$iter$$concat_iter(tree, $$iter$$reverse_iter($$Cons$$iter_cons(x.tail)));
    };

    $$ImmutableList$$ImmutableList.prototype.isEmpty = function () {
      return this.root === $$nil$$nil && this.tail === $$nil$$nil;
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
          var node = $$AVL$$insert_max(root, new $$ImmutableList$$ArrayNode($$nil$$nil, $$nil$$nil, $$ImmutableList$$stack_to_array(tail, tail_size)));
          return new $$ImmutableList$$ImmutableList(node, new $$Cons$$Cons(value, $$nil$$nil), 1);

        } else {
          return new $$ImmutableList$$ImmutableList(root, new $$Cons$$Cons(value, tail), tail_size + 1);
        }

      } else if ($$ImmutableList$$nth_has(index, len)) {
        var size = root.size;
        // TODO should this be <= ?
        if (index < size) {
          return new $$ImmutableList$$ImmutableList($$ImmutableList$$nth_insert(root, index, value), tail, tail_size);

        } else {
          var array = $$Array$$insert($$ImmutableList$$stack_to_array(tail, tail_size), index - size, value);
          var node  = $$AVL$$insert_max(root, new $$ImmutableList$$ArrayNode($$nil$$nil, $$nil$$nil, array));
          return new $$ImmutableList$$ImmutableList(node, $$nil$$nil, 0);
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

      if (tail !== $$nil$$nil && index === len - 1) {
        return new $$ImmutableList$$ImmutableList(root, tail.cdr, tail_size - 1);

      } else if ($$ImmutableList$$nth_has(index, len)) {
        var size = root.size;
        if (index < size) {
          return new $$ImmutableList$$ImmutableList($$ImmutableList$$nth_remove(root, index), tail, tail_size);

        } else {
          var array = $$Array$$remove($$ImmutableList$$stack_to_array(tail, tail_size), index - size);
          var node  = $$AVL$$insert_max(root, new $$ImmutableList$$ArrayNode($$nil$$nil, $$nil$$nil, array));
          return new $$ImmutableList$$ImmutableList(node, $$nil$$nil, 0);
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

        if (tail !== $$nil$$nil && index === len - 1) {
          var value = f(tail.car);
          if (value === tail.car) {
            return this;
          } else {
            return new $$ImmutableList$$ImmutableList(root, new $$Cons$$Cons(value, tail.cdr), tail_size);
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
          var array = $$Array$$modify(stack, index - size, f);
          if (array === stack) {
            return this;
          } else {
            var node = $$AVL$$insert_max(root, new $$ImmutableList$$ArrayNode($$nil$$nil, $$nil$$nil, array));
            return new $$ImmutableList$$ImmutableList(node, $$nil$$nil, 0);
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
          return new $$ImmutableList$$ImmutableList($$nil$$nil, $$nil$$nil, 0);

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

          return new $$ImmutableList$$ImmutableList($$ImmutableList$$slices_to_tree(slices), $$nil$$nil, 0);

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

        if (rroot === $$nil$$nil && rtail === $$nil$$nil) {
          return this;

        } else if (lroot === $$nil$$nil && ltail === $$nil$$nil) {
          return right;

        } else {
          if (ltail !== $$nil$$nil) {
            lroot = $$AVL$$insert_max(lroot, new $$ImmutableList$$ArrayNode($$nil$$nil, $$nil$$nil, $$ImmutableList$$stack_to_array(ltail, this.tail_size)));
          }

          var node = $$AVL$$concat(lroot, rroot);
          return new $$ImmutableList$$ImmutableList(node, rtail, right.tail_size);
        }

      } else {
        var self = this;

        $$iter$$each(right, function (x) {
          self = self.insert(x);
        });

        return self;
      }
    };

    function $$ImmutableList$$isList(x) {
      return x instanceof $$ImmutableList$$ImmutableList;
    }

    function $$ImmutableList$$List(array) {
      if (array != null) {
        if (array instanceof $$ImmutableList$$ImmutableList) {
          return array;
        } else {
          return new $$ImmutableList$$ImmutableList($$nil$$nil, $$nil$$nil, 0).concat(array);
        }
      } else {
        return new $$ImmutableList$$ImmutableList($$nil$$nil, $$nil$$nil, 0);
      }
    }
    function $$ImmutableQueue$$ImmutableQueue(left, right, len) {
      this.left  = left;
      this.right = right;
      this.len   = len;
      this.hash  = null;
    }

    $$ImmutableQueue$$ImmutableQueue.prototype = Object.create($$Base$$ImmutableBase);

    $$toJSON$$fromJSON_registry["Queue"] = function (x) {
      return $$ImmutableQueue$$Queue($$toJSON$$fromJSON_array(x));
    };

    $$ImmutableQueue$$ImmutableQueue.prototype[$$toJSON$$tag_toJSON] = function (x) {
      return $$toJSON$$toJSON_array("Queue", x);
    };

    $$ImmutableQueue$$ImmutableQueue.prototype[$$toJS$$tag_toJS] = $$toJS$$toJS_array;

    $$ImmutableQueue$$ImmutableQueue.prototype.isEmpty = function () {
      return this.left === $$nil$$nil && this.right === $$nil$$nil;
    };

    $$ImmutableQueue$$ImmutableQueue.prototype[$$iter$$tag_iter] = function (x) {
      return $$iter$$concat_iter($$Cons$$iter_cons(x.left), $$iter$$reverse_iter($$Cons$$iter_cons(x.right)));
    };

    $$ImmutableQueue$$ImmutableQueue.prototype[$$hash$$tag_hash] = function (x) {
      if (x.hash === null) {
        var a = [];

        $$iter$$each(x, function (x) {
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
        return new $$ImmutableQueue$$ImmutableQueue(new $$Cons$$Cons(value, this.left), this.right, this.len + 1);
      } else {
        return new $$ImmutableQueue$$ImmutableQueue(this.left, new $$Cons$$Cons(value, this.right), this.len + 1);
      }
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.pop = function () {
      if (this.isEmpty()) {
        throw new Error("Cannot pop from an empty queue");
      } else {
        var left = this.left.cdr;
        if (left === $$nil$$nil) {
          var right = $$nil$$nil;

          // TODO a little gross
          $$Cons$$each_cons(this.right, function (x) {
            right = new $$Cons$$Cons(x, right);
          });

          return new $$ImmutableQueue$$ImmutableQueue(right, $$nil$$nil, this.len - 1);
        } else {
          return new $$ImmutableQueue$$ImmutableQueue(left, this.right, this.len - 1);
        }
      }
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.concat = function (right) {
      var self = this;

      $$iter$$each(right, function (x) {
        self = self.push(x);
      });

      return self;
    };


    function $$ImmutableQueue$$isQueue(x) {
      return x instanceof $$ImmutableQueue$$ImmutableQueue;
    }

    function $$ImmutableQueue$$Queue(x) {
      if (x != null) {
        if (x instanceof $$ImmutableQueue$$ImmutableQueue) {
          return x;
        } else {
          return new $$ImmutableQueue$$ImmutableQueue($$nil$$nil, $$nil$$nil, 0).concat(x);
        }
      } else {
        return new $$ImmutableQueue$$ImmutableQueue($$nil$$nil, $$nil$$nil, 0);
      }
    }
    function $$ImmutableStack$$ImmutableStack(root, len) {
      this.root = root;
      this.len  = len;
      this.hash = null;
    }

    $$ImmutableStack$$ImmutableStack.prototype = Object.create($$Base$$ImmutableBase);

    $$toJSON$$fromJSON_registry["Stack"] = function (x) {
      return $$ImmutableStack$$Stack($$toJSON$$fromJSON_array(x));
    };

    $$ImmutableStack$$ImmutableStack.prototype[$$iter$$tag_iter] = function (x) {
      return $$iter$$reverse_iter($$Cons$$iter_cons(x.root));
    };

    $$ImmutableStack$$ImmutableStack.prototype[$$toJSON$$tag_toJSON] = function (x) {
      return $$toJSON$$toJSON_array("Stack", x);
    };

    $$ImmutableStack$$ImmutableStack.prototype[$$toJS$$tag_toJS] = $$toJS$$toJS_array;

    // TODO code duplication with ImmutableSet
    $$ImmutableStack$$ImmutableStack.prototype.isEmpty = function () {
      return this.root === $$nil$$nil;
    };

    // TODO code duplication
    $$ImmutableStack$$ImmutableStack.prototype[$$hash$$tag_hash] = function (x) {
      if (x.hash === null) {
        var a = [];

        $$iter$$each(x, function (x) {
          a.push($$hash$$hash(x));
        });

        x.hash = "(Stack" + $$util$$join_lines(a, "  ") + ")";
      }

      return x.hash;
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
      return new $$ImmutableStack$$ImmutableStack(new $$Cons$$Cons(value, this.root), this.len + 1);
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

      $$iter$$each(right, function (x) {
        self = self.push(x);
      });

      return self;
    };


    function $$ImmutableStack$$isStack(x) {
      return x instanceof $$ImmutableStack$$ImmutableStack;
    }

    function $$ImmutableStack$$Stack(x) {
      if (x != null) {
        if (x instanceof $$ImmutableStack$$ImmutableStack) {
          return x;
        } else {
          return new $$ImmutableStack$$ImmutableStack($$nil$$nil, 0).concat(x);
        }
      } else {
        return new $$ImmutableStack$$ImmutableStack($$nil$$nil, 0);
      }
    }

    function $$ImmutableRecord$$checkKey(key) {
      // Tags are currently implemented as strings
      if (typeof key !== "string") {
        throw new Error("Expected key to be a string or Tag but got " + key);
      }
    }

    function $$ImmutableRecord$$ImmutableRecord(keys, values) {
      this.keys   = keys;
      this.values = values;
      this.hash   = null;
    }

    $$ImmutableRecord$$ImmutableRecord.prototype = Object.create($$Base$$ImmutableBase);

    $$toJSON$$fromJSON_registry["Record"] = function (x) {
      return $$ImmutableRecord$$Record($$toJSON$$fromJSON_object(x));
    };

    $$ImmutableRecord$$ImmutableRecord.prototype[$$toJSON$$tag_toJSON] = function (x) {
      return $$toJSON$$toJSON_object("Record", x);
    };

    $$ImmutableRecord$$ImmutableRecord.prototype[$$toJS$$tag_toJS] = $$toJS$$toJS_object;

    $$ImmutableRecord$$ImmutableRecord.prototype[$$hash$$tag_hash] = function (x) {
      if (x.hash === null) {
        x.hash = "(Record" + $$hash$$hash_dict(x, "  ") + ")";
      }

      return x.hash;
    };

    $$ImmutableRecord$$ImmutableRecord.prototype[$$iter$$tag_iter] = function (x) {
      var keys   = x.keys;
      var values = x.values;

      // TODO a little gross
      return $$iter$$iter($$iter$$map($$iter$$iter_object(keys), function (_array) {
        var s     = _array[0];
        var index = _array[1];
        return [s, values[index]];
      }));
    };

    $$ImmutableRecord$$ImmutableRecord.prototype.get = function (key) {
      $$ImmutableRecord$$checkKey(key);

      var index = this.keys[key];
      if (index == null) {
        throw new Error("Key " + key + " not found");

      } else {
        return this.values[index];
      }
    };

    $$ImmutableRecord$$ImmutableRecord.prototype.set = function (key, value) {
      return this.modify(key, function () {
        return value;
      });
    };

    $$ImmutableRecord$$ImmutableRecord.prototype.modify = function (key, f) {
      $$ImmutableRecord$$checkKey(key);

      var keys  = this.keys;
      var index = keys[key];
      if (index == null) {
        throw new Error("Key " + key + " not found");

      } else {
        var values = this.values;
        var array  = $$Array$$modify(values, index, f);
        if (array === values) {
          return this;
        } else {
          return new $$ImmutableRecord$$ImmutableRecord(keys, array);
        }
      }
    };

    // TODO code duplication with ImmutableDict
    $$ImmutableRecord$$ImmutableRecord.prototype.update = function (other) {
      var self = this;

      $$iter$$each($$iter$$iter_object(other), function (_array) {
        var key   = _array[0];
        var value = _array[1];

        self = self.set(key, value);
      });

      return self;
    };


    function $$ImmutableRecord$$isRecord(x) {
      return x instanceof $$ImmutableRecord$$ImmutableRecord;
    }

    function $$ImmutableRecord$$Record(obj) {
      var keys   = {};
      var values = [];

      if (obj != null) {
        if ($$ImmutableRecord$$isRecord(obj)) {
          return obj;

        } else {
          $$iter$$each($$iter$$iter_object(obj), function (_array) {
            var key   = _array[0];
            var value = _array[1];

            $$ImmutableRecord$$checkKey(key);

            keys[key] = values.push(value) - 1;
          });
        }
      }

      return new $$ImmutableRecord$$ImmutableRecord(keys, values);
    }

    var $$MutableRef$$ref_id = 0;

    function $$MutableRef$$MutableRef(value, onchange) {
      this._id = ++$$MutableRef$$ref_id;
      this._value = value;
      this._onchange = onchange;
    }

    $$MutableRef$$MutableRef.prototype = Object.create($$Base$$MutableBase);

    $$MutableRef$$MutableRef.prototype[$$hash$$tag_hash] = function (x) {
      return "(Ref " + $$hash$$hash(x._id) + ")";
    };

    $$MutableRef$$MutableRef.prototype.get = function () {
      return this._value;
    };

    $$MutableRef$$MutableRef.prototype.set = function (value) {
      var old = this._value;
      if (value !== old) {
        this._value = value;
        if (this._onchange != null) {
          this._onchange(old, value);
        }
      }
    };

    $$MutableRef$$MutableRef.prototype.modify = function (f) {
      this.set(f(this.get()));
    };


    function $$MutableRef$$deref(x) {
      if ($$MutableRef$$isRef(x)) {
        return x.get();
      } else {
        return x;
      }
    }

    function $$MutableRef$$isRef(x) {
      return x instanceof $$MutableRef$$MutableRef;
    }

    function $$MutableRef$$Ref(value, onchange) {
      if (arguments.length < 1 || arguments.length > 2) {
        throw new Error("Expected 1 to 2 arguments but got " + arguments.length);
      }

      return new $$MutableRef$$MutableRef(value, onchange);
    }
    function $$$Immutable$Immutable$$equal(x, y) {
      return x === y || $$hash$$hash(x) === $$hash$$hash(y);
    }

    function $$$Immutable$Immutable$$isImmutable(x) {
      if ($$util$$isObject(x)) {
        return Object.isFrozen(x) ||
               $$ImmutableDict$$isDict(x)  ||
               $$ImmutableSet$$isSet(x)   ||
               $$ImmutableList$$isList(x)  ||
               $$ImmutableQueue$$isQueue(x) ||
               $$ImmutableStack$$isStack(x) ||
               $$ImmutableRecord$$isRecord(x);
      } else {
        var type = typeof x;
        // Tags are currently implemented with strings
        return type === "string"  ||
               type === "number"  ||
               type === "boolean" ||
               type === "symbol"  ||
               x == null;
      }
    }

    function $$$Immutable$Immutable$$fromJS(x) {
      if (Array.isArray(x)) {
        var out = $$ImmutableList$$List();

        for (var i = 0, l = x.length; i < l; ++i) {
          out = out.insert($$$Immutable$Immutable$$fromJS(x[i]));
        }

        return out;

      } else if ($$util$$isJSLiteral(x)) {
        var out = $$ImmutableDict$$Dict();

        // TODO should this only include own properties ...?
        for (var s in x) {
          out = out.set(s, $$$Immutable$Immutable$$fromJS(x[s]));
        }

        return out;

      } else {
        return x;
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
      exports.isDict = $$ImmutableDict$$isDict;
      exports.isSet = $$ImmutableSet$$isSet;
      exports.isSortedDict = $$ImmutableDict$$isSortedDict;
      exports.isSortedSet = $$ImmutableSet$$isSortedSet;
      exports.isList = $$ImmutableList$$isList;
      exports.isQueue = $$ImmutableQueue$$isQueue;
      exports.isStack = $$ImmutableStack$$isStack;
      exports.isImmutable = $$$Immutable$Immutable$$isImmutable;
      exports.SortedDict = $$ImmutableDict$$SortedDict;
      exports.SortedSet = $$ImmutableSet$$SortedSet;
      exports.Dict = $$ImmutableDict$$Dict;
      exports.Set = $$ImmutableSet$$Set;
      exports.List = $$ImmutableList$$List;
      exports.Queue = $$ImmutableQueue$$Queue;
      exports.Stack = $$ImmutableStack$$Stack;
      exports.simpleSort = $$Sorted$$simpleSort;
      exports.isRecord = $$ImmutableRecord$$isRecord;
      exports.Record = $$ImmutableRecord$$Record;
      exports.toJSON = $$toJSON$$toJSON;
      exports.fromJSON = $$toJSON$$fromJSON;
      exports.deref = $$MutableRef$$deref;
      exports.Ref = $$MutableRef$$Ref;
      exports.isRef = $$MutableRef$$isRef;
      exports.isTag = $$Tag$$isTag;
      exports.isUUIDTag = $$Tag$$isUUIDTag;
      exports.Tag = $$Tag$$Tag;
      exports.UUIDTag = $$Tag$$UUIDTag;
      exports.each = $$iter$$each;
      exports.map = $$iter$$map;
      exports.keep = $$iter$$keep;
      exports.findIndex = $$iter$$findIndex;
      exports.reverse = $$iter$$reverse;
    });
    function $$Header$$header() {
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
          $$Benchmark$$.message("Version: 3.0.0");
        });
        /*benchmark.group("Elm", function () {
          benchmark.message("URL: http://elm-lang.org/");
          benchmark.message("Version: 0.13");
        });*/
      });
    }
    var src$Benchmark$Record$$immutablejs = require("immutable");
    var src$Benchmark$Record$$mori        = require("mori");

    $$Header$$header();

    function src$Benchmark$Record$$copy(input) {
      var output = {};

      for (var s in input) {
        output[s] = input[s];
      }

      return output;
    }

    function src$Benchmark$Record$$random(input) {
      return input[Math.floor(Math.random() * input.length)];
    }

    function src$Benchmark$Record$$run(counter) {
      var only_keys = [];
      var keys = [];
      var record_keys = {};
      var mori_keys = [];

      for (var i = 0; i < counter; ++i) {
        only_keys.push("foo" + i);
        record_keys["foo" + i] = i;
        keys.push(["foo" + i, i]);
        mori_keys.push("foo" + i, i);
      }

      var ImmutableJSRecord = src$Benchmark$Record$$immutablejs.Record(record_keys);

      $$Benchmark$$.group("Record with " + counter + " keys", function () {
        $$Benchmark$$.group("Creating", function () {
          $$Benchmark$$.message("JavaScript Object");

          $$Benchmark$$.time("JavaScript Object Copying", function () {
            src$Benchmark$Record$$copy(record_keys);
          });

          $$Benchmark$$.time("Immutable-js Map", function () {
            src$Benchmark$Record$$immutablejs.Map(keys);
          });

          $$Benchmark$$.time("Immutable-js Record", function () {
            new ImmutableJSRecord(record_keys);
          });

          $$Benchmark$$.time("Mori Hash Map", function () {
            src$Benchmark$Record$$mori.hash_map.apply(null, mori_keys);
          });

          $$Benchmark$$.time("Mori Sorted Map", function () {
            src$Benchmark$Record$$mori.sorted_map.apply(null, mori_keys);
          });

          $$Benchmark$$.time("Immutable Dict", function () {
            $$ImmutableDict$$Dict(keys);
          });

          $$Benchmark$$.time("Immutable SortedDict", function () {
            $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, keys);
          });

          $$Benchmark$$.time("Immutable Record", function () {
            $$ImmutableRecord$$Record(keys);
          });
        });


        $$Benchmark$$.group("get first", function () {
          $$Benchmark$$.message("JavaScript Object");

          ;(function () {
            var o = record_keys;

            $$Benchmark$$.time("JavaScript Object Copying", function () {
              o["foo0"];
            });

            $$Benchmark$$.time("JavaScript Object Copying (prop)", function () {
              o.foo0;
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$immutablejs.Map(keys);

            $$Benchmark$$.time("Immutable-js Map", function () {
              o.get("foo0");
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$$.time("Immutable-js Record", function () {
              o.get("foo0");
            });

            $$Benchmark$$.time("Immutable-js Record (prop)", function () {
              o.foo0;
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$mori.hash_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Hash Map", function () {
              src$Benchmark$Record$$mori.get(o, "foo0");
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$mori.sorted_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Sorted Map", function () {
              src$Benchmark$Record$$mori.get(o, "foo0");
            });
          })();

          ;(function () {
            var o = $$ImmutableDict$$Dict(keys);

            $$Benchmark$$.time("Immutable Dict", function () {
              o.get("foo0");
            });
          })();

          ;(function () {
            var o = $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, keys);

            $$Benchmark$$.time("Immutable SortedDict", function () {
              o.get("foo0");
            });
          })();

          ;(function () {
            var o = $$ImmutableRecord$$Record(keys);

            $$Benchmark$$.time("Immutable Record", function () {
              o.get("foo0");
            });
          })();
        });


        $$Benchmark$$.group("get random", function () {
          $$Benchmark$$.message("JavaScript Object");

          ;(function () {
            var o = record_keys;

            $$Benchmark$$.time("JavaScript Object Copying", function () {
              o[src$Benchmark$Record$$random(only_keys)];
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$immutablejs.Map(keys);

            $$Benchmark$$.time("Immutable-js Map", function () {
              o.get(src$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$$.time("Immutable-js Record", function () {
              o.get(src$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$mori.hash_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Hash Map", function () {
              src$Benchmark$Record$$mori.get(o, src$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$mori.sorted_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Sorted Map", function () {
              src$Benchmark$Record$$mori.get(o, src$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$ImmutableDict$$Dict(keys);

            $$Benchmark$$.time("Immutable Dict", function () {
              o.get(src$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, keys);

            $$Benchmark$$.time("Immutable SortedDict", function () {
              o.get(src$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$ImmutableRecord$$Record(keys);

            $$Benchmark$$.time("Immutable Record", function () {
              o.get(src$Benchmark$Record$$random(only_keys));
            });
          })();
        });


        $$Benchmark$$.group("set first", function () {
          ;(function () {
            var o = src$Benchmark$Record$$copy(record_keys);

            $$Benchmark$$.time("JavaScript Object", function () {
              o["foo0"] = -1;
            });

            $$Benchmark$$.time("JavaScript Object (prop)", function () {
              o.foo0 = -1;
            });
          })();

          ;(function () {
            var o = record_keys;

            $$Benchmark$$.time("JavaScript Object Copying", function () {
              var x = src$Benchmark$Record$$copy(o);
              x["foo0"] = -1;
            });

            $$Benchmark$$.time("JavaScript Object Copying (prop)", function () {
              var x = src$Benchmark$Record$$copy(o);
              x.foo0 = -1;
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$immutablejs.Map(keys);

            $$Benchmark$$.time("Immutable-js Map", function () {
              o.set("foo0", -1);
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$$.time("Immutable-js Record", function () {
              o.set("foo0", -1);
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$mori.hash_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Hash Map", function () {
              src$Benchmark$Record$$mori.assoc(o, "foo0", -1);
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$mori.sorted_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Sorted Map", function () {
              src$Benchmark$Record$$mori.assoc(o, "foo0", -1);
            });
          })();

          ;(function () {
            var o = $$ImmutableDict$$Dict(keys);

            $$Benchmark$$.time("Immutable Dict", function () {
              o.set("foo0", -1);
            });
          })();

          ;(function () {
            var o = $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, keys);

            $$Benchmark$$.time("Immutable SortedDict", function () {
              o.set("foo0", -1);
            });
          })();

          ;(function () {
            var o = $$ImmutableRecord$$Record(keys);

            $$Benchmark$$.time("Immutable Record", function () {
              o.set("foo0", -1);
            });
          })();
        });


        $$Benchmark$$.group("set random", function () {
          ;(function () {
            var o = src$Benchmark$Record$$copy(record_keys);

            $$Benchmark$$.time("JavaScript Object", function () {
              o[src$Benchmark$Record$$random(only_keys)] = -1;
            });
          })();

          ;(function () {
            var o = record_keys;

            $$Benchmark$$.time("JavaScript Object Copying", function () {
              var x = src$Benchmark$Record$$copy(o);
              x[src$Benchmark$Record$$random(only_keys)] = -1;
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$immutablejs.Map(keys);

            $$Benchmark$$.time("Immutable-js Map", function () {
              o.set(src$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$$.time("Immutable-js Record", function () {
              o.set(src$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$mori.hash_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Hash Map", function () {
              src$Benchmark$Record$$mori.assoc(o, src$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = src$Benchmark$Record$$mori.sorted_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Sorted Map", function () {
              src$Benchmark$Record$$mori.assoc(o, src$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$ImmutableDict$$Dict(keys);

            $$Benchmark$$.time("Immutable Dict", function () {
              o.set(src$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, keys);

            $$Benchmark$$.time("Immutable SortedDict", function () {
              o.set(src$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$ImmutableRecord$$Record(keys);

            $$Benchmark$$.time("Immutable Record", function () {
              o.set(src$Benchmark$Record$$random(only_keys), -1);
            });
          })();
        });
      });
    }


    src$Benchmark$Record$$run(1);
    //run(2);
    //run(3);
    //run(4);
    //run(5);
    src$Benchmark$Record$$run(10);
    src$Benchmark$Record$$run(100);
    src$Benchmark$Record$$run(1000);
    src$Benchmark$Record$$run(10000);
    //run(100000);
    //run(1000000);

    $$Benchmark$$.run();
}).call(this);

//# sourceMappingURL=Benchmark.js.map