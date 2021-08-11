const path = require('path');

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
  },
  output: {
    filename: 'wppconnect-wa.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'WPP',
      type: 'umd',
    },
  },
};
