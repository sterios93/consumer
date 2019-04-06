import { set, toggle } from '@/utils/vuex'

export default {
	namespaced: true,
	state: {
		category: {
			color: 'teal darken-1',
			visibility: false,
		},
		confirm: {
			color: 'teal darken-1',
			action: 'delete this item',
			callback: null,
			fullscreen: false,
			visibility: false,
		},
		menu: {
			main: {
				color: 'blue-grey lighten-2',
				action: 'add',
				fullscreen: false,
				visibility: false,
			},
			special: {
				color: 'blue-grey lighten-1',
				action: 'add',
				fullscreen: false,
				visibility: false,
			},
			lunch	: {
				color: 'teal darken-1',
				action: 'add',
				fullscreen: false,
				visibility: false,
			},
		}
	},
	mutations: {
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
