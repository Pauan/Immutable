import { hash } from "./hash";

// TODO support -0 and 0 ?
export function equal(x, y) {
  return x === y || hash(x) === hash(y);
}
