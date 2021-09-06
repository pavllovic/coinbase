const path = require('path');

const devServer = {
  contentBase: path.resolve(__dirname, '../../build'),
  // writeToDisk: (filePath) => {
  //   return /\.html$/.test(filePath);
  // },
  overlay: {
    // warnings: true,
    errors: true
  } 
}

module.exports = devServer;