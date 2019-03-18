

export default [
	 
    {
      name:"Research",
      path: '/mresearch/Research',
      component: resolve => require(['./research.vue'], resolve),
      meta: { title: '公司研究',requireAuth:true}
    },
     {
        name:"ResearchDetail",
        path: '/mresearch/researchDetail',
        component: resolve => require(['./researchDetail.vue'], resolve),
        meta: { title: '公司研究详情',requireAuth:true, isUseCache: false, keepAlive: true }
     },

 ]