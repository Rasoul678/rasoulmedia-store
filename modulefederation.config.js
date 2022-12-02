const deps = require("./package.json").dependencies;

module.exports = {
  name: "store",
  filename: "remoteEntry.js",
  remotes: {
    store: "store@https://rasoul678.github.io/rasoulmedia-store/remoteEntry.js",
    editor: "editor@https://rasoul678.github.io/rasoulmedia-editor/remoteEntry.js",
  },
  exposes: {
    "./store": "./src/state/store",
  },
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
    "react-redux": {
      singleton: true,
      version: deps["react-redux"],
    },
  },
};
