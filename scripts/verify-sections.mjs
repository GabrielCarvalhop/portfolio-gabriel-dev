import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome' });
const report = { errors: [], widths: [], accessibility: [] };
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.on('pageerror', (error) => report.errors.push(error.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const sections = [
    '.about-section',
    '.stack-section',
    '.process-section',
    '.services-section',
    '.contact-section',
  ];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const selector of sections) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise(requestAnimationFrame);
        await Promise.allSettled(
          document
            .getAnimations()
            .filter(
              (animation) =>
                animation.timeline === document.timeline &&
                animation.effect?.getComputedTiming().endTime !== Infinity,
            )
            .map((animation) => animation.finished),
        );
      });
      await section.screenshot({ path: `quality/refinement/${selector.slice(1)}-${width}.png`, style: '.header, .skip-link { visibility: hidden !important; }' });
    }
  }
  for (const width of [375, 390, 430, 768, 820, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    const actual = await page.evaluate(() => document.documentElement.scrollWidth);
    report.widths.push({ width, scrollWidth: actual });
    expect(actual, `overflow at ${width}`).toBeLessThanOrEqual(width);
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.getByRole('button', { name: 'Backend & dados', exact: true }).click();
    await expect(page.locator('#stack-explanation h4')).toHaveText(
      'A lógica por trás de cada ação.',
    );
    if (width === 390) {
      const explanationBox = await page.locator('#stack-explanation').boundingBox();
      const activeBox = await page.locator('.stack-group.is-active').boundingBox();
      expect(Math.abs(explanationBox.y - activeBox.y - activeBox.height)).toBeLessThan(2);
    }
    await page.getByRole('button', { name: 'Ferramentas & entrega', exact: true }).focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#stack-explanation h4')).toHaveText(
      'Da alteração à próxima versão.',
    );
    await page.getByRole('button', { name: /02 Estruturar/ }).click();
    await expect(page.locator('#process-artifact h4')).toHaveText('Arquitetura do produto');
    await page.getByRole('button', { name: /04 Entregar e evoluir/ }).click();
    await expect(page.locator('#process-artifact h4')).toHaveText('Checklist de entrega');
    await page.getByText('Presença digital', { exact: true }).click();
    await expect(page.locator('details').nth(0)).toHaveAttribute('open', '');
    await page.getByText('Produtos & sistemas', { exact: true }).click();
    await expect(page.locator('details').nth(1)).toHaveAttribute('open', '');
    await expect(page.locator('details').nth(0)).not.toHaveAttribute('open');
    await page.getByText('Produtos & sistemas', { exact: true }).click();
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    report.accessibility.push({ width, violations: axe.violations });
    expect(axe.violations).toEqual([]);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: /01 Descobrir/ }).click();
  await expect(page.locator('#process-artifact h4')).toHaveText('Mapa do problema');
  expect(
    await page.locator('.artifact-sheet').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  await page.getByRole('link', { name: 'Explorar projetos de Gabriel Carvalho' }).click();
  await page.waitForURL('**/projetos');
  expect(report.errors).toEqual([]);
  console.log(
    'PASS: nine widths, stack layers, keyboard, process outputs, exclusive services, desktop/mobile axe, reduced motion and final CTA.',
  );
} finally {
  writeFileSync('quality/refinement/sections-report.json', JSON.stringify(report, null, 2));
  await browser.close();
}
