const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const getAbsolutePath = (target) => path.resolve(__dirname, target);
const isDevMode = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDevMode ? "development" : "production",

  entry: ["./src/index.tsx"],

  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                isDevMode && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: ["@svgr/webpack"],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    isDevMode && new ReactRefreshWebpackPlugin(),
    !isDevMode &&
      new MiniCssExtractPlugin({
        linkType: false,
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      }),
  ].filter(Boolean),

  devServer: {
    port: 3000,
    proxy: {},
    compress: true,
    static: false,
    historyApiFallback: true,
    client: {
      overlay: true,
      progress: true,
    },
  },

  devtool: isDevMode ? "inline-source-map" : undefined,

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@styles": getAbsolutePath("src/styles/"),
    },
  },
};
