import {test as base, expect} from '@playwright/test';
import {LoginPage} from '@ui/pages/LoginPage';
import {RegistrationPage} from "@ui/pages/RegistrationPage";
import {RegistrationBuilder} from "@data/registrationBuilder";
import {RegisterUser} from "@data/registerUser";
import {AccountsOverviewPage} from "@ui/pages/AccountsOverviewPage";
import {VALID_LOGIN_DATA} from "@data/loginValidation";
import {NavigationServicesMenu} from "@ui/utils/NavigationServicesMenu";

type PageFixtures = {
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
    accountOverviewPage: AccountsOverviewPage
    registeredUser: RegisterUser
    navMenu: NavigationServicesMenu
}

export const test = base.extend<PageFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    registrationPage: async ({page} , use ) => {
        const registerPage = new RegistrationPage(page);
        await use(registerPage);
    },
    accountOverviewPage: async ({page, loginPage}, use) => {
        await loginPage.navigateTo();
        await loginPage.login(VALID_LOGIN_DATA.username, VALID_LOGIN_DATA.password);

        const accountOverviewPage = new AccountsOverviewPage(page);
        await accountOverviewPage.getTitle();
        await use(accountOverviewPage);
    },
    registeredUser: async ({page}, use) => {
        const registrationPage = new RegistrationPage(page);
        const user = new RegistrationBuilder().build();

        await registrationPage.navigateTo();
        await registrationPage.register(user);

        const usernameError = await registrationPage.getFieldError('customer.username');
        if(usernameError) {
            throw new Error(`Test setup failed: could not register user '${user.username}' - ${usernameError}`)
        }
        await expect(async() => {
            const heading = await registrationPage.getWelcomeMessage();
            expect(heading).toContain(`Welcome ${user.username}`)
        }).toPass({timeout: 10000})
        await use(user)
    },
    navMenu: async ({page}, use) => {
        const navMenu = new NavigationServicesMenu(page);
        await use(navMenu);
    }
})

export { expect } from '@playwright/test';