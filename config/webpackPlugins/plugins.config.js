const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const HtmlWebpackPlagin = require('html-webpack-plugin');
const HtmlWebpackSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BabelEsmPlugin = require('babel-esm-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const listArticles = require('../../src/articles/listArticles.json').filter(article => {
  return article.status === 'public'
});

const isDev = process.env.NODE_ENV === 'development';

const compressionPlugin = new CompressionPlugin({
  test: [/\.js$/i, /\.css$/i]
});

const scriptExtHtmlWebpackPlugin = new ScriptExtHtmlWebpackPlugin({
  defer: [/legacy[\\/].*\.js$/],
  custom: [
    {
      test: /legacy[\\/].*\.js$/,
      attribute: 'nomodule'
    },
    {
      test: /modern[\\/].*\.js$/,
      attribute: 'type',
      value: 'module'
    },
  ]
})

const babelEsmPlugin = new BabelEsmPlugin({
  filename: isDev? 'js/modern/es6.[name].js' : 'js/modern/[contenthash].es6.[name].js',
  chunkFilename: isDev? 'js/modern/es6.[name].js' :'js/modern/[contenthash].es6.[name].js',
});

const ignoreEmitPlugin = new IgnoreEmitPlugin([
  /style\.js$/, /(about|article|blog)\.js$/
]);

const htmlWebpackSkipAssetsPlugin = new HtmlWebpackSkipAssetsPlugin({
  excludeAssets: [/style\.js$/, /(about|article|blog)\.js$/]
});

const htmlWebpackPlagin = [
  new HtmlWebpackPlagin({
    title: 'CoinBase',
    filename: 'index.html',
    template: './src/template/index.pug',
    inject: 'body',
    chunks: ['common', 'index', 'subscribe'],
    minify: {
      collapseWhitespace: !isDev,
      collapseInlineTagWhitespace: !isDev,
      minifyCSS: !isDev,
      minifyJS: !isDev
    },
  }),
  new HtmlWebpackPlagin({
    title: 'CoinBase | blog',
    filename: 'blog.html',
    template: './src/template/blog.pug',
    inject: 'body',
    chunks: ['common', 'blog'],
    minify: {
      collapseWhitespace: !isDev,
      collapseInlineTagWhitespace: !isDev,
      minifyCSS: !isDev,
      minifyJS: !isDev
    },
  }),
  new HtmlWebpackPlagin({
    title: 'CoinBase | contact us',
    filename: 'contact.html',
    template: './src/template/contact.pug',
    inject: 'body',
    chunks: ['common', 'contact', 'comment'],
    minify: {
      collapseWhitespace: !isDev,
      collapseInlineTagWhitespace: !isDev,
      minifyCSS: !isDev,
      minifyJS: !isDev
    },
  }),
  ...listArticles.map((article, i, list) => {
    return new HtmlWebpackPlagin({
      title: `CoinBase | ${article.title}`,
      filename: `article-${article.number}.html`,
      template: './src/template/article.pug',
      templateParameters: {
        'num': article.number,
        'prev': list[i - 1],
        'next': list[i + 1]
      },
      inject: 'body',
      chunks: ['common', 'article', 'comment'],
      minify: {
        collapseWhitespace: !isDev,
        collapseInlineTagWhitespace: !isDev,
        minifyCSS: !isDev,
        minifyJS: !isDev
      },
    })
  }),
  new HtmlWebpackPlagin({
    title: 'CoinBase | about us',
    filename: 'about.html',
    template: './src/template/about.pug',
    inject: 'body',
    chunks: ['common', 'about', 'subscribe'],
    minify: {
      collapseWhitespace: !isDev,
      collapseInlineTagWhitespace: !isDev,
      minifyCSS: !isDev,
      minifyJS: !isDev
    },
  })
]

const cleanWebpackPlugin = new CleanWebpackPlugin();

const stylelintPlugin = new StylelintPlugin({
  configFile: path.resolve(__dirname, '../stylelint.config.js'),
  files: 'src/**/*.css',
  fix: true
})

const eslintPlugin = new ESLintPlugin({
  files: 'src/**/*.js',
  overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js'),
  lintDirtyModulesOnly: true
})

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: isDev? 'css/[name].css' : 'css/[contenthash].[name].css',
  chunkFilename: isDev? 'css/[id].css' : 'css/[contenthash].[id].css'
})

module.exports = {
  ignoreEmitPlugin: ignoreEmitPlugin,
  miniCssExtractPlugin: miniCssExtractPlugin,
  htmlWebpackPlagin: htmlWebpackPlagin,
  htmlWebpackSkipAssetsPlugin: htmlWebpackSkipAssetsPlugin,
  stylelintPlugin: stylelintPlugin,
  eslintPlugin: eslintPlugin,
  cleanWebpackPlugin: cleanWebpackPlugin,
  compressionPlugin: compressionPlugin,
  babelEsmPlugin: babelEsmPlugin,
  scriptExtHtmlWebpackPlugin: scriptExtHtmlWebpackPlugin,
};
