import { $ } from '@wdio/globals'

/**
 * Common "is this screen up?" behavior shared by every screen object. Unlike
 * Playwright's BasePage, this does NOT take a driver/page in its
 * constructor: WebdriverIO has exactly one implicit `browser`/`driver` per
 * test worker, so screens are idiomatically stateless singletons (see
 * src/screens/index.ts), not DI-constructed per test the way Playwright's
 * fixtures do it.
 */
export abstract class BaseScreen {
  /** Accessibility-id selector (`~testID`) for an element unique to this screen. */
  abstract get selfSelector(): string

  async waitForDisplayed(timeout = 10_000): Promise<void> {
    await $(this.selfSelector).waitForDisplayed({ timeout })
  }

  async isDisplayed(): Promise<boolean> {
    return $(this.selfSelector).isDisplayed()
  }
}
