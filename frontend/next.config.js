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
            ? "https://cms.sebasptsch.dev/api/graphql"
            : "http://localhost:3000/api/graphql",
      },
    ];
  },
});
