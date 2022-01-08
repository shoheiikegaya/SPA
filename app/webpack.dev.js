const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

/*
react-router のルーティング設定だけでは、静的リソースの存在しないページを直接 URL で指定してアクセスすると 404 Error になります。 
URL を直接指定しても目的のページを表示させるようにするには、サーバでフォールバックを設定しましょう。
webpack-dev-server であるならば historyApiFallback: true を設定することで、404 Error を回避できます。
*/

const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./build"),
    },
    //hot: true,
    //open: true,
    //historyApiFallback: true,
    //host: "localhost",
    //docker-compose.yamlから実行する場合は、0.0.0.0に設定
    host: "0.0.0.0",
    port: 3001,
  },
  devtool: "source-map",
});
