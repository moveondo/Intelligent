
export default [
	{
        path: '/mframe/modifyjs',
        component: resolve => require(['./ResearchReportTemplate/modifyjs.vue'], resolve),
        meta: { title: '修改js',requireAuth:true}
    },
    {
        path: '/mframe/modifyvjson',
        component: resolve => require(['./ResearchReportTemplate/modifyvjson.vue'], resolve),
        meta: { title: '修改json',requireAuth:true}
    }
];


