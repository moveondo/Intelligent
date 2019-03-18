<template>
<div>
    <div class="header">
       <div class="key-v">关键数据概览 <span class="list-t">列表</span></div>
       <div class="newtable" >
            <el-button class="table-1" type="primary" @click="creatTable()">新建表格</el-button>
           <UploadExcel></UploadExcel>
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
                            <el-dropdown-item @click.native="creatTable()">添加</el-dropdown-item>
                            <el-dropdown-item @click.native="removeTab(item.id)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>     
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>

    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:10px;">
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
    </el-table>

    <!-- 新增表格-->
    <el-dialog title="新建表格" class="new-table" :visible.sync="newTableShow" width="640px" @close="close">
        <el-form :model="newTableForm" label-width="120px">
            <el-form-item label="表格名称">
                <el-input v-model="newTableForm.tablename"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="newTable()">{{$t('message.confirm')}}</el-button>
            <el-button @click="close">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import UploadExcel from './uploadExcel.vue'

export default {
  name: 'CustomTreeTable',
  components:{UploadExcel},
  data() {
    return {
      newTableShow:false,
      newTableForm:{
        tablename:'',
      },
      tabcard:null,
      tableData: [],
      tableHeader: [],
      tableNums:[],
      dataTableId:null,
    }
  },
  created(){
   this.QueryDataTable();
  },
  methods: {
    creatTable(){
      this.newTableShow=true;
    },
    async addtable(results,header){
       let para={
            "corpAnalyzeId": this.$route.query.corpId,
            "excelHeader":JSON.stringify(header),
            "excelText": JSON.stringify(results),
            "name": this.newTableForm.tablename,
            "stockCode": this.$route.query.corpCode,
        }
        const res = await this.$store.dispatch('AC_AnalyzeExcelServiceAddAnalyzeExcel', para);
        if(res.code==200 && res.data.analyzeExcel){
            this.tableNums.push(res.data.analyzeExcel);
            this.handleClick(res.data.analyzeExcel.id,'start');
            this.tabcard=res.data.analyzeExcel.id+'';
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
        }   
    },
    async removeTab(id){
        let params={
              "id": id,
        }
        const res = await this.$store.dispatch('AC_AnalyzeExcelServiceDeleteAnalyzeExcel', params); 
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
        this.newTableShow=false;     
    },
    async queryTableId(id){
       let para={
         "id": id
        }
        const res = await this.$store.dispatch('AC_AnalyzeExcelServiceGetAnalyzeExcel', para);
        if(res.code==200){   
             this.tableData = JSON.parse(res.data.analyzeExcel.excelText);
             this.tableHeader =JSON.parse(res.data.analyzeExcel.excelHeader);
        }
     
    },
    close() {
        this.newTableShow=false;
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
     .list-v{
        margin-left: 10px;
     }
     .newtable{
       cursor: pointer;
       display: flex;
       .table-1{
           height: 30px;
       }
     }
 }
.table{
    margin-top: 10px;
}
.tab-header{
   position: relative;
   margin-top: 10px;
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
</style>
<style scoped>
.new-table  >>> .el-dialog__header{
    border-bottom: 1px solid  #dcdfe6;
 }
 /* .new-table  >>> .el-form-item__content{
    margin-left: 0px !important;
 } */
</style>
