<template>
    <div class="content">
        <div class="queryside" :class="{ 'queryside-wrap': chosenWidth }">
            <div class="append-tree">
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
                :expand-on-click-node="false"
                @node-click="handleNodeClick"
                >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label}}</span>
                </span>
                </el-tree>
            </div>
        </div>
        <div class="table-wrap">
            <div class="table-content" v-for="(item,index) in tagText" :key="index">
                <div class="top-text">
                    <div class="text-title">{{ item.title }}</div>
                    <el-button type="primary" @click="joinReportSection(item)">{{$t('mresearch.join')}}</el-button>
                </div>
                <div class="text" >
                    <div  class="text-1 img" v-html="item.sourceStr"></div>
                    <div class="conclusion">
                        {{item.msg}}
                    </div>
                </div>
                <div class="desc">
                    <p class="source-from"> <i><img :src="linkimg" alt=""></i> {{$t('task.source')}}:{{item.docTitle}}</p>
                    <p class="publish-time"><span>{{$t('industryModel.publishTime')}}:</span> {{ item.publishTime | formatDate }}</p>
                </div>
            </div>  

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        
    </div>
</template>
<script>
import linkimg from "./../../../../static/img/svg/link.svg";
import { formatDate } from "../../utils/date";
export default {
    props: ['routeParams'],
    data() {
        return {
            chosenWidth: false,
            navList: [],
            tagText: [],
            selection: {},
            analyzeAspectId: '',
            total: 0,
            currentPage: 1,
            pageSize: 10,
            linkimg: linkimg,
        }
    },
    mounted() {
        this.queryAnalyzeAspect()
    },
    watch: {
        analyzeAspectId(newData) {
            this.queryDataList()
        },
        routeParams(newData) {
            this.queryAnalyzeAspect()
        }
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd");
        }
    },
    methods: {
        handleNodeClick(data) {
            this.selection = data
            this.analyzeAspectId= data.id;
        },

        handleSizeChange(val) {
            this.pageSize=val;
            this.queryDataList();
        },

        handleCurrentChange(val) {
            this.currentPage=val;
            this.queryDataList();
        },

        joinReportSection(data) {
            data.selectionLabel = this.selection.label
            data.analyzeAspectId = this.analyzeAspectId
            this.$emit('joinReportSection',data)
        },

        async queryAnalyzeAspect() {
            let params = {
                bizModelId: this.routeParams.bmId,
                corpAnalyzeId:this.routeParams.corpId,
                pageNum:1,
                pageSize:50
            }

            let result = await this.$store.dispatch('AC_AnalyzeAspectTreeAnalyzeAspectTreeContainUser',params)
            this.navList = result.data.list ? result.data.list : []
            this.analyzeAspectId = this.navList[0].id
            this.handleNodeClick(this.navList[0])
            this.$nextTick(() => {
                this.$refs.vueTree.setCurrentKey(this.navList[0].id);
            })
        },

        async queryDataList() {
            let params={
                analyzeAspectId : this.analyzeAspectId,
                stockCode : this.routeParams.corpCode,
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                orderBy: "sort asc",
                model: 0,
            };
            const result = await this.$store.dispatch('AC_CorpAnalyzManageQueryModelById', params);
            if(result.code==200){
                this.tagText=result.data.list; 
                this.total=result.data.total;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.content{
    width: 100%;
    min-height: 400px;
    display: flex;
    background: #ddd;
}
.queryside-wrap{
    width: 150px;
}
.queryside{
    min-width: 150px;
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
}
.table-wrap{
    flex: 1;
    background: #fff;
    padding-left: 10px;
}
.table-content{
    border:1px solid #fff;
    background: #fff;
    margin-bottom: 10px;
    box-shadow:3px 3px 5px #e4e7ed; 
    .text,.desc{
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
    }
    .top-text{
        display: flex;
        border-bottom: 1px solid #f2f2f4;
        padding: 5px;
        background: #d0e4f1;
        .text-title{
            font-size: 16px;
            line-height: 32px;
            font-weight: bold;
            color: #000;
            flex: 1;
        }
        .el-button{
            height: 32px;
            margin-left: 20px;
        }
    }
    .text{
        .conclusion{
            color: #888;
            font-style: italic;
            span{
                cursor: pointer;
            }
        }
    }
    .desc{
        display: flex;
        border-top: 1px solid #f2f2f4;
        .source-from{
            flex: 1;
        }
        .publish-time{
            text-align: right;
            min-width: 155px;
            padding-left: 20px;
        }
    }
}
</style>
