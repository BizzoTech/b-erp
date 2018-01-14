const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const nodeExternals = require('webpack-node-externals');

const path = require('path');

const plugins = [];

if (!debug) {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
  plugins.push(new UglifyJsPlugin({ minimize: true }));
}

const indexConf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    library: 'core',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'index.js'
  },
  externals: function(context, request, callback) {
    // Absolute & Relative paths are not externals
    if (request.match(/^(\.{0,2})\//)) {
      return callback();
    }

    try {
      // Attempt to resolve the module via Node
      require.resolve(request);
      callback(null, request);
    } catch(e) {
      // Node couldn't find it, so it must be user-aliased
      callback();
    }
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

const regConf = {
  entry: './src/registerModule.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    library: 'core',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'registerModule.js'
  },
  externals: function(context, request, callback) {
    // Absolute & Relative paths are not externals
    if (request.match(/^(\.{0,2})\//)) {
      return callback();
    }

    try {
      // Attempt to resolve the module via Node
      require.resolve(request);
      callback(null, request);
    } catch(e) {
      // Node couldn't find it, so it must be user-aliased
      callback();
    }
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}


module.exports = [indexConf, regConf];