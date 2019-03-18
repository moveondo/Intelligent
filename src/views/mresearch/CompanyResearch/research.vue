<template>
    <div class="list-wrap">
        <div class="list-header">
            <div class="title">{{this.$t('mresearch.companyResearch')}}</div>
            <el-button type="primary" @click="addShow">{{$t('dataTable.create')}}</el-button>
        </div>

        <researchList class="container" ref="researchList" :operation="operation"></researchList>
    </div>
</template>

<script>
import researchList from '../components/researchList';
export default {
    name:"Research",
    components:{
        researchList
    },
    data() {
        return {
            operation: {
                label1: this.$t('dataTable.edit'),
                label2: this.$t('dataTable.delete')
            }
        }
    },
    methods: {
        addShow() {
            this.$refs.researchList.addVisible = true
        }
    }
}
</script>