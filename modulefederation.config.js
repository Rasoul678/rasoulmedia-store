const deps = require("./package.json").dependencies;

module.exports = {
  name: "store",
  filename: "remoteEntry.js",
  remotes: {
    store: "store@http://localhost:3010/remoteEntry.js",
    editor: "editor@http://localhost:3020/remoteEntry.js",
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
