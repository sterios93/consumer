import { set, toggle } from '@/utils/vuex'
import { getData, postData } from "../../utils/helpers";

export default {
  namespaced: true,
  state: {
    token: '',
    style: '',
    geolocation: {
      lat: '',
      lng: '',
    },
    markers: [],
    apiKey: 'AIzaSyAfYAgsxbh9FIJw1lAUc3B_t3ujOTrDRT4',
    lastIndex: 0,
    amount: 4,
    minDistance: 1000,
    maxDistance: 10000,
    searchedAdress: '',
    searchedRestType: '',
    searchedRestCategory: '',
    searchedRestName: '',
    lastInList: false,
  },
  mutations: {
    SET_TOKEN: set('token'),
    SET_STYLE: set('style'),
    SET_GEOLOCATION: (state, payload) => state.geolocation = payload,
    SET_MARKERS: (state, payload) => state.markers = payload,
    EXTEND_MARKERS: (state, payload) => state.markers = [...state.markers, ...payload],
    SET_SEARCHED_ADRESS: (state, payload) => state.searchedAdress = payload,
    SET_R_TYPE: (state, rType) => state.searchedRestType = rType,
    SET_R_CAT: (state, rCat) => state.searchedRestCategory = rCat,
    SET_R_NAME: (state, rName) => state.searchedRestName = rName,
    SET_LAST_INDEX: (state, index) => state.lastIndex = index,
    RESET_LAST_INDEX: (state, index) => state.lastIndex = 0,
    SET_LAST_IN_LIST: (state, payload) => state.lastInList = payload,
  },
  getters: {},
  actions: {
    setLastInList({commit}, payload) {
      commit('SET_LAST_IN_LIST', payload);
    },
    resetLastIndex({commit}) {
      commit('RESET_LAST_INDEX');
    },
    setRType({commit}, rType) {
      commit('SET_R_TYPE', rType)
    },
    setRCategory({commit}, rCat) {
      commit('SET_R_CAT', rCat)
    },
    setRName({commit}, rName) {
      commit('SET_R_NAME', rName)
    },
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
    setAddress({commit}, payload) {
      commit('SET_SEARCHED_ADRESS', payload);
    },
    getAdress({commit, state}, payload) {
      const { lat, lng } = payload;

      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat + ',' + lng}&key=${state.apiKey}&language=en`)
        .then(res => res.json())  
    },
    fetchMarkers({rootState, commit, dispatch, state}, criteria = {}) {
      const { apiUrl, findRestaurantsPath } = rootState.settings;
      const url = apiUrl + findRestaurantsPath;
      const payload = {
        lng: state.geolocation.lng.toString(),
        lat: state.geolocation.lat.toString(),
        minDistance: state.minDistance,
        maxDistance: state.maxDistance,
        type: state.searchedRestType.length === 0 ? null : state.searchedRestType,    
        category: state.searchedRestCategory.length === 0 ? null : state.searchedRestCategory, 
        name: state.searchedRestName.length === 0 ? null : state.searchedRestName,
        lastIndex: state.lastIndex,
        amount: state.amount,
      };

      return postData({ payload, url})
				.then(data => {
          if (data.success) {
            const {restaurants, lastIndex, lastInList} = data.result;
            if (criteria.fetchMore) {
              commit('EXTEND_MARKERS', restaurants);
              commit('SET_LAST_INDEX', lastIndex)
              if (lastInList) commit('SET_LAST_IN_LIST', lastInList);
              dispatch('restaurants/extendRestaurants', restaurants, { root: true });
            } else {
              commit('SET_MARKERS', restaurants);
              commit('SET_LAST_INDEX', lastIndex);
              if (lastInList) commit('SET_LAST_IN_LIST', lastInList);
              dispatch('restaurants/setRestaurants', restaurants, { root: true });
            }
					}
					return data
				});
    },
  }
}
