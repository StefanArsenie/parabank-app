import {Page} from "@playwright/test";
import {NavigationServicesMenu} from "@utils/NavigationServicesMenu";
import {BaseComponent} from "@utils/BaseComponent";

export abstract class AuthenticatedBasePage {
    readonly navMenu: NavigationServicesMenu;
    readonly action: BaseComponent;

    constructor(protected readonly page: Page) {
        this.navMenu = new NavigationServicesMenu(page);
        this.action = new BaseComponent(page);
    }
}