import {Page, Locator} from '@playwright/test';
import {PageActions} from '@utils/PageActions';
import {ROUTES} from "@data/routes";

export class LoginPage {

    private readonly action: PageActions;

    constructor(private readonly page: Page) {
        this.action = new PageActions(page);
    }
    // Locators
    private get usernameInput(): Locator {
        return this.page.locator('input[name=username]');
    }

    private get passwordInput(): Locator {
        return this.page.locator('input[name=password]');
    }

    private get loginButton(): Locator {
        return this.page.getByRole('button', {name: 'Log In'});
    }

    private get registerLink(): Locator {
        return this.page.getByRole('link', {name: 'Register'});
    }
    private get errorMessage(): Locator {
        return this.page.locator('#rightPanel p.error');
    }
    // Actions
    async navigateTo() {
        await this.action.navigate(ROUTES.LOGIN);
    }

    async login(username: string, password: string) {
        await this.action.fill(this.usernameInput, username);
        await this.action.fill(this.passwordInput, password);
        await this.action.click(this.loginButton);
    }

    async clickOnRegisterLink() {
        await this.action.click(this.registerLink);
    }

    async getErrorMessageForIncorrectCredentials() {
        return this.action.getText(this.errorMessage);
    }
}