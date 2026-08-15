import { test, expect } from '@fixtures/pageFixtures';
import { RegistrationBuilder } from "@data/RegistrationBuilder";

test.describe('Registration page - positive', () => {
    test('Verify that Register link goes to Register page', {tag: '@regression'}, async ({loginPage, registrationPage}) =>{
        await test.step('Navigate to Login page', async () => {
            await loginPage.navigateTo();
        })

        await test.step('Click on Register link from Login page', async () => {
            await loginPage.clickOnRegisterLink();
        })

        await test.step('Verify that user is redirected to the registration page', async () => {
            await expect(registrationPage.getTitlePage()).resolves.toBe('Signing up is easy!')
        })
    })

    test('Register a new user', {tag: ['@smoke', '@regression']}, async ({registrationPage}) => {
        const user = new RegistrationBuilder().build();

        await test.step('Navigate to Register page', async () => {
            await registrationPage.navigateTo();
        })

        await test.step('Fill in and submit the registration form', async () => {
            await registrationPage.register(user);
        })

        await test.step('Verify that account is created successfully', async () => {
            expect(await registrationPage.getWelcomeMessage()).toContain(`Welcome ${user.username}`);
        })
    })
})

