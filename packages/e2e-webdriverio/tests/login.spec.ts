import { expect } from '@wdio/globals'
import { invalidCredentials, validCredentials } from '../src/support/credentials'
import { listScreen, loginScreen } from '../src/screens'

describe('Login (WebdriverIO + Appium, black-box)', () => {
  it('shows an inline error on invalid credentials', async () => {
    const { username, password } = invalidCredentials()
    await loginScreen.login(username, password)

    await expect(loginScreen.errorMessage).toBeDisplayed()
  })

  it('navigates to the task list on valid credentials', async () => {
    const { username, password } = validCredentials()
    await loginScreen.login(username, password)

    await listScreen.waitForDisplayed()
    await expect(listScreen.isDisplayed()).resolves.toBe(true)
  })
})
