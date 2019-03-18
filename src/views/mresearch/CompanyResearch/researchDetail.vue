<template>
    <div class="special-vue">
        <div class="guide">
            <div class="left">
                 <router-link to="/mresearch/Research">{{$t('mresearch.companyResearch')}}</router-link>
                / {{routeParams.name}}
            </div>
            <div class="right">     
                <span @click="firstPage()">首页要点</span>  
                <el-tooltip class="item" effect="dark" :content="$t('mresearch.export')" placement="bottom">
                    <i class="el-icon-upload2" @click="DownLoad()"></i>
                </el-tooltip>
            </div>
        </div>
       
        <div class="content-modify">
            <div class="queryside" :class="{ 'queryside-wrap': chosenWidth }">
                <div class="append-tree">
                    <span @click="researchFramework">
                        <i class="el-icon-circle-plus-outline"></i>{{$t('mresearch.import')}}
                     </span>
                    <div class="chosen-width" @click="chosenWidth = !chosenWidth">
                        <i class="el-icon-d-arrow-left" v-if="!chosenWidth"></i>
                        <i class="el-icon-d-arrow-right" v-if="chosenWidth"></i>
                    </div>
                </div>
                <div class="nav-tree">
                    <el-tree
                    :data="navList"
                    node-key="id"
                    ref="vueTree"
                    draggable
                    highlight-current
                    @node-expand="nodeExpand"
                    @node-collapse="nodeCollapse"
                    :default-expanded-keys="expandedKeys"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                    @node-drag-end="updateAnalyzeAspect"
                    >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label}}</span>
                        <span v-for="(item,index) in data.nickName" :key="index" >
                            <span v-if="index==0"  class="headerimg">{{item | DealUserName }}</span> 
                            <span v-else-if="index<4"  :class="'halfheaderimg-'+index" >{{item | DealUserName }}</span> 
                            <span v-else-if="index>=4 && index==data.nickName.length-1">...</span>
                        </span>      
                        <el-dropdown trigger="click">
                            <i class="el-icon-arrow-down icon"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="updateselectSection(data,'append')">{{$t('message.add')}}</el-dropdown-item>
                                <el-dropdown-item @click.native="updateselectSection(data,'updata')">{{$t('message.update')}}</el-dropdown-item>
                                <el-dropdown-item @click.native="updateselectSection(data,'delete')">{{$t('dataTable.delete')}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>      
                    </span>
                    </el-tree>
                </div>
            </div>
            <div class="tabs-content">
                <div class="tabs-header">
                    <el-tabs class="tabs-list" v-model="select" type="card" :class="{ 'tabs-list-padding': select == 'first'}">
                        <el-tab-pane :label="$t('mresearch.informationSummary')" name="first"></el-tab-pane>
                        <el-tab-pane label="AI标注" name="five"></el-tab-pane>
                        <el-tab-pane :label="$t('mresearch.informationSources')" name="second"></el-tab-pane>
                        <el-tab-pane :label="$t('mresearch.FactorSummary')" name="third"></el-tab-pane>
                        <el-tab-pane :label="$t('mresearch.researchDiagram')" name="fourth"></el-tab-pane>
                        <el-tab-pane label="公司数据" name="six"></el-tab-pane>
                    </el-tabs>
                    <div class="button-list" v-if="select == 'first'"> 
                        <i class="preview" @click="preview"><img :src="previewimg" alt=""></i>
                        <el-button class="button" type="primary" @click="changeOpen"><span v-if="opendra">{{$t('mresearch.closeDrag')}}</span><span v-if="!opendra">{{ $t('mresearch.openDrag') }}</span>  </el-button>
                        <el-button class="button" type="primary" @click="changeIntegrateByTime"> <span v-if="!integrateByTime">{{$t('mresearch.merge')}}</span> <span v-if="integrateByTime">{{$t('mresearch.normalMode')}}</span></el-button>
                    </div>
                </div>
                <!-- 此处目前不可放到el-tab-pane里边 -->
                <div class="tabs-content-list">
                    <researchModelDataList v-show="select == 'first'" :analyzeParms="analyzeParms" :routeParams="routeParams" @joinReportSection="joinReportSection" ref="researchModelDataList"></researchModelDataList>
                    <researchSourcesList v-show="select == 'second'" :analyzeParms="analyzeParms" :routeParams="routeParams" ref="infoSourceList"></researchSourcesList>
                    <FactorSummarylist v-show="select == 'third'" :analyzeParms="analyzeParms" ref="FactorSummary"></FactorSummarylist>
                    <keep-alive>  <researchDiagram v-show="select == 'fourth'" :analyzeParms="analyzeParms" :routeParams="routeParams" :parentSelect='select' @getAnalyzeAspect="getAnalyzeAspect" ref="researchDiagram"></researchDiagram></keep-alive> 
                    <queryAiLearn v-show="select == 'five'" :analyzeParms="analyzeParms" ref="queryAiLearn"></queryAiLearn>
                    <keep-alive> <treeTable  v-show="select == 'six'" :analyzeParms="analyzeParms" ref="treeTables"></treeTable></keep-alive> 
                </div>
            </div>
            <div class="time-list" v-if="select == 'first' || select == 'five'">  
                <p v-for="(times,index) in dataTime" :key="index" :class="{'clickclass':current==index}" @click="currentClick(index)">
                    <span class="v-line"></span> <span>{{times}}</span> 
                </p>
            </div>
        </div>
        <!-- 导入研究框架 -->
        <div class="wrap" v-show="researchFrameworkShow">
            <div class="base-type-content">
                <div class="header">{{$t('myTarget.companyResearch')}}
                    <i class="el-icon-close" @click="close()"></i>
                </div>
                <div class="body" v-if="step == 1">
                    <div class="base-type" v-for="item in baseTypeList" :key="item.id" @click="selectResearch(item)" v-bind:class="{'base-type-sure': item.id == baseTypeSure }">
                        <img :src="item.icon" class="base-type-left">
                        <div class="base-type-right">
                            <p>{{ item.name }}</p>
                            <p>{{ item.msg }}</p>
                        </div>
                    </div>
                </div>
                <div class="body" v-if="step == 2">
                    <el-form label-width="120px">
                        <el-form-item :label="$t('mresearch.programName')">
                            <el-input v-model="researchFrameworkTitle"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="footer">
                    <div v-if="step == 1">
                        <el-button type="primary" @click="toStep">{{$t('login.nextStep')}}</el-button>
                    </div>
                    <div v-if="step == 2">
                        <el-button type="primary" @click="addResearchFramework()">{{$t('message.confirm')}}</el-button>
                        <el-button @click="close()">{{$t('message.cancel')}}</el-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 另存为模版 -->
        <el-dialog :title="$t('reportTemplate.exportSettings')" :visible.sync="saveTemplateShow" width="800px" @close="close">
            <el-form label-width="120px" style="display: flex;">
                <el-form-item style="flex:1;" :label="$t('report.reportName')">
                    <el-input v-model="saveTemplate.title"></el-input>
                </el-form-item>
                <el-form-item style="flex:1;" :label="$t('reportTemplate.type')">
                    <el-select v-model="saveTemplate.type">
                            <el-option 
                            v-for="item in reportType" 
                            :key="item.type" 
                            :label="item.label" 
                            :value="item.type">
                            </el-option>
                        </el-select>
                </el-form-item>
            </el-form>
            <div class="save-report-content">
                <div class="nav-tree">
                    <el-tree
                    show-checkbox
                    :data="navList"
                    node-key="id"
                    @node-expand="nodeExpandSecond"
                    @node-collapse="nodeCollapseSecond"
                    :default-expanded-keys="expandedKeysSecond"
                    ref="saveReportTree"
                    highlight-current
                    :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        {{ data.label }}
                    </span>
                    </el-tree>
                </div>
                <div class="footer">
                    <el-button type="primary" @click="saveReport">{{$t('mresearch.export')}}</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog :visible.sync="appendSectionShow" width="340px" @close="close">
            <el-form :model="appendSectionForm" label-width="120px">
                <el-form-item :label="$t('reportTemplate.chapterName')">
                    <el-input v-model="appendSectionForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updataTree()">{{$t('message.confirm')}}</el-button>
                <el-button @click="close">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>

        <!-- 首页要点 -->
        <div v-show="firstPageShow" width="800px" class="firstpagebg" >
            <div class="header">
              <div>
                <span class="title"> 首页要点</span>
                <span slot="footer" class="dialog-footer">
                <el-tooltip class="item" effect="dark" content="编辑之后再刷新，原编辑内容将被覆盖" placement="top-start">
                  <el-button class="refresh" @click="Rrefresh()">刷新</el-button>
                </el-tooltip>
                <el-button type="primary" v-if="!isEdit" @click="EditFirstPage()">编辑</el-button>
                <el-button v-else @click="SavefirstPage()">保存</el-button>
                </span>
               </div>
               <div>
                 <span class="close-btn" @click="close"><i class="el-icon-close"></i></span>
               </div>
            </div>
             
            <div v-if="isEdit" class="edit-content">
                <UEditor  :defaultMsg="pageRichtext"  ref="ueditor"></UEditor>
            </div >
            <div class="edit-content" v-else v-html="pageRichtext"></div>    
        </div>

        <!-- 删除弹出框 -->
        <el-dialog :visible.sync="deleteSectionShow" width="300px" center>
            <div class="del-dialog-cnt">{{$t('message.deleteSure')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteTree()">{{$t('message.confirm')}}</el-button>
                <el-button @click="deleteSectionShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>

        <div class="pop"></div>
        <div class="pc_preview"  >
            <div class="header-fix"  >                     
                    <i class="el-icon-close" @click="hideOut()"></i>
            </div>
            <div class="viewcontent" >       
               <p v-html="htmldata" class="richText">{{htmldata}}</p>
            </div>           
        </div>
    </div>
</template>
<script>
    import researchSourcesList from '../components/researchSourcesList'
    import researchModelDataList from '../components/researchModelDataList';
    import FactorSummarylist from '../components/FactorSummarylist'
    import previewimg from "./../../../../static/img/svg/preview.svg";
    import researchDiagram from '../components/researchDiagram';
    import queryAiLearn from '../components/queryAiLearn';
    import treeTable from '../components/customTreeTable';
    import UEditor from '../../ueditor/ueditor.vue';

    export default {
        name:"ResearchDetail",
        components: {
            researchSourcesList,
            researchModelDataList,
            FactorSummarylist,
            researchDiagram,
            queryAiLearn,
            treeTable,
            UEditor
        },
        props: ['researchDetailParams'],
        data(){
            return {
                select: 'first',
                analyzeParms:{
                    analyzeAspectId:null,
                    time:null
                },
                navList: [],
                selectSection: '',
                current:null,
                saveTemplateShow: false,
                saveTemplate: {},
                reportType: [
                    {
                        label: this.$t('mresearch.companyResearch'),
                        type: '1'
                    },
                    {
                        label: this.$t('analyst.industryResearch'),
                        type: '2'
                    },
                    {
                        label: this.$t('mresearch.other'),
                        type: '3'
                    },
                ],
                dataTime:[ this.$t('mresearch.all'),"2019","2018","2017","2016","2015","2014"],
                current:null,
                chosenWidth: true,
                opendra:false,
                htmldata:'',
                baseTypeList: [],
                previewimg:previewimg,
                researchFrameworkShow: false,
                researchFrameworkForm: {},
                researchFrameworkTitle: '',
                baseTypeSure: '',
                step: 1,
                routeParams: {},
                expandedKeys: [],
                expandedKeysSecond: [],
                appendSectionShow: false,
                deleteSectionShow: false,
                appendSectionForm: {},
                newSectionTree: '',
                integrateByTime: false,
                firstPageShow: false,
                isEdit: false,
                pageRichtext: '',
                pageId: Number,
            }
        }, 
        filters: {
          DealUserName(name){
            if(name.match(/[^\u4e00-\u9fa5]/g)==null){
                return name.substring(0,1);
            }else if( name.match(/[^\u4e00-\u9fa5]/g).length &&  name.match(/[^\u4e00-\u9fa5]/g).length>0){
                return name.substring(0,2);
            }
           }
        },
        created(){
            this.routeParams = this.researchDetailParams ? this.researchDetailParams : this.$route.query
            this.queryAnalyzeAspect();
            this.select = 'first'

        },
        activated() {
              // isUseCache为false时才重新刷新获取数据
             if(!this.$route.meta.isUseCache){  
                this.routeParams = this.researchDetailParams ? this.researchDetailParams : this.$route.query
                 this.queryAnalyzeAspect();
                 this.select = 'first' ;
                 this.$refs.treeTables.QueryDataTable(); 
                 this.$refs.researchDiagram.queryDiagram()
            }
        },
        methods: {
            async firstPage(){
                // document.querySelector(".pc_preview").style.display="block";
                document.querySelector(".pop").style.display="block";
                let params={
                    "corpAnalyzeId":this.routeParams.corpId
                }
                this.pageRichtext="";
                let result = await this.$store.dispatch('AC_AnalyzeSummaryServiceQueryAnalyzeSummary', params)
                if(result.code==200){
                  this.firstPageShow=true;
                  this.pageRichtext=result.data.analyzeSummarys[0].richText;
                  this.pageId=result.data.analyzeSummarys[0].id;

                }   
            },
            EditFirstPage(){
                this.isEdit=true;
            },
            async Rrefresh(){
                let params={
                    "analyzeId": this.routeParams.corpId,
                    "refresh": 1
                }
                let result = await this.$store.dispatch('AC_CorpAnalyzManageGenAnalyzeSummry', params)
                if(result.code==200){
                  this.$message.success("刷新成功！");
                  this.firstPage();
                }  

            },
            async SavefirstPage(){
                let params={
                    "corpAnalyzeId": this.routeParams.corpId,
                    "id": this.pageId,
                    "richText": this.$refs.ueditor.getUEContent()
                }
                let result = await this.$store.dispatch('AC_AnalyzeSummaryServiceUpdateAnalyzeSummary', params)
                if(result.code==200){
                  this.isEdit=false;
                //   this.firstPageShow=false;

                }   
            },

            nodeExpand(data,node,s) {
                this.expandedKeys.push(data.id)
            },

            nodeCollapse(data,node,s) {
                this.expandedKeys.forEach((item,index) => {
                    if(item == data.id) {
                        this.expandedKeys.splice(index,1)
                    }
                })
            },

            nodeExpandSecond(data,node,s) {
                this.expandedKeysSecond.push(data.id)
            },

            nodeCollapseSecond(data,node,s) {
                this.expandedKeysSecond.forEach((item,index) => {
                    if(item == data.id) {
                        this.expandedKeysSecond.splice(index,1)
                    }
                })
            },

            async updateAnalyzeAspect(draggingNode, dropNode, ev) {
                let type
               
                if (dropNode.data.id == draggingNode.data.id) {
                    return
                }

                if (ev == 'before') {
                    type = 1
                }else if (ev == 'inner') {
                    type = 2
                }else if (ev == 'after') {
                    type = 3
                }

                let params = {
                    dragAnalyzeAspectId: draggingNode.data.id,
                    destAnalyzeAspectId: dropNode.data.id,
                    type: type
                }

                let result = await this.$store.dispatch('AC_RenewSortUpdateSort', params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.queryAnalyzeAspect()
            },

            updateselectSection (data,type) {
                this.selectSection = data
                if(type == 'append') {
                    this.appendSectionForm.value = 3
                    this.appendSectionShow = true
                }else if(type == 'updata') {
                    this.appendSectionShow = true
                    this.appendSectionForm = data
                }else {
                    this.deleteSectionShow = true
                }
            },

            async appendTree() {
                let params = {
                    bizModel: this.routeParams.bmId,
                    name: this.appendSectionForm.name,
                    type: 0,
                    parent: this.selectSection.id
                }   
                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                let result = await this.$store.dispatch('AC_AnalyzeAspectManageInsertAnalyzeAspect', params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})
                this.newSectionTree = result.data
                this.queryAnalyzeAspect();
                this.close()
            },

            async updataTree() {
                if(!this.appendSectionForm.name) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                if(!this.appendSectionForm.id) {
                    this.appendTree()
                }

                let params = {
                    bizModel: this.routeParams.bmId,
                    id: this.appendSectionForm.id,
                    name: this.appendSectionForm.name,
                }

                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                let result = await this.$store.dispatch('AC_AnalyzeAspectServiceUpdateAnalyzeAspect', params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})
                this.queryAnalyzeAspect();
                this.close()
            },

            async deleteTree() {
                let params = {
                    id: this.selectSection.id
                }

                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                let result = await this.$store.dispatch('AC_AnalyzeAspectManageRewriteAnalyzeAspectDelete', params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})
                this.queryAnalyzeAspect();
                this.close()
            },

            changeOpen(){
                this.opendra = !this.opendra
                this.$refs.researchModelDataList.changeDar(this.opendra);
            },

            changeIntegrateByTime() {
                this.integrateByTime = !this.integrateByTime
                this.$refs.researchModelDataList.changeIntegrateByTime(this.integrateByTime)
            },

            researchFramework() {
                this.queryBaseType()
                this.researchFrameworkShow = true
            },

            async queryBaseType() {
                let params = {
                    pageNum: 1,
                    pageSize: 20,
                    scenario: 4
                }

                const result = await this.$store.dispatch('AC_BaseTypeServiceQueryBaseType', params)
                this.baseTypeList = result.data.baseTypes 
            },

            selectResearch(data) {
                this.baseTypeSure = data.id
                this.$message.success(this.$t('message.chosen') + data.name)
            },

            toStep() {
                if (!this.baseTypeSure) {
                   this.$message.error(this.$t('message.noChosen')) 
                   return
                }
                this.step = 2
            },

            async addResearchFramework() {
                if(!this.researchFrameworkTitle) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }
                let params = {
                    formModelId: this.baseTypeSure,
                    modelId: this.routeParams.bmId,
                    newRootName: this.researchFrameworkTitle,
                    userId: localStorage.getItem('userId')
                }
               
                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                let result = await this.$store.dispatch('AC_AnalyzeAspectTreeImportIntoModel', params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})
                this.queryAnalyzeAspect();
                this.close()
            },

            handleNodeClick(data) {
                this.selectSection = data;
                this.analyzeParms.analyzeAspectId= data.id;
            },

            //通过id获取单个章节并定位该章节
            async getAnalyzeAspect(id) {
                this.select = 'first'
                let params = {
                    id: id
                }
                let result = await this.$store.dispatch('AC_AnalyzeAspectServiceGetAnalyzeAspect',params)
                let selectTree = result.data.analyzeAspect
                this.expandedKeys.push(selectTree.id)
                this.handleNodeClick(selectTree)
                this.$nextTick(() => {
                    this.$refs.vueTree.setCurrentKey(selectTree.id);
                })
            },

            async queryAnalyzeAspect() {
                let params = {
                    bizModelId: this.routeParams.bmId,
                    corpAnalyzeId:this.routeParams.corpId,
                    pageNum:1,
                    pageSize:50
                }
                this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
                let result = await this.$store.dispatch('AC_AnalyzeAspectTreeAnalyzeAspectTreeContainUser',params)
                this.navList = result.data.list ? result.data.list : []
                this.$store.commit('loadingChange',{show: false})
                if(this.newSectionTree) {
                    this.handleNodeClick(this.newSectionTree)
                    this.$nextTick(() => {
                        this.$refs.vueTree.setCurrentKey(this.newSectionTree.id);
                        this.newSectionTree = ''
                    })
                    return
                }
                this.handleNodeClick(this.navList[0])
                this.$nextTick(() => {
                    if(this.$route.query.analyzeAspectId){
                       this.$refs.vueTree.setCurrentKey(this.$route.query.analyzeAspectId);
                    }else{
                        this.$refs.vueTree.setCurrentKey(this.navList[0].id);
                    }
                })
            },

            currentClick(index){
                this.current=index;
                if(index==0){
                  this.analyzeParms.time= null;
                }else{
                  this.analyzeParms.time= this.dataTime[index];
                }
            },

            DownLoad(){
                this.saveTemplateShow = true
                this.saveTemplate.title = this.routeParams.name
                setTimeout(() => {
                    let arr = []
                    this.navList.forEach(item => {
                        arr.push(item.id)
                    })
                    this.$refs.saveReportTree.setCheckedKeys(arr)
                })
            },
            
            async saveReport() {
                if(!this.saveTemplate.title || !this.saveTemplate.type) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                let halfTreeList = this.$refs.saveReportTree.getHalfCheckedNodes()
                let treeList = this.$refs.saveReportTree.getCheckedNodes()
                let tree = Array.concat(halfTreeList,treeList)
                let params = {
                    bizModelId: this.routeParams.bmId,
                    corpAnalyzeId: this.routeParams.corpId,
                    rootMenu: tree,
                    stockCode: this.routeParams.corpCode,
                    userId: localStorage.getItem('userId'),
                    title: this.saveTemplate.title,
                    type: this.saveTemplate.type
                }

                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                let result = await this.$store.dispatch('AC_AnalyzeAspectTreeCreateReport', params)
                result.code == 200 ? this.$message.success(this.$t('message.toMyReport')) : this.$message.error(this.$t('message.fail'))
                this.$store.commit('loadingChange',{show: false})
                this.close()
            },

            async preview() {        
                let params = {
                    "analyzeAspectId": this.selectSection.id,
                    "orderBy": "sort asc",
                    "stockCode": this.routeParams.corpCode,
                }
                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                let result = await this.$store.dispatch('AC_LabelDisplayQueryTagclassLabel', params);
                if(result.code==200){this.htmldata=result.data.data;}
                document.querySelector(".pc_preview").style.display="block";
                document.querySelector(".pop").style.display="block";
                this.$store.commit('loadingChange',{show: false})

            },
            
            close() {
                this.saveTemplateShow = false
                this.saveTemplate = {}
                this.researchFrameworkShow = false
                this.step = 1
                this.baseTypeSure = ''
                this.researchFrameworkTitle = ''
                this.appendSectionForm = {}
                this.appendSectionShow = false
                this.deleteSectionShow = false
                document.querySelector(".pop").style.display="none";
                this.firstPageShow=false;
            },

            hideOut(){           
               document.querySelector(".pc_preview").style.display="none";
               document.querySelector(".pop").style.display="none";
            },

            joinReportSection(data) {
                this.$emit('joinReportSection',data)
            },

        }
    }
</script>
<style lang="less" scoped>
.special-vue{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .guide{
        display: flex;
        justify-content: space-between;
        background: #1c84c6;
        height: 35px;
        color: #fff;
        line-height: 35px;
        padding-right: 0px;
        font-size: 1.3rem;
        padding: 0 0 0 2rem;  
        .left a{
            color:#fff;
        } 
    }
    .guide .right{
        padding-right: 40px;
        img{
            font-size: 2rem;
            margin-right: 15px;
            cursor: pointer;
            vertical-align: text-bottom;
        }
    }
    .guide .right i{
        font-size: 2rem;
        margin-right: 15px; 
        cursor: pointer;
    }
}

.content-modify{
    flex: 1;
    display: flex;
    background: #ddd;
    .queryside-wrap{
        width: 200px;
    }
    .queryside{
        min-width: 200px;
        font-size: 1.5rem;  
        border-right: 1px solid #ddd; 
        background: #fff;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .append-tree{
        text-align: center;
        height: 36px;
        line-height: 36px;
        background: #e2e4e9;
        cursor: pointer;
        position: relative;
        .chosen-width{
            font-size: 18px;
            position: absolute;
            top: 0;
            right: 2px;
        }
        .chosen-width:hover{
            color: rgba(0,0,0,.5)
        }
    }
    .nav-tree{
        display: flex;
        box-sizing: border-box;
        height: 100%;
        font-size: 14px;
        border-right: 1px solid #ddd;
        overflow: auto;
        background: #fff;
        .el-tree{
            flex: 1;
        }
        
        .headerimg{
            border-radius: 50%;
            background: #4da9ec;
            width: 24px;
            height: 24px;
            display: inline-block;
            line-height: 24px;
            text-align: center;
            color: #52481e;
            font-size: 1rem;
        }
        .halfheaderimg-1,.halfheaderimg-2,.halfheaderimg-3{
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: inline-block;
            line-height: 24px;
            text-align: center;
            color: #52481e;
            font-size: 1rem;
            margin-left: -9px;
        }
              
      .halfheaderimg-1{
        background: #558aac;
      }
       .halfheaderimg-2{
        background:#f56c6c  ;
      }
       .halfheaderimg-3{
        background: #e16f09;
      }
       .halfheaderimg-4{
        background: #52481e;
      }
      
    }
    .tabs-content{
        flex: 1;
        background: #f4f5f9;
        padding: 5px;
        overflow: auto;

        .tabs-header{
            position: relative;
            background: #fff;
            padding: 5px;
            .tabs-list-padding{
                padding-right: 180px;
            }
            .button-list{
                position: absolute;
                top: 5px;
                right: 5px;
                width: 180px;
                height: 40px;
                text-align: right;
                padding-top: 5px;
                .el-button{
                    margin-left: 5px;
                }
                .preview{
                    display: inline-block;
                    height: 32px;
                    line-height: 32px;
                }
            }
        }

        .tabs-content-list{
            padding: 5px;
            background: #fff;
        }
    }
    .time-list{
        overflow: auto;
        background: #f4f5f9;
        padding: 10px;
        box-sizing: border-box;
        p{
            margin: 5px 0;
            font-size: 1.3rem;
             cursor: pointer;
        }
        span{
          color: #559ff8;
          vertical-align: top;
        }
        .clickclass{
            background: #559ff8;
            span{
            color: #fff;
           }
        }
      
        .v-line{
             display: inline-block;
             border-right: 3px solid #559ff8;  
             width: 1px;
             height: 20px;
        }
    }
}

.save-report-content{
    height: 400px;
    .nav-tree{
        overflow: auto;
        height: 350px;
    }
    .footer{
        padding-top: 10px;
        text-align: center;
    }
}
.firstpagebg{
    width: 800px;
    margin: 50px auto;
    background: #fff;
    z-index: 2009;
    border-radius: 2px;
    .header{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #dcdfe6;
        padding: 20px 30px;
        font-size: 16px;
        .refresh{
         margin-left: 30px;
        }
        .close-btn{
            cursor: pointer;
        }
    }
    .edit-content{
         padding: 10px 20px;
    }

    
}
.pop{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
    opacity: 0.3;
    display: none;
    z-index: 2007;
}
.pc_preview{
        display: none;
        position: absolute;
        top: 69%;
        left: 20%;
        width: 850px;
        height: 600px;
        margin-top: -425px;
        background: #fff;
        z-index: 9999;
        overflow: scroll;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: left;
        font-size: 14px;
        line-height: 33px;
        padding: 30px;
        .header-fix{
        cursor: pointer;
        height: 10px;
        line-height: 34px;
        text-align: right;
        color: #0e8aca;
        padding-right: 44px;
        font-size: 1.6rem;
        position: fixed;
        width: 850px;
            box-sizing: border-box;
    }
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
            display: flex;
            .base-type{
                display: flex;
                flex: 1;
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

.el-button{
    padding: 8px;
    font-size: 12px;
}
</style>
<style scoped>
 .tabs-content >>> .el-tabs {
     background: #fff;
 }
 </style>