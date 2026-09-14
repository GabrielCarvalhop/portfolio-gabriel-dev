import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { writeFileSync } from 'node:fs';

// Reuse Playwright's browser lifecycle to avoid Chrome Launcher's Windows temp cleanup issue.
const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--remote-debugging-port=9223'],
});
const summary = [];
try {
  for (const [name, path] of [
    ['home', '/'],
    ['projects', '/projetos'],
    ['case', '/projetos/sistema-pdv-adegas'],
  ]) {
    const result = await lighthouse(`http://localhost:3000${path}`, {
      port: 9223,
      output: 'json',
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });
    if (!result) throw new Error(`No Lighthouse report for ${path}`);
    writeFileSync(`quality/lighthouse-${name}.json`, result.report);
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    );
    summary.push({
      path,
      scores,
      lcp: result.lhr.audits['largest-contentful-paint'].displayValue,
      cls: result.lhr.audits['cumulative-layout-shift'].displayValue,
      tbt: result.lhr.audits['total-blocking-time'].displayValue,
    });
    console.log(JSON.stringify(summary.at(-1)));
  }
} finally {
  writeFileSync('quality/lighthouse-summary.json', JSON.stringify(summary, null, 2));
  await browser.close();
}
