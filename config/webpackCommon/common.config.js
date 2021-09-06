const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

const commonConfig = {
  mode: isDev? 'development' : 'production',
  devtool: isDev? 'source-map' : '',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../../src/components/'),
      Images: path.resolve(__dirname, '../../src/images/'),
      Fonts: path.resolve(__dirname, '../../src/fonts/'),
      Lib: path.resolve(__dirname, '../../src/lib/'),
      Articles: path.resolve(__dirname, '../../src/articles')
    }
  }
}

module.exports = commonConfig;