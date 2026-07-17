import { test, expect} from '@fixtures/pageFixtures';

test('user login in with valid credentials', async ({loginPage, page}) => {
    await loginPage.navigate();
    await loginPage.login('fish', 'fish123');
    await expect(page).toHaveURL(/overview\.htm/);
})