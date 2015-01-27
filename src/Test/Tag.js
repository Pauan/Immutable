import { Tag, UUIDTag, isTag, isUUIDTag, Dict, equal, Record,
         fromJS, toJS, toJSON, fromJSON } from "../Immutable";
import { assert, context, test, assert_raises } from "./assert";
import { deepEqual } from "./util";

export function test_Tag() {
  context("Tag", function () {
    var tag1 = Tag();
    var tag2 = Tag();
    var uuid_tag1 = UUIDTag("dc353abd-d920-4c17-b911-55bd1c78c06f");
    var uuid_tag2 = UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4");

    test("isTag", function () {
      assert(!isTag("foo"));
      assert(!isTag(Dict()));
      assert(isTag(tag1));
      assert(isTag(tag2));
      assert(isTag(uuid_tag1));
      assert(isTag(uuid_tag2));

      assert(!isUUIDTag("foo"));
      assert(!isUUIDTag(Dict()));
      assert(!isUUIDTag(tag1));
      assert(!isUUIDTag(tag2));
      assert(isUUIDTag(uuid_tag1));
      assert(isUUIDTag(uuid_tag2));
    });

    test("toString", function () {
      assert("" + tag1 === "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");
      assert("" + tag2 === "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)");
      assert("" + Tag() === "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 3)");
      assert("" + uuid_tag1 === "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)");
      assert("" + uuid_tag2 === "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)");
      assert("" + UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4") === "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)");
    });

    test("init", function () {
      assert_raises(function () {
        Tag(1);
      }, "Expected 0 arguments but got 1");

      assert_raises(function () {
        Tag(1, 2);
      }, "Expected 0 arguments but got 2");

      assert_raises(function () {
        UUIDTag();
      }, "Expected 1 argument but got 0");

      assert_raises(function () {
        UUIDTag(1, 2);
      }, "Expected 1 argument but got 2");

      assert_raises(function () {
        UUIDTag("foo");
      }, "Expected a lower-case UUID, but got: foo");
    });

    test("equal", function () {
      assert(!equal(tag1, tag2));
      assert(!equal(tag1, uuid_tag1));
      assert(equal(tag1, tag1));
      assert(equal(tag2, tag2));

      assert(!equal(uuid_tag1, uuid_tag2));
      assert(equal(uuid_tag1, uuid_tag1));
      assert(equal(uuid_tag2, uuid_tag2));

      assert(equal(uuid_tag2, UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4")));

      assert(!equal(Tag(), Tag()));
      assert(!equal(tag1, Tag()));
    });

    test("===", function () {
      assert(tag1 !== tag2);
      assert(tag1 !== uuid_tag1);
      assert(tag1 === tag1);
      assert(tag2 === tag2);

      assert(uuid_tag1 !== uuid_tag2);
      assert(uuid_tag1 === uuid_tag1);
      assert(uuid_tag2 === uuid_tag2);

      assert(uuid_tag2 === UUIDTag("2a95bab0-ae96-4f07-b7a5-227fe3d394d4"));

      assert(Tag() !== Tag());
      assert(tag1 !== Tag());
    });

    test("Dict", function () {
      var x = Dict();

      x = x.set(tag1, 1);
      x = x.set(tag2, 2);
      x = x.set(uuid_tag1, 3);
      x = x.set(uuid_tag2, 4);

      assert(x.get(tag1) === 1);
      assert(x.get(tag2) === 2);
      assert(x.get(uuid_tag1) === 3);
      assert(x.get(uuid_tag2) === 4);

      assert("" + x === "(Dict\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)   = 1\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)   = 2\n  (UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4) = 4\n  (UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f) = 3)");
      assert(deepEqual(toJS(x), {
        "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)": 1,
        "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)": 2,
        "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)": 4,
        "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)": 3
      }));
    });

    test("Record", function () {
      var x = Record([[tag1, 1], [tag2, 2], [uuid_tag1, 3], [uuid_tag2, 4]]);

      assert(x.get(tag1) === 1);
      assert(x.get(tag2) === 2);
      assert(x.get(uuid_tag1) === 3);
      assert(x.get(uuid_tag2) === 4);

      assert("" + x === "(Record\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)   = 1\n  (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)   = 2\n  (UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4) = 4\n  (UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f) = 3)");
      assert(deepEqual(toJS(x), {
        "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)": 1,
        "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 2)": 2,
        "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)": 3,
        "(UUIDTag 2a95bab0-ae96-4f07-b7a5-227fe3d394d4)": 4
      }));
    });

    test("toJS", function () {
      assert(toJS(tag1) === tag1);
      assert(toJS(uuid_tag1) === uuid_tag1);

      assert(fromJS(tag1) === tag1);
      assert(fromJS(uuid_tag1) === uuid_tag1);
    });

    test("toJSON", function () {
      assert_raises(function () {
        toJSON(tag1);
      }, "Cannot convert Tag to JSON, use UUIDTag instead: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");

      assert(toJSON(uuid_tag1) === uuid_tag1);

      assert_raises(function () {
        fromJSON(tag1);
      }, "Cannot convert Tag from JSON, use UUIDTag instead: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");

      assert(fromJSON(uuid_tag1) === uuid_tag1);


      var x = Dict([[tag1, 1]]);

      assert(deepEqual(toJS(x), { "(Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)": 1 }));

      assert_raises(function () {
        toJSON(x);
      }, "Cannot convert Tag to JSON, use UUIDTag instead: (Tag 48de6fff-9d11-472d-a76f-ed77a59a5cbc 1)");


      var x = Dict([[uuid_tag1, 1]]);

      assert(deepEqual(toJS(x), { "(UUIDTag dc353abd-d920-4c17-b911-55bd1c78c06f)": 1 }));

      assert(equal(fromJSON(toJSON(x)), x));
    });
  });
}
