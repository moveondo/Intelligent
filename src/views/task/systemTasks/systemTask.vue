<template>
<div class="list-wrap">
    <div class="list-header">
        <div class="title">{{this.$t('task.systemTask')}}</div>
        <!-- <el-button type="primary" @click="appendShow">创建</el-button> -->
    </div>

    <dataList 
    class="container"
    queryDataMethod='task'
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
                        label: this.$t('task.systemTask'),
                        prop: 'taskname:'
                    },
                    {
                        label: this.$t('task.source'),
                        prop: 'source:'
                    },
                    {
                        label: this.$t('task.status'),
                        prop: 'status'
                    },
                    {
                        label: this.$t('task.target'),
                        prop: 'dest'
                    },
                    {
                        label: this.$t('task.rate'),
                        prop: 'progress'
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