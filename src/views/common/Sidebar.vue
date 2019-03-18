<template>
    <div class="sidebar">
        <div class="context-menu">
            <div @click="toUserInfo">
                <vavatar class="headerimg"></vavatar>
            </div>
             <template v-for="content in contents">
                <template >               
                    <div :index="content.url" :key="content.url" v-bind:class="{'currentclick': content.url == selectMenu}" class="side" @click="menuChange(content.url,'1')">
                        <el-tooltip  :content="content.name" effect="dark" placement="right" popper-class="tooltip">
                            <img v-if="content.url == selectMenu" :src="content.icon_a" alt="">
                            <img v-if="content.url != selectMenu" :src="content.icon" alt="">
                        </el-tooltip>
                    </div>
                </template>
             </template>
        </div>
        <el-menu v-show="viceMenuShow"  class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#e9e9e9"
            text-color="#292a2a" active-text-color="#d3d5d5" router>
            <template v-for="item in viceMenu">
                <template>
                  <div class="sidename" :key="item.index" >
                    {{item.title}}
                  </div>
                  <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" v-bind:class="{ 'currentside': subItem.index == selectViceMenu }">
                      {{ subItem.title }}
                  </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import vavatar from './avatar';
    import group from '../../../static/img/svg/group.svg';
    import letter from '../../../static/img/svg/letter.svg';
    import mframe from '../../../static/img/svg/mframe.svg';
    import mresearch from '../../../static/img/svg/research.svg';
    import analyst from '../../../static/img/svg/analysis.svg';
    import task from '../../../static/img/svg/task.svg';
    import notice from '../../../static/img/svg/notice.svg';
    import mreport from '../../../static/img/svg/mreport.svg';
    import permission from '../../../static/img/svg/permission.svg';
    import permission_a from '../../../static/img/svg/permission_a.svg';
    import group_a from '../../../static/img/svg/group_a.svg';
    import letter_a from '../../../static/img/svg/letter_a.svg';
    import mframe_a from '../../../static/img/svg/mframe_a.svg';
    import mresearch_a from '../../../static/img/svg/research_a.svg';
    import analyst_a from '../../../static/img/svg/analysis_a.svg';
    import task_a from '../../../static/img/svg/task_a.svg';
    import notice_a from '../../../static/img/svg/notice_a.svg';
    import mreport_a from '../../../static/img/svg/mreport_a.svg';

    export default {
        data() {
            return {
                collapse: true,
                selectMenu:'',
                selectViceMenu: '',
                viceMenuShow: false,
                contents:[],
                iconList: {
                    mreport: mreport,
                    analyst: analyst,
                    mresearch: mresearch,
                    task: task,
                    group: group,
                    notice: notice,
                    letter: letter,
                    permission: permission,
                    mreport_a: mreport_a,
                    analyst_a: analyst_a,
                    mresearch_a: mresearch_a,
                    task_a: task_a,
                    group_a: group_a,
                    notice_a: notice_a,
                    letter_a: letter_a,
                    permission_a: permission_a,
                },
                viceMenu: [],
            }
        },
        components:{
            vavatar
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
        },
        watch: {
            //这个方法经测试会走两遍menuChange。需优化.(兼容顶层栏行业，公司导致)
            $route(newData,old) {
                if(newData.path.split('/')[1] == old.path.split('/')[1]) {
                    this.getSelectMenu()
                }else {
                    this.menuChange(newData.path.split('/')[1])
                }
            }
        },
        created(){
            this.getUserMenus()
            this.menuChange(this.$route.path.split('/')[1])
        },
        methods:{
            getSelectMenu () {
                this.selectMenu = this.$route.path.split('/')[1]
                this.selectViceMenu = this.$route.path.split('/')[2]
                let show = false
                this.viceMenu[0].subs.forEach(item => {
                    if(item.index == this.selectViceMenu) {
                        show = true
                    }
                })

                this.viceMenuShow = show ? true : false
                this.$emit('changeViceMenuShow',this.viceMenuShow)
            },
            async getUserMenus() {
                if (!localStorage.getItem('userId')) {
                    this.$router.push('/login');
                }
                let params = {userId: localStorage.getItem('userId')}
                localStorage.storageLanguage == 'en' ? params.languageId = 2 : null
                const result = await this.$store.dispatch('AC_LoginServiceGetUserMenus', params);
                let list = result.data.menuObjList ? result.data.menuObjList : []

                list.forEach(item => {
                    let icon_a = item.icon + '_a'
                    item.icon = this.iconList[item.icon]
                    item.icon_a = this.iconList[icon_a]
                })
                this.contents = list
            },

            menuChange(index,i){
                const result = this.changeSecondMenu(index);
                this.viceMenu=result;
                if(i == 1) {
                    let router='/'+index+'/'+this.viceMenu[0].subs[0].index;
                    this.$router.push({ path: router});
                }
                this.getSelectMenu()
            },

            toUserInfo() {
                this.$router.push({path: '/userInfo/myInfo'});
            },

            changeSecondMenu(params) {
                let side=[];
                if(params=="mreport"){
                        side=[
                            {
                                icon: 'el-icon-tickets',
                                index: 'mreport',
                                title: this.$t('menu.report'),
                                subs: [
                                        {
                                                index: 'myreport',
                                                title: this.$t('menu.myReport')
                                        },
                                        {
                                                index: 'reportTemplate',
                                                title: this.$t('menu.reportTemplate')
                                        }
                                ]
                            },
                        ]
                }else if (params=="mframe") {
                    side=[
                        {
                                icon: 'el-icon-tickets',
                                index: 'mreport',
                                title: this.$t('menu.frame'),
                                subs: [
                                        
                                ]
                        },
                    ]
                }else if (params=="analyst") {
                        side=[
                            {
                                    icon: 'el-icon-tickets',
                                    index: 'analyst',
                                    title: this.$t('menu.analysis'),
                                    subs: [
                                    {
                                                index: 'myTarget',
                                                title: this.$t('menu.targetTracking')
                                        },{
                                                index: 'industryModel',
                                                title: this.$t('menu.researchFramework')
                                        },{
                                                index: 'indexfmodel',
                                                title: this.$t('menu.financialModel')
                                        },
                                        {
                                                index: 'myBusiness',
                                                title: this.$t('menu.industryTracking')
                                        }, {
                                                index: 'targetEvent',
                                                title: this.$t('menu.eventTracking')
                                        }
                                    ]
                            },
                        ]
                    }else if (params=="mresearch") {
                    side=[
                        {
                                icon: 'el-icon-tickets',
                                index: 'mresearch',
                                title: this.$t('menu.research'),
                                subs: [
                                        {
                                                index: 'Research',
                                                title: this.$t('menu.companyResearch')
                                        },{
                                                index: 'retrieval',
                                                title: this.$t('menu.informationRetrieval')
                                        },{
                                                index: 'notes',
                                                title: this.$t('menu.researchNotes')
                                        },{
                                                index: 'map',
                                                title: this.$t('menu.knowledgeMap')
                                        },{
                                                index: 'financialindex',
                                                title: this.$t('menu.financialAnalysis')
                                        }
                                ]
                        },
                    ]
                }else if (params=="task") {
                    side=[
                        {
                                icon: 'el-icon-tickets',
                                index: 'task',
                                title: this.$t('menu.task'),
                                subs: [
                                        {
                                                index: 'myTask',
                                                title: this.$t('menu.myTask')
                                        },
                                        {
                                                index: 'systemTask',
                                                title: this.$t('menu.systemTask')
                                        }
                                ]
                        },
                    ]
                    }else if (params=="role") {
                        side=[
                            {
                                    icon: 'el-icon-tickets',
                                    index: 'role',
                                    title: this.$t('menu.userRole'),
                                    subs: [
                                        {
                                                index: 'role',
                                                title: this.$t('menu.roleList')
                                        },{
                                                index: 'user',
                                                title: this.$t('menu.userList')
                                        },{
                                                index: 'menu',
                                                title: this.$t('menu.menuList')
                                        }       
                                    ]
                            },
                        ]
                    }else if (params=="group") {
                    side=[
                        {
                                icon: 'el-icon-tickets',
                                index: 'group',
                                title: this.$t('menu.group'),
                                subs: [
                                        {
                                                index: 'userGroup',
                                                title: this.$t('menu.groupList')
                                        }
                                ]
                        },
                    ]
                }else if (params=="notice") {
                    side=[
                        {
                                icon: 'el-icon-tickets',
                                index: 'notice',
                                title: this.$t('menu.notificationCenter'),
                                subs: [
                                        {
                                                index: 'index',
                                                title: this.$t('menu.notificationList')
                                        }
                                ]
                        },
                    ]
                }else if (params=="letter") {
                    side=[
                        {
                                icon: 'el-icon-tickets',
                                index: 'letter',
                                title: this.$t('menu.privateLetters'),
                                subs: [
                                        {
                                                index: 'index',
                                                title: this.$t('menu.privateLetters')
                                        }
                                ]
                        },
                    ]
                }else if (params=="userInfo") {
                        side=[
                            {
                                    icon: 'el-icon-tickets',
                                    index: 'userInfo',
                                    title: this.$t('menu.userInfo'),
                                    subs: [
                                            {
                                                index: 'myInfo',
                                                title: this.$t('menu.myInfo')
                                            }
                                    ]
                            },
                        ]
                }else if(params.ID){    
                    side=[
                        {
                                icon: 'el-icon-tickets',
                                index: 'modify',
                                title: '报告编辑',
                                id:params.ID,
                                subs: [
                                        {
                                                index: 'summary?id='+params.ID,
                                                title: '报告摘要'
                                        },{
                                                index: 'structure?id='+params.ID,
                                                title: '公司管理架构'
                                        },{
                                                index: 'viewchange?id='+params.ID,
                                                title: '市场观点变迁'
                                        },{
                                                index: 'industrychain?id='+params.ID,
                                                title: '产业链'
                                        },{
                                                index: 'productstructure?id='+params.ID,
                                                title: '产品结构'
                                        },{
                                                index: 'revenue?id='+params.ID,
                                                title: '营收分析'
                                        },{
                                                index: 'customerstructure?id='+params.ID,
                                                title: '客户结构'
                                        },{
                                                index: 'needschange?id='+params.ID,
                                                title: '行业需求和变革',
                                        },{
                                                index: 'operating?id='+params.ID,
                                                title: '营运能力'
                                        },{
                                                index: 'peer?id='+params.ID,
                                                title: '同业比较'
                                        }
                                ]
                        },
                    ]
                }
                return side;
            }
        }
    }
</script>

<style  scoped>
    .sidebar{
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 0;
      top: 40px;
      bottom:0;
      overflow-y: scroll;
    }
    .context-menu{
      width: 50px!important;
      height: 100%!important;
      overflow-y: auto;
      transition: margin-left .8s ease,margin-top .8s ease;
      z-index: 10;
      color:#FFF;
      cursor: pointer;
      padding-top: 15px;
      background: #223442;
    }
    .context-menu [class^=el-icon-] {
      vertical-align: middle;
      margin-right: 5px;
      width:30px;
      text-align: center;
      font-size: 2.2rem;
      margin-bottom: 4px;
     }
    .side{
        text-align: center;
        /* padding: 1.3rem 0;
        font-size: 1.2rem; */
        margin: 22px 0;
        font-weight: bold;
     }
     .side:last-child {
       margin-bottom:37px;
     }
     /* .currentclick{
        background: #ffffff;
        color: #09509d;
        font-size: 1.3rem;
        font-weight: bold;
        border-left: 6px solid #1c84c6;
     } */
     .currentclick i img{
        color: #09509d;
     }
     .headerimg{
        width: 30px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        margin-left: 10px;
     }
    .sidename{
      margin: 3rem 0 3rem 1.6rem;
      font-size: 1.8rem;
      font-weight: bold;
      color: #292a2a;
      text-align: left;
    }
    .is-active{
      color: #303133  !important;
    }
    .currentside{
        background: #c0c1c1 !important;
        height: 34px !important;
        line-height: 34px;
        color: #303133  !important;
          
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
        text-align: center;

    }
    .el-menu--collapse{
      width: 200px;
    }
    .el-menu-item{
      font-size: 1.4rem;
      /* padding: 0 70px; */
      text-indent: 2em;  
      height: 34px !important;
      line-height: 34px !important;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-menu-item:focus, .el-menu-item:hover {
        outline: 0;
        background-color: #c0c1c1 !important;
        height: 34px !important;
        line-height:34px !important;

    }
 
</style>
<style>
    .tooltip{
         margin-left:30px !important;
    }
</style>

