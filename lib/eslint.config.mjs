// @ts-check

import eslint from "@eslint/js";
import tslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";


/**
 * @type {import("@eslint/eslintrc").FlatCompat}
 */
const compat = new FlatCompat({
    baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

/**
 * @type {import("typescript-eslint").Config}
 */
export default tslint.config(
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  {
    files: ["**/*.ts"],
    ignores: ["eslint.config.js", "package-lock.json", "node_modules", "dist"]
  },
  ...compat.plugins("import-access"),
  {
    rules: {
      "import-access/jsdoc": ["error"]
    }
  }
);
