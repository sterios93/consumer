import { getData, postData } from "../../utils/helpers";

export default {
    namespaced: true,
    state: {
        currentRestaurat: {},
        allRestaurants: [],
    },
    mutations: {
        SET_RESTAURANTS: (state, payload) => state.allRestaurants = payload,
    },
    getters: {},
    actions: {
        setRestaurants({commit}, restaurants) { commit('SET_RESTAURANTS', restaurants)},
    }
}
