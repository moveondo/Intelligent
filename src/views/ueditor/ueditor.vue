<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  import '../../../static/ueditor/ueditor.config.js'
  import '../../../static/ueditor/ueditor.all.js'
  import '../../../static/ueditor/lang/zh-cn/zh-cn.js'

  //引入公式插件。我们也是通过import的方式加进来的。
import '../../../static/ueditor/kityformula-plugin/addKityFormulaDialog.js'
import '../../../static/ueditor/kityformula-plugin/getKfContent.js'
import '../../../static/ueditor/kityformula-plugin/defaultFilterFix.js'

  export default {
    props: {
      id: {
          type: String
      },
      config: {
          type: Object
      },
      defaultMsg:{
        type:String
      }
    },
    data() {
      return {
        editor: null
      }
    },
    watch:{
      defaultMsg(newValue, oldValue){
        //console.log("defaultMsg"+newValue+"--odlvalue"+oldValue);
        //if(oldValue){
        this.getReady();
       // }   
         
      }

    },
    created(){
   
      
    

    },
    mounted() {
         //初始化UE
        this.$nextTick(()=>{//避免在切换到填空题再切回来找不到dom而报offsetWidth undefined
               const _this = this;
               _this.editor = UE.delEditor("editor");
               _this.editor = UE.getEditor('editor',_this.config); 
               _this.editor.addListener("ready", function () {
                _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
                _this.contentChange();
           
        })
      })
      
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      
      getReady:function(){
        const _this = this;
        //console.log("_this.defaultMsg"+_this.defaultMsg);
        if(_this.defaultMsg != null && _this.defaultMsg != undefined && _this.defaultMsg != ''){
            _this.editor.setContent(_this.defaultMsg);        
        }       
      },
      contentChange:function(){
        const _this = this;
         _this.editor.addListener("contentChange",function(){
         // console.log('内容改变:'+_this.getContentTxt());
    
            if(_this.getContentTxt().indexOf("@chart") != -1){
                let para={
                  chart:true
                }
                _this.$emit("onChange",para);
            }else if(_this.getContentTxt().indexOf("@vjson") != -1){
               let para={
                  vjson:true
                }
                _this.$emit("onChange",para);

            }
        });
      },
      getUEContent: function(){
       return this.editor.getContent();
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      }
    }
  }
</script>
<style>
 #editor{
   z-index: inherit;
 }
</style>
