const webpack = require('webpack')

module.exports = {
  entry: './src/scripts.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
  },
  module: {
     rules: [
       {
         test: /\.js?$/,
         loader: 'babel-loader'
       }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
