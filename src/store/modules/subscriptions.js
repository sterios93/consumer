import { set, toggle } from '@/utils/vuex'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    items: [
      {
        id: 0,
        restaurant: {
          image: './img/special.png',
          name: 'Lorem1'
        },
        following: false,
        isActive: false
      },
      {
        id: 1,
        restaurant: {
          image: './img/special.png',
          name: 'Lorem2'
        },
        following: false,
        isActive: true
      },
      {
        id: 2,
        restaurant: {
          image: './img/special.png',
          name: 'Lorem3'
        },
        following: true,
        isActive: true
      },
    ],
  },
  mutations: {
    SET_SUBSCRIPTIONS: set('subscriptions'),
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
    setSubscriptions({commit}, payload) {
      commit('SET_SUBSCRIPTIONS', payload)
    },
    updateItem({commit}, payload) {
      commit('UPDATE_ITEM', payload)
    }
  }
}
