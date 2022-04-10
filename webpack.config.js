const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  mode: "development",
  devServer: {
    static: "./dist",
    hot: true,
    port: 8080,
  },
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    publicPath: "./",
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo list",
      template: "./src/index.html",
    }),
  ],
};
