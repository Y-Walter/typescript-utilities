import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

/** 
 * @type {import("vite").defineConfig}
 */
export default defineConfig({
  resolve: {
    alias: {
      "/@": path.join(__dirname, "src/")
    }
  },
  plugins: [
    dts({
      rollupTypes: true,
      tsconfigPath: "tsconfig.build.json",
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@y-walter/typescript-utilities",
      fileName: (format) => `lib.${format}.js`,
    }
  }
});
