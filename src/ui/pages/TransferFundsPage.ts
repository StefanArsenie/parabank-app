import {Page, Locator} from '@playwright/test'
import {PageActions} from '@ui/utils/PageActions'
import {NavigationServicesMenu} from '@ui/utils/NavigationServicesMenu'

export class TransferFundsPage {
    private readonly actions: PageActions;
    readonly navMenu: NavigationServicesMenu;

    constructor(private readonly page: Page) {
        this.actions = new PageActions(page);
        this.navMenu = new NavigationServicesMenu(page);
    }

    //Locators
    private get amountTransfer(): Locator {
        return this.page.locator('#amount');
    }
    private get fromAccount(): Locator {
        return this.page.locator('#fromAccountId');
    }
    private get toAccount(): Locator {
        return this.page.locator('#toAccountId');
    }
    private get transferButton(): Locator{
        return this.page.getByRole('button', {name: 'Transfer'});
    }
    private get transferCompleteHeading(): Locator {
        return this.page.getByRole('heading', {name: 'Transfer Complete!'});
    }
    private get amountResult(): Locator {
        return this.page.locator('#amountResult');
    }
    private get fromAccountResult(): Locator {
        return this.page.locator('#fromAccountIdResult');
    }
    private get toAccountResult(): Locator {
        return this.page.locator('#toAccountIdResult');
    }
    // Actions
    async enterAmountTransfer(amount: string) {
        await this.actions.fill(this.amountTransfer, amount);
    }
    async selectFromAccount(accountNumber: string) {
        await this.actions.selectOption(this.fromAccount, accountNumber)
    }
    async selectToAccount(accountNumber: string) {
        await this.actions.selectOption(this.toAccount, accountNumber);
    }
    async clickTransferButton() {
        await this.actions.click(this.transferButton);
    }
    async getTransferAmount() {
        return this.actions.getText(this.amountResult);
    }
    async getFromAccountResult() {
        return this.actions.getText(this.fromAccountResult)
    }
    async getToAccountResult() {
        return this.actions.getText(this.toAccountResult)
    }
}