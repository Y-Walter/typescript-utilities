import { ifR } from "@y-walter/typescript-utilities";

const main = () => {
  console.log("conditions/if: Start the main function.");
  // GCD of 12 and 18.
  console.log("GCD of 12 and 18: " + gcd(12, 18));

};

/**
 * Calculates the greatest common divisor (GCD) of two numbers.
 * 
 * @param a - The first number.
 * @param b - The second number.
 * @returns The greatest common divisor of `a` and `b`.
 */
function gcd(a: number, b: number): number {
  return ifR(a === 0, {
    THEN: b,
    ELSE: () => gcd(b % a, a)
  });
}

// Run the main function.
main();
