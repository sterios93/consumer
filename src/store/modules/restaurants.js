import { getData, postData } from "../../utils/helpers";

export default {
    namespaced: true,
    state: {
        currentRestaurant: {
            info: {},
            menuItems: [],
            categories: [],
            selectedCategories: [],
            specialOffers: [],
            currentSpecialOffer: {},
            lunchOffers: [],
            currentLunchOffer: {}
        },
        allRestaurants: [],
    },
    mutations: {
        SET_RESTAURANTS: (state, payload) => state.allRestaurants = payload,
        SET_CURRENT_RESTAURANT_INFO: (state,payload) => state.currentRestaurant.info = payload,
        SET_CURRENT_RESTAURANT_MENU_ITEMS: (state, payload) => state.currentRestaurant.menuItems = payload,
        SET_CURRENT_RESTAURANT_MENU_CATEGORIES: (state, payload) => state.currentRestaurant.categories = payload,
        SET_CURRENT_RESTAURANT_SPECIAL_OFFERS: (state, payload) => state.currentRestaurant.specialOffers = payload,
        SET_CURRENT_RESTAURANT_SPECIAL_OFFER: (state, payload) => state.currentRestaurant.currentSpecialOffer = payload,
        SET_CURRENT_RESTAURANT_LUNCH_OFFERS: (state, payload) => state.currentRestaurant.lunchOffers = payload,
        SET_CURRENT_RESTAURANT_LUNCH_OFFER: (state, payload) => state.currentRestaurant.currentLunchOffer = payload,
        SELECT_CATEGORY: (state, payload) => state.currentRestaurant.selectedCategories.push(payload),
        DESELECT_CATEGORY: (state, payload) => state.currentRestaurant.selectedCategories.splice(state.currentRestaurant.selectedCategories.indexOf(payload),1),
    },
    getters: {
        isCategorySelected: (state) => (category) => {
            if (state.currentRestaurant.selectedCategories) return state.currentRestaurant.selectedCategories.includes(category)
            else return []
        },
        getMenuByCategory: (state) => (searchedCategory) => {
            const items = state.currentRestaurant.menuItems;
            if (items) return items.filter(item => item.category === searchedCategory);
        },
        getSelectedCategories: (state) => state.currentRestaurant.selectedCategories,
    },
    actions: {
        setRestaurants({commit}, restaurants) { commit('SET_RESTAURANTS', restaurants)},
        setCurrentRestaurantInfo({commit}, payload) {  commit('SET_CURRENT_RESTAURANT_INFO',payload) },
        fetchRestaurantInfo({commit, rootState}, id) {
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantInfoPath + id;
            return getData(url)
                .then(data => data.json())
                .then(data => {
                    if (data.success) {
                        commit('SET_CURRENT_RESTAURANT_INFO', data.result)
                    }
                    return data
                })
        },
        fetchCurrRestMenu({ commit, rootState , state}) {
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantMenuPath + state.currentRestaurant.info._id;
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
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantCategoriesPath + state.currentRestaurant.info._id;
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
        fetchRestSpecialOffers({commit, rootState, state}) {
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantSpecialOffersPath + state.currentRestaurant.info._id;
            return getData(url)
                .then(data => data.json())
                .then(data => {
                    if (data.success) {
                        commit('SET_CURRENT_RESTAURANT_SPECIAL_OFFERS', data.result);
                    }
                    return data
                })

        },
        fetchSpecialOffer({commit, rootState}, offerId) {
            const url = rootState.settings.apiUrl + rootState.settings.fetchSpecialOfferPath + offerId;
            return getData(url)
                .then(data => data.json())
                .then(data => {
                    if (data.success) {
                        commit('SET_CURRENT_RESTAURANT_SPECIAL_OFFER', data.result);
                    }
                    return data
                })
        },
        fetchRestLunchOffers({ commit, rootState, state }) {
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantLunchOffersPath + state.currentRestaurant.info._id;
            return getData(url)
                .then(data => data.json())
                .then(data => {
                    if (data.success) {
                        commit('SET_CURRENT_RESTAURANT_LUNCH_OFFERS', data.result);
                    }
                    return data
                })
        },
        fetchLunchOffer({ commit, rootState }, offerId) {
            const url = rootState.settings.apiUrl + rootState.settings.fetchRestaurantLunchOfferPath + offerId;
            return getData(url)
                .then(data => data.json())
                .then(data => {
                    if (data.success) {
                        commit('SET_CURRENT_RESTAURANT_LUNCH_OFFER', data.result);
                    }
                    return data
                })
        },
    }
}
