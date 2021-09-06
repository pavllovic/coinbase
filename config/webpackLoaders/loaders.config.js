const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      configFile: path.resolve(__dirname, '../babel.config.js')
    }
  }
}

const cssLoader = {
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
        hmr: isDev,
        // if hmr does not work, this is a forceful method.
        // reloadAll: true,
      }
    },
    {
      loader: 'cache-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: false,
        importLoaders: 1,
        sourceMap: isDev? true : false
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.resolve(__dirname, '../postcss.config.js')
        },
        sourceMap: isDev? true : false
      }
    },
  ]
}

const pugLoader = {
  test: /\.pug$/,
  use: [
    {
      loader: 'cache-loader'
    },
    {
      loader: 'pug-loader',
      options: {
        pretty: isDev? true : false
      }
    }
  ]
}

const imageLoader = {
  test: /\.(jpg|jpeg|png|svg|webp|ico)$/,
  use: {
    loader: 'file-loader',
    options: {
      outputPath: 'images'
    },
  }
}

const fontLoader = {
  test:/\.(woff|woff2)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts'
    }
  }
}

const markdownLoader = {
  test:/\.(md)$/,
  use: [
    {
      loader: 'html-loader'
    },
    {
      loader: 'markdown-loader'
    }
  ]
}

module.exports = {
  jsLoader: jsLoader,
  cssLoader: cssLoader,
  pugLoader: pugLoader,
  imageLoader: imageLoader,
  fontLoader: fontLoader,
  markdownLoader: markdownLoader
};
