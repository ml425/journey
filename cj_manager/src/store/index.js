import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import customer from './customer/index'
import customerDetails from './customerDetails/index'
import waiter from './waiter/index'
import waiterDetails from './waiterDetails/index'
import category from './category/index'
import product from './product/index'
import productDetails from './productDetails/index'
import order from './order/index'
import orderDetails from './orderDetails/index'
import comment from './comment/index'
import waiterExamine from './waiterExamine/index'
import cashExamine from './cashExamine/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    customer,
    customerDetails,
    waiter,
    waiterDetails,
    category,
    product,
    productDetails,
    order,
    orderDetails,
    comment,
    waiterExamine,
    cashExamine
  },
  getters
})

export default store
