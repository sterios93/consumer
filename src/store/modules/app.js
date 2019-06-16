import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,
  state: {
    icons: true,
    isForced: true,
    toolbar: true,
    color: 'success',
    user: null,
  },
  mutations: {
    SET_IMAGE: set('image'),
    SET_COLOR: set('color'),
    TOGGLE_TOOLBAR: toggle('toolbar'),
  },
  getters: {},
  actions: {
    setImage({commit}, image) {
      commit('SET_IMAGE', image)
    },
    setColor({commit}, color) {
      commit('SET_COLOR', color)
    },
    toggleToolbar({commit}, toolbar) {
      commit('TOGGLE_TOOLBAR', toolbar)
    },
  }
}
