export default[
    {
       path: '/analyst/myTarget',
       component: resolve => require(['./myTarget.vue'], resolve),
       meta: { title: '标的跟踪',requireAuth:true}
     }
]