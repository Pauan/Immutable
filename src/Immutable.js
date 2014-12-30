var _hash = require("./hash");

var hash = _hash.hash;


var Immutable = {};

Immutable.toString = function () {
  return hash(this);
};

Immutable.inspect = Immutable.toString;


module.exports = Immutable;
