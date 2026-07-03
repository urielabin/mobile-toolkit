import { describe, expect, it } from 'vitest'
import { invalidCredentials, validCredentials } from './credentials'

describe('credentials', () => {
  it('produces valid credentials matching the sample app', () => {
    expect(validCredentials()).toEqual({ username: 'testuser', password: 'Password123' })
  })

  it('produces invalid credentials distinct from the valid ones', () => {
    const valid = validCredentials()
    const invalid = invalidCredentials()
    expect(invalid.username).not.toBe(valid.username)
    expect(invalid.password).not.toBe(valid.password)
  })
})
