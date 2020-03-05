const webpack = require('webpack')
const merge = require('webpack-merge')

const commonConfig = require('./webpack.config.js')

module.exports = merge.smart(commonConfig, {
  devtool: 'source-map',
  devServer: {
    contentBase: './www',
    open: true,
    port: 6010
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-runtime'],
              cacheDirectory: true
            }
          },
          // {
          //   loader: 'eslint-loader',
          //   options: {
          //     cache: true,
          //     fix: false
          //   }
          // }
        ]
      },
      {
        // BUG: 不加type这个域无法使用file-loader加载json https://github.com/webpack/webpack/issues/6586
        type: 'javascript/auto',
        test: /\.json$/,
        include: /src\/assets/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        }
      }
    ]
  }
})
