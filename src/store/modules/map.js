import { set, toggle } from '@/utils/vuex'
import { getData, postData } from "../../utils/helpers";

export default {
  namespaced: true,
  state: {
    token: '',
    style: '',
    geolocation: '',
    markers: []
  },
  mutations: {
    SET_TOKEN: set('token'),
    SET_STYLE: set('style'),
    SET_GEOLOCATION: (state, payload) => state.geolocation = payload,
    SET_MARKERS: (state, payload) => state.markers = payload,
  },
  getters: {},
  actions: {
    setToken({commit}, payload) {
      commit('SET_TOKEN', payload)
    },
    setStyle({commit}, payload) {
      commit('SET_STYLE', payload)
    },
    setGeolocation({commit}, payload) {
      commit('SET_GEOLOCATION', payload)
    },
    setMarkers({commit}, payload) {
      commit('SET_MARKERS', payload)
    },
    fetchMarkers({rootState, commit}, data) {
      const { apiUrl, findRestaurantsPath } = rootState.settings;
      const url = apiUrl + findRestaurantsPath;
      const payload = {
        lng: data.location.lng.toString(),
        lat: data.location.lat.toString(),
        // TODO: Uncomment when the BE is ready
        // minDistance: data.minDistance,
        maxDistance: data.maxDistance,
        // type: data.type,    
        // category: data.category, 
        // name: data.name, 
      };

      return postData({ payload, url})
				.then(data => data.json())
				.then(data => {
          if (data.success) {
            commit('SET_MARKERS', data.result)
          }
          return data
				})
    },
  }
}
