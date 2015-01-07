import { nil } from "./static";

export function Cons(car, cdr) {
  this.car = car;
  this.cdr = cdr;
}

export function iter_cons(x) {
  return {
    next: function () {
      if (x === nil) {
        return { done: true };
      } else {
        var value = x.car;
        x = x.cdr;
        return { value: value };
      }
    }
  };
}

export function each_cons(x, f) {
  while (x !== nil) {
    f(x.car);
    x = x.cdr;
  }
}
