import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

/** 
 * @type {import("vite").defineConfig}
 */
export default defineConfig({
  mode: process.env.MODE,
  root: __dirname,
  resolve: {
    alias: {
      "@/": path.join(__dirname, "./src") + "/"
    }
  },
  plugins: [
    dts({
      rollupTypes: true,
      tsconfigPath: "tsconfig.build.json",
    })
  ],
  build: {
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  test: {
    include: ["test/**/*.{test,spec}.ts"],
  }
});
