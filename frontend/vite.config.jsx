import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ESLint } from "eslint";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react(), ESLint()],
  };
});
