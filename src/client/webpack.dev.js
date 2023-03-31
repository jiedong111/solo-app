const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const WebPackDevServer = require('webpack-dev-server');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../../build/client'),
    },
    hot: true,
    compress: true,
    port: 9000,
    proxy: {
      '/api':{
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
      }
    }
  },
})