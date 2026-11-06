import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [1440, 390]) {
  test(`WCAG A/AA audit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test('WCAG A/AA audit with mobile navigation open', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('WCAG A/AA audit for validation and prepared-enquiry states', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Prepare Enquiry' }).click();
  const validationResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(validationResults.violations).toEqual([]);

  await page.locator('#fullName').fill('Test Customer');
  await page.locator('#email').fill('customer@example.com');
  await page.locator('#service').selectOption({ label: 'Remote IT Support' });
  await page.locator('#subject').fill('Remote assistance');
  await page.locator('#message').fill('I need assistance with a suitable software configuration issue.');
  await page.getByRole('button', { name: 'Prepare Enquiry' }).click();
  const preparedResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(preparedResults.violations).toEqual([]);
});
