/**
 * Represents a function that takes no parameters and returns a value of type `R`.
 * @template R The return type of the function.
 */
type NoParamFunc<R> = () => R;


/**
 * Represents a value or a function that returns a value.
 * @template R The type of the value or the return type of the function.
 */
export type ValueOrFunc<R> = R | NoParamFunc<R>;

/**
 * Retrieves the value from a given value or function.
 * If the input is a function, it will be invoked and its return value will be returned.
 * If the input is not a function, it will be returned as is.
 *
 * @param valueOrFunc - The value or function to retrieve the value from.
 * @returns The value obtained from the input.
 */
export function getValue<R>(valueOrFunc: ValueOrFunc<R>): R {
  if (typeof valueOrFunc === 'function') {
    return (valueOrFunc as NoParamFunc<R>)();
  }
  return valueOrFunc;
}
