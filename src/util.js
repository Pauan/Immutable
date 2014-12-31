export function repeat(s, i) {
  return new Array(i + 1).join(s);
}

export function pad_right(input, i, s) {
  var right = Math.max(0, i - input.length);
  return input + repeat(s, right);
}

export function join_lines(a, spaces) {
  if (a.length) {
    var separator = "\n" + spaces;
    return separator + a.map(function (x) {
      return x.replace(/\n/g, separator);
    }).join(separator);
  } else {
    return "";
  }
}
