function copy(array) {
  var len = array.length;
  var out = new Array(len);

  for (var i = 0; i < len; ++i) {
    out[i] = array[i];
  }

  return out;
}

function insert_at(array, index, value) {
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

function modify_at(array, index, f) {
  var old_value = array[index];
  var new_value = f(old_value);

  if (old_value === new_value) {
    return array;

  } else {
    var new_array = copy(array);
    new_array[index] = new_value;
    return new_array;
  }
}

function remove_at(array, index) {
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

// TODO move this into a different module
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// http://bost.ocks.org/mike/shuffle/
// TODO test whether this algorithm has statistical bias or not
// TODO this is only needed for "test/test.js"
function shuffle(array) {
  var i = array.length;

  while (i) {
    var j = randomInt(0, i);
    --i;
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}


exports.copy = copy;
exports.insert_at = insert_at;
exports.modify_at = modify_at;
exports.remove_at = remove_at;
exports.shuffle = shuffle;
