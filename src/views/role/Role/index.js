
export default [

    {
        path: '/role/role',
        component: resolve => require(['./role.vue'], resolve),
        meta: { title: '权限列表',requireAuth:true}
      },
      {
        path: '/role/roleDetail',
        component: resolve => require(['./roleDetail.vue'], resolve),
        meta: { title: '权限详情',requireAuth:true}
      },

]