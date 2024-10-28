import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_OjWOlySA.mjs';
import { manifest } from './manifest_3kj3eApx.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/login.astro.mjs');
const _page2 = () => import('./pages/product.astro.mjs');
const _page3 = () => import('./pages/products.astro.mjs');
const _page4 = () => import('./pages/register.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/login.astro", _page1],
    ["src/pages/product.astro", _page2],
    ["src/pages/products.astro", _page3],
    ["src/pages/register.astro", _page4],
    ["src/pages/index.astro", _page5]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/Users/gmoia/OneDrive/Desktop/Coding%20stuff/School/Security/security_project/dist/client/",
    "server": "file:///C:/Users/gmoia/OneDrive/Desktop/Coding%20stuff/School/Security/security_project/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
