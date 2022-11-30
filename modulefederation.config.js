const deps = require("./package.json").dependencies;

module.exports = {
  name: "store",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {},
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};
