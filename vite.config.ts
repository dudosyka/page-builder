import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      "@element": path.resolve(".", './src/core/element'),
      "@state": path.resolve(".", './src/core/state'),
      "@module": path.resolve(".", './src/core/module'),
      "@lib": path.resolve(".", './src/core'),

      "@attributes": path.resolve(".", './src/attributes'),
      "@components": path.resolve(".", './src/components'),
    },
  },
})