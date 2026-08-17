import {RegistrationBuilder} from '@data/registrationBuilder';

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

export const FIELD_TO_BUILDER_OVERRIDE: Record<string, (builder: RegistrationBuilder) => RegistrationBuilder> = {
    'customer.firstName': (b) => b.withFirstName(''),
    'customer.lastName': (b) => b.withLastName(''),
    'customer.address.street': (b) => b.withAddress(''),
    'customer.address.city': (b) => b.withCity(''),
    'customer.address.state': (b) => b.withState(''),
    'customer.address.zipCode': (b) => b.withZipCode(''),
    'customer.ssn': (b) => b.withSsn(''),
    'customer.username': (b) => b.withUserName(''),
    'customer.password': (b) => b.withPassword(''),
    'repeatedPassword': (b) => b.withConfirmPassword(''),
};