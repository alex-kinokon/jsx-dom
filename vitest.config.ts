import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    setupFiles: ["./test/register.js"],
  },
  define: {
    __FULL_BUILD__: true,
  },
})
