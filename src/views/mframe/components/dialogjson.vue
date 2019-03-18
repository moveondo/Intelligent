<template>
 <div>
     <!-- 编辑可能的vjson弹出框 -->
    <el-dialog title="编辑" :visible.sync="vjsonSection" width="40%">
    <div>
        <el-form  :model="vjsonform" label-width="100px">
            <el-form-item label="请输入" placeholder=""> 
            <el-input type="textarea" :rows="7" v-model="vjsonform.jsondata"></el-input>
            </el-form-item> 
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="vjsonSection = false">{{$t('message.cancel')}}</el-button>
            <el-button type="primary" @click="saveVjson()">{{$t('message.confirm')}}</el-button>
        </span> 
    </div>    
</el-dialog>

</div>
</template>
<script>


export default {
  props: {
    childJson: Boolean //这里指定了字符串类型，如果类型不一致会警告的哦
  },
    data () {
        return {   
            vjsonform:{
                jsondata:''
            },
            vjsonSection:false
        }
    },
    created() {
        
    },
    watch:{
       childJson(newValue, oldValue){
          this.vjsonSection=newValue;   
      }
    },
    methods: {
            saveVjson(){
              // let str=this.$refs.ueditor.getUEContent();
            //    str=str.replace(/@vjson/g, '<p>testvjson</p>');
            //    setTimeout(this.defaultMsg=str,1000);
               this.vjsonSection=false;
            },  
  
    },
}
</script>
<style lang="less" scoped>



</style>
