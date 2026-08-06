import { expect, test } from '@playwright/test';

test.describe('catalog site', () => {
  test('home loads with app cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Apps by 0xVera' })).toBeVisible();
    await expect(page.getByRole('link', { name: /CardQR/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /MeteOpen/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Cupid/i })).toBeVisible();
  });

  test('individual app routes work', async ({ page }) => {
    await page.goto('/cardqr');
    await expect(page.getByRole('heading', { level: 1, name: 'CardQR' })).toBeVisible();
    await expect(page.getByText('Coming soon on Google Play')).toBeVisible();
  });

  test('language dropdown navigates between locales', async ({ page }) => {
    await page.goto('/');
    await page.locator('#language-select').selectOption({ label: 'Español' });
    await expect(page).toHaveURL(/\/es$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Apps de 0xVera' })).toBeVisible();

    await page.locator('#language-select').selectOption({ label: 'Català' });
    await expect(page).toHaveURL(/\/ca$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Apps de 0xVera' })).toBeVisible();
  });

  test('theme toggle switches between light and dark', async ({ page }) => {
    await page.goto('/');
    await page.locator('#theme-toggle').click();
    const themeAfterFirst = await page.locator('html').getAttribute('data-theme');
    expect(['light', 'dark']).toContain(themeAfterFirst);
    await page.locator('#theme-toggle').click();
    const themeAfterSecond = await page.locator('html').getAttribute('data-theme');
    expect(themeAfterSecond).not.toBe(themeAfterFirst);
  });

  test('CardQR privacy and support are reachable', async ({ page }) => {
    await page.goto('/cardqr/privacy');
    await expect(page.getByRole('heading', { name: /CardQR Privacy Policy/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex,nofollow',
    );

    await page.goto('/cardqr/support');
    await expect(page.getByRole('heading', { name: /CardQR Support/i })).toBeVisible();
    await expect(
      page.locator('#main').getByRole('link', { name: 'support@0xvera.com' }),
    ).toBeVisible();
  });

  test('coming soon store link is not an active Play link', async ({ page }) => {
    await page.goto('/cardqr');
    await expect(page.getByRole('link', { name: 'Google Play' })).toHaveCount(0);
    await expect(page.getByText('Coming soon on Google Play')).toBeVisible();
  });

  test('analytics does not load before consent and respects reject', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#ga4-script')).toHaveCount(0);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-ga-id', 'G-TESTONLY123');
      localStorage.removeItem('oxvera-analytics-consent');
      const banner = document.getElementById('consent-banner');
      if (banner) banner.hidden = false;
    });

    await expect(page.locator('#ga4-script')).toHaveCount(0);
    await page.getByRole('button', { name: 'Accept analytics' }).click();
    await expect(page.locator('#ga4-script')).toHaveCount(1);

    await page.evaluate(() => {
      localStorage.setItem('oxvera-analytics-consent', 'rejected');
      document.getElementById('ga4-script')?.remove();
      document.documentElement.setAttribute('data-ga-id', 'G-TESTONLY123');
    });
    await page.reload();
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-ga-id', 'G-TESTONLY123');
    });
    await expect(page.locator('#ga4-script')).toHaveCount(0);
  });

  test('keyboard can reach skip link', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
  });

  test('404 page renders', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  });
});
