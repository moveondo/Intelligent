
export default [
	 
     {
        path: '/notice/index',
        component: resolve => require(['./index.vue'], resolve),
        meta: { title: '通知',requireAuth:true}
      },

]