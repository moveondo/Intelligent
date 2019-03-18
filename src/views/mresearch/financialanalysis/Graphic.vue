<template>
   <div class="graphic">
      <div class="header-his">
          {{$t('financialAnalysis.graphicConclusion')}}
            <!-- <span @click="editSection0=true" class="addimg">
               <img :src="editimg" alt="">
            </span> -->
       </div>
        <!-- <div class="container-1">
            <quill-editor ref="myTextEditor" v-model="content"></quill-editor>
            <el-button class="editor-btn" type="primary" @click="submit">保存</el-button>
        </div> -->
        <div  class="container-1">
            <div v-for="item in reportcontent" :key="item.id">
             <p v-if="item.type===2" v-html="item.data" class="richText">
                 {{item.data}}
             </p>
             <div class="schart-box" v-else-if="item.type===5">
                <!-- <div class="content-title">柱状图 {{item.data.options1}}</div> -->
                <schart class="schart" :canvasId="item.id+'str'" :data="item.data.data1" :type="item.style" :options="item.data.options1"></schart>
             </div> 
            </div>
        </div>      
            <!-- 编辑弹出框 -->
        <el-dialog :title="$t('message.update')" :visible.sync="editSection0" width="40%">
            <el-form ref="editform" :model="editform" label-width="100px">
                <el-form-item :label="$t('myTarget.title')">
                    <el-input v-model="editform.title"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit()">{{$t('message.confirm')}}</el-button>
                <el-button @click="editSection0 = false">{{$t('message.cancel')}}</el-button>
            </span>      
        </el-dialog>
   </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import editimg from '../../../../static/img/tags/edit.png';
    import Schart from 'vue-schart';
    export default {
        data() {
            return {
             editimg:editimg,
             editSection0:false,
             reportcontent:[],
             editform:{
                title:''
             },
            }
        },
        components: {
            Schart
        },
        created(){
            this.getdata();  
        },
        methods: {
            async saveEdit(){
                let para = {
                    id: this.current1,
                    reportId: this.reportId,
                    title: this.editform.title
                }
                const result = await this.$store.dispatch('AC_SectionServiceUpdateSection',para);
                this.editSection0 = false; 
                this.title=this.editform.title; 
                this.$message.success(this.$t('message.success')); 
            },
            getdata(){
                this.$axios.post('/analyzemanage/reportService/getConclusionRichText',{ aid: this.$route.query.Id}).then((res) => {
                    this.reportcontent=res.data.data.outputElements;
                })
            },
        }
    }

</script>
<style lang="less" scoped>
.graphic{
    max-width: 1128px;
}
 .header-his{
    height: 100px;
    line-height: 100px;
    background: #fff;
    font-size: 1.8rem;
    padding-left: 30px;
    border-radius: 3px;
   }
 .container-1{
    padding:50px 50px 20px 40px;
    border-radius: 0px;
    background: #fff; 
    margin-bottom: 100px; 
    margin-top: 13px; 
    .quill-editor{
        background: #fff;
    }
}

   .schart-box{
    display: inline-block;
    margin: 20px;
    }
    .schart{
        width: 500px;
        height: 400px;
    }
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }


</style>