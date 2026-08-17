import { HttpClient } from "@api/requests/HttpClient";
import { AuthApiClient } from "@api/clients/AuthApiClient";
import { test as base} from "@playwright/test";

type ApiFixtures = {
    httpClient: HttpClient;
    authApiClient: AuthApiClient;
}

export const test = base.extend<ApiFixtures> ({
    httpClient: async ({request}, use) => {
        await use(new HttpClient(request));
    },
    authApiClient: async ({httpClient}, use) => {
        await use(new AuthApiClient(httpClient));
    },
});

export {expect} from '@playwright/test'