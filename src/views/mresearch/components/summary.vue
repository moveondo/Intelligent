<template>
<div>
  <div class="summary" >
    <el-form v-if="!HasSummary" ref="form" :model="summary" label-width="80px">
    <el-form-item label="本章小结">
        <el-input type="textarea" v-model="summary.desc"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button >取消</el-button>
    </el-form-item>
    </el-form>
    <div v-else>
        <div class="top-text">
            <div class="header">本章小结</div>
            <div>
              <span class="editdata" @click="editSummary()"><i class="el-icon-edit-outline"></i></span>
              <span class="editdata" @click="deleteSummary()"> <i class="el-icon-delete"></i> </span>
            </div>
        </div>
        <div class="text-1">{{SummaryConclusion}}</div>
        <div v-for="(item,index) in titleArr" :key="index">
            <div class="t-name">
            <div> 
                <span class="showC" @click="showThistag(item.id)">{{item.title}} <i class="el-icon-search"></i> </span>
                <span v-for="(itemC,indexC) in titleArrC[item.id]" :key="indexC">
                    <!-- {{itemC}} -->
                    <span class="space"   :class="{ 'colornet': read_id.indexOf(itemC.id) !== -1 || chooseId==itemC.id}"   @click="chooseItem(itemC.id)"> {{itemC.name}}</span>
                </span>
            </div>
            <div class="edit" v-if="(editDesc[item.id]==null || editDesc[item.id]=='' || editDesc[item.id]==undefined)|| editDescShow[item.id]==true ">
                 <el-input  type="textarea" v-model="editDescNew[item.id]"></el-input>
                 <el-button type="primary" @click="editDesctext(item.id)">提交</el-button>
                 <el-button>取消</el-button>
            </div>
            <div  class="edit" v-else>
                {{ editDesc[item.id]}}<span @click="updateDesc(item.id)"><i class="el-icon-edit"></i></span>
            </div>
            </div>
        </div>

    </div>
  </div>

</div>
</template>
<script>
export default {
    props: ['analyzeAspectId'],
    data(){
        return{
            summary:{
                desc:''
            },
            HasSummary:false,
            SummaryConclusion:'',
            updateSummary:'',
            summaryId:'',
            titleArr:[],
            titleArrC:[],
            editDesc:[],
            editDescNew:[],
            chooseId:null,
            chooseIdArr:[],
            editDescShow:[],
            read_id:[],
        }
    },
    watch: {
         analyzeAspectId(data) {
            this.analyzeAspectId = data;
            this.GetAnalyzeAspectConclusion();
            this.queryCorpEvaDimention()

        },
    },
    created(){
        this.GetAnalyzeAspectConclusion();
        this.queryCorpEvaDimention()
    },
    methods:{
        chooseItem(id){
          this.chooseId=id;
        },
        showThistag(id){
            this.$parent.queryDataList(id);
        },
        async editDesctext(corpEvaDimentionId){
            if(this.editDescShow[corpEvaDimentionId]==true){
                let para={
                    "conclusion": this.editDescNew[corpEvaDimentionId],
                    "corpAnalyzeId":this.$route.query.corpId,
                    "stockCode" : this.$route.query.corpCode,
                    "corpEvaChoiceId": this.chooseId,
                    "corpEvaDimentionId": corpEvaDimentionId,
                    "tagClassId": this.analyzeAspectId,
                    "id":this.chooseIdArr[corpEvaDimentionId]
                }
                const res = await this.$store.dispatch('AC_CorpEvaDimValueServiceUpdateCorpEvaDimValue', para);
                if(res.code==200){
                    this.queryEvaDimValue(corpEvaDimentionId);
                    this.$set( this.editDescShow,corpEvaDimentionId,false);
                } 
               
            }else{
                let para={
                    "conclusion": this.editDescNew[corpEvaDimentionId],
                    "corpAnalyzeId":this.$route.query.corpId,
                    "stockCode" : this.$route.query.corpCode,
                    "corpEvaChoiceId": this.chooseId,
                    "corpEvaDimentionId": corpEvaDimentionId,
                    "tagClassId": this.analyzeAspectId
                }
                const res = await this.$store.dispatch('AC_CorpEvaDimValueServiceAddCorpEvaDimValue', para);
                if(res.code==200){
                    this.queryEvaDimValue(corpEvaDimentionId);
                } 

            }
           
        },
        async updateDesc(id){
            // this.editDescShow[id]=true;
            this.$set( this.editDescShow,id,true)
            this.editDescNew[id]=this.editDesc[id];
            // let para={
            //     "conclusion": this.editDescNew[corpEvaDimentionId],
            //     "corpAnalyzeId":this.$route.query.corpId,
            //     "stockCode" : this.$route.query.corpCode,
            //     "corpEvaChoiceId": this.chooseId,
            //     "corpEvaDimentionId": corpEvaDimentionId,
            //     "tagClassId": this.analyzeAspectId,
            //     "id":this.chooseIdArr[id]
            // }
            // const res = await this.$store.dispatch('AC_CorpEvaDimValueServiceUpdateCorpEvaDimValue', para);
            // if(res.code==200){
            //     //this.queryEvaDimValue(corpEvaDimentionId);
            // } 

        },
        async queryEvaDimValue(corpEvaDimentionId){
            let para={
                "corpAnalyzeId":this.$route.query.corpId,
                "stockCode" : this.$route.query.corpCode,
                "corpEvaDimentionId": corpEvaDimentionId,
                "tagClassId": this.analyzeAspectId
            }
            const res = await this.$store.dispatch('AC_CorpEvaDimValueServiceQueryCorpEvaDimValue', para);
            if(res.code==200 && res.data.corpEvaDimValues && res.data.corpEvaDimValues.length>0){
                if(res.data.corpEvaDimValues[0].conclusion){
                   this.$set( this.editDesc,corpEvaDimentionId,res.data.corpEvaDimValues[0].conclusion);
                   this.chooseIdArr[corpEvaDimentionId]=res.data.corpEvaDimValues[0].id;
                   this.read_id.push(res.data.corpEvaDimValues[0].corpEvaChoiceId);
                }
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
                     this.queryCorpEvaChoice(res.data.corpEvaDimentions[i].id);
                     this.queryEvaDimValue(res.data.corpEvaDimentions[i].id);
                    }
                }  
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
        async onSubmit(){  
            if(this.updateSummary=='update'){
               let para={
                "analyzeAspectId":this.analyzeAspectId,
                "conclusion": this.summary.desc,
                "corpAnalyzeId": this.$route.query.corpId,
                "id":this.summaryId
                }
                const res =await this.$store.dispatch('AC_AnalyzeAspectConclusionServiceUpdateAnalyzeAspectConclusion', para);
                this.updateSummary='';
                if(res.code==200){
                    this.HasSummary=true;
                    this.summary.desc='';
                    this.GetAnalyzeAspectConclusion()

                }
            }else{
                let para={
                 "analyzeAspectId":this.analyzeAspectId,
                 "conclusion": this.summary.desc,
                 "corpAnalyzeId": this.$route.query.corpId
                }
                const res =await this.$store.dispatch('AC_AnalyzeAspectConclusionServiceAddAnalyzeAspectConclusion', para);
                if(res.code==200){
                    this.HasSummary=true;
                    this.SummaryConclusion= this.summary.desc;
                }
            }
        },
        async  GetAnalyzeAspectConclusion(){
            let para={
             "analyzeAspectId":this.analyzeAspectId,
             "corpAnalyzeId":this.$route.query.corpId
            }
            const res =await this.$store.dispatch('AC_AnalyzeAspectConclusionServiceQueryAnalyzeAspectConclusion', para);
            if(res.code==200 && res.data.total!=0){
                this.HasSummary=true;
                this.SummaryConclusion= res.data.analyzeAspectConclusions[0].conclusion;
                this.summary.desc=res.data.analyzeAspectConclusions[0].conclusion;
                this.summaryId=res.data.analyzeAspectConclusions[0].id;
            }else if(res.code==200 && res.data.total==0){
                this.HasSummary=false;
                this.summary.desc="";
            }
       },
        async editSummary(){ 
            this.HasSummary=false;
            this.updateSummary='update';
        },
        async deleteSummary(){
            let para={
                "id":this.summaryId,
            }
            const res =await this.$store.dispatch('AC_AnalyzeAspectConclusionServiceDeleteAnalyzeAspectConclusion', para);
            if(res.code==200){
                this.HasSummary=true;
                this.GetAnalyzeAspectConclusion()
            }
        },
    }
    
}
</script>
<style lang="less" scoped>
 .summary{
           margin: 12px 0;
           box-shadow: 3px 3px 5px #e4e7ed;
           padding: 10px;
           font-size: 1.5rem;
          .top-text{
            display: flex; 
            justify-content: space-between;
            border-bottom: 1px solid #f2f2f4;
            padding: 9px;
            background: #a0cfff;
               .header-img{
                border-radius: 50%;
                background: #4da9ec;
                width: 30px;
                height: 30px;
                display: inline-block;
                line-height: 30px;
                text-align: center;
            }
            .editdata{
               font-size: 16px;
               margin-left: 8px;
            }

          }
          .text-1{
              padding: 10px;
              background: #fff;
          }
          .t-name{
            line-height: 40px;
            .showC{
                cursor: pointer;
            }
            .space{
                margin: 0 5px;
                padding: 5px 10px;
                background-color: #fff;
                border-color: #409EFF;
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                border: 1px solid #dcdfe6;
                border-radius: 20px;
            }
            .colornet{
                background: #409EFF;
            }
            .edit i{
                margin-left: 10px;
                cursor: pointer;
            }
        }

    }

</style>
<style scoped>
 .edit >>> .el-textarea {
    width: 80% !important;
 }
 </style>


