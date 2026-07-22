import { faker } from '@faker-js/faker';
import { RegisterUser } from "@data/RegisterUser";

export class RegistrationBuilder {

    private user: RegisterUser = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number(),
        ssn: `${faker.string.numeric(3)}-${faker.string.numeric(2)}-${faker.string.numeric(4)}`,
        username: `Stefan${Date.now()}`,
        password: faker.internet.password({length: 10, prefix: 'Class1!'}),
    };
    withFirstName(value: string): this {
        this.user.firstName = value;
        return this;
    }
    withLastName(value: string): this {
        this.user.lastName = value;
        return this;
    }
    withAddress(value: string): this {
        this.user.address = value;
        return this;
    }
    withCity(value: string): this {
        this.user.city = value;
        return this;
    }
    withState(value: string): this {
        this.user.state = value;
        return this;
    }
    withZipCode(value: string): this {
        this.user.zipCode = value;
        return this;
    }
    withPhoneNumber(value: string): this {
        this.user.phoneNumber = value;
        return this;
    }
    withSsn(value: string): this {
        this.user.ssn = value;
        return this;
    }
    withUserName(value: string): this {
        this.user.username = value;
        return this;
    }
    withPassword(value: string): this {
        this.user.password = value;
        return this;
    }
    build(): RegisterUser {
        return this.user;
    }
}
