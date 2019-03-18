<template>
    <div>
        <!-- 选择研报模型列表 -->
        <el-dialog width="730px" :visible.sync="modelShow" :title="$t('analyst.financialModel')" left :close-on-click-modal="false">
            <dataList 
            ref="financeModel"
            queryDataMethod='financeModel'
            :tableColumn="modelTableColumn"
            @selectRow="selectAnalyze"
            ></dataList>
            <div class="button-center">
                <el-button type="primary" @click.native="firstNext">{{$t('login.nextStep')}}</el-button>
            </div>
        </el-dialog>

        <!-- 选择研报模型下模版列表 -->
        <el-dialog width="730px" :visible.sync="modelTemplateShow" :title="$t('analyst.template')" left :close-on-click-modal="false">
            <dataList 
            ref="OutputTemplate"
            queryDataMethod='outputTemplate'
            :tableColumn="outputTemplateTableColumn"
            selectionShow="true"
            :params="outputTemplateParams"
            @handleSelectionChange="handleSelectionChange"
            ></dataList>
            <div class="button-center">
                <el-button type="primary" @click="firstBack">{{$t('login.previous')}}</el-button>
                <el-button type="primary" @click="selectTemplate()">{{$t('login.nextStep')}}</el-button>
            </div>
        </el-dialog>

        <!-- 修改变量 -->
        <el-dialog width="450px" style="text-align:center;" :visible.sync="formShow" :close-on-click-modal="false">
            <el-form v-if="$route.path != '/mreport/myReportDetail'">
                <el-form-item v-for="item in variableData" :key="item.id" :label="item.name" label-width="100px">
                    <el-input v-model="item.value" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form v-if="$route.path == '/mreport/myReportDetail'">
                <el-form-item v-for="item in variableData" :key="item.id" :label="item.name" label-width="100px">
                    <el-input v-model="item.defaultValue" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="secondBack">{{$t('login.previous')}}</el-button>
            <el-button type="primary" @click="saveVariable">{{$t('message.confirm')}}</el-button>
        </el-dialog>
    </div>
</template>
<script>
import dataList from '../../common/dataTable'
export default {
    components: {
        dataList,
    },
    props: ['selectSection'],
    data() {
        return {
            formShow: false,
            modelShow: false,
            variableShow: false,
            modelTemplateShow: false,
            arrlength: '',
            variableData: [],
            financeModelId: '',
            outputTemplates: '',
            variablesJsonMap: {},
            title: '',
            outputTemplateParams: {},
            modelTableColumn: [
                {
                    prop: 'name',
                    label: this.$t('analyst.financialModel')
                },
                {
                    prop: 'description',
                    label: this.$t('dataTable.description')
                },
                {
                    prop: 'code',
                    label: this.$t('analyst.modelCode')
                }
            ],
            outputTemplateTableColumn: [
                {
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
        clickModelShow() {
            this.modelShow = true;
            this.financeModelId = ''
        },

        // 选择模型id
        selectAnalyze(data){
            this.financeModelId = data.id
            this.outputTemplateParams = {
                financeModelId : data.id
            }
            this.$message.success(this.$t('message.chosen') + ' '+ data.name)
        },
        firstNext() {
            if(!this.financeModelId){
                this.$message.error(this.$t('message.noChosen'))
                return 
            }
            this.modelTemplateShow = true
            this.modelShow = false
        },
        firstBack() {
            this.modelShow = true
            this.modelTemplateShow = false
        },
        secondBack() {
            this.formShow = false
            this.modelTemplateShow = true
        },

        //请求变量列表
        async selectTemplate() {
            if(!this.outputTemplates || this.outputTemplates.length == 0){
                this.$message.error(this.$t('message.noChosen'))
                return 
            }

            if(this.$route.path == '/mreport/myReportDetail') {
                this.queryReportVariable()
                return
            }

            let params = {
                financeModelId: this.financeModelId,
                reportTemplateId: this.$route.query.reportId
            }

            let res = await this.$store.dispatch('AC_TemplateProcessServicePreCreateFmSectionTemplate', params)
            this.variableData = res.data.variables
            this.modelTemplateShow = false
            this.formShow = true
        },

        // 获取报告详情变量列表
        async queryReportVariable() {
            let params = {
                financeModelId: this.financeModelId,
                pageNum: 1,
                pageSize: 1000
            }

            let res = await this.$store.dispatch('AC_ModelTemplateVariableServiceQueryModelTemplateVariable', params)
            this.variableData = res.data.modelTemplateVariables
            this.modelTemplateShow = false
            this.formShow = true
        },

        handleSelectionChange(data) {
            this.outputTemplates = data
        },

        // 修改变量
        async saveVariable() {
            if(this.$route.path == '/mreport/myReportDetail') {
                this.saveReportVariable()
                return
            }

            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            this.variableData.forEach((item) => {
                item.reportTemplateId = this.$route.query.reportId
            })

            let params = {
                type: 4,
                reportTemplateId: this.$route.query.reportId,
                financeModelId: this.financeModelId,
                outputTemplates: this.outputTemplates,
                templateVaribleValueItems: this.variableData
            }
            
            let result = await this.$store.dispatch('AC_TemplateProcessServiceCreateFmSectionTemplate', params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})     
            this.formShow = false    
            this.$parent.queryAnalyzeAspect()       
        },

        async saveReportVariable() {
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            let params = {
                type: 4,
                reportId: this.$route.query.reportId,
                outputTemplates: this.outputTemplates,
                userid: localStorage.getItem('userId'),
                variablesJsonMap: {}
            }

            this.variableData.forEach((item) => {
                params.variablesJsonMap[item.code] = item.defaultValue
            })
          
            let result = await this.$store.dispatch('AC_ReportManageServiceAsyncCreateFmSection', params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})     
            this.formShow = false    
            this.$parent.queryAnalyzeAspect()       
        },
    }
}
</script>
<style lang="less" scoped>
.mask{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.5);
}
.mask-content{
    background: #fff;
    h2{
        padding-left: 30px;
        line-height: 60px;
    }
}
.analyze-content{
    padding: 10px;
    background: #fff;
}
.button-center{
    text-align: center;
}

</style>
