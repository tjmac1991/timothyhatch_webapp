import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
export { publicPages, siteOrigin } from './publicPages';

export function render(path: string) {
  return renderToString(<StaticRouter location={path}><App /></StaticRouter>);
}
