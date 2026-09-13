import {test, expect} from '@ui/fixtures/pageFixtures'
import {RequestLoanPage} from '@ui/pages/RequestLoanPage'
import {AccountsOverviewPage} from '@ui/pages/AccountsOverviewPage'
import {parseBalance} from '@ui/utils/currency'

test.describe(`Request a loan positive`, () => {
    test(`Request a loan successful`, {tag: '@smoke', lock: 'registration'}, async({page, navMenu, registeredUser}) => {
        const requestLoanPage = new RequestLoanPage(page)
        const overviewPage = new AccountsOverviewPage(page)
        let balanceBefore: number
        let accountNumber: string
        const LOAN = 120
        const DOWN_PAYMENT = 10

        await test.step(`Take the account and its balance`, async() => {
            await navMenu.goToAccountOverview();
            const firstAccount = await overviewPage.getFirstAccount()
            accountNumber = firstAccount.accountNumber
            balanceBefore = parseBalance(firstAccount.balance)
            expect(await navMenu.getWelcomeText()).toContain(registeredUser.firstName)
        })

        await test.step(`Navigate to Request Loan page`, async() => {
            await navMenu.goToRequestLoan()
            expect(await requestLoanPage.getPageTitle()).toBe('Apply for a Loan')
        })

        let newAccountBalance: string

        await test.step(`Request the loan of ${LOAN} dollars`, async() => {
            await requestLoanPage.enterLoanAmount(String(LOAN))
            await requestLoanPage.enterDownPayment(String(DOWN_PAYMENT))
            await requestLoanPage.clickOnApplyNowButton()
            newAccountBalance = await requestLoanPage.getNewLoanAccountNumber()
            expect(await requestLoanPage.getLoanStatus()).toBe('Approved')
            expect(await requestLoanPage.getNewLoanAccountNumber()).toMatch(/^\d+$/)
        })

        await test.step(`Verify balances after the loan`, async() => {
            await navMenu.goToAccountOverview()
            const accounts = await overviewPage.getAccounts()

            const deductedAccount = accounts.find(a => a.accountNumber === accountNumber)
            const loanAccount = accounts.find(a => a.accountNumber === newAccountBalance)
            expect(deductedAccount, 'Account deducted not found').toBeDefined()
            expect(loanAccount, 'New loan account not found').toBeDefined()

            expect(parseBalance(deductedAccount!.balance)).toBeCloseTo(balanceBefore - DOWN_PAYMENT, 2)
            expect(parseBalance(loanAccount!.balance)).toBeCloseTo(LOAN, 2)
        })
    })
})