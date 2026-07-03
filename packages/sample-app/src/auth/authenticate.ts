export const VALID_USERNAME = 'testuser'
export const VALID_PASSWORD = 'Password123'

/** Simulates a real async login call (network latency) — the deliberate synchronization contrast point between Detox (auto-waits) and WebdriverIO/Appium (needs an explicit wait). */
export function authenticate(username: string, password: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(username === VALID_USERNAME && password === VALID_PASSWORD)
    }, 1500)
  })
}
