import { set, toggle } from '@/utils/vuex'
import { postData} from "../../utils/helpers";

export default {
  namespaced: true,
  state: {
    color: 'success',
    isUserLogged: localStorage.getItem('isUserLogged') === true
  },
  mutations: {
    SET_IS_USER_LOGGED: (state, value) => {
      state.isUserLogged = value
      localStorage.setItem('token', value)
    },
  },
  getters: {},
  actions: {
    fetchUserData({rootState, state, commit}) {
      return fetch(rootState.settings.apiUrl + state.route).then(r => {
      })
    },
    setIsUserLogged({commit}, value) {
      commit('SET_IS_USER_LOGGED', value)
    },
    logout({commit}) {
      commit('SET_IS_USER_LOGGED', false)
      localStorage.removeItem('isUserLogged')
    },
    login({dispatch, rootState, state, commit}, payload) {
      let data = {
        payload,
        url: rootState.settings.apiUrl + 'user/consumer/login',
      }

      return postData(data)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            commit('SET_IS_USER_LOGGED', true)
          }
          return data
        })
        .catch(error => {
          dispatch('snackbar/setState', {
            snackbar: true,
            message: error && error.message,
            color: 'red'
          }, { root: true })
        })
    },
    signUp({dispatch, rootState, state, commit}, payload) {
      let data = {
        payload,
        url: rootState.settings.apiUrl + 'user/create',
      }

      return postData(data)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            commit('SET_IS_USER_LOGGED', true)
          }
          return data
        })
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
