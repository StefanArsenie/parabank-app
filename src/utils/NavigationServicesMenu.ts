import { Page } from '@playwright/test';
import {PageActions} from '@utils/PageActions';

export class NavigationServicesMenu {
    private readonly action: PageActions;

    constructor(private readonly page: Page) {
        this.action = new PageActions(page);
    }
    // Locators
    private get openNewAccount() {
        return this.page.getByRole('link', {name: 'Open New Account'});
    }
    private get accountsOverview()  {
        return this.page.getByRole('link', {name: 'Accounts Overview'})
    }
    private get transferFunds() {
        return this.page.getByRole('link', {name: 'Transfer Funds'});
    }
    private get billPay() {
        return this.page.getByRole('link', {name: 'Bill Pay'});
    }
    private get findTransactions() {
        return this.page.getByRole('link', {name: 'Find Transactions'});
    }
    private get updateContactInfo() {
        return this.page.getByRole('link', {name: 'Update Contact Info'});
    }
    private get requestLoan() {
        return this.page.getByRole('link', {name: 'Request Loan'});
    }
    private get logOut() {
        return this.page.getByRole('link', {name: 'Log Out'});
    }
    // Actions
    async goToOpenNewAccount() {
        await this.action.click(this.openNewAccount);
    }
    async goToAccountOverview() {
        await this.action.click(this.accountsOverview);
    }
    async goToTransferFunds() {
        await this.action.click(this.transferFunds);
    }
    async goToBillPay() {
        await this.action.click(this.billPay);
    }
    async goToFindTransactions() {
        await this.action.click(this.findTransactions);
    }
    async goToUpdateContactInfo() {
        await this.action.click(this.updateContactInfo);
    }
    async goToRequestLoan() {
        await this.action.click(this.requestLoan);
    }
    async goToLogOut() {
        await this.action.click(this.logOut);
    }
}