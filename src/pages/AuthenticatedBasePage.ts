import {Page} from "@playwright/test";
import {NavigationServicesMenu} from "@utils/NavigationServicesMenu";
import {PageActions} from "@utils/PageActions";

export abstract class AuthenticatedBasePage {
    readonly navMenu: NavigationServicesMenu;
    readonly action: PageActions;

    constructor(protected readonly page: Page) {
        this.navMenu = new NavigationServicesMenu(page);
        this.action = new PageActions(page);
    }
}