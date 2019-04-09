import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,
  state: {
    icons: true,
    drawer: false,
    toolbar: true,
    color: 'success',
    image: './img/drawer.jpg',
    user: null,
  },
  mutations: {
    SET_DRAWER: set('drawer'),
    SET_IMAGE: set('image'),
    SET_COLOR: set('color'),
    TOGGLE_DRAWER: toggle('drawer'),
    TOGGLE_TOOLBAR: toggle('toolbar'),
  },
  getters: {},
  actions: {
    setDrawer({commit}, drawer) {
      commit('SET_DRAWER', drawer)
    },
    setImage({commit}, image) {
      commit('SET_IMAGE', image)
    },
    setColor({commit}, color) {
      commit('SET_COLOR', color)
    },
    toggleDrawer({commit}, drawer) {
      commit('TOGGLE_DRAWER', drawer)
    },
    toggleToolbar({commit}, toolbar) {
      commit('TOGGLE_TOOLBAR', toolbar)
    }
  }
}
