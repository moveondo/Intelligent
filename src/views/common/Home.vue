<template>
    <div class="wrapper">
        <v-head :companyInfo="companyInfo"></v-head>
        <v-sidebar @changeViceMenuShow="changeViceMenuShow"></v-sidebar>
        <div id="content-box" class="content-box " :class="{'tet':viceMenuShow}">
            <div class="content">                                          
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>          
        </div>
    </div>
</template>
<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';

    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                viceMenuShow:false,
                Section:false,
                addform:{
                    title:''
                },
                titleid:0,
                current:0,
                posOrder:0,
                companyInfo: {} 
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
         computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            this.getCompanyInfo()
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
        methods:{
            changeViceMenuShow(data) {
                this.viceMenuShow = data ? false : true
            },

            async getCompanyInfo() {
                let params = {
                    userId: localStorage.getItem('userId')
                }
                let result = await this.$store.dispatch('AC_LoginServiceGetCompanyInfo',params)
                this.companyInfo = result.data.company ? result.data.company : ''
            }
        }
    }
</script>
<style  scoped>

.queryside{
  display: flex;
   height: 100%!important;
}
.content{
   height: 100%;
       /* background: #e8e9e9; */
}
.queryside .sidebar{
    width: 200px;
   
}
.content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 40px;
    bottom: 0;
    overflow-y: scroll;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    /* background: #b97a7a; */
}
.tet{
    left: 50px;
    /* height: 100% !important; */
    box-sizing: border-box;
}



.sidebar{
    background: #ffffff;
}
 .sidename{
      margin: 3rem 0 3rem 1.6rem;
      font-size: 1.7rem;
      color: #292a2a;
      text-align: left;
    }
.sidebar::-webkit-scrollbar{
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse){
    width: 200px;
    text-align: left;
}

</style>
