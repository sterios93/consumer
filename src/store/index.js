/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

import main from './modules/main/index'
import special from './modules/special/index'
import info from './modules/info/index'

import modules from './modules'
Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  modules: {
    ...modules,
    special,
    main,
    info,
  },
})

export default store
