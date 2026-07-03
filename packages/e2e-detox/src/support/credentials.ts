export interface Credentials {
  readonly username: string
  readonly password: string
}

/** Pure, device-free test-data builder — the only part of this package that can run without a real device/emulator. */
export function validCredentials(): Credentials {
  return { username: 'testuser', password: 'Password123' }
}

export function invalidCredentials(): Credentials {
  return { username: 'wrong-user', password: 'wrong-pass' }
}
