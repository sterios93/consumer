import { set, toggle } from '@/utils/vuex'

const state = () => ({
  namespaced: true,
  firstName: "Dobrin",
  lastName: "Dimchev",
  email: "dobkata.boost@abv.bg",
  phoneNumber: "091239129030",
  password: "guru",
  inEditMode: false,
  isProfileValid: true,
  address: '',
  city: '',
  country: '',
  postalCode: '',
  location: {},
})

export default {
  state,
  mutations: {
    SET_EDIT_MODE: (state, value) => { state.inEditMode = value},
    SET_FIRST_NAME: (state, firstName) => state.firstName = firstName,
    SET_LAST_NAME: (state, lastName) => state.lastName = lastName,
    SET_EMAIL: (state, email) => state.email = email,
    SET_PHONE_NUMBER: (state, phoneNumber) => state.phoneNumber = phoneNumber,
    SET_PASSWORD: (state, password) => state.password = password,
    SET_PROFILE_VALID: (state, value) => state.isProfileValid = value,
    SET_ADDRESS: (state, value) => state.address = value,
    SET_CITY: (state, value) => state.city = value,
  },
  actions: {
    setEditMode({commit}, value) {commit('SET_EDIT_MODE', value)},
    setFirstName: ({commit}, firstName) => {commit('SET_FIRST_NAME', firstName)},
    setLastName: ({commit}, lastName) => {commit('SET_LAST_NAME', lastName)},
    setEmail: ({commit}, email) => {commit('SET_EMAIL', email)},
    setPhoneNumber: ({commit}, phoneNumber) => {commit('SET_PHONE_NUMBER', phoneNumber)},
    setPassword: ({commit}, phoneNumber) => {commit('SET_PASSWORD', phoneNumber)},
    setProfileValid: ({commit}, value) => {commit('SET_PROFILE_VALID', value)},
    setAddress: ({commit}, value) => {commit('SET_ADDRESS', value)},
    setCity: ({commit}, value) => {commit('SET_CITY', value)},
  },
  getters: {},
}


