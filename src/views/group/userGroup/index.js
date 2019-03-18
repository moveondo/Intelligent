export default [
	 
    {
        path: '/group/userGroup',
        component: resolve => require(['./userGroup.vue'], resolve),
        meta: { title: '小组管理',requireAuth:true}
      },
    
]