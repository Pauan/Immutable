import { hash } from "./hash";

export function equal(x, y) {
  return x === y || hash(x) === hash(y);
}
