
/**
 * Executes the provided action within a try-catch block and handles any errors that occur.
 * 
 * @template R - The return type of the action.
 * @param {() => R} action - The action to be executed.
 * @param {HandlingAction<R>} options - The options for handling the action's result and errors.
 * @returns {R} - The result of the action.
 */
export function tryCatchR<R>(
  action: () => R,
  { onError, onEnd }: HandlingAction<R>,
): R {
  let result: R;
  try {
    result = action();
  } catch (error) {
    result = onError(error as Error);
  } finally {
    if (onEnd) onEnd();
  }
  return result;
}

/**
 * Represents the options for handling the result and errors of an action.
 * @template R - The return type of the action.
 * @property {Function} [onError] - The function to execute when an error occurs.
 * @property {Function} [onEnd] - The function to execute after the action has completed.
 */
type HandlingAction<R> = {
  onError: (error: Error) => R;
  onEnd?: () => void;
};
