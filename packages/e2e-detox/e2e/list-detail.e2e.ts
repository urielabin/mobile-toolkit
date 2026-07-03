import { beforeEach, describe, it } from '@jest/globals'
import { validCredentials } from '../src/support/credentials'
import { detailScreen, listScreen, loginScreen } from '../src/screens'

describe('List -> Detail -> Logout (Detox, gray-box)', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true })
  })

  it('opens a task and navigates back, then logs out to the login screen', async () => {
    const { username, password } = validCredentials()
    await loginScreen.login(username, password)
    await listScreen.waitToBeVisible()

    await listScreen.openItem('1')
    await detailScreen.waitToBeVisible()
    await expect(detailScreen.title).toBeVisible()

    await detailScreen.goBack()
    await listScreen.waitToBeVisible()

    await listScreen.logout()
    await loginScreen.waitToBeVisible()
    await expect(element(loginScreen.selfMatcher)).toBeVisible()
  })
})
