<template>
    <div>
        <dataList ref="dataList" 
        @selectRow="selectRow"
        :search-data-list="searchDataList" 
        :operation="operation" 
        :table-column="tableColumn">
        </dataList>    

        <el-dialog :title="$t('task.source')" :visible.sync="editShow" width="600px" @close="clearSelectModel">
            <div v-if="editShow">
                <dataTable
                selectionShow="true"
                :table-column="creatTableColumn"
                queryDataMethod='infoCatagory'
                @handleSelectionChange="handleSelectionChange"
                ></dataTable>

                <div class="footer-bottom">
                    <div class="footer-left">
                        <span>{{$t('industryModel.needInformation')}}</span>
                        <span @click="changeAddInfo">{{$t('industryModel.customInformation')}}</span>
                    </div>
                    <div class="footer-right">
                        <el-button type="primary" @click="addForm()">{{$t('message.confirm')}}</el-button>
                        <el-button @click="editShow = false">{{$t('message.cancel')}}</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>

        <el-dialog :title="$t('task.source')" :visible.sync="addInfoShow" width="450px" @close="close">
            <el-form ref="form" :model="Infoform" label-width="100px">
                <el-form-item :label="$t('reportTemplate.type')">
                    <el-select v-model="Infoform.type">
                        <el-option :label="$t('industryModel.forumTopic')" :value="$t('industryModel.forumTopic')"></el-option>
                        <el-option :label="$t('industryModel.newsAnnouncement')" :value="$t('industryModel.newsAnnouncement')"></el-option>
                        <el-option :label="$t('industryModel.expertService')" :value="$t('industryModel.expertService')"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('task.relatedLinks')">
                    <el-input v-model="Infoform.url"></el-input>
                </el-form-item>
                <el-form-item :label="$t('task.detail')">
                    <el-input type="textarea" :rows="2" v-model="Infoform.message"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addInfo">{{$t('message.confirm')}}</el-button>
                <el-button @click="addInfoShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import dataList from '../../common/dataList'
    import dataTable from '../../common/dataTable'
    export default {
        components:{
            dataList,
            dataTable
        },
        props: ['analyzeAspectId'],
        data() {
            return {
                editShow:false,
                addInfoShow: false,
                selectModel: '',
                createList: [],
                Infoform: {
                    type: '',
                    url: '',
                    message: ''
                },
                searchDataList:[
                    {
                        name: this.$t('task.source'),
                        paramsId: 'name'
                    },
                    {
                        name: this.$t('industryModel.sourceInformation'),
                        paramsId: 'type'
                    },
                ],
                tableColumn:[{
                    prop: 'name',
                    label: this.$t('task.source')
                },
                {
                    prop: 'type',
                    label: this.$t('industryModel.sourceInformation')
                }
                ],
                creatTableColumn:[{
                    prop: 'infoCatagoryName',
                    label: this.$t('task.source')
                },
                {
                    prop: 'infoSourceName',
                    label: this.$t('industryModel.sourceInformation')
                }
                ],
                operation: {
                    label2: this.$t('dataTable.delete')
                }
            }
        },
        watch: {
            analyzeAspectId(data) {
                this.analyzeAspectId = data
                this.$refs.dataList.searchDataChange()
            }
        },
        methods: {
            async addInfo() {
                if(!this.Infoform.type || !this.Infoform.url || !this.Infoform.message) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                let params = Object.assign({},this.Infoform,{userId: localStorage.getItem('userId')},{name: this.Infoform.type})
                const result = await this.$store.dispatch('AC_CustomInfoSourceServiceAddCustomInfoSource', params);
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.addInfoShow = false
            },
            changeAddInfo() {
                this.editShow = false
                this.addInfoShow = true
            },
            // 获取数据列表
            async queryDataList(params) {
                if (!this.analyzeAspectId) {
                    return false
                }
                params.analyzeAspectId = this.analyzeAspectId
                const result = await this.$store.dispatch('AC_AnalyzeAspectSourceQuerySourceById', params);
                this.$refs.dataList.total=result.data.total;             
                this.$refs.dataList.dataList=result.data.list;
            },
            // 确定删除
            async deleteData(data){
                let params = { id:data.analyzeSourceId }
                const result = await this.$store.dispatch('AC_AnalyzeSourceServiceDeleteAnalyzeSource', params);
                this.$message.success(this.$t('message.fail'));
                this.$refs.dataList.searchDataChange()
                this.$refs.dataList.deleteShow = false;
            },

            // 编辑事件
            selectEdit() {
               this.editShow = true
            },
            close() {
                this.Infoform = {
                    type: '',
                    url: '',
                    message: ''
                }
            },
            clearSelectModel() {
                this.editShow = false;
                this.createList = []
            },
            selectRow(row) {
                this.$emit('selectRow', row)
            },

            handleSelectionChange(data) {
                this.createList = data
            },

            async addForm(){
                if(this.createList.length == 0) {
                    this.$message.error('请选择信息源模型')
                    return
                }
                this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
                for(let i = 0;i < this.createList.length;i++) {
                    let params = {
                        analyzeAspectId: this.analyzeAspectId,
                        infoCatagoryId: this.createList[i].id
                    }

                    const result = await this.$store.dispatch('AC_AnalyzeAspectSourceInsertAspectSource', params)
                    if(result.code != 200) {
                        this.$message.error(this.$t('message.fail'))
                    }

                    if(i == (this.createList.length - 1) && result.code == 200) {
                        this.$message.success(this.$t('message.success'))
                    }
                }
                this.$store.commit('loadingChange',{show: false})
                this.$refs.dataList.searchDataChange()
                this.clearSelectModel()
            }
        }
    }

</script>
<style lang="less" scoped>
.el-select{
    width: 100%;
}
.footer-bottom{
    display: flex;

    .footer-left{
        flex: 1;
        span{
            display: block;
            font-size: 12px;
        }
        span:last-of-type {
            color: #409EFF;
            cursor: pointer;
        }
    }
    .footer-right{
        flex: 1;
        text-align: right;
    }
}


</style>
