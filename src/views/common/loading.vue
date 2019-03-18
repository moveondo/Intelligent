<template>
    <div class="loading" v-show="$store.state.loading.show">
        <div class="loading-content">
            <i class="el-icon-close close" @click="close"></i>
            <i class="el-icon-loading"></i>
            <p class="text">{{ $store.state.loading.text }}...</p>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        close() {
            this.$store.commit('loadingChange',{show: false})
        }
    }
}
</script>
<style lang="less" scoped>
.loading{
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    .loading-content{
        width: 500px;
        height: 300px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, .7);
        border-radius: 8px;
        .close {
            position: absolute;
            top: 4px;
            right: 4px;
            font-size: 18px;
            background: rgba(0, 0, 0, .3);
            cursor: pointer;
        }
        .close:hover{
            color: #fff;
        }
        .el-icon-loading{
            color: #fff;
            font-size: 40px;
            margin-right: 8px;
        }
        .text{
            color: #fff;
            font-size: 12px;
        }
    }
}
</style>
