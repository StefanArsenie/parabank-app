import {Page, expect, Locator} from "@playwright/test";
import {AuthenticatedBasePage} from "@pages/AuthenticatedBasePage";
import {ro} from "@faker-js/faker";
import * as wasi from "node:wasi";

export type AccountSummary = {
    accountNumber: string;
    balance: string;
}

export class AccountsOverviewPage extends AuthenticatedBasePage {
    constructor(page: Page) {
        super(page);
    }
    async getTitle() {
        await expect(this.page).toHaveTitle('ParaBank | Accounts Overview');
    }
    private get accountRows(): Locator {
        return this.page.locator('tbody, tr').filter({has: this.page.locator('a[href^="activity.htm"]')});
    }
    private accountLink(row: Locator): Locator {
        return row.locator('a[href^="activity.htm"]');
    }
    private balanceText(row: Locator): Locator {
        return row.locator('td').nth(1);
    }
    async getAccounts(): Promise<AccountSummary[]> {
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
}