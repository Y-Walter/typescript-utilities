import { WhenError, WhenErrorReason, whenR } from '@/conditions/when';
import { expect, test } from 'vitest';

test('should return the correct value based on the first matching case', () => {
  const result = whenR(
    [false, 'Case 1'],
    [true, 'Case 2'],
    [true, 'Case 3']
  );
  expect(result).toBe('Case 2');
});

test('should return the correct value based on else case when any other cases is not matched', () => {
  const result = whenR(
    [false, 'Case 1'],
    [false, 'Case 2'],
    ['else', 'Case else']
  );
  expect(result).toBe('Case else');
});

test('should execute the function and return the result', () => {
  const result = whenR(
    [() => false, 'Case 1'],
    [() => true, () => 'Case 2'],
    [() => true, 'Case 3']
  );
  expect(result).toBe('Case 2');
});

// invalid cases
test('should throw an error when no cases are provided', () => {
  expect(() => whenR())
    .toThrowError(WhenErrorReason.NO_CASES);
});
test('should throw an error when no matched cases are found', () => {
  expect(() => whenR([false, 'Case 1']))
  .toThrowError(WhenErrorReason.NO_MATCH_CASES);
});
test('should throw an error when the else case is not the last case', () => {
  expect(() => whenR([true, 'Case 1'], ['else', 'Case else'], [true, 'Case 2']))
    .toThrowError(WhenErrorReason.ELSE_CASE_NOT_LAST);
});
