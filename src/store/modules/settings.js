import { set, toggle } from '@/utils/vuex'
let config = {
  prodUrl: 'http://212.227.193.201/api/v1/',
  devUrl: 'http://212.227.193.201/api/v1/',
  basePath: './',
  signUpPath: 'consumer/create',
  loginPath: 'consumer/login',
  logoutPath: 'consumer/logout',
  fetchProfilePath: 'consumer/profile/fetch',
  findRestaurantsPath: 'restaurants/find',
  fetchRestaurantMenuPath: 'menu/items/list?restaurantId=',
  fetchRestaurantCategoriesPath: 'restaurant/categories/list?restaurantId=',
  fetchRestaurantSpecialOffersPath: 'offers/special/list?restaurantId=',
  fetchSpecialOfferPath: 'offer/special/fetch/',
  fetchRestaurantInfoPath: 'restaurant/fetch?restaurantId=',
  fetchRestaurantLunchOffersPath: 'offers/lunch/list?restaurantId=',
  fetchRestaurantLunchOfferPath: 'offers/lunch/fetch/',
}

export default {
  namespaced: true,
  state: {
    apiUrl: config.devUrl,
    url: config.devUrl,
    basePath: config.basePath,
    signUpPath: config.signUpPath,
    loginPath: config.loginPath,
    fetchProfilePath: config.fetchProfilePath,
    logoutPath: config.logoutPath,
    findRestaurantsPath: config.findRestaurantsPath,
    fetchRestaurantMenuPath: config.fetchRestaurantMenuPath,
    fetchRestaurantCategoriesPath: config.fetchRestaurantCategoriesPath,
    fetchRestaurantSpecialOffersPath: config.fetchRestaurantSpecialOffersPath,
    fetchSpecialOfferPath: config.fetchSpecialOfferPath,
    fetchRestaurantInfoPath: config.fetchRestaurantInfoPath,
    fetchRestaurantLunchOffersPath: config.fetchRestaurantLunchOffersPath,
    fetchRestaurantLunchOfferPath: config.fetchRestaurantLunchOfferPath,
  },
  mutations: {},
  getters: {},
  actions: {}
}
