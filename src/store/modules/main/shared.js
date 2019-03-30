import { set, toggle } from '@/utils/vuex'

const state = () => ({

})

export default {
  state,
  mutations: {
    SET_ITEM: (state, {payload, action}) => state[action] = payload,
    SET_NAME: (state, {payload, action}) => state[action].name = payload,
    SET_PRICE: (state, {payload, action}) => state[action].price = payload,
    SET_WEIGHT: (state, {payload, action}) => state[action].weight = payload,
    SET_PICTURE: (state, {payload, action}) => state[action].picture = payload,
    SET_CATEGORY: (state, {payload, action}) => state[action].category = payload,
    SET_PICTURE_URL: (state, {payload, action}) => state[action].image = payload,
    SET_DESCRIPTION: (state, {payload, action}) => state[action].description = payload,
  },
  getters: {
    sumItemsPrice: (state) => (ids, action) => {
      return state[action].items
        .filter(item => ids.indexOf(item.id) !== -1)
        .reduce((sum, {price}) => sum + price, 0)
    }
  },
  actions: {
    setItem: ({commit}, {payload, action}) => commit('SET_ITEM', {payload, action}),
    setName: ({commit}, {payload, action}) => {commit('SET_NAME', {payload, action})},
    setPrice: ({commit}, {payload, action}) => commit('SET_PRICE', {payload, action}),
    setWeight: ({commit}, {payload, action}) => commit('SET_WEIGHT', {payload, action}),
    setPicture: ({commit}, {payload, action}) => commit('SET_PICTURE', {payload, action}),
    setCategory: ({commit}, {payload, action}) => commit('SET_CATEGORY', {payload, action}),
    setPictureUrl: ({commit}, {payload, action}) => commit('SET_PICTURE_URL', {payload, action}),
    setDescription: ({commit}, {payload, action}) => commit('SET_DESCRIPTION', {payload, action}),
    saveItem({rootState, state, commit, dispatch}, {action}) {
      return new Promise(resolve => {
        let data = state[action]
        // TODO :: fake request
      
        setTimeout(() => {
          if (action === 'add') {
            dispatch('addItem', {
              ...data,
              // TODO :: fake id
              id: Math.random() * 1000
            })
            // dispatch('addItem', data)
          } else if (action === 'edit') {
            dispatch('updateItem', data)
          }
          resolve({
            success: true
          })
        }, 1000)
      })
    },
  }
}


