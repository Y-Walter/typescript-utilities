// @ts-check

import eslint from "@eslint/js";
import tslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * @type {import("typescript-eslint").Config}
 */
export default tslint.config(
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.ts"],
    ignores: [
      "node_modules/**/*", 
      "dist/**/*",
    ]
  },
);
