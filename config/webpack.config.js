const path = require('path');
const plugins = require('./webpackPlugins/plugins.config');
const loaders = require('./webpackLoaders/loaders.config');
const commonConfig = require('./webpackCommon/common.config');
const devServer = require('./webpackDevServer/devServer.config');
const optimization = require('./webpackOptimization/optimization.config');

const isDev = process.env.NODE_ENV === 'development';
const es6 = process.env.es6 === 'true';

const entry = {  
  contact: ['./src/contact.js'],
  article: ['./src/css/article.css'],
  about: ['./src/css/about.css'],
  index: ['./src/index.js'],
  blog: ['./src/css/blog.css'],
  common: ['./src/common.js'],
  comment: ['./src/formComment.js'],
  subscribe: ['./src/formSubscribe.js'],
}

const devOutput = {
  path: path.resolve(__dirname, '../build'),
  chunkFilename: 'js/legacy/[name].js',
  filename: 'js/legacy/[name].js'
}

const prodOutput = {
  path: path.resolve(__dirname, '../dist'),
  chunkFilename: 'js/legacy/[contenthash].[name].js',
  filename: 'js/legacy/[contenthash].[name].js',
}

const makeConfig = () => {
  const config = {
    entry: entry,
    output: isDev? devOutput : prodOutput,
    module: {
      rules: [
        loaders.jsLoader,
        loaders.cssLoader,
        loaders.pugLoader,
        loaders.imageLoader,
        loaders.fontLoader,
        loaders.markdownLoader
      ]
    },
    plugins: (() => {
      let arr = [
        plugins.cleanWebpackPlugin,
        plugins.miniCssExtractPlugin,
        ...plugins.htmlWebpackPlagin,
        plugins.stylelintPlugin,
        plugins.eslintPlugin,
      ]

      if(es6) {
        arr = arr.concat([
          plugins.babelEsmPlugin,
          plugins.scriptExtHtmlWebpackPlugin,
          plugins.ignoreEmitPlugin,
          plugins.htmlWebpackSkipAssetsPlugin,
        ]);
      }

      if(!isDev) {
        arr = arr.concat([
          plugins.compressionPlugin
        ])
      }

      return arr;
    })(),
    optimization: optimization,
    devServer: devServer,
    ...commonConfig
  }

  return config
}

module.exports = makeConfig();