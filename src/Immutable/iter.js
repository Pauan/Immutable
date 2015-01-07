import { isJSLiteral } from "./util";
import { tag_iter, Symbol_iterator } from "./static";

// TODO circular import
import { List } from "./ImmutableList";

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

export function iter(x) {
  var fn;

  if ((fn = x[tag_iter]) != null) {
    return fn.call(x);

  } else if (Symbol_iterator !== null && (fn = x[Symbol_iterator]) != null) {
    return fn.call(x);

  } else if (Array.isArray(x)) {
    return iter_array(x);

  // TODO this isn't quite correct
  } else if (typeof x === "string") {
    return iter_array(x);

  } else {
    throw new Error("Cannot iter: " + x);
  }
}

export function make_seq(f) {
  var o = {};

  o[tag_iter] = f;

  if (Symbol_iterator !== null) {
    o[Symbol_iterator] = f;
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

export function zip(x, def) {
  var hasDefault = (arguments.length === 2);

  return make_seq(function () {
    var args = toArray(x).map(function (x) {
      return iter(x);
    });

    var isDone = false;

    return {
      next: function () {
        for (;;) {
          if (isDone) {
            return { done: true };

          } else {
            var out  = List();
            var seen = false;

            for (var i = 0, l = args.length; i < l; ++i) {
              var info = args[i].next();
              if (info.done) {
                if (hasDefault) {
                  out = out.insert(def);
                } else {
                  seen = false;
                  break;
                }
              } else {
                seen = true;
                out = out.insert(info.value);
              }
            }

            if (seen) {
              return { value: out };

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

export function join(x, separator) {
  if (separator == null) {
    separator = "";
  }

  if (typeof x === "string" && separator === "") {
    return x;
  } else {
    // TODO this requires O(n) space, perhaps we can use an iterator to make it O(1) space ?
    return toArray(x).join(separator);
  }
}

export function mapcat_iter(iterator, f) {
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
  each_iter(iter(x), f);
}

export function findIndex(x, f, def) {
  var iterator = iter(x);

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

// TODO
/*export function indexOf(x, value, def) {
  return findIndex(x, function (x) {
    return equal(x, value);
  }, def);
}*/

export function map(x, f) {
  return make_seq(function () {
    return map_iter(iter(x), f);
  });
}

export function reverse(x) {
  return make_seq(function () {
    return reverse_iter(iter(x));
  });
}

export function keep(x, f) {
  return make_seq(function () {
    var iterator = iter(x);
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

/*function get_next_iter(iterator) {
  var info = iterator.next();
  if (info.done) {
    return null;
  } else {
    return iter(info.value);
  }
}

export function flatten1(x) {
  return make_seq(function () {
    var iterator = iter(x);

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
