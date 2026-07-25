import {test, expect} from '@fixtures/pageFixtures';
import {RegistrationBuilder} from '@data/RegistrationBuilder';
import {REQUIRED_FIELD_ERRORS} from '@data/registrationValidation';
import {FIELD_TO_BUILDER_OVERRIDE} from "@data/registrationValidation";

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
    test('shows a required error when a random mandatory field is left empty', { tag: '@regression' }, async ({ registrationPage, page }) => {
        const randomIndex = Math.floor(Math.random() * REQUIRED_FIELD_ERRORS.length);
        const randomEntry = REQUIRED_FIELD_ERRORS[randomIndex];
        if (!randomEntry) {
            throw new Error(`No entry found at index ${randomIndex} in REQUIRED_FIELD_ERRORS`);
        }

        const applyOverride = FIELD_TO_BUILDER_OVERRIDE[randomEntry.field];
        if (!applyOverride) {
            throw new Error(`No builder override mapped for field "${randomEntry.field}" — check FIELD_TO_BUILDER_OVERRIDE`);
        }

        const user = applyOverride(new RegistrationBuilder()).build();

        await test.step(`Navigate to registration page (omitting ${randomEntry.field})`, async () => {
            await registrationPage.navigateTo();
        });

        await test.step('Fill the form leaving one mandatory field empty', async () => {
            await registrationPage.register(user);
        });

        await test.step('Verify the empty field shows its required error', async () => {
            const error = await registrationPage.getFieldError(randomEntry.field);
            expect(error).toBe(randomEntry.message);
        });

        await test.step('Verify we remain on the registration page', async () => {
            expect(await registrationPage.getTitlePage()).toBe('Signing up is easy!');
        });
    });
});