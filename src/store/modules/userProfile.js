import { set, toggle } from '@/utils/vuex'
import { getData, postData } from "../../utils/helpers";

const state = () => ({
  namespaced: true,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  inEditMode: false,
  isProfileValid: true,
})

export default {
  state,
  mutations: {
    SET_EDIT_MODE: (state, value) => { state.inEditMode = value },
    SET_FIRST_NAME: (state, firstName) => state.firstName = firstName,
    SET_LAST_NAME: (state, lastName) => state.lastName = lastName,
    SET_EMAIL: (state, email) => state.email = email,
    SET_PHONE_NUMBER: (state, phoneNumber) => state.phoneNumber = phoneNumber,
    SET_PASSWORD: (state, password) => state.password = password,
    SET_PROFILE_VALID: (state, value) => state.isProfileValid = value,
  },
  actions: {
    setEditMode({ commit }, value) { commit('SET_EDIT_MODE', value) },
    setFirstName: ({ commit }, firstName) => { commit('SET_FIRST_NAME', firstName) },
    setLastName: ({ commit }, lastName) => { commit('SET_LAST_NAME', lastName) },
    setEmail: ({ commit }, email) => { commit('SET_EMAIL', email) },
    setPhoneNumber: ({ commit }, phoneNumber) => { commit('SET_PHONE_NUMBER', phoneNumber) },
    setPassword: ({ commit }, phoneNumber) => { commit('SET_PASSWORD', phoneNumber) },
    setProfileValid: ({ commit }, value) => { commit('SET_PROFILE_VALID', value) },
    updateProfile: ({ commit, rootState, dispatch }, payload) => {
      let data = {
        payload,
        url: rootState.settings.apiUrl + rootState.settings.updateProfiePath,
      }

      return postData(data)
        .then(data => {
          if (data.success) {
            dispatch('snackbar/setState', {
              snackbar: true,
              message: 'Profile updated.',
              color: 'green'
            }, { root: true })
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
  },
  getters: {}
}
