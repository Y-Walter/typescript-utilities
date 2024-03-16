/**
 * Enum representing the reasons for a `WhenError`.
 */
export enum WhenErrorReason {
  /**
   * Indicates that no cases were provided.
   */
  NO_CASES = 'no cases provided; at least one case is required',

  /**
   * Indicates that no matched cases were found.
   */
  NO_MATCH_CASES = 'no matched cases found; at least one case must match the condition or an else case must be provided',

  /**
   * Indicates that an illegal option was used with a return value.
   */
  ILLEGAL_OPTION_WITH_RETURN_VALUE = 'illegal option with return value; exclusive must be true when withReturnValue is true',

  /**
   * Indicates that the else case should be the last case.
   * No case after the else case is executed.
   */
  ELSE_CASE_NOT_LAST = 'else case should be the last case; no case after else case is executed',
}

/**
 * Represents an error that occurs during the execution of a "when" operation.
 */
export class WhenError extends Error {
  constructor(reason: WhenErrorReason) {
    super(reason.toString());
  }
}
