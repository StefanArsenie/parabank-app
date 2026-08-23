import {test, expect} from "@api/fixtures/apiFixtures";
import {AccountsSchema} from "@api/responses/Accounts";

test.describe(`Accounts API`, () => {
    test(`Return account for a customer`, async ({accountsApiClient, loginCustomer}) => {
        const response = await accountsApiClient.getAccount(loginCustomer.id);
        await test.step(`Status code should be 200`, () => {
            expect(response.status()).toBe(200)
        })
        await test.step(`Status code should be OK`, () => {
            expect(response.ok()).toBeTruthy();
        })
        const accounts = await response.json() as {customerId: number} [];
        await test.step(`All accounts belong to the customer`, () => {
            accounts.forEach(account => {
                expect(account.customerId).toBe(loginCustomer.id)
            })
        })
    })
    test(`Response match the Accounts schema`, async({accountsApiClient, loginCustomer}) => {
        const response = await accountsApiClient.getAccount(loginCustomer.id)
        const body: unknown = await response.json()
        await test.step(`The response body match Accounts schema`, () => {
            AccountsSchema.parse(body);
        })
    })
})
