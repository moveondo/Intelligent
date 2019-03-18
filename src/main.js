
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import http from './views/utils/http'
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import 'es6-promise/auto'
import i18n from './i18n/i18n';
import store from './store'
import echarts from 'echarts';
import gojs from 'gojs';

Vue.prototype.$echarts = echarts;
Vue.prototype.go = gojs;

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = http;

Vue.config.devtools = true;



//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
      if(localStorage.getItem('token')){ //判断本地是否存在access_token
        next();
      }else {
        router.push({
          path:'/'
        })
      }
    }
    else {
      next();
    }
    if(from.name=='retrievalcontent'){
        to.meta.isUseCache=true;
    }else if(from.name=='Research'){
        to.meta.isUseCache=false;
    }else if(from.name=='researchModelList'){
        to.meta.isUseCache=false;
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if(to.fullPath == "/"){
      if(localStorage.getItem('token')){
        next({
          path:from.fullPath
        });
      }else {
        next();
      }
    }
  });
  

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
