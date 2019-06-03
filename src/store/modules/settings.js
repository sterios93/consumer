import { set, toggle } from '@/utils/vuex'
let config = {
  prodUrl: 'http://212.227.193.201/api/v1/',
  devUrl: 'http://212.227.193.201/api/v1/',
  basePath: './',
  signUpPath: 'user/consumer/create',
  loginPath: 'user/consumer/login',
  fetchProfilePath: 'user/consumer/fetch',
}

export default {
  namespaced: true,
  state: {
    apiUrl: config.devUrl,
    url: config.devUrl,
    basePath: config.basePath,
    signUpPath: config.signUpPath,
    loginPath: config.loginPath,
    fetchProfilePath: config.fetchProfilePath,
  },
  mutations: {},
  getters: {},
  actions: {}
}
