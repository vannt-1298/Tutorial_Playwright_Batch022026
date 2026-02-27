import { test, expect } from '@playwright/test';

test('register user successfully and verify checked values', async ({ page }) => {
  const username = `nguyen.thi.van+${Math.floor(Math.random() * 1000)}`;
  const email = `${username}@sun-asterisk.com`;

  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

  await page.locator('#username').fill(username);
  await page.locator('#email').fill(email);

  await page.locator('#female').check();
  await expect(page.locator('#female')).toBeChecked();
  await expect(page.locator('#male')).not.toBeChecked();

  await page.locator('#reading').check();
  await page.locator('#traveling').check();
  await expect(page.locator('#reading')).toBeChecked();
  await expect(page.locator('#traveling')).toBeChecked();
  await expect(page.locator('#cooking')).not.toBeChecked();

  await page.locator('#interests').selectOption(['technology', 'music']);
  await page.locator('#country').selectOption('canada');
  await page.locator('#dob').fill('1998-10-20');

  await page.getByRole('button', { name: 'Register' }).click();

  const userTable = page.locator('#userTable');
  await expect(userTable).toContainText(username);
  await expect(userTable).toContainText(email);
  await expect(userTable).toContainText('female');
});
