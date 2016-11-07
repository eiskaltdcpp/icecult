// Hack for Ubuntu on Windows: interface enumeration fails with EINVAL, so return empty.
try {
  require('os').networkInterfaces()
} catch (e) {
  require('os').networkInterfaces = () => ({})
}

var path = require('path');
var webpack = require('webpack');
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
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src', 'app'), 'node_modules'],
    extensions: ['.ts', '.js', '.json', '.css', '.html'],
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: ['awesome-typescript', 'angular2-template'] },
      { test: /\.html$/, loader: 'html' },
      { test: /\.scss$/, loader: ['style', 'css?sourceMap', 'sass?sourceMap']},
      { test: /\.css$/, loader: ['style', 'css'], exclude: path.resolve('./src/app')},
      { test: /\.css$/, loader: 'raw', include: path.resolve('./src/app') },
      { test: /\.woff2?$|\.ttf$|\.eot$/, loader: 'file' }
    ],
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
    new webpack.optimize.UglifyJsPlugin(),
    // new CopyWebpackPlugin([{from: './src/public'}]) // TODO: figure out what's needed for prod builds later
  ]),
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    host: '0.0.0.0',
    stats: { colors: true },
    //historyApiFallback: true,
    proxy: {
      '/rpc': 'http://192.168.1.201:81',
    }
  }
};
