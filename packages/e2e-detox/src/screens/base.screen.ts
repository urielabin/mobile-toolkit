/** Common "is this screen up?" behavior shared by every screen object. */
export abstract class BaseScreen {
  abstract get selfMatcher(): Detox.NativeMatcher

  async waitToBeVisible(timeout = 10_000): Promise<void> {
    await waitFor(element(this.selfMatcher)).toBeVisible().withTimeout(timeout)
  }
}
