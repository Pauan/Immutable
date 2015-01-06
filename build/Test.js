(function() {
    "use strict";
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
    var $$$Immutable$nil$$nil = {};
    $$$Immutable$nil$$nil.depth      = 0;
    $$$Immutable$nil$$nil.size       = 0;
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

    function $$AVL$$iter_tree(node) {
      var parents = [];

      while (node !== $$$Immutable$nil$$nil) {
        parents.push(node);
        node = node.left;
      }

      return {
        next: function () {
          if (parents.length) {
            var parent = parents.pop();

            node = parent.right;

            while (node !== $$$Immutable$nil$$nil) {
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
      while (node !== $$$Immutable$nil$$nil) {
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
      if (node === $$$Immutable$nil$$nil) {
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
      if (node === $$$Immutable$nil$$nil) {
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
      if (node === $$$Immutable$nil$$nil) {
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
      return this.root === $$$Immutable$nil$$nil;
    };

    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.has = function (key) {
      return $$Sorted$$key_get(this.root, this.sort, this.hash_fn(key)) !== $$$Immutable$nil$$nil;
    };

    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.get = function (key, def) {
      var node = $$Sorted$$key_get(this.root, this.sort, this.hash_fn(key));
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
      var hash_fn = this.hash_fn;
      var hash = hash_fn(key);
      var node = $$Sorted$$key_set(root, sort, hash, new $$ImmutableDict$$KeyNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, hash, key, value));
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
          return new $$ImmutableDict$$ImmutableDict($$$Immutable$nil$$nil, sort, $$util$$identity).merge(obj);
        }
      } else {
        return new $$ImmutableDict$$ImmutableDict($$$Immutable$nil$$nil, sort, $$util$$identity);
      }
    }

    function $$ImmutableDict$$Dict(obj) {
      if (obj != null) {
        if ($$ImmutableDict$$isDict(obj) && !$$ImmutableDict$$isSortedDict(obj)) {
          return obj;
        } else {
          return new $$ImmutableDict$$ImmutableDict($$$Immutable$nil$$nil, $$Sorted$$simpleSort, $$hash$$hash).merge(obj);
        }
      } else {
        return new $$ImmutableDict$$ImmutableDict($$$Immutable$nil$$nil, $$Sorted$$simpleSort, $$hash$$hash);
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
      return this.root === $$$Immutable$nil$$nil;
    };

    // TODO code duplication with ImmutableDict
    // TODO what if `sort` suspends ?
    $$ImmutableSet$$ImmutableSet.prototype.has = function (key) {
      return $$Sorted$$key_get(this.root, this.sort, this.hash_fn(key)) !== $$$Immutable$nil$$nil;
    };

    // TODO what if `sort` suspends ?
    $$ImmutableSet$$ImmutableSet.prototype.add = function (key) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var hash = hash_fn(key);
      var node = $$Sorted$$key_set(root, sort, hash, new $$ImmutableSet$$SetNode($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, hash, key));
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
        var out = new $$ImmutableSet$$ImmutableSet($$$Immutable$nil$$nil, self.sort, self.hash_fn);

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
          return new $$ImmutableSet$$ImmutableSet($$$Immutable$nil$$nil, sort, $$util$$identity).union(array);
        }
      } else {
        return new $$ImmutableSet$$ImmutableSet($$$Immutable$nil$$nil, sort, $$util$$identity);
      }
    }

    function $$ImmutableSet$$Set(array) {
      if (array != null) {
        if ($$ImmutableSet$$isSet(array) && !$$ImmutableSet$$isSortedSet(array)) {
          return array;
        } else {
          return new $$ImmutableSet$$ImmutableSet($$$Immutable$nil$$nil, $$Sorted$$simpleSort, $$hash$$hash).union(array);
        }
      } else {
        return new $$ImmutableSet$$ImmutableSet($$$Immutable$nil$$nil, $$Sorted$$simpleSort, $$hash$$hash);
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
          if (x === $$$Immutable$nil$$nil) {
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
      while (x !== $$$Immutable$nil$$nil) {
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
            array = $$Array$$insert(array, index, value);

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
          return new $$ImmutableList$$ImmutableList(node, new $$Cons$$Cons(value, $$$Immutable$nil$$nil), 1);

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
          var array = $$Array$$remove($$ImmutableList$$stack_to_array(tail, tail_size), index - size);
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
          return new $$ImmutableList$$ImmutableList($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, 0).concat(array);
        }
      } else {
        return new $$ImmutableList$$ImmutableList($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, 0);
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
      return this.left === $$$Immutable$nil$$nil && this.right === $$$Immutable$nil$$nil;
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
        if (left === $$$Immutable$nil$$nil) {
          var right = $$$Immutable$nil$$nil;

          // TODO a little gross
          $$Cons$$each_cons(this.right, function (x) {
            right = new $$Cons$$Cons(x, right);
          });

          return new $$ImmutableQueue$$ImmutableQueue(right, $$$Immutable$nil$$nil, this.len - 1);
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
          return new $$ImmutableQueue$$ImmutableQueue($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, 0).concat(x);
        }
      } else {
        return new $$ImmutableQueue$$ImmutableQueue($$$Immutable$nil$$nil, $$$Immutable$nil$$nil, 0);
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
      return this.root === $$$Immutable$nil$$nil;
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
          return new $$ImmutableStack$$ImmutableStack($$$Immutable$nil$$nil, 0).concat(x);
        }
      } else {
        return new $$ImmutableStack$$ImmutableStack($$$Immutable$nil$$nil, 0);
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
    function $$assert$$assert(x) {
      if (arguments.length !== 1) {
        throw new Error("Invalid argument length");
      }
      if (!x) {
        throw new Error("Failed: " + x);
      }
    }


    // TODO move this into a different module
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function src$Test$Test$$randomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function src$Test$Test$$otherSort(x, y) {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else {
        return 1;
      }
    }

    // http://bost.ocks.org/mike/shuffle/
    // TODO test whether this algorithm has statistical bias or not
    // TODO this is only needed for "test/test.js"
    function src$Test$Test$$shuffle(array) {
      var i = array.length;

      while (i) {
        var j = src$Test$Test$$randomInt(0, i);
        --i;
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }


    var src$Test$Test$$TESTS_SUCCEEDED = 0;
    var src$Test$Test$$TESTS_FAILED = 0;
    var src$Test$Test$$CONTEXT = null;

    function src$Test$Test$$context(s, f) {
      var old_context = src$Test$Test$$CONTEXT;
      src$Test$Test$$CONTEXT = s;
      try {
        f();
      } finally {
        src$Test$Test$$CONTEXT = old_context;
      }
    }

    function src$Test$Test$$test(s, f) {
      try {
        f();
        ++src$Test$Test$$TESTS_SUCCEEDED;
      } catch (e) {
        ++src$Test$Test$$TESTS_FAILED;
        console.log("");
        console.log("*** " + (src$Test$Test$$CONTEXT ? src$Test$Test$$CONTEXT + "." : "") + s + " FAILED");
        if (e.stack) {
          console.log(e.stack);
        } else {
          console.log(e);
        }
        console.log("");
      }
    }

    function src$Test$Test$$assert_raises(f, message) {
      try {
        f();
        throw new Error("Expected an error, but it did not happen");
      } catch (e) {
        if (e.message !== message) {
          throw new Error("Expected \"" + message + "\" but got \"" + e.message + "\"");
        }
      }
    }

    //var { zip, toArray } = require('sjs:sequence');

    function src$Test$Test$$isObject(x) {
      return Object(x) === x;
    }

    var src$Test$Test$$hasOwnProperty = {}.hasOwnProperty;

    /*function shallowEqual(x, y) {
      if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length === y.length) {
          for (var i = 0, l = x.length; i < l; ++i) {
            if (x[i] !== y[i]) {
              return false;
            }
          }
          return true;
        } else {
          return false;
        }
      } else {
        return x === y;
      }
    }*/

    function src$Test$Test$$deepEqual(x, y) {
      if (x === y) {
        return true;

      } else if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length === y.length) {
          for (var i = 0, l = x.length; i < l; ++i) {
            if (!src$Test$Test$$deepEqual(x[i], y[i])) {
              return false;
            }
          }
          return true;
        } else {
          return false;
        }

      } else if (src$Test$Test$$isObject(x) && src$Test$Test$$isObject(y)) {
        if (Object.getPrototypeOf(x) === Object.getPrototypeOf(y)) {
          var x_keys = Object.getOwnPropertyNames(x);
          var y_keys = Object.getOwnPropertyNames(y);

          for (var i = 0, l = x_keys.length; i < l; ++i) {
            var s = x_keys[i];
            if (src$Test$Test$$hasOwnProperty.call(y, s)) {
              if (!src$Test$Test$$deepEqual(x[s], y[s])) {
                return false;
              }
            } else {
              return false;
            }
          }

          for (var i = 0, l = y_keys.length; i < l; ++i) {
            var s = y_keys[i];
            if (!src$Test$Test$$hasOwnProperty.call(x, s)) {
              return false;
            }
          }

          return true;

        } else {
          return false;
        }

      } else {
        return false;
      }
    }

    function src$Test$Test$$test_each(constructor, input) {
      var a = [];
      $$iter$$each(constructor(input), function (x) {
        a.push(x);
      });
      $$assert$$assert(src$Test$Test$$deepEqual(a, input));
    }


    function src$Test$Test$$verify_json_equal(x) {
      var y = $$toJSON$$toJSON(x);
      $$assert$$assert(y !== x);

      var z = $$toJSON$$fromJSON(y);
      $$assert$$assert(z !== y);

      $$assert$$assert($$$Immutable$Immutable$$equal(x, z));
    }


    function src$Test$Test$$verify_json(x, expected) {
      var y = $$toJSON$$toJSON(x);
      $$assert$$assert(y !== x);

      var z = $$toJSON$$fromJSON(y);
      $$assert$$assert(z !== y);

      $$assert$$assert($$$Immutable$Immutable$$equal(x, z));
      $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(x), expected));
      $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(z), expected));
    }


    // TODO test that this works correctly
    function src$Test$Test$$verify_dict(tree, obj) {
      var sort = tree.sort;
      var hash_fn = tree.hash_fn;

      function loop(node, lt, gt) {
        if (node !== $$$Immutable$nil$$nil) {
          var left  = node.left;
          var right = node.right;

          $$assert$$assert(node.depth === Math.max(left.depth, right.depth) + 1);

          var diff = left.depth - right.depth;
          $$assert$$assert(diff === -1 || diff === 0 || diff === 1);

          // Every left node must be lower than the parent node
          lt.forEach(function (parent) {
            $$assert$$assert(sort(hash_fn(node.key), hash_fn(parent.key)) < 0);
          });

          // Every right node must be greater than the parent node
          gt.forEach(function (parent) {
            $$assert$$assert(sort(hash_fn(node.key), hash_fn(parent.key)) > 0);
          });

          loop(left,  lt.concat([node]), gt);
          loop(right, lt, gt.concat([node]));
        }
      }
      loop(tree.root, [], []);

      $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(tree), obj));

      return tree;
    }

    function src$Test$Test$$verify_set(tree, array) {
      return src$Test$Test$$verify_dict(tree, array);
    }

    function src$Test$Test$$verify_list(tree, array) {
      function loop(node) {
        if (node !== $$$Immutable$nil$$nil) {
          var left  = node.left;
          var right = node.right;

          $$assert$$assert(node.depth === Math.max(left.depth, right.depth) + 1);

          var diff = left.depth - right.depth;
          $$assert$$assert(diff === -1 || diff === 0 || diff === 1);

          $$assert$$assert(node.array.length <= 125);

          $$assert$$assert(node.size === left.size + right.size + node.array.length);
          loop(left);
          loop(right);
        }
      }
      loop(tree.root);

      var count = 0;
      var cons = tree.tail;
      while (cons !== $$$Immutable$nil$$nil) {
        ++count;
        cons = cons.cdr;
      }

      $$assert$$assert(count === tree.tail_size);
      $$assert$$assert(tree.tail_size <= 125);

      $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(tree), array));

      return tree;
    }

    function src$Test$Test$$verify_queue(queue, array) {
      if (!queue.isEmpty()) {
        $$assert$$assert(queue.left !== $$$Immutable$nil$$nil);
      }

      $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(queue), array));

      return queue;
    }

    function src$Test$Test$$verify_stack(stack, array) {
      $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(stack), array));

      return stack;
    }

    function src$Test$Test$$verify_record(record, obj) {
      var count = 0;

      for (var s in record.keys) {
        ++count;
      }

      $$assert$$assert(count === record.values.length);

      $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(record), obj));

      return record;
    }

    function src$Test$Test$$random_int(max) {
      return Math.floor(Math.random() * max);
    }

    function src$Test$Test$$random_list(max) {
      var out = [];
      for (var i = 0; i < max; ++i) {
        out.push(i);
      }
      src$Test$Test$$shuffle(out);
      return out;
    }


    src$Test$Test$$context("Dict", function () {
      var dict_empty = $$ImmutableDict$$Dict();
      var dict_foo   = $$ImmutableDict$$Dict().set("foo", 1);

      src$Test$Test$$test("isDict", function () {
        $$assert$$assert(!$$ImmutableDict$$isDict($$ImmutableSet$$Set()));

        $$assert$$assert($$ImmutableDict$$isDict($$ImmutableDict$$Dict()));
        $$assert$$assert($$ImmutableDict$$isDict($$ImmutableDict$$SortedDict($$Sorted$$simpleSort)));

        $$assert$$assert($$ImmutableDict$$isSortedDict($$ImmutableDict$$SortedDict($$Sorted$$simpleSort)));
        $$assert$$assert(!$$ImmutableDict$$isSortedDict($$ImmutableDict$$Dict()));
      });

      src$Test$Test$$test("verify", function () {
        src$Test$Test$$verify_dict(dict_empty, {});
        src$Test$Test$$verify_dict(dict_foo, { foo: 1 });
      });

      src$Test$Test$$test("init", function () {
        var x = $$ImmutableDict$$Dict({ foo: 1 });
        src$Test$Test$$verify_dict(x, { foo: 1 });
        $$assert$$assert($$$Immutable$Immutable$$equal(x, dict_foo));
        $$assert$$assert($$$Immutable$Immutable$$equal(dict_foo, x));
      });

      src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(dict_empty.isEmpty());
        $$assert$$assert(!dict_foo.isEmpty());
      });

      src$Test$Test$$test("has", function () {
        $$assert$$assert(!dict_empty.has("foo"));
        $$assert$$assert(!dict_empty.has("bar"));

        $$assert$$assert(dict_foo.has("foo"));
        $$assert$$assert(!dict_foo.has("bar"));
      });

      src$Test$Test$$test("get", function () {
        src$Test$Test$$assert_raises(function () {
          dict_empty.get("foo");
        }, "Key foo not found");

        $$assert$$assert(dict_empty.get("foo", 50) === 50);

        $$assert$$assert(dict_foo.get("foo") === 1);
        $$assert$$assert(dict_foo.get("foo", 50) === 1);
      });

      src$Test$Test$$test("set", function () {
        var dict_bar = dict_empty.set("bar", 2);
        $$assert$$assert(!dict_empty.has("bar"));
        $$assert$$assert(dict_bar.has("bar"));
        $$assert$$assert(dict_bar.get("bar") === 2);

        var dict_foo2 = dict_foo.set("foo", 3);
        $$assert$$assert(dict_foo.get("foo") === 1);
        $$assert$$assert(dict_foo2.get("foo") === 3);
      });

      src$Test$Test$$test("modify", function () {
        var ran = false;

        src$Test$Test$$assert_raises(function () {
          dict_empty.modify("foo", function (x) {
            ran = true;
            return x + 1;
          });
        }, "Key foo not found");

        $$assert$$assert(ran === false);


        var ran = false;

        var dict_foo2 = dict_foo.modify("foo", function (x) {
          ran = true;
          $$assert$$assert(x === 1);
          return x + 5;
        });

        $$assert$$assert(ran === true);

        $$assert$$assert(dict_foo.get("foo") === 1);
        $$assert$$assert(dict_foo2.get("foo") === 6);
      });

      src$Test$Test$$test("remove", function () {
        $$assert$$assert(!dict_empty.has("foo"));

        var dict_empty2 = dict_empty.remove("foo");
        $$assert$$assert(!dict_empty2.has("foo"));

        var dict_foo2 = dict_foo.remove("foo");
        $$assert$$assert(dict_foo.has("foo"));
        $$assert$$assert(!dict_foo2.has("foo"));
      });

      src$Test$Test$$test("merge", function () {
        src$Test$Test$$verify_dict($$ImmutableDict$$Dict({ foo: 1 }), { foo: 1 });
        src$Test$Test$$verify_dict($$ImmutableDict$$Dict({ foo: 1 }).merge([]), { foo: 1 });
        src$Test$Test$$verify_dict($$ImmutableDict$$Dict({ foo: 1 }).merge([["bar", 2]]), { foo: 1, bar: 2 });
        src$Test$Test$$verify_dict($$ImmutableDict$$Dict({ foo: 1 }).merge($$ImmutableDict$$Dict({ bar: 2 })), { foo: 1, bar: 2 });
        src$Test$Test$$verify_dict($$ImmutableDict$$Dict({ foo: 1 }).merge($$ImmutableDict$$Dict({ foo: 2 })), { foo: 2 });
        src$Test$Test$$verify_dict($$ImmutableDict$$Dict({ foo: 1 }).merge($$ImmutableDict$$Dict({ foo: 2, bar: 3 })), { foo: 2, bar: 3 });
        src$Test$Test$$verify_dict($$ImmutableDict$$Dict({ foo: 1 }).merge({ bar: 2 }), { foo: 1, bar: 2 });
      });

      src$Test$Test$$test("complex keys", function () {
        var o = $$ImmutableDict$$Dict();

        var m1 = {};
        var m2 = {};

        var i1 = $$ImmutableDict$$Dict();
        var i2 = $$ImmutableDict$$Dict();
        var i3 = $$ImmutableDict$$Dict({ foo: 10 });

        o = o.set(m1, 1);
        o = o.set(m2, 2);
        o = o.set(i1, 3);
        o = o.set(i2, 4);
        o = o.set(i3, 5);

        $$assert$$assert(o.has(m1));
        $$assert$$assert(o.has(m2));
        $$assert$$assert(o.has(i1));
        $$assert$$assert(o.has(i2));
        $$assert$$assert(o.has(i3));

        $$assert$$assert(o.get(m1) === 1);
        $$assert$$assert(o.get(m2) === 2);
        $$assert$$assert(o.get(i1) === 4);
        $$assert$$assert(o.get(i2) === 4);
        $$assert$$assert(o.get(i3) === 5);

        o = o.remove(m1);
        o = o.remove(m2);
        o = o.remove(i1);
        o = o.remove(i3);

        $$assert$$assert(!o.has(m1));
        $$assert$$assert(!o.has(m2));
        $$assert$$assert(!o.has(i1));
        $$assert$$assert(!o.has(i2));
        $$assert$$assert(!o.has(i3));
      });

      src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$ImmutableDict$$Dict(dict_foo) === dict_foo);

        var x = $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, dict_foo);
        $$assert$$assert(x !== dict_foo);
        $$assert$$assert($$ImmutableDict$$Dict(x) !== x);
        $$assert$$assert($$ImmutableDict$$SortedDict($$Sorted$$simpleSort, x) === x);

        var x = $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, dict_foo);
        $$assert$$assert($$ImmutableDict$$SortedDict(src$Test$Test$$otherSort, x) !== x);

        var x = $$ImmutableDict$$SortedDict(src$Test$Test$$otherSort, dict_foo);
        $$assert$$assert($$ImmutableDict$$SortedDict($$Sorted$$simpleSort, x) !== x);

        var x = $$ImmutableDict$$SortedDict(src$Test$Test$$otherSort, dict_foo);
        $$assert$$assert($$ImmutableDict$$SortedDict(src$Test$Test$$otherSort, x) === x);


        $$assert$$assert(dict_empty.remove("foo") === dict_empty);

        $$assert$$assert(dict_foo.set("foo", 1) === dict_foo);
        $$assert$$assert(dict_foo.set("foo", 2) !== dict_foo);
        $$assert$$assert(dict_foo.set("bar", 3) !== dict_foo);
        $$assert$$assert(dict_foo.remove("foo") !== dict_foo);

        var dict1 = $$ImmutableDict$$Dict().set($$ImmutableDict$$Dict({ foo: 1 }), $$ImmutableDict$$Dict({ bar: 2 }));

        $$assert$$assert(dict1.modify($$ImmutableDict$$Dict({ foo: 1 }), function () {
          return $$ImmutableDict$$Dict({ bar: 2 });
        }) !== dict1);

        $$assert$$assert(dict1.modify($$ImmutableDict$$Dict({ foo: 1 }), function () {
          return $$ImmutableDict$$Dict({ bar: 3 });
        }) !== dict1);

        $$assert$$assert(dict_foo.modify("foo", function () {
          return 1;
        }) === dict_foo);

        $$assert$$assert(dict_foo.modify("foo", function () {
          return 2;
        }) !== dict_foo);

        $$assert$$assert(dict_foo.merge([]) === dict_foo);
        $$assert$$assert(dict_foo.merge([["foo", 1]]) === dict_foo);
        $$assert$$assert(dict_foo.merge([["foo", 2]]) !== dict_foo);

        $$assert$$assert(dict_empty.merge(dict_foo) !== dict_foo);
      });

      src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$$Immutable$Immutable$$equal(dict_empty, dict_foo));
        $$assert$$assert($$$Immutable$Immutable$$equal(dict_empty, dict_empty));
        $$assert$$assert($$$Immutable$Immutable$$equal(dict_foo, dict_foo));
        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableDict$$Dict(), $$ImmutableDict$$Dict()));
        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableDict$$Dict({ foo: 1 }), $$ImmutableDict$$Dict({ foo: 1 })));
        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableDict$$Dict({ foo: $$ImmutableDict$$Dict({ bar: 2 }) }),
                     $$ImmutableDict$$Dict({ foo: $$ImmutableDict$$Dict({ bar: 2 }) })));
        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableDict$$Dict({ foo: $$ImmutableDict$$Dict({ bar: 2 }) }),
                      $$ImmutableDict$$Dict({ foo: $$ImmutableDict$$Dict({ bar: 3 }) })));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableDict$$SortedDict($$Sorted$$simpleSort, { foo: 1 }),
                     $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, { foo: 1 })));

        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableDict$$SortedDict($$Sorted$$simpleSort, { foo: 1 }),
                      $$ImmutableDict$$Dict({ foo: 1 })));

        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableDict$$SortedDict($$Sorted$$simpleSort, { foo: 1 }),
                      $$ImmutableDict$$SortedDict(src$Test$Test$$otherSort, { foo: 1 })));
      });

      src$Test$Test$$test("toJS", function () {
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(dict_empty), {}));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(dict_foo), { foo: 1 }));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS($$ImmutableDict$$Dict({ foo: $$ImmutableDict$$Dict({ bar: 2 }) })),
                         { foo: { bar: 2 } }));

        src$Test$Test$$assert_raises(function () {
          $$toJS$$toJS($$ImmutableDict$$Dict().set($$ImmutableDict$$Dict({ foo: 1 }), 2));
        }, "Cannot convert to JavaScript: expected key to be string or Tag but got (Dict\n  \"foo\" = 1)");
      });

      src$Test$Test$$test("toJSON", function () {
        src$Test$Test$$verify_json(dict_empty, {});
        src$Test$Test$$verify_json(dict_foo, { foo: 1 });
        src$Test$Test$$verify_json($$ImmutableDict$$Dict({ foo: $$ImmutableDict$$Dict({ bar: 2 }) }), { foo: { bar: 2 } });

        src$Test$Test$$verify_json_equal($$ImmutableDict$$Dict([[$$ImmutableDict$$Dict({ foo: 1 }), $$ImmutableDict$$Dict({ bar: 2 })]]));

        src$Test$Test$$assert_raises(function () {
          $$toJSON$$toJSON($$ImmutableDict$$SortedDict($$Sorted$$simpleSort, {}));
        }, "Cannot convert SortedDict to JSON");
      });

      src$Test$Test$$test("random keys", function () {
        var o = $$ImmutableDict$$Dict();
        var js = {};
        src$Test$Test$$verify_dict(o, js);

        src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.set("foo" + i, 5);
          js["foo" + i] = 5;
          src$Test$Test$$verify_dict(o, js);
        });

        src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.modify("foo" + i, function (x) {
            return x + 15;
          });
          js["foo" + i] = js["foo" + i] + 15;
          src$Test$Test$$verify_dict(o, js);
        });

        src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.remove("foo" + i);
          delete js["foo" + i];
          src$Test$Test$$verify_dict(o, js);
        });
      });

      src$Test$Test$$test("each", function () {
        src$Test$Test$$test_each($$ImmutableDict$$Dict, []);

        var corge = $$ImmutableDict$$Dict({ corge: 3 });
        src$Test$Test$$test_each($$ImmutableDict$$Dict, [["bar", 2], ["foo", 1], ["qux", corge]]);
      });

      src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + $$ImmutableDict$$Dict() === "(Dict)");
        $$assert$$assert("" + $$ImmutableDict$$SortedDict($$Sorted$$simpleSort) === "(SortedDict (Mutable 3))");
        $$assert$$assert("" + $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, { foo: 1 }) === "(SortedDict (Mutable 3)\n  \"foo\" = 1)");
        $$assert$$assert("" + $$ImmutableDict$$SortedDict($$Sorted$$simpleSort, { foo: 1, bar: 2 }) === "(SortedDict (Mutable 3)\n  \"bar\" = 2\n  \"foo\" = 1)");

        $$assert$$assert("" + $$ImmutableDict$$Dict({ foo: 1 }) === "(Dict\n  \"foo\" = 1)");
        $$assert$$assert("" + $$ImmutableDict$$Dict({ foo: 1, bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\" = 1)");
        $$assert$$assert("" + $$ImmutableDict$$Dict({ "foo\nbar\nqux": 1, bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = 1)");
        $$assert$$assert("" + $$ImmutableDict$$Dict({ foo: $$ImmutableDict$$Dict({ qux: 3 }), bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\" = (Dict\n            \"qux\" = 3))");
        $$assert$$assert("" + $$ImmutableDict$$Dict({ "foo\nbar\nqux": $$ImmutableDict$$Dict({ qux: 3 }), bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = (Dict\n            \"qux\" = 3))");

        $$assert$$assert("" + $$ImmutableDict$$Dict({ foobarquxcorgenou: 1, bar: 2 }) === "(Dict\n  \"bar\"               = 2\n  \"foobarquxcorgenou\" = 1)");
        $$assert$$assert("" + $$ImmutableDict$$Dict({ "foobar\nquxcorgenou": 1, bar: 2 }) === "(Dict\n  \"bar\"         = 2\n  \"foobar\n   quxcorgenou\" = 1)");
        $$assert$$assert("" + $$ImmutableDict$$Dict({ "foo\nbar\nqux": 1, "barquxcorgenou": 2 }) === "(Dict\n  \"barquxcorgenou\" = 2\n  \"foo\n   bar\n   qux\"            = 1)");

        $$assert$$assert("" + $$ImmutableDict$$Dict([[$$ImmutableDict$$Dict({ foo: 1 }), $$ImmutableDict$$Dict({ bar: 2 })]]) === "(Dict\n  (Dict\n    \"foo\" = 1) = (Dict\n                   \"bar\" = 2))");
      });

      // TODO
      /*test("zip", function () {
        var a = [["a", 1], ["b", 2], ["c", 3], ["d", 4],
                 ["e", 5], ["f", 6], ["g", 7], ["h", 8]];
        assert.equal(toArray(zip(Dict(a))), toArray(zip(a)));
      });*/
    });


    src$Test$Test$$context("Set", function () {
      var empty_set = $$ImmutableSet$$Set();
      var five_set  = $$ImmutableSet$$Set().add(1).add(2).add(3).add(4).add(5);

      src$Test$Test$$test("isSet", function () {
        $$assert$$assert(!$$ImmutableSet$$isSet($$ImmutableDict$$Dict()));

        $$assert$$assert($$ImmutableSet$$isSet($$ImmutableSet$$Set()));
        $$assert$$assert($$ImmutableSet$$isSet($$ImmutableSet$$SortedSet($$Sorted$$simpleSort)));

        $$assert$$assert($$ImmutableSet$$isSortedSet($$ImmutableSet$$SortedSet($$Sorted$$simpleSort)));
        $$assert$$assert(!$$ImmutableSet$$isSortedSet($$ImmutableSet$$Set()));
      });

      src$Test$Test$$test("verify", function () {
        src$Test$Test$$verify_set(empty_set, []);
        src$Test$Test$$verify_set(five_set, [1, 2, 3, 4, 5]);
      });

      src$Test$Test$$test("init", function () {
        src$Test$Test$$verify_set($$ImmutableSet$$Set([1, 2, 3]), [1, 2, 3]);
      });

      src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(empty_set.isEmpty());
        $$assert$$assert(!five_set.isEmpty());
      });

      src$Test$Test$$test("has", function () {
        $$assert$$assert(!empty_set.has(1));
        $$assert$$assert(!five_set.has(0));
        $$assert$$assert(five_set.has(1));
        $$assert$$assert(five_set.has(2));
        $$assert$$assert(five_set.has(3));
        $$assert$$assert(five_set.has(4));
        $$assert$$assert(five_set.has(5));
        $$assert$$assert(!five_set.has(6));
      });

      src$Test$Test$$test("add", function () {
        src$Test$Test$$verify_set(empty_set, []);
        src$Test$Test$$verify_set(empty_set.add(5), [5]);
        src$Test$Test$$verify_set(empty_set, []);

        src$Test$Test$$verify_set(five_set, [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_set(five_set.add(5), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_set(five_set, [1, 2, 3, 4, 5]);
      });

      src$Test$Test$$test("remove", function () {
        src$Test$Test$$verify_set(empty_set.remove(1), []);

        src$Test$Test$$verify_set(five_set.remove(1), [2, 3, 4, 5]);
        src$Test$Test$$verify_set(five_set.remove(1).remove(4), [2, 3, 5]);
      });

      src$Test$Test$$test("union", function () {
        src$Test$Test$$verify_set(five_set.union(five_set), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_set(five_set.union($$ImmutableSet$$Set([1, 2, 6, 9])), [1, 2, 3, 4, 5, 6, 9]);
        src$Test$Test$$verify_set($$ImmutableSet$$Set([1, 2]).union(five_set), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_set($$ImmutableSet$$Set([1, 2, 6]).union(five_set), [1, 2, 3, 4, 5, 6]);
        src$Test$Test$$verify_set(five_set.union([1, 2, 6, 9]), [1, 2, 3, 4, 5, 6, 9]);
      });

      src$Test$Test$$test("intersect", function () {
        src$Test$Test$$verify_set(five_set.intersect(five_set), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_set(empty_set.intersect(five_set), []);
        src$Test$Test$$verify_set(five_set.intersect(empty_set), []);
        src$Test$Test$$verify_set(five_set.intersect([1, 3, 4]), [1, 3, 4]);
        src$Test$Test$$verify_set(five_set.intersect([1, 3, 4, 6, 10, 20]), [1, 3, 4]);
      });

      src$Test$Test$$test("disjoint", function () {
        src$Test$Test$$verify_set(five_set.disjoint(five_set), []);
        src$Test$Test$$verify_set(five_set.disjoint(empty_set), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_set(empty_set.disjoint(five_set), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_set(five_set.disjoint([1, 2, 3]), [4, 5]);
        src$Test$Test$$verify_set(five_set.disjoint([1, 2, 3, 6, 7, 8]), [4, 5, 6, 7, 8]);
      });

      src$Test$Test$$test("subtract", function () {
        src$Test$Test$$verify_set(five_set.subtract(empty_set), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_set(empty_set.subtract(five_set), []);
        src$Test$Test$$verify_set(five_set.subtract(five_set), []);
        src$Test$Test$$verify_set(five_set.subtract([1, 2, 3]), [4, 5]);
        src$Test$Test$$verify_set(five_set.subtract([1, 2, 3, 6, 7, 9]), [4, 5]);
      });

      src$Test$Test$$test("complex elements", function () {
        var o = $$ImmutableSet$$Set();

        var m1 = {};
        var m2 = {};

        var i1 = $$ImmutableSet$$Set();
        var i2 = $$ImmutableSet$$Set();
        var i3 = $$ImmutableSet$$Set([1, 2, 3]);

        o = o.add(m1);
        o = o.add(m2);
        o = o.add(i1);
        o = o.add(i2);
        o = o.add(i3);

        $$assert$$assert(o.has(m1));
        $$assert$$assert(o.has(m2));
        $$assert$$assert(o.has(i1));
        $$assert$$assert(o.has(i2));
        $$assert$$assert(o.has(i3));

        o = o.remove(m1);
        o = o.remove(m2);
        o = o.remove(i1);
        o = o.remove(i3);

        $$assert$$assert(!o.has(m1));
        $$assert$$assert(!o.has(m2));
        $$assert$$assert(!o.has(i1));
        $$assert$$assert(!o.has(i2));
        $$assert$$assert(!o.has(i3));
      });

      src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$ImmutableSet$$Set(five_set) === five_set);

        var x = $$ImmutableSet$$SortedSet($$Sorted$$simpleSort, five_set);
        $$assert$$assert(x !== five_set);
        $$assert$$assert($$ImmutableSet$$Set(x) !== x);
        $$assert$$assert($$ImmutableSet$$SortedSet($$Sorted$$simpleSort, x) === x);

        var x = $$ImmutableSet$$SortedSet($$Sorted$$simpleSort, five_set);
        $$assert$$assert($$ImmutableSet$$SortedSet(src$Test$Test$$otherSort, x) !== x);

        var x = $$ImmutableSet$$SortedSet(src$Test$Test$$otherSort, five_set);
        $$assert$$assert($$ImmutableSet$$SortedSet($$Sorted$$simpleSort, x) !== x);

        var x = $$ImmutableSet$$SortedSet(src$Test$Test$$otherSort, five_set);
        $$assert$$assert($$ImmutableSet$$SortedSet(src$Test$Test$$otherSort, x) === x);


        $$assert$$assert(empty_set.union(empty_set) === empty_set);
        $$assert$$assert(empty_set.union(five_set) !== five_set);
        $$assert$$assert(five_set.union(empty_set) === five_set);
        $$assert$$assert(five_set.union(five_set) === five_set);
        $$assert$$assert(five_set.union($$ImmutableSet$$Set([1, 2, 3])) === five_set);

        $$assert$$assert($$ImmutableSet$$Set(five_set) === five_set);
        $$assert$$assert($$ImmutableSet$$SortedSet($$Sorted$$simpleSort, five_set) !== five_set);

        $$assert$$assert(empty_set.remove(1) === empty_set);

        var set1 = $$ImmutableSet$$Set([$$ImmutableSet$$Set([])]);

        $$assert$$assert(set1.add($$ImmutableSet$$Set([])) !== set1);

        $$assert$$assert(five_set.add(5) === five_set);
        $$assert$$assert(five_set.add(6) !== five_set);
        $$assert$$assert(five_set.remove(5) !== five_set);
      });

      src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$$Immutable$Immutable$$equal(empty_set, five_set));
        $$assert$$assert($$$Immutable$Immutable$$equal(empty_set, empty_set));
        $$assert$$assert($$$Immutable$Immutable$$equal(five_set, five_set));
        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableSet$$Set(), $$ImmutableSet$$Set()));
        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableSet$$Set([1]), $$ImmutableSet$$Set([1])));
        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableSet$$Set([$$ImmutableSet$$Set([1])]), $$ImmutableSet$$Set([$$ImmutableSet$$Set([1])])));
        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableSet$$Set([$$ImmutableSet$$Set([1])]), $$ImmutableSet$$Set([$$ImmutableSet$$Set([2])])));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableSet$$SortedSet($$Sorted$$simpleSort, [1, 2, 3]),
                     $$ImmutableSet$$SortedSet($$Sorted$$simpleSort, [1, 2, 3])));

        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableSet$$SortedSet($$Sorted$$simpleSort, [1, 2, 3]),
                      $$ImmutableSet$$SortedSet(src$Test$Test$$otherSort, [1, 2, 3])));

        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableSet$$SortedSet($$Sorted$$simpleSort, [1, 2, 3]),
                      $$ImmutableSet$$Set([1, 2, 3])));
      });

      src$Test$Test$$test("toJS", function () {
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(empty_set), []));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(five_set), [1, 2, 3, 4, 5]));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS($$ImmutableSet$$Set([1, 2, $$ImmutableSet$$Set([3])])),
                         [[3], 1, 2]));
      });

      src$Test$Test$$test("toJSON", function () {
        src$Test$Test$$verify_json(empty_set, []);
        src$Test$Test$$verify_json(five_set, [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_json($$ImmutableSet$$Set([4, 5, $$ImmutableSet$$Set([1, 2, 3])]), [[1, 2, 3], 4, 5]);

        src$Test$Test$$assert_raises(function () {
          $$toJSON$$toJSON($$ImmutableSet$$SortedSet($$Sorted$$simpleSort, []));
        }, "Cannot convert SortedSet to JSON");
      });

      src$Test$Test$$test("random elements", function () {
        var o = $$ImmutableSet$$Set();
        var a = [];

        var sort = o.sort;
        var hash_fn = o.hash_fn;

        // TODO utilities for these
        function push_sorted(a, x, sort) {
          for (var i = 0, l = a.length; i < l; ++i) {
            if (sort(hash_fn(x), hash_fn(a[i])) <= 0) {
              a.splice(i, 0, x);
              return;
            }
          }
          a.push(x);
        }

        function remove(a, x) {
          var index = a.indexOf(x);
          $$assert$$assert(index !== -1);
          a.splice(index, 1);
        }

        src$Test$Test$$verify_set(o, a);

        src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.add(i);
          push_sorted(a, i, sort);
          src$Test$Test$$verify_set(o, a);
        });

        src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.remove(i);
          remove(a, i);
          src$Test$Test$$verify_set(o, a);
        });

        src$Test$Test$$verify_set(o, []);
      });

      src$Test$Test$$test("each", function () {
        src$Test$Test$$test_each($$ImmutableSet$$Set, []);

        var four = $$ImmutableSet$$Set([4]);
        src$Test$Test$$test_each($$ImmutableSet$$Set, [four, 1, 2, 3]);
      });

      src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + $$ImmutableSet$$Set() === "(Set)");
        $$assert$$assert("" + $$ImmutableSet$$SortedSet($$Sorted$$simpleSort) === "(SortedSet (Mutable 3))");
        $$assert$$assert("" + $$ImmutableSet$$Set([1, 2, 3, 4, 5]) === "(Set\n  1\n  2\n  3\n  4\n  5)");
        $$assert$$assert("" + $$ImmutableSet$$SortedSet($$Sorted$$simpleSort, [1, 2, 3, 4, 5]) === "(SortedSet (Mutable 3)\n  1\n  2\n  3\n  4\n  5)");
        $$assert$$assert("" + $$ImmutableSet$$Set([$$ImmutableSet$$Set([1, 2, 3])]) === "(Set\n  (Set\n    1\n    2\n    3))");
      });

      // TODO
      /*test("zip", function () {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        assert.equal(toArray(zip(Set(a))), toArray(zip(a)));
      });*/
    });


    src$Test$Test$$context("List", function () {
      var empty_list = $$ImmutableList$$List();
      var five_list  = $$ImmutableList$$List().insert(1).insert(2).insert(3).insert(4).insert(5);

      src$Test$Test$$test("isList", function () {
        $$assert$$assert(!$$ImmutableList$$isList($$ImmutableDict$$Dict()));
        $$assert$$assert($$ImmutableList$$isList($$ImmutableList$$List()));
      });

      src$Test$Test$$test("verify", function () {
        src$Test$Test$$verify_list(empty_list, []);
        src$Test$Test$$verify_list(five_list, [1, 2, 3, 4, 5]);
      });

      src$Test$Test$$test("init", function () {
        src$Test$Test$$verify_list($$ImmutableList$$List([1, 2, 3]), [1, 2, 3]);
      });

      src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(empty_list.isEmpty());
        $$assert$$assert(!five_list.isEmpty());
      });

      src$Test$Test$$test("size", function () {
        $$assert$$assert(empty_list.size() === 0);
        $$assert$$assert(five_list.size() === 5);
      });

      src$Test$Test$$test("has", function () {
        $$assert$$assert(!empty_list.has(0));
        $$assert$$assert(!empty_list.has(-1));

        $$assert$$assert(five_list.has(0));
        $$assert$$assert(five_list.has(4));
        $$assert$$assert(five_list.has(-1));
        $$assert$$assert(five_list.has(-5));
        $$assert$$assert(!five_list.has(5));
        $$assert$$assert(!five_list.has(-6));
      });

      src$Test$Test$$test("get", function () {
        $$assert$$assert(empty_list.get(0, 50) === 50);
        $$assert$$assert(empty_list.get(-1, 50) === 50);

        src$Test$Test$$assert_raises(function () {
          empty_list.get(0);
        }, "Index 0 is not valid");

        src$Test$Test$$assert_raises(function () {
          empty_list.get(-1);
        }, "Index -1 is not valid");

        $$assert$$assert(empty_list.get(0, 50) === 50);

        $$assert$$assert(five_list.get(0, 50) === 1);
        $$assert$$assert(five_list.get(4, 50) === 5);
        $$assert$$assert(five_list.get(-1, 50) === 5);
        $$assert$$assert(five_list.get(-2, 50) === 4);
      });

      src$Test$Test$$test("insert", function () {
        src$Test$Test$$assert_raises(function () {
          empty_list.insert(5, 1);
        }, "Index 1 is not valid");

        src$Test$Test$$assert_raises(function () {
          empty_list.insert(5, -2);
        }, "Index -1 is not valid");

        var x = empty_list.insert(10);

        src$Test$Test$$verify_list(empty_list, []);
        src$Test$Test$$verify_list(x, [10]);

        $$assert$$assert(empty_list.size() === 0);
        $$assert$$assert(x.size() === 1);
        $$assert$$assert(x.get(0) === 10);
        $$assert$$assert(x.get(-1) === 10);

        src$Test$Test$$verify_list(five_list.insert(10), [1, 2, 3, 4, 5, 10]);
        src$Test$Test$$verify_list(five_list.insert(10).insert(20), [1, 2, 3, 4, 5, 10, 20]);
        src$Test$Test$$verify_list(five_list.insert(10, 0), [10, 1, 2, 3, 4, 5]);
        src$Test$Test$$verify_list(five_list.insert(10, 1), [1, 10, 2, 3, 4, 5]);
        src$Test$Test$$verify_list(five_list.insert(10, -1), [1, 2, 3, 4, 5, 10]);
        src$Test$Test$$verify_list(five_list.insert(10, -2), [1, 2, 3, 4, 10, 5]);
        src$Test$Test$$verify_list(five_list, [1, 2, 3, 4, 5]);

        src$Test$Test$$verify_list($$ImmutableList$$List().insert(5, 0).insert(4, 0).insert(3, 0).insert(2, 0).insert(1, 0),
                    [1, 2, 3, 4, 5]);
      });

      src$Test$Test$$test("remove", function () {
        src$Test$Test$$assert_raises(function () {
          empty_list.remove();
        }, "Index -1 is not valid");

        src$Test$Test$$assert_raises(function () {
          empty_list.remove(0);
        }, "Index 0 is not valid");

        src$Test$Test$$assert_raises(function () {
          empty_list.remove(-1);
        }, "Index -1 is not valid");

        src$Test$Test$$verify_list(five_list.remove(), [1, 2, 3, 4]);
        src$Test$Test$$verify_list(five_list.remove().remove(), [1, 2, 3]);
        src$Test$Test$$verify_list(five_list.remove(-1), [1, 2, 3, 4]);
        src$Test$Test$$verify_list(five_list.remove(-2), [1, 2, 3, 5]);
        src$Test$Test$$verify_list(five_list.remove(0), [2, 3, 4, 5]);
        src$Test$Test$$verify_list(five_list.remove(1), [1, 3, 4, 5]);
      });

      src$Test$Test$$test("modify", function () {
        var ran = false;

        src$Test$Test$$assert_raises(function () {
          empty_list.modify(0, function () { ran = true; });
        }, "Index 0 is not valid");

        src$Test$Test$$assert_raises(function () {
          empty_list.modify(-1, function () { ran = true; });
        }, "Index -1 is not valid");

        $$assert$$assert(ran === false);


        var ran = false;

        src$Test$Test$$verify_list(five_list.modify(0, function (x) {
          ran = true;
          $$assert$$assert(x === 1);
          return x + 100;
        }), [101, 2, 3, 4, 5]);

        $$assert$$assert(ran === true);


        src$Test$Test$$verify_list(five_list.modify(-1, function (x) { return x + 100 }), [1, 2, 3, 4, 105]);
        src$Test$Test$$verify_list(five_list.modify(1, function (x) { return x + 100 }), [1, 102, 3, 4, 5]);
        src$Test$Test$$verify_list(five_list.modify(-2, function (x) { return x + 100 }), [1, 2, 3, 104, 5]);
      });

      src$Test$Test$$test("slice", function () {
        src$Test$Test$$verify_list(empty_list.slice(0, 0), []);
        src$Test$Test$$verify_list(five_list.slice(0, 0), []);
        src$Test$Test$$verify_list(five_list.slice(0, 2), [1, 2]);
        src$Test$Test$$verify_list(five_list.slice(2, 3), [3]);
        src$Test$Test$$verify_list(five_list.slice(3, 5), [4, 5]);
        src$Test$Test$$verify_list(five_list.slice(0, 5), [1, 2, 3, 4, 5]);

        src$Test$Test$$verify_list(empty_list.slice(), []);

        src$Test$Test$$assert_raises(function () {
          five_list.slice(5, 1);
        }, "Index 5 is greater than index 1");

        src$Test$Test$$assert_raises(function () {
          five_list.slice(6, 7);
        }, "Index 6 is not valid");

        src$Test$Test$$assert_raises(function () {
          five_list.slice(0, 6);
        }, "Index 6 is not valid");

        src$Test$Test$$assert_raises(function () {
          five_list.slice(10, 10);
        }, "Index 10 is not valid");

        src$Test$Test$$verify_list(five_list.slice(null, 5), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_list(five_list.slice(0, null), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_list(five_list.slice(null, null), [1, 2, 3, 4, 5]);

        src$Test$Test$$verify_list(five_list.slice(), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_list(five_list.slice(0), [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_list(five_list.slice(-1), [5]);
        src$Test$Test$$verify_list(five_list.slice(-3), [3, 4, 5]);
        src$Test$Test$$verify_list(five_list.slice(-3, 4), [3, 4]);

        src$Test$Test$$verify_list(five_list.slice(0, -1), [1, 2, 3, 4]);
        src$Test$Test$$verify_list(five_list.slice(-2, -1), [4]);
        src$Test$Test$$verify_list(five_list.slice(-4, -1), [2, 3, 4]);
        src$Test$Test$$verify_list(five_list.slice(-4, 4), [2, 3, 4]);


        var double_list  = $$ImmutableList$$List();
        var double_array = [];

        var len = 125 * 2;
        for (var i = 0; i < len; ++i) {
          double_list = double_list.insert(i);
          double_array.push(i);
        }

        src$Test$Test$$verify_list(double_list.slice(0, 124), double_array.slice(0, 124));
        src$Test$Test$$verify_list(double_list.slice(0, 125), double_array.slice(0, 125));
        src$Test$Test$$verify_list(double_list.slice(0, 126), double_array.slice(0, 126));

        src$Test$Test$$verify_list(double_list.slice(124, 250), double_array.slice(124, 250));
        src$Test$Test$$verify_list(double_list.slice(125, 250), double_array.slice(125, 250));
        src$Test$Test$$verify_list(double_list.slice(126, 250), double_array.slice(126, 250));

        src$Test$Test$$verify_list(double_list.slice(124, 125), double_array.slice(124, 125));
        src$Test$Test$$verify_list(double_list.slice(125, 126), double_array.slice(125, 126));

        src$Test$Test$$verify_list(double_list.slice(0, 250), double_array.slice(0, 250));


        var big_list  = $$ImmutableList$$List();
        var big_array = [];

        var len = 125 * 1000;
        for (var i = 0; i < len; ++i) {
          big_list = big_list.insert(i);
          big_array.push(i);
        }

        src$Test$Test$$verify_list(big_list.slice(0, 125), big_array.slice(0, 125));
        src$Test$Test$$verify_list(big_list.slice(0, 126), big_array.slice(0, 126));
        src$Test$Test$$verify_list(big_list.slice(125, 250), big_array.slice(125, 250));
        src$Test$Test$$verify_list(big_list.slice(50, 125), big_array.slice(50, 125));
        src$Test$Test$$verify_list(big_list.slice(50, 126), big_array.slice(50, 126));
        src$Test$Test$$verify_list(big_list.slice(50, 2546), big_array.slice(50, 2546));

        src$Test$Test$$verify_list(big_list.slice(0, len), big_array.slice(0, len));
        src$Test$Test$$verify_list(big_list.slice(0, len - 1), big_array.slice(0, len - 1));
        src$Test$Test$$verify_list(big_list.slice(1, len), big_array.slice(1, len));
        src$Test$Test$$verify_list(big_list.slice(1, len - 1), big_array.slice(1, len - 1));
        src$Test$Test$$verify_list(big_list.slice(50, 60), big_array.slice(50, 60));
        src$Test$Test$$verify_list(big_list.slice(50, 125), big_array.slice(50, 125));
        src$Test$Test$$verify_list(big_list.slice(50, 126), big_array.slice(50, 126));
        src$Test$Test$$verify_list(big_list.slice(125, 126), big_array.slice(125, 126));
        src$Test$Test$$verify_list(big_list.slice(124, 126), big_array.slice(124, 126));
        src$Test$Test$$verify_list(big_list.slice(Math.ceil(len / 2)), big_array.slice(Math.ceil(len / 2)));
      });

      src$Test$Test$$test("concat", function () {
        src$Test$Test$$verify_list(empty_list.concat(empty_list), []);
        src$Test$Test$$verify_list(five_list.concat(five_list), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
        src$Test$Test$$verify_list($$ImmutableList$$List([10, 20, 30]).concat(five_list), [10, 20, 30, 1, 2, 3, 4, 5]);
        src$Test$Test$$verify_list(five_list.concat($$ImmutableList$$List([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
        src$Test$Test$$verify_list(five_list.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
      });

      src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$ImmutableList$$List(five_list) === five_list);

        $$assert$$assert(empty_list.concat(empty_list) === empty_list);
        $$assert$$assert(five_list.concat(empty_list) === five_list);
        $$assert$$assert(empty_list.concat(five_list) === five_list);

        $$assert$$assert(empty_list.slice() === empty_list);
        $$assert$$assert(five_list.slice() === five_list);
        $$assert$$assert(five_list.slice(0, 5) === five_list);
        $$assert$$assert(five_list.slice(1, 5) !== five_list);
        $$assert$$assert(five_list.slice(0, 4) !== five_list);

        var list1 = $$ImmutableList$$List([$$ImmutableList$$List([])]);

        $$assert$$assert(list1.modify(0, function () {
          return $$ImmutableList$$List([]);
        }) !== list1);

        $$assert$$assert(five_list.modify(0, function () {
          return 1;
        }) === five_list);

        $$assert$$assert(five_list.modify(0, function () {
          return 2;
        }) !== five_list);

        $$assert$$assert(five_list.modify(1, function () {
          return 2;
        }) === five_list);

        $$assert$$assert(five_list.modify(1, function () {
          return 3;
        }) !== five_list);

        $$assert$$assert(five_list.modify(-1, function () {
          return 5;
        }) === five_list);

        $$assert$$assert(five_list.modify(-1, function () {
          return 6;
        }) !== five_list);
      });

      src$Test$Test$$test("equal", function () {
        $$assert$$assert($$$Immutable$Immutable$$equal(empty_list, empty_list));
        $$assert$$assert($$$Immutable$Immutable$$equal(five_list, five_list));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableList$$List([1, 2, 3]), $$ImmutableList$$List([1, 2, 3])));
        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableList$$List([1, 2, 3]), $$ImmutableList$$List([1, 2, 4])));
        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableList$$List([1, 2, 3]), $$ImmutableList$$List([1, 3, 2])));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableList$$List([1, 2, 3, 4, 5]), five_list));
        $$assert$$assert($$$Immutable$Immutable$$equal(five_list, $$ImmutableList$$List([1, 2, 3, 4, 5])));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableList$$List([$$ImmutableList$$List([1, 2, 3])]), $$ImmutableList$$List([$$ImmutableList$$List([1, 2, 3])])));
      });

      src$Test$Test$$test("toJS", function () {
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(empty_list), []));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(five_list), [1, 2, 3, 4, 5]));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS($$ImmutableList$$List([1, 2, $$ImmutableList$$List([3])])), [1, 2, [3]]));
      });

      src$Test$Test$$test("toJSON", function () {
        src$Test$Test$$verify_json(empty_list, []);
        src$Test$Test$$verify_json(five_list, [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_json($$ImmutableList$$List([4, 5, $$ImmutableList$$List([1, 2, 3])]), [4, 5, [1, 2, 3]]);
      });

      src$Test$Test$$test("random elements", function () {
        var o = $$ImmutableList$$List();
        var a = [];

        src$Test$Test$$verify_list(o, a);

        src$Test$Test$$random_list(200).forEach(function (x) {
          var index = src$Test$Test$$random_int(o.size());

          o = o.insert(x, index);
          a.splice(index, 0, x);

          src$Test$Test$$verify_list(o, a);
        });

        src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.modify(i, function (x) {
            return x + 15;
          });

          a[i] = a[i] + 15;

          src$Test$Test$$verify_list(o, a);
        });

        while (o.size()) {
          var index = src$Test$Test$$random_int(o.size());
          o = o.remove(index);
          a.splice(index, 1);
          src$Test$Test$$verify_list(o, a);
        }

        $$assert$$assert(o.isEmpty());
        src$Test$Test$$verify_list(o, []);


        var a = src$Test$Test$$random_list(200);
        var pivot = src$Test$Test$$random_int(200);

        function test_concat(pivot) {
          var al = [];
          var ar = [];

          var il = $$ImmutableList$$List();
          var ir = $$ImmutableList$$List();

          a.slice(0, pivot).forEach(function (x) {
            var index = src$Test$Test$$random_int(il.size());
            il = il.insert(x, index);
            al.splice(index, 0, x);
            src$Test$Test$$verify_list(il, al);
          });

          a.slice(pivot).forEach(function (x) {
            var index = src$Test$Test$$random_int(ir.size());
            ir = ir.insert(x, index);
            ar.splice(index, 0, x);
            src$Test$Test$$verify_list(ir, ar);
          });

          src$Test$Test$$verify_list(il.concat(ir), al.concat(ar));
          src$Test$Test$$verify_list(ir.concat(il), ar.concat(al));
        }

        test_concat(0);
        test_concat(5);
        test_concat(pivot);
        test_concat(194);
        test_concat(199);
      });

      src$Test$Test$$test("each", function () {
        src$Test$Test$$test_each($$ImmutableList$$List, []);

        var list = $$ImmutableList$$List([4]);
        src$Test$Test$$test_each($$ImmutableList$$List, [1, 2, 3, list]);

        var expected = src$Test$Test$$random_list(200);
        src$Test$Test$$test_each($$ImmutableList$$List, expected);
      });

      src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + empty_list === "(List)");
        $$assert$$assert("" + $$ImmutableList$$List([1, 2, 3]) === "(List\n  1\n  2\n  3)");
        $$assert$$assert("" + $$ImmutableList$$List([1, $$ImmutableList$$List([2]), 3]) === "(List\n  1\n  (List\n    2)\n  3)");
      });

      // TODO
      /*test("zip", function () {
        assert.equal(toArray(zip(List())), toArray(zip([])));

        assert.equal(toArray(zip(List([1, 2, 3, 4, 5]))), [[1], [2], [3], [4], [5]]);

        var a = random_list(200);
        assert.equal(toArray(zip(List(a))), toArray(zip(a)));
      });*/
    });


    src$Test$Test$$context("Queue", function () {
      var empty_queue = $$ImmutableQueue$$Queue();
      var five_queue  = $$ImmutableQueue$$Queue().push(1).push(2).push(3).push(4).push(5);

      src$Test$Test$$test("isQueue", function () {
        $$assert$$assert(!$$ImmutableQueue$$isQueue($$ImmutableList$$List()));
        $$assert$$assert($$ImmutableQueue$$isQueue($$ImmutableQueue$$Queue()));
      });

      src$Test$Test$$test("verify", function () {
        src$Test$Test$$verify_queue(empty_queue, []);
        src$Test$Test$$verify_queue(five_queue, [1, 2, 3, 4, 5]);
      });

      src$Test$Test$$test("init", function () {
        src$Test$Test$$verify_queue($$ImmutableQueue$$Queue([1, 2, 3]), [1, 2, 3]);
      });

      src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(empty_queue.isEmpty());
        $$assert$$assert(!five_queue.isEmpty());
      });

      src$Test$Test$$test("size", function () {
        $$assert$$assert(empty_queue.size() === 0);
        $$assert$$assert(five_queue.size() === 5);
      });

      src$Test$Test$$test("peek", function () {
        src$Test$Test$$assert_raises(function () {
          empty_queue.peek();
        }, "Cannot peek from an empty queue");

        $$assert$$assert(empty_queue.peek(50) === 50);

        $$assert$$assert(five_queue.peek() === 1);
        $$assert$$assert(five_queue.peek(50) === 1);
      });

      src$Test$Test$$test("push", function () {
        var x = empty_queue.push(10);

        src$Test$Test$$verify_queue(empty_queue, []);
        src$Test$Test$$verify_queue(x, [10]);

        $$assert$$assert(empty_queue.size() === 0);
        $$assert$$assert(x.size() === 1);
        $$assert$$assert(x.peek() === 10);

        src$Test$Test$$verify_queue(five_queue.push(10), [1, 2, 3, 4, 5, 10]);
        src$Test$Test$$verify_queue(five_queue.push(10).push(20), [1, 2, 3, 4, 5, 10, 20]);
        src$Test$Test$$verify_queue(five_queue, [1, 2, 3, 4, 5]);

        src$Test$Test$$verify_queue($$ImmutableQueue$$Queue().push(5).push(4).push(3).push(2).push(1),
                     [5, 4, 3, 2, 1]);
      });

      src$Test$Test$$test("pop", function () {
        src$Test$Test$$assert_raises(function () {
          empty_queue.pop();
        }, "Cannot pop from an empty queue");

        src$Test$Test$$verify_queue(five_queue.pop(), [2, 3, 4, 5]);
        src$Test$Test$$verify_queue(five_queue.pop().pop(), [3, 4, 5]);

        src$Test$Test$$verify_queue($$ImmutableQueue$$Queue(), []);
        src$Test$Test$$verify_queue($$ImmutableQueue$$Queue().push(5).push(10).push(20).push(30), [5, 10, 20, 30]);
        src$Test$Test$$verify_queue($$ImmutableQueue$$Queue().push(5).push(10).push(20).push(30).pop(), [10, 20, 30]);
      });

      src$Test$Test$$test("concat", function () {
        src$Test$Test$$verify_queue(empty_queue.concat(empty_queue), []);
        src$Test$Test$$verify_queue(five_queue.concat(five_queue), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
        src$Test$Test$$verify_queue($$ImmutableQueue$$Queue([10, 20, 30]).concat(five_queue), [10, 20, 30, 1, 2, 3, 4, 5]);
        src$Test$Test$$verify_queue(five_queue.concat($$ImmutableQueue$$Queue([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
        src$Test$Test$$verify_queue(five_queue.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
      });

      src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$ImmutableQueue$$Queue(five_queue) === five_queue);

        $$assert$$assert(empty_queue.concat(empty_queue) === empty_queue);
        $$assert$$assert(five_queue.concat(empty_queue) === five_queue);
        $$assert$$assert(empty_queue.concat(five_queue) !== five_queue);
      });

      src$Test$Test$$test("equal", function () {
        $$assert$$assert($$$Immutable$Immutable$$equal(empty_queue, empty_queue));
        $$assert$$assert($$$Immutable$Immutable$$equal(five_queue, five_queue));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableQueue$$Queue([1, 2, 3]), $$ImmutableQueue$$Queue([1, 2, 3])));
        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableQueue$$Queue([1, 2, 3]), $$ImmutableQueue$$Queue([1, 2, 4])));
        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableQueue$$Queue([1, 2, 3]), $$ImmutableQueue$$Queue([1, 3, 2])));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableQueue$$Queue([1, 2, 3, 4, 5]), five_queue));
        $$assert$$assert($$$Immutable$Immutable$$equal(five_queue, $$ImmutableQueue$$Queue([1, 2, 3, 4, 5])));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableQueue$$Queue([$$ImmutableQueue$$Queue([1, 2, 3])]), $$ImmutableQueue$$Queue([$$ImmutableQueue$$Queue([1, 2, 3])])));
      });

      src$Test$Test$$test("toJS", function () {
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(empty_queue), []));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(five_queue), [1, 2, 3, 4, 5]));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS($$ImmutableQueue$$Queue([1, 2, $$ImmutableQueue$$Queue([3])])), [1, 2, [3]]));
      });

      src$Test$Test$$test("toJSON", function () {
        src$Test$Test$$verify_json(empty_queue, []);
        src$Test$Test$$verify_json(five_queue, [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_json($$ImmutableQueue$$Queue([4, 5, $$ImmutableQueue$$Queue([1, 2, 3])]), [4, 5, [1, 2, 3]]);
      });

      src$Test$Test$$test("each", function () {
        src$Test$Test$$test_each($$ImmutableQueue$$Queue, []);

        var x = $$ImmutableQueue$$Queue([3]);
        src$Test$Test$$test_each($$ImmutableQueue$$Queue, [1, 2, x, 4]);
      });

      src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + empty_queue === "(Queue)");
        $$assert$$assert("" + $$ImmutableQueue$$Queue([1, 2, 3]) === "(Queue\n  1\n  2\n  3)");
        $$assert$$assert("" + $$ImmutableQueue$$Queue([1, $$ImmutableQueue$$Queue([2]), 3]) === "(Queue\n  1\n  (Queue\n    2)\n  3)");
      });

      // TODO
      /*test("zip", function () {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        assert.equal(toArray(zip(Queue(a))), toArray(zip(a)));
      });*/
    });


    src$Test$Test$$context("Stack", function () {
      var empty_stack = $$ImmutableStack$$Stack();
      var five_stack  = $$ImmutableStack$$Stack().push(1).push(2).push(3).push(4).push(5);

      src$Test$Test$$test("isStack", function () {
        $$assert$$assert(!$$ImmutableStack$$isStack($$ImmutableQueue$$Queue()));
        $$assert$$assert($$ImmutableStack$$isStack($$ImmutableStack$$Stack()));
      });

      src$Test$Test$$test("verify", function () {
        src$Test$Test$$verify_stack(empty_stack, []);
        src$Test$Test$$verify_stack(five_stack, [1, 2, 3, 4, 5]);
      });

      src$Test$Test$$test("init", function () {
        src$Test$Test$$verify_stack($$ImmutableStack$$Stack([1, 2, 3]), [1, 2, 3]);
      });

      src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(empty_stack.isEmpty());
        $$assert$$assert(!five_stack.isEmpty());
      });

      src$Test$Test$$test("size", function () {
        $$assert$$assert(empty_stack.size() === 0);
        $$assert$$assert(five_stack.size() === 5);
      });

      src$Test$Test$$test("peek", function () {
        src$Test$Test$$assert_raises(function () {
          empty_stack.peek();
        }, "Cannot peek from an empty stack");

        $$assert$$assert(empty_stack.peek(50) === 50);

        $$assert$$assert(five_stack.peek() === 5);
        $$assert$$assert(five_stack.peek(50) === 5);
      });

      src$Test$Test$$test("push", function () {
        var x = empty_stack.push(10);

        src$Test$Test$$verify_stack(empty_stack, []);
        src$Test$Test$$verify_stack(x, [10]);

        $$assert$$assert(empty_stack.size() === 0);
        $$assert$$assert(x.size() === 1);
        $$assert$$assert(x.peek() === 10);

        src$Test$Test$$verify_stack(five_stack.push(10), [1, 2, 3, 4, 5, 10]);
        src$Test$Test$$verify_stack(five_stack.push(10).push(20), [1, 2, 3, 4, 5, 10, 20]);
        src$Test$Test$$verify_stack(five_stack, [1, 2, 3, 4, 5]);

        src$Test$Test$$verify_stack($$ImmutableStack$$Stack().push(5).push(4).push(3).push(2).push(1),
                     [5, 4, 3, 2, 1]);
      });

      src$Test$Test$$test("pop", function () {
        src$Test$Test$$assert_raises(function () {
          empty_stack.pop();
        }, "Cannot pop from an empty stack");

        src$Test$Test$$verify_stack(five_stack.pop(), [1, 2, 3, 4]);
        src$Test$Test$$verify_stack(five_stack.pop().pop(), [1, 2, 3]);
      });

      src$Test$Test$$test("concat", function () {
        src$Test$Test$$verify_stack(empty_stack.concat(empty_stack), []);
        src$Test$Test$$verify_stack(five_stack.concat(five_stack), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
        src$Test$Test$$verify_stack($$ImmutableStack$$Stack([10, 20, 30]).concat(five_stack), [10, 20, 30, 1, 2, 3, 4, 5]);
        src$Test$Test$$verify_stack(five_stack.concat($$ImmutableStack$$Stack([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
        src$Test$Test$$verify_stack(five_stack.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
      });

      src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$ImmutableStack$$Stack(five_stack) === five_stack);

        $$assert$$assert(empty_stack.concat(empty_stack) === empty_stack);
        $$assert$$assert(five_stack.concat(empty_stack) === five_stack);
        $$assert$$assert(empty_stack.concat(five_stack) !== five_stack);
      });

      src$Test$Test$$test("equal", function () {
        $$assert$$assert($$$Immutable$Immutable$$equal(empty_stack, empty_stack));
        $$assert$$assert($$$Immutable$Immutable$$equal(five_stack, five_stack));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableStack$$Stack([1, 2, 3]), $$ImmutableStack$$Stack([1, 2, 3])));
        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableStack$$Stack([1, 2, 3]), $$ImmutableStack$$Stack([1, 2, 4])));
        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableStack$$Stack([1, 2, 3]), $$ImmutableStack$$Stack([1, 3, 2])));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableStack$$Stack([1, 2, 3, 4, 5]), five_stack));
        $$assert$$assert($$$Immutable$Immutable$$equal(five_stack, $$ImmutableStack$$Stack([1, 2, 3, 4, 5])));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableStack$$Stack([$$ImmutableStack$$Stack([1, 2, 3])]), $$ImmutableStack$$Stack([$$ImmutableStack$$Stack([1, 2, 3])])));
      });

      src$Test$Test$$test("toJS", function () {
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(empty_stack), []));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(five_stack), [1, 2, 3, 4, 5]));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS($$ImmutableStack$$Stack([1, 2, $$ImmutableStack$$Stack([3])])), [1, 2, [3]]));
      });

      src$Test$Test$$test("toJSON", function () {
        src$Test$Test$$verify_json(empty_stack, []);
        src$Test$Test$$verify_json(five_stack, [1, 2, 3, 4, 5]);
        src$Test$Test$$verify_json($$ImmutableStack$$Stack([4, 5, $$ImmutableStack$$Stack([1, 2, 3])]), [4, 5, [1, 2, 3]]);
      });

      src$Test$Test$$test("each", function () {
        src$Test$Test$$test_each($$ImmutableStack$$Stack, []);

        var x = $$ImmutableStack$$Stack([3]);
        src$Test$Test$$test_each($$ImmutableStack$$Stack, [1, 2, x, 4]);
      });

      src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + empty_stack === "(Stack)");
        $$assert$$assert("" + $$ImmutableStack$$Stack([1, 2, 3]) === "(Stack\n  1\n  2\n  3)");
        $$assert$$assert("" + $$ImmutableStack$$Stack([1, $$ImmutableStack$$Stack([2]), 3]) === "(Stack\n  1\n  (Stack\n    2)\n  3)");
      });

      // TODO
      /*test("zip", function () {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        assert.equal(toArray(zip(Stack(a))), toArray(zip(a)));
      });*/
    });


    src$Test$Test$$context("Record", function () {
      var Empty = $$ImmutableRecord$$Record({});
      var Foo   = $$ImmutableRecord$$Record({ foo: 1 });

      src$Test$Test$$test("isRecord", function () {
        $$assert$$assert(!$$ImmutableRecord$$isRecord($$ImmutableDict$$Dict()));
        $$assert$$assert($$ImmutableRecord$$isRecord(Empty));
        $$assert$$assert($$ImmutableRecord$$isRecord(Foo));
      });

      src$Test$Test$$test("verify", function () {
        src$Test$Test$$verify_record(Empty, {});
        src$Test$Test$$verify_record(Foo, { foo: 1 });
      });

      src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + Empty === "(Record)");
        $$assert$$assert("" + Foo === "(Record\n  \"foo\" = 1)");
        $$assert$$assert("" + $$ImmutableRecord$$Record({ foo: 2 }) === "(Record\n  \"foo\" = 2)");
        $$assert$$assert("" + $$ImmutableRecord$$Record({ foo: 1 }) === "(Record\n  \"foo\" = 1)");
        $$assert$$assert("" + $$ImmutableRecord$$Record({ foo: 1, bar: 2 }) === "(Record\n  \"foo\" = 1\n  \"bar\" = 2)");
        $$assert$$assert("" + $$ImmutableRecord$$Record({ "foo\nbar\nqux": 1, bar: 2 }) === "(Record\n  \"foo\n   bar\n   qux\" = 1\n  \"bar\" = 2)");
        $$assert$$assert("" + $$ImmutableRecord$$Record({ foo: $$ImmutableRecord$$Record({ qux: 3 }), bar: 2 }) === "(Record\n  \"foo\" = (Record\n            \"qux\" = 3)\n  \"bar\" = 2)");
        $$assert$$assert("" + $$ImmutableRecord$$Record({ "foo\nbar\nqux": $$ImmutableRecord$$Record({ qux: 3 }), bar: 2 }) === "(Record\n  \"foo\n   bar\n   qux\" = (Record\n            \"qux\" = 3)\n  \"bar\" = 2)");

        $$assert$$assert("" + $$ImmutableRecord$$Record({ foobarquxcorgenou: 1, bar: 2 }) === "(Record\n  \"foobarquxcorgenou\" = 1\n  \"bar\"               = 2)");
        $$assert$$assert("" + $$ImmutableRecord$$Record({ "foobar\nquxcorgenou": 1, bar: 2 }) === "(Record\n  \"foobar\n   quxcorgenou\" = 1\n  \"bar\"         = 2)");
        $$assert$$assert("" + $$ImmutableRecord$$Record({ "foo\nbar\nqux": 1, "barquxcorgenou": 2 }) === "(Record\n  \"foo\n   bar\n   qux\"            = 1\n  \"barquxcorgenou\" = 2)");
      });

      src$Test$Test$$test("init", function () {
        var x = $$ImmutableRecord$$Record({ foo: 1 });
        src$Test$Test$$verify_record(x, { foo: 1 });
        $$assert$$assert($$$Immutable$Immutable$$equal(x, Foo));
        $$assert$$assert($$$Immutable$Immutable$$equal(Foo, x));

        src$Test$Test$$verify_record($$ImmutableRecord$$Record({ foo: 2 }), { foo: 2 });

        src$Test$Test$$verify_record($$ImmutableRecord$$Record(), {});
      });

      src$Test$Test$$test("get", function () {
        src$Test$Test$$assert_raises(function () {
          Empty.get("foo");
        }, "Key foo not found");

        $$assert$$assert(Foo.get("foo") === 1);
      });

      src$Test$Test$$test("set", function () {
        src$Test$Test$$assert_raises(function () {
          Empty.set("bar", 2);
        }, "Key bar not found");

        var x  = Foo;
        var x2 = x.set("foo", 3);
        $$assert$$assert(x.get("foo") === 1);
        $$assert$$assert(x2.get("foo") === 3);
      });

      src$Test$Test$$test("modify", function () {
        var ran = false;

        src$Test$Test$$assert_raises(function () {
          Empty.modify("foo", function (x) {
            ran = true;
            return x + 1;
          });
        }, "Key foo not found");

        $$assert$$assert(ran === false);


        var ran = false;

        var x  = Foo;
        var x2 = x.modify("foo", function (x) {
          ran = true;
          $$assert$$assert(x === 1);
          return x + 5;
        });

        $$assert$$assert(ran === true);

        $$assert$$assert(x.get("foo") === 1);
        $$assert$$assert(x2.get("foo") === 6);
      });

      src$Test$Test$$test("update", function () {
        src$Test$Test$$verify_record($$ImmutableRecord$$Record({ foo: 1 }), { foo: 1 });
        src$Test$Test$$verify_record($$ImmutableRecord$$Record({ foo: 1 }).update($$ImmutableRecord$$Record({ foo: 2 })), { foo: 2 });
        src$Test$Test$$verify_record($$ImmutableRecord$$Record({ foo: 1 }).update([["foo", 3]]), { foo: 3 });
        src$Test$Test$$verify_record($$ImmutableRecord$$Record({ foo: 1 }).update({ foo: 3 }), { foo: 3 });

        src$Test$Test$$assert_raises(function () {
          $$ImmutableRecord$$Record({ foo: 1 }).update($$ImmutableRecord$$Record({ foo: 2, bar: 3 }));
        }, "Key bar not found");
      });

      src$Test$Test$$test("complex keys", function () {
        var o = $$ImmutableDict$$Dict().set({}, 1);

        src$Test$Test$$assert_raises(function () {
          $$ImmutableRecord$$Record(o);
        }, "Expected key to be a string or Tag but got [object Object]");

        src$Test$Test$$assert_raises(function () {
          Foo.get({});
        }, "Expected key to be a string or Tag but got [object Object]");

        src$Test$Test$$assert_raises(function () {
          Foo.set({}, 5);
        }, "Expected key to be a string or Tag but got [object Object]");

        src$Test$Test$$assert_raises(function () {
          Foo.modify({}, function () { throw new Error("FAIL") });
        }, "Expected key to be a string or Tag but got [object Object]");
      });

      src$Test$Test$$test("=== when not modified", function () {
        var x = Foo;

        $$assert$$assert(x.set("foo", 1) === x);
        $$assert$$assert(x.set("foo", 2) !== x);

        $$assert$$assert(x.modify("foo", function () {
          return 1;
        }) === x);

        $$assert$$assert(x.modify("foo", function () {
          return 2;
        }) !== x);

        var x = $$ImmutableRecord$$Record({ foo: 1 });
        $$assert$$assert($$ImmutableRecord$$Record(x) === x);
        $$assert$$assert($$ImmutableRecord$$Record({ foo: 1 }) !== x);

        $$assert$$assert(x.update([]) === x);
        $$assert$$assert(x.update([["foo", 1]]) === x);
        $$assert$$assert(x.update([["foo", 2]]) !== x);
      });

      src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$$Immutable$Immutable$$equal(Empty, Foo));
        $$assert$$assert($$$Immutable$Immutable$$equal(Empty, Empty));
        $$assert$$assert($$$Immutable$Immutable$$equal(Foo, Foo));

        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableRecord$$Record({}), $$ImmutableRecord$$Record({})));
        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableRecord$$Record({ foo: 1 }), $$ImmutableRecord$$Record({ foo: 1 })));

        $$assert$$assert(!$$$Immutable$Immutable$$equal(Foo, $$ImmutableRecord$$Record({ foo: 2 })));
        $$assert$$assert($$$Immutable$Immutable$$equal(Foo, $$ImmutableRecord$$Record({ foo: 1 })));
        $$assert$$assert($$$Immutable$Immutable$$equal($$ImmutableRecord$$Record({ foo: 2 }), $$ImmutableRecord$$Record({ foo: 2 })));
        $$assert$$assert(!$$$Immutable$Immutable$$equal($$ImmutableRecord$$Record({ foo: 2 }), $$ImmutableRecord$$Record({ foo: 3 })));
      });

      src$Test$Test$$test("toJS", function () {
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(Empty), {}));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(Foo), { foo: 1 }));
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS($$ImmutableRecord$$Record({ foo: $$ImmutableRecord$$Record({ bar: 2 }) })),
                         { foo: { bar: 2 } }));
      });

      src$Test$Test$$test("toJSON", function () {
        src$Test$Test$$verify_json(Empty, {});
        src$Test$Test$$verify_json(Foo, { foo: 1 });
        src$Test$Test$$verify_json($$ImmutableRecord$$Record({ foo: $$ImmutableRecord$$Record({ bar: 2 }) }), { foo: { bar: 2 } });
      });

      src$Test$Test$$test("each", function () {
        src$Test$Test$$test_each($$ImmutableRecord$$Record, []);
        src$Test$Test$$test_each($$ImmutableRecord$$Record, [["foo", 2]]);
        src$Test$Test$$test_each($$ImmutableRecord$$Record, [["foo", 2], ["bar", 3]]);
        src$Test$Test$$test_each($$ImmutableRecord$$Record, [["bar", 3], ["foo", 2]]);
      });

      // TODO
      /*test("zip", function () {
        var a = [["a", 1], ["b", 2], ["c", 3], ["d", 4],
                 ["e", 5], ["f", 6], ["g", 7], ["h", 8]];
        assert.equal(toArray(zip(Dict(a))), toArray(zip(a)));
      });*/
    });


    src$Test$Test$$context("Ref", function () {
      var ref1 = $$MutableRef$$Ref(1);
      var ref2 = $$MutableRef$$Ref(2);

      src$Test$Test$$test("isRef", function () {
        $$assert$$assert(!$$MutableRef$$isRef($$ImmutableDict$$Dict()));
        $$assert$$assert($$MutableRef$$isRef(ref1));
        $$assert$$assert($$MutableRef$$isRef(ref2));
      });

      src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + ref1 === "(Ref 1)");
        $$assert$$assert("" + ref2 === "(Ref 2)");
        $$assert$$assert("" + $$MutableRef$$Ref(50) === "(Ref 3)");
        $$assert$$assert("" + $$MutableRef$$Ref([100]) === "(Ref 4)");
      });

      src$Test$Test$$test("init", function () {
        src$Test$Test$$assert_raises(function () {
          $$MutableRef$$Ref();
        }, "Expected 1 to 2 arguments but got 0");

        src$Test$Test$$assert_raises(function () {
          $$MutableRef$$Ref(1, 2, 3);
        }, "Expected 1 to 2 arguments but got 3");
      });

      src$Test$Test$$test("get", function () {
        $$assert$$assert(ref1.get() === 1);
        $$assert$$assert(ref2.get() === 2);
      });

      src$Test$Test$$test("set", function () {
        $$assert$$assert(ref1.get() === 1);
        ref1.set(50);
        $$assert$$assert(ref1.get() === 50);

        var ran = false;

        var x = $$MutableRef$$Ref(5, function (before, after) {
          $$assert$$assert(before === 5);
          $$assert$$assert(after === 10);
          ran = true;
        });

        x.set(10);

        $$assert$$assert(x.get() === 10);
        $$assert$$assert(ran === true);


        var ran = false;

        var x = $$MutableRef$$Ref(5, function () {
          ran = true;
        });

        x.set(5);

        $$assert$$assert(x.get() === 5);
        $$assert$$assert(ran === false);
      });

      src$Test$Test$$test("modify", function () {
        var ran1 = false;
        var ran2 = false;

        var x = $$MutableRef$$Ref(5, function (before, after) {
          $$assert$$assert(before === 5);
          $$assert$$assert(after === 10);
          ran1 = true;
        });

        x.modify(function (x) {
          $$assert$$assert(x === 5);
          ran2 = true;
          return 10;
        });

        $$assert$$assert(x.get() === 10);
        $$assert$$assert(ran1 === true);
        $$assert$$assert(ran2 === true);


        var ran1 = false;
        var ran2 = false;

        var x = $$MutableRef$$Ref(5, function () {
          ran1 = true;
        });

        x.modify(function (x) {
          $$assert$$assert(x === 5);
          ran2 = true;
          return 5;
        });

        $$assert$$assert(x.get() === 5);
        $$assert$$assert(ran1 === false);
        $$assert$$assert(ran2 === true);
      });

      src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$$Immutable$Immutable$$equal(ref1, ref2));
        $$assert$$assert($$$Immutable$Immutable$$equal(ref1, ref1));
        $$assert$$assert($$$Immutable$Immutable$$equal(ref2, ref2));

        $$assert$$assert(!$$$Immutable$Immutable$$equal($$MutableRef$$Ref(1), $$MutableRef$$Ref(1)));
        $$assert$$assert(!$$$Immutable$Immutable$$equal(ref1, $$MutableRef$$Ref(1)));
      });
    });


    src$Test$Test$$context("Tag", function () {
      var tag1 = $$Tag$$Tag();
      var tag2 = $$Tag$$Tag();
      var uuid_tag1 = $$Tag$$UUIDTag("dc353abd-d920-4c17-b911-55bd1c78c06f");
      var uuid_tag2 = $$Tag$$UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4");

      src$Test$Test$$test("isTag", function () {
        $$assert$$assert(!$$Tag$$isTag("foo"));
        $$assert$$assert(!$$Tag$$isTag($$ImmutableDict$$Dict()));
        $$assert$$assert($$Tag$$isTag(tag1));
        $$assert$$assert($$Tag$$isTag(tag2));
        $$assert$$assert($$Tag$$isTag(uuid_tag1));
        $$assert$$assert($$Tag$$isTag(uuid_tag2));

        $$assert$$assert(!$$Tag$$isUUIDTag("foo"));
        $$assert$$assert(!$$Tag$$isUUIDTag($$ImmutableDict$$Dict()));
        $$assert$$assert(!$$Tag$$isUUIDTag(tag1));
        $$assert$$assert(!$$Tag$$isUUIDTag(tag2));
        $$assert$$assert($$Tag$$isUUIDTag(uuid_tag1));
        $$assert$$assert($$Tag$$isUUIDTag(uuid_tag2));
      });

      src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + tag1 === "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");
        $$assert$$assert("" + tag2 === "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)");
        $$assert$$assert("" + $$Tag$$Tag() === "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 3)");
        $$assert$$assert("" + uuid_tag1 === "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)");
        $$assert$$assert("" + uuid_tag2 === "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)");
        $$assert$$assert("" + $$Tag$$UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4") === "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)");
      });

      src$Test$Test$$test("init", function () {
        src$Test$Test$$assert_raises(function () {
          $$Tag$$Tag(1);
        }, "Expected 0 arguments but got 1");

        src$Test$Test$$assert_raises(function () {
          $$Tag$$Tag(1, 2);
        }, "Expected 0 arguments but got 2");

        src$Test$Test$$assert_raises(function () {
          $$Tag$$UUIDTag();
        }, "Expected 1 argument but got 0");

        src$Test$Test$$assert_raises(function () {
          $$Tag$$UUIDTag(1, 2);
        }, "Expected 1 argument but got 2");

        src$Test$Test$$assert_raises(function () {
          $$Tag$$UUIDTag("foo");
        }, "Expected a lower-case UUID, but got: foo");
      });

      src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$$Immutable$Immutable$$equal(tag1, tag2));
        $$assert$$assert(!$$$Immutable$Immutable$$equal(tag1, uuid_tag1));
        $$assert$$assert($$$Immutable$Immutable$$equal(tag1, tag1));
        $$assert$$assert($$$Immutable$Immutable$$equal(tag2, tag2));

        $$assert$$assert(!$$$Immutable$Immutable$$equal(uuid_tag1, uuid_tag2));
        $$assert$$assert($$$Immutable$Immutable$$equal(uuid_tag1, uuid_tag1));
        $$assert$$assert($$$Immutable$Immutable$$equal(uuid_tag2, uuid_tag2));

        $$assert$$assert($$$Immutable$Immutable$$equal(uuid_tag2, $$Tag$$UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4")));

        $$assert$$assert(!$$$Immutable$Immutable$$equal($$Tag$$Tag(), $$Tag$$Tag()));
        $$assert$$assert(!$$$Immutable$Immutable$$equal(tag1, $$Tag$$Tag()));
      });

      src$Test$Test$$test("===", function () {
        $$assert$$assert(tag1 !== tag2);
        $$assert$$assert(tag1 !== uuid_tag1);
        $$assert$$assert(tag1 === tag1);
        $$assert$$assert(tag2 === tag2);

        $$assert$$assert(uuid_tag1 !== uuid_tag2);
        $$assert$$assert(uuid_tag1 === uuid_tag1);
        $$assert$$assert(uuid_tag2 === uuid_tag2);

        $$assert$$assert(uuid_tag2 === $$Tag$$UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4"));

        $$assert$$assert($$Tag$$Tag() !== $$Tag$$Tag());
        $$assert$$assert(tag1 !== $$Tag$$Tag());
      });

      src$Test$Test$$test("Dict", function () {
        var x = $$ImmutableDict$$Dict();

        x = x.set(tag1, 1);
        x = x.set(tag2, 2);
        x = x.set(uuid_tag1, 3);
        x = x.set(uuid_tag2, 4);

        $$assert$$assert(x.get(tag1) === 1);
        $$assert$$assert(x.get(tag2) === 2);
        $$assert$$assert(x.get(uuid_tag1) === 3);
        $$assert$$assert(x.get(uuid_tag2) === 4);

        $$assert$$assert("" + x === "(Dict\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)   = 1\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)   = 2\n  (UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4) = 4\n  (UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f) = 3)");
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(x), {
          "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)": 1,
          "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)": 2,
          "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)": 4,
          "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)": 3
        }));
      });

      src$Test$Test$$test("Record", function () {
        var x = $$ImmutableRecord$$Record([[tag1, 1], [tag2, 2], [uuid_tag1, 3], [uuid_tag2, 4]]);

        $$assert$$assert(x.get(tag1) === 1);
        $$assert$$assert(x.get(tag2) === 2);
        $$assert$$assert(x.get(uuid_tag1) === 3);
        $$assert$$assert(x.get(uuid_tag2) === 4);

        $$assert$$assert("" + x === "(Record\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)   = 1\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)   = 2\n  (UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f) = 3\n  (UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4) = 4)");
        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(x), {
          "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)": 1,
          "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)": 2,
          "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)": 3,
          "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)": 4
        }));
      });

      src$Test$Test$$test("toJS", function () {
        $$assert$$assert($$toJS$$toJS(tag1) === tag1);
        $$assert$$assert($$toJS$$toJS(uuid_tag1) === uuid_tag1);

        $$assert$$assert($$$Immutable$Immutable$$fromJS(tag1) === tag1);
        $$assert$$assert($$$Immutable$Immutable$$fromJS(uuid_tag1) === uuid_tag1);
      });

      src$Test$Test$$test("toJSON", function () {
        src$Test$Test$$assert_raises(function () {
          $$toJSON$$toJSON(tag1);
        }, "Cannot convert Tag to JSON, use UUIDTag instead: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");

        $$assert$$assert($$toJSON$$toJSON(uuid_tag1) === uuid_tag1);

        src$Test$Test$$assert_raises(function () {
          $$toJSON$$fromJSON(tag1);
        }, "Cannot convert Tag from JSON, use UUIDTag instead: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");

        $$assert$$assert($$toJSON$$fromJSON(uuid_tag1) === uuid_tag1);


        var x = $$ImmutableDict$$Dict([[tag1, 1]]);

        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(x), { "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)": 1 }));

        src$Test$Test$$assert_raises(function () {
          $$toJSON$$toJSON(x);
        }, "Cannot convert Tag to JSON, use UUIDTag instead: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");


        var x = $$ImmutableDict$$Dict([[uuid_tag1, 1]]);

        $$assert$$assert(src$Test$Test$$deepEqual($$toJS$$toJS(x), { "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)": 1 }));

        $$assert$$assert($$$Immutable$Immutable$$equal($$toJSON$$fromJSON($$toJSON$$toJSON(x)), x));
      });
    });


    src$Test$Test$$test("isImmutable", function () {
      $$assert$$assert(!$$$Immutable$Immutable$$isImmutable({}));
      $$assert$$assert(!$$$Immutable$Immutable$$isImmutable([]));
      $$assert$$assert(!$$$Immutable$Immutable$$isImmutable($$MutableRef$$Ref(5)));

      $$assert$$assert($$$Immutable$Immutable$$isImmutable(5));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable("foo"));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable(Object.freeze({})));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable($$ImmutableDict$$Dict()));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable($$ImmutableSet$$Set()));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable($$ImmutableList$$List()));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable($$ImmutableQueue$$Queue()));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable($$ImmutableStack$$Stack()));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable($$ImmutableDict$$SortedDict($$Sorted$$simpleSort)));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable($$ImmutableSet$$SortedSet($$Sorted$$simpleSort)));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable($$Tag$$Tag()));
      $$assert$$assert($$$Immutable$Immutable$$isImmutable($$Tag$$UUIDTag("051eca86-038c-43c8-85cf-01e20f394501")));

      var Foo = $$ImmutableRecord$$Record({});
      $$assert$$assert($$$Immutable$Immutable$$isImmutable(Foo));
    });

    src$Test$Test$$test("toJS", function () {
      var x = {};
      $$assert$$assert($$toJS$$toJS(x) === x);

      var x = [];
      $$assert$$assert($$toJS$$toJS(x) === x);

      var x = new Date();
      $$assert$$assert($$toJS$$toJS(x) === x);

      var x = /foo/;
      $$assert$$assert($$toJS$$toJS(x) === x);

      $$assert$$assert($$toJS$$toJS("foo") === "foo");
      $$assert$$assert($$toJS$$toJS(5) === 5);

      var x = $$MutableRef$$Ref(5);
      $$assert$$assert($$toJS$$toJS(x) === x);
    });

    src$Test$Test$$test("fromJS", function () {
      src$Test$Test$$verify_dict($$$Immutable$Immutable$$fromJS({ foo: 1 }), { foo: 1 });
      src$Test$Test$$verify_list($$$Immutable$Immutable$$fromJS([1, 2, 3]), [1, 2, 3]);

      src$Test$Test$$verify_dict($$$Immutable$Immutable$$fromJS({ foo: { bar: 1 } }), { foo: { bar: 1 } });
      src$Test$Test$$verify_list($$$Immutable$Immutable$$fromJS([1, [2], 3]), [1, [2], 3]);

      src$Test$Test$$verify_dict($$$Immutable$Immutable$$fromJS({ foo: { bar: 1 } }).get("foo"), { bar: 1 });
      src$Test$Test$$verify_list($$$Immutable$Immutable$$fromJS([1, [2], 3]).get(1), [2]);

      var x = new Date();
      $$assert$$assert($$$Immutable$Immutable$$fromJS(x) === x);

      var x = /foo/;
      $$assert$$assert($$$Immutable$Immutable$$fromJS(x) === x);

      $$assert$$assert($$$Immutable$Immutable$$fromJS("foo") === "foo");
      $$assert$$assert($$$Immutable$Immutable$$fromJS(5) === 5);

      var x = $$MutableRef$$Ref(5);
      $$assert$$assert($$$Immutable$Immutable$$fromJS(x) === x);
    });

    src$Test$Test$$test("toJSON", function () {
      var x = {};
      $$assert$$assert($$toJSON$$toJSON(x) === x);

      var x = [];
      $$assert$$assert($$toJSON$$toJSON(x) === x);

      var x = new Date();
      $$assert$$assert($$toJSON$$toJSON(x) === x);

      var x = /foo/;
      $$assert$$assert($$toJSON$$toJSON(x) === x);

      $$assert$$assert($$toJSON$$toJSON("foo") === "foo");
      $$assert$$assert($$toJSON$$toJSON(5) === 5);

      var x = $$MutableRef$$Ref(5);
      $$assert$$assert($$toJSON$$toJSON(x) === x);
    });

    src$Test$Test$$test("fromJSON", function () {
      var x = {};
      $$assert$$assert($$toJSON$$fromJSON(x) === x);

      var x = [];
      $$assert$$assert($$toJSON$$fromJSON(x) === x);

      var x = new Date();
      $$assert$$assert($$toJSON$$fromJSON(x) === x);

      var x = /foo/;
      $$assert$$assert($$toJSON$$fromJSON(x) === x);

      $$assert$$assert($$toJSON$$fromJSON("foo") === "foo");
      $$assert$$assert($$toJSON$$fromJSON(5) === 5);

      var x = $$MutableRef$$Ref(5);
      $$assert$$assert($$toJSON$$fromJSON(x) === x);
    });

    src$Test$Test$$test("deref", function () {
      $$assert$$assert($$MutableRef$$deref(5) === 5);

      var x = $$ImmutableDict$$Dict();
      $$assert$$assert($$MutableRef$$deref(x) === x);

      $$assert$$assert($$MutableRef$$deref($$MutableRef$$Ref(5)) === 5);
      $$assert$$assert($$MutableRef$$deref($$MutableRef$$Ref(x)) === x);
    });


    console.log("SUCCEEDED: " + src$Test$Test$$TESTS_SUCCEEDED + ", FAILED: " + src$Test$Test$$TESTS_FAILED);
}).call(this);

//# sourceMappingURL=Test.js.map