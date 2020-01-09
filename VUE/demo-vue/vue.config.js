module.exports = {
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    proxy: {
      '/devApi': {
        target: 'http://www.web-jshtml.cn/productapi',
        changeOrigin: true,
        pathRewrite: {
          '^/devApi': ''
        }
      }
      // '/devApi': {
      //   target: 'http://www.web-jshtml.cn/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/devApi': 'productapi'
      //   }
      // }
    }
  }
}
