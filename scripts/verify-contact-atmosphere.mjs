import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const section = page.locator('#contato');
  const background = page.locator('.contact-atmosphere');
  const packet = page.locator('.data-packets path').first();
  const offset = () => packet.evaluate((el) => getComputedStyle(el).strokeDashoffset);
  for (const width of [375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await section.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );
    if ([390, 1440].includes(width)) {
      await expect(background).toHaveAttribute('data-running', 'true');
      const before = await offset();
      await page.waitForTimeout(350);
      expect(await offset()).not.toBe(before);
      await section.screenshot({
        path: `quality/refinement/contact-atmosphere-${width}.png`,
        style: '.header,.skip-link {visibility:hidden!important}',
      });
      const axe = await new AxeBuilder({ page })
        .include('#contato')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(axe.violations).toEqual([]);
      await page.getByRole('button', { name: 'Pausar animação', exact: true }).focus();
      await page.keyboard.press('Enter');
      await expect(background).toHaveAttribute('data-paused', 'true');
      await page.evaluate(
        () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
      );
      const frozen = await offset();
      await page.waitForTimeout(200);
      expect(await offset()).toBe(frozen);
      await page.getByRole('button', { name: 'Retomar animação', exact: true }).click();
      await expect(background).toHaveAttribute('data-paused', 'false');
    }
  }
  await page.locator('h1').scrollIntoViewIfNeeded();
  await expect(background).toHaveAttribute('data-running', 'false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await section.scrollIntoViewIfNeeded();
  expect(await packet.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  await expect(page.locator('.contact-motion-toggle')).toBeHidden();
  await page.getByRole('link', { name: 'Explorar projetos de Gabriel Carvalho' }).click();
  await page.waitForURL('**/projetos');
  expect(errors).toEqual([]);
  console.log(
    'PASS: six widths, desktop/mobile axe, visible continuous motion, keyboard pause/resume, offscreen suspension, reduced motion and project CTA.',
  );
} finally {
  await browser.close();
}
