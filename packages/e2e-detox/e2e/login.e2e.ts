import { beforeEach, describe, it } from '@jest/globals'
import { invalidCredentials, validCredentials } from '../src/support/credentials'
import { listScreen, loginScreen } from '../src/screens'

describe('Login (Detox, gray-box)', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true })
  })

  it('shows an inline error on invalid credentials', async () => {
    const { username, password } = invalidCredentials()
    await loginScreen.login(username, password)

    await loginScreen.waitForError()
    await expect(loginScreen.errorMessage).toBeVisible()
  })

  it('navigates to the task list on valid credentials', async () => {
    const { username, password } = validCredentials()
    await loginScreen.login(username, password)

    await listScreen.waitToBeVisible()
    await expect(element(listScreen.selfMatcher)).toBeVisible()
  })
})
