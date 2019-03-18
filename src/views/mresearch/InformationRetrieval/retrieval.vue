<template>
<div class="crumbs">
    <div class="tabs" >
      <span v-for="item in items" :key="item.key"   v-bind:class="{ currentclick:item.key==current}" @click="handleClick(item.key)">{{item.value}}</span>
    </div>
    <div class="search">
        <el-input v-model="searchValue" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click.native="searchC">{{$t('mresearch.search')}}</el-button>
    </div>
    <div class="many-search">
      <div class="message">
          <span>{{$t('mresearch.informationSources')}}：</span><el-select v-model="messageFrom">
            <el-option :label="$t('mresearch.stockExchange')" value="1"></el-option>
           </el-select>
      </div>
      <div  class="message">
          {{$t('reportTemplate.type')}}：<el-select v-model="messageType" multiple>
            <el-option  v-for="item in options" :key="item.index" :label="item.value" :value="item.value"></el-option>
           </el-select>
      </div>
      <div  class="message">
         {{$t('dataTable.creationTime')}}：<el-select v-model="messageTime">
            <el-option :label="$t('mresearch.nearlyThreeYears')" value="1"></el-option>
           </el-select>
      </div>
      <div  class="message">
          {{$t('mresearch.stock')}}：<el-select v-model="messageStock">
            <el-option label="2018.HK" value="1"></el-option>
           </el-select>
      </div>
    </div>
    <div class="search-c">
      <div class="search-content" v-for="content in searchContent" :key="content.index" @click="switchIndex(content)">
        <div class="title">{{content.fileName}}</div>
        <div class="content" v-html="content.fileContent">{{content.fileContent}}</div>
        <div class="up-time">
            <div>{{content.up_time}}</div>
            <div class="file-type">{{content.fileType}}</div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="totalNum>0">
            <el-pagination
                 @current-change="handleCurrentChange"
                 :current-page.sync="currentPage"
                 :page-size="pageSize"
                 layout="total, prev, pager, next"
                 :total="totalNum">
           </el-pagination>
    </div>
   
</div>
</template>

<script>
export default {
    data() {
        return {
            url:"/searchapi/pdfPathProducer/searchDoc",
            items:[
                {key:1,value: this.$t('mresearch.Announcement')},
                {key:2,value: this.$t('mresearch.researchReport')},
                {key:3,value: this.$t('mresearch.community')},
                {key:4,value: this.$t('mresearch.data')},
                {key:5,value: this.$t('mresearch.model')}
            ],                  
            options:[
                {index:1,value: this.$t('mresearch.public')},
                {index:2,value: this.$t('mresearch.monthlyReport')},
                {index:3,value: this.$t('mresearch.circular')},
                {index:4,value: this.$t('mresearch.finance')},
                {index:5,value: this.$t('mresearch.representative')},
                {index:6,value: this.$t('mresearch.listing')},
                {index:7,value: this.$t('mresearch.announcement')},
                {index:8,value: this.$t('mresearch.charter')},
                {index:9,value: this.$t('mresearch.other')},
            ],
            searchValue:'',
            messageFrom:'',
            messageType:'',
            messageTime:'',
            messageStock:'',
            current:1,
            searchContent:'',
            cur_page:1,
            currentPage:1,
            totalNum:0,
            pageSize:10,    
        }
    },
    created() {
        
    },
    methods: {
    handleClick(index) {
        console.log(index);
        this.current=index;
        },
    
    handleCurrentChange(val){
        this.cur_page = val;
        this.searchC();
    },
    switchIndex(item){
        let params={
            docId: item.docId,
            pageInd: item.pdfNum
        }
        this.$router.push({path: '/mresearch/retrievalcontent',query: params})
    },
        searchC(){
            if(this.searchValue==''){
                this.$message.error("请输入搜索关键字！");
                return false;
            }
            let para={
            "aliase": "yb",
            "pageIndex":this.cur_page,
            "pageSize": this.pageSize,
            "querySentence":this.searchValue,
            "sortOrder": "desc",
            "startTime": "",
            "filterFileds":{
                "fileType":["公告"]
            }
        };
        this.$axios.post(this.url,para).then((res) => {
            if(res.data.code==200){
                this.totalNum=JSON.parse(res.data.data.result).total;
                this.searchContent=JSON.parse(res.data.data.result).data;
            }else{
                this.$message.error(res.data.msg);
            }
                            
        }).catch(function (err) {
            console.log("调用失败", err)
        })
        },
    }
}
</script>

<style  lang="less" scoped>
.crumbs{
    padding: 30px 40px 20px 40px;
    .tabs{
        font-size: 15px;
        span{
            margin-left: 30px;
            cursor: pointer;
        }
        .currentclick{
            border-bottom: 2px solid #1c84c6;
            padding: 3px 0px;
        }
    }
    .search{
        .el-input{
            width: 400px;
            height: 34px;
            margin-right: 20px;
        }
        display: flex;
        margin: 20px 0;
    }
    .many-search{
        display: flex;
        .message{
            margin-left: 10px;
        }
    }
    .search-c{
        padding-top: 30px;
        .search-content{
        padding-bottom: 20px;
        border-bottom: 1px solid #999;
        margin-top: 10px;
        .title{
            font-size: 1.4rem;
            font-weight: bold;
            margin: 5px;
        }
        .up-time{
            display: flex;
            margin-top: 5px;
            .file-type{
                margin-left:10%;
            }
        }
    }

    }
    

}
.el-select{
    width: 120px !important;
}

</style>
