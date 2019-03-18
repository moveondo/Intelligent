import Vue from 'vue';
import Router from 'vue-router';
import myreport from '../views/mreport/index';
import mframe from '../views/mframe/index'
import mresearch from '../views/mresearch/index';
import analyst from '../views/analyst/index'
import notice from '../views/notice';
import role from '../views/role/index';
import task from '../views/task/index';
import letter from '../views/letter/index';
import group from '../views/group/index';
import userInfo from '../views/userInfo/index';
import diagram from '../views/diagram/index';


Vue.use(Router);

export default new Router({
    routes: [
        
        {
            path: '/',
            redirect: '/login',
            meta:{requireAuth:true}
        },
        {
            path: '/mreport',
            component: resolve => require(['../views/common/Home.vue'], resolve),
            meta: {requireAuth:true ,title: '报告'},
            children:[
                ...myreport,
                ...diagram 
            ]
        },
        {
            path: '/mframe',
            component: resolve => require(['../views/common/Home.vue'], resolve),
            meta: {requireAuth:true ,title: '框架'},
            children:[
                ...mframe
            ]
        },
        {
            path: '/mresearch',
            component: resolve => require(['../views/common/Home.vue'], resolve),
            meta: { requireAuth:true,title: '研究' },
            children:[             
                ...mresearch
            ]
        },
        {
            path: '/analyst',
            component: resolve => require(['../views/common/Home.vue'], resolve),
            meta: { requireAuth:true,title: '分析' },
            children:[             
                ...analyst
            ]
        },
        {
          path: '/task',
          component: resolve => require(['../views/common/Home.vue'], resolve),
          meta: {requireAuth:true ,title: '任务' },
          children:[
            ...task
          ]
        },
        {
          path: '/group',
          component: resolve => require(['../views/common/Home.vue'], resolve),
          meta: { title: '团队' ,requireAuth:true},
          children:[
           ...group
              
          ]
        },
        {
          path: '/notice',
          component: resolve => require(['../views/common/Home.vue'], resolve),
          meta: { title: '通知',requireAuth:true },
          children:[
            ...notice
              
          ]
        },
        {
          path: '/letter',
          component: resolve => require(['../views/common/Home.vue'], resolve),
          meta: { title: '私信',requireAuth:true },
          children:[
            ...letter
              
          ]
        },

        {
          path: '/role',
          component: resolve => require(['../views/common/Home.vue'], resolve),
          meta:{title: '权限',requireAuth:true},
          children: [
            ...role
          ]
        },
        {
            path: '/userInfo',
            component: resolve => require(['../views/common/Home.vue'], resolve),
            meta:{title: '个人中心',requireAuth:true},
            children: [
              ...userInfo
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../views/common/Login.vue'], resolve)
        },   
        {
            path: '/404',
            component: resolve => require(['../views/common/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../views/common/403.vue'], resolve)
        },
    ]
})
