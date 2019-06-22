import { set, toggle } from '@/utils/vuex'
let config = {
  prodUrl: 'http://212.227.193.201/api/v1/',
  devUrl: 'http://212.227.193.201/api/v1/',
  basePath: './',
  signUpPath: 'consumer/create',
  loginPath: 'consumer/login',
  logoutPath: 'consumer/logout',
  fetchProfilePath: 'consumer/profile/fetch',
  updateProfie: 'consumer/profile/update',
  findRestaurantsPath: 'restaurants/find',
  resetPassPath: 'consumer/resetPassword',
  fetchRestaurantMenuPath: 'menu/items/list?restaurantId=',
  fetchRestaurantCategoriesPath: 'restaurant/categories/list?restaurantId=',
  fetchRestaurantSpecialOffersPath: 'offers/special/list?restaurantId=',
  fetchSpecialOfferPath: 'offer/special/fetch/',
  fetchRestaurantInfoPath: 'restaurant/fetch?restaurantId=',
  fetchRestaurantLunchOffersPath: 'offers/lunch/list?restaurantId=',
  fetchRestaurantLunchOfferPath: 'offers/lunch/fetch/',
  //Subscriptions
  fetchSubscriptionsPath: 'consumer/subscriptions/fetch',
  cancelSubscriptionPath: 'consumer/subscription/cancel',
  activateSubscriptionPath: 'consumer/subscription/activate',
  subscribePath: 'consumer/subscribe',
  //Notifications
  fetchNotificationsPath: 'consumer/notifications/fetch',
  removeNotificationPath: 'consumer/notification/remove',
  seeNotificationPath: 'consumer/notifications/see',
}

export default {
  namespaced: true,
  state: {
    apiUrl: config.devUrl,
    url: config.devUrl,
    basePath: config.basePath,
    signUpPath: config.signUpPath,
    updateProfiePath: config.updateProfie,
    loginPath: config.loginPath,
    fetchProfilePath: config.fetchProfilePath,
    logoutPath: config.logoutPath,
    resetPassPath: config.resetPassPath,
    findRestaurantsPath: config.findRestaurantsPath,
    fetchRestaurantMenuPath: config.fetchRestaurantMenuPath,
    fetchRestaurantCategoriesPath: config.fetchRestaurantCategoriesPath,
    fetchRestaurantSpecialOffersPath: config.fetchRestaurantSpecialOffersPath,
    fetchSpecialOfferPath: config.fetchSpecialOfferPath,
    fetchRestaurantInfoPath: config.fetchRestaurantInfoPath,
    fetchRestaurantLunchOffersPath: config.fetchRestaurantLunchOffersPath,
    fetchRestaurantLunchOfferPath: config.fetchRestaurantLunchOfferPath,
    //Subscriptions
    fetchSubscriptionsPath: config.fetchSubscriptionsPath,
    cancelSubscriptionPath: config.cancelSubscriptionPath,
    activateSubscriptionPath: config.activateSubscriptionPath,
    subscribePath: config.subscribePath,
    //Notifications
    fetchNotificationsPath: config.fetchNotificationsPath,
    removeNotificationPath: config.removeNotificationPath,
    seeNotificationPath: config.seeNotificationPath,
  },
  mutations: {},
  getters: {},
  actions: {}
}
