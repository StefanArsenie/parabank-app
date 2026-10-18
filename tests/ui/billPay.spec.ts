import {test, expect} from '@ui/fixtures/pageFixtures';
import {BillPayPage} from '@ui/pages/BillPayPage';
import {BillPayBuilder} from '@data/billPayBuilder';

test.describe('Bill Pay', {lock: 'registration'}, () => {
    test('Pay bill successful', {tag: '@smoke'}, async ({page, navMenu, registeredUser}) => {
        const billPayPage = new BillPayPage(page);
        const bill = new BillPayBuilder().withAmount('50').build();

        await test.step('Verify logged in as a registered user', async() => {
            expect(await navMenu.getWelcomeText()).toContain(registeredUser.firstName);
        })
        let fromAccountNumber: string;
        await test.step('Navigate to Pay Bill page', async () => {
            await billPayPage.navMenu.goToBillPay()
            expect(await billPayPage.getTitle()).toBe('Bill Payment Service')
            fromAccountNumber = await billPayPage.getFromAccount();
        })
        await test.step('Complete and submit the bill', async () => {
            await billPayPage.payBill(bill);
        })
        await test.step('Check that bill is successful', async () => {
            expect(await billPayPage.successfulTitle()).toBe('Bill Payment Complete');
            expect(await billPayPage.getPaymentResultParagraph()).toBe(`Bill Payment to ${bill.payeeName} in the amount of $50.00 from account ${fromAccountNumber} was successful.`);
        })
    })
})
