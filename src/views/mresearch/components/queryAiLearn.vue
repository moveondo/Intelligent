<template>
<div>
    <!-- <div class="header">
       <el-input placeholder="请输入内容" style="width: 300px;margin-right: 10px;" prefix-icon="el-icon-search" v-model="AiSearch"></el-input>
       <el-button type="primary" icon="el-icon-search" >搜索</el-button>
    </div> -->
    <div v-if="tagText.length>0" class="table-content" v-for="(item,index) in tagText" :key="index">
        <div class="top-text">
            <div class="front">
                <div class="header-img">AI</div>
                <div class="title">{{item.title}}</div>
            </div>
            <div class="end">
                <button :style="{background:conColorR[item.id]}" class="right" @click="RightWrong(item,'1')">正确</button>
                <button :style="{background:conColorW[item.id]}" class="wrong" @click="RightWrong(item,'2')">错误</button>
            </div> 
        </div> 
        <div  class="text">
           <span>{{item.sourceStr}}</span> 
        </div>
         <div class="desc">
            <p class="source-from" @click="selectEdit(item)"> <i><img :src="linkimg" alt=""></i> {{$t('task.source')}}:{{item.docTitle}}</p>
        </div>
    </div>
    <div class="pagination"  v-if="total>0">
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
     <div class="table-content"  v-else>
            <div  class="nothing-data">
                <img :src="nothingimg" alt="">
                 <p>{{$t('message.noData')}}</p>
            </div>
    </div>
</div>      
</template>

<script>
 import linkimg from "./../../../../static/img/svg/link.svg";
 import nothingimg from "./../../../../static/img/tags/nothingdata.png";


export default {
    props: {
      analyzeParms:Object,
      
   },
  data() {
    return {
        tagText:[],
        nothingimg:nothingimg,
        currentPage:1,
        pageSize:10,
        total:0,
        dateFrom:null,
        dateTo:null,
        analyzeAspectId:'',
        timeColumn:null,
        linkimg:linkimg,
        conColorW:[],
        conColorR:[],
        AiSearch:''
    }
  },
    created(){
        this.analyzeAspectId = this.analyzeParms.analyzeAspectId
        this.queryTextTagFlag()
    },
  watch: {
        analyzeParms:{
            handler(newValue,oldValue){
                this.analyzeAspectId = newValue.analyzeAspectId;
                if(newValue.time !=null){
                this.dateFrom=newValue.time+'-01-01 00:00:00';
                this.dateTo=newValue.time+'-12-31 00:00:00';
                this.timeColumn="publish_time";
                }else{
                this.dateFrom=null;
                this.dateTo=null;
                this.timeColumn=null;
                }
                this.queryTextTagFlag();
                },
            deep:true
        },
    },
  methods: {
      async queryTextTagFlag(){
              if (!this.analyzeAspectId) {
                    return
                } 
                let params={
                    analyzeAspectId : this.analyzeAspectId,
                    corpAnalyzeId:this.$route.query.corpId,
                    stockCode : this.$route.query.corpCode,
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    dateFrom:this.dateFrom,
                    dateTo:this.dateTo,
                    timeColumn:this.timeColumn,
                    orderBy: "sort asc",
                };
                const result = await this.$store.dispatch('AC_AiTaggingManageQueryAiTextTagging', params);
                if(result.code==200){
                    this.tagText=result.data.list;  
                }
               this.total=result.data.total;

      },
      async RightWrong(item,num){
                let params={
                    "aiTextTaggingId": item.id,
                    "status": num
                };
                if(num==2 && this.conColorW[item.id]=="red"){
                    this.conColorW[item.id]="#4da9ec";
                    this.conColorR[item.id]="#4da9ec";
                }else if(num==2){
                    this.conColorW[item.id]="red";
                    this.conColorR[item.id]="gray";
                }
                const result = await this.$store.dispatch('AC_AiTaggingManageUpdateAiTextTag', params);
                if(result.code==200){
                    this.queryTextTagFlag();
                }
      },
       handleCurrentChange(val) {
            this.currentPage=val;
            this.queryTextTagFlag();

       },
        handleSizeChange(val) {
                this.pageSize=val;
                this.queryTextTagFlag();
         },
        // 查看事件
        selectEdit(row) {
            let params={
                docId: row.docId,
                pageInd: row.pageInd,
                bmId: this.$route.query.bmId,
                corpId: this.$route.query.corpId,
                name: this.$route.query.name,
                TagId: row.id
            }
            this.$router.push({path: '/mresearch/retrievalcontent',query: params})
        },
    
  }
}
</script>
<style lang="less" scoped>

    .table-content{
         display: flex;
         flex-flow: column;
         border:1px solid #fff;
         background: #fff;
         margin: 10px 0;
         box-shadow:3px 3px 5px #e4e7ed; 
        
         .top-text{
            display: flex; 
            justify-content: space-between;
            border-bottom: 1px solid #f2f2f4;
            padding: 5px;
            background: #d0e4f1;
            .header-img{
                border-radius: 50%;
                background: #4da9ec;
                width: 30px;
                height: 30px;
                display: inline-block;
                line-height: 30px;
                text-align: center;
                color: #fff;
            }
            .front{
                display: flex;
                .title{
                    display: flex;
                    line-height: 32px;
                    margin-left: 6px;
                    font-size: 14px;
                }
            }
            .end{
                margin-right:20px;
                line-height: 28px;
                font-size: 14px;
                .wrong,.right{
                    padding: 3px;
                    border-radius: 3px;
                    background: #4da9ec;
                    cursor: pointer;
                    border: none;
                     color: #fff;
                }
            }
         }
         .text{
            margin: 7px 9px;
            font-size: 14px;
            line-height: 17px;
         }
         .desc{
            border-top: 1px solid #f2f2f4;
            padding: 8px;
            .source-from{
                color: #559ff8;
                cursor: pointer;
                margin-right: 10px;
                img{
                    vertical-align: bottom;
                }
            }
         }
        
    }
    .nothing-data{
        text-align: center;
        padding: 50px 0;
        color: #a09d9d;
        font-size: 1.3rem;
  }
</style>

