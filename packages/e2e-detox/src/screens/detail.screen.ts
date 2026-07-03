import { BaseScreen } from './base.screen'

export class DetailScreen extends BaseScreen {
  get selfMatcher() {
    return by.id('detail-title')
  }

  get title() {
    return element(by.id('detail-title'))
  }

  get description() {
    return element(by.id('detail-description'))
  }

  get backButton() {
    return element(by.id('detail-back-button'))
  }

  async goBack(): Promise<void> {
    await this.backButton.tap()
  }
}
