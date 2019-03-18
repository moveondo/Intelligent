import Vue from 'vue'
import Vuex from 'vuex'
import ueditorbackend from './modules/ueditorbackend'
import analyzemanage from './modules/analyzemanage'
import reportmanage from './modules/reportmanage'
import analyzeTask from './modules/analyzetask'
import tagmanage from './modules/tagmanage'
import jobmanage from './modules/jobmanage'
import opauth from './modules/opauth'

import group from '../views/group/groupStore'
import role from '../views/role/roleStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        ueditorbackend,
        analyzemanage,
        reportmanage,
        analyzeTask,
        jobmanage,
        tagmanage,
        opauth,
        group,
        role
    },
    state: {
      CurrentUrl:Object,
      CurrentAnnotaion:Object,
      selectExcelData: Object,
      loading: {
          show: false,
          text: '加载中'
      },
    },
    mutations: {
        getCurrentUrl(state,CurrentUrl){
            state.CurrentUrl=CurrentUrl;
        },
        ReadTagAnnotaion(state,CurrentAnnotaion){
          state.CurrentAnnotaion=CurrentAnnotaion;
        },
        loadingChange(state,CurrentAnnotaion) {
          state.loading = CurrentAnnotaion;
        },
        selectExcel(state,CurrentAnnotaion) {
          state.selectExcelData = CurrentAnnotaion;
        }
    },
    actions:{
      
          getCurrentUrl({
            commit
          }, CurrentUrl) {
            commit('getCurrentUrl', CurrentUrl)
          },

          ReadTagAnnotaion({
            commit
          }, CurrentAnnotaion) {
            commit('ReadTagAnnotaion', CurrentAnnotaion)
          }
    }
    
})