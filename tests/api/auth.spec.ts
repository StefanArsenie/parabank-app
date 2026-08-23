import {test, expect } from '@api/fixtures/apiFixtures'
import {Customer, CustomerSchema} from "@api/responses/Customer";

test.describe(`Authorization API`, () => {
    test(`Log in with valid credentials`, {tag: '@smoke'}, async ({authApiClient}) => {
        const response = await authApiClient.login('john', 'demo')

        await test.step(`The response should be OK`, () => {
            expect(response.ok()).toBeTruthy();
        })

        await test.step(`The status code should be 200`, () => {
            expect(response.status()).toBe(200);
        })

        const customer = await response.json() as Customer;

        await test.step(`The first name should be John`, () => {
            expect(customer.firstName).toBe('John');
        })

        await test.step(`The last name should be Smith`, () => {
            expect(customer.lastName).toBe('Smith');
        })

        await test.step(`Id should be a number`, () => {
            expect(typeof customer.id).toBe('number');
        })
    })

    test(`Response match the Customer schema`, {tag: '@regression'}, async({authApiClient}) => {
        const response = await authApiClient.login('john', 'demo')
        const body: unknown = await response.json();

        await test.step(`Response body matches the Customer schema`, () => {
            expect(() => CustomerSchema.parse(body)).not.toThrow();
        })
    })
})