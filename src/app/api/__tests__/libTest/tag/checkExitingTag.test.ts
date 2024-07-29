import { expect, test, describe } from "@jest/globals";
import { checkTagExits } from "../../../lib/tag/checkExitingTag";
import "@testing-library/jest-dom";

describe("checkTagExits test", () => {
  test("should return 200", async () => {
    expect(await checkTagExits("testtag1")).toBe(true);
    expect(await checkTagExits("riku")).toBe(false);
  });
});
