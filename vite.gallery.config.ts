import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: path.resolve(root, "gallery"),
  publicDir: path.resolve(root, "dist"),
  server: {
    port: 4000,
    host: "0.0.0.0",
    cors: true,
    fs: {
      allow: [root, path.resolve(root, "refs")],
    },
    proxy: {
      "/frontend_latest": {
        target: "https://demo.home-assistant.io",
        changeOrigin: true,
        secure: true,
      },
      "/frontend_es5": {
        target: "https://demo.home-assistant.io",
        changeOrigin: true,
        secure: true,
      },
      "/static": {
        target: "https://demo.home-assistant.io",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    port: 4000,
    host: "0.0.0.0",
  },
  build: {
    outDir: path.resolve(root, "dist-gallery"),
    emptyOutDir: true,
  },
});
