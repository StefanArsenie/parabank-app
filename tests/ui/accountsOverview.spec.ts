import {test, expect} from "@ui/fixtures/pageFixtures";

test.describe('Accounts Overview Page', () => {
    test('Display the account with valid balance', {tag: '@regression'}, async ({accountOverviewPage}) => {
        await test.step('Verify that page is displayed', async () => {
            await expect(accountOverviewPage.title).toBeVisible();
        })
        const accounts = await accountOverviewPage.getAccounts()
        await test.step('Verify that at least one account is displayed', () => {
            expect(accounts.length).toBeGreaterThan(0);
        })

        await test.step('Verify that balance has expected format', () => {
            accounts.forEach(account => {
                expect(account.balance).toMatch(/^-?\$\d+\.\d{2}$/);
            })
        })
    })
})