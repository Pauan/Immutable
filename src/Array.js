function array_insert_at(array, index, value) {
  var len = array.length + 1;

  var out = new Array(len);

  var i = 0;
  while (i < index) {
    out[i] = array[i];
    ++i;
  }

  out[i] = value;
  ++i;

  while (i < len) {
    out[i] = array[i - 1];
    ++i;
  }

  return out;
}

function array_modify_at(array, index, f) {
  var old_value = array[index];
  var new_value = f(old_value);

  if (old_value === new_value) {
    return array;

  } else {
    // It's fast enough to just use `array.slice`, rather than a custom function
    var new_array = array.slice();
    new_array[index] = new_value;
    return new_array;
  }
}

function array_remove_at(array, index) {
  var len = array.length - 1;

  var out = new Array(len);

  var i = 0;
  while (i < index) {
    out[i] = array[i];
    ++i;
  }

  while (i < len) {
    out[i] = array[i + 1];
    ++i;
  }

  return out;
}

exports.insert_at = insert_at;
exports.modify_at = modify_at;
exports.remove_at = remove_at;
