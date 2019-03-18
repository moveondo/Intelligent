<template>
    <div class="special-vue">
        <div class="guide">
            <div class="left">
                <router-link to="/mreport/reportTemplate">{{$t('reportTemplate.reportTemplate')}}</router-link>
                / {{typeName}}
            </div>
            <div class="right">
                 <el-tooltip class="item" effect="dark" :content="$t('reportTemplate.templateVariableList')" placement="bottom">
                    <i class="el-icon-tickets" @click="queryTemplateVariable"></i>
                </el-tooltip>   
                 <el-tooltip class="item" effect="dark" :content="$t('dataTable.save')" placement="bottom">
                   <img :src="keepimg" @click="submit()" />
                </el-tooltip>
                 <el-tooltip class="item" effect="dark" :content="$t('message.preview')" placement="bottom">
                      <i class="el-icon-view" @click="preView()"></i>
                </el-tooltip>
            </div>
        </div>
        
         <div class="content-modify">
            <div class="queryside" :class="{ 'queryside-wrap': chosenWidth }">
                <div class="append-tree">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-circle-plus-outline"></i>{{$t('message.add')}}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item,index) in options" :key="index" @click.native="appendTree(item)">{{item.label}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="chosen-width" @click="chosenWidth = !chosenWidth">
                        <i class="el-icon-d-arrow-left" v-if="!chosenWidth"></i>
                        <i class="el-icon-d-arrow-right" v-if="chosenWidth"></i>
                    </div>
                </div>
                <div class="nav-tree">
                    <el-tree
                    :data="navList"
                    draggable
                    node-key="id"
                    ref="vueTree"
                    highlight-current
                    @node-expand="nodeExpand"
                    @node-collapse="nodeCollapse"
                    :default-expanded-keys="expandedKeys"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                    @node-drag-end="updateAnalyzeAspect">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        {{ data.title }}
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
           
            <div class="container1">
                <div class="title-content">
                    <div class="title">{{selectSection.title}}</div>
                    <el-button v-show="!editShow" type="primary" @click="editShow = true">{{$t('dataTable.edit')}}</el-button>
                    <el-button v-show="editShow" type="primary" @click="submit">{{$t('dataTable.save')}}</el-button>
                </div>
                <div class="edit-text">
                    <UEditor v-show="editShow" :config="config" :defaultMsg="richText" ref="ueditor"></UEditor>
                    <div v-show="!editShow" v-html="richText"></div>
                </div>
            </div>
         </div>
         <!-- 输出变量 -->
         <el-dialog width="550px" :visible.sync="templateOutputVaribleShow" :title="$t('reportTemplate.templateVariableList')">
            <div class="analyze-content">
                <el-form v-for="(item,index) in variableData" :key="index">
                    <div class="varible-title">{{ item.label }}</div>
                    <el-form-item v-for="variable in item.varibles" :key="variable.id" :label="variable.name" label-width="120px">
                        <el-input v-model="variable.value" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div class="button-center">
                    <el-button type="primary" @click="saveVariable">{{$t('message.confirm')}}</el-button>
                </div>
            </div>
         </el-dialog>
         <!-- 新增弹出框 -->
        <el-dialog :title="textTitle" :visible.sync="Section" width="340px">
            <el-form :model="addform" label-width="120px">
                <el-form-item :label="$t('reportTemplate.chapterName')">
                    <el-input v-model="addform.title"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updataTree()">{{$t('message.confirm')}}</el-button>
                <el-button @click="close">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
        
        <!-- 删除弹出框 -->
        <el-dialog :visible.sync="deleteShow" width="300px" center>
            <div class="del-dialog-cnt">{{$t('message.deleteSure')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteTree()">{{$t('message.confirm')}}</el-button>
                <el-button @click="deleteShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
        <!-- 预览 -->
        <preview :child-content="previewContent"  v-show="isPre" @hidepreview="hidepreview"></preview> 
        <!-- 创建财务分析 -->
        <analyze-section :selectSection="selectSection" ref="analyzeSection"></analyze-section>
    </div>
</template>
<script>
import analyzeSection from '../components/analyzeSection'
import UEditor from '../../ueditor/ueditor.vue';
import preview from '..//components/preview.vue';
import keepimg from '../../../../static/img/tags/keep.png';

export default {
    components: {
        analyzeSection,
        UEditor,
        preview,
    },
    props: ['name','templateId'],
    data(){
        return {
            keepimg:keepimg,
            selectSection: '',
            editShow: false,
            addform: {
                title: ''
            },
            variableData: [],
            textTitle: '',
            richText: '',
            navList: [],
            Section:false,
            deleteShow: false,
            templateOutputVaribleShow: false,
            reportId: '',
            isPre:false,
            reportcontent:'',
            options: [
                {
                    value: '3',
                    label: this.$t('reportTemplate.text')
                }, 
                {
                    value: '5',
                    label: this.$t('reportTemplate.cover')
                }, 
                {
                    value: '4',
                    label: this.$t('reportTemplate.financialAnalysis')
                }, 
                {
                    value: '6',
                    label: this.$t('reportTemplate.catalog')
                }, 
                {
                    value: '7',
                    label: this.$t('reportTemplate.clause')
                }
            ],
            config: {
                autoHeightEnabled: false,
                autoFloatEnabled: true,
                initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                // autoClearinitialContent:false, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                initialFrameWidth: "100%",
                initialFrameHeight: 450,
                BaseUrl: '',
                UEDITOR_HOME_URL: 'static/ueditor/'
            },
            previewContent:{},
            typeName: '',
            newSectionTree: '',
            chosenWidth: true,
            expandedKeys: [],
        }
    },
    
    created(){
        this.typeName = this.name ? this.name : this.$route.query.typeName
        this.reportId = this.templateId ? this.templateId : this.$route.query.reportId
        this.queryAnalyzeAspect();
    },
    methods: {
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
        
        async handleNodeClick(item) {
            this.selectSection = item
            let params = {id: item.outputTemplateId}
            let result = await this.$store.dispatch('AC_OutputTemplateServiceGetOutputTemplate',params)
            this.richText = result.data.outputTemplate.richText ? result.data.outputTemplate.richText : ''
            this.editShow = false
        },
        updateselectSection (data,type) {
            this.selectSection = data
            if(type == 'append') {
                this.textTitle = this.$t('report.addText')
                this.addform.value = 3
                this.addform.type = 'treeCreate'
                this.Section = true
            }else if(type == 'updata') {
                this.textTitle = this.$t('report.modifyText')
                this.Section = true
                this.addform = data
            }else {
                this.deleteShow = true
            }
        },
        async queryAnalyzeAspect() {
            let params = {
                reportId: this.reportId,
            }
            let result = await this.$store.dispatch('AC_TemplateSectionTreeServiceGetTemplateSectionTree',params)
            this.navList = result.data.list
            if(this.navList.length > 0){
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
                    this.$refs.vueTree.setCurrentKey(this.navList[0].id);
                })
            }  
            
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
                dragTemplateSectionId: draggingNode.data.id,
                destTemplateSectionId: dropNode.data.id,
                type: type
            }

            let result = await this.$store.dispatch('AC_RenewTemplateSectionTreeSortUpdateSort',params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
            this.queryAnalyzeAspect()
        },
        async appendTree(item) {
            //文本创建
            if(item.value == 3) {
                if(this.Section && !this.addform.title) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }
                if(!this.Section) {
                    this.textTitle = this.$t('report.addText')
                    this.Section = true
                    return
                }
            }

            //财务分析创建
            if(item.value == 4) {
                this.$refs.analyzeSection.clickModelShow()
                return 
            }

            let params = {
                reportId: this.reportId,
                title: item.value == '3' ? this.addform.title : item.label,
                type: item.value,
                parentSectionId: this.addform.type == 'treeCreate' ? this.selectSection.id : '0'
            }

            let result = await this.$store.dispatch('AC_RenewTemplateSectionAddAddTemplateSection',params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
            this.newSectionTree = result.data.templateSection
            this.close()
            this.queryAnalyzeAspect()
        },
        async updataTree() {
            if (!this.addform.title) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            if(!this.addform.id) {
                this.appendTree({value: 3})
                return
            }

            let params = {
                reportId: this.reportId,
                id: this.addform.id,
                title: this.addform.title,
            }

            let result = await this.$store.dispatch('AC_TemplateSectionServiceUpdateTemplateSection',params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
            this.close()
            this.queryAnalyzeAspect()
        },
        async deleteTree() {
            let params = {
                id: this.selectSection.id
            }
            let result = await this.$store.dispatch('AC_TemplateSectionManageServiceRewriteTemplateSectionDelete',params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
            this.deleteShow = false
            this.queryAnalyzeAspect()
        },

        async queryTemplateVariable() {
            let params = {
                reportTemplateId: this.reportId
            }

            let result = await this.$store.dispatch('AC_TemplateProcessServiceQueryReportTemplateVaribleById', params)
            let varibles = result.data.mapReportTemplateVaribles ? result.data.mapReportTemplateVaribles : {}
            let varibleList = []
            for(let i in varibles){
                let obj = {
                    label: i,
                    varibles: varibles[i]
                }
                varibleList.push(obj)
            }
            this.variableData = varibleList
            this.templateOutputVaribleShow = true
        },

        async saveVariable() {
            let reportTemplateVaribleListes = []
            this.variableData.forEach(item => {
                reportTemplateVaribleListes = reportTemplateVaribleListes.concat(item.varibles)
            })
            let params = {
                reportTemplateVaribleListes: reportTemplateVaribleListes
            }
            let result = await this.$store.dispatch('AC_TemplateProcessServiceUpdateReportTemplateVaribles', params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
            this.templateOutputVaribleShow = false
        },

        //预览   //接口暂未修改
        async preView(){
            this.isPre=true;
            let params = {
                reportId: this.reportId,
                orderBy: "posOrder asc"
            }
            const res = await this.$store.dispatch('AC_TemplateSectionServiceQueryTemplateSection', params);
            this.reportcontent=res.data.sections;
            this.previewContent={
                doneRate:0,
                reportcontent:res.data.sections
            }
        },

        //保存
        async submit(){
            this.content=this.$refs.ueditor.getUEContent();
            let params = {
                reportId: this.reportId,
                id: this.selectSection.id,
                richText :this.content
            }
            const res = await this.$store.dispatch('AC_TemplateSectionServiceUpdateTemplateSection', params);        
            this.$message.success(this.$t('message.success')); 
            this.editShow = false
        },
        hidepreview(val){
            this.isPre=false;
        },
        close () {
            this.Section = false
            this.addform = {
                title: ''
            }
        }
    }
}
</script>
<style lang="less" scoped>
.special-vue{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .guide{
        display: flex;
        justify-content: space-between;
        background: #1c84c6;
        height: 35px;
        color: #fff;
        line-height: 35px;
        font-size: 1.3rem;
        padding-left: 2rem;   
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
    background: #f4f5f7;
    .queryside-wrap{
        width: 200px;
    }
    .queryside {
        min-width: 200px;
        font-size: 1.5rem;  
        border-right: 1px solid #ddd; 
        background: #fff;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
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
            height: 100%;
            overflow: auto;
            display: flex;
            .el-tree{
                flex: 1;
            }
        }
        .icon{
            opacity: 0;
        }
        .el-tree-node__content:hover {
            .icon{
                opacity: 1;
            }
        }
    }
    .currentclick{
        background: #cbd5e8;
        font-size: 1.5rem;
        font-weight: bold;
    }
    .container1{
        flex: 1;
        padding: 20px;
        border-radius: 0px;
        background: #f4f5f7; 
        overflow: auto;
        .title-content{
            display: flex;
            background: #fff;
            height: 111px;
            line-height: 40px;
            padding: 35px 25px;
            box-sizing: border-box;
            border-bottom: 1px solid #d4d0d0;
            .title{
                font-size: 24px;
                font-weight: bold;
                flex: 1;
            }
        }
        .edit-text{
            background: #fff;
            padding: 40px 25px;
        } 
    }
}
.button-center{
    text-align: center;
}
.varible-title{
    padding: 15px 0;
    color: #000;
    line-height: 30px;
    font-size: 18px;
}
</style>


