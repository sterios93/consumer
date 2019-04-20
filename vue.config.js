module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/lunch-deal-consumer/'
    : '/',
  devServer: {
    disableHostCheck: true
  }
}
