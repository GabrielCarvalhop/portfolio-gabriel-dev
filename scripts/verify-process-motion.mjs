import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const grid = page.locator('.process-card-grid');
  await grid.scrollIntoViewIfNeeded();
  await expect(grid).toHaveClass(/is-in-view/);
  const effects = [['Descobrir', '.discovery-sweep', 'discover-scan'], ['Estruturar', '.structure-route', 'structure-connect'], ['Construir', '.build-module', 'build-assemble'], ['Entregar e evoluir', '.delivery-orbit', 'deliver-cycle']];
  for (let index = 0; index < effects.length; index++) {
    const [label, selector, animation] = effects[index];
    const button = grid.getByRole('button', { name: new RegExp(label) });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#process-artifact')).toHaveAttribute('data-phase', String(index));
    const effect = button.locator(selector).first();
    expect(await effect.evaluate(el => getComputedStyle(el).animationName)).toBe(animation);
    expect(await effect.evaluate(el => getComputedStyle(el).animationIterationCount)).toBe('1');
    await effect.evaluate(async el => { await Promise.allSettled(el.getAnimations().map(a => a.finished)); });
    await button.click();
    expect(await button.locator(selector).first().evaluate(el => el.getAnimations().some(a => a.playState === 'running'))).toBe(true);
  }
  await grid.getByRole('button', { name: /Descobrir/ }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#process-artifact')).toHaveAttribute('data-phase', '0');
  for (const width of [375, 390, 620, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    for (const button of await grid.getByRole('button').all()) {
      expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    if ([390, 1440].includes(width)) {
      await page.locator('.process-section').screenshot({ path: `quality/refinement/process-animated-${width}.png`, style: '.header, .skip-link { visibility: hidden !important; }' });
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(axe.violations).toEqual([]);
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await grid.getByRole('button', { name: /Construir/ }).click();
  expect(await grid.locator('.build-module').first().evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await expect(page.locator('#process-artifact')).toHaveAttribute('data-phase', '2');
  expect(errors).toEqual([]);
  console.log('PASS: four distinct finite animations, replay, keyboard, seven widths, desktop/mobile accessibility and reduced motion.');
} finally { await browser.close(); }
