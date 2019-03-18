<template>
<div>
    <div class="header">
       <div class="key-v">关键数据概览  列表<span class="list-t">(只支持xlsx格式)</span></div>
       <div class="newtable" >
            <el-button type="primary" @click="CreatenewTable">新建</el-button>
            <el-button type="primary" @click="newTable">点击上传</el-button>
          <div class="options-container">
            <div class="option-row">
                <span class="inputContainer">
                     <el-button type="primary" id="saveExcel" class="button" @click="exportExcel">导出</el-button>
                     <!-- <input id="exportFileName" value="export.xlsx" class="input"> -->
                     <el-input v-model="exportFileName" id="exportFileName"  class="input"></el-input>
                </span>
                <span class="group" style="display:none">
                    <label>Password:
                        <input type="password" id="password">
                    </label>
                </span>
            </div>
            </div>
        </div>
    </div>
    <div class="tab-header">
        <el-tabs class="tab-left" v-model="tabcard" type="card"  @tab-click="handleClick">
            <el-tab-pane v-if="!tableNums" name="0" label="暂无表格"></el-tab-pane>
            <el-tab-pane v-for="item in tableNums" :key="item.id"  :name="item.id+''">
                <span slot="label">
                    <span>{{ item.name}}</span>
                    <el-dropdown trigger="click" class="dropdown">
                        <i class="el-icon-arrow-down icon"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="EditTableName(item.name)">编辑</el-dropdown-item>
                            <el-dropdown-item @click.native="removeTab(item.id)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>     
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>

    <!-- 链接弹出框 -->
    <el-dialog :visible.sync="selectionModelLinkShow" class="link-content" width="80%" @close="close">
        <div slot="title" class="title">
            <div>{{ $t('mresearch.associatedAnnotation') }}</div>
            <el-button type="primary" @click="informationListShow = true">{{$t('mresearch.association')}}</el-button>
        </div>
        <ul class="link-list">
            <li v-for="(item,index) in selectionModelLinkList" :key="index">
                <div class="link-head">
                    <div class="title"> {{ item.title }}</div>
                    <div class="label"> {{ item.tagClassName }}</div>
                    <i class="el-icon-delete" @click="deleteTable(item)"></i>
                </div>
                <div class="content">
                    <div v-html="item.sourceStr"></div>
                    <div class="msg">
                        <div class="msg-left">
                            <img :src="finishimg">
                            {{ $t('mresearch.conclusion')}}：
                        </div>
                        <div class="msg-right">{{item.msg}}</div>
                    </div>
                </div>
            </li>
        </ul>
    </el-dialog>

    <!-- 加入标注 -->
    <el-dialog :visible.sync="informationListShow" width="80%" @close="informationListShow = false">
        <informationList @joinReportSection="joinReportSection" :routeParams="routeParams"></informationList>
    </el-dialog>

    <!-- 新增表格-->
    <el-dialog title="新建表格" class="new-table" :visible.sync="newTableShow" width="640px" @close="close">
        <input type="file" id="fileDemo" class="input">
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="loadExcel">{{$t('message.confirm')}}</el-button>
            <el-button @click="close">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>

        <!-- 新建表格-->
    <el-dialog title="新建表格" class="new-table" :visible.sync="CreatenewTableShow" width="640px" @close="close">
        <el-form :model="CreatenewTableForm" label-width="120px">
            <el-form-item label="表格名称">
                <el-input v-model="CreatenewTableForm.tablename"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="CreatenewTableSure()">{{$t('message.confirm')}}</el-button>
            <el-button @click="close">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>

    <div class="spreadContainer" v-show="hasExcel">
        <div class="tab">
            <div class="tab1" @click="selectionModelEdit()">
               <p><img :src="linkimg" alt=""></p>
               <p>链接</p>
            </div>
            <div class="tab1" @click="saveExcel()">
               <p><img :src="saveimg" alt=""></p>
               <p>保存</p>
            </div>
             <div class="tab1" @click="toDiagram()">
               <p class="mapimg"><img :src="mapimg" alt=""></p>
               <p>创建逻辑图</p>
            </div>
        </div>
        <gc-spread-sheets
            :hostClass='"spreadHost"'
            @workbookInitialized='spreadInitHandle'
            :showHorizontalScrollbar = 'showHorizontalScrollbar'
            :showVerticalScrollbar = 'showVerticalScrollbar'
           :allowUserZoom = 'allowUserZoom'
        >
        </gc-spread-sheets>
    </div>
     <div class="table-content"  v-show="!hasExcel">
            <div  class="nothing-data">
                <img :src="nothingimg" alt="">
                 <p>{{$t('message.noData')}}</p>
            </div>
    </div>
    <!-- <div id="ss" class="sample-spreadsheets"></div> -->
</div>
</template>

<script>
    import  '@grapecity/spread-sheets-vue'
	import * as Excel from "@grapecity/spread-excelio"
	import GC from '@grapecity/spread-sheets'
    import * as FileSaver from "file-saver"
    import nothingimg from "./../../../../static/img/tags/nothingdata.png";
    import informationList from "./informationList";
    import finishimg from "./../../../../static/img/svg/finish.svg";
    import saveimg from './../../../../static/img/excel/save.svg';
    import linkimg from './../../../../static/img/excel/link.svg';
    import mapimg from './../../../../static/img/excel/map.svg';


  export default {
  name: 'CustomTreeTable',
  components:{informationList},
  data() {
    return {
        newTableShow:false,
        showHorizontalScrollbar: true,
        showVerticalScrollbar:true,
        allowUserZoom:true,
        tabcard:null,
        tableData: [],
        tableHeader: [],
        tableNums:[],
        dataTableId:null,
        dataTablename:null,
        nothingimg:nothingimg,
        hasExcel:false,
        CreatenewTableShow:false,
        CreatenewTableForm:{
            tablename:''
        },
        isNewOrEdit:null,
        exportFileName:"export.xlsx",
        finishimg:finishimg,
        informationListShow: false,
        selectionModelLinkShow:false,
        selectionModelLinkList:[],
        taggingIdVsArr:[],
        saveimg:saveimg,
        linkimg:linkimg,
        mapimg:mapimg
    }
  },
  created(){
    this.QueryDataTable();
    this.routeParams =this.$route.query;
  },
  methods: {
    async selectionModelEdit(){
        this.selectionModelLinkShow = true
        var sheet = window.mySpread.getActiveSheet();
        var activeColumnIndex = sheet.getActiveColumnIndex();
        var activeRowIndex = sheet.getActiveRowIndex();
        var activeSheetIndex = window.mySpread.getActiveSheetIndex();
        let para={
            "analyzeExcelId":this.dataTableId,
            "columnIndex": activeColumnIndex,
            "corpAnalyzeId":this.$route.query.corpId,
            "rowIndex": activeRowIndex,
            "sheetIndex": activeSheetIndex,
        }
        const res = await this.$store.dispatch('AC_CellTextTaggingServiceQueryCellTextTagging', para);
        var taggingIdArr=[];
        this.taggingIdVsArr=[];
        this.selectionModelLinkList=[];
        if(res.code==200 && res.data.cellTextTaggings && res.data.cellTextTaggings.length>0){
            for(let i=0;i<res.data.cellTextTaggings.length;i++){
                  taggingIdArr.push(res.data.cellTextTaggings[i].textTaggingId);
                  this.taggingIdVsArr[res.data.cellTextTaggings[i].textTaggingId]=res.data.cellTextTaggings[i].id
            }
          this.getManyTextTagging(taggingIdArr)

        }
    },
    async getManyTextTagging(taggingIdArr){
       let para={
            "id": taggingIdArr
        }
        const res = await this.$store.dispatch('AC_TextTaggingServiceGetManyTextTagging', para);
        if(res.code==200){
            console.log( res.data.textTaggings)
            this.selectionModelLinkList = res.data.textTaggings;
        } 
    },
    async deleteTable(item){
      console.log(item);
       let para={
            id:this.taggingIdVsArr[item.id]
        }
        const res = await this.$store.dispatch('AC_CellTextTaggingServiceDeleteCellTextTagging', para);
        if(res.code==200){this.$message.error("删除成功");this.selectionModelEdit()}
    },
    async joinReportSection(data) {
       console.log(data);
        var sheet = window.mySpread.getActiveSheet();
        var activeColumnIndex = sheet.getActiveColumnIndex();
        var activeRowIndex = sheet.getActiveRowIndex();
        var activeSheetIndex = window.mySpread.getActiveSheetIndex();
        console.log(activeSheetIndex,activeColumnIndex,activeRowIndex);
        let para={
            "analyzeExcelId":this.dataTableId,
            "columnIndex": activeColumnIndex,
            "corpAnalyzeId":this.$route.query.corpId,
            "rowIndex": activeRowIndex,
            "sheetIndex": activeSheetIndex,
            "textTaggingId": data.id
        }
        const res = await this.$store.dispatch('AC_CellTextTaggingServiceAddCellTextTagging', para);
        if(res.code==200){
            this.selectionModelEdit()
             this.informationListShow = false;
        }
        
       
    },
    CreatenewTable(){
      this.CreatenewTableShow=true;
      this.isNewOrEdit=1;
    },
    CreatenewTableSure(){
        if( this.isNewOrEdit==1){
         this.addtable('',this.CreatenewTableForm.tablename+'.xlsx');

        }else{
         this.updatedTable('',this.CreatenewTableForm.tablename);
        }
    },
    EditTableName(name){
      this.CreatenewTableShow=true;
      this.isNewOrEdit=2;
      this.CreatenewTableForm.tablename=name;
    },
    spreadInitHandle(spread){
        window.mySpread = spread;
        GC.Spread.Common.CultureManager.culture('zh-cn');
            // GC.Spread.Common.CultureManager.culture('ja-jp');
            //GC.Spread.Common.CultureManager.culture('en-us');
    },
    saveExcel(){
        let self=this;
        this.excelIO = new Excel.IO();
        this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
        if (window.mySpread) {
            let ssjson = window.mySpread.toJSON();
            let dealJson=JSON.parse(JSON.stringify(ssjson,function(key,value){
            if(key=='Evaluation Version'){
               return undefined;
               }else{
               return value;
               }
             }))
            self.updatedTable(dealJson);
        }
    },
    async updatedTable(json,name) {
        let Strjson=JSON.stringify(json);
        let tableName;
        if(name){
         tableName=name;
        }else{
          tableName=this.dataTablename;
        }
        let para={
            "excelText": Strjson,
            "name": tableName,
            "id":this.dataTableId
        }
        const res = await this.$store.dispatch('AC_AnalyzeExcelManageUpdateExcel', para);
        this.$store.commit('loadingChange',{show: false})
        this.CreatenewTableShow=false;
        this.isNewOrEdit=null;
        if(res.code==200 ){
           this.$message.success("保存成功");
           this.QueryDataTable();
        } 
        
    },
    toDiagram() {
        var sheet = window.mySpread.getActiveSheet();
        var activeColumnIndex = sheet.getActiveColumnIndex();
        var activeRowIndex = sheet.getActiveRowIndex();
        var activeSheetIndex = window.mySpread.getActiveSheetIndex();
        let jsonData = window.mySpread.toJSON();
        
        let data = {
            label: this.exportFileName.split('.')[0],
            data: jsonData.sheets,
            activeSheetIndex: activeSheetIndex,
            activeRowIndex: activeRowIndex,
            activeColumnIndex: activeColumnIndex
        }
        this.$store.commit('selectExcel',data)
        this.$parent.select = 'fourth'
    },

    loadExcel(){    
        let self=this;
        this.excelIO = new Excel.IO();
        var sheet = window.mySpread.getActiveSheet();
        let excelFile = document.getElementById("fileDemo").files[0];
        let password = document.getElementById('password').value;
        this.$store.commit('loadingChange',{text: this.$t('message.inRequest'),show: true})
        console.log(excelFile.name)
        this.excelIO.open(excelFile, function (json) {
             self.close();
             self.addtable(json,excelFile.name);
            let workbookObj = json;
             window.mySpread.fromJSON(workbookObj);
           

        }, function (e) {
            // process error
            // alert(e.errorMessage);
            console.log(e.errorMessage);
            if (e.errorCode === 2/*noPassword*/ || e.errorCode === 3 /*invalidPassword*/) {
                document.getElementById('password').onselect = null;
            }
        }, {password: password});

    },
    exportExcel(e){
        let self=this;
        this.excelIO = new Excel.IO();
        let exportFileName = this.exportFileName;
        if (window.mySpread) {
            let ssjson = window.mySpread.toJSON();
            let dealJson=JSON.parse(JSON.stringify(ssjson,function(key,value){
            if(key=='Evaluation Version'){
               return undefined;
               }else{
               return value;
               }
             }))
            this.excelIO.save(dealJson,(blob) => {
            	FileSaver.saveAs(blob, exportFileName);
            }, (error) =>{
            	console.log(error);
            });
        }
    },
    async addtable(json,name){
        let Strjson=JSON.stringify(json);
        let para={
            "corpAnalyzeId": this.$route.query.corpId,
            "excelText": Strjson,
            "name": name,
            "stockCode": this.$route.query.corpCode,
        }
        const res = await this.$store.dispatch('AC_AnalyzeExcelManageAddExcel', para);
        this.$store.commit('loadingChange',{show: false})
        this.CreatenewTableShow=false;
        this.isNewOrEdit=null;
        if(res.code==200 && res.data.analyzeExcel){
            this.tableNums.push(res.data.analyzeExcel);
            this.handleClick(res.data.analyzeExcel.id,'start');
            this.tabcard=res.data.analyzeExcel.id+'';
            this.hasExcel=true;
        }  
    },
    async queryTableId(id){
       let para={
         "id": id
        }
        const res = await this.$store.dispatch('AC_AnalyzeExcelManageGetExcel', para);
         var sheet = window.mySpread.getActiveSheet();
        if(res.code==200 && res.data.analyzeExcel){
            this.excelPath(res.data.analyzeExcel.excelPath+'?'+Math.random())
            this.dataTablename=res.data.analyzeExcel.name;
            this.exportFileName=res.data.analyzeExcel.name;
        }
        if(res.code==200 && res.data.cellTextTaggingList && res.data.cellTextTaggingList.length){
            let lengthEx=res.data.cellTextTaggingList.length;
            for(let i=0;i<lengthEx;i++){
                 setTimeout(() => { 
                      let sheetIndex=parseInt(res.data.cellTextTaggingList[i].sheetIndex);
                      let rowIndex=parseInt(res.data.cellTextTaggingList[i].rowIndex);
                      let columnIndex=parseInt(res.data.cellTextTaggingList[i].columnIndex);
                       var sheet =  window.mySpread.getSheet(sheetIndex);
                      sheet.getCell(rowIndex, columnIndex).foreColor('blue');
                 }, 300);
                
            }
        }
    },
    async QueryDataTable() {
       let params={
              "corpAnalyzeId": this.$route.query.corpId,
        }
        this.tableNums=[];
        const res = await this.$store.dispatch('AC_AnalyzeExcelServiceQueryAnalyzeExcel', params);
        if(res.code==200 && res.data.analyzeExcels && res.data.analyzeExcels.length){
            this.tableNums=res.data.analyzeExcels;
            this.handleClick(res.data.analyzeExcels[0].id,'start');
            this.tabcard=res.data.analyzeExcels[0].id+'';
            this.hasExcel=true;
        }else{
            this.hasExcel=false;
        }
    },
    excelPath(url){
           this.$axios.get(url).then(res => {
            if(res.data){
               window.mySpread.fromJSON(res.data);
            }else{
                window.mySpread.fromJSON(res);
            }
         }) 
    },
    async removeTab(id){
        let params={
              "id": id,
        }
        const res = await this.$store.dispatch('AC_AnalyzeExcelManageDeleteExcel', params); 
        if(res.code==200){this.QueryDataTable();this.$message.info("删除成功")}
    },
    async handleClick(tab,type) {
        if(type=='start'){
            this.dataTableId=tab;
        }else{
           this.dataTableId=tab.name; 
        }
        this.queryTableId(this.dataTableId);
    },
     newTable(){
        this.newTableShow=true;     
    },
     close() {
        this.newTableShow=false;
        this.CreatenewTableShow=false;
        this.isNewOrEdit=null;
    },
 
  }
}
</script>
<style lang="less" scoped>
 .header{
     display: flex;
     justify-content: space-between;
     padding: 5px 10px;
     border-bottom: 1px solid #ebeef5;
     font-size: 14px;
     .list-t{
        margin-left: 10px;
        color: red;
     }
     .newtable{
       cursor: pointer;
       display: flex;
       .table-1{
           height: 30px;
       }
       .options-container{
           margin-left: 30px;
           .inputContainer{
               display: flex;
               .input{
                   margin-left: 5px
               }
           }
       }
     }
 }
.table{
    margin-top: 10px;
}
.tab{
    display: flex;
    padding: 10px;
    .tab1{
        cursor: pointer;
        margin: 3px 10px;
        .mapimg{
            margin-left: 10px;
        }
    }
}
 .nothing-data{
        text-align: center;
        padding: 50px 0;
        color: #a09d9d;
        font-size: 1.3rem;
  }
.tab-header{
   position: relative;
   margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
.tab-left{
    padding-right: 130px;
}
.tab-right {
    position: absolute;
    right: 0;
    top: 4px;
    font-size: 14px;
    .add-tab{
        margin: 0 10px;
        cursor: pointer;
    }
}
.link-content{
    .title{
        display: flex;
        font-size: 18px;
        line-height: 32px;
        font-weight: 500;
        div{
            flex: 1;
        }
    }
    .el-button{
        margin-right: 30px;
    }
    .link-list{
        li{
            margin-bottom: 10px;
            font-size: 14px;
            .link-head{
                background: #d0e4f1;
                display: flex;
                padding: 5px;
                box-sizing: border-box;
                line-height: 30px;
                border-bottom: 1px solid #f2f2f4;
                .title{
                    flex: 1;
                    font-size: 16px;
                    color: #000;
                }
                .label{
                    line-height: 30px;
                    color: #000;
                    cursor: pointer;
                    margin: 0 15px;
                }
                .label:hover{
                    color: #409EFF;
                }
                i{
                    line-height: 30px;
                    font-size: 16px;
                    cursor: pointer;
                }
            }
            .content{
                padding: 10px;
                .msg{
                    margin-top: 10px;
                    border: 1px dashed #e4e7ed;
                    color: #888;
                    padding: 10px;
                    display: flex;
                    line-height: 20px;
                    .msg-left{
                        margin-right: 12px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #409EFF;
                        img{
                            margin-right: 4px;
                            height: 20px;
                        }
                    }
                    .msg-right{
                        flex: 1;
                    }
                }
            }
        }
    }
}
</style>
<style scoped>
.new-table  >>> .el-dialog__header{
    border-bottom: 1px solid  #dcdfe6;
 }
 /* .new-table  >>> .el-form-item__content{
    margin-left: 0px !important;
 } */



</style>




<style scoped>

@import "http://www.tfiir.com/sp/css/font-awesome/css/font-awesome.min.css";
/* @import "http://www.tfiir.com/sp/css/bootstrap.min.css"; */
@import "http://www.tfiir.com/sp/css/gc.spread.sheets.excel2013white.11.0.0.css";
@import "http://www.tfiir.com/sp/css/inspector.css";
@import "http://www.tfiir.com/sp/css/insp-table-format.css";
@import "http://www.tfiir.com/sp/css/insp-conditional-formatting.css";
@import "http://www.tfiir.com/sp/css/colorpicker.css";
@import "http://www.tfiir.com/sp/css/borderpicker.css";
@import "http://www.tfiir.com/sp/css/insp-spread.css";
@import "http://www.tfiir.com/sp/css/sample.css";
@import "http://www.tfiir.com/sp/css/bootstrap-theme.min.css";


/* @import "../../../../static/js/spreadjs/css/bootstrap-theme.min.css";
@import "../../../../static/js/spreadjs/css/bootstrap.min.css";
@import "../../../../static/js/spreadjs/css/gc.spread.sheets.11.0.0.css";
@import "../../../../static/js/spreadjs/css/gc.spread.sheets.excel2013white.11.0.0.css";
@import "../../../../static/js/spreadjs/css/insp-conditional-formatting"; */

.spreadHost {
    width: 1024px;
    height: 600px;
     /* width: 100%; */
    /* height: 100%; */
}

</style>
