import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createStaticServer } from './serve.mjs';

const server = createStaticServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const text = html => html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]*>/g, '').replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&#([0-9]+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ').trim();
try {
  const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get('content-type'), /xml/);
  const sitemap = await sitemapResponse.text();
  const paths = [...sitemap.matchAll(/<loc>https:\/\/timothyhatch.com([^<]*)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(paths, ['/', '/about', '/projects', '/shopcost-support', '/shopcost-privacy']);
  const routeSource = await readFile('src/App.tsx', 'utf8');
  assert.deepEqual([...routeSource.matchAll(/<Route path="([^"]+)"/g)].map(match => match[1]), paths);
  let privacy;
  const markers = ['Star Factions', 'Full-Cycle Developer', 'Business Projects', 'Need help with ShopCost?', 'Information ShopCost Collects'];
  for (const [index, path] of paths.entries()) {
    const response = await fetch(`${origin}${path}`, { redirect: 'manual' });
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.equal(response.headers.get('x-robots-tag'), null);
    const html = await response.text();
    assert.ok(html.includes(markers[index]), `${path} has initial content`);
    assert.ok(html.includes(`<link rel="canonical" href="https://timothyhatch.com${path}"`));
    assert.doesNotMatch(html, /noindex|nofollow|<div id="root"><\/div>/);
    for (const asset of [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)]) {
      assert.equal((await fetch(`${origin}${asset[1]}`)).status, 200, asset[1]);
    }
    assert.equal((await fetch(`${origin}${path}`, { method: 'HEAD' })).status, 200);
    console.log(`PASS direct GET/HEAD, content, canonical, robots, assets: ${path}`);
    if (path === '/shopcost-privacy') privacy = html;
  }
  // Compare every policy heading/paragraph with its unchanged JSX source.
  const source = await readFile('src/components/shopcost-privacy/shopCostPrivacy.tsx', 'utf8');
  const expected = [...source.matchAll(/<Typography\b[^>]*>([\s\S]*?)<\/Typography>/g)].map(match => text(match[1]));
  const main = privacy.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  const actual = [...main.matchAll(/<(h1|h2|p)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(match => text(match[2]));
  assert.deepEqual(actual, expected);
  assert.match(main, /href="mailto:support@timothyhatch.com"/);
  const robots = await (await fetch(`${origin}/robots.txt`)).text();
  assert.match(robots, /User-agent: \*\s+Disallow:\s*\n/);
  assert.match(robots, /Sitemap: https:\/\/timothyhatch.com\/sitemap.xml/);
  for (const path of ['/Frogger/game.html', '/EtchSketch/game.html', '/TeamAnonymoose_Prototype_0114.pdf', '/Timothy%20J.%20Hatch%20%E2%80%94%20Resume.pdf']) {
    assert.equal((await fetch(`${origin}${path}`)).status, 200, path);
  }
  assert.equal((await fetch(`${origin}/crawler-audit-nonexistent`)).status, 404);
  console.log('PASS exact policy text, sitemap, robots, games/PDFs, and unknown-route 404');
} finally {
  await new Promise(resolve => server.close(resolve));
}
