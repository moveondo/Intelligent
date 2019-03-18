<template>
    <div class="special-vue">
        <div class="guide">
            <div class="left">
                 <router-link to="/analyst/indexfmodel">{{$t('analyst.financialModel')}}</router-link>
                 / {{$route.query.name}}<span v-if="selectSection.title != $t('analyst.modelVariable') && !modelTemplateListShow"> / {{ outputTmplate.name }}</span>
            </div>
            <div class="right">
                <el-tooltip class="item" effect="dark" :content="$t('dataTable.save')" placement="bottom">
                   <img :src="keepimg" @click="submit()" />
                </el-tooltip>
                 <el-tooltip class="item" effect="dark" :content="$t('message.preview')" placement="bottom">
                      <i class="el-icon-view" @click="preView()">  </i>
                </el-tooltip>
                 <el-tooltip class="item" effect="dark" :content="$t('analyst.download')" placement="bottom">
                    <i class="el-icon-upload2" @click="DownLoad()"></i>
                </el-tooltip>       
            </div>
        </div>
         <div class="content-modify">
            <div class="queryside">
                <div class="sidename" >
                    {{$t('analyst.financialModel')}}
                </div>
                <div v-for="item in navList" :key="item.title" class="sidetext" v-bind:class="{currentclick:item.title==selectSection.title}" @click="sectionChange(item)">
                    {{item.title}}
                </div>
            </div> 
            
            <div class="container1">
                <div class="list-header">
                    <div class="title"><i class="el-icon-tickets"></i> {{selectSection.title}}</div>
                    <el-button type="primary" v-if="selectSection.title == $t('analyst.modelVariable')" @click="addVariable">{{$t('dataTable.create')}}</el-button>
                    <el-button type="primary" v-if="selectSection.title != $t('analyst.modelVariable') && modelTemplateListShow" @click="addOutputTemplate">{{$t('dataTable.create')}}</el-button>
                </div>

                <modelVariable ref="modelVariable" v-if="selectSection.title == $t('analyst.modelVariable')"></modelVariable>
                <modelTemplateList ref="modelTemplate" v-if="selectSection.title != $t('analyst.modelVariable') && modelTemplateListShow"></modelTemplateList>
                
                <div v-if="selectSection.title != $t('analyst.modelVariable') && !modelTemplateListShow" class="ueditor-content">
                    <UEditor :config=config :defaultMsg = defaultMsg @onChange="onChange"  ref="ueditor" ></UEditor>
                    <el-button class="editor-btn" type="primary" @click="submit">{{$t('dataTable.save')}}</el-button>
                </div>
           </div>
         </div>
          <!-- 编辑chart弹出框 -->
        <dialogchart :child-com="chartSection"></dialogchart>
        <!-- 编辑vjson弹出框 -->   
        <dialogjson :child-json="vjsonSection"></dialogjson>

        <!-- 预览 -->
        <div v-show="isPre">
            <div class="bg" @click="hideOut()"></div>
            <div class="pc_preview"  :class="{mac_preview:_isMac}">
                <div class="header-fix"  >                     
                    <i class="el-icon-location-outline"  @click="jumpUrl()"></i>
                        <i class="el-icon-close" @click="hideOut()"></i>
                </div>
                <div class="viewcontent" v-for="item in reportcontent" :key="item.id">
                    <div v-show="item.type==5">
                        <div :id="'chart'+item.id" :style="{width: item.chartWidth, height: item.chartHeight}"></div>    
                    </div>               
                    <div v-if="item.type==2">
                        <p v-html="item.data" class="richText"></p>
                    </div>
                </div>  
            </div>        
        </div>     
    </div>
</template>
<script>
    import UEditor from '../../ueditor/ueditor.vue';
    import outimg from '../../../../static/img/tags/out.png';
    import keepimg from '../../../../static/img/tags/keep.png';
    import modelTemplateList from '../components/modelTemplateList';
    import modelVariable from '../components/modelVariable';
    import dialogchart from '../../mframe/components/dialogchart';
    import dialogjson from '../../mframe/components/dialogjson';
    export default {
        components: {
            UEditor,
            modelVariable,
            modelTemplateList,
            dialogchart,
            dialogjson    
        },
        data(){
            return {
                url1:"/analyzemanage/chartDataManageService/saveOutputTemplate",
                url2:"/analyzemanage/reportService/getPreViewRichText", 
                content:'',
                outimg:outimg,
                keepimg:keepimg,
                config: {
                    autoHeightEnabled: false,
                    autoFloatEnabled: true,
                    initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    BaseUrl: '',
                    UEDITOR_HOME_URL: 'static/ueditor/'
                },
                outputTmplate:"",
                defaultMsg: '',
                reportId: this.$route.query.Id,
                isPre:false,
                reportcontent:'',
                outputTemplateId:0,
                _isMac:false,
                selectSection: '',
                chartSection:false,
                vjsonSection:false,
                modelTemplateListShow: true,
                navList: [
                    {
                        title: this.$t('analyst.outputTemplate')
                    },
                    {
                        title: this.$t('analyst.modelVariable')
                    }
                ],    
                imgtest:'',
                loading: '',
                Length:-1,
            }
        },   
        created(){
            this.isMac();
        },
        mounted () {
            this.sectionChange();
        },
        methods: {
            sectionChange(item) {
                this.selectSection = item
                this.modelTemplateListShow = true
                if (!this.selectSection) {
                    this.selectSection = this.navList[0]
                }
            },
            onChange(val){
                this.chartSection=val.chart;
                this.vjsonSection=val.vjson;
            }, 
            drawLine(){
                let para = {
                    "outPutTemplateId": this.outputTmplate.id
                }
                this.$axios.post(this.url2,para).then((res) => {   
                    this.reportcontent=res.data.data.outputElements;
                })                 
            }, 
            async imme(chartid,option){
                let myChart = await this.$echarts.init(document.getElementById(chartid));
                // 绘制图表
                myChart.setOption(option);
            },
           preView(){
                let self=this;
                 self.isPre=true; 
                 self.reportcontent=null;
                 this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
   
                let para = {
                    "outPutTemplateId": this.outputTmplate.id
                }                     
                self.$axios.post(self.url2,para).then((res) => { 
                    if(res.data.code==200){
                           self.reportcontent=res.data.data.outputElements;
                            self.Length=res.data.data.outputElements.length;

                            if(self.reportcontent){
                              this.$store.commit('loadingChange',{show: false})
                                for(let i=0;i<self.Length;i++){  
                                        if(res.data.data.outputElements[i].type=='5'){
                                        let chartid='chart'+res.data.data.outputElements[i].id;
                                        let option=res.data.data.outputElements[i].data;
                                            setTimeout(function(){
                                                self.imme(chartid,option)
                                            }, 310);
                                        }    
                                }
                            } 
                    }else if(res.data.code == 500) {
                        this.isPre = false
                        this.$store.commit('loadingChange',{show: false})
                        this.$message.error(this.$t('message.fail'))
                    }else {
                        this.isPre = false
                        this.$store.commit('loadingChange',{show: false})
                        this.$message.error(res.data.msg)
                    }
                })               
            },
            jumpUrl(){
               let self=this;
               let routeData = self.$router.resolve({ path:'modelpreview', query: { "outPutTemplateId": this.outputTmplate.id}});
                window.open(routeData.href, '_blank');   
            },

            addVariable() {
                this.$refs.modelVariable.selectOperation()
            },

            addOutputTemplate() {
                this.$refs.modelTemplate.addFormVisible = true
            },

            hideOut(){
                this.isPre=false;
            },

            submit(){
                let self=this;
                let reportId =self.$route.query.Id ;
                self.content=self.$refs.ueditor.getUEContent();
                
                let para = {
                    financeModelId: reportId,
                    outputTemplateId: this.outputTmplate.id,
                    richText:self.content
                }
                self.$axios.post(self.url1,para).then((res) => {
                    
                   self.outputTemplateId=res.data.data.outputTemplateId;
                    if(self.outputTemplateId){
                         this.drawLine();
                     }
                    self.$message.success(this.$t('message.success')); 
                }).catch(function (err) {
                    console.log("调用失败", err)
                })              
            },
            
            isMac() {
                let is_Mac=/macintosh|mac os x/i.test(navigator.userAgent);
                this._isMac=is_Mac;
            },
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
            .left a{
                color:#fff;
            } 
        }
        .guide .right{
            padding-right: 40px;
            img{
                font-size: 2rem;
                margin-right: 15px;
                cursor: pointer;
                vertical-align: text-bottom;
            }
        }
        .guide .right i{
          font-size: 2rem;
          margin-right: 15px; 
        cursor: pointer;
        }
    }
    .content-modify{
        display: flex;
        background: #ddd;
        .queryside {
          width: 200px !important;
          min-width: 200px;
          line-height: 3rem;
          font-size: 1.5rem;      
          border-right: 1px solid #ddd; 
          background: #fff;
            .sidename{         
                font-size: 1.8rem;
                color: #292a2a;
                text-align: left;
                margin-bottom: 20px;
                font-weight: bold;
                padding: 3rem 0 1rem 1.6rem; 
                .addimg img{
                    cursor: pointer;
                    padding-left: 4px;
                }
             }
             .deleteimg img{
                 vertical-align: middle;
                 cursor: pointer;
                 padding-left: 4px;
             }
        }
        .sidetext{
            text-indent: 3em;
            line-height: 34px;
            cursor: pointer;
        }
        .currentclick{
            background: #cbd5e8;
            font-size: 1.5rem;
            font-weight: bold;
        }
        .container1{
            width: 100%;
            padding:15px;
            border-radius: 0px;
            background: #fff; 
            .edit-name{
                color: #09509d;
                font-size: 1.5rem;
                margin: 13px 0;
                font-weight: bold;
                background: #fff;
                height: 60px;
                line-height: 60px;
                padding: 15px 25px;
                border-radius: 1px;
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                .edittitle,.save{
                padding: 10px;              
                height: 15px;
                line-height: 15px;
                }
                .save{
                    background: #0f97e0;
                    color: #fff;
                    font-size: 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .addimg img{
                    margin-left: 10px;
                }
                img{
                  vertical-align: sub;
                    padding-left: 4px;
                }
            } 
            .quill-editor{
                background: #fff;
            }
        }
    }
    .bg{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -moz-opacity: .75;
      -khtml-opacity: .75;
      opacity: .75;
      background-color: rgba(0,0,0,0.5);
      z-index: 999;
    }
    .pc_preview {
        position: fixed;
        top: 50%;
        left: 20%;
        width: 850px;
        height: 80%;
        margin-top: -425px;
        background: #fff;
        z-index: 1000;
        overflow: scroll;
        box-sizing: border-box;
        text-align: left;
        font-size: 14px;
        line-height: 33px;
        .header-fix{
            cursor: pointer;
            // background: #fbfc94;
            height: 10px;
            line-height: 34px;
            text-align: right;
            color: #0e8aca;
            padding-right: 34px;
            font-size: 1.6rem;
             position: fixed;
            width: 850px;
              box-sizing: border-box;
              
              img{
                  vertical-align: text-top;
              }
        }
       .viewcontent{
               padding:10px 50px 5px;
       } 
    }
    .mac_preview{
        position: fixed;
        top: 70%;
    }
 .ueditor-content{
     padding-top: 20px;
 }
</style>


