import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome' });
const report = { widths: [], accessibility: [], errors: [] };
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', (error) => report.errors.push(error.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const footer = page.locator('#rodape');
  const toggle = footer.locator('[data-inspect-toggle]');
  for (const width of [375, 390, 620, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await footer.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );
    const box = await footer.boundingBox();
    report.widths.push({ width, height: Math.round(box.height) });
    if ([390, 1440].includes(width)) {
      await page.waitForTimeout(1300);
      await footer.screenshot({
        path: `quality/refinement/footer-new-${width}.png`,
        style: '.header,.skip-link {visibility:hidden!important}',
      });
      const axe = await new AxeBuilder({ page })
        .include('#rodape')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      report.accessibility.push({ width, violations: axe.violations });
      expect(axe.violations).toEqual([]);
      await toggle.focus();
      await expect(toggle).toHaveAccessibleName('Ver a construção');
      await page.keyboard.press('Enter');
      await expect(toggle).toHaveAttribute('aria-pressed', 'true');
      await expect(toggle).toHaveAccessibleName('Sair da construção');
      await expect(page.locator('html')).toHaveAttribute('data-inspect', '');
      await expect(footer.locator('.inspect-on')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute('aria-pressed', 'false');
      await toggle.click();
      await page.getByRole('button', { name: 'Sair do modo construção' }).click();
      await expect(toggle).toBeFocused();
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await toggle.hover();
  expect(
    await footer.locator('.layer-front').evaluate((el) => getComputedStyle(el).transform),
  ).toBe('none');
  expect(
    await footer.locator('.closing-trace').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  await footer.locator('.closing-top').click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await footer.getByRole('link', { name: 'Projetos', exact: true }).click();
  await page.waitForURL('**/projetos');
  await expect(page.locator('#rodape')).toBeAttached();
  expect(report.errors).toEqual([]);
  console.log(
    'PASS: seven widths; desktop/mobile axe; construction toggle, Escape, focus restoration; reduced motion; top and project navigation.',
  );
} finally {
  writeFileSync('quality/refinement/footer-report.json', JSON.stringify(report, null, 2));
  await browser.close();
}
