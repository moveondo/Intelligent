
export default [
      {
        path: '/role/menu',
        component: resolve => require(['./menu.vue'], resolve),
        meta: { title: '菜单列表',requireAuth:true}
      },

]