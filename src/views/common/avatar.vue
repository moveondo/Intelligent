<template>
    <i class="user-avatar" >
        <span v-if="this.userAvatar" :style="{backgroundImage:'url(' + this.userAvatar + ')'}"></span>
        <span v-if="!this.userAvatar" :class="'headerimg-'+Random.randomNum">{{username}}</span>
    </i>
</template>
<script>

export default {
    data(){
        return{
            Random:{
                randomNum:null,
            },
            userAvatar: ''
        }
    },
    created() {
        this.queryUserInfo()
        let randomNum=localStorage.getItem('randomNum');
        if(randomNum==null){
            this.Random.randomNum=parseInt(Math.random()*(4+1),10);
            localStorage.setItem('randomNum',parseInt(Math.random()*(4+1),10));
        }else{
            this.Random.randomNum=randomNum;
        }
    },
    methods: {
        async queryUserInfo() {
            let params = {userId: localStorage.getItem('userId')}
            let result = await this.$store.dispatch('AC_UserManageServiceQueryUserInfo', params)
            this.userAvatar = result.data.headImage ? result.data.headImage : ''
        },
    },
    computed:{
        username(){
            let ms_username=localStorage.getItem("name")
            if(ms_username.match(/[^\u4e00-\u9fa5]/g)==null){
                return ms_username.substring(0,1);
            }else if( ms_username.match(/[^\u4e00-\u9fa5]/g).length &&  ms_username.match(/[^\u4e00-\u9fa5]/g).length>0){
                return ms_username.substring(0,3);
            }
        },
    },
}
</script>
<style lang="less" scoped>
.user-avatar{
    span{
        width: 100%;
        height: 100%;
        background-size: cover;
        border-radius: 50%;
        display: inline-block;
    }
}
.headerimg-0,.headerimg-1,.headerimg-2,.headerimg-3,.headerimg-4{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: inline-block;
    text-align: center;
    color: #52481e;
    font-size: 1rem;
}
.headerimg-0{
    background:#f56c6c ;
}   
    .headerimg-1{
    background:#4da9ec ;
}
    .headerimg-2{
    background:#558aac ;
}
.headerimg-3{
    background:#f56c6c ;
}
    .headerimg-4{
    background:#e16f09 ;
}

</style>
