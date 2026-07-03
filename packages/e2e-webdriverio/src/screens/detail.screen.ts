import { $ } from '@wdio/globals'
import { BaseScreen } from './base.screen'

export class DetailScreen extends BaseScreen {
  get selfSelector() {
    return '~detail-title'
  }

  get title() {
    return $('~detail-title')
  }

  get description() {
    return $('~detail-description')
  }

  get backButton() {
    return $('~detail-back-button')
  }

  async goBack(): Promise<void> {
    await this.backButton.click()
  }
}
