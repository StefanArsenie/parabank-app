import {Page, Locator} from '@playwright/test';
import {PageActions} from '@ui/utils/PageActions';
import {NavigationServicesMenu} from '@ui/utils/NavigationServicesMenu';
import {BillPay} from '@data/billPay';

export class BillPayPage {
    private readonly action: PageActions;
    readonly navMenu: NavigationServicesMenu;

    constructor(private readonly page: Page) {
        this.action = new PageActions(page);
        this.navMenu = new NavigationServicesMenu(page);
    }
    // Locators
    private get billPayTitle(): Locator {
        return this.page.getByRole('heading', {name: 'Bill Payment Service'})
    }
    private get payeeNameInput(): Locator {
        return this.page.locator('input[name="payee.name"]');
    }
    private get addressInput(): Locator {
        return this.page.locator('input[name="payee.address.street"]');
    }
    private get cityInput(): Locator {
        return this.page.locator('input[name="payee.address.city"]');
    }
    private get stateInput(): Locator {
        return this.page.locator('input[name="payee.address.state"]');
    }
    private get zipCodeInput(): Locator {
        return this.page.locator('input[name="payee.address.zipCode"]')
    }
    private get phoneNumber(): Locator {
        return this.page.locator('input[name="payee.phoneNumber"]');
    }
    private get accountNumber(): Locator {
        return this.page.locator('input[name="payee.accountNumber"]')
    }
    private get verifyAccount(): Locator {
        return this.page.locator('input[name="verifyAccount"]');
    }
    private get amount(): Locator {
        return this.page.locator('input[name="amount"]');
    }
    private get fromAccountNumber(): Locator {
        return this.page.locator('select[name="fromAccountId"]')
    }
    private get sendPaymentButton(): Locator {
        return this.page.getByRole('button', {name: 'Send Payment'})
    }
    private get successfulBillPayTitle(): Locator {
        return this.page.locator('#billpayResult h1.title');
    }
    private get payeeNameResult(): Locator {
        return this.page.locator('#payeeName')
    }
    private get amountResult(): Locator {
        return this.page.locator('#amount')
    }
    private get fromAccountResult(): Locator {
        return this.page.locator('#fromAccountId')
    }
    private get paymentResultParagraph(): Locator {
        return this.page.locator('#billpayResult p').first();
    }
    // Actions
    async getTitle(): Promise<string> {
        return this.action.getText(this.billPayTitle);
    }
    async payBill(billPay: BillPay) {
        await this.action.fill(this.payeeNameInput, billPay.payeeName);
        await this.action.fill(this.addressInput, billPay.address);
        await this.action.fill(this.cityInput, billPay.city);
        await this.action.fill(this.stateInput, billPay.state);
        await this.action.fill(this.zipCodeInput, billPay.zipCode);
        await this.action.fill(this.phoneNumber, billPay.phoneNumber);
        await this.action.fill(this.accountNumber, billPay.accountNumber);
        await this.action.fill(this.verifyAccount, billPay.verifyAccount);
        await this.action.fill(this.amount, billPay.amount);
        await this.action.click(this.sendPaymentButton)
    }
    async successfulTitle(): Promise<string> {
        return this.action.getText(this.successfulBillPayTitle);
    }
    async getPayeeNameResult(): Promise<string> {
        return this.action.getText(this.payeeNameResult)
    }
    async getAmountResult(): Promise<string> {
        return this.action.getText(this.amountResult)
    }
    async getFromAccountResult(): Promise<string> {
        return this.action.getText(this.fromAccountResult)
    }
    async getPaymentResultParagraph(): Promise<string> {
        return this.action.getText(this.paymentResultParagraph);
    }
    async getFromAccount(): Promise<string> {
        return this.fromAccountNumber.inputValue();
    }
}