import { test, expect} from '@ui/fixtures/pageFixtures';
import {VALID_LOGIN_DATA} from "@data/loginValidation";

test.describe('Log in page - positive', () => {
    test('User log in with valid credentials', {tag: '@smoke'}, async ({loginPage, page}) => {
        await test.step('Navigate to Login page', async () => {
            await loginPage.navigateTo();
        })

        await test.step('Fill in username and password', async () => {
            await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);
        })

        await test.step('Validate that user is logged in', async () => {
            await expect(page).toHaveURL(/overview\.htm/);
        })
    })
})
