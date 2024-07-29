import { CreateTag } from "../../../lib/tag/createTag";
import { expect, test, describe } from "@jest/globals";
import "@testing-library/jest-dom";

describe("createTag test", () => {
  test("should return object", async () => {
    expect(await CreateTag("testtag1")).toStrictEqual({
      message: "already exit tag",
    });
    expect(await CreateTag("testtag2")).toStrictEqual({
      message: "create success",
    });
  });
});
