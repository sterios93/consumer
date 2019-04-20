module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/consumer/'
    : '/',
  devServer: {
    disableHostCheck: true
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = process.env.NODE_ENV === 'production'
          ? 'public/indexProd.html'
          : 'public/indexDev.html'
        return args
      })
  }
}
