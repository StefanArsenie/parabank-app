import {test as base} from '@playwright/test';
import {LoginPage} from '@pages/LoginPage';
import {RegistrationPage} from "@pages/RegistrationPage";
import {RegistrationBuilder} from "@data/RegistrationBuilder";
import {RegisterUser} from "@data/RegisterUser";

type PageFixtures = {
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
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
    registeredUser: [async ({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registrationPage = new RegistrationPage(page);

        const user = new RegistrationBuilder().build();
        await registrationPage.navigateTo();
        await registrationPage.register(user);

        await use(user);

        await context.close();
    }, {scope: 'worker'}]
})

export { expect } from '@playwright/test';