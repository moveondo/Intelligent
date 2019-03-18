export default[
    {
        path: '/analyst/indexfmodel',
        component: resolve => require(['./fmodel.vue'], resolve),
        meta: { title: '财务模型',requireAuth:true}
    },
    {
        path: '/analyst/modifyfmodel',
        component: resolve => require(['./modifyfmodel.vue'], resolve)
    },
    {
        path: '/analyst/modelpreview',
        component: resolve => require(['./modelpreview.vue'], resolve)
    }
]