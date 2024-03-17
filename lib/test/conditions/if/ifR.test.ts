
import { ifR } from "@/conditions/if";
import {test, expect} from "vitest";

test("ifR true condition", () => {
  const result = ifR(true, {
    THEN: "It is true.",
    ELSE: "It is false."
  });
  expect(result).toBe("It is true.");
});

test("ifR false condition", () => {
  const result = ifR(false, {
    THEN: "It is true.",
    ELSE: "It is false."
  });
  expect(result).toBe("It is false.");
});

test("ifR true condition with function", () => {
  const result = ifR(() => true, {
    THEN: "It is true.",
    ELSE: "It is false."
  });
  expect(result).toBe("It is true.");
});

test("ifR false condition with function", () => {
  const result = ifR(() => false, {
    THEN: "It is true.",
    ELSE: "It is false."
  });
  expect(result).toBe("It is false.");
});

test("ifR true condition with function for THEN", () => {
  const result = ifR(true, {
    THEN: () => "It is true.",
    ELSE: "It is false."
  });
  expect(result).toBe("It is true.");
});

test("ifR false condition with function for THEN", () => {
  const result = ifR(false, {
    THEN: () => "It is true.",
    ELSE: "It is false."
  });
  expect(result).toBe("It is false.");
});

test("ifR true condition with function for ELSE", () => {
  const result = ifR(true, {
    THEN: "It is true.",
    ELSE: () => "It is false."
  });
  expect(result).toBe("It is true.");
});

test("ifR false condition with function for ELSE", () => {
  const result = ifR(false, {
    THEN: "It is true.",
    ELSE: () => "It is false."
  });
  expect(result).toBe("It is false.");
});
