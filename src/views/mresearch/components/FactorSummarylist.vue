<template>
 <div>
    影响因素:<el-select v-model="chooseType" @change="changeselect" class="select">
           <el-option label="All" value=""></el-option>
            <el-option  v-for="item in influence" :key="item.index" :label="item.influenceOutcome" :value="item.id"></el-option>
    </el-select>
    <div  v-if ="isShow">
      <div v-for="item in chartLength" :key="item">
       <div :id="'chart'+item" :style="{width: '900px', height: '300px'}"></div> 
      </div>
    </div>
     <div  v-else class="nothing-data">
        <img :src="nothingimg" alt="">
            <p>{{$t('message.noData')}}</p>
      </div>
 </div>
</template>

<script>
    import nothingimg from "./../../../../static/img/tags/nothingdata.png";
    export default {
        props: ['analyzeParms'],
        data() {
            return {
                analyzeAspectId:'',
                dateFrom:null,
                dateTo:null,
                chartLength:Number,
                influenceOutcome:[],
                chooseType:'',
                influence:[],
                nothingimg:nothingimg,
                isShow:false
            }
        },
        watch: {
            analyzeParms:{
                handler(newValue,oldValue){
                 this.analyzeAspectId = newValue.analyzeAspectId;
                  if(newValue.time !=null){
                   this.dateFrom=newValue.time+'-01-01 00:00:00';
                   this.dateTo=newValue.time+'-12-31 00:00:00';
                 }else{
                   this.dateFrom=null;
                   this.dateTo=null;
                 }
                //  this.queryDataList();
                 },
                deep:true
            },
        },
        created(){
         this.querySearchaffected();
        },
        methods: {
            // 获取数据列表
            async queryDataList() {
                let self=this;
                if (!this.analyzeAspectId) {
                    return
                }
                let params={
                    "corpAnalyzeId":this.$route.query.corpId,
                    "influenceOutcomeId":this.chooseType,
                    "dateFrom":this.dateFrom,
                    "dateTo":this.dateTo,
                    // "timeColumn": "publish_time"
                }
                const result = await this.$store.dispatch('AC_TagInferenceManageQueryTagInferenceMap', params);
                this.chartLength=Object.keys(result.data.map).length;
               if(this.chartLength==0){this.isShow=false;return false;}
               
                let i=0;
                for(let val in result.data.map){
                     let displayArr='';
                    let realVal=result.data.map[val];
                    let realValLength=result.data.map[val].length;
                        displayArr={
                             name:realVal[0].influenceOutcome,
                             children:[
                                
                             ]
                        }
                    for(let i=0;i<realValLength;i++){
                          let  objname;
                      if(realVal[i].annotate){
                        objname={
                          name:realVal[i].value,
                          children:[
                               {name:realVal[i].influenceFactor+"  ++",value:realVal[i].annotate}
                          ]
                        }
                      }else{
                        objname={
                          name:realVal[i].value,
                          children:[
                               {name:realVal[i].influenceFactor,value:realVal[i].annotate}
                          ]
                        }

                      }
                      
                      displayArr.children.push(objname)
                    }
                     i++;
                    let chartid='chart'+i;
                    this.isShow=true;
                    setTimeout(() => {
                        self.drawLine(displayArr,chartid);              
                    }, 500); 
                }
            },
        drawLine(data,chartid){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(chartid))
        // 绘制图表
        myChart.setOption({
             tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove',
                formatter : '{c0}',
                // formatter: function(datas){
                //             console.log(datas.data);
                //                 var res='';
                //                 for(var i=0, l=datas.data.name.length;i<l;i++){
                //                     res+=datas.data.name[i];
                //                     if((i<(l-1)) && (i%20==0)){
                //                         res=res+"<br/>";//就是这里！！！
                //                     }
                //             }
                //             return res;
                // },
                position:"right"
            },
             series:[
                {
                    type: 'tree',
                    data: [data],
                    top: '20%',
                    left: '10%',
                    bottom: '20%',
                    right: '30%',
                    label: {
                        normal: {
                            position: 'top',
                            verticalAlign: 'middle',
                            align: 'right'
                        },
                       
                    },
                    leaves: {
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left',
                            },
                          
                        }
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]    
        });
     },
     changeselect(){  
       this.queryDataList();
     },
    async  querySearchaffected() {
            let para={
                "pageNum":1,
                "pageSize":1000,
            }
            const res =await this.$store.dispatch('AC_InfluenceOutcomeServiceQueryInfluenceOutcome', para);
            this.influenceOutcome=[];
            if(res.code==200) {
                this.influence=res.data.influenceOutcomes;
                for(let i=0;i<res.data.influenceOutcomes.length;i++){
                    if(res.data.influenceOutcomes[i].id !=undefined && res.data.influenceOutcomes[i].influenceOutcome !=undefined){
                     this.influenceOutcome[res.data.influenceOutcomes[i].influenceOutcome]=res.data.influenceOutcomes[i].id;
                    }
                }
            }
        },
    
       
       
   }
}
</script>
<style scoped>
.select{
    margin: 0 20px;
}
.nothing-data{
        text-align: center;
        margin: 50px 0;
        color: #a09d9d;
        font-size: 1.3rem;
}
    
</style>

 
