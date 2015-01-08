import * as benchmark from "./Benchmark";
import * as list from "./List";
import * as record from "./List";
import { header } from "./Header";

header();
list.run(10);
list.run(100);
list.run(1000);
list.run(10000);

header();
record.run(10);
record.run(100);
record.run(1000);
record.run(10000);

benchmark.run();
