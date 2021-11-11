// next.config.js

/** @type {import('next').NextConfig} */

const { withPlaiceholder } = require("@plaiceholder/next");
module.exports = withPlaiceholder({
  esmExternals: false,
  images: {
    domains: ["pbs.twimg.com", "cms.sebasptsch.dev", "localhost"],
  },
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination:
          process.env.NODE_ENV === "production"
            ? "http://cms:3002/api/graphql"
            : "http://localhost:3002/api/graphql",
      },
    ];
  },
});
