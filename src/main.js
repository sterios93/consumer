// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import Currency from './utils/currency'

import 'vuetify/dist/vuetify.min.css'

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

Currency.setCurrency({
  code: 'EUR',
  locale: 'de-DE',
  symbol: '€',
  digits: 4
})

Vue.filter('formatCurrency', function (value) {
  if (!value) return ''
  return Currency.formatCurrency(value)
})

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
