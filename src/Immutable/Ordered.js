export function nth_has(index, len) {
  return index >= 0 && index < len;
}

export function nth_has_end(index, len) {
  return index >= 0 && index <= len;
}

export function ordered_has(index) {
  var len = this.size();

  if (index < 0) {
    index += len;
  }

  return nth_has(index, len);
}
