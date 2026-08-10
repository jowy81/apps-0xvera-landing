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
    await expect(page.locator('.badge--beta-testing')).toHaveText(/Beta testers open/);
    await expect(page.getByRole('link', { name: 'Join Android beta testers' })).toHaveAttribute(
      'href',
      '/testers',
    );
  });

  test('language dropdown navigates between locales', async ({ page }) => {
    await page.goto('/');
    await page.locator('#language-select').click();
    await page.locator('.lang-dropdown__option[data-language="es"]').click();
    await expect(page).toHaveURL(/\/es$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Apps de 0xVera' })).toBeVisible();

    await page.locator('#language-select').click();
    await page.locator('.lang-dropdown__option[data-language="ca"]').click();
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
    await expect(page.getByRole('heading', { name: /Privacy Policy — CardQR/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index,follow',
    );

    await page.goto('/cardqr/support');
    await expect(page.getByRole('heading', { name: /CardQR Support/i })).toBeVisible();
    await expect(
      page.locator('#main').getByRole('link', { name: 'support@0xvera.com' }),
    ).toBeVisible();
  });

  test('MeteOpen privacy is published and indexable', async ({ page }) => {
    await page.goto('/meteopen/privacy');
    await expect(page.getByRole('heading', { name: /Privacy Policy — MeteOpen/i })).toBeVisible();
    await expect(page.getByText(/Open-Meteo/i).first()).toBeVisible();
    await expect(page.getByText(/AEMET OpenData/i).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Política de privacidad — MeteOpen/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index,follow',
    );
  });

  test('feedback page loads with EN/ES form links', async ({ page }) => {
    const response = await page.goto('/feedback');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: 'App Feedback' })).toBeVisible();

    const en = page.locator('#feedback-link-en');
    const es = page.locator('#feedback-link-es');
    await expect(en).toBeVisible();
    await expect(es).toBeVisible();
    await expect(en).toHaveAttribute('href', /forms\.gle/);
    await expect(es).toHaveAttribute('href', /forms\.gle/);
    await expect(en).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(es).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(en).toHaveAttribute('target', '_blank');
    await expect(
      page.getByText('Feedback forms are currently available in English and Spanish.'),
    ).toBeVisible();
    await expect(page.getByText(/verified email address/i)).toBeVisible();
  });

  test('feedback app query shows CardQR and ignores invalid apps', async ({ page }) => {
    await page.goto('/feedback?app=cardqr');
    await expect(page.getByRole('heading', { level: 1, name: 'Feedback for CardQR' })).toBeVisible();

    await page.goto('/feedback?app=not-a-real-app');
    await expect(page.getByRole('heading', { level: 1, name: 'App Feedback' })).toBeVisible();
  });

  test('Spanish feedback page uses translated copy', async ({ page }) => {
    await page.goto('/es/feedback');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Feedback de las apps' }),
    ).toBeVisible();
    await expect(page.getByText(/Ayúdanos a mejorar las apps de 0xVera/i)).toBeVisible();
  });

  test('testers page loads with group CTA and feedback link', async ({ page }) => {
    const response = await page.goto('/testers');
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Join 0xVera Android Testers' }),
    ).toBeVisible();

    const cta = page.locator('#testers-join-cta');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', 'https://groups.google.com/g/0xvera-android-testers');
    await expect(cta).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(cta).toHaveAttribute('target', '_blank');

    await expect(page.locator('#testers-feedback-link')).toHaveAttribute('href', '/feedback');
    await expect(
      page.getByText(
        'A Google account is required to join Android closed tests through Google Play.',
      ),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Privacy' })).toBeVisible();
    await expect(page.getByText(/verified email address/i)).toBeVisible();
  });

  test('app detail exposes give feedback link', async ({ page }) => {
    await page.goto('/cardqr');
    const feedback = page.getByRole('link', { name: 'Give feedback' });
    await expect(feedback).toBeVisible();
    await expect(feedback).toHaveAttribute('href', '/feedback?app=cardqr');
  });

  test('site has no public 0xVera Devs identity', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toContainText('0xVera Devs');
    await page.goto('/feedback');
    await expect(page.locator('body')).not.toContainText('0xVera Devs');
    await page.goto('/testers');
    await expect(page.locator('body')).not.toContainText('0xVera Devs');
  });

  test('feedback and testers remain usable without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/feedback');
    await expect(page.getByRole('heading', { level: 1, name: 'App Feedback' })).toBeVisible();
    await expect(page.locator('#feedback-link-en')).toBeVisible();
    await page.goto('/testers');
    await expect(page.locator('#testers-join-cta')).toBeVisible();
    await context.close();
  });

  test('CardQR has no active Play Store link while in beta testing', async ({ page }) => {
    await page.goto('/cardqr');
    await expect(page.getByRole('link', { name: 'Google Play' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Join Android beta testers' })).toBeVisible();
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
