<template>
<div>
    <div class="header">
       <div class="key-v">关键数据概览 <span class="list-t">列表</span></div>
       <div class="newtable" @click="creatTable()">
            <el-button type="primary">新建表格</el-button>
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
        <div class="tab-right"> 
           <span class="add-tab" >行 <span @click="tableRowCol('add','row')"> <i class="el-icon-circle-plus-outline"></i> </span></span>
           <!-- <span>列<span class="add-tab" @click="tableRowCol('add','col')">+</span><span @click="tableRowCol('minus','col')">-</span></span>         -->
        </div>
    </div>

    <!-- 新增表格-->
    <el-dialog title="新建表格" class="new-table" :visible.sync="newTableShow" width="640px" @close="close">
        <el-form :model="newTableForm" label-width="120px">
            <el-form-item label="表格名称">
                <el-input v-model="newTableForm.tablename"></el-input>
            </el-form-item>
             <el-form-item  class="date-css" label="定义日期">
                 <div class="block"> <span class="demonstration">起始日期</span>
                    <el-date-picker v-model="newTableForm.startyear" value-format="yyyy" type="year"  placeholder="选择年"> </el-date-picker>
                </div>
                 <div style="margin-top:10px" class="block"> <span class="demonstration">终止日期</span>
                    <el-date-picker v-model="newTableForm.endyear" value-format="yyyy"  type="year"  placeholder="选择年"> </el-date-picker>
                </div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="newTable()">{{$t('message.confirm')}}</el-button>
            <el-button @click="close">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>
     <!-- 新增表格行数据-->
    <el-dialog title="表格数据" class="new-table" :visible.sync="newTablerowShow" width="640px" @close="close">
        <el-form :model="newTableid" label-width="120px">
            <el-form-item v-for="(item,index) in addTableRow" :key="index" :label="item.period" >
                <el-input  v-model='tableRow[item.period]'></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="newTableRow()">{{$t('message.confirm')}}</el-button>
            <el-button @click="close">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>

      <!-- 新增表格行名称-->
    <el-dialog title="表格行名称" class="new-table" :visible.sync="newTablerowtitleShow" width="640px" @close="close">
        <el-form :model="newTabletitle" label-width="120px">
            <el-form-item label="行名称" >
                <el-input  v-model='newTabletitle.rowname'></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="newTableRowtitle()">{{$t('message.confirm')}}</el-button>
            <el-button @click="close">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>

    <div class="table">
     <tree-table :data="tabledata" :eval-func="func" :eval-args="args" :expand-all="expandAll" border>
     <el-table-column v-for="(column, index) in columns"  :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
       <div v-if="column.value=='comment'" >
             <el-button type="text" @click="editRow(scope.row)">编辑</el-button>
             <el-button type="text" @click="deleteRow(scope.row)">删除</el-button>
       </div>
       <div  v-else>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)"></span>
           {{ scope.row[column.value ] }}
       </div>
      </template>
    </el-table-column>
    </tree-table>
  </div>
</div>
</template>

<script>
import treeTable from './treeTable'
import treeToArray from './customEval'
export default {
  name: 'CustomTreeTable',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      newTableShow:false,
      newTableForm:{
        tablename:'',
        startyear:'',
        endyear:''
      },
      newTabletitle:{
        rowname:''
      },
      newTablerowtitleShow:false,
      newTablerowShow:false,
      newTableid:{},
      tableRow:[],
      addTableRow:[],
      tableNums:[],
      tabcard:'',
      dataTableId:'',
      edittablerow:'',
      parentId:0,
      columns: [],
      tabledata:[],
      searchParent:[],
      args: []
    }
  },
  created(){
   this.QueryDataTable();
  },
  methods: {
    creatTable(){
      this.newTableShow=true;
    },
    async QueryDataTable() {
       let params={
              "corpAnalyzeId": this.$route.query.corpId,
        }
        this.tableNums=[];
        const res = await this.$store.dispatch('AC_AnalyzeDataTableManageQueryDataTable', params);
        if(res.code==200 && res.data.data && res.data.data.length){
            this.tableNums=res.data.data;
            this.handleClick(res.data.data[0].id,'start');
            this.tabcard=res.data.data[0].id+'';
        }   
    },
    async removeTab(id){
        let params={
              "dataTableId": id,
        }
        const res = await this.$store.dispatch('AC_AnalyzeDataTableManageDeleteTable', params); 
        if(res.code==200){this.QueryDataTable();this.$message.info("删除成功")}
    },
    async handleClick(tab,type) {
        if(type=='start'){
            this.dataTableId=tab;
        }else{
           this.dataTableId=tab.name;
        }
        this.queryTableId(this.dataTableId,'click');
    },
    async newTable(){
    //   this.addTableRow=[].concat(this.columns);  
    let para={
        "corpAnalyzeId": this.$route.query.corpId,
        "dateFrom": this.newTableForm.startyear,
        "dateTo": this.newTableForm.endyear,
        "name": this.newTableForm.tablename,
        "stockCode": this.$route.query.corpCode
    }
    const res = await this.$store.dispatch('AC_AnalyzeDataTableManageAddTable', para);
    if(res.code==200){
        this.newTableShow=false; 
        this.dataTableId=res.data.dataTableId;
        this.queryTableId(res.data.dataTableId);
    }
              
    },
    async queryTableId(id,type,rowid){
         this.columns=[];
       let para={
         "dataTableId": id
        }
        const res = await this.$store.dispatch('AC_AnalyzeDataTableManageQueryDataTableById', para);
        if(res.code==200){
            if(!type){
                this.tableNums.push(res.data.data);
                let tableset =new Set(this.tableNums);
                this.tableNums= Array.from(tableset);
            }
             for(let i=0;i<res.data.data.analyzePeriodList.length;i++){
                let obj={};
                obj.text=res.data.data.analyzePeriodList[i].period;
                obj.value=res.data.data.analyzePeriodList[i].period;
                this.columns.push(obj);
             }
            this.columns.push({text: '操作',   value: 'comment' });
            let set =new Set(this.columns);
            this.columns= Array.from(set);
            this.addTableRow=[];
            this.tabledata=[];
            this.tableRow=[];
            this.searchParent=[];
            for(let j=0;j<res.data.data.analyzeDataCatogoryList.length;j++){
               let obj={};
               obj.id=res.data.data.analyzeDataCatogoryList[j].id;
               obj.event=res.data.data.analyzeDataCatogoryList[j].name;
               this.searchParent[res.data.data.analyzeDataCatogoryList[j].id]=res.data.data.analyzeDataCatogoryList[j].parentId;
               for(let k=0;k<res.data.data.analyzeDataCatogoryList[j].analyzeDataValueList.length;k++){
                   let period=res.data.data.analyzeDataCatogoryList[j].analyzeDataValueList[k].period+'';
                   obj[period]=res.data.data.analyzeDataCatogoryList[j].analyzeDataValueList[k].value;
                   if(rowid == res.data.data.analyzeDataCatogoryList[j].id){
                     this.addTableRow.push({"id":res.data.data.analyzeDataCatogoryList[j].analyzeDataValueList[k].id,"period":res.data.data.analyzeDataCatogoryList[j].analyzeDataValueList[k].period});
                   }
               }
                if(res.data.data.analyzeDataCatogoryList[j].child){
                   var child= this.loopchild(res.data.data.analyzeDataCatogoryList[j].child,rowid);
                   obj.children=child;
               }
               this.tabledata.push(obj);
            }
        }
    },
    loopchild(data,rowid){
        let childobj=[];
        for(let k=0;k<data.length;k++){
            let obj={}; let children=[];
            obj.id=data[k].id;
            obj.event=data[k].name;
            this.searchParent[data[k].id]=data[k].parentId;
            for(let j=0;j<data[k].analyzeDataValueList.length;j++){
                let period=data[k].analyzeDataValueList[j].period+'';
                obj[period]=data[k].analyzeDataValueList[j].value;
                if(rowid == data[k].analyzeDataValueList[j].catogoryId){
                    this.addTableRow.push({"id":data[k].analyzeDataValueList[j].id,"period":data[k].analyzeDataValueList[j].period});
                }
            }
            childobj.push(obj);
            if(data[k].child){
               var child= this.loopchild(data[k].child,rowid)
               childobj[k].children=child;
            }
         }
         return childobj;
    },
    async  newTableRowtitle(){
        let para={
            "dataTableId": this.dataTableId,
            "name": this.newTabletitle.rowname,
            "parentId": this.parentId
          }
        this.$store.commit('loadingChange',{show: true})
        const res = await this.$store.dispatch('AC_AnalyzeDataCatogoryManageAddCatogory', para);
        if(res.code==200){
            this.queryTableId(this.dataTableId,'click');
            this.newTablerowtitleShow=false;
            this.newTabletitle.rowname=null;
            this.$store.commit('loadingChange',{show: false})
        }
    },
     tableRowCol(type,rowOrcol){
      if(type=='add' && rowOrcol=='row'){
         this.parentId=0;
         this.newTablerowtitleShow=true;
      }
    },
    async newTableRow(){
      this.tableRow=this.tableRow.filter(d=>d);//去空值
     // console.log(this.tableRow,this.tableRow.length);
      let analyzeDataValueList=[]; 
      for(let i=0;i<this.tableRow.length;i++){
        let obj={};
        obj.catogoryId=this.edittablerow.id;
        obj.dataTableId=this.dataTableId;
        obj.period=this.addTableRow[i].period;
        obj.id=this.addTableRow[i].id;
        obj.value=this.tableRow[i];
        analyzeDataValueList.push(obj);
      }
      let para={
          "analyzeDataValueList":analyzeDataValueList
      }
     this.$store.commit('loadingChange',{show: true})
      const res = await this.$store.dispatch('AC_AnalyzeDataValueManageUpdateDataValue', para);
        if(res.code==200){
            this.newTablerowShow=false;
            this.queryTableId(this.dataTableId,'click');
            this.$store.commit('loadingChange',{show: false})

        }
      
    },
    addrow(type,rowid){
        if(type==1){
           this.newTablerowtitleShow=true;
           this.parentId=this.searchParent[rowid];
        }else{
          this.newTablerowtitleShow=true;
          this.parentId=rowid;
        }
    },
     // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    editRow(row) {
        console.log(row)
      this.edittablerow=row;
      this.newTablerowShow=true;
      this.queryTableId(this.dataTableId,'click',row.id)
    },
    async deleteRow(row){
      let para={
        "analyzeDataCatogoryId": row.id,
        "dataTableId": this.dataTableId
      }
      const res = await this.$store.dispatch('AC_AnalyzeDataCatogoryManageDeleteCatogory', para);
        if(res.code==200){
           this.$message.info("删除成功");
            this.queryTableId(this.dataTableId,'click')
        }
    }, 
    close() {
        this.newTableShow=false;
        this.newTablerowShow=false;
        this.newTablerowtitleShow=false;
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
