import {test as base, expect} from '@playwright/test';
import {LoginPage} from '@ui/pages/LoginPage';
import {RegistrationPage} from "@ui/pages/RegistrationPage";
import {RegistrationBuilder} from "@data/registrationBuilder";
import {RegisterUser} from "@data/registerUser";
import {AccountsOverviewPage} from "@ui/pages/AccountsOverviewPage";

type PageFixtures = {
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
    accountOverviewPage: AccountsOverviewPage
}

type WorkerFixtures = {
    registeredUser: RegisterUser;
}

export const test = base.extend<PageFixtures, WorkerFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    registrationPage: async ({page} , use ) => {
        const registerPage = new RegistrationPage(page);
        await use(registerPage);
    },
    accountOverviewPage: async ({page, loginPage, registeredUser}, use) => {
        await loginPage.navigateTo();
        await loginPage.login(registeredUser.username, registeredUser.password);

        const accountOverviewPage = new AccountsOverviewPage(page);
        await accountOverviewPage.getTitle();
        await use(accountOverviewPage);
    },
    registeredUser: [async ({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registrationPage = new RegistrationPage(page);

        const user = new RegistrationBuilder().build();
        console.log(`[worker ${process.env.TEST_PARALLEL_INDEX}] registering username: ${user.username}`);

        try {
            await registrationPage.navigateTo();
            await registrationPage.register(user);

            const usernameError = await registrationPage.getFieldError('customer.username');
            if (usernameError) {
                throw new Error(`Worker setup failed: could not register user "${user.username}" — ${usernameError}`);
            }

            await expect(async () => {
                const heading = await registrationPage.getWelcomeMessage();
                expect(heading).toContain(`Welcome ${user.username}`);
            }).toPass({ timeout: 10000 });

            await use(user);
        } finally {
            await context.close();
        }
    }, {scope: 'worker'}]
})

export { expect } from '@playwright/test';