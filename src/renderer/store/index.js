import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})

export default store
