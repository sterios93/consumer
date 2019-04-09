import Vue from 'vue'
import { set, toggle } from '@/utils/vuex'

const state = () => ({
  items: [
    {
      id: 0,
      items: [
        {
          id: 21,
          name: 'Lor12331em',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 23,
          name: 'Lor123123123em1',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 24,
          name: 'Lore13123m2',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
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
      discount: 10,
      isActive: true,
      schedule: null,
      startDate: '2019-05-23 12:00',
      endDate: '2019-01-23 13:00'
    },
    {
      id: 1,
      items: [
        {
          id: 21,
          name: 'Lor12331em',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 23,
          name: 'Lor123123123em1',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 24,
          name: 'Lore13123m2',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
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
      discount: 10,
      isActive: true,
      schedule: null,
      startDate: '2019-03-23 12:30',
      endDate: '2019-03-23 13:30'
    },
    {
      id: 2,
      items: [
        {
          id: 21,
          name: 'Lor12331em',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 23,
          name: 'Lor123123123em1',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 24,
          name: 'Lore13123m2',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
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
      discount: 10,
      isActive: true,
      schedule: null,
      startDate: '2019-03-13 12:00',
      endDate: '2019-03-13 16:00'
    },
    {
      id: 3,
      items: [
        {
          id: 21,
          name: 'Lor12331em',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 23,
          name: 'Lor123123123em1',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 24,
          name: 'Lore13123m2',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
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
      discount: 10,
      isActive: true,
      schedule: null,
      startDate: '2019-05-23 12:00',
      endDate: '2019-01-23 13:00'
    },
    {
      id: 4,
      items: [
        {
          id: 21,
          name: 'Lor12331em',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 23,
          name: 'Lor123123123em1',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 24,
          name: 'Lore13123m2',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
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
      discount: 10,
      isActive: true,
      schedule: null,
      startDate: '2019-03-23 12:30',
      endDate: '2019-03-23 13:30'
    },
    {
      id: 5,
      items: [
        {
          id: 21,
          name: 'Lor12331em',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 23,
          name: 'Lor123123123em1',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 24,
          name: 'Lore13123m2',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
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
      discount: 10,
      isActive: true,
      schedule: null,
      startDate: '2019-03-13 12:00',
      endDate: '2019-03-13 16:00'
    },
    {
      id: 6,
      items: [
        {
          id: 21,
          name: 'Lor12331em',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 23,
          name: 'Lor123123123em1',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 24,
          name: 'Lore13123m2',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: 40.10,
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
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
      discount: 10,
      isActive: true,
      schedule: null,
      startDate: '2019-03-13 12:00',
      endDate: '2019-03-13 16:00'
    },
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


