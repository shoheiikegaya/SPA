const path = require("path");

module.exports = {
  mode: "development",
  target: "node",
  entry: "./src/server.ts",
  output: {
    filename: "server.js",
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
  },
  //devtool: "cheap-module-eval-source-map",
  //devtool: "inline-source-map",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};
