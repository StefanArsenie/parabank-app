import { HttpClient } from "@api/requests/HttpClient";
import { ENDPOINTS } from "@api/endpoints/endpoints";
import {APIResponse} from "@playwright/test";

export class AuthApiClient {
    constructor(private readonly http: HttpClient) {
    }
    async login(username: string, password: string): Promise<APIResponse> {
        return this.http.get(ENDPOINTS.login(username, password))
    }
}