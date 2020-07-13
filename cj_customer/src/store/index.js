import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import index from './modules/index'
import order from './modules/order'
import money from './modules/money'
import location from './modules/location'
import details from './modules/details'
import addLocation from './modules/addLocation'
import moneyRecharge from './modules/moneyRecharge'
import moneyWithdraw from './modules/moneyWithdraw'
import comment from './modules/comment'
import orderDetails from './modules/orderDetails'
import toEnroll from './modules/toEnroll'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    index,
    order,
    money,
    location,
    details,
    addLocation,
    moneyRecharge,
    moneyWithdraw,
    comment,
    orderDetails,
    toEnroll
  }
})
