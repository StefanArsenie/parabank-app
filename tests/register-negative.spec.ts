import {test, expect} from '@fixtures/pageFixtures';
import {RegistrationBuilder} from '@data/RegistrationBuilder';
import {REQUIRED_FIELD_ERRORS} from '@data/RegistrationValidation';

test.describe('Registration page - negative', () => {
    test('Shows a required field error for every field on empty submit', {tag: '@regression'}, async ({registrationPage}) => {
        await test.step('Navigate to Registration page', async () => {
            await registrationPage.navigateTo();
        });
        await test.step('Click on Registration button', async () => {
            await registrationPage.clickRegisterButton()
        })
        await test.step('Verify that errors are shown for every mandatory field', async () => {
            const fieldNames = REQUIRED_FIELD_ERRORS.map(f => f.field);
            const errors = await registrationPage.getVisibleErrorMessage(fieldNames);

            for (const {field, message} of REQUIRED_FIELD_ERRORS) {
                expect(errors[field]).toBe(message);
            }
        })
        await test.step('Verify that still registration page is displayed', async () => {
            expect(await registrationPage.getTitlePage()).toBe('Signing up is easy!')
        })
    });
});