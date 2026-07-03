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
    await this.item(id).tap()
  }

  async logout(): Promise<void> {
    await this.logoutButton.tap()
  }
}
