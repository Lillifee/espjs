const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
        },
      },
    ],
  },
  performance: {
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
  },
  devServer: {
    // Proxy to forwared the request to the real device
    proxy: {
      '/api': {
        target: {
          host: '192.168.3.75',
          protocol: 'http:',
        },
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // favicon: './public/favicon.ico'
    }),
  ],
};
