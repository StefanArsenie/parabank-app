import {Page, Locator} from "@playwright/test";
import {PageActions} from "@ui/utils/PageActions";
import {NavigationServicesMenu} from "@ui/utils/NavigationServicesMenu";

export type AccountSummary = {
    accountNumber: string;
    balance: string;
}

export class AccountsOverviewPage {
    private readonly action: PageActions;
    readonly navMenu: NavigationServicesMenu;

    constructor(private readonly page: Page) {
        this.action = new PageActions(page);
        this.navMenu = new NavigationServicesMenu(page);
    }

    private get accountRows(): Locator {
        return this.page.locator('#accountTable tbody tr').filter({has: this.page.locator('a[href^="activity.htm"]')});
    }
    private accountLink(row: Locator): Locator {
        return row.locator('a[href^="activity.htm"]');
    }
    private balanceText(row: Locator): Locator {
        return row.locator('td').nth(1);
    }
    private get title() {
        return this.page.locator('#showOverview h1.title');
    }
    async getAccounts(): Promise<AccountSummary[]> {
        await this.accountRows.first().waitFor({state: 'visible'});
        const rows = await this.accountRows.all();
        const accounts: AccountSummary[] = [];

        for(const row of rows) {
            const accountNumber = await this.action.getText(this.accountLink(row));
            const balance = await this.action.getText(this.balanceText(row));
            accounts.push({accountNumber,balance})
        }
        return accounts;
    }
    async getFirstAccount(): Promise<AccountSummary> {
        const accounts = await this.getAccounts();
        const firstAccount = accounts[0];
        if (!firstAccount) {
            throw new Error('No accounts found on Accounts Overview Page');
        }
        return firstAccount;
    }
    async getTitle() {
        return this.action.getText(this.title)
    }
}