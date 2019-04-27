import Vue from 'vue'
import { set, toggle } from '@/utils/vuex'

const state = () => ({
    information: {
        restaurantName: "Cepiqta",
        restaurantType: "Mexican",
        restaurantWebsite: "dobkata.com",
        restaurantNumber: "12312312312",
        location: {},
    }
});

export default {
    state,
    mutations: {},
    getters: {},
    actions: {},
}


