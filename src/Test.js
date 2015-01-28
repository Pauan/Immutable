import "./Test/shim";
import { test_run } from "./Test/assert";
import { test_Dict } from "./Test/Dict";
import { test_Set } from "./Test/Set";
import { test_List } from "./Test/List";
import { test_Tuple } from "./Test/Tuple";
import { test_Queue } from "./Test/Queue";
import { test_Stack } from "./Test/Stack";
import { test_Record } from "./Test/Record";
import { test_Ref } from "./Test/Ref";
import { test_Tag } from "./Test/Tag";
import { test_misc } from "./Test/misc";
import { test_iter } from "./Test/iter";
import { test_Type } from "./Test/Type";

test_run(function () {
  test_Dict();
  test_Set();
  test_List();
  test_Tuple();
  test_Queue();
  test_Stack();
  test_Record();
  test_Ref();
  test_Tag();
  test_misc();
  test_iter();
  test_Type();
});
