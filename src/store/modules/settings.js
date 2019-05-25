import { set, toggle } from '@/utils/vuex'
let config = {
  prodUrl: 'http://212.227.193.201/api/v1/',
  devUrl: 'http://212.227.193.201/api/v1/',
  basePath: './'
}

export default {
  namespaced: true,
  state: {
    apiUrl: config.devUrl,
    url: config.devUrl,
    basePath: config.basePath
  },
  mutations: {},
  getters: {},
  actions: {}
}
