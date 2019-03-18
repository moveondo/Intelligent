<template>
    <div class="list-wrap">
        <div class="nav">
            <el-tabs v-model="tabSelect" @tab-click="queryTarget">
                <el-tab-pane :label="$t('myTarget.myTarget')"></el-tab-pane>
                <el-tab-pane :label="item.name" v-for="item in myGroupList" :key="item.id"></el-tab-pane>
            </el-tabs>
            <el-button class="button" type="primary" @click="createTarget()">{{$t('dataTable.create')}}</el-button>
        </div>
        <ul class="target-list" v-loading="loading">
            <div v-if="targetList.length == 0 && !loading" class="noData">{{$t('message.noData')}}</div>
            <li class="target-content" v-for="items in targetList" :key="items.index">
                <div class="target-title"><div>{{ items[0].targetType }}</div></div>
                <div class="target-list-content" v-for="item in items" :key="item.id">
                    <div class="target-corp-content">
                        <p class="target-corp">{{ item.corpName }} <span>{{ item.corpCode }}</span>  <span>{{$t('myTarget.researcher')}}：{{ item.name }}</span></p>
                        <el-button class="target-corp-update" type="primary" v-if="tabSelect != 0" @click="deleteGroup(item)">{{$t('dataTable.delete')}}</el-button>
                        <el-button class="target-corp-update" type="primary" v-if="tabSelect == 0" @click="createTarget(item)">{{$t('myTarget.share')}}</el-button>
                    </div>
                    <el-collapse class="target-table" @change="handleChange(item)" accordion>
                        <el-collapse-item :title="$t('myTarget.companyResearch')">
                            <div class="corpAnalyze-list" v-for="corpAnalyze in item.corpAnalyzeList" :key="corpAnalyze.id" @click="toResearchDetail(corpAnalyze)">
                                <div class="corpAnalyze">
                                    <img class="icon" :src="corpAnalyze.icon" >
                                    <span>{{ corpAnalyze.baseTypeName }}</span>
                                </div>
                                <div class="corpAnalyze">
                                    <span>{{ corpAnalyze.status }}</span>
                                </div>
                                <div class="corpAnalyze">
                                    <img class="icon" src="../../../../static/img/ai-rate.png">
                                    <span>{{ count(corpAnalyze.aiRate )}}</span>
                                </div>
                                <div class="corpAnalyze">
                                    <img class="icon" src="../../../../static/img/rate.png">
                                    <span>{{ count(corpAnalyze.rate) }}</span>
                                </div>
                            </div>
                          <span class="create-right" @click="createResearch(item)">【 {{$t('dataTable.create')}} 】</span>
                        </el-collapse-item>

                        <el-collapse-item :title="$t('myTarget.researchReport')">
                            <div class="corpAnalyze-list" v-for="report in item.reportList" :key="report.id">
                                <div class="corpAnalyze"  @click="toReportDetail(report)">
                                    <span>{{ report.title}}</span>
                                </div>
                                <div>
                                  <span class="create-right" @click="downPdforWord(report)" :class="{'no-report-word': !report.wordUrl }">【 {{$t('myTarget.downloadWORD')}} 】</span>
                                </div>
                            </div>
                        </el-collapse-item>
                        
                        <el-collapse-item>
                            <div slot="title">
                                <span>{{ $t('myTarget.information') }}</span>
                                <el-button type="primary" style="padding:6px 10px" @click="uploadShow(item)">
                                    <img :src="uploadImg" alt="">
                                    {{$t('myTarget.upload')}}
                                </el-button>
                            </div>
                            <div class="new-link-list" v-for="(newLink,index) in item.newLinkList" :key="index">
                                <div class="new-link-title">{{ newLink[0].typeName }}</div>
                                <div class="new-link-body">
                                    <div v-for="(link,index) in newLink" :key="index" @click="toNewLink(link)">{{ link.title }}</div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </li>
        </ul>

        <div class="wrap" v-show="createResearchShow">
            <div class="base-type-content">
                <div class="header">{{$t('myTarget.companyResearch')}}
                    <i class="el-icon-close" @click="closeShow()"></i>
                </div>
                <div class="body">
                    <div class="base-type" v-for="item in baseTypeList" :key="item.id" @click="selectResearch(item)" v-bind:class="{'base-type-sure': item.id == baseTypeSure }">
                        <img :src="item.icon" class="base-type-left">
                        <div class="base-type-right">
                            <p>{{ item.name }}</p>
                            <p>{{ item.msg }}</p>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <el-button type="primary" @click="addResearch()">{{$t('message.confirm')}}</el-button>
                    <el-button @click="closeShow()">{{$t('message.cancel')}}</el-button>
                </div>
            </div>
        </div>

        <!-- 创建新标 -->
        <el-dialog :title="$t('myTarget.myTarget')" :visible.sync="createTargetShow" width="400px" @close="closeShow">
            <el-form label-width="120px">
                <queryblurry ref="queryblurryChild"></queryblurry>
                <el-form-item :label="$t('myTarget.targetType')"> 
                    <el-select style="width:100%" v-model="targetType">
                        <el-option
                        v-for="item in dataDictionaryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item :label="$t('header.industry')" placeholder=""> 
                    <el-select style="width:100%" v-model="businessId">
                        <el-option
                        v-for="item in businessList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> 
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addTarget">{{$t('message.confirm')}}</el-button>
                <el-button @click="createTargetShow = false">{{$t('message.cancel')}}</el-button>
            </span> 
        </el-dialog>

        <!-- 分享小组 -->
        <el-dialog :title="$t('myTarget.myTarget')" :visible.sync="upDateTargetShow" width="400px" @close="closeShow">
            <el-form label-width="100px">
                <el-form-item :label="$t('dataTable.group')" placeholder=""> 
                    <el-select style="width:100%" v-model="groupId" >
                        <el-option
                        v-for="item in myGroupList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> 
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateTarget">{{$t('message.confirm')}}</el-button>
                <el-button @click="upDateTargetShow = false">{{$t('message.cancel')}}</el-button>
            </span> 
        </el-dialog>

        <!-- 导入新闻链接 -->
        <el-dialog center :visible.sync="uploadNewLinkShow" width="450px" @close="closeShow">
            <div slot="title" >
                <el-radio v-model="radio" label="1">{{ $t('myTarget.news')}}</el-radio>
                <el-radio v-model="radio" label="2">{{ $t('myTarget.upload') }}</el-radio>
            </div>

            <el-form label-width="100px" v-if="radio == 1">
                <el-form-item :label="$t('myTarget.webLinks')" placeholder=""> 
                    <el-input type="input" v-model="uploadNewLinkForm.url"></el-input>
                </el-form-item>
                <el-form-item :label="$t('myTarget.title')" placeholder=""> 
                    <el-input type="input" v-model="uploadNewLinkForm.title"></el-input>
                </el-form-item> 
            </el-form>

            <el-form label-width="100px" v-if="radio == 2">
                <el-form-item> 
                    <div style="display:flex;">
                        <el-input style="flex:1;" type="input" v-model="uploadReportForm.title"></el-input>
                        <el-upload
                        class="upload-demo"
                        action="/"
                        :before-upload="beforeUpload"
                        :file-list="fileList">
                            <el-button size="small" type="primary">{{$t('myTarget.upload')}}</el-button>
                        </el-upload>
                    </div>
                </el-form-item> 
                <el-form-item :label="$t('reportTemplate.type')"> 
                    <el-select style="width:100%" v-model="uploadReportForm.infoCatagoryId" >
                        <el-option
                        v-for="item in infoCatagorys"
                        :key="item.id"
                        :label="item.infoSourceName" 
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> 
            </el-form>

             <el-form label-width="100px">
                <el-form-item :label="$t('task.source')" placeholder=""> 
                    <el-input type="input" v-model="uploadForm.source"></el-input>
                </el-form-item>
                <el-form-item :label="$t('industryModel.author')" placeholder=""> 
                    <el-input type="input" v-model="uploadForm.author"></el-input>
                </el-form-item> 
                <el-form-item :label="$t('industryModel.publishTime')" placeholder=""> 
                    <el-date-picker
                    v-model="uploadForm.publishTime"
                    type="date">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="uploadNewLink()">{{$t('message.confirm')}}</el-button>
                <el-button @click="uploadNewLinkShow = false">{{$t('message.cancel')}}</el-button>
            </span> 
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog :visible.sync="deleteGroupShow" width="300px" center>
            <div class="del-dialog-cnt">{{$t('message.deleteSure')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureDelete">{{$t('message.confirm')}}</el-button>
                <el-button @click="deleteGroupShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import queryblurry from '../../mresearch/components/queryblurry';
import uploadImg from '../../../../static/img/svg/upload-show.svg'
export default {
  data() {
    return {
        tabSelect: '0',
        targetList: [],
        myGroupList: [],
        businessList: [],
        dataDictionaryList: [],
        createResearchShow: false,
        createTargetShow: false,
        upDateTargetShow: false,
        loading: false,
        createTargetForm: {},
        baseTypeSure: '',
        selectResearchData: {},
        baseTypeList: [],
        uploadReportForm: {},
        uploadNewLinkForm: {},
        uploadNewLinkShow: false,
        fileList: [],
        businessId: '',
        targetType: '',
        groupId: '',
        radio: '1',
        infoCatagorys: [],
        uploadForm: {},
        uploadImg: uploadImg,
        deleteGroupShow: false,
        selectDeleteGroupData: {}
    }
  },
  components:{
    queryblurry
  },
  created() {
      this.getGroup()
      this.queryTarget()
  },
    methods: {
        async queryTarget() {
            this.loading = true
            let targetList = []
            let params = {}
            
            if(this.tabSelect != 0) {
                params.groupId = this.myGroupList[this.tabSelect - 1].id
            }else {
                params.userId = localStorage.getItem('userId')
            }
        
            const result = await this.$store.dispatch('AC_TargetCorpManageQueryTargetCorpAnalyze', params)
            this.targetList = result.data.targetCropAnalyzeMap

            for(let item in result.data.targetCropAnalyzeMap) {
                targetList.push(result.data.targetCropAnalyzeMap[item])
            }
            this.targetList = targetList
            this.loading = false
        },

        async getGroup() {
            let params = {
                userId: localStorage.getItem('userId')
            }

            const result = await this.$store.dispatch('AC_UserGroupManageServiceGetGroup', params)
            this.myGroupList = result.data.group ? result.data.group : []
        },

        downPdforWord(item) {
            if(!item.wordUrl) {
                this.$message.error(this.$t('message.exportReport'))
                return
            }

            window.open(item.wordUrl)
        },
        
        async queryBusiness() {
            let params = {
                pageNum: 1,
                pageSize: 50
            }

            const result = await this.$store.dispatch('AC_BusinessServiceQueryBusiness', params)
            this.businessList = result.data.businesss 
        },

        async queryDataDictionary() {
            let params = {
                type: "targetType"
            } 

            const result = await this.$store.dispatch('AC_DataDictionaryServiceQueryDataDictionary', params)
            this.dataDictionaryList = result.data.dataDictionarys 
        },

        async queryBaseType() {
            let params = {
                pageNum: 1,
                pageSize: 10,
                scenario:1
            }

            const result = await this.$store.dispatch('AC_BaseTypeServiceQueryBaseType', params)
            this.baseTypeList = result.data.baseTypes 
        },

        createTarget(data) {
            if(data) {
                this.createTargetForm = data
                this.upDateTargetShow = true
                return
            }

            this.queryBusiness()
            this.queryDataDictionary()
            this.createTargetShow = true
        },

        createResearch() {
            this.queryBaseType()
            this.createResearchShow = true
        },

        selectResearch(data) {
            this.baseTypeSure = data.id
            this.$message.success(this.$t('message.chosen') + ' ' + data.name)
        },

        async addResearch() {
            if(!this.baseTypeSure) {
                this.$message.error(this.$t('message.noChosen'))
                return
            }

            let params = {
                businessId: this.selectResearchData.businessId,
                corpCode: this.selectResearchData.corpCode,
                corpCodeName: this.selectResearchData.corpName,
                groupId: this.selectResearchData.groupId,
                type: this.baseTypeSure,
                userId: localStorage.getItem('userId')
            }
            
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const result = await this.$store.dispatch('AC_TargetCorpManageInsertCorpAnalyze', params)
            this.$store.commit('loadingChange',{show: false})
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.closeShow()
            this.queryTarget()
        },

        async addTarget() {
            this.createTargetForm.corpCode =this.$refs.queryblurryChild.stockCodeValue
            this.createTargetForm.corpName=this.$refs.queryblurryChild.stockNamevalue
            if(!this.createTargetForm.corpName || !this.createTargetForm.corpCode || !this.targetType || !this.businessId){
                this.$message.error(this.$t('message.empty'))
                return
            }

            if(this.tabSelect != 0) { 
                this.createTargetForm.groupId = this.myGroupList[this.tabSelect - 1].id
            }

            this.createTargetForm.businessId = this.businessId
            this.createTargetForm.targetType = this.targetType
            this.createTargetForm.userId = localStorage.getItem('userId')
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const result = await this.$store.dispatch('AC_TargetCorpServiceAddTargetCorp', this.createTargetForm)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            this.closeShow()
            this.queryTarget()
        },

        async updateTarget() {
            if(!this.groupId) {
                this.$message.error(this.$t('message.empty'))
                return
            }
            let params = {
                groupId: this.groupId,
                targetCorpId: this.createTargetForm.id
            }
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const result = await this.$store.dispatch('AC_GroupTargetCorpManageRewriteAddGroupTargetCorp', params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            this.closeShow()
        },

        deleteGroup(data) {
            this.deleteGroupShow = true
            this.selectDeleteGroupData = data
        },

        async sureDelete() {
            let params = {
                groupId: this.myGroupList[this.tabSelect - 1].id,
                targetCorpId: this.selectDeleteGroupData.id
            }
            
            const result = await this.$store.dispatch('AC_GroupTargetCorpManageRewriteDeleteGroupTargetCorp', params);
            result.code == '200' ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.deleteGroupShow = false
            this.queryTarget()
        },

        closeShow() {
            this.createResearchShow = false
            this.createTargetShow = false
            this.upDateTargetShow = false
            this.uploadNewLinkShow = false
            this.createTargetForm = {}
            this.uploadReportForm = {}
            this.uploadNewLinkForm = {}
            this.uploadForm = {}
            this.fileList = []
            this.baseTypeSure = ''
            this.businessId = ''
            this.targetType = ''
            this.groupId = ''
            if(this.$refs.queryblurryChild) {
                this.$refs.queryblurryChild.stockCodeValue = ''
                this.$refs.queryblurryChild.stockNamevalue = ''
            }
        },

        toNewLink(data) {
            if(!data.url){
                this.$message.error(this.$t('message.noData'))
                return
            }

            window.open(data.url)
        },

        toReportDetail(report) { 
            let params={
                reportId: report.id,
                name: report.title
            }
            
            this.$router.push({ path: '/mreport/myReportDetail', query: params })
        },

        toResearchDetail(data) {
            let params={
                bmId: data.bmId,
                corpId: data.id,
                name: data.corpName,
                corpCode: data.corpCode,
            }

            this.$router.push({ path: '/mresearch/researchDetail', query: params })
        },

        count(data) {
            let num
            if (data) {
                num = Number.parseInt(data*100) + '%'
            }else {
                num = '0%'
            }
            return num
        },

        handleChange(item) {
            this.selectResearchData = item
            if(!item.newLinkList || item.newLinkList.length == 0) {
                this.queryNewLink(item)
            }
        },

        //获取新闻链接列表
        async queryNewLink(item) {
            let params = {
                targetCorpId: item.id,
            }
            const result = await this.$store.dispatch('AC_UploadReportQueryUpload', params)
            let data = result.data.map ? result.data.map : {}
            let newLinkList = []
            for(let i in data) {
                newLinkList.push(data[i])
            }
            this.$forceUpdate();
            this.$set(item,'newLinkList',newLinkList)
        },

        uploadShow(data) {
            this.selectResearchData = data
            this.queryInfoCatagory()
            this.uploadNewLinkShow = true
        },

        async queryInfoCatagory() {
            let params = {
                pageNum: 1,
                pageSize: 50
            }
            const result = await this.$store.dispatch('AC_InfoCatagoryServiceQueryInfoCatagory', params)
            this.infoCatagorys = result.data.infoCatagorys ? result.data.infoCatagorys : []
        },

        beforeUpload(file){
            let fd = new FormData();
            fd.append('file',file);
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            let uploadUrl = location.pathname == '/reportManager/' ? 'http://tfapi.hipland.net/upload/ueditor/uploadFile' : 'http://tftest.hipland.net/upload/ueditor/uploadFile'
            this.$axios.post(uploadUrl,fd).then(res => {
                    this.$set(this.uploadReportForm,"title", file.name)
                    this.uploadReportForm.fileUrl = res.data
                    this.$store.commit('loadingChange',{show: false})
            })
            return false
        },

        async uploadReport() {
            if(!this.uploadReportForm.title || !this.uploadReportForm.fileUrl) {
                this.$message.error('文件尚未导入完成')
                return
            }

            this.uploadReportForm.stockCode = this.selectResearchData.corpCode
            this.uploadReportForm.stockName = this.selectResearchData.corpName
            this.uploadReportForm.targetCorpId = this.selectResearchData.id
            let params = Object.assign(this.uploadReportForm,this.uploadForm)

            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const result = await this.$store.dispatch('AC_UploadReportUploadReport', params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            this.queryNewLink(this.selectResearchData)
            this.closeShow()
        },

        async uploadNewLink() {
            if(this.radio == 2) {
                this.uploadReport()
                return
            }

            if(!this.uploadNewLinkForm.title || !this.uploadNewLinkForm.url || !this.uploadForm.publishTime) {
                this.$message.error(this.$t('message.empty'))
                return
            }
           
            this.uploadNewLinkForm.stockCode = this.selectResearchData.corpCode
            this.uploadNewLinkForm.stockName = this.selectResearchData.corpName
            this.uploadNewLinkForm.targetCorpId = this.selectResearchData.id
            let params = Object.assign(this.uploadNewLinkForm,this.uploadForm)

            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const result = await this.$store.dispatch('AC_UploadReportShareNews', params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            this.queryNewLink(this.selectResearchData)
            this.closeShow()
        },
    },
  
  
}

</script>

<style lang="less" scoped>
.list-wrap{
    background: #f4f5f7;
    min-height: 100%;
}

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

.target-list{
    padding-top: 10px;
    padding-bottom: 20px;
    .target-content{
        background: #fff;
        padding-bottom: 30px;
        margin-bottom: 20px;
        .target-title{
            height: 40px;
            padding: 10px 0 10px 20px;
            font-size: 24px;
            line-height: 30px;
            border-bottom: 1px solid #e3e0e0;
            div {
                box-sizing: border-box;
                min-width: 106px;
                padding: 0 20px;
                display: inline-block; 
                height: 40px;
                border: 1px solid #409eff;
                border-radius: 4px;
                background: #deebff;
                color: #409eff;
                text-align: center;
                line-height: 40px;
            }
        }
        .target-list-content{
            padding: 15px 0;
        }
        .target-corp-content{
            height: 34px;
            line-height: 34px;
            padding: 11px 30px;
            .target-corp{
                float: left;
                font-size: 20px;
                span{
                    font-size: 16px;
                    margin-left: 15px;
                }
            }
            .target-corp-update{
                float: right;
            }
        }
        
        .target-table{
            margin: 0 22px 0 50px;
            border-top: 0;
            .title{
                .title-left{
                    float: left;
                }
                .title-center{
                    float: right;
                }
                .title-right{
                    float: right;
                    width: 60px;
                    height: 30px;
                    margin-right: 10px;
                    font-size: 12px;
                    text-align: center;
                    background: #409eff;
                    line-height: 30px;
                    color: #fff;
                    margin-top: 9px;
                    border-radius: 4px;
                }
            }
            
        }
        
    }
}
.noData{
    font-size: 24px;
    text-align: center;
}
.corpAnalyze-list{
    height: 50px;
    display: flex;
    line-height: 50px;
    cursor: pointer;
    .corpAnalyze{
        flex: 1;
        padding-left: 20px;
        img{
            margin-bottom: -4px;
            width: 18px;
            height: 18px;
        }
    }
}

 .create-right{
    display: inline-block;
    height: 30px;
    margin-top: 10px;
    font-size: 12px;
    line-height: 30px;
    color: #409eff;
    cursor: pointer;
}

.no-report-word{
    color: rgba(0, 0, 0, .5);
}

.corpAnalyze-list:hover {
    background: #EBEEF5;
}

.wrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(0,0,0,.5);
    overflow: auto;
    .base-type-content{
        width: 600px;
        margin: 15vh auto 0;
        background: #fff;
        border-radius: 8px;
        .header{
            height: 46px;
            padding-left: 30px;
            position: relative;
            font-size: 22px;
            line-height: 46px;
            
            i{
                position: absolute;
                right: 5px;
                top: 5px;
                font-size: 18px;
                color: #2d2320;
            }
        }
        .body{
            padding: 20px 30px;
            border-bottom: 1px solid #ebecf0;
            border-top: 1px solid #ebecf0;
            overflow: hidden;
            .base-type{
                display: flex;
                box-sizing: border-box;
                width: 50%;
                min-height: 135px;
                float: left;
                padding: 14px 20px;
                cursor: pointer;
                .base-type-left{
                    width: 50px;
                    height: 50px;
                    margin-right: 14px;
                }
                .base-type-right{
                    flex: 1;
                    p:nth-child(1){
                        line-height: 30px;
                        font-size: 18px;
                        color: #212121;
                    }
                    p:nth-child(2) {
                        margin-top: 5px;
                        line-height: 24px;
                        color: #8a8b8d;
                    }
                }
            }
            .base-type-sure{
                background: #edeef1;
            }
            .base-type:hover{
                background: #edeef1;
            }
        }
        .footer{
            height: 40px;
            padding-right: 10px;
            text-align: right;
            padding-top: 10px;
        }
    }
}
.new-link-list{
    display: flex;
    padding-top: 10px; 
    .new-link-title{
        min-width: 80px;
        color: #409eff;
    }
    .new-link-body{
        flex: 1;
        div {
            padding: 5px 0;
            cursor: pointer;
        }
    }
    .new-link-body div:hover {
        background: rgba(0,0,0,.1);
    }
}
.el-input{
    width: 100%;
}
</style>
