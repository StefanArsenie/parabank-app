import {test, expect } from '@api/fixtures/apiFixtures'
import {Customer, CustomerSchema} from "@api/responses/Customer";

test.describe(`Authorization API`, () => {
    test(`Log in with valid credentials`, {tag: '@smoke'}, async ({authApiClient}) => {
        const response = await authApiClient.login('john', 'demo')

        await test.step(`The response should be OK`, async() => {
            expect(response.ok()).toBeTruthy();
        })
        await test.step(`The status code should be 200`, async () => {
            expect(response.status()).toBe(200);
        })
        const customer = await response.json() as Customer;

        await test.step(`The first name should be John`, async () => {
            expect(customer.firstName).toBe('John');
        })
        await test.step(`The last name should be Smith`, async () => {
            expect(customer.lastName).toBe('Smith');
        })
        await test.step(`Id should be a number`, async () => {
            expect(typeof customer.id).toBe('number');
        })
    })
    test(`Response match the Customer schema`, async({authApiClient}) => {
        const response = await authApiClient.login('john', 'demo')
        const body = await response.json();

        await test.step(`Response body matches the Customer schema`, async () => {
            expect(() => CustomerSchema.parse(body)).toBeTruthy()
        })
    })
})