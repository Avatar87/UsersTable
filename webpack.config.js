const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { 
    main: path.resolve(__dirname, 'src', 'index.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'UserTable'),
    filename: 'bundle.[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'UserTable', 'components'),
      containers: path.resolve(__dirname, 'UserTable', 'containers')
    }
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
	{
         test: /\.less$/,
         use: ExtractTextPlugin.extract({
       	 fallback: 'style-loader',
      	 use: ['css-loader', 'postcss-loader', 'less-loader']
         })
        },
	{
         test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
         loader: 'url-loader?limit=10000'
        }, 
	{
         test: /\.(eot|ttf|wav|mp3)$/,
         loader: 'file-loader'
        }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'UserTable'),
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin('css/style.[chunkhash].css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    })
  ]
} 