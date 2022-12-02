const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  mode: "production",
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
};
