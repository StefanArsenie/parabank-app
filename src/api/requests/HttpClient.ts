import { APIRequestContext, APIResponse} from "@playwright/test";

export class HttpClient {
    constructor(private readonly request: APIRequestContext) {
    }
    async post(url: string, body?: unknown): Promise<APIResponse> {
        return this.request.post(url, {
            headers: {accept: 'application/json'},
            data: body
        })
    }
    async put(url: string, body?: unknown): Promise<APIResponse> {
        return this.request.put(url, {
            headers: {accept: 'application/json'},
            data: body
        })
    }
    async get(url: string): Promise<APIResponse> {
        return this.request.get(url, {
            headers: {accept: 'application/json'}
        })
    }
    async delete(url: string): Promise<APIResponse> {
        return this.request.delete(url, {
            headers: {accept: 'application/json'}
        })
    }
}