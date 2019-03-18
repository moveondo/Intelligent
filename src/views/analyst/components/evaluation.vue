<template>
 <div class="evaluation">
     <div class="title">
         <div class="name">{{datalabel}}</div>
         <el-button type="primary" round @click="addCorpEvaDimention()">添加纬度</el-button>
     </div>
     <div v-for="(item,index) in titleArr" :key="index">
        <div class="t-name">
          <div> 
              <span @mouseenter="Rember(item.id,'1')" @mouseleave="clearC()">
                 {{item.title}}
                 <span v-if="itemId==item.id" @click="deleteC(itemC.id)"><i class="el-icon-delete"></i></span>
              </span>
              <span v-for="(itemC,indexC) in titleArrC[item.id]" :key="indexC">
                 <button class="space" @mouseenter="Rember(itemC.id,'2')" @mouseleave="clearC()">
                     {{itemC.name}}
                    <span v-if="itemCId==itemC.id" @click="deleteC(itemC.id)"><i class="el-icon-delete"></i></span>
                 </button>
              </span>
              <span @click="addchild(item.id)"><i class="el-icon-circle-plus-outline"></i></span> 
          </div>
        </div>
     </div>
   <div class="desc1">
     <el-form ref="form" :model="form" label-width="0px" v-if="description ==null || showDesc==true">
       <p>本节标注说明</p>
        <el-form-item >
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()">提交</el-button>
            <el-button>取消</el-button>
        </el-form-item>
       </el-form>
        <div v-else >
            <p>本章小结<span @click="editDesc()"><i class="el-icon-edit"></i></span></p>
            <p class="desc">{{description}}</p>
        </div>
      </div>
    

    <!-- 新建纬度-->
    <el-dialog title="新建纬度" class="new-table" :visible.sync="newTableShow" width="640px" @close="close">
        <el-form :model="newTableForm" label-width="120px">
            <el-form-item label="维度名称">
                <el-input v-model="newTableForm.title"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="CreatenewTable()">{{$t('message.confirm')}}</el-button>
            <el-button @click="close">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>

    <!-- 新建纬度指标-->
    <el-dialog title="新建纬度指标" class="new-table" :visible.sync="newTableShowC" width="640px" @close="close">
        <el-form :model="newTableFormC" label-width="120px">
            <el-form-item label="维度名称">
                <el-input v-model="newTableFormC.name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="CreatenewTableC()">{{$t('message.confirm')}}</el-button>
            <el-button @click="close">{{$t('message.cancel')}}</el-button>
        </span>
    </el-dialog>

 </div>
</template>
<script>
export default {
    props: ['analyzeAspectId','datalabel'],
    data(){
        return{
            newTableShow:false,
            newTableForm:{
                title:''
            },
            newTableFormC:{
                name:''
            },
            newTableShowC:false,
            titleArr:[],
            form:{
                desc:''
            },
            titleArrC:[],
            description:null,
            itemCId:null,
            itemId:null,
            showDesc:false,
            descId:null
        }
    },
    watch: {
        analyzeAspectId(data) {
            this.analyzeAspectId = 344;
            this.queryCorpEvaDimention();
            this.QueryAnalyzeAspectUsage()
        },
        datalabel(data){
          this.datalabel=data
        }
    },
    created () {
         
    },
    methods: {
        editDesc(){
         this.showDesc=true;
         this.form.desc=this.description;
        },
        Rember(id,type){
            if(type==1){ this.itemId=id;}
            else   this.itemCId=id;
        },
        clearC(){
          this.itemId="";
          this.itemCId="";
        },
        async deleteC(id){
          let para={
               "id":id
            }
            const res = await this.$store.dispatch('AC_CorpEvaChoiceServiceDeleteCorpEvaChoice', para);
            if(res.code==200 ){
                 this.queryCorpEvaDimention();
            } 
        },
        async onSubmit(){
           
            if(this.showDesc==true){
                 let para={
                "description": this.form.desc,
                "tagClassId": this.analyzeAspectId,
                "id":this.descId
               }
             const res = await this.$store.dispatch('AC_AnalyzeAspectUsageServiceUpdateAnalyzeAspectUsage', para);
              if(res.code==200 ){
                this.QueryAnalyzeAspectUsage()
              } 
            }else{
               let para={
                "description": this.form.desc,
                "tagClassId": this.analyzeAspectId,
               }
              const res = await this.$store.dispatch('AC_AnalyzeAspectUsageServiceAddAnalyzeAspectUsage', para);
               if(res.code==200 ){
                this.QueryAnalyzeAspectUsage()
               } 
            }
            this.showDesc=false;
        },
        async QueryAnalyzeAspectUsage(){
            let para={
                "tagClassId": this.analyzeAspectId
            }
            this.description=null;
            const res = await this.$store.dispatch('AC_AnalyzeAspectUsageServiceQueryAnalyzeAspectUsage', para);
            if(res.code==200 && res.data.total!=0){
                this.description=res.data.analyzeAspectUsages[0].description;
                this.descId=res.data.analyzeAspectUsages[0].id;
            }  
        },
        addCorpEvaDimention(){
            this.newTableShow=true;
        },
        async CreatenewTable(){
           let para={
               "tagClassId": this.analyzeAspectId,
               "title": this.newTableForm.title,
            }
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const res = await this.$store.dispatch('AC_CorpEvaDimentionServiceAddCorpEvaDimention', para);
            this.newTableForm.title="";
            this.$store.commit('loadingChange',{show: false})
            if(res.code==200){
                 this.newTableShow=false;
                 this.queryCorpEvaDimention();
            } 
        },
        async queryCorpEvaDimention(){
            let para={
               "tagClassId": this.analyzeAspectId
            }
            this.titleArr=[];
            const res = await this.$store.dispatch('AC_CorpEvaDimentionServiceQueryCorpEvaDimention', para);
            if(res.code==200){
                this.titleArr = res.data.corpEvaDimentions;
                if(res.data.corpEvaDimentions && res.data.corpEvaDimentions.length){
                    for(let i=0;i<res.data.corpEvaDimentions.length;i++){
                     this.queryCorpEvaChoice(res.data.corpEvaDimentions[i].id)
                    }
                }  
            } 
        },
        addchild(id){
           this.editId=id;
           this.newTableShowC=true;
        },
        async CreatenewTableC(){
            let para={
                "corpEvaDimentionId":this.editId,
                "name": this.newTableFormC.name
            }
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            const res = await this.$store.dispatch('AC_CorpEvaChoiceServiceAddCorpEvaChoice', para);
            this.newTableShowC=false;
            this.newTableFormC.name="";
            this.$store.commit('loadingChange',{show: false})
            if(res.code==200){
                this.queryCorpEvaChoice(this.editId);
            } 

        },
        async queryCorpEvaChoice(id){
            let para={
                "corpEvaDimentionId":id
            }
            //this.titleArrC=[];
            const res = await this.$store.dispatch('AC_CorpEvaChoiceServiceQueryCorpEvaChoice', para);
            if(res.code==200){
                // this.titleArrC[id]= res.data.corpEvaChoices;
                this.$set(this.titleArrC,id,res.data.corpEvaChoices)
            }
        },
        close(){
            this.newTableShow=false;
            this.newTableShowC=false;
        }
    }
}
</script>
<style lang="less" scoped>
.evaluation{
        font-size: 1.6rem;
    .title{
        display: flex;
        justify-content: space-between;
        font-size: 1.6rem;
        padding: 10px 20px;
        border-bottom: 1px solid #999999;
    }
    .t-name{
        line-height: 40px;
        .space{
            margin: 0 5px;
            padding: 9px 15px;
            color: #fff;
            background-color: #409EFF;
            border-color: #409EFF;
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            border: 1px solid #dcdfe6;
            border-radius: 20px;
        }
    }
    .desc1{
        margin: 20px 0;
        .desc{
            text-indent: 2em;
            line-height: 30px;
        }
    }

}


</style>

