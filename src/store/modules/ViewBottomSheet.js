import {set, toggle} from '@/utils/vuex'
import {getData} from "../../utils/helpers";

export default {
    namespaced: true,
    state: {
        visibility: false
    },
    mutations: {
        SET_IS_VISIBILITY: set('visibility'),
    },
    getters: {},
    actions: {
        setVisibility({commit}, payload) {
            commit('SET_IS_VISIBILITY', payload)
        },
    }
}
