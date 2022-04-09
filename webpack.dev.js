const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      // typescript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // image & font
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: "asset/resource",
      },
      // glsl
      {
        test: /\.(vert|frag|glsl)$/,
        use: {
          loader: "webpack-glsl-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: true,
    // devMiddleware: {
    //   writeToDisk: true,
    // },
    historyApiFallback: true,
    allowedHosts: "all",
  },
};
