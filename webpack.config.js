const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry:  './src/app/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'www')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Elephant Magazine',
      template: './src/index.ejs'
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },
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
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './assets/img/[hash].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
