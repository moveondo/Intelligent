<template>
    <div class="special-vue">
        <div class="guide">
            <div class="left">
                 <router-link to="/analyst/industryModel">{{$t('industryModel.industryModel')}}</router-link>
                /{{$route.query.name}}
            </div>
            <div class="right">
                <el-tooltip class="item" effect="dark" :content="$t('industryModel.copyModel')" placement="bottom">
                    <i class="el-icon-printer" @click="printerShow = true"></i>
                </el-tooltip>
            </div>
        </div>
         <div class="content-modify">
             <div class="queryside" :class="{ 'queryside-wrap': chosenWidth }">
                 <div class="append-tree">
                     <span @click="updateTree('add')">
                        <i class="el-icon-circle-plus-outline"></i>{{$t('message.add')}}
                     </span>
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
                    highlight-current
                    ref="vueTree"
                    @node-expand="nodeExpand"
                    @node-collapse="nodeCollapse"
                    :default-expanded-keys="expandedKeys"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                    @node-drop="updateAnalyzeAspect">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        {{ data.name }}
                        <el-dropdown trigger="click">
                            <i class="el-icon-arrow-down icon"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="updateTree('add',data)">{{$t('message.add')}}</el-dropdown-item>
                                <el-dropdown-item @click.native="updateTree('update',data)">{{$t('message.update')}}</el-dropdown-item>
                                <el-dropdown-item @click.native="updateTree('delete',data)">{{$t('dataTable.delete')}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    </el-tree>
                 </div>
             </div>
            
            <div class="tabs-content">
                <el-tabs v-model="select" type="card" @tab-click="handleClick">
                    <el-tab-pane label="评价纬度" name="zero">
                        <evalution @selectRow='selectRow'  :analyzeAspectId="analyzeAspectId" :datalabel="datalabel" ref="evalution"></evalution>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('industryModel.informationAnnotation')" name="first">
                        <textTaggingList @selectRow='selectRow'  :analyzeAspectId="analyzeAspectId"  :bizModelId="bizModelId" ref="textTaggingList"></textTaggingList>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('industryModel.sourceInformation')" name="second">
                        <infoSourceList :analyzeAspectId="analyzeAspectId" ref="infoSourceList"></infoSourceList>
                        <el-button type="primary" @click="$refs.infoSourceList.selectEdit()">{{$t('message.add')}}</el-button>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
         <el-dialog  :title="$t('industryModel.label')" :visible.sync="textTagShow" width="450px">
            <div v-html="selectTextTag.sourceStr"></div>
        </el-dialog>

        <el-dialog :title="$t('industryModel.copyModel')" :visible.sync="printerShow" width="450px" @close="closePrinter">
            <el-form :model="form">
                <el-form-item :label="$t('industryModel.industryModel')" label-width="120px">
                    <el-input v-model="printerForm.newName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('industryModel.author')" label-width="120px">
                    <el-input v-model="printerForm.creator"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="printer">{{$t('message.confirm')}}</el-button>
                <el-button @click="printerShow = false">{{$t('message.cancel')}}</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="textTitle" :visible.sync="formShow" width="450px" @close="close">
            <el-form :model="form">
                <el-form-item :label="$t('reportTemplate.chapterName')" label-width="120px">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="appendTree">{{$t('message.confirm')}}</el-button>
                <el-button @click="formShow = false">{{$t('message.cancel')}}</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="deleteShow" width="300px" center>
            <div class="del-dialog-cnt">{{$t('message.deleteSure')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteTree()">{{$t('message.confirm')}}</el-button>
                <el-button @click="deleteShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import evalution from '../components/evaluation'
    import infoSourceList from '../components/infoSourceList'
    import textTaggingList from '../components/textTaggingList'
    export default {
        components: {
            infoSourceList,
            textTaggingList,
            evalution
        },
        data(){
            return {
                select: 'first',
                formShow: false,
                deleteShow: false,
                printerShow: false,
                analyzeAspectId: '',
                bizModelId: '',
                textTitle: '',
                form: {
                    name: ''
                },
                printerForm: {
                    newName: '',
                    creator: ''
                },
                treeForm: {},
                navList: [],
                selectTextTag: '',
                textTagShow: false,
                selectSection: {},
                appendBool: false,
                newSectionTree: '',
                chosenWidth: true,
                expandedKeys: [],
                datalabel:''
            }
        },   
        created () {
            this.bizModelId= this.$route.query.Id;
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

            selectRow(row) {
                this.selectTextTag = row
                this.textTagShow = true
            },
            handleNodeClick(data) {
                this.selectSection = data
                this.analyzeAspectId = data.id
                this.datalabel=data.label
            },
            updateTree (type,data) {
                this.treeForm = data

                if (type == 'add') {
                    this.textTitle = this.$t('report.addText')
                    this.appendBool = data ? true : false
                    this.formShow = true
                }else if(type == 'update') {
                    this.textTitle = this.$t('report.modifyText')
                    this.form = data
                    this.formShow = true
                }else if(type == 'delete') {
                    this.deleteShow = true
                }
            },

            close() {
                this.form = {
                    name: ''
                }
            },
            closePrinter() {
                this.printerForm = {
                    newName: '',
                    creator: ''
                }
            },
            async printer() {
                if (!this.printerForm.newName || !this.printerForm.creator) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                let params = Object.assign({},this.printerForm,{oriModelId: this.bizModelId})
                let result = await this.$store.dispatch('AC_AnalyzeAspectTreeCloneBizModel',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.printerShow = false
            },
            async queryAnalyzeAspect() {
                let params = {
                    bizModelId: this.bizModelId,
                    pageNum:1,
                    pageSize:50
                }
                let result = await this.$store.dispatch('AC_AnalyzeAspectTreeGetAnalyzeAspectTree',params)
                this.navList = result.data.list

                if (result.data.list.length > 0) {
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
            async updateAnalyzeAspect(draggingNode, dropNode, ev ) {
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

                let result = await this.$store.dispatch('AC_RenewSortUpdateSort',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.queryAnalyzeAspect()
            },
            async appendTree() {
                if(this.form.id) {
                    this.updataTree()
                    return
                }

                if (!this.form.name) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                let params = {
                    bizModel: this.$route.query.Id,
                    name: this.form.name,
                    type: 0,
                    parent: this.appendBool ? this.selectSection.id : 0
                }         
                this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
                let result = await this.$store.dispatch('AC_AnalyzeAspectManageInsertAnalyzeAspect',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.newSectionTree = result.data
                this.formShow = false
                this.queryAnalyzeAspect()
                this.$store.commit('loadingChange',{show: false})

            },
            async updataTree() {
                if (!this.form.name) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }

                let params = {
                    bizModel: this.bizModelId,
                    id: this.form.id,
                    name: this.form.name,
                }
                let result = await this.$store.dispatch('AC_AnalyzeAspectServiceUpdateAnalyzeAspect',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.formShow = false
                this.queryAnalyzeAspect()
            },
            async deleteTree() {
                let params = {
                    id: this.treeForm.id
                }
                let result = await this.$store.dispatch('AC_AnalyzeAspectManageRewriteAnalyzeAspectDelete',params)
                result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail')) 
                this.deleteShow = false
                this.queryAnalyzeAspect()
            },

            handleClick(tab) {
                if (tab.name == 'first') {
                    this.$refs.textTaggingList.$refs.dataList.searchDataChange()
                }else if(tab.name == 'second') {
                    this.$refs.infoSourceList.$refs.dataList.searchDataChange()
                }
            }
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
        .right {
            padding-right: 40px;
            i {
                font-size: 18px;
                margin-left: 10px;
                cursor: pointer;
            }
        }
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
    .tabs-content{
        flex: 1;
        background: #fff;
        padding: 20px;
        overflow: auto;
    }
}

.tree-list{
    display: inline-block;
    position: relative;
    .tree-update{
        position: absolute;
        border: 1px solid #d4d4d4;
    }
}
  
</style>
<style scoped>
 .edit >>> .el-textarea {
    width: 80%;
 }
 </style>


