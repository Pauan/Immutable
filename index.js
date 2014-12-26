var ImmutableList = require("./src/ImmutableList");

/**
 * Converts a List into a JavaScript array.
 */
function toJS(x) {
  if (x instanceof ImmutableList) {
    return x.toJS();
  } else {
    return x;
  }
}

exports.toJS = toJS;
