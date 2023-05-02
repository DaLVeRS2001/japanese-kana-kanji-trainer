const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const production = process.env.NODE_ENV === 'production';

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  public: path.resolve(__dirname, 'public'),
  dist: path.resolve(__dirname, 'dist'),
};

let htmlMinifyOptions = {
  collapseWhitespace: true,
  html5: true,
  minifyCSS: true,
  removeComments: true,
  removeEmptyAttributes: true,
};

module.exports = {
  entry: `${PATHS.src}/index.js`,
  output: {
    path: PATHS.dist,
    filename: production ? '[name].[fullhash].js' : '[name].js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public/fonts/',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Japanese kana&kanji trainer',
      template: './public/index.html',
      filename: './index.html',
      favicon: `./public/favicon.ico`,
      minify: htmlMinifyOptions,
    }),
    new MiniCssExtractPlugin({
      filename: production ? '[name].[fullhash].css' : '[name].css',
    }),
  ],
  devServer: {
    port: 3001,
    static: './dist',
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      components: `${PATHS.src}/components`,
      features: `${PATHS.src}/features`,
      modules: `${PATHS.src}/modules`,
      shared: `${PATHS.src}/shared`,
      hooks: `${PATHS.src}/hooks`,
    },
    extensions: ['.*', '.js', '.jsx', '.scss'],
  },
  optimization: {
    runtimeChunk: 'single',
  },
  mode: production ? 'production' : 'development',
};
