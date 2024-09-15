import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    coverage: {
      all: true,
      enabled: true,
      include: ["./src"],
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./.yarn/.vitest/coverage",
    },
    clearMocks: true,
    mockReset: true,
    reporters: ["verbose"],
    restoreMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
