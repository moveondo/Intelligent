
export default [

      {
        path: '/role/user',
        component: resolve => require(['./user.vue'], resolve),
        meta: { title: '用户列表',requireAuth:true}
      },
      {
        path: '/role/userDetail',
        component: resolve => require(['./userDetail.vue'], resolve),
        meta: { title: '用户详情',requireAuth:true}
      },
     

]