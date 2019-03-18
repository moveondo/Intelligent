
export default [
	 
    {
       path: '/diagram/Gojs/tree',
       component: resolve => require(['./Gojs/tree.vue'], resolve),
       meta: { title: '树形图',requireAuth:true}
     },
     {
        path: '/diagram/Gojs/mindMap',
        component: resolve => require(['./Gojs/mindMap.vue'], resolve),
        meta: { title: '思维导图',requireAuth:true}
      },

]