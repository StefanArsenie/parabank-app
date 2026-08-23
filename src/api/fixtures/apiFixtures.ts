import { HttpClient } from "@api/requests/HttpClient";
import { AuthApiClient } from "@api/clients/AuthApiClient";
import { test as base} from "@playwright/test";
import {AccountsApiClient} from "@api/clients/AccountsApiClient";
import {Customer} from "@api/responses/Customer";

type ApiFixtures = {
    httpClient: HttpClient;
    authApiClient: AuthApiClient;
    accountsApiClient: AccountsApiClient;
    loginCustomer: Customer
}

export const test = base.extend<ApiFixtures> ({
    httpClient: async ({request}, use) => {
        await use(new HttpClient(request));
    },
    authApiClient: async ({httpClient}, use) => {
        await use(new AuthApiClient(httpClient));
    },
    accountsApiClient: async ({httpClient}, use) => {
        await use(new AccountsApiClient(httpClient));
    },
    loginCustomer: async ({authApiClient}, use) => {
        const response = await authApiClient.login('john', 'demo');
        const customer = await response.json() as Customer
        await use(customer);
    }
});

export {expect} from '@playwright/test'