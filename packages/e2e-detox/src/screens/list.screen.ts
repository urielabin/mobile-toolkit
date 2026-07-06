import { BaseScreen } from './base.screen'

export class ListScreen extends BaseScreen {
  get selfMatcher() {
    return by.id('list-screen')
  }

  get logoutButton() {
    return element(by.id('list-logout-button'))
  }

  item(id: string) {
    return element(by.id(`list-item-${id}`))
  }

  async openItem(id: string): Promise<void> {
    // toBeVisible() reports true as soon as react-navigation mounts the
    // screen, but the native push-transition (a UIKit UITransitionView slide,
    // ~350ms) is a plain CoreAnimation animation Detox's idle-sync doesn't
    // track -- the item is on screen but not yet hittable. A short buffer for
    // the transition to settle is the standard workaround (there's no Detox
    // API to wait on this specific animation).
    await waitFor(this.item(id)).toBeVisible().withTimeout(5_000)
    await new Promise((resolve) => setTimeout(resolve, 400))
    await this.item(id).tap()
  }

  async logout(): Promise<void> {
    await this.logoutButton.tap()
  }
}
