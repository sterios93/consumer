import { set, toggle } from '@/utils/vuex'
let config = {
  prodUrl: '...',
  devUrl: '...',
  basePath: './'
}

export default {
  namespaced: true,
  state: {
    apiUrl: config.prodUrl + 'api/v1/',
    url: config.prodUrl,
    basePath: config.basePath
  },
  mutations: {},
  getters: {},
  actions: {}
}
