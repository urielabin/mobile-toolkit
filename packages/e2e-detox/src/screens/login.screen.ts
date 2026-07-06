import { BaseScreen } from './base.screen'

export class LoginScreen extends BaseScreen {
  get selfMatcher() {
    return by.id('login-submit-button')
  }

  get usernameInput() {
    return element(by.id('login-username-input'))
  }

  get passwordInput() {
    return element(by.id('login-password-input'))
  }

  get submitButton() {
    return element(by.id('login-submit-button'))
  }

  get errorMessage() {
    return element(by.id('login-error-message'))
  }

  // Detox's idle-sync resolves once the auth timer callback fires, which can
  // be a beat before React actually commits the resulting setState/re-render
  // -- so the error text needs its own short poll rather than a bare
  // `expect(...).toBeVisible()` right after login().
  async waitForError(timeout = 5_000): Promise<void> {
    await waitFor(this.errorMessage).toBeVisible().withTimeout(timeout)
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.typeText(username)
    await this.passwordInput.typeText(password)
    await this.submitButton.tap()
    // Detox is gray-box: tap() talks to the RN JS thread directly and only
    // resolves once its automatic synchronization mechanism sees the app go
    // idle again (timers/network/animations included) -- so there is
    // deliberately no explicit wait for the loading indicator here. Contrast
    // with WebdriverIO/Appium's login() in
    // e2e-webdriverio/src/screens/login.screen.ts, which must wait explicitly.
  }
}
