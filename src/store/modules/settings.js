import { set, toggle } from '@/utils/vuex'
let config = {
  prodUrl: 'http://212.227.193.201/api/v1/',
  devUrl: 'http://212.227.193.201/api/v1/',
  basePath: './',
  signUpPath: 'consumer/create',
  loginPath: 'consumer/login',
  logoutPath: 'consumer/logout',
  fetchProfilePath: 'consumer/profile/fetch',
  findRestaurantsPath: 'restaurants/find',
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
    logoutPath: config.logoutPath,
    findRestaurantsPath: config.findRestaurantsPath,
  },
  mutations: {},
  getters: {},
  actions: {}
}
