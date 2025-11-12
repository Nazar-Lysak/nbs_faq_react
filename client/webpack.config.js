const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'react_faq.js',
      clean: true,
    },
    devServer: {
      port: 3010,
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      watchFiles: ['src/**/*'],
      devMiddleware: {
        writeToDisk: true,
      },
      hot: true,
      compress: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    optimization: {
      usedExports: true,
      minimize: isProduction,
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    plugins: [
      new MiniCssExtractPlugin(),
    ],
  };
};
