import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await expect(page.locator('.hero-sculpture')).toHaveCount(0);
  const backdrop = page.locator('.developer-backdrop');
  const signal = page.locator('.circuit-signals path').first();
  await expect(backdrop).toHaveAttribute('data-running', 'true');
  const offset = () => signal.evaluate((el) => getComputedStyle(el).strokeDashoffset);
  const start = await offset();
  await expect.poll(offset).not.toBe(start);
  await page.screenshot({ path: 'quality/refinement/effects-desktop.png' });
  await page.getByRole('button', { name: 'Pausar fundo' }).click();
  await expect(backdrop).toHaveAttribute('data-paused', 'true');
  expect(await signal.evaluate((el) => getComputedStyle(el).animationPlayState)).toBe('paused');
  await page.getByRole('button', { name: 'Retomar fundo' }).click();
  await page.getByRole('button', { name: 'Estrutura', exact: true }).click();
  await expect(page.locator('.code-console-source')).toContainText('setStage(0)');
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(backdrop).toHaveAttribute('data-running', 'false');
  expect(await signal.evaluate((el) => getComputedStyle(el).animationPlayState)).toBe('paused');
  await page.locator('.project-visual').first().hover();
  await expect
    .poll(() =>
      page
        .locator('.project-scan')
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    )
    .toBe('preview-scan');
  await page.goto('http://localhost:3000');
  const a11y = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(a11y.violations).toEqual([]);
  for (const width of [375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `overflow at ${width}`,
    ).toBe(true);
    if (width === 390) {
      await page.locator('.hero-art').scrollIntoViewIfNeeded();
      await page.locator('.hero-art').screenshot({ path: 'quality/refinement/effects-mobile.png' });
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await signal.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  await expect(page.getByRole('button', { name: 'Pausar fundo' })).toBeHidden();
  expect(errors).toEqual([]);
  console.log(
    'PASS: animated paths, pause/resume, offscreen suspension, stage/source sync, preview scan, axe, six widths, reduced motion, no page errors.',
  );
} finally {
  await browser.close();
}
