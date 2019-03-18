<template>
    <div class="list-wrap">
        <div class="nav">
            <el-tabs v-model="tabSelect" @tab-click="queryTarget">
                <el-tab-pane :label="$t('report.myReport')"></el-tab-pane>
                <el-tab-pane :label="item.name" v-for="item in myGroupList" :key="item.id"></el-tab-pane>
            </el-tabs>
            <el-button class="button" type="primary" @click="createReport()">{{$t('dataTable.create')}}</el-button>
        </div>
        <dataList 
        class="container"
        ref="dataList"
        :params="params"
        queryDataMethod='report'
        :operationIcon="operationIcon"
        :tableColumn="tableColumn"
        @selectOperation="selectOperation"
        ></dataList>

        <el-dialog :title="$t('report.exportRecord')" :visible.sync="asyncTaskShow" width="700px">
            <dataList 
            class="container"
            ref="asyncTaskList"
            :params="asyncTaskParams"
            queryDataMethod='asyncTask'
            :operation="operation"
            :tableColumn="asyncTaskTableColumn"
            @selectOperation="selectAsyncTaskOperation"
            ></dataList>
        </el-dialog>

        <!-- 预览 -->
        <preview :child-content="previewContent"  v-show="isPre" @hidepreview="hidepreview"></preview>     
    </div>
</template>

<script>
    import dataList from '../../common/dataTable'
    import preview from '../components/preview';
    import edit_icon from '../../../../static/img/list/edit.svg';
    import download_icon from '../../../../static/img/list/download.svg';
    import preview_icon from '../../../../static/img/list/preview.svg';
    import export_record_icon from '../../../../static/img/list/export_record.svg';
    import delete_icon from '../../../../static/img/list/delete.svg';
    
    export default {
        components:{
              dataList,
              preview
        },
        data() {
            return {
                myGroupList: [],
                tabSelect: '0',
                params: {},
                tableColumn:[{
                    prop: 'title',
                    label: this.$t('report.reportName')
                },
                {
                    prop: 'authorName',
                    label: this.$t('industryModel.author')
                },
                {
                    prop: 'style',
                    label: this.$t('reportTemplate.type')
                },
                ],
                operationIcon: [
                    {
                        url: edit_icon,
                        alt: this.$t('dataTable.edit')
                    },
                    {
                        url: download_icon,
                        alt: this.$t('mresearch.export')
                    },
                    {
                        url: preview_icon,
                        alt: this.$t('message.preview')
                    },
                    {
                        url: export_record_icon,
                        alt: this.$t('report.exportRecord')
                    },
                    {
                        url: delete_icon,
                        alt: this.$t('dataTable.delete')
                    }
                ],
                previewContent: {},
                isPre: false,
                selectReport: {},
                asyncTaskShow: false,
                asyncTaskParams: {},
                operation: [this.$t('analyst.download')],
                asyncTaskTableColumn: [
                    {
                        prop: 'status',
                        label: this.$t('report.degreeCompletion')
                    }
                ]
            }
        },
        created() {
            this.getGroup()
            if(this.tabSelect != 0) {
                    this.params.groupId = this.myGroupList[this.tabSelect - 1].id
                }else {
                    this.params.authorId = localStorage.getItem('userId')
                }
        },
        methods: {
            queryTarget() {
                let params = {}
                if(this.tabSelect != 0) {
                    params.groupId = this.myGroupList[this.tabSelect - 1].id
                }else {
                    params.authorId = localStorage.getItem('userId')
                }
                this.params = params
            },

            async getGroup() {
                let params = {
                    userId: localStorage.getItem('userId')
                }

                const result = await this.$store.dispatch('AC_UserGroupManageServiceGetGroup', params)
                this.myGroupList = result.data.group ? result.data.group : []
            },

            createReport() {
                this.$router.push({name: 'createReport'})
            },

            // 编辑事件
            selectOperation(data) {
                if(data.type == this.$t('dataTable.edit')) {
                    this.$router.push({ path:"/mreport/myReportDetail",query: {reportId: data.data.id, name: data.data.title}});
                }else if(data.type == this.$t('mresearch.export')) {
                    this.selectReport = data.data
                    this.downLoadPdforword()
                }else if(data.type == this.$t('message.preview')) {
                    this.preView(data.data.id)
                }else if(data.type == this.$t('report.exportRecord')) {
                    this.asyncTaskParams = {
                        reportId: data.data.id,
                        userId: localStorage.getItem('userId')
                    }
                    this.asyncTaskShow = true
                }
            },

            selectAsyncTaskOperation(data) {
                if(data.type == this.$t('analyst.download')) {
                    window.open(data.data.response)
                }
            },

            preView(data){
                this.isPre=true;
                let params = { reportId: data }
                this.$axios.get('/editorback/ueditor/previewPdf',params).then((res) => {
                     this.previewContent={ reportcontent: res.data.data }
                })
            },

            hidepreview() {
                this.isPre=false;
            },

            downLoadPdforword(){
                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                this.$axios.get('/editorback/ueditor/downloadWord',{ 
                    reportId: this.selectReport.id, 
                    title: this.selectReport.title,
                    userId: localStorage.getItem('userId')
                }).then((res) => {
                    this.getPdfDownResult(res.data)
                })
            },

            getPdfDownResult(taskId) { //pdf or word 轮询接口一致
                this.$axios.post('/editorback/pdfDownTask/getPdfDownResult',{ 
                    taskId:taskId
                }).then((res) => { 
                    if (res.data.errorMsg == '任务仍在运行中') {
                        setTimeout(() => { 
                            this.getPdfDownResult(taskId)
                        }, 3000);
                        return 
                    }
                    this.$message.success(this.$t('message.success'))
                    this.$store.commit('loadingChange',{show: false})
                    
                    if (res.data.returnCode == 'error') {
                        this.$message.error(this.$t('message.fail'))
                        return
                    }

                    if(res.data){
                        window.open(res.data.data); 
                    }
                }) 
            },
        }
    }

</script>

<style lang="less" scoped>
.nav{
    padding-top: 10px;
    position: relative;
    .el-tabs{
        padding-right: 80px;
    }
    .button{
        position: absolute;
        top: 13px;
        right: 0;
        height: 34px;
    }
}
</style>
