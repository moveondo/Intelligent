<template>
<div class="list-wrap">
    <div class="list-header">
        <div class="title">{{this.$t('task.myTask')}}</div>
        <!-- <el-button type="primary" @click="appendShow">创建</el-button> -->
    </div>

    <dataList 
    class="container"
    queryDataMethod='customInfoSource'
    :tableColumn="tableColumn"
    ></dataList>
</div>
</template>

<script>
    import dataList from '../../common/dataTable'
    export default {
        components: {
            dataList
        },
        data() {
            return {
                tableColumn:[
                    {
                        label: this.$t('task.source'),
                        prop: 'type'
                    },
                    {
                        label: this.$t('task.relatedLinks'),
                        prop: 'url'
                    },
                    {
                        label: this.$t('task.detail'),
                        prop: 'message'
                    }
                ]
            }
        },
        created() {

        },

        methods: {

        }
    }

</script>