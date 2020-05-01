const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
  const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [],
    optimization: {
      minimize: false,
    },
  };
  if (argv.mode === 'production') {
    config.optimization.minimize = true;
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }));
  }
  return config;
};
