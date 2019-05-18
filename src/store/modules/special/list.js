import Vue from 'vue'
import { set, toggle } from '@/utils/vuex'

const state = () => ({
  items: [
    {
      id: 0,
      description: 'Only now in our Restaurant. Order one pizza and get the second one for free !',
      discount: 10,
      isActive: true,
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
    },
    {
      id: 1,
      description: 'Only now in our Restaurant. Order one pizza and get the second one for free !',
      discount: 10,
      isActive: true,
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
    },
    {
      id: 2,
      description: 'Only now in our Restaurant. Order one pizza and get the second one for free !',
      discount: 10,
      isActive: true,
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
    },
    {
      id: 3,
      description: 'Only now in our Restaurant. Order one pizza and get the second one for free !',
      discount: 10,
      isActive: true,
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
  ],
})

export default {
  state,
  mutations: {
    ADD_ITEM: (state, payload) => state.list.items.push(payload),
    TOGGLE_ACTIVE_LIST_ITEM: (state, id) => {
      let item = state.list.items.find(el => el.id === id)
      if (item) {
        item.isActive = !item.isActive
      }
    },
    DELETE_LIST_ITEM: (state, id) => {
      let index = state.list.items.findIndex(el => el.id === id)
      if (index !== -1) {
        state.list.items.splice(index, 1)
      }
    },
    UPDATE_ITEM: (state, payload) => {
      let items = state.list.items
      let index = items.findIndex(el => el.id === payload.id)
      if (index !== -1) {
        Vue.set(items, index, payload)
      }
    }
  },
  getters: {},
  actions: {
    addItem({commit}, payload) {
      commit('ADD_ITEM', payload)
    },
    updateItem({commit}, payload) {
      commit('UPDATE_ITEM', payload)
    }
  }
}


