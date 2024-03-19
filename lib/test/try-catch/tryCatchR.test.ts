import { tryCatchR } from "@/try-catch";
import { test, expect } from "vitest";

test("tryCatchR successful action", () => {
  const result = tryCatchR(() => 42, {
    onError: () => -1,
  });
  expect(result).toBe(42);
});

test("tryCatchR action throws an error", () => {
  const occurError = (): number => {
    throw new Error("Something went wrong");
  }
  const result = tryCatchR(() => {
      return occurError();
    }, {
      onError: () => -1,
    }
  );
  expect(result).toBe(-1);
});

test("tryCatchR action throws an error with onEnd callback", () => {
  let onEndCalled = false;
  const occurError = (): number => {
    throw new Error("Something went wrong");
  }
  const result = tryCatchR(() => {
      return occurError();
    }, {
      onError: () => -1,
      onEnd: () => onEndCalled = true,
    }
  );
  expect(result).toBe(-1);
  expect(onEndCalled).toBe(true);
});

test("tryCatchR action throws an error in onError, then onEnd callback is invoked", () => {
  let onEndCalled = false;
  const occurError = (): number => {
    throw new Error("Something went wrong in onError");
  }
  expect(() => {
    tryCatchR(() => {
        throw new Error("Something went wrong");
      }, {
        onError: () => {
          occurError();
        },
        onEnd: () => onEndCalled = true,
      }
    );
  }).toThrowError("Something went wrong in onError");
  expect(onEndCalled).toBe(true);
});
