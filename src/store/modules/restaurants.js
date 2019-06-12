import { getData, postData } from "../../utils/helpers";

export default {
    namespaced: true,
    state: {
        currentRestaurant: {
            info: {},
            menuItems: [],
            categories: [],
        },
        allRestaurants: [],
    },
    mutations: {
        SET_RESTAURANTS: (state, payload) => state.allRestaurants = payload,
        SET_CURRENT_RESTAURANT_INFO: (state,payload) => state.currentRestaurant = payload,
        SET_CURRENT_RESTAURANT_MENU_ITEMS: (state, payload) => state.currentRestaurant.menuItems = payload,
        SET_CURRENT_RESTAURANT_MENU_CATEGORIES: (state, payload) => state.currentRestaurant.categories = payload,
    },
    getters: {},
    actions: {
        setRestaurants({commit}, restaurants) { commit('SET_RESTAURANTS', restaurants)},
        setCurrentRestaurantInfo({commit}, payload) {  commit('SET_CURRENT_RESTAURANT_INFO',payload) },
        fetchCurrRestMenu({ commit, rootState , state}) {
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantMenuPath + state.currentRestaurant.id;
            return getData(url)
            .then(data => data.json())
            .then(data => {
                if (data.success) {
                    commit('SET_CURRENT_RESTAURANT_MENU_ITEMS', data.result)
                }
                return data
            })
        },
        fetchCurrRestCategories({commit, rootState, state}) {
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantCategoriesPath + state.currentRestaurant.id;
            return getData(url)
                .then(data => data.json())
                .then(data => {
                    if (data.success) {
                        commit('SET_CURRENT_RESTAURANT_MENU_CATEGORIES', data.result)
                    }
                    return data
                })
        }
    }
}
