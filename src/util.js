function repeat(s, i) {
  return new Array(i + 1).join(s);
}

function pad_right(input, i, s) {
  var right = Math.max(0, i - input.length);
  return input + repeat(s, right);
}

function join_lines(a, spaces) {
  if (a.length) {
    var separator = "\n" + spaces;
    return separator + a.map(function (x) {
      return x.replace(/\n/g, separator);
    }).join(separator);
  } else {
    return "";
  }
}


exports.repeat = repeat;
exports.pad_right = pad_right;
exports.join_lines = join_lines;
