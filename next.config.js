// // next.config.js
// const path = require("path");

// module.exports = {
//   outputFileTracingRoot: path.join(__dirname),
// };
// next.config.mjs
import path from "path";

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve("./");

    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
      ".mjs": [".mjs", ".mts"],
      ".cjs": [".cjs", ".cts"],
    };
    return config;
  },
};

export default nextConfig;
