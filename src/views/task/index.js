
export default [
    {
        path: '/task/myTask',
        component: resolve => require(['./myTasks/myTask.vue'], resolve),
        meta: { title: '我的需求',requireAuth:true}
    },
    {
        path: '/task/systemTask',
        component: resolve => require(['./systemTasks/systemTask.vue'], resolve),
        meta: { title: '系统任务',requireAuth:true}
    },
];

