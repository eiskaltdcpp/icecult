var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProd = process.env.npm_lifecycle_event === 'build';

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src', 'app'), 'node_modules'],
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          { loader: 'css-loader?sourceMap' },
          { loader: 'sass-loader?sourceMap' },
        ]
      })},
    ],
    // preLoaders: [
    //   { test: /\.js$/, loader: 'source-map-loader', exclude: [
    //     // these packages have problems with their sourcemaps
    //     path.join(__dirname, 'node_modules', 'rxjs'),
    //     path.join(__dirname, 'node_modules', '@angular2-material'),
    //     path.join(__dirname, 'node_modules', '@angular', 'compiler'),
    //   ]
    // }],
    noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isProd ? '"prod"' : '"dev"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'],
      minChunks: Infinity
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProd,
      debug: !isProd
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),
    new HtmlWebpackPlugin({
      template: './src/public/index.html'
    })
  ].concat(!isProd ? [] : [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([{from: './src/public'}])
  ]),
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    host: '0.0.0.0',
    stats: 'minimal'
  }
};
