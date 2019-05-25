import { set, toggle } from '@/utils/vuex'
import { postData} from "../../utils/helpers";

export default {
  namespaced: true,
  state: {
    color: 'success',
  },
  mutations: {
  },
  getters: {},
  actions: {
    fetchUserData({rootState, state, commit}) {
      return fetch(rootState.settings.apiUrl + state.route).then(r => {
      })
    },
    logout({commit}) {
      commit('SET_IS_USER_LOGGED', false)
    },
    login({dispatch, rootState, state, commit}, payload) {
      let data = {
        payload,
        url: rootState.settings.apiUrl + 'user/consumer/login',
      }

      return postData(data)
        .then(response => response.json())
        .catch(error => {
          dispatch('snackbar/setState', {
            snackbar: true,
            message: error && error.message,
            color: 'red'
          }, { root: true })
        })
    }
  }
}
