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
                    <el-form ref="vjsonform" :model="vjsonform" label-width="100px">
                    <el-form-item label="内容">
                        <el-input type="textarea" v-model="vjsonform.json" :rows="20"></el-input>
                    </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="canclejson()">{{$t('message.cancel')}}</el-button>
                        <el-button type="primary" @click="saveJson()">{{$t('message.confirm')}}</el-button>
                    </span> 
                </div>         
           </div>
         </div>
    </div>
</template>
<script>
   import bus from '../../common/bus';
    export default {
        data: function(){
            return { 
                url:"/analyzemanage/chartDataService/getChartData",     
                vjsonform:{
                    json:''
                }
            }
        },
        mounted(){
            var vjson =this.$route.query.vjson;
            this.vjsonform.json=vjson;
        
        },
        methods: {
           saveJson(){
            let self=this;
            
            let para = {
                "id":this.$route.query.id,
                "vjson":this.vjsonform.json,
                "num":this.$route.query.num
            }
            console.log(para)
             bus.$emit('modifyvjson', para)        

           },
           canclejson(){        
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


