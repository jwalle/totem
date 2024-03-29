const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/js');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel',
		query: {
			presets: ['es2015', 'react']
		}
      }
    ]
  }
};
