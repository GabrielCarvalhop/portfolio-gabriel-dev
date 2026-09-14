import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
const passed = [];
page.on('pageerror', (error) => errors.push(error.message));
await page.addInitScript(() => {
  window.addEventListener('pagereveal', (event) => {
    window.__sharedTransition = Boolean(event.viewTransition);
  });
});
async function capture(name, fullPage = false) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(requestAnimationFrame);
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
  await page.screenshot({ path: `quality/refinement/${name}.png`, fullPage });
}
try {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await capture('after-desktop');
  const art = page.locator('.hero-art');
  await art.hover({ position: { x: 100, y: 170 } });
  await expect(art).toHaveAttribute('data-tracking', 'true');
  await expect
    .poll(() => art.evaluate((el) => Number(el.style.getPropertyValue('--pointer-x'))))
    .toBeLessThan(0);
  await page.mouse.move(4, 120);
  await expect(art).not.toHaveAttribute('data-tracking');
  await page.getByRole('button', { name: 'Estrutura', exact: true }).click();
  await expect(art).toHaveClass(/stage-0/);
  await capture('hero-structure');
  await page.getByRole('button', { name: 'Interface', exact: true }).click();
  await expect(page.locator('.stage-explanation')).toHaveText('Forma, contraste e intenção.');
  await page.getByRole('button', { name: 'Produto', exact: true }).click();
  passed.push('Hero: real state changes, bounded pointer tracking and pointer reset');
  await page.locator('.project-showcase').first().scrollIntoViewIfNeeded();
  await expect(page.locator('.header')).toHaveAttribute('data-condensed', 'true');
  await expect(page.locator('.project-showcase').first()).toHaveClass(/is-in-view/);
  await page.locator('.project-visual').first().hover();
  await expect
    .poll(() =>
      page
        .locator('.project-invitation')
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
    )
    .toBe('1');
  await capture('project-hover');
  const sourceName = await page
    .locator('.project-frame img')
    .first()
    .evaluate((el) => getComputedStyle(el).viewTransitionName);
  await page.locator('.project-visual').first().click();
  await page.waitForURL('**/projetos/sistema-pdv-adegas');
  await expect(page.locator('.case-cover img')).toBeVisible();
  expect(
    await page.locator('.case-cover img').evaluate((el) => getComputedStyle(el).viewTransitionName),
  ).toBe(sourceName);
  expect(await page.evaluate(() => window.__sharedTransition)).toBe(true);
  await page.goBack();
  await expect(page.locator('.hero')).toBeAttached();
  passed.push('Native shared-image transition, destination continuity and browser Back');
  await page
    .locator('#stack')
    .getByRole('link', { name: 'Supabase: ver projetos com esta tecnologia' })
    .click();
  await page.waitForURL('**/projetos?tech=Supabase');
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Sites', exact: true }).click();
  await expect(page.locator('.empty-state')).toBeVisible();
  await page.getByRole('button', { name: 'Ver todos os projetos' }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('link', { name: 'Remover filtro' }).click();
  await expect(page.locator('.project-card')).toHaveCount(5);
  await page.locator('.filter-bar').evaluate((el) => {
    for (const text of ['Sites', 'Sistemas', 'Experimentos', 'Todos'])
      Array.from(el.querySelectorAll('button'))
        .find((b) => b.textContent.startsWith(text))
        .click();
  });
  await expect(page.locator('.project-card')).toHaveCount(5);
  passed.push(
    'Stack → technology filter, combined empty state, removal and rapid filter interruption',
  );
  await page.goto('http://localhost:3000');
  await page.locator('[data-inspect-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-inspect', '');
  await expect(page.locator('[data-inspect-toggle]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await capture('construction-mode');
  const a11y = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(a11y.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(page.locator('html')).not.toHaveAttribute('data-inspect');
  await expect(page.locator('[data-inspect-toggle]')).toBeFocused();
  passed.push(
    'Construction mode: reachable control, annotation, Escape, focus return and accessibility',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000');
  await capture('after-mobile');
  await page.locator('[data-inspect-toggle]').click();
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await expect(page.locator('.construction-note')).toHaveAttribute('inert', '');
  await expect(page.locator('.construction-note')).toBeHidden();
  await page.keyboard.press('Escape');
  await expect(page.locator('html')).toHaveAttribute('data-inspect', '');
  await expect(page.locator('.construction-note')).toBeVisible();
  await expect(page.locator('.construction-note')).not.toHaveAttribute('inert');
  await page.getByRole('button', { name: 'Sair do modo construção' }).click();
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await capture('mobile-menu');
  const menuA11y = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(menuA11y.violations).toEqual([]);
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(
    page.getByRole('button', { name: 'Abrir menu', includeHidden: true }),
  ).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('main')).not.toHaveAttribute('inert');
  expect(await page.locator('body').evaluate((el) => el.style.overflow)).not.toBe('hidden');
  passed.push('Mobile menu: open motion, background inert, accessibility and resize cleanup');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://localhost:3000');
  await art.hover();
  await expect(art).not.toHaveAttribute('data-tracking');
  await page.getByRole('button', { name: 'Estrutura', exact: true }).click();
  await expect(art).toHaveClass(/stage-0/);
  await page.goto('http://localhost:3000/projetos');
  await page.evaluate(() => {
    document.startViewTransition = undefined;
  });
  await page.getByRole('button', { name: 'Sistemas', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  passed.push('Reduced motion and absent View Transition API preserve navigation and state');
  const touch = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const touchPage = await touch.newPage();
  await touchPage.goto('http://localhost:3000');
  await touchPage.getByRole('button', { name: 'Estrutura', exact: true }).tap();
  await expect(touchPage.locator('.hero-art')).toHaveClass(/stage-0/);
  await expect(touchPage.locator('.hero-art')).not.toHaveAttribute('data-tracking');
  await touch.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto('http://localhost:3000');
  await expect(staticPage.locator('h1')).toBeVisible();
  await staticPage.locator('.project-visual').first().click();
  await expect(staticPage.locator('.case-heading')).toBeVisible();
  await noJs.close();
  passed.push('Real touch input and no-JavaScript project navigation');
  expect(errors).toEqual([]);
} finally {
  writeFileSync(
    'quality/refinement/interactions.json',
    JSON.stringify({ passed, errors }, null, 2),
  );
  await browser.close();
}
console.log(passed.join('\n'));
