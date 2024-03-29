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
    
    // https://vitest.dev/guide/reporters#github-actions-reporter
    reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],

    coverage: {
      exclude: [
        "test/**/*.ts", 
        "node_modules", 
        "dist", 
        "src/index.ts" // exclude the entry file; it is only used for export
      ]
    }
  }
});
