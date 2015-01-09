import { UUIDTag /*Symbol_uuid*/ } from "../Immutable/Tag";

if (typeof global.Symbol === "undefined") {
  global.Symbol = {
    iterator: UUIDTag("4d6d99dc-20e8-4db1-8acd-c05c1121326e")
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
