import browserslistToEsbuild from "browserslist-to-esbuild";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: browserslistToEsbuild(),
    minify: "terser",
    lib: {
      entry: "src/nvision.ts",
      formats: ["es"],
      fileName: () => "nvision.js",
    },
    rollupOptions: {
      output: {
        codeSplitting: false,
      },
    },
  },
  preview: {
    port: 4000,
    host: "0.0.0.0",
    cors: true,
  },
});
