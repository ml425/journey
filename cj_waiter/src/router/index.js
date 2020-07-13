import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login'
import Order from '../views/manager/order'
import Index from '../views/manager/index'
import User from '../views/manager/user'
import Money from '../views/manager/money'
import authentication from '../views/manager/authentication'
import MoneyWithdraw from '../views/manager/moneyWithdraw'
import ToEnroll from '../views/manager/toEnroll'

Vue.use(VueRouter)

  const routes = [
    {
      // 默认页面
      path:'/',
      redirect:'/login'
    },
    {
      path: '/manager',
      name: 'manager',
      component: Home,
      // 子路由
      children:[{
        path:'index',
        component:Index
      },{
        path:'order',
        component:Order
      },{
        path:'user',
        component:User
      },{
        path:'money',
        component:Money
      },{
        path:'moneyWithdraw',
        component:MoneyWithdraw
      },{
        path:'authentication',
        component:authentication
      },{
        path:'toEnroll',
        component:ToEnroll
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
