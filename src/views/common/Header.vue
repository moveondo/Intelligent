<template>
    <div class="header" :style="{background: companyInfo.backgroundColor ? companyInfo.backgroundColor : '#0c1924'}">
        <!-- 折叠按钮 -->
        <!-- <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div> -->
        <div class="header-left">
            <div class="logo">
                <img v-if="companyInfo.logoUrl" :src="companyInfo.logoUrl" alt="">
                <img v-if="!companyInfo.logoUrl" src="static/img/svg/logo.svg">
            </div>
            <div class="context">
              <div  v-bind:class="{clickpoint:1===current}"  @click="SwitchIndex(1)" >{{$t('header.industry')}}</div>
              <div v-bind:class="{clickpoint:2===current}"  @click="SwitchIndex(2)" >{{$t('header.company')}}</div>
              <div v-bind:class="{clickpoint:3===current}"  @click="SwitchIndex(3)" >{{$t('header.data')}}</div>
              <el-button v-if="type !='draf'" class="button-create" @click="addReport()">{{$t('header.createReport')}}</el-button>
              <!-- <div class="draf" @click="drafnums()"> -->
              <el-popover v-else
                placement="bottom"
                width="400"
                trigger="click">
                 <p>当前报告:{{this.$store.state.CurrentEdit}}</p>
                 <p>当前章节:{{Treetitle}}</p>
                 <el-tree
                :data="navList"
                default-expand-all
                node-key="id"
                ref="vueTree"
                highlight-current
                :expand-on-click-node="false"
                class="nav-tree"
                @node-click="NodeClick"
                >
                <span class="custom-tree-node title" slot-scope="{ node, data }">
                    {{ data.title }}
                </span>
                </el-tree>
                 <el-button slot="reference">工作草稿</el-button>
               </el-popover>
               <!-- <span class="drafnums">{{drafnums}}</span>                  -->
              <!-- </div> -->
            </div>
        </div>
        
        <div class="header-right">
             <!-- <el-input v-model="select_word" placeholder="筛选id" class="handle-input mr10"></el-input> -->
            <div class="header-user-con">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="switchChange('中文')">中文</el-dropdown-item>
                        <el-dropdown-item @click.native="switchChange('English')">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided @click.native="$router.push({path: '/userInfo/myInfo'})">{{$t('menu.userInfo')}}</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">{{$t('header.LogOut')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        props:['companyInfo'],
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: '',
                message: 2,
                current:"",
                drafnums:0,
                navList: [],
                drafreport:null,
                Treetitle:null,
                type:null,
                language: '',
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        watch:{
            $route(to, from) {
             if(to.name=="ResearchDetail"){
               this.type="draf";
               this.queryUserReportDraft();  
             }
            }
        },
        created(){
            let self=this;
            bus.$on('setDraf', function (result) {
               if(result.type==200){
                 self.type="draf";
                 self.queryUserReportDraft();  
               } 
            })

            let storageLanguage = localStorage.getItem('storageLanguage')
            if(!storageLanguage) {
                this.language = navigator.language == 'zh-CN' ? '中文' : 'English'
                let language = this.language == '中文' ? 'zh' : 'en'
                localStorage.setItem('storageLanguage', language)
            }else {
                this.language = storageLanguage == 'zh' ? '中文' : 'English'
            }
        },
        beforeDestroy () {
            bus.$off('setDraf')
        },
        methods:{
            switchChange(value) {
                if(value == this.language) {
                    return
                }

                if (value == '中文') {
                    this.language = '中文'
                    localStorage.setItem("storageLanguage", "zh");
                } else {
                    this.language = 'English'
                    localStorage.setItem("storageLanguage", "en");
                }
                location.reload()
                this.$i18n.locale = value == '中文' ? 'zh' : 'en'
            },

            async queryUserReportDraft(){
               let params = {
                    "userId": localStorage.getItem('userId')
                }
                let result = await this.$store.dispatch('AC_UserReportDraftServiceQueryUserReportDraft',params)
                if(result.code == 200 ){
                    this.drafreport=result.data.userReportDrafts[0].reportId;
                    this.queryAnalyzeAspect(this.drafreport);
                }
            },
             async queryAnalyzeAspect(drafreport) {
                let params = {
                    reportId: drafreport,
                }
                let result = await this.$store.dispatch('AC_SectionTreeServiceGetSectionTree',params)
                this.navList = result.data.list
                if(this.navList.length > 0){
                    // this.NodeClick(this.navList[0])
                    // this.handleNodeClick(this.navList[0])
                    this.$nextTick(() => {
                        this.$refs.vueTree.setCurrentKey(this.navList[0].id);
                    })
                }  
            },
            async NodeClick(item) {
                if(item.type !="3"){
                    this.$message.error("当前节点不可点击，只可点击文本节点");
                    return false;
                }
                this.Treetitle=item.title;
                let para=JSON.stringify({
                    type:item.type,
                    id:item.id,
                    title:item.title
                })
                localStorage.setItem("drafnodeClick",para);

            },
            SwitchIndex(index){
               this.current=index;
               if(index==1){
                this.$router.push({ path:"/analyst/myBusiness"});
               }else if(index==2){
                this.$router.push({ path:"/analyst/myTarget"});
               }else if(index==3){
                this.$router.push({ path:"/analyst/targetEvent"});
               }
            },
             addReport(){
                 this.$router.push({path: '/mreport/createReport'})
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
              //  bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 40px;
    }
    .header-left .context{
        line-height: 40px;
        font-size: 1.4rem;
        padding-left: 0px;
        cursor: pointer;
    }
    .context{
        display: flex;

    }
    .context div{
        padding: 0 20px;
    }
    .context div:not(.draf):hover{
        background: #2b4152; 
    }
    
    /* .clickpoint{
       background: #2b4152;
    } */
    .button-create{
        background-color: #1c84c6;
        border-color: #1c84c6;
        height: 30px;
        line-height: 6px;
        font-size: 1.4rem;
        padding: 10px;
        color: #fff;
        margin-top:5px;
        margin-left:5px;
    }
    .draf{
        background-color: #1c84c6;
        border-color: #1c84c6;
        width: 80px;
        height: 30px;
        line-height: 30px;
        font-size: 1.4rem;
        padding: 10px;
        color: #fff;
        margin-top: 15px;
        margin-left: 5px;
        position: relative;
      
    }
    .draf  span{
            position:absolute;
            top: -10px;
            right: 0;
            color: #f0f;
    }
    .header .logo{
        float: left;
        width:150px;
        line-height: 40px;
        padding-left: 15px;  
    }
    .logo img {
        width: 135px;
        vertical-align: middle;
    }
    .header-left {
        font-size: 22px;
        color: #fff;
    }
    .header-right{
        float: right;
        padding-right: 10px;
        font-size: 22px;
        color: #fff;
    }
    .header-user-con{
        display: flex;
        height: 40px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell,.el-icon-rank{
        color: #ffffff;
    }
    .user-name{
        margin-left: 10px;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }

    .el-dropdown-menu__item{
        text-align: center;
    }
   .drafnums{
       animation-name:shake-it 1s;
       /* tranform:scale(1.3 1.3); */

     /* animation: shake-it .5s reverse infinite cubic-bezier(0.68, -0.55, 0.27, 1.55); */
   }
    @keyframes shake-it{
    0%{
        text-shadow: 0 0 rgba(0, 255, 255, .5), 0 0 rgba(255, 0, 0, .5);
    }
    25%{
        text-shadow: -2px 0 rgba(0, 255, 255, .5), 2px 0 rgba(255, 0, 0, .5);
    }
    50%{
        text-shadow: -5px 0 rgba(0, 255, 255, .5), 3px 0 rgba(255, 0, 0, .5);
    }
    100%{
        text-shadow: 3px 0 rgba(0, 255, 255, .5), 5px 0 rgba(255, 0, 0, .5);
    }
}
.el-dropdown{
    padding-right: 10px;
}
</style>
