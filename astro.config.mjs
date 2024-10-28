import { defineConfig } from "astro/config";
import node from "@astrojs/node";
// https://astro.build/config
const checkRoute = function (server) {
  return {
    name: "configure-server",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url.endsWith(".log")) {
          res.writeHead(302, { Location: "/" }); // Change '/' to any URL you want to redirect to
          res.end();
        } else {
          next();
        }
      });
    },
  };
};

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  security: {
    checkOrigin: true,
  },
  vite: {
    plugins: [checkRoute()],
  },
});
