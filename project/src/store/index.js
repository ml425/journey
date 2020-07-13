import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import gradeManager from './gradeManager/index'
import userInfo from './userInfo/index'
import subjectManager from './subjectManager/index'
import courseCheck from './courseCheck/index'
import coursePublish from './coursePublish/index'
import information from './information/information'
import homework from './homework/homework'
import questions from './questions/questions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    gradeManager,
    userInfo,
    subjectManager,
    courseCheck,
    coursePublish,
    information,
    homework,
    questions
  },
  getters
})

export default store
