import { test, expect} from '@fixtures/pageFixtures';

test.describe('Log in page - positive', async () => {
    test('User log in with valid credentials', {tag: '@smoke'}, async ({loginPage, page, registeredUser}) => {
        await test.step('Navigate to Login page', async () => {
            await loginPage.navigateTo();
        })
        await test.step('Fill in username and password', async () => {
            await loginPage.login(registeredUser.username, registeredUser.password);
            console.log(registeredUser.username);
            console.log(registeredUser.password);
        })
        await test.step('Validate that user is logged in', async () => {
            await expect(page).toHaveURL(/overview\.htm/);
        })
    })
})
