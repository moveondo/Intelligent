<template>
    <div class="preview" >
        <div class="pc_preview"  >
            <div class="header-fix"  >                     
                    <i class="el-icon-close" @click="hideOut()"></i>
            </div>
            <div class="viewcontent" v-for="item in reportcontent" :key="item.id"  >
                <div v-show="item.type==5">
                        <div :id="'chart'+item.id" :style="{width: item.chartWidth, height: item.chartHeight}"></div>    
                </div>                 
                <div v-if="item.type==2">
                    <!-- <p class="title">{{item.title}}</p> -->
                    <p v-html="item.data" class="richText"></p>
                </div>
            </div>           
        </div>
    </div>
</template>
<script>
 
    export default {
        data: function(){
            return { 
                url:"/analyzemanage/reportService/getPreViewRichText", 
                reportcontent:[],
                loading: '',
                Length:-1
            }
        },
        created(){
            this.openFullScreen();
               var outPutTemplateId =this.$route.query.outPutTemplateId ;
           
              this.preView(outPutTemplateId);
        },
        methods: {
        openFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                this.loading=loading;
         },
         imme(chartid,option){
                var myChart = this.$echarts.init(document.getElementById(chartid));
                // 绘制图表
                myChart.setOption(option);
                

           } ,
           preView(outPutTemplateId){
                let self=this;          
                let para = {
                    "outPutTemplateId":outPutTemplateId
                }
                self.reportcontent=[];
                self.$axios.post(self.url,para).then((res) => {  
                  
                   self.Length=res.data.data.outputElements.length; 
                   self.reportcontent=res.data.data.outputElements; 
                    if(self.Length>=0){
                         this.loading.close();
                        setTimeout(function(){
                       
                        self.dofor(res.data.data.outputElements);
                        },1000)
                        
                    }  
                             
                }).catch(function (err) {
                    console.log(this.$t('message.fail'), err)
                })        
                
            },
            dofor(outputElements){
                let self=this;  
                  for(let i=0;i<self.Length;i++){
                       // (function(arg){
                             console.log(i+":"+outputElements[i].type)
                             if(outputElements[i].type=='5'){

                              let chartid='chart'+outputElements[i].id;
                              let option=outputElements[i].data;
                             //  console.log("chartid"+chartid+"::"+option)
                                self.imme(chartid,option);
                            }

                       // })(i)     
                    }
            },      
           hideOut(){           
                window.close();
           }
        }
    }
</script>
<style lang="less" scoped>
  .preview{
      .pc_preview{
        // width: 1024px;
        box-sizing: content-box;
        padding: 40px 80px;
        font-family: "SimHei";
        margin: 0 auto;
         .header-fix{
            cursor: pointer;
            color: #0e8aca;
            padding-right: 34px;
            font-size: 1.6rem;
             position: fixed;
             right: 0;
          
              
        }

    }
  }
</style>


