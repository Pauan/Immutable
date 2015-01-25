import { isObject, isJSLiteral } from "./util";
import { tag_iter } from "./static";
import { Symbol_iterator, isTag } from "./Tag";
import { equal } from "./equal";

// TODO circular import
import { unsafe_Tuple } from "./ImmutableTuple";

// TODO move into "./static.js" ?
var empty = {};

function iter_array(array) {
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

export function isIterable(x) {
  if (isObject(x)) {
    return x[tag_iter] != null ||
           (Symbol_iterator !== null && x[Symbol_iterator] != null) ||
           Array.isArray(x);
  } else {
    return typeof x === "string" && !isTag(x);
  }
}

export function toIterator(x) {
  var fn;

  if ((fn = x[tag_iter]) != null) {
    return fn.call(x);

  // TODO should ES6 Iterables have precedence over `tag_iter` ?
  } else if (Symbol_iterator !== null && (fn = x[Symbol_iterator]) != null) {
    return fn.call(x);

  } else if (Array.isArray(x)) {
    return iter_array(x);

  // TODO this isn't quite correct
  } else if (typeof x === "string" && !isTag(x)) {
    return iter_array(x);

  } else {
    throw new Error("Cannot iter: " + x);
  }
}

export function Iterable(f) {
  var o = {};

  function iter() {
    return f();
  }

  o[tag_iter] = iter;

  if (Symbol_iterator !== null) {
    o[Symbol_iterator] = iter;
  }

  return o;
}

export function each_iter(iterator, f) {
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

export function map_iter(iterator, f) {
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

export function concat_iter(x, y) {
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

export function any(x, f) {
  var iterator = toIterator(x);

  for (;;) {
    var info = iterator.next();
    if (info.done) {
      return false;
    } else if (f(info.value)) {
      return true;
    }
  }
}

export function all(x, f) {
  var iterator = toIterator(x);

  for (;;) {
    var info = iterator.next();
    if (info.done) {
      return true;
    } else if (!f(info.value)) {
      return false;
    }
  }
}

export function find(x, f, def) {
  var iterator = toIterator(x);

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

export function partition(x, f) {
  var yes_buffer = [];
  var no_buffer  = [];

  var iterator = empty;
  var done     = false;

  return unsafe_Tuple([
    Iterable(function () {
      if (iterator === empty) {
        iterator = toIterator(x);
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

    Iterable(function () {
      if (iterator === empty) {
        iterator = toIterator(x);
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

export function zip(x, def) {
  var hasDefault = (arguments.length === 2);

  return Iterable(function () {
    var args = toArray(x).map(function (x) {
      return toIterator(x);
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
              return { value: unsafe_Tuple(out) };

            } else {
              isDone = true;
            }
          }
        }
      }
    };
  });
}

export function reverse_iter(iterator) {
  var stack = [];

  // TODO should it do this here, or inside `next` ?
  each_iter(iterator, function (x) {
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

export function foldl(x, init, f) {
  each(x, function (x) {
    init = f(init, x);
  });
  return init;
}

export function foldr(x, init, f) {
  return foldl(reverse(x), init, function (x, y) {
    return f(y, x);
  });
}

export function toArray(x) {
  if (Array.isArray(x)) {
    return x;

  } else {
    var a = [];

    each(x, function (x) {
      a.push(x);
    });

    return a;
  }
}

export function join(x, separator1) {
  var separator2 = (arguments.length === 1
                     ? ""
                     : separator1);

  if (typeof x === "string" && separator2 === "") {
    return x;
  } else {
    // TODO this requires O(n) space, perhaps we can use an iterator to make it O(1) space ?
    return toArray(x).join(separator2);
  }
}

export function mapcat_iter(iterator, f) {
  var done = false;
  var sub  = empty;

  return {
    next: function () {
      for (;;) {
        if (done) {
          return { done: true };

        } else if (sub === empty) {
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
            sub = empty;
          } else {
            return { value: info.value };
          }
        }
      }
    }
  };
}

// TODO what if the JS literal has a `tag_iter` property ?
export function iter_object(x) {
  if (isJSLiteral(x)) {
    return map(Object.keys(x), function (key) {
      return [key, x[key]];
    });
  } else {
    return x;
  }
}


export function each(x, f) {
  each_iter(toIterator(x), f);
}

export function findIndex(x, f, def) {
  var iterator = toIterator(x);

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

export function indexOf(x, value, def) {
  if (arguments.length === 3) {
    return findIndex(x, function (other) {
      // TODO should `value` or `other` come first ?
      return equal(other, value);
    }, def);
  } else {
    return findIndex(x, function (other) {
      // TODO should `value` or `other` come first ?
      return equal(other, value);
    });
  }
}

export function take(x, count) {
  // TODO isInteger function
  if (Math.round(count) !== count) {
    throw new Error("Count must be an integer: " + count);
  }

  if (count < 0) {
    throw new Error("Count cannot be negative: " + count);
  }

  return Iterable(function () {
    var iterator = toIterator(x);

    return {
      next: function () {
        for (;;) {
          if (count < 0) {
            throw new Error("Invalid count: " + count);

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

export function range(start1, end1, step1) {
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

  return Iterable(function () {
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

export function repeat(x, count1) {
  var count2 = (arguments.length < 2
                 ? Infinity
                 : count1);

  // TODO isInteger function
  if (Math.round(count2) !== count2) {
    throw new Error("Count must be an integer: " + count2);
  }

  if (count2 < 0) {
    throw new Error("Count cannot be negative: " + count2);
  }

  return Iterable(function () {
    return {
      next: function () {
        if (count2 < 0) {
          throw new Error("Invalid count: " + count2);

        } else if (count2 === 0) {
          return { done: true };

        } else {
          --count2;
          return { value: x };
        }
      }
    };
  });
}

// TODO
/*export function indexOf(x, value, def) {
  return findIndex(x, function (x) {
    return equal(x, value);
  }, def);
}*/

export function map(x, f) {
  return Iterable(function () {
    return map_iter(toIterator(x), f);
  });
}

// TODO what if `x` is an Array ?
export function reverse(x) {
  return Iterable(function () {
    return reverse_iter(toIterator(x));
  });
}

export function keep(x, f) {
  return Iterable(function () {
    var iterator = toIterator(x);
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

/*function get_next_iter(iterator) {
  var info = iterator.next();
  if (info.done) {
    return null;
  } else {
    return toIterator(info.value);
  }
}

export function flatten1(x) {
  return Iterable(function () {
    var iterator = toIterator(x);

    var isDone = false;
    var current = null;

    return {
      next: function () {
        if (isDone) {
          return { done: true };

        } else {
          for (;;) {
            if (current === null) {
              current = get_next_iter(iterator);

              if (current === null) {
                isDone = true;
                return { done: true };
              }
            }

            var info = current.next();
            if (info.done) {
              current = null;
            } else {
              // TODO return `info` ?
              return { value: info.value };
            }
          }
        }
      }
    };
  });
}*/

/*export function flatten(x) {

}*/
