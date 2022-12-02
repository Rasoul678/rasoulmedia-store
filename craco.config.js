const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  output: {
    publicPath: "https://rasoul678.github.io/rasoulmedia-store/",
  },
  devServer: {
    port: 3010,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
  resolve: {
    alias: {
      "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
      "react/jsx-runtime": "react/jsx-runtime.js",
    },
  },
};
