export function parseBalance(balance: string) {
    return parseFloat(balance.replace(/[$,]/g, ''));
}