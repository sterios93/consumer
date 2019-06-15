import { set, toggle } from '@/utils/vuex'
import Vue from 'vue'
import {postData, getData} from '../../utils/helpers'

export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    SET_SUBSCRIPTIONS: set('subscriptions'),
    ADD_SUBSCRIPTION: (state, payload) => {
      state.items.push(payload)
    },
    UPDATE_ITEM: (state, payload) => {
      let index = state.items.findIndex(el => el.id === payload.id)
      if (index) {
        Vue.set(state.items, index, payload)
      }
    }
  },
  getters: {
  },
  actions: {
    fetchSubscriptions({commit, rootState}, payload) {
      const {apiUrl, fetchSubscriptionsPath} = rootState.settings
      const url = apiUrl + fetchSubscriptionsPath

      return getData(url)
        .then((data) => data.json())
        .then((data) => {
          if (data.success) {
            commit('SET_SUBSCRIPTIONS', data.result)
          }
          return data
        })
    },
    cancelSubscription({commit, rootState}, payload) {
      const {apiUrl, cancelSubscriptionPath} = rootState.settings
      const url = apiUrl + cancelSubscriptionPath

      return postData({ url, payload })
        .then((data) => data.json())
        .then((data) => {
          if (data.success) {
            commit('UPDATE_ITEM', data.result)
          }
          return data
        })
    },
    activateSubscription({commit, rootState}, payload) {
      const {apiUrl, activateSubscriptionPath} = rootState.settings
      const url = apiUrl + activateSubscriptionPath

      return postData({ url, payload })
        .then((data) => data.json())
        .then((data) => {
          if (data.success) {
            commit('UPDATE_ITEM', payload)   
          }
          return data
        })
    },
    createSubscription({commit, rootState}, payload) {
      const {apiUrl, subscribePath} = rootState.settings
      const url = apiUrl + subscribePath

      return postData({ url, payload })
        .then((data) => data.json())
        .then((data) => {
          if (data.success) {
            commit('ADD_SUBSCRIPTION', payload)   
          }
          return data
        })
    },
    setSubscriptions({commit}, payload) {
      commit('SET_SUBSCRIPTIONS', payload)
    },
    updateItem({commit}, payload) {
      commit('UPDATE_ITEM', payload)
    }
  }
}
