<template>
    <div id="app">
        <keep-alive>      
         <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>    
        <router-view v-if="!$route.meta.keepAlive"/>
        <loading></loading>
    </div>
</template>
<script>
    import loading from './views/common/loading'
    export default {
        components: {
            loading
        }
    }
</script>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
    ul,li{
        list-style: none;
    }

</style>