import {test, expect} from '@ui/fixtures/pageFixtures';
import {INVALID_LOGIN_DATA, VALID_LOGIN_DATA} from "@data/loginValidation";

test.describe('Log in page - negative', () => {
    test('Reject login with valid username and invalid password', {tag: '@regression'}, async ({loginPage}) => {
        await test.step('Navigate to Login page', async () => {
            await loginPage.navigateTo();
        })

        await test.step('Enter valid username and wrong password', async () => {
            await loginPage.login(VALID_LOGIN_DATA.username, INVALID_LOGIN_DATA.invalidPassword);
        })

        await test.step('Login is rejected with an error message', async () => {
            expect(await loginPage.getErrorMessageForIncorrectCredentials()).toBe(INVALID_LOGIN_DATA.expectedError);
        });
    });

    test('Reject login with invalid username and valid password', {tag: '@regression'}, async ({loginPage}) => {
        await test.step('Navigate to Login page', async () => {
            await loginPage.navigateTo()
        })

        await test.step('Enter wrong username and valid password', async () => {
            await loginPage.login(INVALID_LOGIN_DATA.invalidUsername, VALID_LOGIN_DATA.password);
        })

        await test.step('Login is rejected with an error message', async () => {
            expect(await loginPage.getErrorMessageForIncorrectCredentials()).toBe(INVALID_LOGIN_DATA.expectedError);
        });
    });

    test('Reject login with invalid username and invalid password', {tag: '@regression'}, async ({loginPage}) => {
        await test.step('Navigate to Login page', async () => {
            await loginPage.navigateTo()
        })

        await test.step('Enter wrong username and wrong password', async () => {
            await loginPage.login(INVALID_LOGIN_DATA.invalidUsername, INVALID_LOGIN_DATA.invalidPassword);
        })

        await test.step('Login is rejected with an error message', async () => {
            expect(await loginPage.getErrorMessageForIncorrectCredentials()).toBe(INVALID_LOGIN_DATA.expectedError);
        });
    })
});