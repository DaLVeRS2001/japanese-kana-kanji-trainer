const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const production = process.env.NODE_ENV === 'production';

const PATHS = {
  src: path.resolve(__dirname, './src'),
  public: path.resolve(__dirname, './public'),
  dist: path.resolve(__dirname, './dist'),
};

module.exports = {
  entry: `${PATHS.src}/index.js`,
  output: {
    path: PATHS.dist,
    filename: production ? '[name].[contenthash].js' : '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new FaviconsWebpackPlugin(`${PATHS.public}/favicon.ico`),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Japanese kana&kanji trainer',
      template: `${PATHS.public}/index.html`,
      favicon: `${PATHS.public}/favicon.ico`,
    }),
    new MiniCssExtractPlugin({
      filename: production ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
  devServer: {
    port: 3001,
  },
  resolve: {
    alias: {
      components: `${PATHS.src}/components/`,
      features: `${PATHS.src}/features/`,
      modules: `${PATHS.src}/modules/`,
      shared: `${PATHS.src}/shared/`,
      hooks: `${PATHS.src}/hooks/`,
    },
    extensions: ['.*', '.js', '.jsx', '.scss'],
  },
  mode: production ? 'production' : 'development',
};
