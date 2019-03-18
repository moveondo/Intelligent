<template>
    <div class="output-list">
        <div style="text-align:right;margin-bottom:20px;">
            <el-button type="primary" @click.native="addTemplateOutputVaribleShow = true">{{$t('dataTable.create')}}</el-button>
        </div>
        <dataList ref="dataList" :search-data-list="searchDataList" :operation="operation" :table-column="tableColumn"></dataList>

        <!-- 编辑弹框 -->
        <el-dialog append-to-body :visible.sync="addTemplateOutputVaribleShow" :close-on-click-modal="false" @close="close">
            <el-form :model="templateOutputVarible" label-width="120px" >
                <el-form-item label="showName" prop="showName">
                <el-input v-model="templateOutputVarible.showName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="defaultValue" prop="defaultValue">
                <el-input v-model="templateOutputVarible.defaultValue" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="variableName" prop="typeName">
                <el-input v-model="templateOutputVarible.variableName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="addReportTemplates">{{$t('message.confirm')}}</el-button>
                <el-button @click.native="addTemplateOutputVaribleShow = false">{{$t('message.cancel')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import dataList from '../../common/dataList';
export default {
    components:{
      dataList,
    },
    data () {
        return {
            addTemplateOutputVaribleShow: false,
            templateOutputVarible: {},
            searchDataList:[
            {
                name: 'showName',
                paramsId: 'showName'
            },
            {
                name: 'defaultValue',
                paramsId: 'defaultValue'
            },
            {
                name: 'variableName',
                paramsId: 'variableName'
            },
            ],
            tableColumn:[{
                prop: 'showName',
                label: 'showName'
            },
            {
                prop: 'defaultValue',
                label: 'defaultValue'
            },
            {
                prop: 'variableName',
                label: 'variableName'
            }
            ],
            operation: {
                label1: this.$t('dataTable.edit'),
                label2: this.$t('dataTable.delete'),
                appendBody: true
            }
        }
    },
    methods: {
        //获取列表
        async queryDataList(params) {
            params.reportTemplateId = this.$route.query.reportId
            let result = await this.$store.dispatch('AC_TemplateOutputVaribleServiceQueryTemplateOutputVarible', params)
            this.$refs.dataList.total=result.data.total;             
            this.$refs.dataList.dataList=result.data.templateOutputVaribles;
        },

        close() {
            this.templateOutputVarible = {}
        },

        //编辑
        selectEdit(row) {
            this.templateOutputVarible = row
            this.addTemplateOutputVaribleShow = true
        },

        async addReportTemplates() {
            let params = this.templateOutputVarible
            params.reportTemplateId = this.$route.query.reportId

            if (params.id) {
                const result = await this.$store.dispatch('AC_TemplateOutputVaribleServiceUpdateTemplateOutputVarible',params);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            }else {
                const result = await this.$store.dispatch('AC_TemplateOutputVaribleServiceAddTemplateOutputVarible',params);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            }
            this.addTemplateOutputVaribleShow = false
            this.$refs.dataList.searchDataChange()
        },
        
        //删除
        async deleteData(data) {
            let params = { id: data.id }
            const result = await this.$store.dispatch('AC_TemplateOutputVaribleServiceDeleteTemplateOutputVarible',params);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$refs.dataList.deleteShow = false;
            this.$refs.dataList.searchDataChange()
        },
    },
}
</script>
<style lang="less" scoped>
.output-list{
    background: #fff;
    padding: 10px 20px;
}
</style>
