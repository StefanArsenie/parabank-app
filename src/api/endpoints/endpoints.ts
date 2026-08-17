export const ENDPOINTS = {
    login: (username: string, password: string) =>
        `/parabank/services/bank/login/${username}/${password}`,

} as const;