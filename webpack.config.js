const path = require('path');
const webpack = require('webpack');
const packageJSON = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      fs: false,
    },
  },
  output: {
    filename: 'wppconnect-wa.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'WPP',
      type: 'global',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: /WA-JS V:/, // Retain the banner comment
        },
      },
      extractComments: false, // Do not extract comments to a separate file
    })],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      __VERSION__: `'${packageJSON.version}'`,
      __SUPPORTED_WHATSAPP_WEB__: `'${packageJSON.engines['whatsapp-web']}'`,
    }),
    new webpack.BannerPlugin({
      banner: `/*! For license information please see wppconnect-wa.js.LICENSE.txt. WA-JS Version: ${packageJSON.version} */\n`,
      entryOnly: true,
      raw: true
    })
  ],
};
