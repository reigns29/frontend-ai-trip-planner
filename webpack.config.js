const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  //...
  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv(),
  ],
  //...
};
