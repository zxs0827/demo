import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  userInfo: null, // 用户信息
  login: false // 是否登录
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
