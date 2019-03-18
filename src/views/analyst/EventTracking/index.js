export default[
    
   {
      path: '/analyst/targetEvent',
      component: resolve => require(['./targetEvent.vue'], resolve),
      meta: { title: '事件跟踪',requireAuth:true}
    },
   
 
]