import {Page, Locator} from "@playwright/test";
import {PageActions} from "@ui/utils/PageActions";
import {NavigationServicesMenu} from "@ui/utils/NavigationServicesMenu";

export class OpenNewAccountPage {
    private readonly action: PageActions;
    readonly navMenu: NavigationServicesMenu;

    constructor(private readonly page: Page) {
        this.action = new PageActions(page)
        this.navMenu = new NavigationServicesMenu(page)
    }
    // Locators
    private get openNewAccountText(): Locator {
        return this.page.getByRole('heading', {name: 'Open New Account'})
    }
    private get accountTypeSelect(): Locator {
        return this.page.locator('select#type')
    }
    private get existingAccountSelect(): Locator {
        return this.page.locator('select#fromAccountId')
    }
    private get openNewAccountButton(): Locator {
        return this.page.getByRole('button', {name: 'Open New Account'})
    }
    private get newAccountOpened(): Locator {
        return this.page.locator('#newAccountId')
    }
    private get accountOpenedSuccessfulMessage(): Locator {
        return this.page.getByRole('heading', {name: 'Account Opened!'})
    }

    // Actions
    async getHeaderText() {
        return  this.action.getText(this.openNewAccountText)
    }
    async selectAccountType(typeAccount: string) {
        await this.action.selectOption(this.accountTypeSelect, typeAccount)
    }
    async selectFromAccount(accountNumber: string) {
        await this.action.selectOption(this.existingAccountSelect, accountNumber);
    }
    async clickOnOpeningNewAccountButton() {
        await this.action.click(this.openNewAccountButton);
    }
    async getNewOpenAccountNumber() {
        await this.action.waitForVisibility(this.newAccountOpened)
        return this.action.getText(this.newAccountOpened)
    }
    async accountOpenedHeading() {
        return this.action.getText(this.accountOpenedSuccessfulMessage)
    }
}