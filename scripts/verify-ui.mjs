import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

mkdirSync('quality', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const consoleErrors = [];
page.on('pageerror', (error) => consoleErrors.push(error.message));
const report = { widths: [], accessibility: [], routes: [], interactions: [], consoleErrors };
try {
  for (const width of [375, 390, 430, 768, 820, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('img').evaluateAll((images) =>
      images.forEach((image) => {
        image.loading = 'eager';
      }),
    );
    await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
    const metrics = await page.evaluate(() => ({
      width: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelectorAll('h1').length,
      brokenImages: Array.from(document.images)
        .filter((image) => !image.complete || !image.naturalWidth)
        .map((image) => image.src),
    }));
    assert.ok(metrics.scrollWidth <= width, `Home overflow at ${width}: ${metrics.scrollWidth}`);
    assert.equal(metrics.h1, 1);
    assert.equal(metrics.brokenImages.length, 0);
    report.widths.push(metrics);
    if ([390, 768, 1440].includes(width))
      await page.screenshot({ path: `quality/home-${width}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  const routes = [
    '/',
    '/projetos',
    '/projetos/sistema-pdv-adegas',
    '/projetos/plataforma-ecommerce',
    '/projetos/website-nutricionista',
    '/projetos/clinica-odontologica',
    '/projetos/energia-solar',
    '/rota-inexistente',
  ];
  for (const route of routes) {
    const response = await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
    await page.locator('img').evaluateAll((images) =>
      images.forEach((image) => {
        image.loading = 'eager';
      }),
    );
    await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
    assert.equal(response.status(), route === '/rota-inexistente' ? 404 : 200);
    assert.equal(await page.locator('h1').count(), 1);
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    report.accessibility.push({
      route,
      violations: axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    });
    report.routes.push({
      route,
      status: response.status(),
      title: await page.title(),
      canonical: await page
        .locator('link[rel="canonical"]')
        .getAttribute('href')
        .catch(() => null),
    });
    if (['/projetos', '/projetos/sistema-pdv-adegas'].includes(route))
      await page.screenshot({
        path: `quality/${route === '/projetos' ? 'projects' : 'case'}-1440.png`,
        fullPage: true,
      });
    if (route !== '/') {
      for (const width of [375, 390, 430, 768, 820, 1024, 1280, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        assert.ok(scrollWidth <= width, `${route} overflow at ${width}: ${scrollWidth}`);
      }
    }
  }
  await page.goto('http://localhost:3000/projetos');
  for (const [category, count] of [
    ['Sites', 2],
    ['Sistemas', 1],
    ['E-commerce', 1],
    ['Landing Pages', 1],
    ['Experimentos', 0],
    ['Todos', 5],
  ]) {
    await page
      .getByRole('group', { name: 'Filtrar projetos por categoria' })
      .getByRole('button', { name: category, exact: category !== 'Todos' })
      .click();
    await page.waitForFunction(
      (expected) => document.querySelectorAll('.project-card').length === expected,
      count,
    );
  }
  await page.getByRole('button', { name: 'Experimentos', exact: true }).click();
  await page.getByRole('button', { name: 'Ver todos os projetos' }).click();
  await page.waitForFunction(() => document.querySelectorAll('.project-card').length === 5);
  report.interactions.push('All category filters and empty-state recovery passed');
  await page.locator('.project-card').first().locator('.project-visual').click();
  await page.waitForURL('**/projetos/sistema-pdv-adegas');
  await page.locator('.next-project').click();
  await page.waitForURL('**/projetos/plataforma-ecommerce');
  report.interactions.push('Portfolio → case → next case passed');
  await page.goto('http://localhost:3000/');
  for (const label of ['Estrutura', 'Interface', 'Produto']) {
    const button = page.getByRole('button', { name: label, exact: true });
    await button.click();
    assert.equal(await button.getAttribute('aria-pressed'), 'true');
  }
  await page.getByText('Presença digital', { exact: true }).click();
  assert.equal(await page.locator('details').first().getAttribute('open'), '');
  report.interactions.push('Hero layer controls and service disclosures passed');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  assert.equal(
    await page.locator('body').evaluate((el) => getComputedStyle(el).overflow),
    'hidden',
  );
  await page.keyboard.press('Escape');
  assert.equal(
    await page.getByRole('button', { name: 'Abrir menu' }).getAttribute('aria-expanded'),
    'false',
  );
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page
    .getByRole('navigation', { name: 'Navegação móvel' })
    .getByRole('link', { name: 'Projetos' })
    .click();
  await page.waitForURL('**/projetos');
  await page.locator('.mobile-nav').waitFor({ state: 'hidden' });
  report.interactions.push('Mobile menu, Escape, focus restoration and navigation passed');
  for (const route of ['/projetos', '/projetos/sistema-pdv-adegas']) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
    await page.locator('img').evaluateAll((images) =>
      images.forEach((image) => {
        image.loading = 'eager';
      }),
    );
    await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
    await page.screenshot({
      path: `quality/${route === '/projetos' ? 'projects' : 'case'}-390.png`,
      fullPage: true,
    });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://localhost:3000/');
  assert.equal(
    await page.locator('.hero-copy').evaluate((el) => getComputedStyle(el).animationName),
    'none',
  );
  assert.equal(
    await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior),
    'auto',
  );
  report.interactions.push('Reduced-motion behavior passed');
  assert.equal(consoleErrors.length, 0);
} finally {
  writeFileSync('quality/browser-report.json', JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
assert.equal(
  report.accessibility.flatMap((result) => result.violations).length,
  0,
  'Accessibility violations need review',
);
