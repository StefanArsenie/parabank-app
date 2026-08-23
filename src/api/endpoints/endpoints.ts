export const ENDPOINTS = {
    login: (username: string, password: string) =>
        `/parabank/services/bank/login/${username}/${password}`,
    accounts: (customerId: number) =>
        `/parabank/services/bank/customers/${customerId}/accounts`,
} as const;