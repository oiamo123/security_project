import { c as createComponent, r as renderTemplate, d as renderHead, e as renderSlot, b as createAstro, m as maybeRenderHead, f as renderComponent } from '../chunks/astro/server_sX8U_SJJ.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<head><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body>`;
}, "C:/Users/gmoia/OneDrive/Desktop/Coding stuff/School/Security/security_project/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Nav;
  const loggedIn = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav> <h1>blah</h1> ${loggedIn && renderTemplate`<a href="">Logout</a>`} </nav>`;
}, "C:/Users/gmoia/OneDrive/Desktop/Coding stuff/School/Security/security_project/src/components/Nav.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Nav", $$Nav, {})} ` })}`;
}, "C:/Users/gmoia/OneDrive/Desktop/Coding stuff/School/Security/security_project/src/pages/index.astro", void 0);

const $$file = "C:/Users/gmoia/OneDrive/Desktop/Coding stuff/School/Security/security_project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
