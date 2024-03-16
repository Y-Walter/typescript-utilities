import { ValueOrFunc} from "@/utils/valueOrFunc";
import { whenInternal } from "@/conditions/when/internal";
import { WhenError, WhenErrorReason } from "@/conditions/when/errors/WhenError";

/**
 * Executes the provided cases based on the specified mode.
 * 
 * @param mode - The mode to determine how the cases are executed. 
 *               - 'exclusive': Only the first matching case will be executed.
 *               - 'inclusive': All matching cases will be executed.
 * @param cases - An array of `CaseOfWhen` objects representing the cases to be executed.
 * @throws {WhenError} - Throws an error when no cases are provided, no matched cases are found, or an illegal else case is used.
 */
export function when(
  mode: ModeOfWhen,
  ...cases: Array<CaseOfWhen>
): void {
  whenInternal(cases, {exclusive: mode === "exclusive"});
}
export type ModeOfWhen = "exclusive" | "inclusive";
export type CaseOfWhen = [ValueOrFunc<boolean | "else">, ValueOrFunc<void>];


/**
 * Executes the provided cases and returns the result of the first matching case.
 * 
 * @template R - The return type of the function.
 * @param {...CaseOfWhenR} cases - The cases to be evaluated.
 * @returns {R} - The result of the first matching case.
 * @throws {WhenError} - Throws an error when no cases are provided, no matched cases are found, or an illegal else case is used.
 */
export function whenR<R>(...cases: Array<CaseOfWhenR>): R {
  return whenInternal(cases, {withReturnValue: true, exclusive: true}) as R;
}
export type CaseOfWhenR = [ValueOrFunc<boolean | 'else'>, ValueOrFunc<unknown>];

// export from descendent files declarations
export { WhenError, WhenErrorReason };
