import { WhenErrorReason, when } from '@/when';
import { expect, test } from 'vitest';

test('should call whenInternal with exclusive mode when mode is "exclusive"', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
  };
  when('exclusive',
    [true, () => applyCases.calledFirstCase = true],
    [true, () => applyCases.calledSecondCase = true],
    [true, () => applyCases.calledThirdCase = true],
  );
  expect(applyCases.calledFirstCase).toBe(true);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledThirdCase).toBe(false);
});

test('should call whenInternal with exclusive mode when mode is "exclusive" and all cases are false', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
  };
  when('exclusive',
    [false, () => applyCases.calledFirstCase = true],
    [false, () => applyCases.calledSecondCase = true],
    [false, () => applyCases.calledThirdCase = true],
  );
  expect(applyCases.calledFirstCase).toBe(false);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledThirdCase).toBe(false);
});

test('should call whenInternal with exclusive mode when mode is "exclusive" and all cases are false except the else case', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledElseCase: false,
  };
  when('exclusive',
    [false, () => applyCases.calledFirstCase = true],
    [false, () => applyCases.calledSecondCase = true],
    ['else', () => applyCases.calledElseCase = true],
  );
  expect(applyCases.calledFirstCase).toBe(false);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledElseCase).toBe(true);
});

test('should call whenInternal with inclusive mode when mode is "inclusive"', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
  };
  when('inclusive',
    [true, () => applyCases.calledFirstCase = true],
    [false, () => applyCases.calledSecondCase = true],
    [true, () => applyCases.calledThirdCase = true],
  );
  expect(applyCases.calledFirstCase).toBe(true);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledThirdCase).toBe(true);
});

test('should call whenInternal with inclusive mode when mode is "inclusive" and all cases are true', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
  };
  when('inclusive',
    [true, () => applyCases.calledFirstCase = true],
    [true, () => applyCases.calledSecondCase = true],
    [true, () => applyCases.calledThirdCase = true],
  );
  expect(applyCases.calledFirstCase).toBe(true);
  expect(applyCases.calledSecondCase).toBe(true);
  expect(applyCases.calledThirdCase).toBe(true);
});

test('should call whenInternal with inclusive mode when mode is "inclusive" and all cases are false', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
  };
  when('inclusive',
    [false, () => applyCases.calledFirstCase = true],
    [false, () => applyCases.calledSecondCase = true],
    [false, () => applyCases.calledThirdCase = true],
  );
  expect(applyCases.calledFirstCase).toBe(false);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledThirdCase).toBe(false);
});

test('should call whenInternal with inclusive mode when mode is "inclusive" and all cases are false except the else case', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledElseCase: false,
  };
  when('inclusive',
    [false, () => applyCases.calledFirstCase = true],
    [false, () => applyCases.calledSecondCase = true],
    ['else', () => applyCases.calledElseCase = true],
  );
  expect(applyCases.calledFirstCase).toBe(false);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledElseCase).toBe(true);
});

// illegal cases
test('should throw an error when no cases are provided in spite of exclusive mode', () => {
  expect(() => when('exclusive'))
    .toThrowError(WhenErrorReason.NO_CASES);
});
test('should throw an error when the else case is not the last case in spite of exclusive mode', () => {
  expect(() => when('exclusive', [true, () => {}], ['else', () => {}], [true, () => {}]))
    .toThrowError(WhenErrorReason.ELSE_CASE_NOT_LAST);
});

test('should throw an error when no cases are provided in spite of inclusive mode', () => {
  expect(() => when('inclusive'))
    .toThrowError(WhenErrorReason.NO_CASES);
});

test('should throw an error when the else case is not the last case in spite of inclusive mode', () => {
  expect(() => when('inclusive', [true, () => {}], ['else', () => {}], [true, () => {}]))
    .toThrowError(WhenErrorReason.ELSE_CASE_NOT_LAST);
});
