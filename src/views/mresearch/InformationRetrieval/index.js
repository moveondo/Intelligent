
export default [
	 
   
    {
      path: '/mresearch/retrieval',
      component: resolve => require(['./retrieval.vue'], resolve),
      meta: { title: '信息检索',requireAuth:true}
    },
    {
      name:"retrievalcontent",
      path: '/mresearch/retrievalcontent',
      component: resolve => require(['./retrievalcontent.vue'], resolve),
      meta: { title: '信息检索内容',requireAuth:true}
    },

]