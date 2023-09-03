import { defineConfig } from 'vitest/config'
// @ts-ignore
import path from "path";
export default defineConfig({
  test: {
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      enabled: true
    }
  },
  resolve: {
    alias: {
      "@element": path.resolve(".", './src/core/element'),
      "@state": path.resolve(".", './src/core/state'),
      "@module": path.resolve(".", './src/core/module'),
      "@lib": path.resolve(".", './src/core'),

      "@attributes": path.resolve(".", './src/attributes'),
      "@components": path.resolve(".", './src/components'),
      "@themes": path.resolve(".", './src/themes'),
    },
  },
})