import {Page, Locator} from '@playwright/test';

export class PageActions {
    constructor(protected readonly page: Page) {}

    async navigate(path: string) {
        await this.page.goto(path);
    }

    async waitForVisibility(locator: Locator) {
        await locator.waitFor({state: 'visible'});
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async fill(locator: Locator, value: string) {
        await locator.fill(value)
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() ?? '';
    }
}