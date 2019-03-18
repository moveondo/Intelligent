<template>
    <div class="variableList">
        <dataList 
        ref="dataList"
        queryDataMethod='modelTemplateVariable'
        :operation="operation"
        :tableColumn="tableColumn"
        :params="params"
        @selectOperation="selectOperation"
        ></dataList>

        <!-- 修改弹窗 -->
        <el-dialog width="450px" :title="$t('reportTemplate.templateVariableList')" :visible.sync="updataFormShow">
            <el-form :model="updataForm">
                <el-form-item :label="$t('analyst.variableName')" label-width="100px">
                    <el-input v-model="updataForm.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('analyst.variableCode')" label-width="100px">
                    <el-input v-model="updataForm.code"></el-input>
                </el-form-item>
                <el-form-item :label="$t('analyst.variableInd')" label-width="100px">
                    <el-input v-model="updataForm.variInd" type="number"></el-input>
                </el-form-item>
                <el-form-item :label="$t('analyst.defaultValue')" label-width="100px">
                    <el-input v-model="updataForm.defaultValue"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: right;">
                <el-button type="primary" @click="addData()">{{$t('message.confirm')}}</el-button>
                <el-button @click="updataFormShow = false">{{$t('message.cancel')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import dataList from '../../common/dataTable.vue'
export default {
    components:{
        dataList
    },
    data () {
        return {
            updataFormShow: false,
            updataForm: {},
            tableColumn:[{
                prop: 'code',
                label: this.$t('analyst.variableCode')
            },
            {
                prop: 'name',
                label: this.$t('analyst.variableName')
            },
            {
                prop: 'variInd',
                label: this.$t('analyst.variableInd'),
                sortable: true
            },
            {
                prop: 'defaultValue',
                label: this.$t('analyst.defaultValue')
            }
            ],
            params: {financeModelId: this.$route.query.Id},
            operation: [this.$t('dataTable.edit'),this.$t('dataTable.delete')],
        }
    },
    methods: {
        // 修改变量
        selectOperation(data) {
            if (data) {
                this.updataForm = data.data
            }else {
                this.updataForm = {}
            }
            this.updataFormShow = true
        },
        async updataData() {
            const result = await this.$store.dispatch('AC_ModelTemplateVariableServiceUpdateModelTemplateVariable', this.updataForm);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.updataFormShow = false;
            this.$refs.dataList.queryData()
        },

        //创建变量
        async addData() {
            if(!this.updataForm.variInd || !this.updataForm.name || !this.updataForm.code || !this.updataForm.defaultValue) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            if(this.updataForm.id) {
                this.updataData() 
                return
            }

            this.updataForm.financeModelId = this.$route.query.Id
            const result = await this.$store.dispatch('AC_ModelTemplateVariableServiceAddModelTemplateVariable', this.updataForm);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.updataFormShow = false;
            this.$refs.dataList.queryData()
        }
    },

}
</script>
<style lang="less" scoped>
.variableList{
    padding: 10px;
}
</style>
