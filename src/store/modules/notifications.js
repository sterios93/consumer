import {set, toggle} from '@/utils/vuex'

export default {
	namespaced: true,
	state: {
		items: [
			{
				id: '1',
				title: 'Lorem',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '1',
				title: 'Lorem1',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: true,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '2',
				title: 'Lorem2',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '3',
				title: 'Lorem3',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '4',
				title: 'Lorem',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '5',
				title: 'Lorem1',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: true,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '6',
				title: 'Lorem2',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '7',
				title: 'Lorem3',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '8',
				title: 'Lorem',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '9',
				title: 'Lorem1',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: true,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '10',
				title: 'Lorem2',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '11',
				title: 'Lorem3',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '12',
				title: 'Lorem',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '13',
				title: 'Lorem1',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: true,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '14',
				title: 'Lorem2',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '15',
				title: 'Lorem3',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '16',
				title: 'Lorem',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: false,
				type: '',
				createdAt: '2019-09-10 12:00'
			},
			{
				id: '17',
				title: 'Lorem1',
				message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t',
				image: './img/category.png',
				seen: true,
				type: '',
				createdAt: '2019-09-10 12:00'
			}
		]
	},
	mutations: {
		SET_ITEMS: (state, payload) => {
			state.items = payload
		},
		SET_FULLSCREEN: (state, {key, value}) => {
			state.menu[key].fullscreen = value
		},
		SET_MODAL_DATA: (state, {key, value}) => {
			for (let prop of Object.keys(value))
				if (state[key][prop] !== undefined)
					state[key][prop] = value[prop]
		},
		SET_MODAL_VISIBILITY: (state, {key, value}) => {
			state[key].visibility = value
		},
		SET_MENU_MODAL_VISIBILITY: (state, {key, value, action = 'add'}) => {
			state.menu[key].visibility = value
			state.menu[key].action = action
		}
	},
	getters: {},
	actions: {
		setItems({commit}, payload) {
			commit('SET_ITEMS', payload.items)
		},


		setModalData({commit}, payload) {
			commit('SET_MODAL_DATA', payload)
		},
		setFullscreen({commit}, payload) {
			commit('SET_FULLSCREEN', payload)
		},
		setModalVisibility({commit}, payload) {
			commit('SET_MODAL_VISIBILITY', payload)
		},
		setMenuModalVisibility({commit}, payload) {
			commit('SET_MENU_MODAL_VISIBILITY', payload)
		}
	}
}
