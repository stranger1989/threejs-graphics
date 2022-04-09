const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  performance: {
    hints: false,
  },
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
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};
