import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import index from './modules/index'
import order from './modules/order'
import money from './modules/money'
import authentication from './modules/authentication'
import moneyWithdraw from './modules/moneyWithdraw'
import toEnroll from './modules/toEnroll'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    index,
    order,
    money,
    authentication,
    moneyWithdraw,
    toEnroll
  }
})
