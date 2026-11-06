import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('renders the business identity, primary sections and uncropped logo', async ({ page }) => {
  await expect(page).toHaveTitle(/Mr\.IT Support/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Technology solutions that keep your business moving.');

  for (const id of ['home', 'about', 'services', 'solutions', 'why-us', 'process', 'portfolio', 'founder', 'faq', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }

  const logo = page.locator('.nav-logo img');
  await expect(logo).toBeVisible();
  const dimensions = await logo.evaluate((image) => ({
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    renderedWidth: image.getBoundingClientRect().width,
    renderedHeight: image.getBoundingClientRect().height,
  }));
  expect(dimensions.naturalWidth).toBe(938);
  expect(dimensions.naturalHeight).toBe(741);
  expect(dimensions.renderedWidth / dimensions.renderedHeight).toBeCloseTo(938 / 741, 2);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
});

test('desktop navigation and service enquiry workflow function', async ({ page }) => {
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Services', exact: true }).click();
  await expect(page).toHaveURL(/#services$/);

  const websiteTab = page.getByRole('tab', { name: /Website Design & Development/ });
  await websiteTab.click();
  await expect(websiteTab).toHaveAttribute('aria-selected', 'true');
  const websitePanel = page.getByRole('tabpanel', { name: /Website Design & Development/ });
  await expect(websitePanel).toBeVisible();
  await expect(websitePanel.getByText('Responsive Website Development', { exact: true })).toBeVisible();

  await websitePanel.getByRole('link', { name: 'Enquire about this service' }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#service')).toHaveValue('Website Design & Development');
});

test('service tabs support arrow-key navigation', async ({ page }) => {
  const firstTab = page.getByRole('tab', { name: /Computer & IT Support/ });
  await firstTab.focus();
  await page.keyboard.press('ArrowDown');
  const secondTab = page.getByRole('tab', { name: /Virus & Malware Protection/ });
  await expect(secondTab).toBeFocused();
  await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: /IT Products Sourcing/ })).toHaveAttribute('aria-selected', 'true');
});

test('FAQ accordion works with mouse and keyboard', async ({ page }) => {
  const firstButton = page.getByRole('button', { name: /What services does Mr\.IT Support provide/ });
  const secondButton = page.getByRole('button', { name: /Does Mr\.IT Support provide on-site computer repair/ });
  await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  await secondButton.click();
  await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByText(/On-site computer repair, hardware maintenance/)).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('button', { name: /Can I receive remote IT support/ })).toBeFocused();
});

test('form validates required fields and email format', async ({ page }) => {
  await page.getByRole('button', { name: 'Prepare Enquiry' }).click();
  await expect(page.locator('#fullName-error')).toHaveText('Please enter your full name.');
  await expect(page.locator('#email-error')).toHaveText('Please enter your email address.');
  await expect(page.locator('#service-error')).toBeVisible();
  await expect(page.locator('#message-error')).toBeVisible();

  await page.locator('#fullName').fill('Test Customer');
  await page.locator('#email').fill('not-an-email');
  await page.locator('#service').selectOption({ label: 'Remote IT Support' });
  await page.locator('#subject').fill('Windows support');
  await page.locator('#message').fill('Short');
  await page.getByRole('button', { name: 'Prepare Enquiry' }).click();
  await expect(page.locator('#email-error')).toContainText('Enter a valid email address');
  await expect(page.locator('#message-error')).toContainText('at least 20 characters');
});

test('valid enquiry is prepared honestly and can be copied or downloaded', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.locator('#fullName').fill('Test Customer');
  await page.locator('#email').fill('customer@example.com');
  await page.locator('#phone').fill('+94 77 123 4567');
  await page.locator('#service').selectOption({ label: 'Networking & Infrastructure' });
  await page.locator('#subject').fill('Small office network');
  await page.locator('#message').fill('I need help planning and configuring a small office network.');
  await page.getByRole('button', { name: 'Prepare Enquiry' }).click();

  await expect(page.getByText(/Nothing has been sent/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copy enquiry' })).toBeVisible();
  await page.getByRole('button', { name: 'Copy enquiry' }).click();
  await expect(page.getByText('Enquiry copied to your clipboard.')).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download .txt' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('mr-it-support-enquiry.txt');
});

test('mobile menu opens, closes with Escape and navigates correctly', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const toggle = page.getByRole('button', { name: 'Open navigation menu' });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close navigation menu' }).first()).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeFocused();

  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /Services/ }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
});

test('back-to-top control appears and returns to the top', async ({ page }) => {
  const backToTop = page.getByRole('button', { name: 'Back to top' });
  await expect(backToTop).toHaveAttribute('tabindex', '-1');
  await page.evaluate(() => window.scrollTo(0, 1600));
  await expect(backToTop).toHaveAttribute('tabindex', '0');
  await backToTop.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('all required viewport widths avoid horizontal overflow and preserve logo visibility', async ({ page }) => {
  for (const width of [1920, 1440, 1024, 768, 430, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    const result = await page.evaluate(() => {
      const logo = document.querySelector('.nav-logo img');
      const bounds = logo.getBoundingClientRect();
      return {
        viewport: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        logoLeft: bounds.left,
        logoRight: bounds.right,
        logoWidth: bounds.width,
        logoHeight: bounds.height,
      };
    });
    expect(result.documentWidth, `Document overflow at ${width}px`).toBeLessThanOrEqual(width);
    expect(result.bodyWidth, `Body overflow at ${width}px`).toBeLessThanOrEqual(width);
    expect(result.logoLeft).toBeGreaterThanOrEqual(0);
    expect(result.logoRight).toBeLessThanOrEqual(width);
    expect(result.logoWidth).toBeGreaterThan(60);
    expect(result.logoWidth / result.logoHeight).toBeCloseTo(938 / 741, 2);
  }
});
