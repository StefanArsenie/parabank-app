import {faker} from '@faker-js/faker';
import {BillPay} from '@data/billPay';

export class BillPayBuilder {
    private bill: BillPay = {
        payeeName: faker.person.fullName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number(),
        accountNumber: faker.string.numeric(6),
        verifyAccount: '',
        amount: faker.string.numeric(2),
    }
    constructor() {
        this.bill.verifyAccount = this.bill.accountNumber;
    }
    withPayeeName(payeeName:string): this {
        this.bill.payeeName = payeeName;
        return this;
    }
    withAddress(address:string): this {
        this.bill.address= address;
        return this;
    }
    withCity(city:string): this {
        this.bill.city = city;
        return this;
    }
    withState(state:string): this {
        this.bill.state = state;
        return this;
    }
    withZipCode(zipCode:string): this {
        this.bill.zipCode = zipCode;
        return this;
    }
    withPhoneNumber(phoneNumber:string): this {
        this.bill.phoneNumber = phoneNumber;
        return this;
    }
    withAccountNumber(accountNumber:string): this {
        this.bill.accountNumber = accountNumber;
        this.bill.verifyAccount = accountNumber;
        return this;
    }
    withVerifyAccount(verifyAccount:string): this {
        this.bill.verifyAccount = verifyAccount;
        return this;
    }
    withAmount(amount:string): this {
        this.bill.amount = amount;
        return this;
    }
    build(): BillPay {
        return this.bill
    }
}