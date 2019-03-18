
export default [
	 
    {
      path: '/mresearch/map',
      component: resolve => require(['./map.vue'], resolve),
      meta: { title: '知识图谱',requireAuth:true}
    },

]