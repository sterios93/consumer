import { getData, postData } from "../../utils/helpers";

export default {
    namespaced: true,
    state: {
        currentRestaurant: {
            info: {},
            menuItems: [],
            categories: [],
            selectedCategories: [],
        },
        allRestaurants: [],
    },
    mutations: {
        SET_RESTAURANTS: (state, payload) => state.allRestaurants = payload,
        SET_CURRENT_RESTAURANT_INFO: (state,payload) => state.currentRestaurant.info = payload,
        SET_CURRENT_RESTAURANT_MENU_ITEMS: (state, payload) => state.currentRestaurant.menuItems = payload,
        SET_CURRENT_RESTAURANT_MENU_CATEGORIES: (state, payload) => state.currentRestaurant.categories = payload,
        SELECT_CATEGORY: (state, payload) => state.currentRestaurant.selectedCategories.push(payload),
        DESELECT_CATEGORY: (state, payload) => state.currentRestaurant.selectedCategories.splice(state.currentRestaurant.selectedCategories.indexOf(payload),1),
    },
    getters: {
        isCategorySelected: (state) => (category) => {
            if (state.currentRestaurant.selectedCategories) return state.currentRestaurant.selectedCategories.includes(category)
            else return []
        },
    },
    actions: {
        setRestaurants({commit}, restaurants) { commit('SET_RESTAURANTS', restaurants)},
        setCurrentRestaurantInfo({commit}, payload) {  commit('SET_CURRENT_RESTAURANT_INFO',payload) },
        fetchCurrRestMenu({ commit, rootState , state}) {
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantMenuPath + state.currentRestaurant.info.id;
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
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantCategoriesPath + state.currentRestaurant.info.id;
            return getData(url)
                .then(data => data.json())
                .then(data => {
                    if (data.success) {
                        commit('SET_CURRENT_RESTAURANT_MENU_CATEGORIES', data.result)
                    }
                    return data
                })
        },
        toggleCategory({ commit, state }, payload) {
            const categories = state.currentRestaurant.selectedCategories;
            if (categories.includes(payload)) return commit('DESELECT_CATEGORY', payload);
            if (!categories.includes(payload)) return commit('SELECT_CATEGORY', payload);
        },
    }
}
