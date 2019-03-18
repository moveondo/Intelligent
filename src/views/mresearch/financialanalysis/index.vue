<template>
    <div class="list-wrap">
        <div class="list-header">
            <div class="title">{{$t('financialAnalysis.financialAnalysisList')}}</div>
            <el-button type="primary" @click="addVisible = true">{{$t('dataTable.create')}}</el-button>
        </div>
        <dataList 
        class="container"
        ref="dataList"
        queryDataMethod='analyze'
        :operation="operation"
        :tableColumn="tableColumn"
        @selectOperation="selectOperation"
        ></dataList>

        <!-- 新增弹出框 -->
        <el-dialog :title="$t('dataTable.create')" :visible.sync="addVisible" width="450px" @close="close">
            <el-form label-width="200px">
                
                <el-form-item :label="$t('analyst.financialModel')">
                    <el-select v-model="addform.financeModelId">
                        <el-option
                        v-for="item in modelList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="$t('financialAnalysis.predictionConclusion')">
                    <el-input v-model="addform.result" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item :label="$t('financialAnalysis.assumeDiscussionArea')">
                    <el-input v-model="addform.aspect" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item :label="$t('financialAnalysis.companyCode')">
                    <el-input v-model="addform.corpCode" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item :label="$t('financialAnalysis.hypotheticalConclusion')">
                    <el-input v-model="addform.conclusion" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item :label="$t('financialAnalysis.hypotheticalDescription')">
                    <el-input v-model="addform.description" auto-complete="off"></el-input>
                </el-form-item>
        
                <el-form-item :label="$t('analyst.outputTemplate')">
                    <el-input v-model="addform.OutputTemplateId" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAdd">{{$t('message.confirm')}}</el-button>
                <el-button @click="addVisible = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import dataList from '../../common/dataTable'
export default {
    components:{
        dataList
    },
    data() {
        return {
            addVisible: false,
            modelList: [],
            addform:{},
            tableColumn:[
                {
                    prop: 'name',
                    label: this.$t('financialAnalysis.financialAnalysis')
                },
                {
                    prop: 'corpCode',
                    label: this.$t('financialAnalysis.companyCode'),
                    sortable: true
                }
            ],
            operation: [this.$t('dataTable.edit'),this.$t('dataTable.delete')],
        }
    },
    created() {
        this.queryFinanceModel()
    },
    methods: {
        async queryFinanceModel() {
            let para = {
                pageNum : 1,
                pageSize : 20
            }
            const result = await this.$store.dispatch('AC_FinanceModelServiceQueryFinanceModel', para);
            this.modelList = result.data.financeModels
        },
        
        async saveAdd(){
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const result = await this.$store.dispatch('AC_AnalyzeServiceAddAnalyze', this.addform);
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            this.close()
            this.$refs.dataList.queryData()
        },

        selectOperation(data) {
            this.$router.push({ path:"/mresearch/financialcontent", query: {Id: data.data.id } });
        },

        close() {
            this.addVisible = false
            this.addform = {}
        }
    }
}
</script>