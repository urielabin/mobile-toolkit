import { $ } from '@wdio/globals'
import { BaseScreen } from './base.screen'

export class LoginScreen extends BaseScreen {
  get selfSelector() {
    return '~login-submit-button'
  }

  get usernameInput() {
    return $('~login-username-input')
  }

  get passwordInput() {
    return $('~login-password-input')
  }

  get submitButton() {
    return $('~login-submit-button')
  }

  get loadingIndicator() {
    return $('~login-loading-indicator')
  }

  get errorMessage() {
    return $('~login-error-message')
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.setValue(username)
    await this.passwordInput.setValue(password)
    await this.submitButton.click()
    // Appium/WebdriverIO is black-box: it has no knowledge of the RN JS
    // thread's in-flight timers, so the transient loading state must be
    // waited out explicitly. Contrast with Detox's login() in
    // e2e-detox/src/screens/login.screen.ts, which needs no such wait.
    await this.loadingIndicator.waitForDisplayed({ reverse: true, timeout: 10_000 })
  }
}
