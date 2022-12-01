const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  output: {
    publicPath: "http://localhost:3010/",
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
