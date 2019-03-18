<template>
    <div class="model-list">
        <dataList 
        ref="modelTemplate"
        queryDataMethod='outputTemplate'
        :params="params"
        :operation="operation"
        :tableColumn="tableColumn"
        @selectOperation="selectOperation"
        ></dataList>
        
        <!--新增界面-->
        <el-dialog :title="$t('analyst.template')" :visible.sync="addFormVisible" width="400px" @close="close">
            <el-form label-width="80px">
                <el-form-item :label="$t('analyst.template')" prop="type">
                    <el-input :autofocus="true" v-model="addName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="addOutputTemplate">{{$t('message.confirm')}}</el-button>
                <el-button @click.native="addFormVisible = false">{{$t('message.cancel')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import dataList from '../../common/dataTable';
export default {
    components:{
      dataList,
    },
    data () {
        return {
            addName: '',
            addFormVisible: false,
            params: {financeModelId: this.$route.query.Id},
            operation: [this.$t('dataTable.edit'),this.$t('dataTable.delete')],
            tableColumn: [{
                prop: 'name',
                label: this.$t('analyst.template'),
            },
            {
                prop: 'id',
                label: 'ID',
                sortable: true
            }
            ],
        }
    },
    methods: {
        async addOutputTemplate() {
            let params = {
                financeModelId: this.$route.query.Id,
                name: this.addName
            }
            
            let res = await this.$store.dispatch('AC_OutputTemplateServiceAddOutputTemplate', params)
            res.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.close()
            this.$refs.modelTemplate.queryData()
        },

        //编辑
        selectOperation(data) {
            let row = data.data
            this.$parent.modelTemplateListShow = false
            this.$parent.defaultMsg = row.richText
            this.$parent.outputTmplate = row;
            sessionStorage.removeItem("outputTmplateId");
            sessionStorage.setItem("outputTmplateId",row.id);
            sessionStorage.setItem("financeModelId",this.$route.query.Id);
        },

        close() {
            this.addFormVisible = false
            this.addName = ''
        }
    },
}
</script>
<style lang="less" scoped>
.model-list{
    padding: 10px;
}
</style>
