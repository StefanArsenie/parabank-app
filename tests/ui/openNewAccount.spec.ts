import {test, expect} from "@ui/fixtures/pageFixtures";
import {OpenNewAccountPage} from "@ui/pages/OpenNewAccountPage";

test.describe(`Open new account page`, () => {
    test(`Open new account`, {tag: '@regression'}, async ({page, navMenu}) => {
        const openNewAccountPage = new OpenNewAccountPage(page)
        await test.step(`Click on Open New Account link`, async () => {
            await navMenu.goToOpenNewAccount();
        })

        await test.step(`Verify that Open New Account title is displayed`, async () => {
            expect(await openNewAccountPage.getHeaderText()).toBe('Open New Account');
        })

        await test.step(`Select Savings account type`, async () => {
            await openNewAccountPage.selectAccountType('SAVINGS')
        })

        await test.step(`Click on OPEN NEW ACCOUNT button`, async () => {
            await openNewAccountPage.clickOnOpeningNewAccountButton()
        })

        await test.step(`Verify that New Account is opened`, async () => {
            expect(await openNewAccountPage.accountOpenedHeading()).toBe('Account Opened!');
            expect(await openNewAccountPage.getNewOpenAccountNumber()).toMatch(/^\d{5}$/);
        })
    })
})