import {test, expect} from "@ui/fixtures/pageFixtures";

test.describe('Accounts Overview Page', () => {
    test('Display the account with valid balance', {tag: '@regression'}, async ({accountOverviewPage}) => {
        await test.step('Verify that page is displayed', async() => {
            await accountOverviewPage.getTitle();
        })

        await test.step('Verify that at least one account is displayed', async() => {
            const account = await accountOverviewPage.getAccounts();
            expect(account.length).toBeGreaterThan(0);
        })
        await test.step('Verify that balance has expected format', async () => {
            const account = await accountOverviewPage.getAccounts();
            const pozBalance = /^\$\d+\.\d{2}$/;
            const negBalance = /^\-\$\d+\.\d{2}$/;
            account.forEach(account => {
                if(negBalance.test(account.balance)) {
                    expect(account.balance).toMatch(negBalance)
                }else {
                    expect(account.balance).toMatch(pozBalance)
                }
            })
        })
    })
})