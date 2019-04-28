import { set, toggle } from '@/utils/vuex'
import { postData} from "../../utils/helpers";

export default {
  namespaced: true,
  state: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    isPersonalInfoValid: true,
    isRestaurantInfoValid: true,
    city: '',
    location: {},
  },
  mutations: {
    SET_FIRST_NAME: (state, firstName) => state.firstName = firstName,
    SET_LAST_NAME: (state, lastName) => state.lastName = lastName,
    SET_EMAIL: (state, email) => state.email = email,
    SET_PHONE_NUMBER: (state, phoneNumber) => state.phoneNumber = phoneNumber,
    SET_PASSWORD: (state, password) => state.password = password,
    SET_PERSONAL_INFO_VALID: (state) => state.isPersonalInfoValid = true,
    SET_PERSONAL_INFO_INVALID: (state) => state.isPersonalInfoValid = false,
    SET_CITY: (state, value) => state.city = value,
  },
  getters: {},
  actions: {
    setPersonalInfo({commit}, personalInfo) {
        const {firstName, lastName, email, phoneNumber, password} = personalInfo;
        commit('SET_FIRST_NAME', firstName);
        commit('SET_LAST_NAME', lastName);
        commit('SET_EMAIL', email);
        commit('SET_PHONE_NUMBER', phoneNumber);
        commit('SET_PASSWORD', password);
        commit('SET_PERSONAL_INFO_VALID');
    },
    setPersonalInfoInvalid({commit}) {commit('SET_PERSONAL_INFO_INVALID')},
    setPersonalInfoValid({commit}) { commit('SET_PERSONAL_INFO_VALID')},
    setCity: ({commit}, value) => {commit('SET_CITY', value)},
  }
}
