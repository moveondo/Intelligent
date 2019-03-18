
export default [
	 
  
    {
      path: '/mresearch/notes',
      component: resolve => require(['./notes.vue'], resolve),
      meta: { title: '研究笔记',requireAuth:true}
    },
   
]