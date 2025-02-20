import { initialData } from "../seed/seed.js";

export function jsonConvert(data) {
  let string = JSON.stringify(data);
  return string;
}

const newData = jsonConvert(initialData);

console.log(newData);
