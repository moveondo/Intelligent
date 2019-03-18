<template>
<div class="list-wrap">
    <div class="list-header">
        <div class="title">知识图谱</div>
        <!-- <el-button type="primary" @click="appendShow">创建</el-button> -->
    </div>
    <div class="nothing">
      <img :src="nothing" alt="">
      <!-- <p>正在开发中，敬请期待........</p> -->
    </div>
</div>
</template>

<script>
    import nothing from '../../../../static/img/tags/nothing.png';

    export default {
        data() {
            return {
                nothing:nothing
            }
        },
        created() {

        },

        methods: {




        }
    }

</script>

<style scoped>
 .nothing{
     font-size: 1.6rem;
     padding:100px 30px;
     text-align: center;
 }
</style>
