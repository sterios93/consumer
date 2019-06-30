import {set, toggle} from '@/utils/vuex'
import { postData, getData } from '@/utils/helpers'

export default {
	namespaced: true,
	state: {
		items: [],
		sheet: false
	},
	mutations: {
		SET_ITEMS: (state, payload) => {
			state.items = payload
		},
		REMOVE_NOTIFICATION: (state, payload) => {
			let index = state.items.find(item => item._id === payload)
			if (index !== -1) {
				state.items.splice(index, 1)
			}
		},
		SET_SEEN: (state, ids) => {
			let item
			ids.forEach(id => {
				item = state.items.find(i => i._id === id)
				if (item) {
					item.seen = true
				}
			});
		}
	},
	getters: {
		nonSeenItems: (state) => {
			return state.items.filter(item => !item.seen).length
		}
	},
	actions: {
		setItems({commit}, payload) {
			commit('SET_ITEMS', payload)
		},
		fetchNotifications({commit, rootState}, payload) {
			const { apiUrl, fetchNotificationsPath } = rootState.settings
			const url = apiUrl + fetchNotificationsPath

			return getData(url)
				.then((data) => {
					if (data.success) {
						commit('SET_ITEMS', data.result)
					}
				})
		},
		removeNotification({commit, rootState}, payload) {
			const { apiUrl, removeNotificationPath } = rootState.settings
			const url = apiUrl + removeNotificationPath

			return postData({ url, payload })
				.then((data) => {
					if (data.success) {
						commit('REMOVE_NOTIFICATION', data.result.removedId)
					}
					return data
				})
		},
		seeNotifications({commit, rootState}, payload) {
			const { apiUrl, seeNotificationPath } = rootState.settings
			const url = apiUrl + seeNotificationPath
			
			return postData({ url, payload })
				.then((data) => {
					if (data.success) {
						commit('SET_SEEN', data.result.seenNotifications)
					}
				})
		} 
	}
}
