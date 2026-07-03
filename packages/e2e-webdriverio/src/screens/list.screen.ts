import { $ } from '@wdio/globals'
import { BaseScreen } from './base.screen'

export class ListScreen extends BaseScreen {
  get selfSelector() {
    return '~list-screen'
  }

  get logoutButton() {
    return $('~list-logout-button')
  }

  item(id: string) {
    return $(`~list-item-${id}`)
  }

  async openItem(id: string): Promise<void> {
    await this.item(id).click()
  }

  async logout(): Promise<void> {
    await this.logoutButton.click()
  }
}
