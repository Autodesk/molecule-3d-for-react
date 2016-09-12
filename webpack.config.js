const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: ['./src/main.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/js/',
    filename: 'bundle.js',
    library: true,
    libraryTarget: 'commonjs2',
  },
  externals: [
    /^[a-z\-0-9]+$/,
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      }, {
        test: /\.scss$/,
        include: /example\/css/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  plugins: [
    new InlineEnvironmentVariablesPlugin(),
  ],
  devtool: 'source-map',
};
