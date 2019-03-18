
export default [
    {
      path: '/mresearch/financialindex',
      component: resolve => require(['./index.vue'], resolve),
      meta: { title: '财务分析',requireAuth:true}
    },
    {
      path: '/mresearch/financialcontent',
      component: resolve => require(['./financialcontent.vue'], resolve),
      meta: { title: '财务分析',requireAuth:true}
    },


]