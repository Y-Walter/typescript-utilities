import { ValueOrFunc, getValue } from "@/utils/valueOrFunc";

/**
 * Executes a conditional statement and returns the appropriate value based on the condition.
 *
 * @template R - The return type of the function.
 * @param trueCondition - The condition to evaluate. Can be a boolean value or a function that returns a boolean.
 * @param THEN - The value or function to execute if the condition is true.
 * @param ELSE - The value or function to execute if the condition is false.
 * @returns The result of executing the appropriate action based on the condition.
 */
export function ifR<R>(
  trueCondition: ValueOrFunc<boolean>,
  { THEN, ELSE }: NextAction<R>
): R {
  if (getValue(trueCondition)) return getValue(THEN);
  return getValue(ELSE);
}

/**
 * Represents the next action to be taken in an if-else condition.
 * @template R The type of the result.
 */
export interface NextAction<R> {
  THEN: ValueOrFunc<R>,
  ELSE: ValueOrFunc<R>
}
