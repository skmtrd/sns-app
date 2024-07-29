import { expect, test, describe } from "@jest/globals";
import { checkUserIdExists } from "../../../lib/user/checkUserIdExists";
import "@testing-library/jest-dom";

describe("checkUserIdExists test", () => {
  test("should return boolean", async () => {
    expect(await checkUserIdExists("sakamoto0223")).toBe(true);
    expect(await checkUserIdExists("riku")).toBe(false);
  });
});
