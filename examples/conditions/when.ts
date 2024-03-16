import { when, whenR } from "@y-walter/typescript-utilities";

const main = () => {
  // Ask Nabeatsu for the numbers from 1 to 40.
  console.log("Ask Nabeatsu for the numbers from 1 to 40.");
  for (let i = 1; i <= 40; i++) {
    console.log(askNabeatsu(i));
  }
  console.log("---");

  // FizzBuzz for the numbers from 1 to 20.
  console.log("FizzBuzz for the numbers from 1 to 20.");
  for (let i = 1; i <= 20; i++) {
    console.log(fizzBuzz(i));
  }
  console.log("---");

  // Get the zodiac sign from the year.
  console.log("Get the zodiac sign from the year.");
  console.log(getEtoFromYear(2024));
  console.log("---");
};

/**
 * Returns a string based on the given number.
 * Throws an error if the number is less than or equal to 0.
 * @param num - The number to evaluate.
 * @returns The resulting string based on the conditions.
 * @throws Error if the number is less than or equal to 0.
 * 
 * Nabeatsu is a Japanese word game where you replace numbers with "AHO" based on the following conditions:
 * - If the number is divisible by 3, replace it with "AHO".
 * - If the number contains the digit 3, replace it with "AHO".
 * - Otherwise, return the number as a string.
 * 
 * origination: Sekai-no Nabeatsu is a Japanese comedian who is famous for this game.
 */
function askNabeatsu(num: number): string {
  if (num <= 0) throw new Error("The number must be greater than 0.");
  let result: string = num.toString();

  when("exclusive",
    [() => num % 3 === 0, () => result = "AHO"],
    [() => num.toString().includes('3'), () => result = "AHO"],
  );
  return result;
};

/**
 * FizzBuzz is a word game where you replace numbers with "Fizz", "Buzz", or "FizzBuzz" based on the following conditions:
 * - If the number is divisible by 3, replace it with "Fizz".
 * - If the number is divisible by 5, replace it with "Buzz".
 * - If the number is divisible by both 3 and 5, replace it with "FizzBuzz".
 * - Otherwise, return the number as a string.
 */
function fizzBuzz(num: number): string {
  let result: string = "";
  when("inclusive",
    [() => num % 3 === 0, () => result += "Fizz"],
    [() => num % 5 === 0, () => result += "Buzz"],
    ["else", () => result = num.toString()]
  );
  return result;
};

/**
 * Eto is a Japanese zodiac sign based on the year.
 * The zodiac sign is based on a 12-year cycle, where each year is associated with an animal sign.
 * The cycle is as follows:
 * - Mouse
 * - Cow
 * - Tiger
 * - Rabbit
 * - Dragon
 * - Snake
 * - Horse
 * - Sheep
 * - Monkey
 * - Chicken
 * - Dog
 * - Boar
 * 
 * @param year - The year to evaluate.
 * @returns The zodiac sign based on the year.
 * 
 * @example
 * getEtoFromYear(2023); // "Rabbit"
 */
function getEtoFromYear(year: number): string {
  const adjustedYear = year + 9;
  return whenR(
    [() => adjustedYear % 12 === 0, "Mouse"],
    [() => adjustedYear % 12 === 1, "Cow"],
    [() => adjustedYear % 12 === 2, "Tiger"],
    [() => adjustedYear % 12 === 3, "Rabbit"],
    [() => adjustedYear % 12 === 4, "Dragon"],
    [() => adjustedYear % 12 === 5, "Snake"],
    [() => adjustedYear % 12 === 6, "Horse"],
    [() => adjustedYear % 12 === 7, "Sheep"],
    [() => adjustedYear % 12 === 8, "Monkey"],
    [() => adjustedYear % 12 === 9, "Chicken"],
    [() => adjustedYear % 12 === 10, "Dog"],
    [() => adjustedYear % 12 === 11, "Boar"],
  );
}



// execute the main function
main();
