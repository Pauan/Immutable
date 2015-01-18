var tag_uuid = "48de6fff-9d11-472d-a76f-ed77a59a5cbc";
var tag_id = 0;

var uuid = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
var uuid_regexp = new RegExp("^" + uuid + "$");

var is_tag_regexp = new RegExp("^\\(Tag " + tag_uuid + " [0-9]+\\)$");

var is_uuid_tag_regexp = new RegExp("^\\(UUIDTag " + uuid + "\\)$");

export var Symbol_iterator = (typeof Symbol !== "undefined" && typeof Symbol.iterator !== "undefined"
                               ? Symbol.iterator
                               : null);

export var Symbol_keyFor = (typeof Symbol !== "undefined" && typeof Symbol.keyFor !== "undefined"
                             ? Symbol.keyFor
                             : null);

// TODO this doesn't test variants
export function isUUID(x) {
  return typeof x === "string" && uuid_regexp.test(x);
}

export function isTag(x) {
  return typeof x === "string" &&
         (is_tag_regexp.test(x) ||
          is_uuid_tag_regexp.test(x));
}

// TODO Symbol support
export function isUUIDTag(x) {
  return typeof x === "string" && is_uuid_tag_regexp.test(x);
}

// TODO Symbol support ?
export function Tag() {
  var arg_len = arguments.length;
  if (arg_len === 0) {
    return "(Tag " + tag_uuid + " " + (++tag_id) + ")";
  } else {
    throw new Error("Expected 0 arguments but got " + arg_len);
  }
}

// TODO Symbol support ?
export function UUIDTag(id) {
  var arg_len = arguments.length;
  if (arg_len === 1) {
    if (isUUID(id)) {
      return "(UUIDTag " + id + ")";
    } else {
      throw new Error("Expected a lower-case UUID, but got: " + id);
    }

  } else {
    throw new Error("Expected 1 argument but got " + arg_len);
  }
}
