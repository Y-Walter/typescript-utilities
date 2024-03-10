import {expect, test} from "vitest";
import { externalHello } from "@/utils/external";

test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2);
  expect(externalHello).toBe("こんにちは");
});
