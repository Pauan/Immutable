/**
 * @license
 *
 * Version 6.1.1
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
    var $$Immutable$Tag$$tag_uuid = "48de6fff-9d11-472d-a76f-ed77a59a5cbc";
    var $$Immutable$Tag$$tag_id = 0;

    var $$Immutable$Tag$$uuid = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
    var $$Immutable$Tag$$uuid_regexp = new RegExp("^" + $$Immutable$Tag$$uuid + "$");

    var $$Immutable$Tag$$is_tag_regexp = new RegExp("^\\(Tag " + $$Immutable$Tag$$tag_uuid + " [0-9]+\\)$");

    var $$Immutable$Tag$$is_uuid_tag_regexp = new RegExp("^\\(UUIDTag " + $$Immutable$Tag$$uuid + "\\)$");

    var $$Immutable$Tag$$Symbol_iterator = (typeof Symbol !== "undefined" && typeof Symbol.iterator !== "undefined"
                                   ? Symbol.iterator
                                   : null);

    var $$Immutable$Tag$$Symbol_keyFor = (typeof Symbol !== "undefined" && typeof Symbol.keyFor !== "undefined"
                                 ? Symbol.keyFor
                                 : null);

    function $$Immutable$Tag$$isUUID(x) {
      return typeof x === "string" && $$Immutable$Tag$$uuid_regexp.test(x);
    }

    function $$Immutable$Tag$$isTag(x) {
      return typeof x === "string" &&
             ($$Immutable$Tag$$is_tag_regexp.test(x) ||
              $$Immutable$Tag$$is_uuid_tag_regexp.test(x));
    }

    function $$Immutable$Tag$$isUUIDTag(x) {
      return typeof x === "string" && $$Immutable$Tag$$is_uuid_tag_regexp.test(x);
    }

    function $$Immutable$Tag$$Tag() {
      var arg_len = arguments.length;
      if (arg_len === 0) {
        return "(Tag " + $$Immutable$Tag$$tag_uuid + " " + (++$$Immutable$Tag$$tag_id) + ")";
      } else {
        throw new Error("Expected 0 arguments but got " + arg_len);
      }
    }

    function $$Immutable$Tag$$UUIDTag(id) {
      var arg_len = arguments.length;
      if (arg_len === 1) {
        if ($$Immutable$Tag$$isUUID(id)) {
          return "(UUIDTag " + id + ")";
        } else {
          throw new Error("Expected a lower-case UUID, but got: " + id);
        }

      } else {
        throw new Error("Expected 1 argument but got " + arg_len);
      }
    }
    var $$static$$tag_hash        = $$Immutable$Tag$$UUIDTag("e1c3818d-4c4f-4703-980a-00969e4ca900");
    var $$static$$tag_iter        = $$Immutable$Tag$$UUIDTag("6199065c-b518-4cb3-8b41-ab70a9769ec3");
    var $$static$$tag_toJS        = $$Immutable$Tag$$UUIDTag("1b75a273-16bd-4248-be8a-e4b5e8c4b523");
    var $$static$$tag_toJSON_type = $$Immutable$Tag$$UUIDTag("89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37");
    var $$static$$tag_toJSON      = $$Immutable$Tag$$UUIDTag("99e14916-bc99-4c48-81aa-299cf1ad6de3");

    var $$static$$fromJSON_registry = {};

    var $$static$$nil = {};
    $$static$$nil.depth      = 0;
    $$static$$nil.size       = 0;
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
        return x[$$static$$tag_iter] != null ||
               ($$Immutable$Tag$$Symbol_iterator !== null && x[$$Immutable$Tag$$Symbol_iterator] != null) ||
               Array.isArray(x);
      } else {
        return typeof x === "string" && !$$Immutable$Tag$$isTag(x);
      }
    }

    function $$Immutable$iter$$toIterator(x) {
      var fn;

      if ((fn = x[$$static$$tag_iter]) != null) {
        return fn.call(x);

      // TODO should ES6 Iterables have precedence over `tag_iter` ?
      } else if ($$Immutable$Tag$$Symbol_iterator !== null && (fn = x[$$Immutable$Tag$$Symbol_iterator]) != null) {
        return fn.call(x);

      } else if (Array.isArray(x)) {
        return $$Immutable$iter$$iter_array(x);

      // TODO this isn't quite correct
      } else if (typeof x === "string" && !$$Immutable$Tag$$isTag(x)) {
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

      o[$$static$$tag_iter] = iter;

      if ($$Immutable$Tag$$Symbol_iterator !== null) {
        o[$$Immutable$Tag$$Symbol_iterator] = iter;
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

    function $$Immutable$iter$$join(x, separator1) {
      var separator2 = (arguments.length === 1
                         ? ""
                         : separator1);

      if (typeof x === "string" && separator2 === "") {
        return x;
      } else {
        // TODO this requires O(n) space, perhaps we can use an iterator to make it O(1) space ?
        return $$Immutable$iter$$toArray(x).join(separator2);
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

    function $$Immutable$iter$$range(start1, end1, step1) {
      var arg_len = arguments.length;

      var start2 = (arg_len < 1
                     ? 0
                     : start1);

      var end2 = (arg_len < 2
                   ? Infinity
                   : end1);

      var step2 = (arg_len < 3
                    ? 1
                    : step1);

      if (step2 < 0) {
        throw new Error("Step cannot be negative: " + step2);
      }

      return $$Immutable$iter$$Iterable(function () {
        if (start2 < end2) {
          var next = function () {
            if (start2 < end2) {
              var current = start2;
              start2 += step2;
              return { value: current };

            } else {
              return { done: true };
            }
          };
        } else {
          var next = function () {
            if (start2 > end2) {
              var current = start2;
              start2 -= step2;
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
      if ($$Immutable$Tag$$Symbol_keyFor !== null && (key = $$Immutable$Tag$$Symbol_keyFor(x)) != null) {
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
        if ($$Immutable$Tag$$isTag(x)) {
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
        var hasher = x[$$static$$tag_hash];
        if (hasher != null) {
          return hasher(x);

        } else {
          if (Object.isExtensible(x)) {
            var id = "(Mutable " + (++$$hash$$mutable_hash_id) + ")";

            Object.defineProperty(x, $$static$$tag_hash, {
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

      if ($$Immutable$Tag$$isTag(x)) {
        if ($$Immutable$Tag$$isUUIDTag(x)) {
          return x;
        } else {
          throw new Error("Cannot convert Tag from JSON, use UUIDTag instead: " + x);
        }

      } else if (type === "string" || type === "boolean" || x === null || $$Immutable$util$$isFinite(x)) {
        return x;

      } else if ($$Immutable$util$$isObject(x)) {
        var type = x[$$static$$tag_toJSON_type];
        if (type != null) {
          var register = $$static$$fromJSON_registry[type];
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

      if ($$Immutable$Tag$$isTag(x)) {
        if ($$Immutable$Tag$$isUUIDTag(x)) {
          return x;
        } else {
          throw new Error("Cannot convert Tag to JSON, use UUIDTag instead: " + x);
        }

      } else if (type === "string" || type === "boolean" || x === null || $$Immutable$util$$isFinite(x)) {
        return x;

      } else if ($$Immutable$util$$isObject(x)) {
        var fn = x[$$static$$tag_toJSON];
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

      o[$$static$$tag_toJSON_type] = type;

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

      o[$$static$$tag_toJSON_type] = type;

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
      if (x === $$static$$nil) {
        return y;

      } else if (y === $$static$$nil) {
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
      if (node === $$static$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, $$AVL$$insert_min(node.left, new_node), node.right);
      }
    }

    function $$AVL$$insert_max(node, new_node) {
      if (node === $$static$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, node.left, $$AVL$$insert_max(node.right, new_node));
      }
    }

    function $$AVL$$iter_tree(node) {
      var parents = [];

      while (node !== $$static$$nil) {
        parents.push(node);
        node = node.left;
      }

      return {
        next: function () {
          if (parents.length) {
            var parent = parents.pop();

            node = parent.right;

            while (node !== $$static$$nil) {
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

    if ($$Immutable$Tag$$Symbol_iterator !== null) {
      $$Base$$MutableBase[$$Immutable$Tag$$Symbol_iterator] = $$Base$$ImmutableBase[$$Immutable$Tag$$Symbol_iterator] = function () {
        return $$Immutable$iter$$toIterator(this);
      };
    }
    function $$Ordered$$nth_has(index, len) {
      return index >= 0 && index < len;
    }

    function $$Ordered$$nth_has_end(index, len) {
      return index >= 0 && index <= len;
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
          if (x === $$static$$nil) {
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
      while (x !== $$static$$nil) {
        f(x.car);
        x = x.cdr;
      }
    }
    var $$Immutable$ImmutableList$$array_limit = 125;

    var $$Immutable$ImmutableList$$ceiling = Math.ceil;
    var $$Immutable$ImmutableList$$floor   = Math.floor;


    function $$Immutable$ImmutableList$$add_slice(slices, slice) {
      if (slices.length) {
        var last = slices[slices.length - 1];
        if (last.length + slice.length <= $$Immutable$ImmutableList$$array_limit) {
          slices[slices.length - 1] = last.concat(slice);
        } else {
          slices.push(slice);
        }
      } else {
        slices.push(slice);
      }
    }

    function $$Immutable$ImmutableList$$slices_to_tree1(slices, min, max) {
      if (min < max) {
        var pivot = $$Immutable$ImmutableList$$floor((min + max) / 2);
        var left  = $$Immutable$ImmutableList$$slices_to_tree1(slices, min, pivot);
        var right = $$Immutable$ImmutableList$$slices_to_tree1(slices, pivot + 1, max);
        return new $$Immutable$ImmutableList$$ArrayNode(left, right, slices[pivot]);
      } else {
        return $$static$$nil;
      }
    }

    function $$Immutable$ImmutableList$$slices_to_tree(slices) {
      return $$Immutable$ImmutableList$$slices_to_tree1(slices, 0, slices.length);
    }

    // TODO move this into Array.js ?
    function $$Immutable$ImmutableList$$array_slice(array, from, to) {
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
    function $$Immutable$ImmutableList$$stack_to_array(a, size) {
      var out = new Array(size);

      while (size--) {
        out[size] = a.car;
        a = a.cdr;
      }

      return out;
    }

    function $$Immutable$ImmutableList$$stack_nth(a, size, i) {
      while (--size !== i) {
        a = a.cdr;
      }

      return a.car;
    }


    function $$Immutable$ImmutableList$$ArrayNode(left, right, array) {
      this.left  = left;
      this.right = right;
      this.array = array;
      this.size  = left.size + right.size + array.length;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$Immutable$ImmutableList$$ArrayNode.prototype.copy = function (left, right) {
      return new $$Immutable$ImmutableList$$ArrayNode(left, right, this.array);
    };


    function $$Immutable$ImmutableList$$nth_get(node, index) {
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

    function $$Immutable$ImmutableList$$nth_insert(node, index, value) {
      // TODO is this necessary ?
      if (node === $$static$$nil) {
        return new $$Immutable$ImmutableList$$ArrayNode($$static$$nil, $$static$$nil, [value]);

      } else {
        var left    = node.left;
        var right   = node.right;
        var l_index = left.size;

        if (index < l_index) {
          var child = $$Immutable$ImmutableList$$nth_insert(left, index, value);
          return $$AVL$$balanced_node(node, child, right);

        } else {
          index -= l_index;

          var array = node.array;
          var len   = array.length;
          // TODO test this
          if (index <= len) {
            array = $$Array$$insert(array, index, value);

            // TODO this fails when array_limit is 1
            if (len === $$Immutable$ImmutableList$$array_limit) {
              var pivot  = $$Immutable$ImmutableList$$ceiling(array.length / 2);
              var aleft  = array.slice(0, pivot);
              var aright = array.slice(pivot);

              if (left.depth < right.depth) {
                // TODO unit test for this
                // TODO insert_array_max ?
                return new $$Immutable$ImmutableList$$ArrayNode($$AVL$$insert_max(left, new $$Immutable$ImmutableList$$ArrayNode($$static$$nil, $$static$$nil, aleft)), right, aright);
              } else {
                // TODO unit test for this
                // TODO insert_array_min ?
                return new $$Immutable$ImmutableList$$ArrayNode(left, $$AVL$$insert_min(right, new $$Immutable$ImmutableList$$ArrayNode($$static$$nil, $$static$$nil, aright)), aleft);
              }

            } else {
              return new $$Immutable$ImmutableList$$ArrayNode(left, right, array);
            }

          } else {
            var child = $$Immutable$ImmutableList$$nth_insert(right, index - len, value);
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Immutable$ImmutableList$$nth_modify(node, index, f) {
      var left    = node.left;
      var right   = node.right;
      var l_index = left.size;

      if (index < l_index) {
        var child = $$Immutable$ImmutableList$$nth_modify(left, index, f);
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
            return new $$Immutable$ImmutableList$$ArrayNode(left, right, new_array);
          }

        } else {
          var child = $$Immutable$ImmutableList$$nth_modify(right, index - len, f);
          if (child === right) {
            return node;
          } else {
            return node.copy(left, child); // TODO test this
          }
        }
      }
    }

    function $$Immutable$ImmutableList$$nth_remove(node, index) {
      var left    = node.left;
      var right   = node.right;
      var l_index = left.size;

      if (index < l_index) {
        var child = $$Immutable$ImmutableList$$nth_remove(left, index);
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
            return new $$Immutable$ImmutableList$$ArrayNode(left, right, array);
          }

        } else {
          var child = $$Immutable$ImmutableList$$nth_remove(right, index - len);
          return $$AVL$$balanced_node(node, left, child);
        }
      }
    }

    function $$Immutable$ImmutableList$$nth_slice(slices, node, from, to) {
      if (node !== $$static$$nil) {
        var left = node.left;
        var size = left.size;

        if (from < size) {
          $$Immutable$ImmutableList$$nth_slice(slices, left, from, to);
        }

        var array = node.array;
        var len   = array.length;

        from -= size;
        to   -= size;

        if (from < len && to > 0) {
          $$Immutable$ImmutableList$$add_slice(slices, $$Immutable$ImmutableList$$array_slice(array, from, to));
        }

        if (to > len) {
          $$Immutable$ImmutableList$$nth_slice(slices, node.right, from - len, to - len);
        }
      }
    }

    function $$Immutable$ImmutableList$$insert_array_max(node, new_array) {
      if (node === $$static$$nil) {
        return new $$Immutable$ImmutableList$$ArrayNode($$static$$nil, $$static$$nil, new_array);
      } else {
        var left  = node.left;
        var right = node.right;
        var array = node.array;
        if (right === $$static$$nil && array.length + new_array.length <= $$Immutable$ImmutableList$$array_limit) {
          return new $$Immutable$ImmutableList$$ArrayNode(left, right, array.concat(new_array));
        } else {
          // TODO do we need to use balanced_node ?
          return $$AVL$$balanced_node(node, left, $$Immutable$ImmutableList$$insert_array_max(right, new_array));
        }
      }
    }


    function $$Immutable$ImmutableList$$ImmutableList(root, tail, tail_size) {
      this.root = root;
      this.tail = tail;
      this.tail_size = tail_size;
      this.hash = null;
    }

    $$Immutable$ImmutableList$$ImmutableList.prototype = Object.create($$Base$$ImmutableBase);

    $$Immutable$ImmutableList$$ImmutableList.prototype[$$static$$tag_hash] = $$hash$$hash_array("List");
    $$Immutable$ImmutableList$$ImmutableList.prototype[$$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;
    $$Immutable$ImmutableList$$ImmutableList.prototype.has = $$Ordered$$ordered_has;

    $$static$$fromJSON_registry["List"] = function (x) {
      return $$Immutable$ImmutableList$$List($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype[$$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_array("List", x);
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype[$$static$$tag_iter] = function () {
      var tree = $$Immutable$iter$$mapcat_iter($$AVL$$iter_tree(this.root), function (node) {
        return $$Immutable$iter$$toIterator(node.array);
      });
      return $$Immutable$iter$$concat_iter(tree, $$Immutable$iter$$reverse_iter($$Cons$$iter_cons(this.tail)));
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.isEmpty = function () {
      return this.root === $$static$$nil && this.tail === $$static$$nil;
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.removeAll = function () {
      return new $$Immutable$ImmutableList$$ImmutableList($$static$$nil, $$static$$nil, 0);
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.size = function () {
      return this.root.size + this.tail_size;
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.get = function (index1, def) {
      var len = this.size();

      var index2 = (index1 < 0
                     ? index1 + len
                     : index1);

      if ($$Ordered$$nth_has(index2, len)) {
        var root = this.root;
        var size = root.size;
        if (index2 < size) {
          return $$Immutable$ImmutableList$$nth_get(root, index2);
        } else {
          return $$Immutable$ImmutableList$$stack_nth(this.tail, this.tail_size, index2 - size);
        }

      } else if (arguments.length === 2) {
        return def;

      } else {
        throw new Error("Index " + index2 + " is not valid");
      }
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.insert = function (index1, value) {
      var arg_len = arguments.length;

      if (arg_len !== 2) {
        throw new Error("Expected 2 arguments but got " + arg_len);
      }

      var len = this.size();

      var index2 = (index1 < 0
                     ? index1 + (len + 1)
                     : index1);

      if (index2 === len) {
        return this.push(value);

      } else {
        var root      = this.root;
        var tail      = this.tail;
        var tail_size = this.tail_size;

        if ($$Ordered$$nth_has(index2, len)) {
          var size = root.size;
          if (index2 <= size) {
            return new $$Immutable$ImmutableList$$ImmutableList($$Immutable$ImmutableList$$nth_insert(root, index2, value), tail, tail_size);

          } else {
            var array = $$Array$$insert($$Immutable$ImmutableList$$stack_to_array(tail, tail_size), index2 - size, value);
            return new $$Immutable$ImmutableList$$ImmutableList($$Immutable$ImmutableList$$insert_array_max(root, array), $$static$$nil, 0);
          }

        } else {
          throw new Error("Index " + index2 + " is not valid");
        }
      }
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.push = function (value) {
      var root      = this.root;
      var tail      = this.tail;
      var tail_size = this.tail_size;

      if (tail_size === $$Immutable$ImmutableList$$array_limit) {
        var node = $$Immutable$ImmutableList$$insert_array_max(root, $$Immutable$ImmutableList$$stack_to_array(tail, tail_size));
        return new $$Immutable$ImmutableList$$ImmutableList(node, new $$Cons$$Cons(value, $$static$$nil), 1);
      } else {
        return new $$Immutable$ImmutableList$$ImmutableList(root, new $$Cons$$Cons(value, tail), tail_size + 1);
      }
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.remove = function (index1) {
      var arg_len = arguments.length;

      if (arg_len !== 1) {
        throw new Error("Expected 1 argument but got " + arg_len);
      }

      var len = this.size();

      var index2 = (index1 < 0
                     ? index1 + len
                     : index1);

      var root      = this.root;
      var tail      = this.tail;
      var tail_size = this.tail_size;

      if (tail !== $$static$$nil && index2 === len - 1) {
        return new $$Immutable$ImmutableList$$ImmutableList(root, tail.cdr, tail_size - 1);

      } else if ($$Ordered$$nth_has(index2, len)) {
        var size = root.size;
        if (index2 < size) {
          return new $$Immutable$ImmutableList$$ImmutableList($$Immutable$ImmutableList$$nth_remove(root, index2), tail, tail_size);

        } else {
          var array = $$Array$$remove($$Immutable$ImmutableList$$stack_to_array(tail, tail_size), index2 - size);
          return new $$Immutable$ImmutableList$$ImmutableList($$Immutable$ImmutableList$$insert_array_max(root, array), $$static$$nil, 0);
        }

      } else {
        throw new Error("Index " + index2 + " is not valid");
      }
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.modify = function (index1, f) {
      var len = this.size();

      var index2 = (index1 < 0
                     ? index1 + len
                     : index1);

      if ($$Ordered$$nth_has(index2, len)) {
        var root = this.root;
        var tail = this.tail;
        var tail_size = this.tail_size;
        var size = root.size;

        if (tail !== $$static$$nil && index2 === len - 1) {
          var value = f(tail.car);
          if (value === tail.car) {
            return this;
          } else {
            return new $$Immutable$ImmutableList$$ImmutableList(root, new $$Cons$$Cons(value, tail.cdr), tail_size);
          }

        } else if (index2 < size) {
          var node = $$Immutable$ImmutableList$$nth_modify(root, index2, f);
          if (node === root) {
            return this;
          } else {
            return new $$Immutable$ImmutableList$$ImmutableList(node, tail, tail_size);
          }

        } else {
          var stack = $$Immutable$ImmutableList$$stack_to_array(tail, tail_size);
          var array = $$Array$$modify(stack, index2 - size, f);
          if (array === stack) {
            return this;
          } else {
            return new $$Immutable$ImmutableList$$ImmutableList($$Immutable$ImmutableList$$insert_array_max(root, array), $$static$$nil, 0);
          }
        }

      } else {
        throw new Error("Index " + index2 + " is not valid");
      }
    };

    // TODO a bit of code duplication
    $$Immutable$ImmutableList$$ImmutableList.prototype.set = function (index, value) {
      return this.modify(index, function () {
        return value;
      });
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.slice = function (from1, to1) {
      var len = this.size();

      var arg_len = arguments.length;

      var from2 = (arg_len < 1
                    ? 0
                    : from1);

      var to2 = (arg_len < 2
                  ? len
                  : to1);

      if (typeof from2 !== "number") {
        throw new Error("Expected a number but got " + from2);
      }

      if (typeof to2 !== "number") {
        throw new Error("Expected a number but got " + to2);
      }

      var from3 = (from2 < 0
                    ? from2 + len
                    : from2);

      var to3 = (to2 < 0
                  ? to2 + len
                  : to2);

      if (from3 === 0 && to3 === len) {
        return this;

      } else if (from3 > to3) {
        throw new Error("Index " + from3 + " is greater than index " + to3);

      } else if ($$Ordered$$nth_has_end(from3, len)) {
        if (from3 === to3) {
          return new $$Immutable$ImmutableList$$ImmutableList($$static$$nil, $$static$$nil, 0);

        } else if ($$Ordered$$nth_has_end(to3, len)) {
          var root = this.root;
          var size = root.size;

          var slices = [];

          if (from3 <= size) {
            $$Immutable$ImmutableList$$nth_slice(slices, root, from3, to3);
          }

          if (to3 > size) {
            var stack = $$Immutable$ImmutableList$$stack_to_array(this.tail, this.tail_size);
            $$Immutable$ImmutableList$$add_slice(slices, $$Immutable$ImmutableList$$array_slice(stack, from3 - size, to3 - size));
          }

          return new $$Immutable$ImmutableList$$ImmutableList($$Immutable$ImmutableList$$slices_to_tree(slices), $$static$$nil, 0);

        } else {
          throw new Error("Index " + to3 + " is not valid");
        }

      } else {
        throw new Error("Index " + from3 + " is not valid");
      }
    };

    $$Immutable$ImmutableList$$ImmutableList.prototype.concat = function (right) {
      if (right instanceof $$Immutable$ImmutableList$$ImmutableList) {
        var lroot = this.root;
        var ltail = this.tail;

        var rroot = right.root;
        var rtail = right.tail;

        if (rroot === $$static$$nil && rtail === $$static$$nil) {
          return this;

        } else if (lroot === $$static$$nil && ltail === $$static$$nil) {
          return right;

        } else {
          if (ltail !== $$static$$nil) {
            lroot = $$Immutable$ImmutableList$$insert_array_max(lroot, $$Immutable$ImmutableList$$stack_to_array(ltail, this.tail_size));
          }

          var node = $$AVL$$concat(lroot, rroot);
          return new $$Immutable$ImmutableList$$ImmutableList(node, rtail, right.tail_size);
        }

      } else {
        return $$Immutable$iter$$foldl(right, this, function (self, x) {
          return self.push(x);
        });
      }
    };


    function $$Immutable$ImmutableList$$isList(x) {
      return x instanceof $$Immutable$ImmutableList$$ImmutableList;
    }

    function $$Immutable$ImmutableList$$List(array) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableList$$ImmutableList($$static$$nil, $$static$$nil, 0);
      } else {
        if (array instanceof $$Immutable$ImmutableList$$ImmutableList) {
          return array;
        } else {
          return new $$Immutable$ImmutableList$$ImmutableList($$static$$nil, $$static$$nil, 0).concat(array);
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
      while (node !== $$static$$nil) {
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
      if (node === $$static$$nil) {
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
      if (node === $$static$$nil) {
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
      if (node === $$static$$nil) {
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
      return this.root === $$static$$nil;
    }

    function $$Immutable$Sorted$$sorted_has(key) {
      return $$Immutable$Sorted$$key_get(this.root, this.sort, this.hash_fn(key)) !== $$static$$nil;
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

    $$Immutable$ImmutableDict$$ImmutableDict.prototype[$$static$$tag_toJS] = $$Immutable$toJS$$toJS_object;
    $$Immutable$ImmutableDict$$ImmutableDict.prototype.isEmpty = $$Immutable$Sorted$$sorted_isEmpty;
    $$Immutable$ImmutableDict$$ImmutableDict.prototype.has = $$Immutable$Sorted$$sorted_has;
    $$Immutable$ImmutableDict$$ImmutableDict.prototype.remove = $$Immutable$Sorted$$sorted_remove($$Immutable$ImmutableDict$$ImmutableDict);
    $$Immutable$ImmutableDict$$ImmutableDict.prototype.merge = $$Immutable$Sorted$$sorted_merge;

    $$Immutable$ImmutableDict$$ImmutableDict.prototype[$$static$$tag_iter] = function () {
      return $$Immutable$iter$$map_iter($$AVL$$iter_tree(this.root), function (node) {
        return $$Immutable$ImmutableTuple$$unsafe_Tuple([node.key, node.value]);
      });
    };

    $$Immutable$ImmutableDict$$ImmutableDict.prototype[$$static$$tag_hash] = function (x) {
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

    $$static$$fromJSON_registry["Dict"] = function (x) {
      return $$Immutable$ImmutableDict$$Dict($$Immutable$toJSON$$fromJSON_object(x));
    };

    $$Immutable$ImmutableDict$$ImmutableDict.prototype[$$static$$tag_toJSON] = function (x) {
      if ($$Immutable$ImmutableDict$$isDict(x) && !$$Immutable$ImmutableDict$$isSortedDict(x)) {
        return $$Immutable$toJSON$$toJSON_object("Dict", x);
      } else {
        throw new Error("Cannot convert SortedDict to JSON");
      }
    };

    $$Immutable$ImmutableDict$$ImmutableDict.prototype.removeAll = function () {
      return new $$Immutable$ImmutableDict$$ImmutableDict($$static$$nil, this.sort, this.hash_fn);
    };

    $$Immutable$ImmutableDict$$ImmutableDict.prototype.get = function (key, def) {
      var node = $$Immutable$Sorted$$key_get(this.root, this.sort, this.hash_fn(key));
      if (node === $$static$$nil) {
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
      var node = $$Immutable$Sorted$$key_set(root, sort, hash, new $$Immutable$ImmutableDict$$KeyNode($$static$$nil, $$static$$nil, hash, key, value));
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
        return new $$Immutable$ImmutableDict$$ImmutableDict($$static$$nil, sort, $$Immutable$util$$identity);
      } else {
        // We don't use equal, for increased speed
        if ($$Immutable$ImmutableDict$$isSortedDict(obj) && obj.sort === sort) {
          return obj;
        } else {
          return new $$Immutable$ImmutableDict$$ImmutableDict($$static$$nil, sort, $$Immutable$util$$identity).merge(obj);
        }
      }
    }

    function $$Immutable$ImmutableDict$$Dict(obj) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableDict$$ImmutableDict($$static$$nil, $$Immutable$Sorted$$simpleSort, $$hash$$hash);
      } else {
        if ($$Immutable$ImmutableDict$$isDict(obj) && !$$Immutable$ImmutableDict$$isSortedDict(obj)) {
          return obj;
        } else {
          return new $$Immutable$ImmutableDict$$ImmutableDict($$static$$nil, $$Immutable$Sorted$$simpleSort, $$hash$$hash).merge(obj);
        }
      }
    }
    function $$Immutable$toJS$$fromJS(x) {
      if (Array.isArray(x)) {
        var out = $$Immutable$ImmutableList$$List();

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
        var fn = x[$$static$$tag_toJS];
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

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype[$$static$$tag_hash] = $$hash$$hash_array("Tuple");
    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype[$$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;

    $$static$$fromJSON_registry["Tuple"] = function (x) {
      return $$Immutable$ImmutableTuple$$Tuple($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype[$$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_array("Tuple", x);
    };

    $$Immutable$ImmutableTuple$$ImmutableTuple.prototype[$$static$$tag_iter] = function () {
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

    $$Immutable$ImmutableSet$$ImmutableSet.prototype[$$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;
    $$Immutable$ImmutableSet$$ImmutableSet.prototype.isEmpty = $$Immutable$Sorted$$sorted_isEmpty;
    $$Immutable$ImmutableSet$$ImmutableSet.prototype.has = $$Immutable$Sorted$$sorted_has;
    $$Immutable$ImmutableSet$$ImmutableSet.prototype.remove = $$Immutable$Sorted$$sorted_remove($$Immutable$ImmutableSet$$ImmutableSet);

    $$static$$fromJSON_registry["Set"] = function (x) {
      return $$Immutable$ImmutableSet$$Set($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype[$$static$$tag_iter] = function () {
      return $$Immutable$iter$$map_iter($$AVL$$iter_tree(this.root), function (node) {
        return node.key;
      });
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype[$$static$$tag_toJSON] = function (x) {
      if ($$Immutable$ImmutableSet$$isSet(x) && !$$Immutable$ImmutableSet$$isSortedSet(x)) {
        return $$Immutable$toJSON$$toJSON_array("Set", x);
      } else {
        throw new Error("Cannot convert SortedSet to JSON");
      }
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype[$$static$$tag_hash] = function (x) {
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
      return new $$Immutable$ImmutableSet$$ImmutableSet($$static$$nil, this.sort, this.hash_fn);
    };

    $$Immutable$ImmutableSet$$ImmutableSet.prototype.add = function (key) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var hash = hash_fn(key);
      var node = $$Immutable$Sorted$$key_set(root, sort, hash, new $$Immutable$ImmutableSet$$SetNode($$static$$nil, $$static$$nil, hash, key));
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
        return new $$Immutable$ImmutableSet$$ImmutableSet($$static$$nil, sort, $$Immutable$util$$identity);
      } else {
        // We don't use equal, for increased speed
        if ($$Immutable$ImmutableSet$$isSortedSet(array) && array.sort === sort) {
          return array;
        } else {
          return new $$Immutable$ImmutableSet$$ImmutableSet($$static$$nil, sort, $$Immutable$util$$identity).union(array);
        }
      }
    }

    function $$Immutable$ImmutableSet$$Set(array) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableSet$$ImmutableSet($$static$$nil, $$Immutable$Sorted$$simpleSort, $$hash$$hash);
      } else {
        if ($$Immutable$ImmutableSet$$isSet(array) && !$$Immutable$ImmutableSet$$isSortedSet(array)) {
          return array;
        } else {
          return new $$Immutable$ImmutableSet$$ImmutableSet($$static$$nil, $$Immutable$Sorted$$simpleSort, $$hash$$hash).union(array);
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

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype[$$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;
    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype[$$static$$tag_hash] = $$hash$$hash_array("Queue");
    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.size = $$Immutable$Sorted$$stack_size;
    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.concat = $$Immutable$Sorted$$stack_concat;

    $$static$$fromJSON_registry["Queue"] = function (x) {
      return $$Immutable$ImmutableQueue$$Queue($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype[$$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_array("Queue", x);
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.isEmpty = function () {
      return this.left === $$static$$nil && this.right === $$static$$nil;
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.removeAll = function () {
      return new $$Immutable$ImmutableQueue$$ImmutableQueue($$static$$nil, $$static$$nil, 0);
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype[$$static$$tag_iter] = function () {
      return $$Immutable$iter$$concat_iter($$Cons$$iter_cons(this.left), $$Immutable$iter$$reverse_iter($$Cons$$iter_cons(this.right)));
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.peek = function (def) {
      var left = this.left;
      if (left === $$static$$nil) {
        if (arguments.length === 1) {
          return def;
        } else {
          throw new Error("Cannot peek from an empty queue");
        }
      } else {
        return left.car;
      }
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.push = function (value) {
      var left  = this.left;
      var right = this.right;

      // Pushing into a queue with 0 values in it
      if (left === $$static$$nil && right === $$static$$nil) {
        return new $$Immutable$ImmutableQueue$$ImmutableQueue(new $$Cons$$Cons(value, left), right, this.len + 1);

      // Pushing into a queue with 1+ values in it
      } else {
        return new $$Immutable$ImmutableQueue$$ImmutableQueue(left, new $$Cons$$Cons(value, right), this.len + 1);
      }
    };

    $$Immutable$ImmutableQueue$$ImmutableQueue.prototype.pop = function () {
      var left  = this.left;
      var right = this.right;

      if (left === $$static$$nil) {
        throw new Error("Cannot pop from an empty queue");

      } else {
        left = left.cdr;

        if (left === $$static$$nil && right !== $$static$$nil) {
          // TODO a little gross
          // TODO replace with foldl ?
          $$Cons$$each_cons(right, function (x) {
            left = new $$Cons$$Cons(x, left);
          });

          right = $$static$$nil;
        }
      }

      return new $$Immutable$ImmutableQueue$$ImmutableQueue(left, right, this.len - 1);
    };


    function $$Immutable$ImmutableQueue$$isQueue(x) {
      return x instanceof $$Immutable$ImmutableQueue$$ImmutableQueue;
    }

    function $$Immutable$ImmutableQueue$$Queue(x) {
      if (arguments.length === 0) {
        return new $$Immutable$ImmutableQueue$$ImmutableQueue($$static$$nil, $$static$$nil, 0);
      } else {
        if (x instanceof $$Immutable$ImmutableQueue$$ImmutableQueue) {
          return x;
        } else {
          return new $$Immutable$ImmutableQueue$$ImmutableQueue($$static$$nil, $$static$$nil, 0).concat(x);
        }
      }
    }
    function $$Immutable$ImmutableStack$$ImmutableStack(root, len) {
      this.root = root;
      this.len  = len;
      this.hash = null;
    }

    $$Immutable$ImmutableStack$$ImmutableStack.prototype = Object.create($$Base$$ImmutableBase);

    $$Immutable$ImmutableStack$$ImmutableStack.prototype[$$static$$tag_toJS] = $$Immutable$toJS$$toJS_array;
    $$Immutable$ImmutableStack$$ImmutableStack.prototype[$$static$$tag_hash] = $$hash$$hash_array("Stack");
    $$Immutable$ImmutableStack$$ImmutableStack.prototype.isEmpty = $$Immutable$Sorted$$sorted_isEmpty;
    $$Immutable$ImmutableStack$$ImmutableStack.prototype.size = $$Immutable$Sorted$$stack_size;
    $$Immutable$ImmutableStack$$ImmutableStack.prototype.concat = $$Immutable$Sorted$$stack_concat;

    $$static$$fromJSON_registry["Stack"] = function (x) {
      return $$Immutable$ImmutableStack$$Stack($$Immutable$toJSON$$fromJSON_array(x));
    };

    $$Immutable$ImmutableStack$$ImmutableStack.prototype[$$static$$tag_iter] = function () {
      return $$Immutable$iter$$reverse_iter($$Cons$$iter_cons(this.root));
    };

    $$Immutable$ImmutableStack$$ImmutableStack.prototype[$$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_array("Stack", x);
    };

    $$Immutable$ImmutableStack$$ImmutableStack.prototype.removeAll = function () {
      return new $$Immutable$ImmutableStack$$ImmutableStack($$static$$nil, 0);
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
        return new $$Immutable$ImmutableStack$$ImmutableStack($$static$$nil, 0);
      } else {
        if (x instanceof $$Immutable$ImmutableStack$$ImmutableStack) {
          return x;
        } else {
          return new $$Immutable$ImmutableStack$$ImmutableStack($$static$$nil, 0).concat(x);
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
    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype[$$static$$tag_toJS] = $$Immutable$toJS$$toJS_object;

    $$static$$fromJSON_registry["Record"] = function (x) {
      return $$Immutable$ImmutableRecord$$Record($$Immutable$toJSON$$fromJSON_object(x));
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype[$$static$$tag_toJSON] = function (x) {
      return $$Immutable$toJSON$$toJSON_object("Record", x);
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype[$$static$$tag_hash] = function (x) {
      if (x.hash === null) {
        x.hash = "(Record" + $$hash$$hash_dict(x, "  ") + ")";
      }

      return x.hash;
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype[$$static$$tag_iter] = function () {
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

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype.has = function (key) {
      $$Immutable$ImmutableRecord$$checkKey(key);

      return this.keys[key] != null;
    };

    $$Immutable$ImmutableRecord$$ImmutableRecord.prototype.get = function (key, def) {
      $$Immutable$ImmutableRecord$$checkKey(key);

      var index = this.keys[key];
      if (index == null) {
        if (arguments.length === 2) {
          return def;
        } else {
          throw new Error("Key " + key + " not found");
        }

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

    $$Immutable$MutableRef$$MutableRef.prototype[$$static$$tag_hash] = function (x) {
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
      var arg_len = arguments.length;

      if (arg_len < 1 || arg_len > 2) {
        throw new Error("Expected 1 to 2 arguments but got " + arg_len);
      }

      return new $$Immutable$MutableRef$$MutableRef(value, onchange);
    }
    function $$$Immutable$$isImmutable(x) {
      if ($$Immutable$util$$isObject(x)) {
        return Object.isFrozen(x) ||
               $$Immutable$ImmutableDict$$isDict(x)  ||
               $$Immutable$ImmutableSet$$isSet(x)   ||
               $$Immutable$ImmutableList$$isList(x)  ||
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
      exports.equal = $$Immutable$equal$$equal;
      exports.fromJS = $$Immutable$toJS$$fromJS;
      exports.toJS = $$Immutable$toJS$$toJS;
      exports.isDict = $$Immutable$ImmutableDict$$isDict;
      exports.isSet = $$Immutable$ImmutableSet$$isSet;
      exports.isSortedDict = $$Immutable$ImmutableDict$$isSortedDict;
      exports.isSortedSet = $$Immutable$ImmutableSet$$isSortedSet;
      exports.isList = $$Immutable$ImmutableList$$isList;
      exports.isQueue = $$Immutable$ImmutableQueue$$isQueue;
      exports.isTuple = $$Immutable$ImmutableTuple$$isTuple;
      exports.isStack = $$Immutable$ImmutableStack$$isStack;
      exports.isImmutable = $$$Immutable$$isImmutable;
      exports.SortedDict = $$Immutable$ImmutableDict$$SortedDict;
      exports.SortedSet = $$Immutable$ImmutableSet$$SortedSet;
      exports.isIterable = $$Immutable$iter$$isIterable;
      exports.Dict = $$Immutable$ImmutableDict$$Dict;
      exports.Set = $$Immutable$ImmutableSet$$Set;
      exports.List = $$Immutable$ImmutableList$$List;
      exports.Tuple = $$Immutable$ImmutableTuple$$Tuple;
      exports.Queue = $$Immutable$ImmutableQueue$$Queue;
      exports.Stack = $$Immutable$ImmutableStack$$Stack;
      exports.simpleSort = $$Immutable$Sorted$$simpleSort;
      exports.isRecord = $$Immutable$ImmutableRecord$$isRecord;
      exports.Record = $$Immutable$ImmutableRecord$$Record;
      exports.toJSON = $$Immutable$toJSON$$toJSON;
      exports.fromJSON = $$Immutable$toJSON$$fromJSON;
      exports.deref = $$Immutable$MutableRef$$deref;
      exports.Ref = $$Immutable$MutableRef$$Ref;
      exports.isRef = $$Immutable$MutableRef$$isRef;
      exports.isTag = $$Immutable$Tag$$isTag;
      exports.isUUIDTag = $$Immutable$Tag$$isUUIDTag;
      exports.Tag = $$Immutable$Tag$$Tag;
      exports.UUIDTag = $$Immutable$Tag$$UUIDTag;
      exports.each = $$Immutable$iter$$each;
      exports.map = $$Immutable$iter$$map;
      exports.keep = $$Immutable$iter$$keep;
      exports.findIndex = $$Immutable$iter$$findIndex;
      exports.reverse = $$Immutable$iter$$reverse;
      exports.foldl = $$Immutable$iter$$foldl;
      exports.foldr = $$Immutable$iter$$foldr;
      exports.join = $$Immutable$iter$$join;
      exports.zip = $$Immutable$iter$$zip;
      exports.toArray = $$Immutable$iter$$toArray;
      exports.any = $$Immutable$iter$$any;
      exports.all = $$Immutable$iter$$all;
      exports.find = $$Immutable$iter$$find;
      exports.partition = $$Immutable$iter$$partition;
      exports.range = $$Immutable$iter$$range;
      exports.take = $$Immutable$iter$$take;
      exports.indexOf = $$Immutable$iter$$indexOf;
      exports.toIterator = $$Immutable$iter$$toIterator;
      exports.Iterable = $$Immutable$iter$$Iterable;
    });
}).call(this);

//# sourceMappingURL=Immutable.js.map