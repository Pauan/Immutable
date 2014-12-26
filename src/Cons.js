var nil = require("./nil");

function Cons(car, cdr) {
  this.car = car;
  this.cdr = cdr;
}

Cons.prototype.forEach = function (f) {
  var self = this;
  while (self !== nil) {
    f(self.car);
    self = self.cdr;
  }
};

// TODO this isn't tail recursive
Cons.prototype.forEachRev = function (f) {
  this.cdr.forEachRev(f);
  f(this.car);
};

module.exports = Cons;
