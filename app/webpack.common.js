const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  //entry: "./src/components/Login.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    //assetModuleFilename: "images/[name][ext]",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
      },

      {
        test: /\.(ico|svg|jpe?g|png|webp)$/,
        type: "asset/resource", // <--- 'file-loader'
        // または
        //type: "asset/inline", // <--- 'url-loader'
      },
    ],
  },
};
