import { Page, Locator } from "@playwright/test";
import { PageActions } from "@ui/utils/PageActions";
import { ROUTES } from "@data/routes";
import { RegisterUser } from "@data/registerUser";

export class RegistrationPage {

    private readonly action: PageActions;

    constructor(private readonly page: Page) {
        this.action = new PageActions(page);
    }
    // Locators
    private get firstNameInput(): Locator {
        return this.page.locator('input[name="customer.firstName"]')
    }
    private get lastNameInput(): Locator {
        return this.page.locator('input[name="customer.lastName"]')
    }
    private get addressInput(): Locator {
        return this.page.locator('input[name="customer.address.street"]');
    }
    private get cityInput(): Locator {
        return this.page.locator('input[name="customer.address.city"]');
    }
    private get stateInput(): Locator {
        return this.page.locator('input[name="customer.address.state"]');
    }
    private get zipCodeInput(): Locator {
        return this.page.locator('input[name="customer.address.zipCode"]');
    }
    private get phoneNumberInput(): Locator {
        return this.page.locator('input[name="customer.phoneNumber"]');
    }
    private get ssnInput(): Locator {
        return this.page.locator('input[name="customer.ssn"]');
    }
    private get usernameInput(): Locator {
        return this.page.locator('input[name="customer.username"]');
    }
    private get passwordInput(): Locator {
        return this.page.locator('input[name="customer.password"]');
    }
    private get confirmPasswordInput(): Locator {
        return this.page.locator('input[name="repeatedPassword"]');
    }
    private get registerButton(): Locator {
        return this.page.getByRole('button', {name: 'Register'});
    }
    get welcomeMessage(): Locator {
        return this.page.locator('#rightPanel h1')
    }
    private get titleOfPage(): Locator {
        return this.page.getByRole('heading', {name: 'Signing up is easy!'})
    }
    private errorMessage(fieldName: string) {
        return this.page.locator(`[id="${fieldName}.errors"]`);
    }
    // Actions
    async navigateTo() {
        await this.action.navigate(ROUTES.REGISTER);
    }
    async register(user: RegisterUser) {
        await this.action.fill(this.firstNameInput, user.firstName);
        await this.action.fill(this.lastNameInput, user.lastName);
        await this.action.fill(this.addressInput, user.address);
        await this.action.fill(this.cityInput, user.city);
        await this.action.fill(this.stateInput, user.state);
        await this.action.fill(this.zipCodeInput, user.zipCode);
        await this.action.fill(this.phoneNumberInput, user.phoneNumber);
        await this.action.fill(this.ssnInput, user.ssn);
        await this.action.fill(this.usernameInput, user.username);
        await this.action.fill(this.passwordInput, user.password);
        await this.action.fill(this.confirmPasswordInput, user.confirmPassword);
        await this.action.click(this.registerButton);
    }
    async getWelcomeMessage() {
        return this.action.getText(this.welcomeMessage);
    }
    async getTitlePage() {
        return this.action.getText(this.titleOfPage);
    }
    async clickRegisterButton() {
        await this.action.click(this.registerButton);
    }
    async getFieldError(fieldName: string): Promise<string> {
        const locator = this.errorMessage(fieldName);
        const count = await locator.count();
        if (count === 0) {
            return '';
        }
        return (await this.action.getText(locator)) ?? '';
    }
    async getVisibleErrorMessage(fieldNames: string[]): Promise<Record<string, string>> {
        const errors: Record<string, string> = {};
        for (const name of fieldNames) {
            errors[name] = await this.getFieldError(name);
        }
        return errors;
    }
}