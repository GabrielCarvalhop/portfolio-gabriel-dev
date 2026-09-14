import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome' });
const report = { widths: [], errors: [], accessibility: [], motion: {} };
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', (error) => report.errors.push(error.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  for (const width of [375, 390, 620, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    const dimensions = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      overflowing: [...document.querySelectorAll('main *')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return (
            r.right > innerWidth + 1 &&
            getComputedStyle(el).position !== 'absolute' &&
            !el.closest('[aria-hidden="true"]')
          );
        })
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          right: el.getBoundingClientRect().right,
        }))
        .slice(0, 10),
    }));
    report.widths.push({ width, ...dimensions });
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const selector of ['.hero', '.project-showcase', '.about-section', '.contact-section']) {
      const target = page.locator(selector).first();
      await target.scrollIntoViewIfNeeded();
      await page.waitForTimeout(950);
      await target.screenshot({
        path: `quality/refinement/creative-${selector.slice(1)}-${width}.png`,
        style: '.header,.skip-link {visibility:hidden!important}',
      });
    }
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    report.accessibility.push({ width, violations: axe.violations });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator('.hero').scrollIntoViewIfNeeded();
  const art = page.locator('.hero-art');
  await art.hover({ position: { x: 220, y: 160 } });
  await expect(art).toHaveAttribute('data-tracking', 'true');
  report.motion.pointer = true;
  await page.emulateMedia({ reducedMotion: 'reduce' });
  report.motion.reduced = await page
    .locator('.circuit-signals path')
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  await expect(art).not.toHaveAttribute('data-tracking', 'true');
  const noJS = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  await noJS.goto('http://localhost:3000');
  await expect(noJS.locator('h1')).toBeVisible();
  await expect(noJS.locator('.project-title').first()).toBeVisible();
  report.motion.noJSContent = true;
  console.log(JSON.stringify(report, null, 2));
  expect(report.widths.every((item) => item.scroll <= item.width)).toBe(true);
  expect(report.accessibility.every((item) => item.violations.length === 0)).toBe(true);
  expect(report.motion.reduced).toBe('none');
  expect(report.errors).toEqual([]);
} finally {
  writeFileSync('quality/refinement/creative-report.json', JSON.stringify(report, null, 2));
  await browser.close();
}
