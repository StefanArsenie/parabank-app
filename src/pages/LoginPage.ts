import {Page, Locator} from '@playwright/test';
import {BaseComponent} from '@utils/BaseComponent';
import {ROUTES} from "@data/routes";

export class LoginPage {

    private readonly action: BaseComponent;

    constructor(private readonly page: Page) {
        this.action = new BaseComponent(page);
    }

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

    async navigate() {
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
}