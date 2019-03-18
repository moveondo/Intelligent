export default[
    
    {
      path: '/analyst/myBusiness',
      component: resolve => require(['./myBusiness.vue'], resolve),
      meta: { title: '行业跟踪',requireAuth:true}
    }
]