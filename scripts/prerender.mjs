import { build } from 'vite';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Bundle only for build-time rendering; no server runtime is deployed.
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'timhatch-prerender-'));
try {
  await build({
    ssr: { noExternal: true },
    build: {
      ssr: 'src/entry-prerender.tsx',
      outDir: temporaryDirectory,
      emptyOutDir: false,
      copyPublicDir: false,
    },
  });
  const { render, publicPages, siteOrigin } = await import(
    pathToFileURL(join(temporaryDirectory, 'entry-prerender.js')).href
  );
  const template = await readFile('dist/index.html', 'utf8');
  for (const page of publicPages) {
    const html = template
      .replace('<div id="root"></div>', `<div id="root">${render(page.path)}</div>`)
      .replace(/<noscript>.*?<\/noscript>/s, '')
      .replace(/<title>.*?<\/title>/s, `<title>${page.title} | Timothy Hatch</title>`)
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${page.description}" />`)
      .replace('</head>', `<link rel="canonical" href="${siteOrigin}${page.path}" />\n  </head>`);
    // Exact, extensionless S3 keys avoid CloudFront's SPA error fallback.
    await writeFile(resolve('dist', page.path === '/' ? 'index.html' : page.path.slice(1)), html);
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPages.map(page => `  <url><loc>${siteOrigin}${page.path}</loc></url>`).join('\n')}\n</urlset>\n`);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
