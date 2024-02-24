const path = require('path');
const webpack = require('webpack');
const packageJSON = require('./package.json');

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
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      __VERSION__: `'${packageJSON.version}'`,
      __SUPPORTED_WHATSAPP_WEB__: `'${packageJSON.engines['whatsapp-web']}'`,
    }),
  ],
};
