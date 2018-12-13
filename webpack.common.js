const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin()
const path = require('path')

module.exports = {
  entry: ['./index.jsx'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'node_modules/bootstrap/dist/css',
        to: 'vendor/bootstrap'
      }
    ]),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
      hash: true,
      title: 'XSS Chef'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      '~': path.resolve(__dirname)
    }
  }
}
