import { getValue } from '@/utils/valueOrFunc';
import {expect, test} from 'vitest';

test('should return the value if it is not a function', () => {
  const value = 42;
  const result = getValue(value);
  expect(result).toBe(value);
});

test('should invoke the function and return its result if the value is a function', () => {
  const func = () => 'Hello, World!';
  const result = getValue(func);
  expect(result).toBe('Hello, World!');
});
