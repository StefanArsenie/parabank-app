import {test, expect} from '@ui/fixtures/pageFixtures'
import {AccountsOverviewPage} from '@ui/pages/AccountsOverviewPage'
import {TransferFundsPage} from '@ui/pages/TransferFundsPage'
import {parseBalance} from '@ui/utils/currency'

test.describe(`Transfer money`, () => {
    test(`Transfer money from first account to second account`, {tag: '@smoke'}, async ({page, navMenu, userWithTwoAccounts}) => {
        const overviewPage = new AccountsOverviewPage(page);
        const transferPage = new TransferFundsPage(page);

        await test.step(`Go to accounts overview page`, async() => {
            await navMenu.goToAccountOverview();
            await expect(overviewPage.title).toBeVisible();
        })
        let firstBefore: number;
        let secondBefore: number;
        const TRANSFER_MONEY = 50;

        await test.step(`Take balances of both accounts`, async() => {
            const accounts = await overviewPage.getAccounts()
            const first = accounts.find(f => f.accountNumber === userWithTwoAccounts.firstAccount);
            const second = accounts.find(f => f.accountNumber === userWithTwoAccounts.secondAccount);
            expect(first, `First account not found in overview page`).toBeDefined();
            expect(second, `Second account not found in overview page`).toBeDefined();

            firstBefore = parseBalance(first!.balance);
            secondBefore = parseBalance(second!.balance);
        })
        await test.step(`Perform the transfer from first account to second account`, async() => {
            await navMenu.goToTransferFunds()
            await transferPage.enterAmountTransfer(String(TRANSFER_MONEY))
            await transferPage.selectFromAccount(userWithTwoAccounts.firstAccount)
            await transferPage.selectToAccount(userWithTwoAccounts.secondAccount)
            await transferPage.clickTransferButton()
            expect(await transferPage.getTransferAmount()).toBe(`$${TRANSFER_MONEY.toFixed(2)}`);
            expect(await transferPage.getFromAccountResult()).toBe(userWithTwoAccounts.firstAccount)
            expect(await transferPage.getToAccountResult()).toBe(userWithTwoAccounts.secondAccount)
        })
        await test.step(`Verify that balance of those two accounts are correct due to transfer`, async() => {
            await navMenu.goToAccountOverview();
            const accountsAfter = await overviewPage.getAccounts();
            const firstAccountAfterTransfer = accountsAfter.find(f => f.accountNumber === userWithTwoAccounts.firstAccount)
            const secondAccountAfterTransfer = accountsAfter.find(f => f.accountNumber === userWithTwoAccounts.secondAccount)

            expect(firstAccountAfterTransfer, `First account not found in overview page`).toBeDefined();
            expect(secondAccountAfterTransfer, `Second account not found in overview page`).toBeDefined();

            const firstAfter = parseBalance(firstAccountAfterTransfer!.balance)
            const secondAfter = parseBalance(secondAccountAfterTransfer!.balance)

            expect(firstAfter).toBeCloseTo(firstBefore - TRANSFER_MONEY, 2)
            expect(secondAfter).toBeCloseTo(secondBefore + TRANSFER_MONEY, 2)
        })
    })
})