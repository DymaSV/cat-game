const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: [
          // {
          //   loader: 'url-loader'
          // },
          { 
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath:'image/',
              publicPath:'image/'
            }
          }
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ogg|mp3)$/,
        use: [
          { 
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath:'sounds/',
              publicPath:'sounds/'
            }
          }
        ],
      },
    ],
  },
  optimization: {
    minimize: false //Make true for prod
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ]
};