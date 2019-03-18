export default [
	 
     {
        path: '/letter/index',
        component: resolve => require(['./index.vue'], resolve),
        meta: { title: '私信',requireAuth:true}
      }
]