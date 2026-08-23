import {HttpClient} from "@api/requests/HttpClient";
import {ENDPOINTS} from "@api/endpoints/endpoints";
import {APIResponse} from "@playwright/test";

export class AccountsApiClient {
    constructor(private readonly http: HttpClient) {
    }
    async getAccount(customerId: number) : Promise<APIResponse> {
        return this.http.get(ENDPOINTS.accounts(customerId));
    }
}