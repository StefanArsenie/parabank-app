import {test, expect} from "@ui/fixtures/pageFixtures";

test.describe('Accounts Overview Page', () => {
    test('Display the account with valid balance', {tag: '@regression'}, async ({accountOverviewPage}) => {
        await test.step('Verify that page is displayed', async() => {
            await accountOverviewPage.getTitle();
        })

        await test.step('Verify that at least one account is displayed', async() => {
            const account = await accountOverviewPage.getFirstAccount();
            expect(account.balance).toBe('$515.50');
        })
    })
})