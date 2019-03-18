export default[
    {
        path: '/analyst/industryModel',
        component: resolve => require(['./industryModel.vue'], resolve),
        meta: { title: '研究框架',requireAuth:true}
    },
    {
        path: '/analyst/industryModelDetail',
        component: resolve => require(['./industryModelDetail.vue'], resolve),
        meta: { title: '行业模型详情',requireAuth:true}
    },
]