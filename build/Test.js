/**
 * @license
 *
 * (c) 2014, 2015 Oni Labs, http://onilabs.com
 *
 * This file is licensed under the terms of the MIT License:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function() {
    "use strict";
    var $$$Immutable$Tag$$tag_uuid = "48de6fff-9d11-472d-a76f-ed77a59a5cbc";
    var $$$Immutable$Tag$$tag_id = 0;

    var $$$Immutable$Tag$$uuid = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
    var $$$Immutable$Tag$$uuid_regexp = new RegExp("^" + $$$Immutable$Tag$$uuid + "$");

    var $$$Immutable$Tag$$is_tag_regexp = new RegExp("^\\(Tag " + $$$Immutable$Tag$$tag_uuid + " [0-9]+\\)$");

    var $$$Immutable$Tag$$is_uuid_tag_regexp = new RegExp("^\\(UUIDTag " + $$$Immutable$Tag$$uuid + "\\)$");

    var $$$Immutable$Tag$$Symbol_iterator = (typeof Symbol !== "undefined" && typeof Symbol.iterator !== "undefined"
                                   ? Symbol.iterator
                                   : null);

    var $$$Immutable$Tag$$Symbol_keyFor = (typeof Symbol !== "undefined" && typeof Symbol.keyFor !== "undefined"
                                 ? Symbol.keyFor
                                 : null);

    function $$$Immutable$Tag$$isUUID(x) {
      return typeof x === "string" && $$$Immutable$Tag$$uuid_regexp.test(x);
    }

    function $$$Immutable$Tag$$isTag(x) {
      return typeof x === "string" &&
             ($$$Immutable$Tag$$is_tag_regexp.test(x) ||
              $$$Immutable$Tag$$is_uuid_tag_regexp.test(x));
    }

    function $$$Immutable$Tag$$isUUIDTag(x) {
      return typeof x === "string" && $$$Immutable$Tag$$is_uuid_tag_regexp.test(x);
    }

    function $$$Immutable$Tag$$Tag() {
      if (arguments.length === 0) {
        return "(Tag " + $$$Immutable$Tag$$tag_uuid + " " + (++$$$Immutable$Tag$$tag_id) + ")";
      } else {
        throw new Error("Expected 0 arguments but got " + arguments.length);
      }
    }

    function $$$Immutable$Tag$$UUIDTag(id) {
      if (arguments.length === 1) {
        if ($$$Immutable$Tag$$isUUID(id)) {
          return "(UUIDTag " + id + ")";
        } else {
          throw new Error("Expected a lower-case UUID, but got: " + id);
        }

      } else {
        throw new Error("Expected 1 argument but got " + arguments.length);
      }
    }

    if (typeof global.Symbol === "undefined") {
      global.Symbol = {
        iterator: $$$Immutable$Tag$$UUIDTag("4d6d99dc-20e8-4db1-8acd-c05c1121326e")
      };

      /*var id = 0;
      var registry = {};

      global.Symbol = function () {
        return "(Symbol " + Symbol_uuid + " " + (++id) + ")";
      };

      global.Symbol.for = function (s) {
        if (typeof s !== "string") {
          throw new Error("Must be string");
        }

        var x = registry[x];
        if (x == null) {
          x = registry[s] = global.Symbol();
        }
        return x;
      };

      global.Symbol.keyFor = function (x) {
        return registry[s];
      };

      global.Symbol.iterator = global.Symbol();*/
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
    var $$$Immutable$static$$tag_hash        = $$$Immutable$Tag$$UUIDTag("e1c3818d-4c4f-4703-980a-00969e4ca900");
    var $$$Immutable$static$$tag_iter        = $$$Immutable$Tag$$UUIDTag("6199065c-b518-4cb3-8b41-ab70a9769ec3");
    var $$$Immutable$static$$tag_toJS        = $$$Immutable$Tag$$UUIDTag("1b75a273-16bd-4248-be8a-e4b5e8c4b523");
    var $$$Immutable$static$$tag_toJSON_type = $$$Immutable$Tag$$UUIDTag("89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37");
    var $$$Immutable$static$$tag_toJSON      = $$$Immutable$Tag$$UUIDTag("99e14916-bc99-4c48-81aa-299cf1ad6de3");

    var $$$Immutable$static$$fromJSON_registry = {};

    var $$$Immutable$static$$nil = {};
    $$$Immutable$static$$nil.depth      = 0;
    $$$Immutable$static$$nil.size       = 0;
    function $$Immutable$equal$$equal(x, y) {
      return x === y || $$hash$$hash(x) === $$hash$$hash(y);
    }

    // TODO move into "./static.js" ?
    var $$Immutable$iter$$empty = {};

    function $$Immutable$iter$$iter_array(array) {
      var i = 0;

      return {
        next: function () {
          if (i < array.length) {
            return { value: array[i++] };
          } else {
            return { done: true };
          }
        }
      };
    }

    function $$Immutable$iter$$isIterable(x) {
      if ($$Immutable$util$$isObject(x)) {
        return x[$$$Immutable$static$$tag_iter] != null ||
               ($$$Immutable$Tag$$Symbol_iterator !== null && x[$$$Immutable$Tag$$Symbol_iterator] != null) ||
               Array.isArray(x);
      } else {
        return typeof x === "string" && !$$$Immutable$Tag$$isTag(x);
      }
    }

    function $$Immutable$iter$$toIterator(x) {
      var fn;

      if ((fn = x[$$$Immutable$static$$tag_iter]) != null) {
        return fn.call(x);

      // TODO should ES6 Iterables have precedence over `tag_iter` ?
      } else if ($$$Immutable$Tag$$Symbol_iterator !== null && (fn = x[$$$Immutable$Tag$$Symbol_iterator]) != null) {
        return fn.call(x);

      } else if (Array.isArray(x)) {
        return $$Immutable$iter$$iter_array(x);

      // TODO this isn't quite correct
      } else if (typeof x === "string" && !$$$Immutable$Tag$$isTag(x)) {
        return $$Immutable$iter$$iter_array(x);

      } else {
        throw new Error("Cannot iter: " + x);
      }
    }

    function $$Immutable$iter$$Iterable(f) {
      var o = {};

      function iter() {
        return f();
      }

      o[$$$Immutable$static$$tag_iter] = iter;

      if ($$$Immutable$Tag$$Symbol_iterator !== null) {
        o[$$$Immutable$Tag$$Symbol_iterator] = iter;
      }

      return o;
    }

    function $$Immutable$iter$$each_iter(iterator, f) {
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

    function $$Immutable$iter$$map_iter(iterator, f) {
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

    function $$Immutable$iter$$concat_iter(x, y) {
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
                  return { value: info.value };
                }
              }
            } else {
              var info = x.next();
              if (info.done) {
                x_done = true;
              } else {
                return { value: info.value };
              }
            }
          }
        }
      };
    }

    function $$Immutable$iter$$any(x, f) {
      var iterator = $$Immutable$iter$$toIterator(x);

      for (;;) {
        var info = iterator.next();
        if (info.done) {
          return false;
        } else if (f(info.value)) {
          return true;
        }
      }
    }

    function $$Immutable$iter$$all(x, f) {
      var iterator = $$Immutable$iter$$toIterator(x);

      for (;;) {
        var info = iterator.next();
        if (info.done) {
          return true;
        } else if (!f(info.value)) {
          return false;
        }
      }
    }

    function $$Immutable$iter$$find(x, f, def) {
      var iterator = $$Immutable$iter$$toIterator(x);

      for (;;) {
        var info = iterator.next();
        if (info.done) {
          if (arguments.length === 3) {
            return def;
          } else {
            throw new Error("Did not find anything");
          }

        } else if (f(info.value)) {
          return info.value;
        }
      }
    }

    function $$Immutable$iter$$partition(x, f) {
      var yes_buffer = [];
      var no_buffer  = [];

      var iterator = $$Immutable$iter$$empty;
      var done     = false;

      return $$Immutable$ImmutableTuple$$unsafe_Tuple([
        $$Immutable$iter$$Iterable(function () {
          if (iterator === $$Immutable$iter$$empty) {
            iterator = $$Immutable$iter$$toIterator(x);
          }

          return {
            next: function () {
              for (;;) {
                if (yes_buffer.length) {
                  return yes_buffer.shift();

                } else if (done) {
                  return { done: true };

                } else {
                  var info = iterator.next();
                  if (info.done) {
                    done = true;

                  } else if (f(info.value)) {
                    return { value: info.value };

                  } else {
                    no_buffer.push({ value: info.value });
                  }
                }
              }
            }
          };
        }),

        $$Immutable$iter$$Iterable(function () {
          if (iterator === $$Immutable$iter$$empty) {
            iterator = $$Immutable$iter$$toIterator(x);
          }

          return {
            next: function () {
              for (;;) {
                if (no_buffer.length) {
                  return no_buffer.shift();

                } else if (done) {
                  return { done: true };

                } else {
                  var info = iterator.next();
                  if (info.done) {
                    done = true;

                  } else if (f(info.value)) {
                    yes_buffer.push({ value: info.value });

                  } else {
                    return { value: info.value };
                  }
                }
              }
            }
          };
        })
      ]);
    }

    function $$Immutable$iter$$zip(x, def) {
      var hasDefault = (arguments.length === 2);

      return $$Immutable$iter$$Iterable(function () {
        var args = $$Immutable$iter$$toArray(x).map(function (x) {
          return $$Immutable$iter$$toIterator(x);
        });

        var isDone = false;

        return {
          next: function () {
            for (;;) {
              if (isDone) {
                return { done: true };

              } else {
                var out  = [];
                var seen = false;

                for (var i = 0, l = args.length; i < l; ++i) {
                  var info = args[i].next();
                  if (info.done) {
                    if (hasDefault) {
                      out.push(def);
                    } else {
                      seen = false;
                      break;
                    }
                  } else {
                    seen = true;
                    out.push(info.value);
                  }
                }

                if (seen) {
                  return { value: $$Immutable$ImmutableTuple$$unsafe_Tuple(out) };

                } else {
                  isDone = true;
                }
              }
            }
          }
        };
      });
    }

    function $$Immutable$iter$$reverse_iter(iterator) {
      var stack = [];

      // TODO should it do this here, or inside `next` ?
      $$Immutable$iter$$each_iter(iterator, function (x) {
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

    function $$Immutable$iter$$foldl(x, init, f) {
      $$Immutable$iter$$each(x, function (x) {
        init = f(init, x);
      });
      return init;
    }

    function $$Immutable$iter$$foldr(x, init, f) {
      return $$Immutable$iter$$foldl($$Immutable$iter$$reverse(x), init, function (x, y) {
        return f(y, x);
      });
    }

    function $$Immutable$iter$$toArray(x) {
      if (Array.isArray(x)) {
        return x;

      } else {
        var a = [];

        $$Immutable$iter$$each(x, function (x) {
          a.push(x);
        });

        return a;
      }
    }

    function $$Immutable$iter$$join(x, separator) {
      if (arguments.length === 1) {
        separator = "";
      }

      if (typeof x === "string" && separator === "") {
        return x;
      } else {
        // TODO this requires O(n) space, perhaps we can use an iterator to make it O(1) space ?
        return $$Immutable$iter$$toArray(x).join(separator);
      }
    }

    function $$Immutable$iter$$mapcat_iter(iterator, f) {
      var done = false;
      var sub  = $$Immutable$iter$$empty;

      return {
        next: function () {
          for (;;) {
            if (done) {
              return { done: true };

            } else if (sub === $$Immutable$iter$$empty) {
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
                sub = $$Immutable$iter$$empty;
              } else {
                return { value: info.value };
              }
            }
          }
        }
      };
    }

    function $$Immutable$iter$$iter_object(x) {
      if ($$Immutable$util$$isJSLiteral(x)) {
        return $$Immutable$iter$$map(Object.keys(x), function (key) {
          return [key, x[key]];
        });
      } else {
        return x;
      }
    }


    function $$Immutable$iter$$each(x, f) {
      $$Immutable$iter$$each_iter($$Immutable$iter$$toIterator(x), f);
    }

    function $$Immutable$iter$$findIndex(x, f, def) {
      var iterator = $$Immutable$iter$$toIterator(x);

      var index = 0;

      for (;;) {
        var info = iterator.next();
        // TODO what if it has a value too?
        if (info.done) {
          if (arguments.length === 3) {
            return def;
          } else {
            throw new Error("Did not find anything");
          }

        } else if (f(info.value)) {
          return index;

        } else {
          ++index;
        }
      }
    }

    function $$Immutable$iter$$indexOf(x, value, def) {
      if (arguments.length === 3) {
        return $$Immutable$iter$$findIndex(x, function (other) {
          // TODO should `value` or `other` come first ?
          return $$Immutable$equal$$equal(other, value);
        }, def);
      } else {
        return $$Immutable$iter$$findIndex(x, function (other) {
          // TODO should `value` or `other` come first ?
          return $$Immutable$equal$$equal(other, value);
        });
      }
    }

    function $$Immutable$iter$$take(x, count) {
      // TODO isInteger function
      if (Math.round(count) !== count) {
        throw new Error("Count must be an integer");
      }

      if (count < 0) {
        throw new Error("Count cannot be negative");
      }

      return $$Immutable$iter$$Iterable(function () {
        var iterator = $$Immutable$iter$$toIterator(x);

        return {
          next: function () {
            for (;;) {
              if (count < 0) {
                throw new Error("Invalid count");

              } else if (count === 0) {
                return { done: true };

              } else {
                var info = iterator.next();
                if (info.done) {
                  count = 0;
                } else {
                  --count;
                  return { value: info.value };
                }
              }
            }
          }
        };
      });
    }

    function $$Immutable$iter$$range(start, end, step) {
      if (arguments.length < 1) {
        start = 0;
      }
      if (arguments.length < 2) {
        end = Infinity;
      }
      if (arguments.length < 3) {
        step = 1;
      }

      if (step < 0) {
        throw new Error("Step cannot be negative");
      }

      return $$Immutable$iter$$Iterable(function () {
        if (start < end) {
          var next = function () {
            if (start < end) {
              var current = start;
              start += step;
              return { value: current };

            } else {
              return { done: true };
            }
          };
        } else {
          var next = function () {
            if (start > end) {
              var current = start;
              start -= step;
              return { value: current };

            } else {
              return { done: true };
            }
          };
        }
        return {
          next: next
        };
      });
    }

    function $$Immutable$iter$$map(x, f) {
      return $$Immutable$iter$$Iterable(function () {
        return $$Immutable$iter$$map_iter($$Immutable$iter$$toIterator(x), f);
      });
    }

    function $$Immutable$iter$$reverse(x) {
      return $$Immutable$iter$$Iterable(function () {
        return $$Immutable$iter$$reverse_iter($$Immutable$iter$$toIterator(x));
      });
    }

    function $$Immutable$iter$$keep(x, f) {
      return $$Immutable$iter$$Iterable(function () {
        var iterator = $$Immutable$iter$$toIterator(x);
        return {
          next: function () {
            for (;;) {
              var info = iterator.next();
              // TODO what if it has a value too?
              if (info.done) {
                return { done: true };
              } else if (f(info.value)) {
                return { value: info.value };
              }
            }
          }
        };
      });
    }

    var $$hash$$mutable_hash_id = 0;

    var $$hash$$Symbol_id = 0;
    var $$hash$$Symbol_registry = {};

    function $$hash$$hash_string(x) {
      return "\"" + x.replace(/[\\\"\n]/g, function (s) {
        if (s === "\n") {
          return s + " ";
        } else {
          return "\\" + s;
        }
      }) + "\"";
    }

    function $$hash$$hash_symbol(x) {
      var key;
      if ($$$Immutable$Tag$$Symbol_keyFor !== null && (key = $$$Immutable$Tag$$Symbol_keyFor(x)) != null) {
        return "(Symbol.for " + $$hash$$hash(key) + ")";
      } else {
        key = $$hash$$Symbol_registry[x];
        if (key == null) {
          key = $$hash$$Symbol_registry[x] = (++$$hash$$Symbol_id);
        }
        return "(Symbol " + key + ")";
      }
    }

    function $$hash$$hash(x) {
      var type = typeof x;
      // TODO this is probably pretty inefficient
      if (type === "string") {
        if ($$$Immutable$Tag$$isTag(x)) {
          return x;
        } else {
          return $$hash$$hash_string(x);
        }

      } else if (type === "number"    ||
                 type === "boolean"   ||
                 type === "undefined" ||
                 x === null) {
        return "" + x;

      } else if (type === "symbol") {
        return $$hash$$hash_symbol(x);

      } else {
        var hasher = x[$$$Immutable$static$$tag_hash];
        if (hasher != null) {
          return hasher(x);

        } else {
          if (Object.isExtensible(x)) {
            var id = "(Mutable " + (++$$hash$$mutable_hash_id) + ")";

            Object.defineProperty(x, $$$Immutable$static$$tag_hash, {
              configurable: false,
              enumerable: false,
              writable: false,
              value: function () {
                return id;
              }
            });

            return id;

          } else {
            throw new Error("Cannot use a non-extensible object as a key: " + x);
          }
        }
      }
    }

    function $$hash$$hash_dict(x, spaces) {
      var max_key = 0;

      var a = [];

      $$Immutable$iter$$each(x, function (_array) {
        $$Immutable$util$$destructure_pair(_array, function (key, value) {
          key   = $$hash$$hash(key);
          value = $$hash$$hash(value);

          key = key.split(/\n/);

          $$Immutable$iter$$each(key, function (key) {
            max_key = Math.max(max_key, key.length);
          });

          a.push({
            key: key,
            value: value
          });
        });
      });

      var spaces = "  ";

      a = $$Immutable$iter$$map(a, function (x) {
        var last = x.key.length - 1;
        x.key[last] = $$Immutable$util$$pad_right(x.key[last], max_key, " ");

        var key = $$Immutable$iter$$join(x.key, "\n");

        var value = x.value.replace(/\n/g, "\n" + $$Immutable$util$$repeat(" ", max_key + 3));

        return key + " = " + value;
      });

      return $$hash$$join_lines(a, spaces);
    }

    function $$hash$$hash_array(s) {
      return function (x) {
        if (x.hash === null) {
          var a = $$Immutable$iter$$map(x, function (x) {
            return $$hash$$hash(x);
          });

          x.hash = "(" + s + $$hash$$join_lines(a, "  ") + ")";
        }

        return x.hash;
      };
    }

    function $$hash$$join_lines(a, spaces) {
      var separator = "\n" + spaces;

      return $$Immutable$iter$$join($$Immutable$iter$$map(a, function (x) {
        return separator + x.replace(/\n/g, separator);
      }));
    }
    function $$Immutable$toJSON$$fromJSON(x) {
      var type = typeof x;

      if ($$$Immutable$Tag$$isTag(x)) {
        if ($$$Immutable$Tag$$isUUIDTag(x)) {
          return x;
        } else {
          throw new Error("Cannot convert Tag from JSON, use UUIDTag instead: " + x);
        }

      } else if (type === "string" || type === "boolean" || x === null || $$Immutable$util$$isFinite(x)) {
        return x;

      } else if ($$Immutable$util$$isObject(x)) {
        var type = x[$$$Immutable$static$$tag_toJSON_type];
        if (type != null) {
          var register = $$$Immutable$static$$fromJSON_registry[type];
          if (register != null) {
            return register(x);
          } else {
            throw new Error("Cannot handle type " + type);
          }

        } else if (Array.isArray(x)) {
          return x.map($$Immutable$toJSON$$fromJSON);

        } else if ($$Immutable$util$$isJSLiteral(x)) {
          var out = {};
          // TODO is Object.keys correct here ?
          Object.keys(x).forEach(function (key) {
                // TODO unit tests for this
            out[$$Immutable$toJSON$$fromJSON(key)] = $$Immutable$toJSON$$fromJSON(x[key]);
          });
          return out;

        } else {
          throw new Error("Cannot convert from JSON: " + x);
        }

      } else {
        throw new Error("Cannot convert from JSON: " + x);
      }
    }

    function $$Immutable$toJSON$$toJSON(x) {
      var type = typeof x;

      if ($$$Immutable$Tag$$isTag(x)) {
        if ($$$Immutable$Tag$$isUUIDTag(x)) {
          return x;
        } else {
          throw new Error("Cannot convert Tag to JSON, use UUIDTag instead: " + x);
        }

      } else if (type === "string" || type === "boolean" || x === null || $$Immutable$util$$isFinite(x)) {
        return x;

      } else if ($$Immutable$util$$isObject(x)) {
        var fn = x[$$$Immutable$static$$tag_toJSON];
        if (fn != null) {
          return fn(x);

        // TODO isFunction ?
        // TODO should this be before or after tag_toJSON ?
        } else if (typeof x.toJSON === "function") {
          return $$Immutable$toJSON$$toJSON(x.toJSON());

        } else if (Array.isArray(x)) {
          return x.map($$Immutable$toJSON$$toJSON);

        } else if ($$Immutable$util$$isJSLiteral(x)) {
          var out = {};
          // TODO is Object.keys correct here ?
          Object.keys(x).forEach(function (key) {
                // TODO unit tests for this
            out[$$Immutable$toJSON$$toJSON(key)] = $$Immutable$toJSON$$toJSON(x[key]);
          });
          return out;

        } else {
          throw new Error("Cannot convert to JSON: " + x);
        }

      } else {
        throw new Error("Cannot convert to JSON: " + x);
      }
    }

    function $$Immutable$toJSON$$toJSON_object(type, x) {
      var o = {};

      o[$$$Immutable$static$$tag_toJSON_type] = type;

      o.keys   = [];
      o.values = [];

      $$Immutable$iter$$each(x, function (_array) {
        $$Immutable$util$$destructure_pair(_array, function (key, value) {
          o.keys.push($$Immutable$toJSON$$toJSON(key));
          o.values.push($$Immutable$toJSON$$toJSON(value));
        });
      });

      return o;
    }

    function $$Immutable$toJSON$$toJSON_array(type, x) {
      var o = {};

      o[$$$Immutable$static$$tag_toJSON_type] = type;

      o.values = [];

      $$Immutable$iter$$each(x, function (value) {
        o.values.push($$Immutable$toJSON$$toJSON(value));
      });

      return o;
    }

    function $$Immutable$toJSON$$fromJSON_object(x) {
      var keys   = x.keys;
      var values = x.values;

      var l = keys.length;
      var out = new Array(l);

      for (var i = 0; i < l; ++i) {
        out[i] = [$$Immutable$toJSON$$fromJSON(keys[i]), $$Immutable$toJSON$$fromJSON(values[i])];
      }

      return out;
    }

    function $$Immutable$toJSON$$fromJSON_array(x) {
      var values = x.values;

      var l = values.length;
      var out = new Array(l);

      for (var i = 0; i < l; ++i) {
        out[i] = $$Immutable$toJSON$$fromJSON(values[i]);
      }

      return out;
    }
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
      if (x === $$$Immutable$static$$nil) {
        return y;

      } else if (y === $$$Immutable$static$$nil) {
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
      if (node === $$$Immutable$static$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, $$AVL$$insert_min(node.left, new_node), node.right);
      }
    }

    function $$AVL$$insert_max(node, new_node) {
      if (node === $$$Immutable$static$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, node.left, $$AVL$$insert_max(node.right, new_node));
      }
    }

    function $$AVL$$iter_tree(node) {
      var parents = [];

      while (node !== $$$Immutable$static$$nil) {
        parents.push(node);
        node = node.left;
      }

      return {
        next: function () {
          if (parents.length) {
            var parent = parents.pop();

            node = parent.right;

            while (node !== $$$Immutable$static$$nil) {
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
    var $$Base$$MutableBase   = {};
    var $$Base$$ImmutableBase = {};

    function $$Base$$toString() {
      return $$hash$$hash(this);
    }

    // TODO Infinite cycle detection ?
    function $$Base$$_toJSON() {
      return $$Immutable$toJSON$$toJSON(this);
    }

    $$Base$$MutableBase.toString = $$Base$$ImmutableBase.toString = $$Base$$toString;
    $$Base$$MutableBase.inspect  = $$Base$$ImmutableBase.inspect  = $$Base$$toString;

    // Mutable things cannot be converted to JSON
    $$Base$$ImmutableBase.toJSON = $$Base$$_toJSON;

    if ($$$Immutable$Tag$$Symbol_iterator !== null) {
      $$Base$$MutableBase[$$$Immutable$Tag$$Symbol_iterator] = $$Base$$ImmutableBase[$$$Immutable$Tag$$Symbol_iterator] = function () {
        return $$Immutable$iter$$toIterator(this);
      };
    }
    function $$Ordered$$nth_has(index, len) {
      return index >= 0 && index < len;
    }

    function $$Ordered$$ordered_has(index) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      return $$Ordered$$nth_has(index, len);
    }
    function $$Cons$$Cons(car, cdr) {
      this.car = car;
      this.cdr = cdr;
    }

    function $$Cons$$iter_cons(x) {
      return {
        next: function () {
          if (x === $$$Immutable$static$$nil) {
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
      while (x !== $$$Immutable$static$$nil) {
        f(x.car);
        x = x.cdr;
      }
    }
    var $$$Immutable$ImmutableList$$array_limit = 125;

    var $$$Immutable$ImmutableList$$ceiling = Math.ceil;
    var $$$Immutable$ImmutableList$$floor   = Math.floor;


    function $$$Immutable$ImmutableList$$add_slice(slices, slice) {
      if (slices.length) {
        var last = slices[slices.length - 1];
        if (last.length + slice.length <= $$$Immutable$ImmutableList$$array_limit) {
          slices[slices.length - 1] = last.concat(slice);
        } else {
          slices.push(slice);
        }
      } else {
        slices.push(slice);
      }
    }

    function $$$Immutable$ImmutableList$$slices_to_tree1(slices, min, max) {
      if (min < max) {
        var pivot = $$$Immutable$ImmutableList$$floor((min + max) / 2);
        var left  = $$$Immutable$ImmutableList$$slices_to_tree1(slices, min, pivot);
        var right = $$$Immutable$ImmutableList$$slices_to_tree1(slices, pivot + 1, max);
        return new $$$Immutable$ImmutableList$$ArrayNode(left, right, slices[pivot]);
      } else {
        return $$$Immutable$static$$nil;
      }
    }

    function $$$Immutable$ImmutableList$$slices_to_tree(slices) {
      return $$$Immutable$ImmutableList$$slices_to_tree1(slices, 0, slices.length);
    }

    // TODO move this into Array.js ?
    function $$$Immutable$ImmutableList$$array_slice(array, from, to) {
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
    function $$$Immutable$ImmutableList$$stack_to_array(a, size) {
      var out = new Array(size);

      while (size--) {
        out[size] = a.car;
        a = a.cdr;
      }

      return out;
    }

    function $$$Immutable$ImmutableList$$stack_nth(a, size, i) {
      while (--size !== i) {
        a = a.cdr;
      }

      return a.car;
    }


    function $$$Immutable$ImmutableList$$ArrayNode(left, right, array) {
      this.left  = left;
      this.right = right;
      this.array = array;
      this.size  = left.size + right.size + array.length;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$$Immutable$ImmutableList$$ArrayNode.prototype.copy = function (left, right) {
      return new $$$Immutable$ImmutableList$$ArrayNode(left, right, this.array);
    };


    function $$$Immutable$ImmutableList$$nth_get(node, index) {
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

    function $$$Immutable$ImmutableList$$nth_insert(node, index, value) {
      // TODO is this necessary ?
      if (node === $$$Immutable$static$$nil) {
        return new $$$Immutable$ImmutableList$$ArrayNode($$$Immutable$static$$nil, $$$Immutable$static$$nil, [value]);

      } else {
        var left    = node.left;
        var right   = node.right;
        var l_index = left.size;

        if (index < l_index) {
          var child = $$$Immutable$ImmutableList$$nth_insert(left, index, value);
          return $$AVL$$balanced_node(node, child, right);

        } else {
          index -= l_index;

          var array = node.array;
          var len   = array.length;
          // TODO test this
          if (index <= len) {
            array = $$Array$$insert(array, index, value);

            // TODO this fails when array_limit is 1
            if (len === $$$Immutable$ImmutableList$$array_limit) {
              var pivot  = $$$Immutable$ImmutableList$$ceiling(array.length / 2);
              var aleft  = array.slice(0, pivot);
              var aright = array.slice(pivot);

              if (left.depth < right.depth) {
                // TODO unit test for this
                // TODO insert_array_max ?
                return new $$$Immutable$ImmutableList$$ArrayNode($$AVL$$insert_max(left, new $$$Immutable$ImmutableList$$ArrayNode($$$Immutable$static$$nil, $$$Immutable$static$$nil, aleft)), right, aright);
              } else {
                // TODO unit test for this
                // TODO insert_array_min ?
                return new $$$Immutable$ImmutableList$$ArrayNode(left, $$AVL$$insert_min(right, new $$$Immutable$ImmutableList$$ArrayNode($$$Immutable$static$$nil, $$$Immutable$static$$nil, aright)), aleft);
              }

            } else {
              return new $$$Immutable$ImmutableList$$ArrayNode(left, right, array);
            }

          } else {
            var child = $$$Immutable$ImmutableList$$nth_insert(right, index - len, value);
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$$Immutable$ImmutableList$$nth_modify(node, index, f) {
      var left    = node.left;
      var right   = node.right;
      var l_index = left.size;

      if (index < l_index) {
        var child = $$$Immutable$ImmutableList$$nth_modify(left, index, f);
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
            return new $$$Immutable$ImmutableList$$ArrayNode(left, right, new_array);
          }

        } else {
          var child = $$$Immutable$ImmutableList$$nth_modify(right, index - len, f);
          if (child === right) {
            return node;
          } else {
            return node.copy(left, child); // TODO test this
          }
        }
      }
    }

    function $$$Immutable$ImmutableList$$nth_remove(node, index) {
      var left    = node.left;
      var right   = node.right;
      var l_index = left.size;

      if (index < l_index) {
        var child = $$$Immutable$ImmutableList$$nth_remove(left, index);
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
            return new $$$Immutable$ImmutableList$$ArrayNode(left, right, array);
          }

        } else {
          var child = $$$Immutable$ImmutableList$$nth_remove(right, index - len);
          return $$AVL$$balanced_node(node, left, child);
        }
      }
    }

    function $$$Immutable$ImmutableList$$nth_slice(slices, node, from, to) {
      if (node !== $$$Immutable$static$$nil) {
        var left = node.left;
        var size = left.size;

        if (from < size) {
          $$$Immutable$ImmutableList$$nth_slice(slices, left, from, to);
        }

        var array = node.array;
        var len   = array.length;

        from -= size;
        to   -= size;

        if (from < len && to > 0) {
          $$$Immutable$ImmutableList$$add_slice(slices, $$$Immutable$ImmutableList$$array_slice(array, from, to));
        }

        if (to > len) {
          $$$Immutable$ImmutableList$$nth_slice(slices, node.right, from - len, to - len);
        }
      }
    }

    function $$$Immutable$ImmutableList$$insert_array_max(node, new_array) {
      if (node === $$$Immutable$static$$nil) {
        return new $$$Immutable$ImmutableList$$ArrayNode($$$Immutable$static$$nil, $$$Immutable$static$$nil, new_array);
      } else {
        var left  = node.left;
        var right = node.right;
        var array = node.array;
        if (right === $$$Immutable$static$$nil && array.length + new_array.length <= $$$Immutable$ImmutableList$$array_limit) {
          return new $$$Immutable$ImmutableList$$ArrayNode(left, right, array.concat(new_array));
        } else {
          // TODO do we need to use balanced_node ?
          return $$AVL$$balanced_node(node, left, $$$Immutable$ImmutableList$$insert_array_max(right, new_array));
        }
      }
    }


    function $$$Immutable$ImmutableList$$ImmutableList(root, tail, tail_size) {
      this.root = root;
      this.tail = tail;
      this.tail_size = tail_size;
      this.hash = null;
    }

    $$$Immutable$ImmutableList$$ImmutableList.prototype = Object.create($$Base$$ImmutableBase);

    $$$Immutable$ImmutableList$$ImmutableList.prototype[$$$Immutable$static$$tag_hash] = $$hash$$hash_array("List");
    $$$Immutable$ImmutableList$$ImmutableList.prototype[$$$Immutable$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;
    $$$Immutable$ImmutableList$$ImmutableList.prototype.has = $$Ordered$$ordered_has;

    $$$Immutable$static$$fromJSON_registry["List"] = function (x) {
      return $$$Immutable$ImmutableList$$List($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype[$$$Immutable$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_array("List", x);
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype[$$$Immutable$static$$tag_iter] = function () {
      var tree = $$Immutable$iter$$mapcat_iter($$AVL$$iter_tree(this.root), function (node) {
        return $$Immutable$iter$$toIterator(node.array);
      });
      return $$Immutable$iter$$concat_iter(tree, $$Immutable$iter$$reverse_iter($$Cons$$iter_cons(this.tail)));
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.isEmpty = function () {
      return this.root === $$$Immutable$static$$nil && this.tail === $$$Immutable$static$$nil;
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.removeAll = function () {
      return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$static$$nil, $$$Immutable$static$$nil, 0);
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.size = function () {
      return this.root.size + this.tail_size;
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.get = function (index, def) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      if ($$Ordered$$nth_has(index, len)) {
        var root = this.root;
        var size = root.size;
        if (index < size) {
          return $$$Immutable$ImmutableList$$nth_get(root, index);
        } else {
          return $$$Immutable$ImmutableList$$stack_nth(this.tail, this.tail_size, index - size);
        }

      } else if (arguments.length === 2) {
        return def;

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.insert = function (index, value) {
      if (arguments.length !== 2) {
        throw new Error("Expected 2 arguments but got " + arguments.length);
      }

      var len = this.size();

      if (index < 0) {
        index += (len + 1);
      }

      if (index === len) {
        return this.push(value);

      } else {
        var root      = this.root;
        var tail      = this.tail;
        var tail_size = this.tail_size;

        if ($$Ordered$$nth_has(index, len)) {
          var size = root.size;
          if (index <= size) {
            return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$ImmutableList$$nth_insert(root, index, value), tail, tail_size);

          } else {
            var array = $$Array$$insert($$$Immutable$ImmutableList$$stack_to_array(tail, tail_size), index - size, value);
            return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$ImmutableList$$insert_array_max(root, array), $$$Immutable$static$$nil, 0);
          }

        } else {
          throw new Error("Index " + index + " is not valid");
        }
      }
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.push = function (value) {
      var root      = this.root;
      var tail      = this.tail;
      var tail_size = this.tail_size;

      if (tail_size === $$$Immutable$ImmutableList$$array_limit) {
        var node = $$$Immutable$ImmutableList$$insert_array_max(root, $$$Immutable$ImmutableList$$stack_to_array(tail, tail_size));
        return new $$$Immutable$ImmutableList$$ImmutableList(node, new $$Cons$$Cons(value, $$$Immutable$static$$nil), 1);
      } else {
        return new $$$Immutable$ImmutableList$$ImmutableList(root, new $$Cons$$Cons(value, tail), tail_size + 1);
      }
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.remove = function (index) {
      if (arguments.length !== 1) {
        throw new Error("Expected 1 argument but got " + arguments.length);
      }

      var len = this.size();

      if (index < 0) {
        index += len;
      }

      var root      = this.root;
      var tail      = this.tail;
      var tail_size = this.tail_size;

      if (tail !== $$$Immutable$static$$nil && index === len - 1) {
        return new $$$Immutable$ImmutableList$$ImmutableList(root, tail.cdr, tail_size - 1);

      } else if ($$Ordered$$nth_has(index, len)) {
        var size = root.size;
        if (index < size) {
          return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$ImmutableList$$nth_remove(root, index), tail, tail_size);

        } else {
          var array = $$Array$$remove($$$Immutable$ImmutableList$$stack_to_array(tail, tail_size), index - size);
          return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$ImmutableList$$insert_array_max(root, array), $$$Immutable$static$$nil, 0);
        }

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.modify = function (index, f) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      if ($$Ordered$$nth_has(index, len)) {
        var root = this.root;
        var tail = this.tail;
        var tail_size = this.tail_size;
        var size = root.size;

        if (tail !== $$$Immutable$static$$nil && index === len - 1) {
          var value = f(tail.car);
          if (value === tail.car) {
            return this;
          } else {
            return new $$$Immutable$ImmutableList$$ImmutableList(root, new $$Cons$$Cons(value, tail.cdr), tail_size);
          }

        } else if (index < size) {
          var node = $$$Immutable$ImmutableList$$nth_modify(root, index, f);
          if (node === root) {
            return this;
          } else {
            return new $$$Immutable$ImmutableList$$ImmutableList(node, tail, tail_size);
          }

        } else {
          var stack = $$$Immutable$ImmutableList$$stack_to_array(tail, tail_size);
          var array = $$Array$$modify(stack, index - size, f);
          if (array === stack) {
            return this;
          } else {
            return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$ImmutableList$$insert_array_max(root, array), $$$Immutable$static$$nil, 0);
          }
        }

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    // TODO a bit of code duplication
    $$$Immutable$ImmutableList$$ImmutableList.prototype.set = function (index, value) {
      return this.modify(index, function () {
        return value;
      });
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.slice = function (from, to) {
      var len = this.size();

      if (arguments.length < 1) {
        from = 0;
      }
      if (arguments.length < 2) {
        to = len;
      }

      if (typeof from !== "number") {
        throw new Error("Expected a number but got " + from);
      }
      if (typeof to !== "number") {
        throw new Error("Expected a number but got " + to);
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

      } else if ($$Ordered$$nth_has(from, len)) {
        if (from === to) {
          return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$static$$nil, $$$Immutable$static$$nil, 0);

        // TODO code duplication with nth_has ?
        } else if (to > 0 && to <= len) {
          var root = this.root;
          var size = root.size;

          var slices = [];

          if (from <= size) {
            $$$Immutable$ImmutableList$$nth_slice(slices, root, from, to);
          }

          if (to > size) {
            var stack = $$$Immutable$ImmutableList$$stack_to_array(this.tail, this.tail_size);
            $$$Immutable$ImmutableList$$add_slice(slices, $$$Immutable$ImmutableList$$array_slice(stack, from - size, to - size));
          }

          return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$ImmutableList$$slices_to_tree(slices), $$$Immutable$static$$nil, 0);

        } else {
          throw new Error("Index " + to + " is not valid");
        }

      } else {
        throw new Error("Index " + from + " is not valid");
      }
    };

    $$$Immutable$ImmutableList$$ImmutableList.prototype.concat = function (right) {
      if (right instanceof $$$Immutable$ImmutableList$$ImmutableList) {
        var lroot = this.root;
        var ltail = this.tail;

        var rroot = right.root;
        var rtail = right.tail;

        if (rroot === $$$Immutable$static$$nil && rtail === $$$Immutable$static$$nil) {
          return this;

        } else if (lroot === $$$Immutable$static$$nil && ltail === $$$Immutable$static$$nil) {
          return right;

        } else {
          if (ltail !== $$$Immutable$static$$nil) {
            lroot = $$$Immutable$ImmutableList$$insert_array_max(lroot, $$$Immutable$ImmutableList$$stack_to_array(ltail, this.tail_size));
          }

          var node = $$AVL$$concat(lroot, rroot);
          return new $$$Immutable$ImmutableList$$ImmutableList(node, rtail, right.tail_size);
        }

      } else {
        return $$Immutable$iter$$foldl(right, this, function (self, x) {
          return self.push(x);
        });
      }
    };


    function $$$Immutable$ImmutableList$$isList(x) {
      return x instanceof $$$Immutable$ImmutableList$$ImmutableList;
    }

    function $$$Immutable$ImmutableList$$List(array) {
      if (arguments.length === 0) {
        return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$static$$nil, $$$Immutable$static$$nil, 0);
      } else {
        if (array instanceof $$$Immutable$ImmutableList$$ImmutableList) {
          return array;
        } else {
          return new $$$Immutable$ImmutableList$$ImmutableList($$$Immutable$static$$nil, $$$Immutable$static$$nil, 0).concat(array);
        }
      }
    }
    function $$Immutable$Sorted$$simpleSort(x, y) {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else {
        return 1;
      }
    }

    function $$Immutable$Sorted$$key_get(node, sort, hash) {
      while (node !== $$$Immutable$static$$nil) {
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

    function $$Immutable$Sorted$$key_set(node, sort, hash, new_node) {
      if (node === $$$Immutable$static$$nil) {
        return new_node;

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(hash, node.hash);
        if (order === 0) {
          return node.modify(new_node);

        } else if (order < 0) {
          var child = $$Immutable$Sorted$$key_set(left, sort, hash, new_node);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Immutable$Sorted$$key_set(right, sort, hash, new_node);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Immutable$Sorted$$key_modify(node, sort, hash, key, f) {
      if (node === $$$Immutable$static$$nil) {
        throw new Error("Key " + key + " not found");

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(hash, node.hash);
        if (order === 0) {
          // TODO what if `f` suspends?
          return node.modify({ key: key, hash: hash, value: f(node.value) });

        } else if (order < 0) {
          var child = $$Immutable$Sorted$$key_modify(left, sort, hash, key, f);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Immutable$Sorted$$key_modify(right, sort, hash, key, f);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Immutable$Sorted$$key_remove(node, sort, hash) {
      if (node === $$$Immutable$static$$nil) {
        return node;

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(hash, node.hash);
        if (order === 0) {
          return $$AVL$$concat(left, right);

        } else if (order < 0) {
          var child = $$Immutable$Sorted$$key_remove(left, sort, hash);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Immutable$Sorted$$key_remove(right, sort, hash);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Immutable$Sorted$$sorted_isEmpty() {
      return this.root === $$$Immutable$static$$nil;
    }

    function $$Immutable$Sorted$$sorted_has(key) {
      return $$Immutable$Sorted$$key_get(this.root, this.sort, this.hash_fn(key)) !== $$$Immutable$static$$nil;
    }

    function $$Immutable$Sorted$$sorted_remove(f) {
      return function (key) {
        var root = this.root;
        var sort = this.sort;
        var hash_fn = this.hash_fn;
        var node = $$Immutable$Sorted$$key_remove(root, sort, hash_fn(key));
        if (node === root) {
          return this;
        } else {
          // TODO is this slower than using the constructor directly ?
          return new f(node, sort, hash_fn);
        }
      };
    }

    function $$Immutable$Sorted$$sorted_merge(other) {
      return $$Immutable$iter$$foldl($$Immutable$iter$$iter_object(other), this, function (self, _array) {
        return $$Immutable$util$$destructure_pair(_array, function (key, value) {
          return self.set(key, value);
        });
      });
    }

    function $$Immutable$Sorted$$stack_size() {
      return this.len;
    }

    function $$Immutable$Sorted$$stack_concat(right) {
      return $$Immutable$iter$$foldl(right, this, function (self, x) {
        return self.push(x);
      });
    }


    function $$Immutable$ImmutableDict$$KeyNode(left, right, hash, key, value) {
      this.left  = left;
      this.right = right;
      this.hash  = hash;
      this.key   = key;
      this.value = value;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$Immutable$ImmutableDict$$KeyNode.prototype.copy = function (left, right) {
      return new $$Immutable$ImmutableDict$$KeyNode(left, right, this.hash, this.key, this.value);
    };

    $$Immutable$ImmutableDict$$KeyNode.prototype.modify = function (info) {
      var hash  = info.hash;
      var key   = info.key;
      var value = info.value;
      // We don't use equal, for increased speed
      if (this.hash === hash && this.key === key && this.value === value) {
        return this;
      } else {
        return new $$Immutable$ImmutableDict$$KeyNode(this.left, this.right, hash, key, value);
      }
    };


    function $$Immutable$ImmutableDict$$ImmutableDict(root, sort, hash_fn) {
      this.root = root;
      this.sort = sort;
      this.hash_fn = hash_fn;
      this.hash = null;
    }

    $$Immutable$ImmutableDict$$ImmutableDict.prototype = Object.create($$Base$$ImmutableBase);

    $$Immutable$ImmutableDict$$ImmutableDict.prototype[$$$Immutable$static$$tag_toJS] = $$Immutable$toJS$$toJS_object;
    $$Immutable$ImmutableDict$$ImmutableDict.prototype.isEmpty = $$Immutable$Sorted$$sorted_isEmpty;
    $$Immutable$ImmutableDict$$ImmutableDict.prototype.has = $$Immutable$Sorted$$sorted_has;
    $$Immutable$ImmutableDict$$ImmutableDict.prototype.remove = $$Immutable$Sorted$$sorted_remove($$Immutable$ImmutableDict$$ImmutableDict);
    $$Immutable$ImmutableDict$$ImmutableDict.prototype.merge = $$Immutable$Sorted$$sorted_merge;

    $$Immutable$ImmutableDict$$ImmutableDict.prototype[$$$Immutable$static$$tag_iter] = function () {
      return $$Immutable$iter$$map_iter($$AVL$$iter_tree(this.root), function (node) {
        return $$Immutable$ImmutableTuple$$unsafe_Tuple([node.key, node.value]);
      });
    };

    $$Immutable$ImmutableDict$$ImmutableDict.prototype[$$$Immutable$static$$tag_hash] = function (x) {
      if (x.hash === null) {
        // We don't use equal, for increased speed
        if ($$Immutable$ImmutableDict$$isDict(x) && !$$Immutable$ImmutableDict$$isSortedDict(x)) {
          x.hash = "(Dict" + $$hash$$hash_dict(x, "  ") + ")";
        } else {
          x.hash = "(SortedDict " + $$hash$$hash(x.sort) + $$hash$$hash_dict(x, "  ") + ")";
        }
      }

      return x.hash;
    };

    $$$Immutable$static$$fromJSON_registry["Dict"] = function (x) {
      return $$Immutable$ImmutableDict$$Dict($$Immutable$toJSON$$fromJSON_object(x));
    };

    $$Immutable$ImmutableDict$$ImmutableDict.prototype[$$$Immutable$static$$tag_toJSON] = function (x) {
      if ($$Immutable$ImmutableDict$$isDict(x) && !$$Immutable$ImmutableDict$$isSortedDict(x)) {
        return $$Immutable$toJSON$$toJSON_object("Dict", x);
      } else {
        throw new Error("Cannot convert SortedDict to JSON");
      }
    };

    $$Immutable$ImmutableDict$$ImmutableDict.prototype.removeAll = function () {
      return new $$Immutable$ImmutableDict$$ImmutableDict($$$Immutable$static$$nil, this.sort, this.hash_fn);
    };

    $$Immutable$ImmutableDict$$ImmutableDict.prototype.get = function (key, def) {
      var node = $$Immutable$Sorted$$key_get(this.root, this.sort, this.hash_fn(key));
      if (node === $$$Immutable$static$$nil) {
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
    $$Immutable$ImmutableDict$$ImmutableDict.prototype.set = function (key, value) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var hash = hash_fn(key);
      var node = $$Immutable$Sorted$$key_set(root, sort, hash, new $$Immutable$ImmutableDict$$KeyNode($$$Immutable$static$$nil, $$$Immutable$static$$nil, hash, key, value));
      if (node === root) {
        return this;
      } else {
        return new $$Immutable$ImmutableDict$$ImmutableDict(node, sort, hash_fn);
      }
    };

    $$Immutable$ImmutableDict$$ImmutableDict.prototype.modify = function (key, f) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var node = $$Immutable$Sorted$$key_modify(root, sort, hash_fn(key), key, f);
      if (node === root) {
        return this;
      } else {
        return new $$Immutable$ImmutableDict$$ImmutableDict(node, sort, hash_fn);
      }
    };


    function $$Immutable$ImmutableDict$$isDict(x) {
      return x instanceof $$Immutable$ImmutableDict$$ImmutableDict;
    }

    function $$Immutable$ImmutableDict$$isSortedDict(x) {
      return $$Immutable$ImmutableDict$$isDict(x) && x.hash_fn === $$Immutable$util$$identity;
    }

    function $$Immutable$ImmutableDict$$SortedDict(sort, obj) {
      if (arguments.length === 1) {
        return new $$Immutable$ImmutableDict$$ImmutableDict($$$Immutable$static$$nil, sort, $$Immutable$util$$identity);
      } else {
        // We don't use equal, for increased speed
        if ($$Immutable$ImmutableDict$$isSortedDict(obj) && obj.sort === sort) {
          return obj;
        } else {
          return new $$Immutable$ImmutableDict$$ImmutableDict($$$Immutable$static$$nil, sort, $$Immutable$util$$identity).merge(obj);
        }
      }
    }

    function $$Immutable$ImmutableDict$$Dict(obj) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableDict$$ImmutableDict($$$Immutable$static$$nil, $$Immutable$Sorted$$simpleSort, $$hash$$hash);
      } else {
        if ($$Immutable$ImmutableDict$$isDict(obj) && !$$Immutable$ImmutableDict$$isSortedDict(obj)) {
          return obj;
        } else {
          return new $$Immutable$ImmutableDict$$ImmutableDict($$$Immutable$static$$nil, $$Immutable$Sorted$$simpleSort, $$hash$$hash).merge(obj);
        }
      }
    }
    function $$Immutable$toJS$$fromJS(x) {
      if (Array.isArray(x)) {
        var out = $$$Immutable$ImmutableList$$List();

        for (var i = 0, l = x.length; i < l; ++i) {
          out = out.push($$Immutable$toJS$$fromJS(x[i]));
        }

        return out;

      } else if ($$Immutable$util$$isJSLiteral(x)) {
        var out = $$Immutable$ImmutableDict$$Dict();

        // TODO is using Object.keys correct ?
        Object.keys(x).forEach(function (key) {
                        // TODO unit test for this
          out = out.set($$Immutable$toJS$$fromJS(key), $$Immutable$toJS$$fromJS(x[key]));
        });

        return out;

      } else {
        return x;
      }
    }

    function $$Immutable$toJS$$toJS(x) {
      if ($$Immutable$util$$isObject(x)) {
        var fn = x[$$$Immutable$static$$tag_toJS];
        if (fn != null) {
          return fn(x);

        } else if (Array.isArray(x)) {
          return x.map($$Immutable$toJS$$toJS);

        } else if ($$Immutable$util$$isJSLiteral(x)) {
          var out = {};

          // TODO is using Object.keys correct ?
          Object.keys(x).forEach(function (key) {
                // TODO unit test for this
            out[$$Immutable$toJS$$toJS(key)] = $$Immutable$toJS$$toJS(x[key]);
          });

          return out;

        } else {
          return x;
        }
      } else {
        return x;
      }
    }

    function $$Immutable$toJS$$toJS_object(x) {
      var o = {};

      $$Immutable$iter$$each(x, function (_array) {
        $$Immutable$util$$destructure_pair(_array, function (key, value) {
          // Tags are currently implemented as strings
          // TODO use isString test ?
          if (typeof key !== "string") {
            throw new Error("Cannot convert to JavaScript: expected key to be string or Tag but got " + key);
          }

          o[key] = $$Immutable$toJS$$toJS(value);
        });
      });

      return o;
    }

    function $$Immutable$toJS$$toJS_array(x) {
      var a = [];

      $$Immutable$iter$$each(x, function (value) {
        a.push($$Immutable$toJS$$toJS(value));
      });

      return a;
    }
    function $$Immutable$ImmutableTuple$$ImmutableTuple(values) {
      this.values = values;
      this.hash   = null;
    }

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype = Object.create($$Base$$ImmutableBase);

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype[$$$Immutable$static$$tag_hash] = $$hash$$hash_array("Tuple");
    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype[$$$Immutable$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;

    $$$Immutable$static$$fromJSON_registry["Tuple"] = function (x) {
      return $$Immutable$ImmutableTuple$$Tuple($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype[$$$Immutable$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_array("Tuple", x);
    };

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype[$$$Immutable$static$$tag_iter] = function () {
      return $$Immutable$iter$$toIterator(this.values);
    };

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype.size = function () {
      return this.values.length;
    };

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype.get = function (index) {
      var len = this.size();

      if ($$Ordered$$nth_has(index, len)) {
        return this.values[index];
      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype.modify = function (index, f) {
      var len = this.size();

      if ($$Ordered$$nth_has(index, len)) {
        var values = this.values;
        var array  = $$Array$$modify(values, index, f);
        if (array === values) {
          return this;
        } else {
          return new $$Immutable$ImmutableTuple$$ImmutableTuple(array);
        }

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    // TODO a bit of code duplication
    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype.set = function (index, value) {
      return this.modify(index, function () {
        return value;
      });
    };

    function $$Immutable$ImmutableTuple$$isTuple(x) {
      return x instanceof $$Immutable$ImmutableTuple$$ImmutableTuple;
    }

    function $$Immutable$ImmutableTuple$$unsafe_Tuple(array) {
      return new $$Immutable$ImmutableTuple$$ImmutableTuple(array);
    }

    function $$Immutable$ImmutableTuple$$Tuple(array) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableTuple$$ImmutableTuple([]);

      } else {
        if ($$Immutable$ImmutableTuple$$isTuple(array)) {
          return array;

        } else {
          var values = [];

          // We can't use toArray, because `array` might be mutated
          $$Immutable$iter$$each(array, function (x) {
            values.push(x);
          });

          return new $$Immutable$ImmutableTuple$$ImmutableTuple(values);
        }
      }
    }
    function $$Immutable$util$$isNaN(x) {
      return x !== x;
    }

    function $$Immutable$util$$isFinite(x) {
      return typeof x === "number" &&
             x !== Infinity &&
             x !== -Infinity &&
             !$$Immutable$util$$isNaN(x);
    }

    function $$Immutable$util$$isObject(x) {
      return Object(x) === x;
    }

    function $$Immutable$util$$isJSLiteral(x) {
      // TODO this won't work cross-realm
      return $$Immutable$util$$isObject(x) && Object.getPrototypeOf(x) === Object.prototype;
    }

    function $$Immutable$util$$repeat(s, i) {
      return new Array(i + 1).join(s);
    }

    function $$Immutable$util$$pad_right(input, i, s) {
      var right = Math.max(0, i - input.length);
      return input + $$Immutable$util$$repeat(s, right);
    }

    function $$Immutable$util$$identity(x) {
      return x;
    }

    function $$Immutable$util$$plural(i, s) {
      if (i === 1) {
        return s;
      } else {
        return s + "s";
      }
    }

    function $$Immutable$util$$destructure_pair(x, f) {
      if (Array.isArray(x)) {
        if (x.length === 2) {
          return f(x[0], x[1]);
        } else {
          throw new Error("Expected array with 2 elements but got " + x.length + " " + $$Immutable$util$$plural(x.length, "element"));
        }

      } else if ($$Immutable$ImmutableTuple$$isTuple(x)) {
        if (x.size() === 2) {
          return f(x.get(0), x.get(1));
        } else {
          // TODO code duplication
          throw new Error("Expected Tuple with 2 elements but got " + x.size() + " " + $$Immutable$util$$plural(x.size(), "element"));
        }

      } else {
        throw new Error("Expected array or Tuple but got: " + x);
      }
    }


    function $$Immutable$ImmutableSet$$SetNode(left, right, hash, key) {
      this.left  = left;
      this.right = right;
      this.hash  = hash;
      this.key   = key;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$Immutable$ImmutableSet$$SetNode.prototype.copy = function (left, right) {
      return new $$Immutable$ImmutableSet$$SetNode(left, right, this.hash, this.key);
    };

    $$Immutable$ImmutableSet$$SetNode.prototype.modify = function (info) {
      var hash = info.hash;
      var key  = info.key;
      // We don't use equal, for increased speed
      if (this.hash === hash && this.key === key) {
        return this;
      } else {
        return new $$Immutable$ImmutableSet$$SetNode(this.left, this.right, hash, key);
      }
    };


    function $$Immutable$ImmutableSet$$ImmutableSet(root, sort, hash_fn) {
      this.root = root;
      this.sort = sort;
      this.hash_fn = hash_fn;
      this.hash = null;
    }

    $$Immutable$ImmutableSet$$ImmutableSet.prototype = Object.create($$Base$$ImmutableBase);

    $$Immutable$ImmutableSet$$ImmutableSet.prototype[$$$Immutable$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;
    $$Immutable$ImmutableSet$$ImmutableSet.prototype.isEmpty = $$Immutable$Sorted$$sorted_isEmpty;
    $$Immutable$ImmutableSet$$ImmutableSet.prototype.has = $$Immutable$Sorted$$sorted_has;
    $$Immutable$ImmutableSet$$ImmutableSet.prototype.remove = $$Immutable$Sorted$$sorted_remove($$Immutable$ImmutableSet$$ImmutableSet);

    $$$Immutable$static$$fromJSON_registry["Set"] = function (x) {
      return $$Immutable$ImmutableSet$$Set($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype[$$$Immutable$static$$tag_iter] = function () {
      return $$Immutable$iter$$map_iter($$AVL$$iter_tree(this.root), function (node) {
        return node.key;
      });
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype[$$$Immutable$static$$tag_toJSON] = function (x) {
      if ($$Immutable$ImmutableSet$$isSet(x) && !$$Immutable$ImmutableSet$$isSortedSet(x)) {
        return $$Immutable$toJSON$$toJSON_array("Set", x);
      } else {
        throw new Error("Cannot convert SortedSet to JSON");
      }
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype[$$$Immutable$static$$tag_hash] = function (x) {
      if (x.hash === null) {
        var a = $$Immutable$iter$$map(x, function (value) {
          return $$hash$$hash(value);
        });

        var spaces = "  ";

        if ($$Immutable$ImmutableSet$$isSet(x) && !$$Immutable$ImmutableSet$$isSortedSet(x)) {
          x.hash = "(Set" + $$hash$$join_lines(a, spaces) + ")";
        } else {
          x.hash = "(SortedSet " + $$hash$$hash(x.sort) + $$hash$$join_lines(a, spaces) + ")";
        }
      }

      return x.hash;
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype.removeAll = function () {
      return new $$Immutable$ImmutableSet$$ImmutableSet($$$Immutable$static$$nil, this.sort, this.hash_fn);
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype.add = function (key) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var hash = hash_fn(key);
      var node = $$Immutable$Sorted$$key_set(root, sort, hash, new $$Immutable$ImmutableSet$$SetNode($$$Immutable$static$$nil, $$$Immutable$static$$nil, hash, key));
      if (node === root) {
        return this;
      } else {
        return new $$Immutable$ImmutableSet$$ImmutableSet(node, sort, hash_fn);
      }
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype.union = function (other) {
      return $$Immutable$iter$$foldl(other, this, function (self, value) {
        return self.add(value);
      });
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype.intersect = function (other) {
      var self = this;

      if (self.isEmpty()) {
        return self;

      } else {
        var out = self.removeAll();

        return $$Immutable$iter$$foldl(other, out, function (out, value) {
          if (self.has(value)) {
            return out.add(value);
          } else {
            return out;
          }
        });
      }
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype.disjoint = function (other) {
      var self = this;

      return $$Immutable$iter$$foldl(other, self, function (out, value) {
        if (self.has(value)) {
          return out.remove(value);
        } else {
          return out.add(value);
        }
      });
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype.subtract = function (other) {
      if (this.isEmpty()) {
        return this;

      } else {
        return $$Immutable$iter$$foldl(other, this, function (self, value) {
          return self.remove(value);
        });
      }
    };


    function $$Immutable$ImmutableSet$$isSet(x) {
      return x instanceof $$Immutable$ImmutableSet$$ImmutableSet;
    }

    function $$Immutable$ImmutableSet$$isSortedSet(x) {
      return $$Immutable$ImmutableSet$$isSet(x) && x.hash_fn === $$Immutable$util$$identity;
    }

    function $$Immutable$ImmutableSet$$SortedSet(sort, array) {
      if (arguments.length === 1) {
        return new $$Immutable$ImmutableSet$$ImmutableSet($$$Immutable$static$$nil, sort, $$Immutable$util$$identity);
      } else {
        // We don't use equal, for increased speed
        if ($$Immutable$ImmutableSet$$isSortedSet(array) && array.sort === sort) {
          return array;
        } else {
          return new $$Immutable$ImmutableSet$$ImmutableSet($$$Immutable$static$$nil, sort, $$Immutable$util$$identity).union(array);
        }
      }
    }

    function $$Immutable$ImmutableSet$$Set(array) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableSet$$ImmutableSet($$$Immutable$static$$nil, $$Immutable$Sorted$$simpleSort, $$hash$$hash);
      } else {
        if ($$Immutable$ImmutableSet$$isSet(array) && !$$Immutable$ImmutableSet$$isSortedSet(array)) {
          return array;
        } else {
          return new $$Immutable$ImmutableSet$$ImmutableSet($$$Immutable$static$$nil, $$Immutable$Sorted$$simpleSort, $$hash$$hash).union(array);
        }
      }
    }
    function $$Immutable$ImmutableQueue$$ImmutableQueue(left, right, len) {
      this.left  = left;
      this.right = right;
      this.len   = len;
      this.hash  = null;
    }

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype = Object.create($$Base$$ImmutableBase);

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype[$$$Immutable$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;
    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype[$$$Immutable$static$$tag_hash] = $$hash$$hash_array("Queue");
    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.size = $$Immutable$Sorted$$stack_size;
    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.concat = $$Immutable$Sorted$$stack_concat;

    $$$Immutable$static$$fromJSON_registry["Queue"] = function (x) {
      return $$Immutable$ImmutableQueue$$Queue($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype[$$$Immutable$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_array("Queue", x);
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.isEmpty = function () {
      return this.left === $$$Immutable$static$$nil && this.right === $$$Immutable$static$$nil;
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.removeAll = function () {
      return new $$Immutable$ImmutableQueue$$ImmutableQueue($$$Immutable$static$$nil, $$$Immutable$static$$nil, 0);
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype[$$$Immutable$static$$tag_iter] = function () {
      return $$Immutable$iter$$concat_iter($$Cons$$iter_cons(this.left), $$Immutable$iter$$reverse_iter($$Cons$$iter_cons(this.right)));
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.peek = function (def) {
      var left  = this.left;
      var right = this.right;
      if (left === $$$Immutable$static$$nil) {
        if (right === $$$Immutable$static$$nil) {
          if (arguments.length === 1) {
            return def;
          } else {
            throw new Error("Cannot peek from an empty queue");
          }
        } else {
          // TODO unit test for this
          return right.car;
        }
      } else {
        return left.car;
      }
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.push = function (value) {
      var left  = this.left;
      var right = this.right;

      // Pushing into a queue with 0 values in it
      if (left === $$$Immutable$static$$nil && right === $$$Immutable$static$$nil) {
        return new $$Immutable$ImmutableQueue$$ImmutableQueue(new $$Cons$$Cons(value, left), right, this.len + 1);

      // Pushing into a queue with 1+ values in it
      } else {
        return new $$Immutable$ImmutableQueue$$ImmutableQueue(left, new $$Cons$$Cons(value, right), this.len + 1);
      }
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.pop = function () {
      var left  = this.left;
      var right = this.right;

      if (left === $$$Immutable$static$$nil) {
        if (right === $$$Immutable$static$$nil) {
          throw new Error("Cannot pop from an empty queue");

        } else {
          // TODO a little gross
          // TODO replace with foldl ?
          $$Cons$$each_cons(right, function (x) {
            left = new $$Cons$$Cons(x, left);
          });

          right = $$$Immutable$static$$nil;
        }
      }

      return new $$Immutable$ImmutableQueue$$ImmutableQueue(left.cdr, right, this.len - 1);
    };


    function $$Immutable$ImmutableQueue$$isQueue(x) {
      return x instanceof $$Immutable$ImmutableQueue$$ImmutableQueue;
    }

    function $$Immutable$ImmutableQueue$$Queue(x) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableQueue$$ImmutableQueue($$$Immutable$static$$nil, $$$Immutable$static$$nil, 0);
      } else {
        if (x instanceof $$Immutable$ImmutableQueue$$ImmutableQueue) {
          return x;
        } else {
          return new $$Immutable$ImmutableQueue$$ImmutableQueue($$$Immutable$static$$nil, $$$Immutable$static$$nil, 0).concat(x);
        }
      }
    }
    function $$Immutable$ImmutableStack$$ImmutableStack(root, len) {
      this.root = root;
      this.len  = len;
      this.hash = null;
    }

    $$Immutable$ImmutableStack$$ImmutableStack.prototype = Object.create($$Base$$ImmutableBase);

    $$Immutable$ImmutableStack$$ImmutableStack.prototype[$$$Immutable$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;
    $$Immutable$ImmutableStack$$ImmutableStack.prototype[$$$Immutable$static$$tag_hash] = $$hash$$hash_array("Stack");
    $$Immutable$ImmutableStack$$ImmutableStack.prototype.isEmpty = $$Immutable$Sorted$$sorted_isEmpty;
    $$Immutable$ImmutableStack$$ImmutableStack.prototype.size = $$Immutable$Sorted$$stack_size;
    $$Immutable$ImmutableStack$$ImmutableStack.prototype.concat = $$Immutable$Sorted$$stack_concat;

    $$$Immutable$static$$fromJSON_registry["Stack"] = function (x) {
      return $$Immutable$ImmutableStack$$Stack($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$Immutable$ImmutableStack$$ImmutableStack.prototype[$$$Immutable$static$$tag_iter] = function () {
      return $$Immutable$iter$$reverse_iter($$Cons$$iter_cons(this.root));
    };

    $$Immutable$ImmutableStack$$ImmutableStack.prototype[$$$Immutable$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_array("Stack", x);
    };

    $$Immutable$ImmutableStack$$ImmutableStack.prototype.removeAll = function () {
      return new $$Immutable$ImmutableStack$$ImmutableStack($$$Immutable$static$$nil, 0);
    };

    $$Immutable$ImmutableStack$$ImmutableStack.prototype.peek = function (def) {
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

    $$Immutable$ImmutableStack$$ImmutableStack.prototype.push = function (value) {
      return new $$Immutable$ImmutableStack$$ImmutableStack(new $$Cons$$Cons(value, this.root), this.len + 1);
    };

    $$Immutable$ImmutableStack$$ImmutableStack.prototype.pop = function () {
      if (this.isEmpty()) {
        throw new Error("Cannot pop from an empty stack");
      } else {
        return new $$Immutable$ImmutableStack$$ImmutableStack(this.root.cdr, this.len - 1);
      }
    };


    function $$Immutable$ImmutableStack$$isStack(x) {
      return x instanceof $$Immutable$ImmutableStack$$ImmutableStack;
    }

    function $$Immutable$ImmutableStack$$Stack(x) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableStack$$ImmutableStack($$$Immutable$static$$nil, 0);
      } else {
        if (x instanceof $$Immutable$ImmutableStack$$ImmutableStack) {
          return x;
        } else {
          return new $$Immutable$ImmutableStack$$ImmutableStack($$$Immutable$static$$nil, 0).concat(x);
        }
      }
    }

    function $$Immutable$ImmutableRecord$$checkKey(key) {
      // Tags are currently implemented as strings
      if (typeof key !== "string") {
        throw new Error("Expected key to be a string or Tag but got " + key);
      }
    }

    function $$Immutable$ImmutableRecord$$ImmutableRecord(keys, values) {
      this.keys   = keys;
      this.values = values;
      this.hash   = null;
    }

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype = Object.create($$Base$$ImmutableBase);

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype.update = $$Immutable$Sorted$$sorted_merge;
    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype[$$$Immutable$static$$tag_toJS] = $$Immutable$toJS$$toJS_object;

    $$$Immutable$static$$fromJSON_registry["Record"] = function (x) {
      return $$Immutable$ImmutableRecord$$Record($$Immutable$toJSON$$fromJSON_object(x));
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype[$$$Immutable$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_object("Record", x);
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype[$$$Immutable$static$$tag_hash] = function (x) {
      if (x.hash === null) {
        x.hash = "(Record" + $$hash$$hash_dict(x, "  ") + ")";
      }

      return x.hash;
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype[$$$Immutable$static$$tag_iter] = function () {
      var keys   = this.keys;
      var values = this.values;

      // TODO a little gross
      return $$Immutable$iter$$toIterator($$Immutable$iter$$map($$Immutable$iter$$iter_object(keys), function (_array) {
        // TODO should this use destructure_pair ?
        return $$Immutable$util$$destructure_pair(_array, function (s, index) {
          return $$Immutable$ImmutableTuple$$unsafe_Tuple([s, values[index]]);
        });
      }));
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype.get = function (key) {
      $$Immutable$ImmutableRecord$$checkKey(key);

      var index = this.keys[key];
      if (index == null) {
        throw new Error("Key " + key + " not found");

      } else {
        return this.values[index];
      }
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype.set = function (key, value) {
      return this.modify(key, function () {
        return value;
      });
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype.modify = function (key, f) {
      $$Immutable$ImmutableRecord$$checkKey(key);

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
          return new $$Immutable$ImmutableRecord$$ImmutableRecord(keys, array);
        }
      }
    };


    function $$Immutable$ImmutableRecord$$isRecord(x) {
      return x instanceof $$Immutable$ImmutableRecord$$ImmutableRecord;
    }

    function $$Immutable$ImmutableRecord$$Record(obj) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableRecord$$ImmutableRecord({}, []);

      } else {
        if ($$Immutable$ImmutableRecord$$isRecord(obj)) {
          return obj;

        } else {
          var keys   = {};
          var values = [];

          var mapped = $$Immutable$iter$$map($$Immutable$iter$$iter_object(obj), function (_array) {
            return $$Immutable$util$$destructure_pair(_array, function (key, value) {
              $$Immutable$ImmutableRecord$$checkKey(key);
              return [key, value];
            });
          });

          // TODO "sort" function in "iter.js" ?
          // TODO can this be made any faster/more efficient ?
          var sorted = $$Immutable$iter$$toArray(mapped).sort(function (x, y) {
            return $$Immutable$Sorted$$simpleSort(x[0], y[0]);
          });

          $$Immutable$iter$$each(sorted, function (_array) {
            var key   = _array[0];
            var value = _array[1];

            var index = keys[key];
            if (index == null) {
              keys[key] = values.push(value) - 1;
            } else {
              values[index] = value;
            }
          });

          return new $$Immutable$ImmutableRecord$$ImmutableRecord(keys, values);
        }
      }
    }

    var $$Immutable$MutableRef$$ref_id = 0;

    function $$Immutable$MutableRef$$MutableRef(value, onchange) {
      this._id = ++$$Immutable$MutableRef$$ref_id;
      this._value = value;
      this._onchange = onchange;
    }

    $$Immutable$MutableRef$$MutableRef.prototype = Object.create($$Base$$MutableBase);

    $$Immutable$MutableRef$$MutableRef.prototype[$$$Immutable$static$$tag_hash] = function (x) {
      return "(Ref " + $$hash$$hash(x._id) + ")";
    };

    $$Immutable$MutableRef$$MutableRef.prototype.get = function () {
      return this._value;
    };

    $$Immutable$MutableRef$$MutableRef.prototype.set = function (value) {
      var old      = this._value;
      var onchange = this._onchange;
      if (onchange != null) {
        this._value = onchange(old, value);
      } else {
        this._value = value;
      }
    };

    $$Immutable$MutableRef$$MutableRef.prototype.modify = function (f) {
      this.set(f(this.get()));
    };


    function $$Immutable$MutableRef$$deref(x) {
      if ($$Immutable$MutableRef$$isRef(x)) {
        return x.get();
      } else {
        return x;
      }
    }

    function $$Immutable$MutableRef$$isRef(x) {
      return x instanceof $$Immutable$MutableRef$$MutableRef;
    }

    function $$Immutable$MutableRef$$Ref(value, onchange) {
      if (arguments.length < 1 || arguments.length > 2) {
        throw new Error("Expected 1 to 2 arguments but got " + arguments.length);
      }

      return new $$Immutable$MutableRef$$MutableRef(value, onchange);
    }
    function $$$Immutable$$isImmutable(x) {
      if ($$Immutable$util$$isObject(x)) {
        return Object.isFrozen(x) ||
               $$Immutable$ImmutableDict$$isDict(x)  ||
               $$Immutable$ImmutableSet$$isSet(x)   ||
               $$$Immutable$ImmutableList$$isList(x)  ||
               $$Immutable$ImmutableTuple$$isTuple(x) ||
               $$Immutable$ImmutableQueue$$isQueue(x) ||
               $$Immutable$ImmutableStack$$isStack(x) ||
               $$Immutable$ImmutableRecord$$isRecord(x);
      // TODO just return true? are there any mutable value types?
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
    function $$assert$$assert(x) {
      if (arguments.length !== 1) {
        throw new Error("Invalid argument length");
      }
      if (!x) {
        throw new Error("Failed: " + x);
      }
    }
    var $$src$Test$Test$$time_start = Date.now();


    // TODO move this into a different module
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function $$src$Test$Test$$randomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function $$src$Test$Test$$otherSort(x, y) {
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
    function $$src$Test$Test$$shuffle(array) {
      var i = array.length;

      while (i) {
        var j = $$src$Test$Test$$randomInt(0, i);
        --i;
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }


    var $$src$Test$Test$$TESTS_SUCCEEDED = 0;
    var $$src$Test$Test$$TESTS_FAILED = 0;
    var $$src$Test$Test$$CONTEXT = null;

    function $$src$Test$Test$$context(s, f) {
      var old_context = $$src$Test$Test$$CONTEXT;
      $$src$Test$Test$$CONTEXT = s;
      try {
        f();
      } finally {
        $$src$Test$Test$$CONTEXT = old_context;
      }
    }

    function $$src$Test$Test$$test(s, f) {
      try {
        f();
        ++$$src$Test$Test$$TESTS_SUCCEEDED;
      } catch (e) {
        ++$$src$Test$Test$$TESTS_FAILED;
        console.log("");
        console.log("*** " + ($$src$Test$Test$$CONTEXT ? $$src$Test$Test$$CONTEXT + "." : "") + s + " FAILED");
        if (e.stack) {
          console.log(e.stack);
        } else {
          console.log(e);
        }
        console.log("");
      }
    }

    function $$src$Test$Test$$assert_raises(f, message) {
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

    function $$src$Test$Test$$isObject(x) {
      return Object(x) === x;
    }

    var $$src$Test$Test$$hasOwnProperty = {}.hasOwnProperty;

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

    function $$src$Test$Test$$deepEqual(x, y) {
      if (x === y) {
        return true;

      } else if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length === y.length) {
          for (var i = 0, l = x.length; i < l; ++i) {
            if (!$$src$Test$Test$$deepEqual(x[i], y[i])) {
              return false;
            }
          }
          return true;
        } else {
          return false;
        }

      } else if ($$src$Test$Test$$isObject(x) && $$src$Test$Test$$isObject(y)) {
        if (Object.getPrototypeOf(x) === Object.getPrototypeOf(y)) {
          var x_keys = Object.getOwnPropertyNames(x);
          var y_keys = Object.getOwnPropertyNames(y);

          for (var i = 0, l = x_keys.length; i < l; ++i) {
            var s = x_keys[i];
            if ($$src$Test$Test$$hasOwnProperty.call(y, s)) {
              if (!$$src$Test$Test$$deepEqual(x[s], y[s])) {
                return false;
              }
            } else {
              return false;
            }
          }

          for (var i = 0, l = y_keys.length; i < l; ++i) {
            var s = y_keys[i];
            if (!$$src$Test$Test$$hasOwnProperty.call(x, s)) {
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

    function $$src$Test$Test$$test_each(constructor, input) {
      var a = [];
      $$Immutable$iter$$each(constructor(input), function (x) {
        a.push(x);
      });
      $$assert$$assert($$src$Test$Test$$deepEqual(a, input));
    }

    function $$src$Test$Test$$test_each_dict(input, expected) {
      var a = [];
      $$Immutable$iter$$each(input, function (x) {
        $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
        a.push(x.values);
      });
      $$assert$$assert($$src$Test$Test$$deepEqual(a, expected));
    }


    function $$src$Test$Test$$verify_json_equal(x) {
      var y = $$Immutable$toJSON$$toJSON(x);
      $$assert$$assert(y !== x);

      var z = $$Immutable$toJSON$$fromJSON(y);
      $$assert$$assert(z !== y);

      $$assert$$assert($$Immutable$equal$$equal(x, z));
    }


    function $$src$Test$Test$$verify_json(x, expected) {
      var y = $$Immutable$toJSON$$toJSON(x);
      $$assert$$assert(y !== x);

      var z = $$Immutable$toJSON$$fromJSON(y);
      $$assert$$assert(z !== y);

      $$assert$$assert($$Immutable$equal$$equal(x, z));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(x), expected));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(z), expected));
    }


    // TODO test that this works correctly
    function $$src$Test$Test$$verify_tree(tree) {
      var sort = tree.sort;
      var hash_fn = tree.hash_fn;

      function loop(node, lt, gt) {
        if (node !== $$$Immutable$static$$nil) {
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
    }

    function $$src$Test$Test$$verify_dict(tree, obj) {
      $$assert$$assert($$Immutable$ImmutableDict$$isDict(tree));

      $$src$Test$Test$$verify_tree(tree);

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(tree), obj));

      return tree;
    }

    function $$src$Test$Test$$verify_set(tree, array) {
      $$assert$$assert($$Immutable$ImmutableSet$$isSet(tree));

      $$src$Test$Test$$verify_tree(tree);

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(tree), array));

      return tree;
    }

    function $$src$Test$Test$$verify_list1(tree, array, strict) {
      $$assert$$assert($$$Immutable$ImmutableList$$isList(tree));

      function loop(node) {
        if (node !== $$$Immutable$static$$nil) {
          var left  = node.left;
          var right = node.right;

          $$assert$$assert(node.depth === Math.max(left.depth, right.depth) + 1);

          var diff = left.depth - right.depth;
          $$assert$$assert(diff === -1 || diff === 0 || diff === 1);

          $$assert$$assert(node.array.length <= $$$Immutable$ImmutableList$$array_limit);

          if (strict && left !== $$$Immutable$static$$nil) {
            $$assert$$assert(node.array.length + left.array.length > $$$Immutable$ImmutableList$$array_limit);
          }

          if (strict && right !== $$$Immutable$static$$nil) {
            $$assert$$assert(node.array.length + right.array.length > $$$Immutable$ImmutableList$$array_limit);
          }

          $$assert$$assert(node.size === left.size + right.size + node.array.length);
          loop(left);
          loop(right);
        }
      }
      loop(tree.root);

      var count = 0;
      var cons = tree.tail;
      while (cons !== $$$Immutable$static$$nil) {
        ++count;
        cons = cons.cdr;
      }

      $$assert$$assert(count === tree.tail_size);
      $$assert$$assert(tree.tail_size <= $$$Immutable$ImmutableList$$array_limit);

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(tree), array));

      return tree;
    }

    function $$src$Test$Test$$verify_list_loose(tree, array) {
      return $$src$Test$Test$$verify_list1(tree, array, false);
    }

    function $$src$Test$Test$$verify_list(tree, array) {
      return $$src$Test$Test$$verify_list1(tree, array, true);
    }

    function $$src$Test$Test$$verify_tuple(tuple, array) {
      $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(tuple));

      $$assert$$assert($$src$Test$Test$$deepEqual(tuple.values, array));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(tuple), array));

      return tuple;
    }

    function $$src$Test$Test$$verify_queue(queue, array) {
      $$assert$$assert($$Immutable$ImmutableQueue$$isQueue(queue));

      var size = queue.size();
      if (size === 0) {
        $$assert$$assert(queue.left === $$$Immutable$static$$nil);
        $$assert$$assert(queue.right === $$$Immutable$static$$nil);
      } else {
        $$assert$$assert(queue.left !== $$$Immutable$static$$nil || queue.right !== $$$Immutable$static$$nil);
      }

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(queue), array));

      return queue;
    }

    function $$src$Test$Test$$verify_stack(stack, array) {
      $$assert$$assert($$Immutable$ImmutableStack$$isStack(stack));

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(stack), array));

      return stack;
    }

    function $$src$Test$Test$$verify_record(record, obj) {
      $$assert$$assert($$Immutable$ImmutableRecord$$isRecord(record));

      var count = 0;

      for (var _ in record.keys) {
        ++count;
      }

      $$assert$$assert(count === record.values.length);

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(record), obj));

      return record;
    }

    function $$src$Test$Test$$random_int(max) {
      return Math.floor(Math.random() * max);
    }

    function $$src$Test$Test$$random_list(max) {
      var out = [];
      for (var i = 0; i < max; ++i) {
        out.push(i);
      }
      $$src$Test$Test$$shuffle(out);
      return out;
    }


    $$src$Test$Test$$context("Dict", function () {
      var dict_empty = $$Immutable$ImmutableDict$$Dict();
      var dict_foo   = $$Immutable$ImmutableDict$$Dict().set("foo", 1);

      $$src$Test$Test$$test("isDict", function () {
        $$assert$$assert(!$$Immutable$ImmutableDict$$isDict($$Immutable$ImmutableSet$$Set()));

        $$assert$$assert($$Immutable$ImmutableDict$$isDict($$Immutable$ImmutableDict$$Dict()));
        $$assert$$assert($$Immutable$ImmutableDict$$isDict($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort)));

        $$assert$$assert($$Immutable$ImmutableDict$$isSortedDict($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort)));
        $$assert$$assert(!$$Immutable$ImmutableDict$$isSortedDict($$Immutable$ImmutableDict$$Dict()));
      });

      $$src$Test$Test$$test("verify", function () {
        $$src$Test$Test$$verify_dict(dict_empty, {});
        $$src$Test$Test$$verify_dict(dict_foo, { foo: 1 });
      });

      $$src$Test$Test$$test("init", function () {
        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict(null);
        }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, null);
        }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict(), {});
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort), {});

        var x = $$Immutable$ImmutableDict$$Dict({ foo: 1 });
        $$src$Test$Test$$verify_dict(x, { foo: 1 });
        $$assert$$assert($$Immutable$equal$$equal(x, dict_foo));
        $$assert$$assert($$Immutable$equal$$equal(dict_foo, x));

        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict([["foo", 2]]), { foo: 2 });
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict([$$Immutable$ImmutableTuple$$Tuple(["foo", 2])]), { foo: 2 });

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict(Object.create(null));
        }, "Cannot convert object to primitive value");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([$$$Immutable$ImmutableList$$List(["foo", 2])]);
        }, "Expected array or Tuple but got: (List\n  \"foo\"\n  2)");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([{}]);
        }, "Expected array or Tuple but got: [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([[]]);
        }, "Expected array with 2 elements but got 0 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([["foo"]]);
        }, "Expected array with 2 elements but got 1 element");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([["foo", 2, 3]]);
        }, "Expected array with 2 elements but got 3 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([$$Immutable$ImmutableTuple$$Tuple([])]);
        }, "Expected Tuple with 2 elements but got 0 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([$$Immutable$ImmutableTuple$$Tuple(["foo"])]);
        }, "Expected Tuple with 2 elements but got 1 element");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([$$Immutable$ImmutableTuple$$Tuple(["foo", 2, 3])]);
        }, "Expected Tuple with 2 elements but got 3 elements");

        var x = {};
        var mapped = $$Immutable$iter$$map($$Immutable$ImmutableDict$$Dict([[x, 1]]), function (x) {
          $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
          return $$Immutable$iter$$toArray(x);
        });
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(mapped), [[x, 1]]));

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([[Object.preventExtensions({ foo: 1 }), 1]]);
        }, "Cannot use a non-extensible object as a key: [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([[Object.seal({ foo: 1 }), 1]]);
        }, "Cannot use a non-extensible object as a key: [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict([[Object.freeze({ foo: 1 }), 1]]);
        }, "Cannot use a non-extensible object as a key: [object Object]");
      });

      $$src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(dict_empty.isEmpty());
        $$assert$$assert(!dict_foo.isEmpty());
      });

      $$src$Test$Test$$test("has", function () {
        $$assert$$assert(!dict_empty.has("foo"));
        $$assert$$assert(!dict_empty.has("bar"));

        $$assert$$assert(dict_foo.has("foo"));
        $$assert$$assert(!dict_foo.has("bar"));
      });

      $$src$Test$Test$$test("get", function () {
        $$src$Test$Test$$assert_raises(function () {
          dict_empty.get("foo");
        }, "Key foo not found");

        $$assert$$assert(dict_empty.get("foo", 50) === 50);

        $$assert$$assert(dict_foo.get("foo") === 1);
        $$assert$$assert(dict_foo.get("foo", 50) === 1);
      });

      $$src$Test$Test$$test("set", function () {
        var dict_bar = dict_empty.set("bar", 2);
        $$assert$$assert(!dict_empty.has("bar"));
        $$assert$$assert(dict_bar.has("bar"));
        $$assert$$assert(dict_bar.get("bar") === 2);

        var dict_foo2 = dict_foo.set("foo", 3);
        $$assert$$assert(dict_foo.get("foo") === 1);
        $$assert$$assert(dict_foo2.get("foo") === 3);
      });

      $$src$Test$Test$$test("modify", function () {
        var ran = false;

        $$src$Test$Test$$assert_raises(function () {
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

      $$src$Test$Test$$test("remove", function () {
        $$assert$$assert(!dict_empty.has("foo"));

        var dict_empty2 = dict_empty.remove("foo");
        $$assert$$assert(!dict_empty2.has("foo"));

        var dict_foo2 = dict_foo.remove("foo");
        $$assert$$assert(dict_foo.has("foo"));
        $$assert$$assert(!dict_foo2.has("foo"));
      });

      $$src$Test$Test$$test("merge", function () {
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict({ foo: 1 }), { foo: 1 });
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict({ foo: 1 }).merge([]), { foo: 1 });
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict({ foo: 1 }).merge([["bar", 2]]), { foo: 1, bar: 2 });
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict({ foo: 1 }).merge($$Immutable$ImmutableDict$$Dict({ bar: 2 })), { foo: 1, bar: 2 });
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict({ foo: 1 }).merge($$Immutable$ImmutableDict$$Dict({ foo: 2 })), { foo: 2 });
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict({ foo: 1 }).merge($$Immutable$ImmutableDict$$Dict({ foo: 2, bar: 3 })), { foo: 2, bar: 3 });
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict({ foo: 1 }).merge({ bar: 2 }), { foo: 1, bar: 2 });

        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict().merge([["foo", 2]]), { foo: 2 });
        $$src$Test$Test$$verify_dict($$Immutable$ImmutableDict$$Dict().merge([$$Immutable$ImmutableTuple$$Tuple(["foo", 2])]), { foo: 2 });

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict().merge(Object.create(null));
        }, "Cannot convert object to primitive value");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict().merge([$$$Immutable$ImmutableList$$List(["foo", 2])]);
        }, "Expected array or Tuple but got: (List\n  \"foo\"\n  2)");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict().merge([{}]);
        }, "Expected array or Tuple but got: [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict().merge([[]]);
        }, "Expected array with 2 elements but got 0 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict().merge([["foo"]]);
        }, "Expected array with 2 elements but got 1 element");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict().merge([["foo", 2, 3]]);
        }, "Expected array with 2 elements but got 3 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict().merge([$$Immutable$ImmutableTuple$$Tuple([])]);
        }, "Expected Tuple with 2 elements but got 0 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict().merge([$$Immutable$ImmutableTuple$$Tuple(["foo"])]);
        }, "Expected Tuple with 2 elements but got 1 element");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableDict$$Dict().merge([$$Immutable$ImmutableTuple$$Tuple(["foo", 2, 3])]);
        }, "Expected Tuple with 2 elements but got 3 elements");
      });

      $$src$Test$Test$$test("complex keys", function () {
        var o = $$Immutable$ImmutableDict$$Dict();

        var m1 = {};
        var m2 = {};

        var i1 = $$Immutable$ImmutableDict$$Dict();
        var i2 = $$Immutable$ImmutableDict$$Dict();
        var i3 = $$Immutable$ImmutableDict$$Dict({ foo: 10 });

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

      $$src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$Immutable$ImmutableDict$$Dict(dict_foo) === dict_foo);

        var x = $$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, dict_foo);
        $$assert$$assert(x !== dict_foo);
        $$assert$$assert($$Immutable$ImmutableDict$$Dict(x) !== x);
        $$assert$$assert($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, x) === x);

        var x = $$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, dict_foo);
        $$assert$$assert($$Immutable$ImmutableDict$$SortedDict($$src$Test$Test$$otherSort, x) !== x);

        var x = $$Immutable$ImmutableDict$$SortedDict($$src$Test$Test$$otherSort, dict_foo);
        $$assert$$assert($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, x) !== x);

        var x = $$Immutable$ImmutableDict$$SortedDict($$src$Test$Test$$otherSort, dict_foo);
        $$assert$$assert($$Immutable$ImmutableDict$$SortedDict($$src$Test$Test$$otherSort, x) === x);


        $$assert$$assert(dict_empty.remove("foo") === dict_empty);

        $$assert$$assert(dict_foo.set("foo", 1) === dict_foo);
        $$assert$$assert(dict_foo.set("foo", 2) !== dict_foo);
        $$assert$$assert(dict_foo.set("bar", 3) !== dict_foo);
        $$assert$$assert(dict_foo.remove("foo") !== dict_foo);

        var dict1 = $$Immutable$ImmutableDict$$Dict().set($$Immutable$ImmutableDict$$Dict({ foo: 1 }), $$Immutable$ImmutableDict$$Dict({ bar: 2 }));

        $$assert$$assert(dict1.modify($$Immutable$ImmutableDict$$Dict({ foo: 1 }), function () {
          return $$Immutable$ImmutableDict$$Dict({ bar: 2 });
        }) !== dict1);

        $$assert$$assert(dict1.modify($$Immutable$ImmutableDict$$Dict({ foo: 1 }), function () {
          return $$Immutable$ImmutableDict$$Dict({ bar: 3 });
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

      $$src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$Immutable$equal$$equal(dict_empty, dict_foo));
        $$assert$$assert($$Immutable$equal$$equal(dict_empty, dict_empty));
        $$assert$$assert($$Immutable$equal$$equal(dict_foo, dict_foo));
        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableDict$$Dict(), $$Immutable$ImmutableDict$$Dict()));
        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableDict$$Dict({ foo: 1 }), $$Immutable$ImmutableDict$$Dict({ foo: 1 })));
        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableDict$$Dict({ foo: $$Immutable$ImmutableDict$$Dict({ bar: 2 }) }),
                     $$Immutable$ImmutableDict$$Dict({ foo: $$Immutable$ImmutableDict$$Dict({ bar: 2 }) })));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableDict$$Dict({ foo: $$Immutable$ImmutableDict$$Dict({ bar: 2 }) }),
                      $$Immutable$ImmutableDict$$Dict({ foo: $$Immutable$ImmutableDict$$Dict({ bar: 3 }) })));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, { foo: 1 }),
                     $$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, { foo: 1 })));

        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, { foo: 1 }),
                      $$Immutable$ImmutableDict$$Dict({ foo: 1 })));

        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, { foo: 1 }),
                      $$Immutable$ImmutableDict$$SortedDict($$src$Test$Test$$otherSort, { foo: 1 })));
      });

      $$src$Test$Test$$test("toJS", function () {
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(dict_empty), {}));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(dict_foo), { foo: 1 }));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS($$Immutable$ImmutableDict$$Dict({ foo: $$Immutable$ImmutableDict$$Dict({ bar: 2 }) })),
                         { foo: { bar: 2 } }));

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$toJS$$toJS($$Immutable$ImmutableDict$$Dict().set($$Immutable$ImmutableDict$$Dict({ foo: 1 }), 2));
        }, "Cannot convert to JavaScript: expected key to be string or Tag but got (Dict\n  \"foo\" = 1)");
      });

      $$src$Test$Test$$test("toJSON", function () {
        $$src$Test$Test$$verify_json(dict_empty, {});
        $$src$Test$Test$$verify_json(dict_foo, { foo: 1 });
        $$src$Test$Test$$verify_json($$Immutable$ImmutableDict$$Dict({ foo: $$Immutable$ImmutableDict$$Dict({ bar: 2 }) }), { foo: { bar: 2 } });

        $$src$Test$Test$$verify_json_equal($$Immutable$ImmutableDict$$Dict([[$$Immutable$ImmutableDict$$Dict({ foo: 1 }), $$Immutable$ImmutableDict$$Dict({ bar: 2 })]]));

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$toJSON$$toJSON($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, {}));
        }, "Cannot convert SortedDict to JSON");
      });

      $$src$Test$Test$$test("random keys", function () {
        var o = $$Immutable$ImmutableDict$$Dict();
        var js = {};
        $$src$Test$Test$$verify_dict(o, js);

        $$src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.set("foo" + i, 5);
          js["foo" + i] = 5;
          $$src$Test$Test$$verify_dict(o, js);
        });

        $$src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.modify("foo" + i, function (x) {
            return x + 15;
          });
          js["foo" + i] = js["foo" + i] + 15;
          $$src$Test$Test$$verify_dict(o, js);
        });

        $$src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.remove("foo" + i);
          delete js["foo" + i];
          $$src$Test$Test$$verify_dict(o, js);
        });
      });

      $$src$Test$Test$$test("each", function () {
        $$src$Test$Test$$test_each_dict($$Immutable$ImmutableDict$$Dict([]), []);

        var corge = $$Immutable$ImmutableDict$$Dict({ corge: 3 });
        $$src$Test$Test$$test_each_dict($$Immutable$ImmutableDict$$Dict([["foo", 1], ["qux", corge], ["bar", 2]]), [["bar", 2], ["foo", 1], ["qux", corge]]);
      });

      $$src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict() === "(Dict)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort) === "(SortedDict (Mutable 4))");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, { foo: 1 }) === "(SortedDict (Mutable 4)\n  \"foo\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, { foo: 1, bar: 2 }) === "(SortedDict (Mutable 4)\n  \"bar\" = 2\n  \"foo\" = 1)");

        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict([[0, 1]]) === "(Dict\n  0 = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict([[-0, 1]]) === "(Dict\n  0 = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict([[0, 1], [-0, 2]]) === "(Dict\n  0 = 2)");

        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict([[{}, 1]]) === "(Dict\n  (Mutable 6) = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict([[{}, 1]]) === "(Dict\n  (Mutable 7) = 1)");

        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict({ foo: 1 }) === "(Dict\n  \"foo\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict({ foo: 1, bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict({ "foo\nbar\nqux": 1, bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict({ foo: $$Immutable$ImmutableDict$$Dict({ qux: 3 }), bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\" = (Dict\n            \"qux\" = 3))");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict({ "foo\nbar\nqux": $$Immutable$ImmutableDict$$Dict({ qux: 3 }), bar: 2 }) === "(Dict\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = (Dict\n            \"qux\" = 3))");

        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict({ foobarquxcorgenou: 1, bar: 2 }) === "(Dict\n  \"bar\"               = 2\n  \"foobarquxcorgenou\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict({ "foobar\nquxcorgenou": 1, bar: 2 }) === "(Dict\n  \"bar\"         = 2\n  \"foobar\n   quxcorgenou\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict({ "foo\nbar\nqux": 1, "barquxcorgenou": 2 }) === "(Dict\n  \"barquxcorgenou\" = 2\n  \"foo\n   bar\n   qux\"            = 1)");

        $$assert$$assert("" + $$Immutable$ImmutableDict$$Dict([[$$Immutable$ImmutableDict$$Dict({ foo: 1 }), $$Immutable$ImmutableDict$$Dict({ bar: 2 })]]) === "(Dict\n  (Dict\n    \"foo\" = 1) = (Dict\n                   \"bar\" = 2))");
      });

      $$src$Test$Test$$test("removeAll", function () {
        $$src$Test$Test$$verify_dict(dict_empty.removeAll(), {});
        $$src$Test$Test$$verify_dict(dict_foo.removeAll(), {});

        var empty_sorted_dict = $$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, {});
        var foo_sorted_dict = $$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort, { foo: 1 });

        $$src$Test$Test$$verify_dict(empty_sorted_dict.removeAll(), {});
        $$src$Test$Test$$verify_dict(foo_sorted_dict.removeAll(), {});

        $$assert$$assert(empty_sorted_dict.sort === empty_sorted_dict.removeAll().sort);
        $$assert$$assert(empty_sorted_dict.hash_fn === empty_sorted_dict.removeAll().hash_fn);

        $$assert$$assert(foo_sorted_dict.sort === foo_sorted_dict.removeAll().sort);
        $$assert$$assert(foo_sorted_dict.hash_fn === foo_sorted_dict.removeAll().hash_fn);
      });

      // TODO
      /*test("zip", function () {
        var a = [["a", 1], ["b", 2], ["c", 3], ["d", 4],
                 ["e", 5], ["f", 6], ["g", 7], ["h", 8]];
        assert.equal(toArray(zip(Dict(a))), toArray(zip(a)));
      });*/
    });


    $$src$Test$Test$$context("Set", function () {
      var empty_set = $$Immutable$ImmutableSet$$Set();
      var five_set  = $$Immutable$ImmutableSet$$Set().add(1).add(2).add(3).add(4).add(5);

      $$src$Test$Test$$test("isSet", function () {
        $$assert$$assert(!$$Immutable$ImmutableSet$$isSet($$Immutable$ImmutableDict$$Dict()));

        $$assert$$assert($$Immutable$ImmutableSet$$isSet($$Immutable$ImmutableSet$$Set()));
        $$assert$$assert($$Immutable$ImmutableSet$$isSet($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort)));

        $$assert$$assert($$Immutable$ImmutableSet$$isSortedSet($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort)));
        $$assert$$assert(!$$Immutable$ImmutableSet$$isSortedSet($$Immutable$ImmutableSet$$Set()));
      });

      $$src$Test$Test$$test("verify", function () {
        $$src$Test$Test$$verify_set(empty_set, []);
        $$src$Test$Test$$verify_set(five_set, [1, 2, 3, 4, 5]);
      });

      $$src$Test$Test$$test("init", function () {
        $$src$Test$Test$$verify_set($$Immutable$ImmutableSet$$Set([1, 2, 3]), [1, 2, 3]);

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableSet$$Set(null);
        }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, null);
        }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

        $$src$Test$Test$$verify_set($$Immutable$ImmutableSet$$Set(), []);
        $$src$Test$Test$$verify_set($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort), []);
      });

      $$src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(empty_set.isEmpty());
        $$assert$$assert(!five_set.isEmpty());
      });

      $$src$Test$Test$$test("has", function () {
        $$assert$$assert(!empty_set.has(1));
        $$assert$$assert(!five_set.has(0));
        $$assert$$assert(five_set.has(1));
        $$assert$$assert(five_set.has(2));
        $$assert$$assert(five_set.has(3));
        $$assert$$assert(five_set.has(4));
        $$assert$$assert(five_set.has(5));
        $$assert$$assert(!five_set.has(6));
      });

      $$src$Test$Test$$test("add", function () {
        $$src$Test$Test$$verify_set(empty_set, []);
        $$src$Test$Test$$verify_set(empty_set.add(5), [5]);
        $$src$Test$Test$$verify_set(empty_set, []);

        $$src$Test$Test$$verify_set(five_set, [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_set(five_set.add(5), [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_set(five_set, [1, 2, 3, 4, 5]);
      });

      $$src$Test$Test$$test("remove", function () {
        $$src$Test$Test$$verify_set(empty_set.remove(1), []);

        $$src$Test$Test$$verify_set(five_set.remove(1), [2, 3, 4, 5]);
        $$src$Test$Test$$verify_set(five_set.remove(1).remove(4), [2, 3, 5]);
      });

      $$src$Test$Test$$test("removeAll", function () {
        $$src$Test$Test$$verify_set(empty_set.removeAll(), []);
        $$src$Test$Test$$verify_set(five_set.removeAll(), []);

        var empty_sorted_set = $$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, []);
        var five_sorted_set = $$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, [1, 2, 3, 4, 5]);

        $$src$Test$Test$$verify_set(empty_sorted_set.removeAll(), []);
        $$src$Test$Test$$verify_set(five_sorted_set.removeAll(), []);

        $$assert$$assert(empty_sorted_set.sort === empty_sorted_set.removeAll().sort);
        $$assert$$assert(empty_sorted_set.hash_fn === empty_sorted_set.removeAll().hash_fn);

        $$assert$$assert(five_sorted_set.sort === five_sorted_set.removeAll().sort);
        $$assert$$assert(five_sorted_set.hash_fn === five_sorted_set.removeAll().hash_fn);
      });

      $$src$Test$Test$$test("union", function () {
        $$src$Test$Test$$verify_set(five_set.union(five_set), [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_set(five_set.union($$Immutable$ImmutableSet$$Set([1, 2, 6, 9])), [1, 2, 3, 4, 5, 6, 9]);
        $$src$Test$Test$$verify_set($$Immutable$ImmutableSet$$Set([1, 2]).union(five_set), [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_set($$Immutable$ImmutableSet$$Set([1, 2, 6]).union(five_set), [1, 2, 3, 4, 5, 6]);
        $$src$Test$Test$$verify_set(five_set.union([1, 2, 6, 9]), [1, 2, 3, 4, 5, 6, 9]);
      });

      $$src$Test$Test$$test("intersect", function () {
        $$src$Test$Test$$verify_set(five_set.intersect(five_set), [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_set(empty_set.intersect(five_set), []);
        $$src$Test$Test$$verify_set(five_set.intersect(empty_set), []);
        $$src$Test$Test$$verify_set(five_set.intersect([1, 3, 4]), [1, 3, 4]);
        $$src$Test$Test$$verify_set(five_set.intersect([1, 3, 4, 6, 10, 20]), [1, 3, 4]);
      });

      $$src$Test$Test$$test("disjoint", function () {
        $$src$Test$Test$$verify_set(five_set.disjoint(five_set), []);
        $$src$Test$Test$$verify_set(five_set.disjoint(empty_set), [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_set(empty_set.disjoint(five_set), [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_set(five_set.disjoint([1, 2, 3]), [4, 5]);
        $$src$Test$Test$$verify_set(five_set.disjoint([1, 2, 3, 6, 7, 8]), [4, 5, 6, 7, 8]);
        $$src$Test$Test$$verify_set(five_set.disjoint([1, 2, 3, 3, 6, 7, 8]), [4, 5, 6, 7, 8]);
        $$src$Test$Test$$verify_set(five_set.disjoint([1, 2, 3, 3, 3, 6, 7, 8]), [4, 5, 6, 7, 8]);
        $$src$Test$Test$$verify_set(five_set.disjoint([1, 2, 3, 3, 6, 6, 6, 7, 8]), [4, 5, 6, 7, 8]);
      });

      $$src$Test$Test$$test("subtract", function () {
        $$src$Test$Test$$verify_set(five_set.subtract(empty_set), [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_set(empty_set.subtract(five_set), []);
        $$src$Test$Test$$verify_set(five_set.subtract(five_set), []);
        $$src$Test$Test$$verify_set(five_set.subtract([1, 2, 3]), [4, 5]);
        $$src$Test$Test$$verify_set(five_set.subtract([1, 2, 3, 6, 7, 9]), [4, 5]);
      });

      $$src$Test$Test$$test("complex elements", function () {
        var o = $$Immutable$ImmutableSet$$Set();

        var m1 = {};
        var m2 = {};

        var i1 = $$Immutable$ImmutableSet$$Set();
        var i2 = $$Immutable$ImmutableSet$$Set();
        var i3 = $$Immutable$ImmutableSet$$Set([1, 2, 3]);

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

      $$src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$Immutable$ImmutableSet$$Set(five_set) === five_set);

        var x = $$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, five_set);
        $$assert$$assert(x !== five_set);
        $$assert$$assert($$Immutable$ImmutableSet$$Set(x) !== x);
        $$assert$$assert($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, x) === x);

        var x = $$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, five_set);
        $$assert$$assert($$Immutable$ImmutableSet$$SortedSet($$src$Test$Test$$otherSort, x) !== x);

        var x = $$Immutable$ImmutableSet$$SortedSet($$src$Test$Test$$otherSort, five_set);
        $$assert$$assert($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, x) !== x);

        var x = $$Immutable$ImmutableSet$$SortedSet($$src$Test$Test$$otherSort, five_set);
        $$assert$$assert($$Immutable$ImmutableSet$$SortedSet($$src$Test$Test$$otherSort, x) === x);


        $$assert$$assert(empty_set.union(empty_set) === empty_set);
        $$assert$$assert(empty_set.union(five_set) !== five_set);
        $$assert$$assert(five_set.union(empty_set) === five_set);
        $$assert$$assert(five_set.union(five_set) === five_set);
        $$assert$$assert(five_set.union($$Immutable$ImmutableSet$$Set([1, 2, 3])) === five_set);

        $$assert$$assert($$Immutable$ImmutableSet$$Set(five_set) === five_set);
        $$assert$$assert($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, five_set) !== five_set);

        $$assert$$assert(empty_set.remove(1) === empty_set);

        var set1 = $$Immutable$ImmutableSet$$Set([$$Immutable$ImmutableSet$$Set([])]);

        $$assert$$assert(set1.add($$Immutable$ImmutableSet$$Set([])) !== set1);

        $$assert$$assert(five_set.add(5) === five_set);
        $$assert$$assert(five_set.add(6) !== five_set);
        $$assert$$assert(five_set.remove(5) !== five_set);
      });

      $$src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$Immutable$equal$$equal(empty_set, five_set));
        $$assert$$assert($$Immutable$equal$$equal(empty_set, empty_set));
        $$assert$$assert($$Immutable$equal$$equal(five_set, five_set));
        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableSet$$Set(), $$Immutable$ImmutableSet$$Set()));
        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableSet$$Set([1]), $$Immutable$ImmutableSet$$Set([1])));
        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableSet$$Set([$$Immutable$ImmutableSet$$Set([1])]), $$Immutable$ImmutableSet$$Set([$$Immutable$ImmutableSet$$Set([1])])));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableSet$$Set([$$Immutable$ImmutableSet$$Set([1])]), $$Immutable$ImmutableSet$$Set([$$Immutable$ImmutableSet$$Set([2])])));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, [1, 2, 3]),
                     $$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, [1, 2, 3])));

        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, [1, 2, 3]),
                      $$Immutable$ImmutableSet$$SortedSet($$src$Test$Test$$otherSort, [1, 2, 3])));

        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, [1, 2, 3]),
                      $$Immutable$ImmutableSet$$Set([1, 2, 3])));
      });

      $$src$Test$Test$$test("toJS", function () {
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(empty_set), []));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(five_set), [1, 2, 3, 4, 5]));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS($$Immutable$ImmutableSet$$Set([1, 2, $$Immutable$ImmutableSet$$Set([3])])),
                         [[3], 1, 2]));
      });

      $$src$Test$Test$$test("toJSON", function () {
        $$src$Test$Test$$verify_json(empty_set, []);
        $$src$Test$Test$$verify_json(five_set, [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_json($$Immutable$ImmutableSet$$Set([4, 5, $$Immutable$ImmutableSet$$Set([1, 2, 3])]), [[1, 2, 3], 4, 5]);

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$toJSON$$toJSON($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, []));
        }, "Cannot convert SortedSet to JSON");
      });

      $$src$Test$Test$$test("random elements", function () {
        var o = $$Immutable$ImmutableSet$$Set();
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

        $$src$Test$Test$$verify_set(o, a);

        $$src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.add(i);
          push_sorted(a, i, sort);
          $$src$Test$Test$$verify_set(o, a);
        });

        $$src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.remove(i);
          remove(a, i);
          $$src$Test$Test$$verify_set(o, a);
        });

        $$src$Test$Test$$verify_set(o, []);
      });

      $$src$Test$Test$$test("each", function () {
        $$src$Test$Test$$test_each($$Immutable$ImmutableSet$$Set, []);

        var four = $$Immutable$ImmutableSet$$Set([4]);
        $$src$Test$Test$$test_each($$Immutable$ImmutableSet$$Set, [four, 1, 2, 3]);
      });

      $$src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + $$Immutable$ImmutableSet$$Set([0, -0]) === "(Set\n  0)");
        $$assert$$assert("" + $$Immutable$ImmutableSet$$Set() === "(Set)");
        $$assert$$assert("" + $$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort) === "(SortedSet (Mutable 4))");
        $$assert$$assert("" + $$Immutable$ImmutableSet$$Set([1, 2, 3, 4, 5]) === "(Set\n  1\n  2\n  3\n  4\n  5)");
        $$assert$$assert("" + $$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort, [1, 2, 3, 4, 5]) === "(SortedSet (Mutable 4)\n  1\n  2\n  3\n  4\n  5)");
        $$assert$$assert("" + $$Immutable$ImmutableSet$$Set([$$Immutable$ImmutableSet$$Set([1, 2, 3])]) === "(Set\n  (Set\n    1\n    2\n    3))");
        $$assert$$assert("" + $$Immutable$ImmutableSet$$Set([{}]) === "(Set\n  (Mutable 10))");
        $$assert$$assert("" + $$Immutable$ImmutableSet$$Set([{}]) === "(Set\n  (Mutable 11))");
      });

      // TODO
      /*test("zip", function () {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        assert.equal(toArray(zip(Set(a))), toArray(zip(a)));
      });*/
    });


    $$src$Test$Test$$context("List", function () {
      var empty_list = $$$Immutable$ImmutableList$$List();
      var five_list  = $$$Immutable$ImmutableList$$List().push(1).push(2).push(3).push(4).push(5);

      $$src$Test$Test$$test("isList", function () {
        $$assert$$assert(!$$$Immutable$ImmutableList$$isList($$Immutable$ImmutableDict$$Dict()));
        $$assert$$assert($$$Immutable$ImmutableList$$isList($$$Immutable$ImmutableList$$List()));
      });

      $$src$Test$Test$$test("verify", function () {
        $$src$Test$Test$$verify_list(empty_list, []);
        $$src$Test$Test$$verify_list(five_list, [1, 2, 3, 4, 5]);
      });

      $$src$Test$Test$$test("init", function () {
        $$src$Test$Test$$verify_list($$$Immutable$ImmutableList$$List([1, 2, 3]), [1, 2, 3]);

        $$src$Test$Test$$assert_raises(function () {
          $$$Immutable$ImmutableList$$List(null);
        }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

        $$src$Test$Test$$verify_list($$$Immutable$ImmutableList$$List(), []);
      });

      $$src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(empty_list.isEmpty());
        $$assert$$assert(!five_list.isEmpty());
      });

      $$src$Test$Test$$test("size", function () {
        $$assert$$assert(empty_list.size() === 0);
        $$assert$$assert(five_list.size() === 5);
      });

      $$src$Test$Test$$test("has", function () {
        $$assert$$assert(!empty_list.has(0));
        $$assert$$assert(!empty_list.has(-1));

        $$assert$$assert(five_list.has(0));
        $$assert$$assert(five_list.has(4));
        $$assert$$assert(five_list.has(-1));
        $$assert$$assert(five_list.has(-5));
        $$assert$$assert(!five_list.has(5));
        $$assert$$assert(!five_list.has(-6));
      });

      $$src$Test$Test$$test("get", function () {
        $$assert$$assert(empty_list.get(0, 50) === 50);
        $$assert$$assert(empty_list.get(-1, 50) === 50);

        $$src$Test$Test$$assert_raises(function () {
          empty_list.get(0);
        }, "Index 0 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          empty_list.get(-1);
        }, "Index -1 is not valid");

        $$assert$$assert(empty_list.get(0, 50) === 50);

        $$assert$$assert(five_list.get(0, 50) === 1);
        $$assert$$assert(five_list.get(4, 50) === 5);
        $$assert$$assert(five_list.get(-1, 50) === 5);
        $$assert$$assert(five_list.get(-2, 50) === 4);
      });

      $$src$Test$Test$$test("set", function () {
        $$src$Test$Test$$assert_raises(function () {
          empty_list.set(0, 50);
        }, "Index 0 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          empty_list.set(-1, 50);
        }, "Index -1 is not valid");

        $$src$Test$Test$$verify_list(five_list.set(0, 50), [50, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_list(five_list.set(4, 50), [1, 2, 3, 4, 50]);
        $$src$Test$Test$$verify_list(five_list.set(-1, 50), [1, 2, 3, 4, 50]);
        $$src$Test$Test$$verify_list(five_list.set(-2, 50), [1, 2, 3, 50, 5]);
      });

      $$src$Test$Test$$test("insert", function () {
        $$src$Test$Test$$verify_list($$$Immutable$ImmutableList$$List().insert(0, 5).insert(0, 10).insert(0, 15).push(20).push(25).insert(-2, 30),
                    [15, 10, 5, 20, 30, 25]);

        $$src$Test$Test$$assert_raises(function () {
          five_list.insert(2);
        }, "Expected 2 arguments but got 1");

        $$src$Test$Test$$assert_raises(function () {
          empty_list.insert(1, 5);
        }, "Index 1 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          empty_list.insert(-2, 5);
        }, "Index -1 is not valid");

        var x = empty_list.insert(-1, 10);

        $$src$Test$Test$$verify_list(empty_list, []);
        $$src$Test$Test$$verify_list(x, [10]);

        $$assert$$assert(empty_list.size() === 0);
        $$assert$$assert(x.size() === 1);
        $$assert$$assert(x.get(0) === 10);
        $$assert$$assert(x.get(-1) === 10);

        $$src$Test$Test$$verify_list(five_list.insert(-1, 10), [1, 2, 3, 4, 5, 10]);
        $$src$Test$Test$$verify_list(five_list.insert(-1, 10).insert(-1, 20), [1, 2, 3, 4, 5, 10, 20]);
        $$src$Test$Test$$verify_list(five_list.insert(0, 10), [10, 1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_list(five_list.insert(1, 10), [1, 10, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_list(five_list.insert(-1, 10), [1, 2, 3, 4, 5, 10]);
        $$src$Test$Test$$verify_list(five_list.insert(-2, 10), [1, 2, 3, 4, 10, 5]);
        $$src$Test$Test$$verify_list(five_list, [1, 2, 3, 4, 5]);

        $$src$Test$Test$$verify_list($$$Immutable$ImmutableList$$List().insert(0, 5).insert(0, 4).insert(0, 3).insert(0, 2).insert(0, 1),
                    [1, 2, 3, 4, 5]);
      });

      $$src$Test$Test$$test("push", function () {
        $$src$Test$Test$$verify_list(empty_list.push(5), [5]);
        $$src$Test$Test$$verify_list(five_list.push(5).push(6).push(0), [1, 2, 3, 4, 5, 5, 6, 0]);
      });

      $$src$Test$Test$$test("remove", function () {
        $$src$Test$Test$$verify_list($$$Immutable$ImmutableList$$List().insert(0, 5).insert(0, 10).insert(0, 15).push(20).push(25).remove(-2),
                    [15, 10, 5, 25]);

        $$src$Test$Test$$assert_raises(function () {
          empty_list.remove(0);
        }, "Index 0 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          empty_list.remove(-1);
        }, "Index -1 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          empty_list.remove();
        }, "Expected 1 argument but got 0");

        $$src$Test$Test$$assert_raises(function () {
          five_list.remove();
        }, "Expected 1 argument but got 0");

        $$src$Test$Test$$verify_list(five_list.remove(-1), [1, 2, 3, 4]);
        $$src$Test$Test$$verify_list(five_list.remove(-1).remove(-1), [1, 2, 3]);
        $$src$Test$Test$$verify_list(five_list.remove(-2), [1, 2, 3, 5]);
        $$src$Test$Test$$verify_list(five_list.remove(0), [2, 3, 4, 5]);
        $$src$Test$Test$$verify_list(five_list.remove(1), [1, 3, 4, 5]);
      });

      $$src$Test$Test$$test("removeAll", function () {
        $$src$Test$Test$$verify_list(empty_list.removeAll(), []);
        $$src$Test$Test$$verify_list(five_list.removeAll(), []);
      });

      $$src$Test$Test$$test("modify", function () {
        var ran = false;

        $$src$Test$Test$$assert_raises(function () {
          empty_list.modify(0, function () { ran = true; });
        }, "Index 0 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          empty_list.modify(-1, function () { ran = true; });
        }, "Index -1 is not valid");

        $$assert$$assert(ran === false);


        var ran = false;

        $$src$Test$Test$$verify_list(five_list.modify(0, function (x) {
          ran = true;
          $$assert$$assert(x === 1);
          return x + 100;
        }), [101, 2, 3, 4, 5]);

        $$assert$$assert(ran === true);


        $$src$Test$Test$$verify_list(five_list.modify(-1, function (x) { return x + 100 }), [1, 2, 3, 4, 105]);
        $$src$Test$Test$$verify_list(five_list.modify(1, function (x) { return x + 100 }), [1, 102, 3, 4, 5]);
        $$src$Test$Test$$verify_list(five_list.modify(-2, function (x) { return x + 100 }), [1, 2, 3, 104, 5]);
      });

      $$src$Test$Test$$test("slice", function () {
        $$src$Test$Test$$verify_list(empty_list.slice(0, 0), []);
        $$src$Test$Test$$verify_list(five_list.slice(0, 0), []);
        $$src$Test$Test$$verify_list(five_list.slice(0, 2), [1, 2]);
        $$src$Test$Test$$verify_list(five_list.slice(2, 3), [3]);
        $$src$Test$Test$$verify_list(five_list.slice(3, 5), [4, 5]);
        $$src$Test$Test$$verify_list(five_list.slice(0, 5), [1, 2, 3, 4, 5]);

        $$src$Test$Test$$verify_list(empty_list.slice(), []);

        $$src$Test$Test$$assert_raises(function () {
          five_list.slice(5, 1);
        }, "Index 5 is greater than index 1");

        $$src$Test$Test$$assert_raises(function () {
          five_list.slice(6, 7);
        }, "Index 6 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          five_list.slice(0, 6);
        }, "Index 6 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          five_list.slice(10, 10);
        }, "Index 10 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          five_list.slice(null, 5);
        }, "Expected a number but got null");

        $$src$Test$Test$$assert_raises(function () {
          five_list.slice(0, null);
        }, "Expected a number but got null");

        $$src$Test$Test$$assert_raises(function () {
          five_list.slice(null, null);
        }, "Expected a number but got null");

        $$src$Test$Test$$verify_list(five_list.slice(), [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_list(five_list.slice(0), [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_list(five_list.slice(-1), [5]);
        $$src$Test$Test$$verify_list(five_list.slice(-3), [3, 4, 5]);
        $$src$Test$Test$$verify_list(five_list.slice(-3, 4), [3, 4]);

        $$src$Test$Test$$verify_list(five_list.slice(0, -1), [1, 2, 3, 4]);
        $$src$Test$Test$$verify_list(five_list.slice(-2, -1), [4]);
        $$src$Test$Test$$verify_list(five_list.slice(-4, -1), [2, 3, 4]);
        $$src$Test$Test$$verify_list(five_list.slice(-4, 4), [2, 3, 4]);


        var double_list  = $$$Immutable$ImmutableList$$List();
        var double_array = [];

        var len = 125 * 2;
        for (var i = 0; i < len; ++i) {
          double_list = double_list.push(i);
          double_array.push(i);
        }

        $$src$Test$Test$$verify_list(double_list.slice(0, 124), double_array.slice(0, 124));
        $$src$Test$Test$$verify_list(double_list.slice(0, 125), double_array.slice(0, 125));
        $$src$Test$Test$$verify_list(double_list.slice(0, 126), double_array.slice(0, 126));

        $$src$Test$Test$$verify_list(double_list.slice(124, 250), double_array.slice(124, 250));
        $$src$Test$Test$$verify_list(double_list.slice(125, 250), double_array.slice(125, 250));
        $$src$Test$Test$$verify_list(double_list.slice(126, 250), double_array.slice(126, 250));

        $$src$Test$Test$$verify_list(double_list.slice(124, 125), double_array.slice(124, 125));
        $$src$Test$Test$$verify_list(double_list.slice(125, 126), double_array.slice(125, 126));

        $$src$Test$Test$$verify_list(double_list.slice(0, 250), double_array.slice(0, 250));


        var big_list  = $$$Immutable$ImmutableList$$List();
        var big_array = [];

        var len = 125 * 1000;
        for (var i = 0; i < len; ++i) {
          big_list = big_list.push(i);
          big_array.push(i);
        }

        $$src$Test$Test$$verify_list(big_list.slice(0, 125), big_array.slice(0, 125));
        $$src$Test$Test$$verify_list(big_list.slice(0, 126), big_array.slice(0, 126));
        $$src$Test$Test$$verify_list(big_list.slice(125, 250), big_array.slice(125, 250));
        $$src$Test$Test$$verify_list(big_list.slice(50, 125), big_array.slice(50, 125));
        $$src$Test$Test$$verify_list(big_list.slice(50, 126), big_array.slice(50, 126));
        $$src$Test$Test$$verify_list(big_list.slice(50, 2546), big_array.slice(50, 2546));

        $$src$Test$Test$$verify_list(big_list.slice(0, len), big_array.slice(0, len));
        $$src$Test$Test$$verify_list(big_list.slice(0, len - 1), big_array.slice(0, len - 1));
        $$src$Test$Test$$verify_list(big_list.slice(1, len), big_array.slice(1, len));
        $$src$Test$Test$$verify_list(big_list.slice(1, len - 1), big_array.slice(1, len - 1));
        $$src$Test$Test$$verify_list(big_list.slice(50, 60), big_array.slice(50, 60));
        $$src$Test$Test$$verify_list(big_list.slice(50, 125), big_array.slice(50, 125));
        $$src$Test$Test$$verify_list(big_list.slice(50, 126), big_array.slice(50, 126));
        $$src$Test$Test$$verify_list(big_list.slice(125, 126), big_array.slice(125, 126));
        $$src$Test$Test$$verify_list(big_list.slice(124, 126), big_array.slice(124, 126));
        $$src$Test$Test$$verify_list(big_list.slice(Math.ceil(len / 2)), big_array.slice(Math.ceil(len / 2)));
      });

      $$src$Test$Test$$test("concat", function () {
        $$src$Test$Test$$verify_list(empty_list.concat(empty_list), []);
        $$src$Test$Test$$verify_list(five_list.concat(five_list), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_list($$$Immutable$ImmutableList$$List([10, 20, 30]).concat(five_list), [10, 20, 30, 1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_list(five_list.concat($$$Immutable$ImmutableList$$List([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
        $$src$Test$Test$$verify_list(five_list.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
      });

      $$src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$$Immutable$ImmutableList$$List(five_list) === five_list);

        $$assert$$assert(empty_list.concat(empty_list) === empty_list);
        $$assert$$assert(five_list.concat(empty_list) === five_list);
        $$assert$$assert(empty_list.concat(five_list) === five_list);

        $$assert$$assert(empty_list.slice() === empty_list);
        $$assert$$assert(five_list.slice() === five_list);
        $$assert$$assert(five_list.slice(0, 5) === five_list);
        $$assert$$assert(five_list.slice(1, 5) !== five_list);
        $$assert$$assert(five_list.slice(0, 4) !== five_list);

        $$assert$$assert(five_list.set(0, 1) === five_list);
        $$assert$$assert(five_list.set(0, 2) !== five_list);

        var list1 = $$$Immutable$ImmutableList$$List([$$$Immutable$ImmutableList$$List([])]);

        $$assert$$assert(list1.modify(0, function () {
          return $$$Immutable$ImmutableList$$List([]);
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

      $$src$Test$Test$$test("equal", function () {
        $$assert$$assert($$Immutable$equal$$equal(empty_list, empty_list));
        $$assert$$assert($$Immutable$equal$$equal(five_list, five_list));

        $$assert$$assert($$Immutable$equal$$equal($$$Immutable$ImmutableList$$List([1, 2, 3]), $$$Immutable$ImmutableList$$List([1, 2, 3])));
        $$assert$$assert(!$$Immutable$equal$$equal($$$Immutable$ImmutableList$$List([1, 2, 3]), $$$Immutable$ImmutableList$$List([1, 2, 3, 4])));
        $$assert$$assert(!$$Immutable$equal$$equal($$$Immutable$ImmutableList$$List([1, 2, 3]), $$$Immutable$ImmutableList$$List([1, 2, 4])));
        $$assert$$assert(!$$Immutable$equal$$equal($$$Immutable$ImmutableList$$List([1, 2, 3]), $$$Immutable$ImmutableList$$List([1, 3, 2])));

        $$assert$$assert($$Immutable$equal$$equal($$$Immutable$ImmutableList$$List([1, 2, 3, 4, 5]), five_list));
        $$assert$$assert($$Immutable$equal$$equal(five_list, $$$Immutable$ImmutableList$$List([1, 2, 3, 4, 5])));

        $$assert$$assert($$Immutable$equal$$equal($$$Immutable$ImmutableList$$List([$$$Immutable$ImmutableList$$List([1, 2, 3])]), $$$Immutable$ImmutableList$$List([$$$Immutable$ImmutableList$$List([1, 2, 3])])));
      });

      $$src$Test$Test$$test("toJS", function () {
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(empty_list), []));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(five_list), [1, 2, 3, 4, 5]));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS($$$Immutable$ImmutableList$$List([1, 2, $$$Immutable$ImmutableList$$List([3])])), [1, 2, [3]]));
      });

      $$src$Test$Test$$test("toJSON", function () {
        $$src$Test$Test$$verify_json(empty_list, []);
        $$src$Test$Test$$verify_json(five_list, [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_json($$$Immutable$ImmutableList$$List([4, 5, $$$Immutable$ImmutableList$$List([1, 2, 3])]), [4, 5, [1, 2, 3]]);
      });

      $$src$Test$Test$$test("random elements", function () {
        var o = $$$Immutable$ImmutableList$$List();
        var a = [];

        $$src$Test$Test$$verify_list(o, a);

        $$src$Test$Test$$random_list(200).forEach(function (x) {
          var index = $$src$Test$Test$$random_int(o.size());

          o = o.insert(index, x);
          a.splice(index, 0, x);

          $$src$Test$Test$$verify_list(o, a);
        });

        $$src$Test$Test$$random_list(200).forEach(function (i) {
          o = o.modify(i, function (x) {
            return x + 15;
          });

          a[i] = a[i] + 15;

          $$src$Test$Test$$verify_list(o, a);
        });

        while (o.size()) {
          var index = $$src$Test$Test$$random_int(o.size());
          o = o.remove(index);
          a.splice(index, 1);
          $$src$Test$Test$$verify_list_loose(o, a);
        }

        $$assert$$assert(o.isEmpty());
        $$src$Test$Test$$verify_list(o, []);


        var a = $$src$Test$Test$$random_list(200);
        var pivot = $$src$Test$Test$$random_int(200);

        function test_concat(pivot) {
          var al = [];
          var ar = [];

          var il = $$$Immutable$ImmutableList$$List();
          var ir = $$$Immutable$ImmutableList$$List();

          a.slice(0, pivot).forEach(function (x) {
            var index = $$src$Test$Test$$random_int(il.size());
            il = il.insert(index, x);
            al.splice(index, 0, x);
            $$src$Test$Test$$verify_list(il, al);
          });

          a.slice(pivot).forEach(function (x) {
            var index = $$src$Test$Test$$random_int(ir.size());
            ir = ir.insert(index, x);
            ar.splice(index, 0, x);
            $$src$Test$Test$$verify_list(ir, ar);
          });

          $$src$Test$Test$$verify_list_loose(il.concat(ir), al.concat(ar));
          $$src$Test$Test$$verify_list_loose(ir.concat(il), ar.concat(al));
        }

        test_concat(0);
        test_concat(5);
        test_concat(pivot);
        test_concat(194);
        test_concat(199);
      });

      $$src$Test$Test$$test("each", function () {
        $$src$Test$Test$$test_each($$$Immutable$ImmutableList$$List, []);

        var list = $$$Immutable$ImmutableList$$List([4]);
        $$src$Test$Test$$test_each($$$Immutable$ImmutableList$$List, [1, 2, 3, list]);

        var expected = $$src$Test$Test$$random_list(200);
        $$src$Test$Test$$test_each($$$Immutable$ImmutableList$$List, expected);
      });

      $$src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + empty_list === "(List)");
        $$assert$$assert("" + $$$Immutable$ImmutableList$$List([1, 2, 3]) === "(List\n  1\n  2\n  3)");
        $$assert$$assert("" + $$$Immutable$ImmutableList$$List([1, $$$Immutable$ImmutableList$$List([2]), 3]) === "(List\n  1\n  (List\n    2)\n  3)");
      });

      // TODO
      /*test("zip", function () {
        assert.equal(toArray(zip(List())), toArray(zip([])));

        assert.equal(toArray(zip(List([1, 2, 3, 4, 5]))), [[1], [2], [3], [4], [5]]);

        var a = random_list(200);
        assert.equal(toArray(zip(List(a))), toArray(zip(a)));
      });*/
    });


    $$src$Test$Test$$context("Tuple", function () {
      var empty_tuple = $$Immutable$ImmutableTuple$$Tuple();
      var five_tuple  = $$Immutable$ImmutableTuple$$Tuple([1, 2, 3, 4, 5]);

      $$src$Test$Test$$test("isTuple", function () {
        $$assert$$assert(!$$Immutable$ImmutableTuple$$isTuple($$$Immutable$ImmutableList$$List()));
        $$assert$$assert($$Immutable$ImmutableTuple$$isTuple($$Immutable$ImmutableTuple$$Tuple()));
      });

      $$src$Test$Test$$test("verify", function () {
        $$src$Test$Test$$verify_tuple(empty_tuple, []);
        $$src$Test$Test$$verify_tuple(five_tuple, [1, 2, 3, 4, 5]);
      });

      $$src$Test$Test$$test("init", function () {
        $$src$Test$Test$$verify_tuple($$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), [1, 2, 3]);

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableTuple$$Tuple(null);
        }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

        $$src$Test$Test$$verify_tuple($$Immutable$ImmutableTuple$$Tuple(), []);
      });

      $$src$Test$Test$$test("size", function () {
        $$assert$$assert(empty_tuple.size() === 0);
        $$assert$$assert(five_tuple.size() === 5);
      });

      $$src$Test$Test$$test("get", function () {
        $$src$Test$Test$$assert_raises(function () {
          empty_tuple.get(0);
        }, "Index 0 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          empty_tuple.get(-1);
        }, "Index -1 is not valid");

        $$assert$$assert(five_tuple.get(0) === 1);
        $$assert$$assert(five_tuple.get(4) === 5);

        $$src$Test$Test$$assert_raises(function () {
          five_tuple.get(-1);
        }, "Index -1 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          five_tuple.get(-2);
        }, "Index -2 is not valid");
      });

      $$src$Test$Test$$test("set", function () {
        $$src$Test$Test$$verify_tuple(five_tuple.set(0, 50), [50, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_tuple(five_tuple.set(4, 50), [1, 2, 3, 4, 50]);

        $$src$Test$Test$$assert_raises(function () {
          empty_tuple.set(0, 50);
        }, "Index 0 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          empty_tuple.set(-1, 50);
        }, "Index -1 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          five_tuple.set(-1, 50);
        }, "Index -1 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          five_tuple.set(-2, 50);
        }, "Index -2 is not valid");
      });

      $$src$Test$Test$$test("modify", function () {
        var ran = false;

        $$src$Test$Test$$assert_raises(function () {
          empty_tuple.modify(0, function () { ran = true; });
        }, "Index 0 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          empty_tuple.modify(-1, function () { ran = true; });
        }, "Index -1 is not valid");

        $$assert$$assert(ran === false);


        var ran = false;

        $$src$Test$Test$$verify_tuple(five_tuple.modify(0, function (x) {
          ran = true;
          $$assert$$assert(x === 1);
          return x + 100;
        }), [101, 2, 3, 4, 5]);

        $$assert$$assert(ran === true);

        $$src$Test$Test$$verify_tuple(five_tuple.modify(1, function (x) { return x + 100 }), [1, 102, 3, 4, 5]);

        $$src$Test$Test$$assert_raises(function () {
          five_tuple.modify(-1, function (x) { return x + 100 })
        }, "Index -1 is not valid");

        $$src$Test$Test$$assert_raises(function () {
          five_tuple.modify(-2, function (x) { return x + 100 })
        }, "Index -2 is not valid");
      });

      $$src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$Immutable$ImmutableTuple$$Tuple(five_tuple) === five_tuple);

        var tuple1 = $$Immutable$ImmutableTuple$$Tuple([$$Immutable$ImmutableTuple$$Tuple([])]);

        $$assert$$assert(five_tuple.set(0, 1) === five_tuple);
        $$assert$$assert(five_tuple.set(0, 2) !== five_tuple);

        $$assert$$assert(tuple1.modify(0, function () {
          return $$Immutable$ImmutableTuple$$Tuple([]);
        }) !== tuple1);

        $$assert$$assert(five_tuple.modify(0, function () {
          return 1;
        }) === five_tuple);

        $$assert$$assert(five_tuple.modify(0, function () {
          return 2;
        }) !== five_tuple);

        $$assert$$assert(five_tuple.modify(1, function () {
          return 2;
        }) === five_tuple);

        $$assert$$assert(five_tuple.modify(1, function () {
          return 3;
        }) !== five_tuple);

        $$assert$$assert(five_tuple.modify(4, function () {
          return 5;
        }) === five_tuple);

        $$assert$$assert(five_tuple.modify(4, function () {
          return 6;
        }) !== five_tuple);
      });

      $$src$Test$Test$$test("equal", function () {
        $$assert$$assert($$Immutable$equal$$equal(empty_tuple, empty_tuple));
        $$assert$$assert($$Immutable$equal$$equal(five_tuple, five_tuple));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), $$Immutable$ImmutableTuple$$Tuple([1, 2, 3])));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), $$Immutable$ImmutableTuple$$Tuple([1, 2, 3, 4])));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), $$Immutable$ImmutableTuple$$Tuple([1, 2, 4])));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), $$Immutable$ImmutableTuple$$Tuple([1, 3, 2])));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableTuple$$Tuple([1, 2, 3, 4, 5]), five_tuple));
        $$assert$$assert($$Immutable$equal$$equal(five_tuple, $$Immutable$ImmutableTuple$$Tuple([1, 2, 3, 4, 5])));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableTuple$$Tuple([$$Immutable$ImmutableTuple$$Tuple([1, 2, 3])]), $$Immutable$ImmutableTuple$$Tuple([$$Immutable$ImmutableTuple$$Tuple([1, 2, 3])])));
      });

      $$src$Test$Test$$test("toJS", function () {
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(empty_tuple), []));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(five_tuple), [1, 2, 3, 4, 5]));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS($$Immutable$ImmutableTuple$$Tuple([1, 2, $$Immutable$ImmutableTuple$$Tuple([3])])), [1, 2, [3]]));
      });

      $$src$Test$Test$$test("toJSON", function () {
        $$src$Test$Test$$verify_json(empty_tuple, []);
        $$src$Test$Test$$verify_json(five_tuple, [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_json($$Immutable$ImmutableTuple$$Tuple([4, 5, $$Immutable$ImmutableTuple$$Tuple([1, 2, 3])]), [4, 5, [1, 2, 3]]);
      });

      $$src$Test$Test$$test("each", function () {
        $$src$Test$Test$$test_each($$Immutable$ImmutableTuple$$Tuple, []);

        var x = $$Immutable$ImmutableTuple$$Tuple([4]);
        $$src$Test$Test$$test_each($$Immutable$ImmutableTuple$$Tuple, [1, 2, 3, x]);

        var expected = $$src$Test$Test$$random_list(200);
        $$src$Test$Test$$test_each($$Immutable$ImmutableTuple$$Tuple, expected);
      });

      $$src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + empty_tuple === "(Tuple)");
        $$assert$$assert("" + $$Immutable$ImmutableTuple$$Tuple([1, 2, 3]) === "(Tuple\n  1\n  2\n  3)");
        $$assert$$assert("" + $$Immutable$ImmutableTuple$$Tuple([1, $$Immutable$ImmutableTuple$$Tuple([2]), 3]) === "(Tuple\n  1\n  (Tuple\n    2)\n  3)");
      });

      // TODO
      /*test("zip", function () {
        assert.equal(toArray(zip(Tuple())), toArray(zip([])));

        assert.equal(toArray(zip(Tuple([1, 2, 3, 4, 5]))), [[1], [2], [3], [4], [5]]);

        var a = random_list(200);
        assert.equal(toArray(zip(Tuple(a))), toArray(zip(a)));
      });*/
    });


    $$src$Test$Test$$context("Queue", function () {
      var empty_queue = $$Immutable$ImmutableQueue$$Queue();
      var five_queue  = $$Immutable$ImmutableQueue$$Queue().push(1).push(2).push(3).push(4).push(5);

      $$src$Test$Test$$test("isQueue", function () {
        $$assert$$assert(!$$Immutable$ImmutableQueue$$isQueue($$$Immutable$ImmutableList$$List()));
        $$assert$$assert($$Immutable$ImmutableQueue$$isQueue($$Immutable$ImmutableQueue$$Queue()));
      });

      $$src$Test$Test$$test("verify", function () {
        $$src$Test$Test$$verify_queue(empty_queue, []);
        $$src$Test$Test$$verify_queue(five_queue, [1, 2, 3, 4, 5]);
      });

      $$src$Test$Test$$test("init", function () {
        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue([1, 2, 3]), [1, 2, 3]);

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableQueue$$Queue(null);
        }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue(), []);
      });

      $$src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(empty_queue.isEmpty());
        $$assert$$assert(!five_queue.isEmpty());
      });

      $$src$Test$Test$$test("size", function () {
        $$assert$$assert(empty_queue.size() === 0);
        $$assert$$assert(five_queue.size() === 5);
      });

      $$src$Test$Test$$test("peek", function () {
        $$src$Test$Test$$assert_raises(function () {
          empty_queue.peek();
        }, "Cannot peek from an empty queue");

        $$assert$$assert(empty_queue.peek(50) === 50);

        $$assert$$assert(five_queue.peek() === 1);
        $$assert$$assert(five_queue.peek(50) === 1);
      });

      $$src$Test$Test$$test("push", function () {
        var x = empty_queue.push(10);

        $$src$Test$Test$$verify_queue(empty_queue, []);
        $$src$Test$Test$$verify_queue(x, [10]);

        $$assert$$assert(empty_queue.size() === 0);
        $$assert$$assert(x.size() === 1);
        $$assert$$assert(x.peek() === 10);

        $$assert$$assert($$Immutable$ImmutableQueue$$Queue().push(1).peek() === 1);

        $$src$Test$Test$$verify_queue(five_queue.push(10), [1, 2, 3, 4, 5, 10]);
        $$src$Test$Test$$verify_queue(five_queue.push(10).push(20), [1, 2, 3, 4, 5, 10, 20]);
        $$src$Test$Test$$verify_queue(five_queue, [1, 2, 3, 4, 5]);

        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue().push(5).push(4).push(3).push(2).push(1),
                     [5, 4, 3, 2, 1]);

        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue().push(5).push(10).pop().push(15), [10, 15]);
      });

      $$src$Test$Test$$test("removeAll", function () {
        $$src$Test$Test$$verify_queue(empty_queue.removeAll(), []);
        $$src$Test$Test$$verify_queue(five_queue.removeAll(), []);
      });

      $$src$Test$Test$$test("pop", function () {
        $$src$Test$Test$$assert_raises(function () {
          empty_queue.pop();
        }, "Cannot pop from an empty queue");

        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue().push(5).pop(), []);
        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue().push(5).push(10).pop(), [10]);
        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue().push(5).push(10).push(15).pop(), [10, 15]);

        $$src$Test$Test$$verify_queue(five_queue.pop(), [2, 3, 4, 5]);
        $$src$Test$Test$$verify_queue(five_queue.pop().pop(), [3, 4, 5]);

        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue(), []);
        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue().push(5).push(10).push(20).push(30), [5, 10, 20, 30]);
        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue().push(5).push(10).push(20).push(30).pop(), [10, 20, 30]);
      });

      $$src$Test$Test$$test("concat", function () {
        $$src$Test$Test$$verify_queue(empty_queue.concat(empty_queue), []);
        $$src$Test$Test$$verify_queue(five_queue.concat(five_queue), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_queue($$Immutable$ImmutableQueue$$Queue([10, 20, 30]).concat(five_queue), [10, 20, 30, 1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_queue(five_queue.concat($$Immutable$ImmutableQueue$$Queue([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
        $$src$Test$Test$$verify_queue(five_queue.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
      });

      $$src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$Immutable$ImmutableQueue$$Queue(five_queue) === five_queue);

        $$assert$$assert(empty_queue.concat(empty_queue) === empty_queue);
        $$assert$$assert(five_queue.concat(empty_queue) === five_queue);
        $$assert$$assert(empty_queue.concat(five_queue) !== five_queue);
      });

      $$src$Test$Test$$test("equal", function () {
        $$assert$$assert($$Immutable$equal$$equal(empty_queue, empty_queue));
        $$assert$$assert($$Immutable$equal$$equal(five_queue, five_queue));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableQueue$$Queue([1, 2, 3]), $$Immutable$ImmutableQueue$$Queue([1, 2, 3])));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableQueue$$Queue([1, 2, 3]), $$Immutable$ImmutableQueue$$Queue([1, 2, 4])));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableQueue$$Queue([1, 2, 3]), $$Immutable$ImmutableQueue$$Queue([1, 3, 2])));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableQueue$$Queue([1, 2, 3, 4, 5]), five_queue));
        $$assert$$assert($$Immutable$equal$$equal(five_queue, $$Immutable$ImmutableQueue$$Queue([1, 2, 3, 4, 5])));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableQueue$$Queue([$$Immutable$ImmutableQueue$$Queue([1, 2, 3])]), $$Immutable$ImmutableQueue$$Queue([$$Immutable$ImmutableQueue$$Queue([1, 2, 3])])));
      });

      $$src$Test$Test$$test("toJS", function () {
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(empty_queue), []));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(five_queue), [1, 2, 3, 4, 5]));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS($$Immutable$ImmutableQueue$$Queue([1, 2, $$Immutable$ImmutableQueue$$Queue([3])])), [1, 2, [3]]));
      });

      $$src$Test$Test$$test("toJSON", function () {
        $$src$Test$Test$$verify_json(empty_queue, []);
        $$src$Test$Test$$verify_json(five_queue, [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_json($$Immutable$ImmutableQueue$$Queue([4, 5, $$Immutable$ImmutableQueue$$Queue([1, 2, 3])]), [4, 5, [1, 2, 3]]);
      });

      $$src$Test$Test$$test("each", function () {
        $$src$Test$Test$$test_each($$Immutable$ImmutableQueue$$Queue, []);

        var x = $$Immutable$ImmutableQueue$$Queue([3]);
        $$src$Test$Test$$test_each($$Immutable$ImmutableQueue$$Queue, [1, 2, x, 4]);
      });

      $$src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + empty_queue === "(Queue)");
        $$assert$$assert("" + $$Immutable$ImmutableQueue$$Queue([1, 2, 3]) === "(Queue\n  1\n  2\n  3)");
        $$assert$$assert("" + $$Immutable$ImmutableQueue$$Queue([1, $$Immutable$ImmutableQueue$$Queue([2]), 3]) === "(Queue\n  1\n  (Queue\n    2)\n  3)");
      });

      // TODO
      /*test("zip", function () {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        assert.equal(toArray(zip(Queue(a))), toArray(zip(a)));
      });*/
    });


    $$src$Test$Test$$context("Stack", function () {
      var empty_stack = $$Immutable$ImmutableStack$$Stack();
      var five_stack  = $$Immutable$ImmutableStack$$Stack().push(1).push(2).push(3).push(4).push(5);

      $$src$Test$Test$$test("isStack", function () {
        $$assert$$assert(!$$Immutable$ImmutableStack$$isStack($$Immutable$ImmutableQueue$$Queue()));
        $$assert$$assert($$Immutable$ImmutableStack$$isStack($$Immutable$ImmutableStack$$Stack()));
      });

      $$src$Test$Test$$test("verify", function () {
        $$src$Test$Test$$verify_stack(empty_stack, []);
        $$src$Test$Test$$verify_stack(five_stack, [1, 2, 3, 4, 5]);
      });

      $$src$Test$Test$$test("init", function () {
        $$src$Test$Test$$verify_stack($$Immutable$ImmutableStack$$Stack([1, 2, 3]), [1, 2, 3]);

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableStack$$Stack(null);
        }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

        $$src$Test$Test$$verify_stack($$Immutable$ImmutableStack$$Stack(), []);
      });

      $$src$Test$Test$$test("isEmpty", function () {
        $$assert$$assert(empty_stack.isEmpty());
        $$assert$$assert(!five_stack.isEmpty());
      });

      $$src$Test$Test$$test("size", function () {
        $$assert$$assert(empty_stack.size() === 0);
        $$assert$$assert(five_stack.size() === 5);
      });

      $$src$Test$Test$$test("peek", function () {
        $$src$Test$Test$$assert_raises(function () {
          empty_stack.peek();
        }, "Cannot peek from an empty stack");

        $$assert$$assert(empty_stack.peek(50) === 50);

        $$assert$$assert(five_stack.peek() === 5);
        $$assert$$assert(five_stack.peek(50) === 5);
      });

      $$src$Test$Test$$test("push", function () {
        var x = empty_stack.push(10);

        $$src$Test$Test$$verify_stack(empty_stack, []);
        $$src$Test$Test$$verify_stack(x, [10]);

        $$assert$$assert(empty_stack.size() === 0);
        $$assert$$assert(x.size() === 1);
        $$assert$$assert(x.peek() === 10);

        $$src$Test$Test$$verify_stack(five_stack.push(10), [1, 2, 3, 4, 5, 10]);
        $$src$Test$Test$$verify_stack(five_stack.push(10).push(20), [1, 2, 3, 4, 5, 10, 20]);
        $$src$Test$Test$$verify_stack(five_stack, [1, 2, 3, 4, 5]);

        $$src$Test$Test$$verify_stack($$Immutable$ImmutableStack$$Stack().push(5).push(4).push(3).push(2).push(1),
                     [5, 4, 3, 2, 1]);
      });

      $$src$Test$Test$$test("pop", function () {
        $$src$Test$Test$$assert_raises(function () {
          empty_stack.pop();
        }, "Cannot pop from an empty stack");

        $$src$Test$Test$$verify_stack(five_stack.pop(), [1, 2, 3, 4]);
        $$src$Test$Test$$verify_stack(five_stack.pop().pop(), [1, 2, 3]);
      });

      $$src$Test$Test$$test("removeAll", function () {
        $$src$Test$Test$$verify_stack(empty_stack.removeAll(), []);
        $$src$Test$Test$$verify_stack(five_stack.removeAll(), []);
      });

      $$src$Test$Test$$test("concat", function () {
        $$src$Test$Test$$verify_stack(empty_stack.concat(empty_stack), []);
        $$src$Test$Test$$verify_stack(five_stack.concat(five_stack), [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_stack($$Immutable$ImmutableStack$$Stack([10, 20, 30]).concat(five_stack), [10, 20, 30, 1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_stack(five_stack.concat($$Immutable$ImmutableStack$$Stack([10, 20, 30])), [1, 2, 3, 4, 5, 10, 20, 30]);
        $$src$Test$Test$$verify_stack(five_stack.concat([10, 20, 30]), [1, 2, 3, 4, 5, 10, 20, 30]);
      });

      $$src$Test$Test$$test("=== when not modified", function () {
        $$assert$$assert($$Immutable$ImmutableStack$$Stack(five_stack) === five_stack);

        $$assert$$assert(empty_stack.concat(empty_stack) === empty_stack);
        $$assert$$assert(five_stack.concat(empty_stack) === five_stack);
        $$assert$$assert(empty_stack.concat(five_stack) !== five_stack);
      });

      $$src$Test$Test$$test("equal", function () {
        $$assert$$assert($$Immutable$equal$$equal(empty_stack, empty_stack));
        $$assert$$assert($$Immutable$equal$$equal(five_stack, five_stack));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableStack$$Stack([1, 2, 3]), $$Immutable$ImmutableStack$$Stack([1, 2, 3])));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableStack$$Stack([1, 2, 3]), $$Immutable$ImmutableStack$$Stack([1, 2, 4])));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableStack$$Stack([1, 2, 3]), $$Immutable$ImmutableStack$$Stack([1, 3, 2])));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableStack$$Stack([1, 2, 3, 4, 5]), five_stack));
        $$assert$$assert($$Immutable$equal$$equal(five_stack, $$Immutable$ImmutableStack$$Stack([1, 2, 3, 4, 5])));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableStack$$Stack([$$Immutable$ImmutableStack$$Stack([1, 2, 3])]), $$Immutable$ImmutableStack$$Stack([$$Immutable$ImmutableStack$$Stack([1, 2, 3])])));
      });

      $$src$Test$Test$$test("toJS", function () {
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(empty_stack), []));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(five_stack), [1, 2, 3, 4, 5]));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS($$Immutable$ImmutableStack$$Stack([1, 2, $$Immutable$ImmutableStack$$Stack([3])])), [1, 2, [3]]));
      });

      $$src$Test$Test$$test("toJSON", function () {
        $$src$Test$Test$$verify_json(empty_stack, []);
        $$src$Test$Test$$verify_json(five_stack, [1, 2, 3, 4, 5]);
        $$src$Test$Test$$verify_json($$Immutable$ImmutableStack$$Stack([4, 5, $$Immutable$ImmutableStack$$Stack([1, 2, 3])]), [4, 5, [1, 2, 3]]);
      });

      $$src$Test$Test$$test("each", function () {
        $$src$Test$Test$$test_each($$Immutable$ImmutableStack$$Stack, []);

        var x = $$Immutable$ImmutableStack$$Stack([3]);
        $$src$Test$Test$$test_each($$Immutable$ImmutableStack$$Stack, [1, 2, x, 4]);
      });

      $$src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + empty_stack === "(Stack)");
        $$assert$$assert("" + $$Immutable$ImmutableStack$$Stack([1, 2, 3]) === "(Stack\n  1\n  2\n  3)");
        $$assert$$assert("" + $$Immutable$ImmutableStack$$Stack([1, $$Immutable$ImmutableStack$$Stack([2]), 3]) === "(Stack\n  1\n  (Stack\n    2)\n  3)");
      });

      // TODO
      /*test("zip", function () {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        assert.equal(toArray(zip(Stack(a))), toArray(zip(a)));
      });*/
    });


    $$src$Test$Test$$context("Record", function () {
      var Empty = $$Immutable$ImmutableRecord$$Record({});
      var Foo   = $$Immutable$ImmutableRecord$$Record({ foo: 1 });

      $$src$Test$Test$$test("isRecord", function () {
        $$assert$$assert(!$$Immutable$ImmutableRecord$$isRecord($$Immutable$ImmutableDict$$Dict()));
        $$assert$$assert($$Immutable$ImmutableRecord$$isRecord(Empty));
        $$assert$$assert($$Immutable$ImmutableRecord$$isRecord(Foo));
      });

      $$src$Test$Test$$test("verify", function () {
        $$src$Test$Test$$verify_record(Empty, {});
        $$src$Test$Test$$verify_record(Foo, { foo: 1 });
      });

      $$src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + Empty === "(Record)");
        $$assert$$assert("" + Foo === "(Record\n  \"foo\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableRecord$$Record({ foo: 2 }) === "(Record\n  \"foo\" = 2)");
        $$assert$$assert("" + $$Immutable$ImmutableRecord$$Record({ foo: 1 }) === "(Record\n  \"foo\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableRecord$$Record({ foo: 1, bar: 2 }) === "(Record\n  \"bar\" = 2\n  \"foo\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableRecord$$Record({ "foo\nbar\nqux": 1, bar: 2 }) === "(Record\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableRecord$$Record({ foo: $$Immutable$ImmutableRecord$$Record({ qux: 3 }), bar: 2 }) === "(Record\n  \"bar\" = 2\n  \"foo\" = (Record\n            \"qux\" = 3))");
        $$assert$$assert("" + $$Immutable$ImmutableRecord$$Record({ "foo\nbar\nqux": $$Immutable$ImmutableRecord$$Record({ qux: 3 }), bar: 2 }) === "(Record\n  \"bar\" = 2\n  \"foo\n   bar\n   qux\" = (Record\n            \"qux\" = 3))");

        $$assert$$assert("" + $$Immutable$ImmutableRecord$$Record({ foobarquxcorgenou: 1, bar: 2 }) === "(Record\n  \"bar\"               = 2\n  \"foobarquxcorgenou\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableRecord$$Record({ "foobar\nquxcorgenou": 1, bar: 2 }) === "(Record\n  \"bar\"         = 2\n  \"foobar\n   quxcorgenou\" = 1)");
        $$assert$$assert("" + $$Immutable$ImmutableRecord$$Record({ "foo\nbar\nqux": 1, "barquxcorgenou": 2 }) === "(Record\n  \"barquxcorgenou\" = 2\n  \"foo\n   bar\n   qux\"            = 1)");
      });

      $$src$Test$Test$$test("init", function () {
        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record(null);
        }, "Cannot read property '(UUIDTag 6199065c-b518-4cb3-8b41-ab70a9769ec3)' of null");

        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record(), {});

        var x = $$Immutable$ImmutableRecord$$Record({ foo: 1 });
        $$src$Test$Test$$verify_record(x, { foo: 1 });
        $$assert$$assert($$Immutable$equal$$equal(x, Foo));
        $$assert$$assert($$Immutable$equal$$equal(Foo, x));

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record(Object.create(null));
        }, "Cannot convert object to primitive value");

        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record({ foo: 2 }), { foo: 2 });

        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record(), {});


        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record([["foo", 2]]), { foo: 2 });

        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record([["foo", 2], ["foo", 3]]), { foo: 3 });
        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record([["bar", 1], ["foo", 2], ["qux", 4], ["foo", 3], ["corge", 5]]), { bar: 1, foo: 3, qux: 4, corge: 5 });

        var x = $$Immutable$iter$$map($$Immutable$ImmutableRecord$$Record([["bar", 1], ["foo", 2], ["qux", 4], ["foo", 3], ["corge", 5]]), function (x) {
          $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
          return $$Immutable$iter$$toArray(x);
        });
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [["bar", 1], ["corge", 5], ["foo", 3], ["qux", 4]]));

        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record([$$Immutable$ImmutableTuple$$Tuple(["foo", 2])]), { foo: 2 });

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([$$$Immutable$ImmutableList$$List(["foo", 2])]);
        }, "Expected array or Tuple but got: (List\n  \"foo\"\n  2)");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([{}]);
        }, "Expected array or Tuple but got: [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([[]]);
        }, "Expected array with 2 elements but got 0 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo"]]);
        }, "Expected array with 2 elements but got 1 element");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo", 2, 3]]);
        }, "Expected array with 2 elements but got 3 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([$$Immutable$ImmutableTuple$$Tuple([])]);
        }, "Expected Tuple with 2 elements but got 0 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([$$Immutable$ImmutableTuple$$Tuple(["foo"])]);
        }, "Expected Tuple with 2 elements but got 1 element");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([$$Immutable$ImmutableTuple$$Tuple(["foo", 2, 3])]);
        }, "Expected Tuple with 2 elements but got 3 elements");
      });

      $$src$Test$Test$$test("get", function () {
        $$src$Test$Test$$assert_raises(function () {
          Empty.get("foo");
        }, "Key foo not found");

        $$assert$$assert(Foo.get("foo") === 1);
      });

      $$src$Test$Test$$test("set", function () {
        $$src$Test$Test$$assert_raises(function () {
          Empty.set("bar", 2);
        }, "Key bar not found");

        var x  = Foo;
        var x2 = x.set("foo", 3);
        $$assert$$assert(x.get("foo") === 1);
        $$assert$$assert(x2.get("foo") === 3);
      });

      $$src$Test$Test$$test("modify", function () {
        var ran = false;

        $$src$Test$Test$$assert_raises(function () {
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

      $$src$Test$Test$$test("update", function () {
        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record({ foo: 1 }), { foo: 1 });
        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record({ foo: 1 }).update($$Immutable$ImmutableRecord$$Record({ foo: 2 })), { foo: 2 });
        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record({ foo: 1 }).update([["foo", 3]]), { foo: 3 });
        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record({ foo: 1 }).update({ foo: 3 }), { foo: 3 });

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record({ foo: 1 }).update($$Immutable$ImmutableRecord$$Record({ foo: 2, bar: 3 }));
        }, "Key bar not found");


        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([["foo", 3]]), { foo: 3 });
        $$src$Test$Test$$verify_record($$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([$$Immutable$ImmutableTuple$$Tuple(["foo", 3])]), { foo: 3 });

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record().update(Object.create(null));
        }, "Cannot convert object to primitive value");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([$$$Immutable$ImmutableList$$List(["foo", 3])]);
        }, "Expected array or Tuple but got: (List\n  \"foo\"\n  3)");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([{}]);
        }, "Expected array or Tuple but got: [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([[]]);
        }, "Expected array with 2 elements but got 0 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([["foo"]]);
        }, "Expected array with 2 elements but got 1 element");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([["foo", 2, 3]]);
        }, "Expected array with 2 elements but got 3 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([$$Immutable$ImmutableTuple$$Tuple([])]);
        }, "Expected Tuple with 2 elements but got 0 elements");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([$$Immutable$ImmutableTuple$$Tuple(["foo"])]);
        }, "Expected Tuple with 2 elements but got 1 element");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([["foo", 2]]).update([$$Immutable$ImmutableTuple$$Tuple(["foo", 2, 3])]);
        }, "Expected Tuple with 2 elements but got 3 elements");
      });

      $$src$Test$Test$$test("complex keys", function () {
        var o = $$Immutable$ImmutableDict$$Dict().set({}, 1);

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record(o);
        }, "Expected key to be a string or Tag but got [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$ImmutableRecord$$Record([[{}, 1]]);
        }, "Expected key to be a string or Tag but got [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          Foo.get({});
        }, "Expected key to be a string or Tag but got [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          Foo.set({}, 5);
        }, "Expected key to be a string or Tag but got [object Object]");

        $$src$Test$Test$$assert_raises(function () {
          Foo.modify({}, function () { throw new Error("FAIL") });
        }, "Expected key to be a string or Tag but got [object Object]");
      });

      $$src$Test$Test$$test("=== when not modified", function () {
        var x = Foo;

        $$assert$$assert(x.set("foo", 1) === x);
        $$assert$$assert(x.set("foo", 2) !== x);

        $$assert$$assert(x.modify("foo", function () {
          return 1;
        }) === x);

        $$assert$$assert(x.modify("foo", function () {
          return 2;
        }) !== x);

        var x = $$Immutable$ImmutableRecord$$Record({ foo: 1 });
        $$assert$$assert($$Immutable$ImmutableRecord$$Record(x) === x);
        $$assert$$assert($$Immutable$ImmutableRecord$$Record({ foo: 1 }) !== x);

        $$assert$$assert(x.update([]) === x);
        $$assert$$assert(x.update([["foo", 1]]) === x);
        $$assert$$assert(x.update([["foo", 2]]) !== x);
      });

      $$src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$Immutable$equal$$equal(Empty, Foo));
        $$assert$$assert($$Immutable$equal$$equal(Empty, Empty));
        $$assert$$assert($$Immutable$equal$$equal(Foo, Foo));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableRecord$$Record({}), $$Immutable$ImmutableRecord$$Record({})));
        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableRecord$$Record({ foo: 1 }), $$Immutable$ImmutableRecord$$Record({ foo: 1 })));

        $$assert$$assert(!$$Immutable$equal$$equal(Foo, $$Immutable$ImmutableRecord$$Record({ foo: 2 })));
        $$assert$$assert($$Immutable$equal$$equal(Foo, $$Immutable$ImmutableRecord$$Record({ foo: 1 })));
        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableRecord$$Record({ foo: 2 }), $$Immutable$ImmutableRecord$$Record({ foo: 2 })));
        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$ImmutableRecord$$Record({ foo: 2 }), $$Immutable$ImmutableRecord$$Record({ foo: 3 })));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$ImmutableRecord$$Record([["foo", 1], ["bar", 2]]), $$Immutable$ImmutableRecord$$Record([["bar", 2], ["foo", 1]])));
      });

      $$src$Test$Test$$test("toJS", function () {
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(Empty), {}));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(Foo), { foo: 1 }));
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS($$Immutable$ImmutableRecord$$Record({ foo: $$Immutable$ImmutableRecord$$Record({ bar: 2 }) })),
                         { foo: { bar: 2 } }));
      });

      $$src$Test$Test$$test("toJSON", function () {
        $$src$Test$Test$$verify_json(Empty, {});
        $$src$Test$Test$$verify_json(Foo, { foo: 1 });
        $$src$Test$Test$$verify_json($$Immutable$ImmutableRecord$$Record({ foo: $$Immutable$ImmutableRecord$$Record({ bar: 2 }) }), { foo: { bar: 2 } });
      });

      $$src$Test$Test$$test("each", function () {
        $$src$Test$Test$$test_each_dict($$Immutable$ImmutableRecord$$Record([]), []);
        $$src$Test$Test$$test_each_dict($$Immutable$ImmutableRecord$$Record([["foo", 2]]), [["foo", 2]]);
        $$src$Test$Test$$test_each_dict($$Immutable$ImmutableRecord$$Record([["foo", 2], ["bar", 3]]), [["bar", 3], ["foo", 2]]);
        $$src$Test$Test$$test_each_dict($$Immutable$ImmutableRecord$$Record([["bar", 3], ["foo", 2]]), [["bar", 3], ["foo", 2]]);
        $$src$Test$Test$$test_each_dict($$Immutable$ImmutableRecord$$Record([["2", 1], ["1", 2]]), [["1", 2], ["2", 1]]);

        var corge = $$Immutable$ImmutableRecord$$Record({ corge: 3 });
        $$src$Test$Test$$test_each_dict($$Immutable$ImmutableRecord$$Record([["foo", 1], ["qux", corge], ["bar", 2]]), [["bar", 2], ["foo", 1], ["qux", corge]]);
      });

      // TODO
      /*test("zip", function () {
        var a = [["a", 1], ["b", 2], ["c", 3], ["d", 4],
                 ["e", 5], ["f", 6], ["g", 7], ["h", 8]];
        assert.equal(toArray(zip(Dict(a))), toArray(zip(a)));
      });*/
    });


    $$src$Test$Test$$context("Ref", function () {
      var ref1 = $$Immutable$MutableRef$$Ref(1);
      var ref2 = $$Immutable$MutableRef$$Ref(2);

      $$src$Test$Test$$test("isRef", function () {
        $$assert$$assert(!$$Immutable$MutableRef$$isRef($$Immutable$ImmutableDict$$Dict()));
        $$assert$$assert($$Immutable$MutableRef$$isRef(ref1));
        $$assert$$assert($$Immutable$MutableRef$$isRef(ref2));
      });

      $$src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + ref1 === "(Ref 1)");
        $$assert$$assert("" + ref2 === "(Ref 2)");
        $$assert$$assert("" + $$Immutable$MutableRef$$Ref(50) === "(Ref 3)");
        $$assert$$assert("" + $$Immutable$MutableRef$$Ref([100]) === "(Ref 4)");
      });

      $$src$Test$Test$$test("init", function () {
        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$MutableRef$$Ref();
        }, "Expected 1 to 2 arguments but got 0");

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$MutableRef$$Ref(1, 2, 3);
        }, "Expected 1 to 2 arguments but got 3");
      });

      $$src$Test$Test$$test("get", function () {
        $$assert$$assert(ref1.get() === 1);
        $$assert$$assert(ref2.get() === 2);
      });

      $$src$Test$Test$$test("set", function () {
        $$assert$$assert(ref1.get() === 1);
        ref1.set(50);
        $$assert$$assert(ref1.get() === 50);

        var ran1 = false;

        var x = $$Immutable$MutableRef$$Ref(5, function (before, after) {
          $$assert$$assert(ran1 === false);
          $$assert$$assert(before === 5);
          $$assert$$assert(after === 10);
          ran1 = true;
          return after + 1;
        });

        $$assert$$assert(x.get() === 5);
        $$assert$$assert(ran1 === false);

        x.set(10);

        $$assert$$assert(x.get() === 11);
        $$assert$$assert(ran1 === true);


        var ran2 = false;

        var x = $$Immutable$MutableRef$$Ref(5, function (before, after) {
          $$assert$$assert(ran2 === false);
          ran2 = true;
          return before;
        });

        $$assert$$assert(x.get() === 5);
        $$assert$$assert(ran2 === false);

        x.set(5);

        $$assert$$assert(x.get() === 5);
        $$assert$$assert(ran2 === true);


        var ran3 = false;
        var ran4 = false;

        var x = $$Immutable$MutableRef$$Ref(5, function (before, after) {
          $$assert$$assert(ran4 === false);

          if (ran3 === false) {
            $$assert$$assert(x.get() === 5);
            $$assert$$assert(before === 5);
            $$assert$$assert(after === 10);

            ran3 = true;

            x.set(20);

            $$assert$$assert(x.get() === 25);
            $$assert$$assert(ran4 === true);
            return x.get();

          } else {
            $$assert$$assert(x.get() === 5);
            $$assert$$assert(before === 5);
            $$assert$$assert(after === 20);

            ran4 = true;
            return after + 5;
          }
        });

        $$assert$$assert(x.get() === 5);
        $$assert$$assert(ran3 === false);
        $$assert$$assert(ran4 === false);

        x.set(10);

        $$assert$$assert(x.get() === 25);
        $$assert$$assert(ran3 === true);
        $$assert$$assert(ran4 === true);
      });

      $$src$Test$Test$$test("modify", function () {
        var ran1 = false;
        var ran2 = false;

        var x = $$Immutable$MutableRef$$Ref(5, function (before, after) {
          $$assert$$assert(ran1 === false);
          $$assert$$assert(before === 5);
          $$assert$$assert(after === 10);
          ran1 = true;
          return after + 1;
        });

        $$assert$$assert(x.get() === 5);
        $$assert$$assert(ran1 === false);
        $$assert$$assert(ran2 === false);

        x.modify(function (x) {
          $$assert$$assert(x === 5);
          ran2 = true;
          return 10;
        });

        $$assert$$assert(x.get() === 11);
        $$assert$$assert(ran1 === true);
        $$assert$$assert(ran2 === true);


        var ran3 = false;
        var ran4 = false;

        var x = $$Immutable$MutableRef$$Ref(5, function (before, after) {
          $$assert$$assert(ran3 === false);
          $$assert$$assert(before === 5);
          $$assert$$assert(after === 5);
          ran3 = true;
          return after;
        });

        $$assert$$assert(x.get() === 5);
        $$assert$$assert(ran3 === false);
        $$assert$$assert(ran4 === false);

        x.modify(function (x) {
          $$assert$$assert(x === 5);
          ran4 = true;
          return 5;
        });

        $$assert$$assert(x.get() === 5);
        $$assert$$assert(ran3 === true);
        $$assert$$assert(ran4 === true);
      });

      $$src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$Immutable$equal$$equal(ref1, ref2));
        $$assert$$assert($$Immutable$equal$$equal(ref1, ref1));
        $$assert$$assert($$Immutable$equal$$equal(ref2, ref2));

        $$assert$$assert(!$$Immutable$equal$$equal($$Immutable$MutableRef$$Ref(1), $$Immutable$MutableRef$$Ref(1)));
        $$assert$$assert(!$$Immutable$equal$$equal(ref1, $$Immutable$MutableRef$$Ref(1)));
      });
    });


    $$src$Test$Test$$context("Tag", function () {
      var tag1 = $$$Immutable$Tag$$Tag();
      var tag2 = $$$Immutable$Tag$$Tag();
      var uuid_tag1 = $$$Immutable$Tag$$UUIDTag("dc353abd-d920-4c17-b911-55bd1c78c06f");
      var uuid_tag2 = $$$Immutable$Tag$$UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4");

      $$src$Test$Test$$test("isTag", function () {
        $$assert$$assert(!$$$Immutable$Tag$$isTag("foo"));
        $$assert$$assert(!$$$Immutable$Tag$$isTag($$Immutable$ImmutableDict$$Dict()));
        $$assert$$assert($$$Immutable$Tag$$isTag(tag1));
        $$assert$$assert($$$Immutable$Tag$$isTag(tag2));
        $$assert$$assert($$$Immutable$Tag$$isTag(uuid_tag1));
        $$assert$$assert($$$Immutable$Tag$$isTag(uuid_tag2));

        $$assert$$assert(!$$$Immutable$Tag$$isUUIDTag("foo"));
        $$assert$$assert(!$$$Immutable$Tag$$isUUIDTag($$Immutable$ImmutableDict$$Dict()));
        $$assert$$assert(!$$$Immutable$Tag$$isUUIDTag(tag1));
        $$assert$$assert(!$$$Immutable$Tag$$isUUIDTag(tag2));
        $$assert$$assert($$$Immutable$Tag$$isUUIDTag(uuid_tag1));
        $$assert$$assert($$$Immutable$Tag$$isUUIDTag(uuid_tag2));
      });

      $$src$Test$Test$$test("toString", function () {
        $$assert$$assert("" + tag1 === "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");
        $$assert$$assert("" + tag2 === "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)");
        $$assert$$assert("" + $$$Immutable$Tag$$Tag() === "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 3)");
        $$assert$$assert("" + uuid_tag1 === "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)");
        $$assert$$assert("" + uuid_tag2 === "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)");
        $$assert$$assert("" + $$$Immutable$Tag$$UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4") === "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)");
      });

      $$src$Test$Test$$test("init", function () {
        $$src$Test$Test$$assert_raises(function () {
          $$$Immutable$Tag$$Tag(1);
        }, "Expected 0 arguments but got 1");

        $$src$Test$Test$$assert_raises(function () {
          $$$Immutable$Tag$$Tag(1, 2);
        }, "Expected 0 arguments but got 2");

        $$src$Test$Test$$assert_raises(function () {
          $$$Immutable$Tag$$UUIDTag();
        }, "Expected 1 argument but got 0");

        $$src$Test$Test$$assert_raises(function () {
          $$$Immutable$Tag$$UUIDTag(1, 2);
        }, "Expected 1 argument but got 2");

        $$src$Test$Test$$assert_raises(function () {
          $$$Immutable$Tag$$UUIDTag("foo");
        }, "Expected a lower-case UUID, but got: foo");
      });

      $$src$Test$Test$$test("equal", function () {
        $$assert$$assert(!$$Immutable$equal$$equal(tag1, tag2));
        $$assert$$assert(!$$Immutable$equal$$equal(tag1, uuid_tag1));
        $$assert$$assert($$Immutable$equal$$equal(tag1, tag1));
        $$assert$$assert($$Immutable$equal$$equal(tag2, tag2));

        $$assert$$assert(!$$Immutable$equal$$equal(uuid_tag1, uuid_tag2));
        $$assert$$assert($$Immutable$equal$$equal(uuid_tag1, uuid_tag1));
        $$assert$$assert($$Immutable$equal$$equal(uuid_tag2, uuid_tag2));

        $$assert$$assert($$Immutable$equal$$equal(uuid_tag2, $$$Immutable$Tag$$UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4")));

        $$assert$$assert(!$$Immutable$equal$$equal($$$Immutable$Tag$$Tag(), $$$Immutable$Tag$$Tag()));
        $$assert$$assert(!$$Immutable$equal$$equal(tag1, $$$Immutable$Tag$$Tag()));
      });

      $$src$Test$Test$$test("===", function () {
        $$assert$$assert(tag1 !== tag2);
        $$assert$$assert(tag1 !== uuid_tag1);
        $$assert$$assert(tag1 === tag1);
        $$assert$$assert(tag2 === tag2);

        $$assert$$assert(uuid_tag1 !== uuid_tag2);
        $$assert$$assert(uuid_tag1 === uuid_tag1);
        $$assert$$assert(uuid_tag2 === uuid_tag2);

        $$assert$$assert(uuid_tag2 === $$$Immutable$Tag$$UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4"));

        $$assert$$assert($$$Immutable$Tag$$Tag() !== $$$Immutable$Tag$$Tag());
        $$assert$$assert(tag1 !== $$$Immutable$Tag$$Tag());
      });

      $$src$Test$Test$$test("Dict", function () {
        var x = $$Immutable$ImmutableDict$$Dict();

        x = x.set(tag1, 1);
        x = x.set(tag2, 2);
        x = x.set(uuid_tag1, 3);
        x = x.set(uuid_tag2, 4);

        $$assert$$assert(x.get(tag1) === 1);
        $$assert$$assert(x.get(tag2) === 2);
        $$assert$$assert(x.get(uuid_tag1) === 3);
        $$assert$$assert(x.get(uuid_tag2) === 4);

        $$assert$$assert("" + x === "(Dict\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)   = 1\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)   = 2\n  (UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4) = 4\n  (UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f) = 3)");
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(x), {
          "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)": 1,
          "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)": 2,
          "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)": 4,
          "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)": 3
        }));
      });

      $$src$Test$Test$$test("Record", function () {
        var x = $$Immutable$ImmutableRecord$$Record([[tag1, 1], [tag2, 2], [uuid_tag1, 3], [uuid_tag2, 4]]);

        $$assert$$assert(x.get(tag1) === 1);
        $$assert$$assert(x.get(tag2) === 2);
        $$assert$$assert(x.get(uuid_tag1) === 3);
        $$assert$$assert(x.get(uuid_tag2) === 4);

        $$assert$$assert("" + x === "(Record\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)   = 1\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)   = 2\n  (UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4) = 4\n  (UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f) = 3)");
        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(x), {
          "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)": 1,
          "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)": 2,
          "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)": 3,
          "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)": 4
        }));
      });

      $$src$Test$Test$$test("toJS", function () {
        $$assert$$assert($$Immutable$toJS$$toJS(tag1) === tag1);
        $$assert$$assert($$Immutable$toJS$$toJS(uuid_tag1) === uuid_tag1);

        $$assert$$assert($$Immutable$toJS$$fromJS(tag1) === tag1);
        $$assert$$assert($$Immutable$toJS$$fromJS(uuid_tag1) === uuid_tag1);
      });

      $$src$Test$Test$$test("toJSON", function () {
        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$toJSON$$toJSON(tag1);
        }, "Cannot convert Tag to JSON, use UUIDTag instead: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");

        $$assert$$assert($$Immutable$toJSON$$toJSON(uuid_tag1) === uuid_tag1);

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$toJSON$$fromJSON(tag1);
        }, "Cannot convert Tag from JSON, use UUIDTag instead: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");

        $$assert$$assert($$Immutable$toJSON$$fromJSON(uuid_tag1) === uuid_tag1);


        var x = $$Immutable$ImmutableDict$$Dict([[tag1, 1]]);

        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(x), { "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)": 1 }));

        $$src$Test$Test$$assert_raises(function () {
          $$Immutable$toJSON$$toJSON(x);
        }, "Cannot convert Tag to JSON, use UUIDTag instead: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");


        var x = $$Immutable$ImmutableDict$$Dict([[uuid_tag1, 1]]);

        $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(x), { "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)": 1 }));

        $$assert$$assert($$Immutable$equal$$equal($$Immutable$toJSON$$fromJSON($$Immutable$toJSON$$toJSON(x)), x));
      });
    });


    $$src$Test$Test$$test("isImmutable", function () {
      $$assert$$assert(!$$$Immutable$$isImmutable({}));
      $$assert$$assert(!$$$Immutable$$isImmutable([]));
      $$assert$$assert(!$$$Immutable$$isImmutable($$Immutable$MutableRef$$Ref(5)));

      $$assert$$assert($$$Immutable$$isImmutable(null));
      $$assert$$assert($$$Immutable$$isImmutable(5));
      $$assert$$assert($$$Immutable$$isImmutable("foo"));
      $$assert$$assert($$$Immutable$$isImmutable(Object.freeze({})));
      $$assert$$assert($$$Immutable$$isImmutable($$Immutable$ImmutableDict$$Dict()));
      $$assert$$assert($$$Immutable$$isImmutable($$Immutable$ImmutableSet$$Set()));
      $$assert$$assert($$$Immutable$$isImmutable($$$Immutable$ImmutableList$$List()));
      $$assert$$assert($$$Immutable$$isImmutable($$Immutable$ImmutableQueue$$Queue()));
      $$assert$$assert($$$Immutable$$isImmutable($$Immutable$ImmutableStack$$Stack()));
      $$assert$$assert($$$Immutable$$isImmutable($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort)));
      $$assert$$assert($$$Immutable$$isImmutable($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort)));
      $$assert$$assert($$$Immutable$$isImmutable($$$Immutable$Tag$$Tag()));
      $$assert$$assert($$$Immutable$$isImmutable($$Immutable$ImmutableTuple$$Tuple()));
      $$assert$$assert($$$Immutable$$isImmutable($$$Immutable$Tag$$UUIDTag("051eca86-038c-43c8-85cf-01e20f394501")));

      var Foo = $$Immutable$ImmutableRecord$$Record({});
      $$assert$$assert($$$Immutable$$isImmutable(Foo));
    });

    $$src$Test$Test$$test("isIterable", function () {
      $$assert$$assert(!$$Immutable$iter$$isIterable({}));
      $$assert$$assert(!$$Immutable$iter$$isIterable($$Immutable$MutableRef$$Ref(5)));
      $$assert$$assert(!$$Immutable$iter$$isIterable(5));
      $$assert$$assert(!$$Immutable$iter$$isIterable(null));
      $$assert$$assert(!$$Immutable$iter$$isIterable(Object.freeze({})));
      $$assert$$assert(!$$Immutable$iter$$isIterable($$$Immutable$Tag$$Tag()));
      $$assert$$assert(!$$Immutable$iter$$isIterable($$$Immutable$Tag$$UUIDTag("051eca86-038c-43c8-85cf-01e20f394501")));

      $$assert$$assert($$Immutable$iter$$isIterable([]));
      $$assert$$assert($$Immutable$iter$$isIterable("foo"));
      $$assert$$assert($$Immutable$iter$$isIterable($$Immutable$ImmutableDict$$Dict()));
      $$assert$$assert($$Immutable$iter$$isIterable($$Immutable$ImmutableSet$$Set()));
      $$assert$$assert($$Immutable$iter$$isIterable($$$Immutable$ImmutableList$$List()));
      $$assert$$assert($$Immutable$iter$$isIterable($$Immutable$ImmutableQueue$$Queue()));
      $$assert$$assert($$Immutable$iter$$isIterable($$Immutable$ImmutableStack$$Stack()));
      $$assert$$assert($$Immutable$iter$$isIterable($$Immutable$ImmutableDict$$SortedDict($$Immutable$Sorted$$simpleSort)));
      $$assert$$assert($$Immutable$iter$$isIterable($$Immutable$ImmutableSet$$SortedSet($$Immutable$Sorted$$simpleSort)));
      $$assert$$assert($$Immutable$iter$$isIterable($$Immutable$ImmutableTuple$$Tuple()));

      var Foo = $$Immutable$ImmutableRecord$$Record({});
      $$assert$$assert($$Immutable$iter$$isIterable(Foo));
    });

    $$src$Test$Test$$test("toJS", function () {
      var x = { foo: 1 };
      $$assert$$assert($$Immutable$toJS$$toJS(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(x), { foo: 1 }));

      var x = Object.create(null);
      $$assert$$assert($$Immutable$toJS$$toJS(x) === x);

      var x = [5];
      $$assert$$assert($$Immutable$toJS$$toJS(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(x), [5]));

      var x = new Date();
      $$assert$$assert($$Immutable$toJS$$toJS(x) === x);

      var x = /foo/;
      $$assert$$assert($$Immutable$toJS$$toJS(x) === x);

      $$assert$$assert($$Immutable$toJS$$toJS("foo") === "foo");
      $$assert$$assert($$Immutable$toJS$$toJS(5) === 5);

      var x = $$Immutable$MutableRef$$Ref(5);
      $$assert$$assert($$Immutable$toJS$$toJS(x) === x);

      function Foo() {
        this.bar = {};
      }
      var x = new Foo();
      $$assert$$assert($$Immutable$toJS$$toJS(x) === x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(x), new Foo()));


      var x = {
        foo: [$$Immutable$ImmutableTuple$$Tuple([$$Immutable$ImmutableSet$$Set([1]), 2, 3]), $$Immutable$ImmutableRecord$$Record({ foo: $$$Immutable$ImmutableList$$List([1]), bar: 2 })]
      };
      $$assert$$assert($$Immutable$toJS$$toJS(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$toJS(x), { foo: [[[1], 2, 3], { foo: [1], bar: 2 }] }));
    });

    $$src$Test$Test$$test("fromJS", function () {
      $$src$Test$Test$$verify_dict($$Immutable$toJS$$fromJS({ foo: 1 }), { foo: 1 });
      $$src$Test$Test$$verify_list($$Immutable$toJS$$fromJS([1, 2, 3]), [1, 2, 3]);

      $$src$Test$Test$$verify_dict($$Immutable$toJS$$fromJS({ foo: { bar: 1 } }), { foo: { bar: 1 } });
      $$src$Test$Test$$verify_list($$Immutable$toJS$$fromJS([1, [2], 3]), [1, [2], 3]);

      $$src$Test$Test$$verify_dict($$Immutable$toJS$$fromJS({ foo: { bar: 1 } }).get("foo"), { bar: 1 });
      $$src$Test$Test$$verify_list($$Immutable$toJS$$fromJS([1, [2], 3]).get(1), [2]);

      var x = Object.create(null);
      $$assert$$assert($$Immutable$toJS$$fromJS(x) === x);

      var x = new Date();
      $$assert$$assert($$Immutable$toJS$$fromJS(x) === x);

      var x = /foo/;
      $$assert$$assert($$Immutable$toJS$$fromJS(x) === x);

      $$assert$$assert($$Immutable$toJS$$fromJS("foo") === "foo");
      $$assert$$assert($$Immutable$toJS$$fromJS(5) === 5);

      var x = $$Immutable$MutableRef$$Ref(5);
      $$assert$$assert($$Immutable$toJS$$fromJS(x) === x);

      function Foo() {
        this.bar = {};
      }
      var x = new Foo();
      $$assert$$assert($$Immutable$toJS$$fromJS(x) === x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJS$$fromJS(x), new Foo()));
    });

    $$src$Test$Test$$test("toJSON", function () {
      var x = { foo: 1 };
      $$assert$$assert($$Immutable$toJSON$$toJSON(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJSON$$toJSON(x), { foo: 1 }));

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$toJSON(Object.create(null));
      }, "Cannot convert object to primitive value");

      var x = [5];
      $$assert$$assert($$Immutable$toJSON$$toJSON(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJSON$$toJSON(x), [5]));

      $$assert$$assert($$Immutable$toJSON$$toJSON("foo") === "foo");
      $$assert$$assert($$Immutable$toJSON$$toJSON(5) === 5);
      $$assert$$assert($$Immutable$toJSON$$toJSON(5.5) === 5.5);
      $$assert$$assert($$Immutable$toJSON$$toJSON(true) === true);
      $$assert$$assert($$Immutable$toJSON$$toJSON(null) === null);

      var x = new Date(2000, 0, 1);
      $$assert$$assert($$Immutable$toJSON$$toJSON(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJSON$$toJSON(x), "2000-01-01T10:00:00.000Z"));

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$toJSON(/foo/);
      }, "Cannot convert to JSON: /foo/");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$toJSON(NaN);
      }, "Cannot convert to JSON: NaN");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$toJSON(Infinity);
      }, "Cannot convert to JSON: Infinity");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$toJSON(-Infinity);
      }, "Cannot convert to JSON: -Infinity");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$toJSON(undefined);
      }, "Cannot convert to JSON: undefined");

      $$src$Test$Test$$assert_raises(function () {
        function Foo() {
          this.foo = 1;
        }
        var x = new Foo();
        $$Immutable$toJSON$$toJSON(x);
      }, "Cannot convert to JSON: [object Object]");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$toJSON($$Immutable$MutableRef$$Ref(5));
      }, "Cannot convert to JSON: (Ref 17)");


      var x = {};
      x.toJSON = function () {
        return "foo";
      };

      $$assert$$assert($$Immutable$toJSON$$toJSON(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJSON$$toJSON(x), "foo"));


      var x = {};
      x.toJSON = function () {
        return function (){};
      };

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$toJSON(x);
      }, "Cannot convert to JSON: function (){}");


      var x = {};
      x.toJSON = 5;
      $$assert$$assert($$Immutable$toJSON$$toJSON(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJSON$$toJSON(x), { toJSON: 5 }));


      var x = {
        test: [$$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), $$Immutable$ImmutableRecord$$Record({ foo: 1, bar: 2 })]
      };
      $$assert$$assert($$Immutable$toJSON$$toJSON(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJSON$$toJSON(x), {
        test: [$$Immutable$toJSON$$toJSON($$Immutable$ImmutableTuple$$Tuple([1, 2, 3])), $$Immutable$toJSON$$toJSON($$Immutable$ImmutableRecord$$Record({ foo: 1, bar: 2 }))]
      }));

      $$assert$$assert(JSON.stringify($$Immutable$ImmutableRecord$$Record({ foo: 1})) === '{"(UUIDTag 89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37)":"Record","keys":["foo"],"values":[1]}');
      $$assert$$assert($$src$Test$Test$$deepEqual(JSON.stringify($$Immutable$ImmutableRecord$$Record({ foo: 1})),
                       JSON.stringify($$Immutable$toJSON$$toJSON($$Immutable$ImmutableRecord$$Record({ foo: 1 })))));
    });

    $$src$Test$Test$$test("fromJSON", function () {
      var x = { foo: 1 };
      $$assert$$assert($$Immutable$toJSON$$fromJSON(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJSON$$fromJSON(x), { foo: 1 }));

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$fromJSON(Object.create(null));
      }, "Cannot convert object to primitive value");

      var x = [5];
      $$assert$$assert($$Immutable$toJSON$$fromJSON(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJSON$$fromJSON(x), [5]));

      $$assert$$assert($$Immutable$toJSON$$fromJSON("foo") === "foo");
      $$assert$$assert($$Immutable$toJSON$$fromJSON(5) === 5);
      $$assert$$assert($$Immutable$toJSON$$fromJSON(5.5) === 5.5);
      $$assert$$assert($$Immutable$toJSON$$fromJSON(true) === true);
      $$assert$$assert($$Immutable$toJSON$$fromJSON(null) === null);

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$fromJSON(new Date(2000, 0, 1));
      }, "Cannot convert from JSON: Sat Jan 01 2000 00:00:00 GMT-1000 (HST)");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$fromJSON(/foo/);
      }, "Cannot convert from JSON: /foo/");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$fromJSON(NaN);
      }, "Cannot convert from JSON: NaN");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$fromJSON(Infinity);
      }, "Cannot convert from JSON: Infinity");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$fromJSON(-Infinity);
      }, "Cannot convert from JSON: -Infinity");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$fromJSON(undefined);
      }, "Cannot convert from JSON: undefined");

      $$src$Test$Test$$assert_raises(function () {
        function Foo() {
          this.foo = 1;
        }
        var x = new Foo();
        $$Immutable$toJSON$$fromJSON(x);
      }, "Cannot convert from JSON: [object Object]");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$toJSON$$fromJSON($$Immutable$MutableRef$$Ref(5));
      }, "Cannot convert from JSON: (Ref 18)");


      var x = $$Immutable$toJSON$$toJSON({
        test: [$$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), $$Immutable$ImmutableRecord$$Record({ foo: 1, bar: 2 })]
      });
      $$assert$$assert($$Immutable$toJSON$$fromJSON(x) !== x);
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$toJSON$$fromJSON(x), {
        test: [$$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), $$Immutable$ImmutableRecord$$Record({ foo: 1, bar: 2 })]
      }));
      $$assert$$assert($$Immutable$equal$$equal($$Immutable$toJSON$$fromJSON(x.test[0]), $$Immutable$ImmutableTuple$$Tuple([1, 2, 3])));
      $$assert$$assert($$Immutable$equal$$equal($$Immutable$toJSON$$fromJSON(x.test[1]), $$Immutable$ImmutableRecord$$Record({ foo: 1, bar: 2 })));
    });

    $$src$Test$Test$$test("deref", function () {
      $$assert$$assert($$Immutable$MutableRef$$deref(5) === 5);

      var x = $$Immutable$ImmutableDict$$Dict();
      $$assert$$assert($$Immutable$MutableRef$$deref(x) === x);

      $$assert$$assert($$Immutable$MutableRef$$deref($$Immutable$MutableRef$$Ref(5)) === 5);
      $$assert$$assert($$Immutable$MutableRef$$deref($$Immutable$MutableRef$$Ref(x)) === x);
    });


    $$src$Test$Test$$test("each", function () {
      var ran = false;

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$iter$$each($$$Immutable$Tag$$Tag(), function () {
          ran = true;
        });
      }, "Cannot iter: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 12)");

      $$assert$$assert(ran === false);


      var ran = false;
      $$Immutable$iter$$each([], function () {
        ran = true;
      });
      $$assert$$assert(ran === false);

      var a = [];

      $$Immutable$iter$$each([1, 2, 3], function (x) {
        a.push(x);
      });

      $$assert$$assert($$src$Test$Test$$deepEqual(a, [1, 2, 3]));


      var a = [];

      $$Immutable$iter$$each("foo", function (x) {
        a.push(x);
      });

      $$assert$$assert($$src$Test$Test$$deepEqual(a, ["f", "o", "o"]));


      var a = [];

      $$Immutable$iter$$each($$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), function (x) {
        a.push(x);
      });

      $$assert$$assert($$src$Test$Test$$deepEqual(a, [1, 2, 3]));


      var a = [];

      $$Immutable$iter$$each($$Immutable$ImmutableRecord$$Record([["foo", 1], ["bar", 2]]), function (x) {
        $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
        a.push($$Immutable$toJS$$toJS(x));
      });

      $$assert$$assert($$src$Test$Test$$deepEqual(a, [["bar", 2], ["foo", 1]]));
    });

    $$src$Test$Test$$test("map", function () {
      var x = $$Immutable$iter$$map([], function (x) { return x + 10 });
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), []));

      var x = $$Immutable$iter$$map([1, 2, 3], function (x) { return x + 10 });
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [11, 12, 13]));

      var x = $$Immutable$iter$$map($$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), function (x) { return x + 10 });
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [11, 12, 13]));

      var x = $$Immutable$iter$$map($$Immutable$ImmutableRecord$$Record([["foo", 1], ["bar", 2]]), function (x) { return [x.get(0), x.get(1) + 10] });
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [["bar", 12], ["foo", 11]]));
    });

    $$src$Test$Test$$test("keep", function () {
      var x = $$Immutable$iter$$keep([], function (x) { return x > 3 });
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), []));

      var x = $$Immutable$iter$$keep([1, 2, 3, 4, 5], function (x) { return x > 3 });
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [4, 5]));
    });

    $$src$Test$Test$$test("any", function () {
      $$assert$$assert($$Immutable$iter$$any([], function (x) { return x > 3 }) === false);
      $$assert$$assert($$Immutable$iter$$any([1, 2, 3], function (x) { return x > 3 }) === false);
      $$assert$$assert($$Immutable$iter$$any([1, 2, 3, 4], function (x) { return x > 3 }) === true);
    });

    $$src$Test$Test$$test("all", function () {
      $$assert$$assert($$Immutable$iter$$all([], function (x) { return x < 3 }) === true);
      $$assert$$assert($$Immutable$iter$$all([1, 2], function (x) { return x < 3 }) === true);
      $$assert$$assert($$Immutable$iter$$all([1, 2, 3], function (x) { return x < 3 }) === false);
    });

    $$src$Test$Test$$test("partition", function () {
      var x = $$Immutable$iter$$partition([], function (x) {
        return x < 5;
      });

      $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
      var yes = x.get(0);
      var no  = x.get(1);
      $$assert$$assert(!Array.isArray(yes));
      $$assert$$assert(!Array.isArray(no));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(yes), []));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(no), []));


      var x = $$Immutable$iter$$partition([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], function (x) {
        return x < 5;
      });

      $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
      var yes = x.get(0);
      var no  = x.get(1);
      $$assert$$assert(!Array.isArray(yes));
      $$assert$$assert(!Array.isArray(no));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(yes), [1, 2, 3, 4, 0]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(no), [5, 6, 7, 8, 9]));


      var x = $$Immutable$iter$$partition([1, 2, 3, 4], function (x) {
        return x < 5;
      });

      $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
      var yes = x.get(0);
      var no  = x.get(1);
      $$assert$$assert(!Array.isArray(yes));
      $$assert$$assert(!Array.isArray(no));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(yes), [1, 2, 3, 4]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(no), []));


      var x = $$Immutable$iter$$partition([5, 6, 7, 8, 9], function (x) {
        return x < 5;
      });

      $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
      var yes = x.get(0);
      var no  = x.get(1);
      $$assert$$assert(!Array.isArray(yes));
      $$assert$$assert(!Array.isArray(no));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(yes), []));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(no), [5, 6, 7, 8, 9]));
    });

    $$src$Test$Test$$test("toIterator", function () {
      var iterator = $$Immutable$iter$$toIterator([1, 2, 3]);
      $$assert$$assert(typeof iterator.next === "function");
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 1 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 2 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 3 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { done: true }));


      var iterator = $$Immutable$iter$$toIterator($$$Immutable$ImmutableList$$List([1, 2, 3]));
      $$assert$$assert(typeof iterator.next === "function");
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 1 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 2 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 3 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { done: true }));
    });

    $$src$Test$Test$$test("Iterable", function () {
      var iterable = $$Immutable$iter$$Iterable(function () {
        $$assert$$assert(this === void 0);

        var i = 0;
        return {
          next: function () {
            if (i < 4) {
              return { value: i++ };
            } else {
              return { done: true };
            }
          }
        };
      });

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(iterable), [0, 1, 2, 3]));

      var iterator = $$Immutable$iter$$toIterator(iterable);
      $$assert$$assert(typeof iterator.next === "function");
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 0 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 1 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 2 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { value: 3 }));
      $$assert$$assert($$src$Test$Test$$deepEqual(iterator.next(), { done: true }));
    });

    $$src$Test$Test$$test("findIndex", function () {
      var x = $$Immutable$iter$$findIndex([1, 2, 3, 4, 5], function (x) { return x > 3 });
      $$assert$$assert(x === 3);

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$iter$$findIndex([1, 2, 3, 4, 5], function (x) { return x > 5 });
      }, "Did not find anything");

      var x = $$Immutable$iter$$findIndex([1, 2, 3, 4, 5], function (x) { return x > 5 }, 500);
      $$assert$$assert(x === 500);
    });

    $$src$Test$Test$$test("indexOf", function () {
      var x = $$Immutable$iter$$indexOf([1, 2, 3, 4, 5], 4);
      $$assert$$assert(x === 3);

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$iter$$indexOf([1, 2, 3, 4, 5], 6);
      }, "Did not find anything");

      var x = $$Immutable$iter$$indexOf([1, 2, 3, 4, 5], 6, 500);
      $$assert$$assert(x === 500);

      var x = [$$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), $$Immutable$ImmutableRecord$$Record({ foo: 1, bar: 2 })];

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$iter$$indexOf(x, $$Immutable$ImmutableTuple$$Tuple([1, 2, 4]))
      }, "Did not find anything");

      $$assert$$assert($$Immutable$iter$$indexOf(x, $$Immutable$ImmutableTuple$$Tuple([1, 2, 4]), -1) === -1);
      $$assert$$assert($$Immutable$iter$$indexOf(x, $$Immutable$ImmutableTuple$$Tuple([1, 2, 3])) === 0);
    });

    $$src$Test$Test$$test("find", function () {
      var x = $$Immutable$iter$$find([1, 2, 3, 4, 5], function (x) { return x > 3 });
      $$assert$$assert(x === 4);

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$iter$$find([1, 2, 3, 4, 5], function (x) { return x > 5 });
      }, "Did not find anything");

      var x = $$Immutable$iter$$find([1, 2, 3, 4, 5], function (x) { return x > 5 }, 500);
      $$assert$$assert(x === 500);
    });

    $$src$Test$Test$$test("reverse", function () {
      var x = $$Immutable$iter$$reverse([]);
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), []));

      var x = $$Immutable$iter$$reverse([1, 2, 3]);
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [3, 2, 1]));

      var x = $$Immutable$iter$$reverse($$Immutable$ImmutableTuple$$Tuple([1, 2, 3]));
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [3, 2, 1]));

      var x = $$Immutable$iter$$reverse($$Immutable$iter$$map($$Immutable$ImmutableRecord$$Record([["bar", 2], ["foo", 1]]), function (x) {
        $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
        return $$Immutable$iter$$toArray(x);
      }));
      $$assert$$assert(!Array.isArray(x));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [["foo", 1], ["bar", 2]]));
    });

    $$src$Test$Test$$test("foldl", function () {
      var init = "0";
      var ran = false;
      var out = $$Immutable$iter$$foldl(["1", "2", "3"], init, function (x, y) {
        $$assert$$assert(x === init);
        $$assert$$assert(y === "1" || y === "2" || y === "3");
        ran = true;
        init = "(" + x + " " + y + ")";
        return init;
      });
      $$assert$$assert(out === init);
      $$assert$$assert(out === "(((0 1) 2) 3)");
      $$assert$$assert(ran === true);


      var init = 0;
      var ran = false;
      var out = $$Immutable$iter$$foldl([], init, function () {
        ran = true;
      });

      $$assert$$assert(out === init);
      $$assert$$assert(ran === false);
    });

    $$src$Test$Test$$test("foldr", function () {
      var init = "0";
      var ran = false;
      var out = $$Immutable$iter$$foldr(["1", "2", "3"], init, function (x, y) {
        $$assert$$assert(y === init);
        $$assert$$assert(x === "1" || x === "2" || x === "3");
        ran = true;
        init = "(" + x + " " + y + ")";
        return init;
      });
      $$assert$$assert(out === init);
      $$assert$$assert(out === "(1 (2 (3 0)))");
      $$assert$$assert(ran === true);


      var init = 0;
      var ran = false;
      var out = $$Immutable$iter$$foldr([], init, function () {
        ran = true;
      });

      $$assert$$assert(out === init);
      $$assert$$assert(ran === false);
    });

    $$src$Test$Test$$test("join", function () {
      $$assert$$assert($$Immutable$iter$$join([]) === "");
      $$assert$$assert($$Immutable$iter$$join([], " ") === "");
      $$assert$$assert($$Immutable$iter$$join([1, 2, 3]) === "123");
      $$assert$$assert($$Immutable$iter$$join("123") === "123");
      $$assert$$assert($$Immutable$iter$$join($$Immutable$ImmutableTuple$$Tuple([1, 2, 3])) === "123");
      $$assert$$assert($$Immutable$iter$$join([1, 2, 3], " ") === "1 2 3");
      $$assert$$assert($$Immutable$iter$$join("123", " ") === "1 2 3");
      $$assert$$assert($$Immutable$iter$$join("123", " --- ") === "1 --- 2 --- 3");
    });

    $$src$Test$Test$$test("zip", function () {
      function mapper(x) {
        $$assert$$assert(!Array.isArray(x));

        x = $$Immutable$iter$$map(x, function (x) {
          $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
          return $$Immutable$iter$$toArray(x);
        });

        $$assert$$assert(!Array.isArray(x));

        return x;
      }

      var x = mapper($$Immutable$iter$$zip([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

      var x = mapper($$Immutable$iter$$zip($$$Immutable$ImmutableList$$List([$$$Immutable$ImmutableList$$List([1, 2, 3]), $$$Immutable$ImmutableList$$List([4, 5, 6]), $$$Immutable$ImmutableList$$List([7, 8, 9])])));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

      var x = mapper($$Immutable$iter$$zip($$Immutable$ImmutableTuple$$Tuple([$$Immutable$ImmutableTuple$$Tuple([1, 2, 3]), $$Immutable$ImmutableTuple$$Tuple([4, 5, 6]), $$Immutable$ImmutableTuple$$Tuple([7, 8, 9])])));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));


      var x = mapper($$Immutable$iter$$zip([[1, 2, 3, 0], [4, 5, 6], [7, 8, 9]]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

      var x = mapper($$Immutable$iter$$zip([[1, 2, 3], [4, 5, 6, 0], [7, 8, 9]]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

      var x = mapper($$Immutable$iter$$zip([[1, 2, 3], [4, 5, 6], [7, 8, 9, 0]]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

      var x = mapper($$Immutable$iter$$zip([[1, 2, 3, 0], [4, 5, 6], [7, 8, 9, 0]]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));

      var x = mapper($$Immutable$iter$$zip([[1, 2, 3, 0], [4, 5, 6, 0], [7, 8, 9]]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]));


      var x = mapper($$Immutable$iter$$zip([[1, 2, 3, 0], [4, 5, 6], [7, 8, 9]], 50));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [0, 50, 50]]));

      var x = mapper($$Immutable$iter$$zip([[1, 2, 3], [4, 5, 6, 0], [7, 8, 9]], 50));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [50, 0, 50]]));

      var x = mapper($$Immutable$iter$$zip([[1, 2, 3], [4, 5, 6], [7, 8, 9, 0]], 50));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [50, 50, 0]]));

      var x = mapper($$Immutable$iter$$zip([[1, 2, 3, 0], [4, 5, 6], [7, 8, 9, 0]], 50));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [0, 50, 0]]));

      var x = mapper($$Immutable$iter$$zip([[1, 2, 3, 0], [4, 5, 6, 0], [7, 8, 9]], 50));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [[1, 4, 7], [2, 5, 8], [3, 6, 9], [0, 0, 50]]));
    });

    $$src$Test$Test$$test("toArray", function () {
      var x = [1, 2, 3, 4, 5];
      $$assert$$assert($$Immutable$iter$$toArray(x) === x);

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray("foo"), ["f", "o", "o"]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$ImmutableTuple$$Tuple([1, 2, 3])), [1, 2, 3]));

      var x = $$Immutable$iter$$map($$Immutable$ImmutableRecord$$Record([["foo", 1], ["bar", 2]]), function (x) {
        $$assert$$assert($$Immutable$ImmutableTuple$$isTuple(x));
        return $$Immutable$iter$$toArray(x);
      });
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray(x), [["bar", 2], ["foo", 1]]));
    });

    $$src$Test$Test$$test("take", function () {
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$take([1, 2, 3, 4, 5], 0)), []));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$take([1, 2, 3, 4, 5], 2)), [1, 2]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$take([1, 2, 3, 4, 5], 200)), [1, 2, 3, 4, 5]));

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$iter$$take([1, 2, 3, 4, 5], -5);
      }, "Count cannot be negative");

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$iter$$take([1, 2, 3, 4, 5], 5.1);
      }, "Count must be an integer");
    });

    $$src$Test$Test$$test("range", function () {
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$take($$Immutable$iter$$range(), 12)), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$take($$Immutable$iter$$range(6), 12)), [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(0, 10)), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(5, 5)), []));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(4, 5)), [4]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(5, 4)), [5]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(10, 0)), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(0, 10, 2)), [0, 2, 4, 6, 8]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(10, 0, 2)), [10, 8, 6, 4, 2]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(4.2, 6.9, 0.5)), [4.2, 4.7, 5.2, 5.7, 6.2, 6.7]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(-10, -2)), [-10, -9, -8, -7, -6, -5, -4, -3]));

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(-0, 0)), []));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(0, -0)), []));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(0, 1)), [0]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(-0, 1)), [-0]));

      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$range(0, 0.5, 0.1)), [0, 0.1, 0.2, 0.30000000000000004, 0.4]));
      $$assert$$assert($$src$Test$Test$$deepEqual($$Immutable$iter$$toArray($$Immutable$iter$$take($$Immutable$iter$$range(5, 4, 0), 5)), [5, 5, 5, 5, 5]));

      $$src$Test$Test$$assert_raises(function () {
        $$Immutable$iter$$range(5, 4, -1);
      }, "Step cannot be negative");
    });

    $$src$Test$Test$$test("equal", function () {
      $$assert$$assert($$Immutable$equal$$equal(0, 0));
      $$assert$$assert($$Immutable$equal$$equal(-0, -0));
      $$assert$$assert($$Immutable$equal$$equal(0, -0));
      $$assert$$assert($$Immutable$equal$$equal(-0, 0));
      $$assert$$assert($$Immutable$equal$$equal(1, 1));
      $$assert$$assert($$Immutable$equal$$equal(null, null));
      $$assert$$assert($$Immutable$equal$$equal(void 0, void 0));
      $$assert$$assert($$Immutable$equal$$equal(NaN, NaN));
      $$assert$$assert($$Immutable$equal$$equal(true, true));
      $$assert$$assert($$Immutable$equal$$equal(false, false));
      $$assert$$assert($$Immutable$equal$$equal("foo", "foo"));

      var x = {};
      $$assert$$assert($$Immutable$equal$$equal(x, x));

      $$assert$$assert(!$$Immutable$equal$$equal(1, 2));
      $$assert$$assert(!$$Immutable$equal$$equal(null, void 0));
      $$assert$$assert(!$$Immutable$equal$$equal(void 0, null));
      $$assert$$assert(!$$Immutable$equal$$equal(NaN, 0));
      $$assert$$assert(!$$Immutable$equal$$equal(NaN, 1));
      $$assert$$assert(!$$Immutable$equal$$equal(NaN, "foo"));
      $$assert$$assert(!$$Immutable$equal$$equal(true, false));
      $$assert$$assert(!$$Immutable$equal$$equal(false, true));
      $$assert$$assert(!$$Immutable$equal$$equal("foo", "foo2"));
      $$assert$$assert(!$$Immutable$equal$$equal({}, {}));
    });


    var $$src$Test$Test$$time_end = Date.now();

    console.log("SUCCEEDED: " + $$src$Test$Test$$TESTS_SUCCEEDED + ", FAILED: " + $$src$Test$Test$$TESTS_FAILED + ", TOOK: " + ($$src$Test$Test$$time_end - $$src$Test$Test$$time_start) + "ms");
}).call(this);

//# sourceMappingURL=Test.js.map