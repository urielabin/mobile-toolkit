import { fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import App from '../App'

describe('App', () => {
  it('renders the login screen initially', async () => {
    await render(<App />)
    expect(screen.getByTestId('login-username-input')).toBeTruthy()
    expect(screen.getByTestId('login-submit-button')).toBeTruthy()
  })

  it('shows an inline error on invalid credentials', async () => {
    await render(<App />)

    await fireEvent.changeText(screen.getByTestId('login-username-input'), 'wrong-user')
    await fireEvent.changeText(screen.getByTestId('login-password-input'), 'wrong-pass')
    await fireEvent.press(screen.getByTestId('login-submit-button'))

    await waitFor(() => expect(screen.getByTestId('login-error-message')).toBeTruthy(), { timeout: 3000 })
  })

  it('navigates to the task list on valid credentials, and logout returns to login', async () => {
    await render(<App />)

    await fireEvent.changeText(screen.getByTestId('login-username-input'), 'testuser')
    await fireEvent.changeText(screen.getByTestId('login-password-input'), 'Password123')
    await fireEvent.press(screen.getByTestId('login-submit-button'))

    await waitFor(() => expect(screen.getByTestId('list-screen')).toBeTruthy(), { timeout: 3000 })

    await fireEvent.press(screen.getByTestId('list-logout-button'))

    await waitFor(() => expect(screen.getByTestId('login-username-input')).toBeTruthy())
  })
})
