# Getting Started

This project built/bundled and locally served using [Vite](https://vitejs.dev).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

See the section about [deployment](https://vitejs.dev/guide/build.html) for more information.

### `npm run serve`

Serves `dist` at http://127.0.0.1:4173 using exact object paths, including the
extensionless HTML pages uploaded to S3. Missing objects return 404 instead of an
SPA fallback. This is a local preview, not a production server.

### `npm run check:public-pages`

After building, checks direct HTTP GET/HEAD responses, initial page content,
policy text against the original component, canonical URLs, robots, sitemap,
referenced assets, existing games/PDFs, and missing-page status.

## Public-page rendering and deployment

The build prerenders the five explicitly listed public routes in
`src/publicPages.ts` using the existing React components and styles. It writes
`dist/index.html`, extensionless HTML objects for the other routes, and
`dist/sitemap.xml`. No runtime SSR service or browser-specific response is used.
React still mounts normally for interactive navigation, color preferences, menus,
and the About page's browser-only PDF viewer. The resume download link and About
text are present without JavaScript. Public games still need JavaScript to play.

Deploy the complete `dist` directory using the updated workflow. Its extra S3
uploads explicitly set `Content-Type: text/html; charset=utf-8` on extensionless
page objects; a plain `aws s3 sync` alone may assign an incorrect MIME type.
The workflow then invalidates CloudFront's `/*` cache. Do not deploy the temporary
build-time renderer. Add new public routes to the allowlist deliberately; private
routes must never be added automatically.

See [the crawler audit](docs/crawler-accessibility-audit.md) for live findings,
CloudFront follow-up, and deployment verification.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/why.html).

To learn MUI, check out the [Material UI documentation](https://mui.com/material-ui/getting-started/)
To learn React, check out the [React documentation](https://reactjs.org/).

### Making a Progressive Web App

PWAs: [https://web.dev/explore/progressive-web-apps](https://web.dev/explore/progressive-web-apps)
