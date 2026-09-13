import {test, expect} from '@ui/fixtures/pageFixtures'
import {RequestLoanPage} from '@ui/pages/RequestLoanPage'

test.describe(`Request a loan negative`, () => {
    test(`Request a loan is not possible`, {tag: '@regression', lock: 'registration'}, async({page, navMenu, registeredUser}) => {
        const requestLoan = new RequestLoanPage(page)

        await test.step(`Verify logged in as registered user`, async() => {
            expect(await navMenu.getWelcomeText()).toContain(registeredUser.firstName);
        })

        await test.step(`Navigate to the Request Loan page`, async() => {
            await navMenu.goToRequestLoan()
            expect(await requestLoan.getPageTitle()).toBe('Apply for a Loan')
        })

        await test.step(`Dow payment bigger than balance account`, async() => {
            await requestLoan.enterLoanAmount('400')
            await requestLoan.enterDownPayment('600')
            await requestLoan.clickOnApplyNowButton()
            expect(await requestLoan.getLoanStatus()).toBe('Denied')
            expect(await requestLoan.getLoanTextDenied()).toBe('You do not have sufficient funds for the given down payment.')
        })
    })
})