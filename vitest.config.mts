import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    setupFiles: ["./test/_register.ts"],
    environment: "jsdom",
  },
  define: {
    __FULL_BUILD__: true,
  },
})
