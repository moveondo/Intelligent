<template>
    <div class="special-vue">
        <div class="guide">
            <div class="left">
                当前位置：财务模型/模型编辑/输出模版输出编辑
            </div>
        </div>
         <div class="content-modify">
            <div class="container">
               <div>
                    <el-form ref="jsform" :model="jsform" label-width="100px">
                    <el-form-item label="标题">
                        <el-input type="textarea" v-model="jsform.json" :rows="20"></el-input>
                    </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="canclejs()">{{$t('message.cancel')}}</el-button>
                        <el-button type="primary" @click="saveJs()">{{$t('message.confirm')}}</el-button>
                    </span> 
                </div>         
           </div>
         </div>
    </div>
</template>
<script>
 
    export default {
        data: function(){
            return { 
                url:"/analyzemanage/chartDataService/queryChartData",
                url1:"/analyzemanage/chartDataService/updateChartData",     
                jsform:{
                    json:''
                },
                jsid:0,
                updateid:null
            }
        },
        created(){
            var jsid =this.$route.query.jsid ;
            this.jsid =jsid ;
            this.querydata(jsid);
        },
        methods: {
          querydata(jsid){
                let self=this;
        
                let para = {
                    "jsidAlt":jsid,
                    "financeModelId":sessionStorage.getItem("financeModelId")
                }
                self.$axios.post(self.url,para).then((res) => {          
                     self.jsform.json=res.data.data.chartDatas[0].json;
                     this.updateid=res.data.data.chartDatas[0].id;
                
                }).catch(function (err) {
                    console.log("调用失败", err)
                }) 

          },
           saveJs(){
              let self=this;
            
                let para = {
                    "id":this.updateid,
                    "json":self.jsform.json,
                }
                self.$axios.post(self.url1,para).then((res) => {   
                    if(res.data.code==200){
                         self.jsform.json="";
                         window.close();
                    } else{
                        self.$message.error(res.data.msg)
                    }             
                    
                }).catch(function (err) {
                    console.log("调用失败", err)
                })  

           },
           canclejs(){        
                window.close();
           }
        }
    }
</script>
<style lang="less" scoped>
   .special-vue{
        height: 100%!important;
        width: 100%;
        box-sizing: border-box;
        .guide{
            display: flex;
            justify-content: space-between;
            background: #1c84c6;
            height: 35px;
            color: #fff;
            line-height: 35px;
            padding-right: 0px;
            font-size: 1.3rem;
            padding: 0 0 0 2rem;   
        }
    }
    .content-modify .container{
       width: 88%;
       margin-top: 30px;
       .dialog-footer{
        margin-left: 100px;
       }
    }
  
</style>


