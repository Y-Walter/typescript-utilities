import { tryCatchR } from "@y-walter/typescript-utilities";

const main = () => {
  console.log("try-catch: Start the main function.");
  const validDate = parseDate("2024-01-30T09:24:00");
  console.log(validDate);
  const invalidDate = parseDate("invalid date string");
  console.log(invalidDate);
  console.log("try-catch: End the main function.");
};

/**
 * Parses a date string and returns a Date object.
 * Throws an error if the date string is invalid.
 *
 * @param dateString - The date string to parse.
 * @returns The parsed Date object.
 * @throws Error if the date string is invalid.
 */
const throwableDate = (dateString?: string): Date => {
  const date = dateString !== undefined ? new Date(dateString) : new Date();
  if (date.toDateString() === "Invalid Date") {
    throw new Error("The date is invalid.");
  }
  return date;
}

/**
 * Parses a date string and returns a Date object.
 * If an error occurs during parsing, it returns the current date.
 *
 * @param dateString - The date string to parse.
 * @returns The parsed Date object or the current date if parsing fails.
 */
const parseDate = (dateString: string): Date => {
  const date = tryCatchR(() => throwableDate(dateString), {
    onError: (error) => {
      console.log(error.message);
      return throwableDate();
    },
    onEnd: () => console.log("The date has been parsed.")
  });
  return date;
}

// Run the main function.
main();
