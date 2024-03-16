
import { WhenErrorReason } from '@/conditions/when/errors/WhenError';
import { whenInternal } from '@/conditions/when/internal';
import { expect, test } from 'vitest';

// Test the whenInternal function

// normal cases
test('whenInternal: default options, 条件を満たすすべてのケースが上から順に実行されて、戻り値はない', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
  };
  const result = whenInternal([
    [true, () => applyCases.calledFirstCase = true],
    [true, () => applyCases.calledSecondCase = true],
    [true, () => applyCases.calledThirdCase = true],
  ]);
  expect(result).toBeUndefined();
  expect(applyCases.calledFirstCase).toBe(true);
  expect(applyCases.calledSecondCase).toBe(true);
  expect(applyCases.calledThirdCase).toBe(true);
});

test('whenInternal: exclusive: true, withReturnValue: false, 条件を満たす最初のケースが実行されて、戻り値はない', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
  };
  const result = whenInternal([
    [true, () => applyCases.calledFirstCase = true],
    [true, () => applyCases.calledSecondCase = true],
    [true, () => applyCases.calledThirdCase = true],
  ], {exclusive: true});
  expect(result).toBeUndefined();
  expect(applyCases.calledFirstCase).toBe(true);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledThirdCase).toBe(false);
});

test('whenInternal: exclusive: true, withReturnValue: true, 条件を満たす最初のケースが実行されて、戻り値がある', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
  };
  const result = whenInternal([
    [true, () => {
      applyCases.calledFirstCase = true;
      return "first";
    }],
    [true, () => {
      applyCases.calledSecondCase = true;
      return "second";
    }],
    [true, () => {
      applyCases.calledThirdCase = true;
      return "third";
    }],
  ], {withReturnValue: true, exclusive: true});

  expect(result).toBe("first");
  expect(applyCases.calledFirstCase).toBe(true);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledThirdCase).toBe(false);
});

test('whenInternal: else case, 条件を満たすケースがない場合、elseケースが実行されて、戻り値はない', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledElseCase: false,
  };
  const result = whenInternal([
    [false, () => applyCases.calledFirstCase = true],
    [false, () => applyCases.calledSecondCase = true],
    ['else', () => applyCases.calledElseCase = true],
  ]);
  expect(result).toBeUndefined();
  expect(applyCases.calledFirstCase).toBe(false);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledElseCase).toBe(true);
});

test('whenInternal: else case with return value, 条件を満たすケースがない場合、elseケースが実行されて、戻り値がある', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledElseCase: false,
  };
  const result = whenInternal<String, String>([
    [false, () => {
      applyCases.calledFirstCase = true;
      return "first";
    }],
    [false, () => {
      applyCases.calledSecondCase = true;
      return "second";
    }],
    ['else', () => {
      applyCases.calledElseCase = true;
      return "else";
    }],
  ], {withReturnValue: true, exclusive: true});
  expect(result).toBe("else");
  expect(applyCases.calledFirstCase).toBe(false);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledElseCase).toBe(true);
});

test('whenInternal: exclusive: false, 条件を満たすすべてのケースが上から順に実行されて、戻り値がある。elseがある場合、elseケースは実行される', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
    calledElseCase: false,
  };
  const result = whenInternal([
    [true, () => {
      applyCases.calledFirstCase = true;
    }],
    [false, () => {
      applyCases.calledSecondCase = true;
    }],
    [true, () => {
      applyCases.calledThirdCase = true;
    }],
    ['else', () => {
      applyCases.calledElseCase = true;
    }],
  ], {exclusive: false});

  expect(result).toBeUndefined();
  expect(applyCases.calledFirstCase).toBe(true);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledThirdCase).toBe(true);
  expect(applyCases.calledElseCase).toBe(true);
});

test('whenInternal: exclusive: true, 条件を満たす最初のケースが実行されて、戻り値がある。elseがある場合、elseケースは実行されない', () => {
  const applyCases = {
    calledFirstCase: false,
    calledSecondCase: false,
    calledThirdCase: false,
    calledElseCase: false,
  };
  const result = whenInternal([
    [true, () => {
      applyCases.calledFirstCase = true;
      return "first";
    }],
    [false, () => {
      applyCases.calledSecondCase = true;
      return "second";
    }],
    [false, () => {
      applyCases.calledThirdCase = true;
      return "third";
    }],
    ['else', () => {
      applyCases.calledElseCase = true;
      return "else";
    }],
  ], {exclusive: true, withReturnValue: true});

  expect(result).toBe("first");
  expect(applyCases.calledFirstCase).toBe(true);
  expect(applyCases.calledSecondCase).toBe(false);
  expect(applyCases.calledThirdCase).toBe(false);
  expect(applyCases.calledElseCase).toBe(false);
});

// illegal cases
// no cases provided
test('whenInternal: no cases provided', () => {
  expect(() => {
    whenInternal([]);
  }).toThrow(WhenErrorReason.NO_CASES);
});

// no matched cases found
test('whenInternal: no matched cases found with return value', () => {
  expect(() => {
    whenInternal([
      [false, () => {}],
      [false, () => {}],
  ], {exclusive: true, withReturnValue: true});
  }).toThrow(WhenErrorReason.NO_MATCH_CASES);
});

// illegal option with return value
test('whenInternal: illegal option with return value', () => {
  expect(() => {
    whenInternal([[true, () => {}]], {withReturnValue: true, exclusive: false});
  }).toThrow(WhenErrorReason.ILLEGAL_OPTION_WITH_RETURN_VALUE);
});

// else case should be the last case
test('whenInternal: else case should be the last case', () => {
  expect(() => {
    whenInternal([
      [true, () => {}],
      ['else', () => {}],
      [true, () => {}],
    ]);
  }).toThrow(WhenErrorReason.ELSE_CASE_NOT_LAST);
});
