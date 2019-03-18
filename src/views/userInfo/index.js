export default [
    {
        path: '/userInfo/myInfo',
        component: resolve => require(['./myInfo/index'], resolve),
        meta: { title: '我的信息',requireAuth:true}
    },
    {
        path: '/userInfo/mySetting',
        component: resolve => require(['./mySetting/index'], resolve),
        meta: { title: '系统设定',requireAuth:true}
    }
];
