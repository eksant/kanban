import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('fbtoken')
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    setToken ({commit}, payload) {
      commit('setToken', payload)
    }
  }
})
