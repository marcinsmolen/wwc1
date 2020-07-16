const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './app/assets/js/Index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/assets'),
  },
  devServer: {
    contentBase:path.resolve(__dirname, 'app'),
    publicPath: '/'
  },
  module: { 
    rules: [
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
       },
      {
        test: /\.(gif|png|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img/'
            }
          }
        ]
      },
      {
        test:/\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              root: path.resolve(__dirname, 'app')
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'file-loader',
                options: { outputPath: './assets/', name: '[name].min.css'}
            },
            'sass-loader'
        ]
      }   
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './app/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin({
      patterns: [
        { 
          from:path.resolve(__dirname, 'app/assets/', 'img'), 
          to: path.resolve(__dirname, 'public/assets/', 'img')
        }
      ],
    }),

  ]
}