import { DetailScreen } from './detail.screen'
import { ListScreen } from './list.screen'
import { LoginScreen } from './login.screen'

// WDIO's idiomatic analog to Playwright's fixture DI: one implicit
// browser/driver per worker means screens are stateless singletons rather
// than per-test constructed objects.
export const loginScreen = new LoginScreen()
export const listScreen = new ListScreen()
export const detailScreen = new DetailScreen()
