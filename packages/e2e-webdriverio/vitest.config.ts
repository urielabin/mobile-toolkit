import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Only the pure, device-free support-module tests -- the WDIO Mocha
    // specs under tests/**/*.spec.ts are a real E2E suite run via `wdio run`
    // against a device/emulator, not through Vitest.
    include: ['src/**/*.spec.ts'],
  },
})
