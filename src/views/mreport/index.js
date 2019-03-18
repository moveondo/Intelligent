
export default [
	{ 
		name:'myreport',
		path: '/mreport/myreport',
		component: resolve => require(['./myreport/myreport.vue'], resolve),
		meta: { title: '我的报告',requireAuth:true}
	},
	{
		name:'myReportDetail',
		path: '/mreport/myReportDetail',
		component: resolve => require(['./myreport/myReportDetail.vue'], resolve),
		meta: { title: '报告编辑',requireAuth:true}
	}, 
	{
		name:'createReport',
		path: '/mreport/createReport',
		component: resolve => require(['./myreport/createReport.vue'], resolve),
		meta: { title: '报告创建',requireAuth:true}
	}, 
	{
        path: '/mreport/reportTemplate',
        component: resolve => require(['./reportTemplate/reportTemplate.vue'], resolve),
        meta: { title: '研报模版',requireAuth:true}
    },
    {
        path: '/mreport/reportTemplateDetail',
        component: resolve => require(['./reportTemplate/reportTemplateDetail.vue'], resolve)
	}
];

