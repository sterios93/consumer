import { getData, postData } from "../../utils/helpers";

export default {
    namespaced: true,
    state: {
        currentRestaurant: {
            info: {},
        },
        allRestaurants: [],
    },
    mutations: {
        SET_RESTAURANTS: (state, payload) => state.allRestaurants = payload,
        SET_CURRENT_RESTAURANT_INFO: (state,payload) => state.currentRestaurant = payload,
    },
    getters: {},
    actions: {
        setRestaurants({commit}, restaurants) { commit('SET_RESTAURANTS', restaurants)},
        setCurrentRestaurantInfo({commit}, payload) {  commit('SET_CURRENT_RESTAURANT_INFO',payload) },
    }
}
