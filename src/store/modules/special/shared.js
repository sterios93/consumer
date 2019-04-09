import { set, toggle } from '@/utils/vuex'
import {formatDate, getData, postData} from "../../../utils/helpers";

const state = () => ({

})

export default {
  state,
  mutations: {
    SET_ITEM: (state, {payload, action}) => state[action] = payload,
    SET_NAME: (state, {payload, action}) => state[action].name = payload,
    SET_ITEMS: (state, {payload, action}) => state[action].items = payload,
    SET_PRICE: (state, {payload, action}) => state[action].price = payload,
    SET_PICTURE: (state, {payload, action}) => state[action].picture = payload,
    SET_DISCOUNT: (state, {payload, action}) => state[action].discount = payload,
    SET_SCHEDULE: (state, {payload, action}) => state[action].schedule = payload,
    SET_END_DATE: (state, {payload, action}) => state[action].endDate = payload,
    TOGGLE_ACTIVE: (state, {payload, action}) => state[action].isActive = !state[action].isActive,
    SET_START_DATE: (state, {payload, action}) => state[action].startDate = payload,
    SET_PICTURE_URL: (state, {payload, action}) => state[action].image = payload,
    SET_DESCRIPTION: (state, {payload, action}) => state[action].description = payload,
  },
  getters: {
    sumItemsPrice: (state) => (action) => state[action].items.reduce((sum, el) => sum + el.price, 0),
    getPrice: (state) => (action) => {
      const original = state[action].price
      const discount = original * (state[action].discount / 100)
      return original - discount
    }
  },
  actions: {
    reset: ({commit}, action) => commit(`RESET_${action.toUpperCase()}`),
    setItem: ({commit}, {payload, action}) => commit('SET_ITEM', {payload, action}),
    setName: ({commit}, {payload, action}) => commit('SET_NAME', {payload, action}),
    setPrice: ({commit}, {payload, action}) => commit('SET_PRICE', {payload, action}),
    setEndDate: ({commit}, {payload, action}) => commit('SET_END_DATE', {payload, action}),
    setPicture: ({commit}, {payload, action}) => commit('SET_PICTURE', {payload, action}),
    setDiscount: ({commit}, {payload, action}) => commit('SET_DISCOUNT', {payload, action}),
    setSchedule: ({commit}, {payload, action}) => commit('SET_SCHEDULE', {payload, action}),
    setStartDate: ({commit}, {payload, action}) => commit('SET_START_DATE', {payload, action}),
    setPictureUrl: ({commit}, {payload, action}) => commit('SET_PICTURE_URL', {payload, action}),
    setDescription: ({commit}, {payload, action}) => commit('SET_DESCRIPTION', {payload, action}),
    setItems: ({commit, getters}, {payload, action}) => {
      commit('SET_ITEMS', {payload, action})
      const sum = getters['sumItemsPrice'](action)
      commit('SET_PRICE', {payload: sum, action})
    },
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
    fetchItem({dispatch, commit}, {payload, action}) {
      let mockData = {
        id: 0,
        description: 'Only now in our Restaurant. Order one pizza and get the second one for free !',
        discount: 10,
        isActive: false,
        items: [
          {
            id: 11,
            name: 'Lorem',
            image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            price: 40.10,
            isLunchOnly: false,
            weight: 50,
            category: {
              id: 0,
              name: 'Cuban'
            },
            description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
          },
          {
            id: 0,
            name: 'Lorem1',
            image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            price: 40.10,
            isLunchOnly: false,
            weight: 50,
            category: {
              id: 0,
              name: 'Cuban'
            },
            description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
          },
          {
            id: 1,
            name: 'Lorem2',
            image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            price: 40.10,
            isLunchOnly: false,
            weight: 50,
            category: {
              id: 0,
              name: 'Cuban'
            },
            description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
          },
          {
            id: 2,
            name: 'Lorem2',
            image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            price: 40.10,
            isLunchOnly: false,
            weight: 50,
            category: {
              id: 1,
              name: 'Burger'
            },
            description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
          },
        ],
        name: 'Grande Pica Peperoni with Cheese',
        picture: null,
        image: './img/special-offer-default.jpeg',
        price: 160,
        schedule: null,
        startDate: '2019-09-10 12:00',
        endDate: '2019-10-10 12:00',
      }
      
      dispatch('setItem', {payload: mockData, action})
  
      return Promise.resolve(mockData)
  
      // TODO :: remove upper code and use this when backend is ready
      // let url = ''
      // let query = payload
      // let token = ''
      // return getData(url, query, token)
      //   .then((data) => {
      //     dispatch('setItem', {payload: data, action})
      //   })
    },
    deleteItem: ({commit}, {payload}) => {
      return new Promise(resolve => {
      
        let data = {
          success: true,
          message: 'Internal Error'
        }
      
        // postData().then((data) => {
        setTimeout(() => {
          if (data.success) {
            commit('DELETE_LIST_ITEM', payload)
          }
          resolve(data)
        }, 2000)
      })
    },
    async toggleActive({commit}, {payload, action}) {
      let isAsync = (action === 'edit') || (action === 'list')
    
      if (isAsync) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })
      }
    
      switch (action) {
        case 'add':
        case 'edit':
          commit('TOGGLE_ACTIVE', {payload, action})
          break
        case 'list':
          commit('TOGGLE_ACTIVE_LIST_ITEM', payload)
          break
      }
    
      return {
        success: true,
        message: 'Toggled successfully',
        data: {}
      }
    },
  }
}


