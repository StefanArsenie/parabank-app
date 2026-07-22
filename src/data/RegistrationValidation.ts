export const REQUIRED_FIELD_ERRORS: {field: string, message: string}[] = [
    {field: 'customer.firstName', message: 'First name is required.'},
    { field: 'customer.lastName', message: 'Last name is required.' },
    { field: 'customer.address.street', message: 'Address is required.' },
    { field: 'customer.address.city', message: 'City is required.' },
    { field: 'customer.address.state', message: 'State is required.' },
    { field: 'customer.address.zipCode', message: 'Zip Code is required.' },
    { field: 'customer.ssn', message: 'Social Security Number is required.' },
    { field: 'customer.username', message: 'Username is required.' },
    { field: 'customer.password', message: 'Password is required.' },
    { field: 'repeatedPassword', message: 'Password confirmation is required.' },
]