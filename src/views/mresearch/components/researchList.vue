<template>
    <div>
        <!-- 分析列表 -->
        <dataList ref="dataList" :search-data-list="searchDataList" @selectRow="selectRow" :operation="operation" :table-column="tableColumn"></dataList>
        <!-- 新增弹出框 -->
        <el-dialog :title="$t('mresearch.companyResearch')" :visible.sync="addVisible" width="60%" @close="close">
            <div v-show="step == 1">
                <industryModelList ref="industryModelList" :operation='industryModelOperation' @selectRow="selectIndustryModel"></industryModelList>
            </div>
            <div class="form-conent" v-show="step == 2">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item :label="$t('myTarget.stockCode')">
                        <el-input v-model="form.corpCode"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('myTarget.companyName')">
                        <el-input v-model="form.corpName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('mresearch.exchange')">
                        <el-select v-model="form.stockMaket">
                            <el-option
                            v-for="item in infoSources"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('dataTable.description')">
                        <el-input type="textarea" v-model="form.description"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="el-footer">
                <el-button type="primary" v-if="step == 1" @click="next()">{{$t('login.nextStep')}}</el-button>
                <el-button type="primary" v-if="step == 2" @click="saveAdd()">{{$t('login.finish')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import dataList from '../../common/dataList';
    import industryModelList from '../../analyst/components/industryModelList'
    export default {
        props:['operation'],
        components:{
            dataList,
            industryModelList
        },
        data() {
            return {
                addVisible: false,
                modelList: [],
                step: 1,
                infoSources: [],
                form: {
                    corpCode: '',
                    corpName: '',
                    stockMaket: '',
                    description: '',
                    bmId: ''
                },
                searchDataList:[
                    {
                        name: this.$t('industryModel.industryModel'),
                        paramsId: 'modelName'
                    },
                    {
                        name: this.$t('myTarget.companyName'),
                        paramsId: 'corpName'
                    },
                    {
                        name: this.$t('dataTable.description'),
                        paramsId: 'description'
                    }
                ],
                tableColumn:[
                    {
                        prop: 'modelName',
                        label: this.$t('industryModel.industryModel')
                    },
                    {
                        prop: 'corpName',
                        label: this.$t('myTarget.companyName')
                    },
                    {
                        prop: 'description',
                        label: this.$t('dataTable.description')
                    }
                ],
                industryModelOperation: null
            }
        },
        created() {
        
        },
        methods: {
            close() {
                this.form = {
                    corpCode: '',
                    corpName: '',
                    stockMaket: '',
                    description: '',
                    bmId: ''
                }
                this.step = 1
            },
            next() {
                this.form.bmId ? this.step = 2 : this.$message.error(this.$t('message.noChosen'))
                this.queryInfoSources()
            },
            async queryInfoSources() {
                let params = {
                    pageNum: 1,
                    pageSize: 20
                }
                const result = await this.$store.dispatch('AC_InfoSourceServiceQueryInfoSource', params);
                this.infoSources = result.data.infoSources
            },

            selectRow(row) {
                this.$emit('selectRow', row)
            },
            selectIndustryModel(data) {
                this.form.bmId = data.id
                this.$message.success(this.$t('message.chosen') + data.name)
            },
            async queryDataList(params) {
                const result = await this.$store.dispatch('AC_CorpAnalyzManageQueryCorpAnalyzeModel', params);
                this.$refs.dataList.total=result.data.total;             
                this.$refs.dataList.dataList=result.data.corpAnalyzes;
            },

            selectEdit(row) {
                let params={
                    bmId: row.bmId,
                    corpId: row.id,
                    name: row.corpName,
                    corpCode: row.corpCode,
               }
               this.$router.push({path: '/mresearch/researchDetail',query: params})
            },

            async deleteData(data){
                let para={ 
                    id: data.id,
                    userId: localStorage.getItem('userId') 
                }
                const result = await this.$store.dispatch('AC_CorpAnalyzManageRewriteDeleteCorpAnalyze', para);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$refs.dataList.searchDataChange()
                this.$refs.dataList.deleteShow = false;
            },

            // 保存增加
            async saveAdd(){
                for (var i in this.form) {
                    if (!this.form[i]) {
                        this.$message.error(this.$t('message.empty'))
                        return false
                    }
                }

                const result = await this.$store.dispatch('AC_CorpAnalyzeServiceAddCorpAnalyze', this.form);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.addVisible = false
                this.$refs.dataList.searchDataChange()
            },
        }
    }

</script>

<style scoped>
    .form-conent{
        padding: 0 75px;
    }
    .el-footer{
        text-align: center;
    }
    .el-select{
        width: 100%;
    }
</style>
