export interface Task {
  readonly id: string
  readonly title: string
  readonly description: string
}

export const TASKS: readonly Task[] = [
  { id: '1', title: 'Write E2E tests', description: 'Cover the login, list, and detail flows end to end.' },
  { id: '2', title: 'Wire up CI', description: 'Lint, typecheck, and unit test on every push.' },
  { id: '3', title: 'Add Fastlane lanes', description: 'Unsigned debug builds for Android and iOS.' },
  { id: '4', title: 'Review Screen Objects', description: 'Compare the WebdriverIO and Detox implementations.' },
  { id: '5', title: 'Ship it', description: 'Push to GitHub and update the portfolio.' },
]

export function findTask(id: string): Task | undefined {
  return TASKS.find((task) => task.id === id)
}
