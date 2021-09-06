const optimization = {
  concatenateModules: true,
  usedExports: true,
  providedExports: true,
  removeEmptyChunks: true,
  runtimeChunk: {
    name: 'runtime'
  },
  splitChunks: {
    cacheGroups: {
      common_css: {
        name: 'common.style',
        test: /\.css$/,
        minChunks: 5,
        chunks: 'all',
        enforce: true,
      },
      // common_js: {
      //   name: (module, chunks) => {
      //     const arrChunkName = []
      //     for(const chunk of chunks) {
      //       arrChunkName.push(chunk.name)
      //     }
      //     return arrChunkName.join('~')
      //   },
      //   test: /src[\\/].*\.js$/,
      //   minSize: 1,
      //   minChunks: 2,
      //   chunks: 'all',
      //   enforce: true
      // },
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        enforce: true,
      },
    },
  },
}

module.exports = optimization;