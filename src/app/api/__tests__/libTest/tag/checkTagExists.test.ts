import { expect, test, describe } from "@jest/globals";
import { checkTagExists } from "../../../lib/tag/checkTagExists";
import "@testing-library/jest-dom";

describe("checkTagExits test", () => {
  test("should return 200", async () => {
    expect(await checkTagExists("testtag1")).toBe(true);
    expect(await checkTagExists("riiii")).toBe(false);
  });
});
