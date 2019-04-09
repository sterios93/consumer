import Vue from 'vue'
import { set, toggle } from '@/utils/vuex'
import {postData} from "../../../utils/helpers";

const state = () => ({
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
    {
      id: 3,
      name: 'Lorem3',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40.10,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 2,
        name: 'British'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 4,
      name: 'Lorem4',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40.10,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 3,
        name: 'Breakfast'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 5,
      name: 'Lorem',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40.10,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 4,
        name: 'Bagels'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
  ],
})

export default {
  state,
  getters: {
    getMenuByCategory: (state) => (id) => state.list.items.filter(el => id === el.category.id),
  },
  mutations: {
    ADD_ITEM: (state, payload) => state.list.items.push(payload),
    UPDATE_ITEM: (state, payload) => {
      let items = state.list.items
      let index = items.findIndex(el => el.id === payload.id)
      if (index !== -1) {
        Vue.set(items, index, payload)
      }
    },
    DELETE_LIST_ITEM: (state, id) => {
      let index = state.list.items.findIndex(el => el.id === id)
      if (index !== -1) {
        state.list.items.splice(index, 1)
      }
    },
  },
  actions: {
    addItem({commit}, payload) {
      commit('ADD_ITEM', payload)
    },
    updateItem({commit}, payload) {
      commit('UPDATE_ITEM', payload)
    },
  }
}


