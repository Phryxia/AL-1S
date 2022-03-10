const path = require('path')
const nodeExternals = require('webpack-node-externals')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'esnext',
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  target: ['node17'],
  externalsPresets: { node: true },
  externals: [nodeExternals()],
}
