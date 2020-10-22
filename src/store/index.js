import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation' // 引入mutation
import actions from './action' // 引入action
import state from './state' // 引入state
import getters from './getters' // 引入getters

Vue.use(Vuex)


export default new Vuex.Store({
  getters,
  state,
  actions,
  mutations
})
