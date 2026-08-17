export const INVALID_LOGIN_DATA = {
    invalidUsername: 'nonexistingUser123',
    invalidPassword: 'invalidPassword1',
    expectedError: 'The username and password could not be verified.'
}
export const VALID_LOGIN_DATA = {
    username: process.env.TEST_USERNAME ?? 'john',
    password: process.env.TEST_PASSWORD ?? 'demo'
}