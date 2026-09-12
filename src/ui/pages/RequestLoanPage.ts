import {Page, Locator} from '@playwright/test'
import {PageActions} from '@ui/utils/PageActions'

export class RequestLoanPage {
    private readonly action: PageActions;

    constructor(private readonly page: Page) {
        this.action = new PageActions(page)
    }
    // Locators
    private get pageTitle(): Locator {
        return this.page.getByRole('heading', {name: 'Apply for a Loan'})
    }
    private get loanAmountInput(): Locator {
        return this.page.locator('#amount')
    }
    private get downPaymentInput(): Locator {
        return this.page.locator('#downPayment')
    }
    private get fromAccountOption(): Locator {
        return this.page.locator('#fromAccountId')
    }
    private get applyNowButton(): Locator {
        return this.page.getByRole('button', {name: 'Apply Now'})
    }
    private get loanStatus(): Locator {
        return this.page.locator('#loanStatus')
    }
    private get newLoanAccountNumber(): Locator {
        return this.page.locator('#newAccountId')
    }
    private get loanTextDenied(): Locator {
        return this.page.locator('#loanRequestDenied')
    }
    //Actions
    async getPageTitle(): Promise<string> {
        return  this.action.getText(this.pageTitle)
    }
    async enterLoanAmount(amount: string) {
        await this.action.fill(this.loanAmountInput, amount)
    }
    async enterDownPayment(downPayment: string) {
        await this.action.fill(this.downPaymentInput, downPayment)
    }
    async selectFromAccount(accountNumber: string) {
        await this.action.selectOption(this.fromAccountOption, accountNumber)
    }
    async clickOnApplyNowButton() {
        await this.action.click(this.applyNowButton)
    }
    async getLoanStatus(): Promise<string> {
        return  this.action.getText(this.loanStatus)
    }
    async getNewLoanAccountNumber(): Promise<string> {
        return  this.action.getText(this.newLoanAccountNumber)
    }
    async getLoanTextDenied(): Promise<string> {
        return  this.action.getText(this.loanTextDenied)
    }
}