import { format } from "@lib/Number";
import { describe, expect, test } from "@jest/globals";

describe("Number module", () => {
  const t = 100000;
  test(`Formating ${t} with commas`, () => {
    expect(format(t)).toEqual("100,000");
  });
});
