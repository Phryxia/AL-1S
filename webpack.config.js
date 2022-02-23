const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "swc-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  target: ["node12.20"],
};
