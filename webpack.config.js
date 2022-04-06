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
  devServer: {
    static: "./dist",
  },

  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    publicPath: "dist",
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
    }),
  ],
};
