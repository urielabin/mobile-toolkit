import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Only the pure, device-free support-module tests -- the e2e/*.e2e.ts
    // specs are a real Detox suite run via `detox test`, not through Vitest.
    include: ['src/**/*.spec.ts'],
  },
})
