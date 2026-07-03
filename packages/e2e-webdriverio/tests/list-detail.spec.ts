import { expect } from '@wdio/globals'
import { validCredentials } from '../src/support/credentials'
import { detailScreen, listScreen, loginScreen } from '../src/screens'

describe('List -> Detail -> Logout (WebdriverIO + Appium, black-box)', () => {
  it('opens a task and navigates back, then logs out to the login screen', async () => {
    const { username, password } = validCredentials()
    await loginScreen.login(username, password)
    await listScreen.waitForDisplayed()

    await listScreen.openItem('1')
    await detailScreen.waitForDisplayed()
    await expect(detailScreen.title).toBeDisplayed()

    await detailScreen.goBack()
    await listScreen.waitForDisplayed()

    await listScreen.logout()
    await loginScreen.waitForDisplayed()
    await expect(loginScreen.isDisplayed()).resolves.toBe(true)
  })
})
