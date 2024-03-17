import { ValueOrFunc, getValue } from "@/utils/valueOrFunc";
import { WhenError, WhenErrorReason } from "@/conditions/when/errors/WhenError";

/**
 * Executes a series of cases based on conditions and returns a value or void.
 *
 * @template ReturnOfFunc - The return type of the function.
 * @template ReturnOfCase - The return type of each case.
 * @param {Array<[ValueOrFunc<boolean | 'else'>, ValueOrFunc<ReturnOfCase>]>} cases - An array of cases, where each case is a tuple of a condition and an action.
 * @param {WhenOptions} options - Options for the execution.
 * @returns {ReturnOfFunc | void} - The return value of the function or void.
 * @throws {WhenError} - Throws an error when no cases are provided, no matched cases are found, or an illegal option is used with a return value.
 */
export function whenInternal<ReturnOfFunc, ReturnOfCase>(
  cases: Array<[ValueOrFunc<boolean | 'else'>, ValueOrFunc<ReturnOfCase>]>,
  {withReturnValue = false, exclusive = false}: WhenOptions = {},
): ReturnOfFunc | void {
  // pre
  if (cases.length === 0) throw new WhenError(WhenErrorReason.NO_CASES);
  if (withReturnValue == true && exclusive == false) {
    throw new WhenError(WhenErrorReason.ILLEGAL_OPTION_WITH_RETURN_VALUE);
  }
  if (cases.some((caseOfWhen, index) => caseOfWhen[0] === 'else' && index !== cases.length - 1)) {
    throw new WhenError(WhenErrorReason.ELSE_CASE_NOT_LAST);
  }

  // exec
  for (const [condition, action] of cases) {
    const conditionValue = getValue(condition);
    if (conditionValue !== 'else' && conditionValue === false) continue;

    const result = getValue(action);
    if (!exclusive) continue;
    if (withReturnValue) return result as unknown as ReturnOfFunc;
    return;
  }

  // post
  if (withReturnValue) throw new WhenError(WhenErrorReason.NO_MATCH_CASES);
}

/**
 * Options for the `when` function.
 */
interface WhenOptions {
  /**
   * Specifies whether the `when` function should return a value.
   * @default false
   */
  withReturnValue?: boolean;

  /**
   * Specifies whether the `when` function should be exclusive.
   * @default false
   */
  exclusive?: boolean;
}
