<template>
    <div class="special-vue">
        <div class="guide">
            <div class="left">
                {{$t('financialAnalysis.financialAnalysis')}}
            </div>
            <div class="right">
                 <el-tooltip class="item" effect="dark" :content="$t('message.preview')" placement="bottom">
                    <i class="el-icon-view" @click="preView()">  </i>
                </el-tooltip>
                 <el-tooltip class="item" effect="dark" :content="$t('mresearch.export')" placement="bottom">
                    <i class="el-icon-upload2" @click="DownLoad()"></i>
                </el-tooltip>
            </div>
        </div>
         <div class="content-modify">
            <div class="queryside">
                <div class="sidename" >
                    {{$t('financialAnalysis.financialAnalysis')}}
                </div>
                <div v-for="item in items" :key="item.id" class="sidetext" v-bind:class="{currentclick:item.id==current1}" @click="ClickIndex(item.id,item.title,item.richText)" >                   
                    {{ item.title }} 
                </div>      
            </div>       
            <div class="container1">
              <div v-if="this.title== $t('financialAnalysis.basicInformation')" class="fixheight">
                   <v-BasicInformation></v-BasicInformation>
              </div>
              <div v-else-if="this.title==$t('financialAnalysis.historicalData')" class="fixheight">
                   <vhistoricaldata></vhistoricaldata>
              </div>
              <div v-else-if="this.title==$t('financialAnalysis.assumedEstimate')" class="fixheight-two">
                   <v-Assumed></v-Assumed>
              </div>
              <div v-else-if="this.title==$t('financialAnalysis.graphicConclusion')" class="fixheight">
                   <v-Graphic></v-Graphic>
              </div>
           </div>
         </div>  
          <!-- 预览 -->
        <div v-show="isPre">
            <div class="bg"></div>
            <div class="pc_preview">
                <div v-for="item in reportcontent" :key="item.id">
                    <p v-if="item.type=='2'" v-html="item.data" class="richText"></p>
                    <div class="schart-box" v-if="item.type=='5'">
                     <div class="content-title">{{$t('financialAnalysis.histogram')}}</div>
                      <schart class="schart" canvasId="bar" :data="item.data.data1" type="bar" :options="item.data.options1"></schart>
                    </div> 
                </div>  
                <el-button class="out" type="primary" @click="hideOut()" >{{$t('financialAnalysis.exitPreview')}}</el-button>
            </div>
        </div>   
    </div>
</template>
<script>

    import vAssumed from './Assumed.vue';
    import vBasicInformation from './BasicInformation.vue';
    import vGraphic from './Graphic.vue';
    import vhistoricaldata from './historicaldata.vue';
    import vchart from './chart.vue';
    import vtable from './table.vue';
    import Schart from 'vue-schart';

    export default {
        data: function(){
            return {
              url:"/analyzemanage/reportService/getConclusionRichText",
                current1:0,
                title: this.$t('financialAnalysis.basicInformation'),
                isPre:false,
                reportcontent:[],
                items: [
                    {
                        id:0,
                        title: this.$t('financialAnalysis.basicInformation')
                    },{
                        id:1,
                        title: this.$t('financialAnalysis.historicalData')
                    },{
                        id:2,
                        title: this.$t('financialAnalysis.assumedEstimate')
                    },{
                        id:3,
                        title: this.$t('financialAnalysis.graphicConclusion')
                    }
                ],
            }
        },
        components: {
           vAssumed,vBasicInformation, vhistoricaldata,vGraphic,vchart,Schart,vtable
        },
        created(){
          
        },
        methods: {
            ClickIndex(index,title){
                let self=this;
                self.current1=index; 
                self.title=title;    
            },
            preView(){
                let self=this;
                self.isPre=true;            
                let para = {
                    aid: this.$route.query.Id
                }
                self.$axios.post(self.url,para).then((res) => {
                   
                        self.reportcontent=res.data.data.outputElements;
                                 
                }).catch(function (err) {
                    console.log("调用失败", err)
                })
            },
             hideOut(){
                this.isPre=false;
            },
           
        }
    }
</script>
<style lang="less" scoped>
    .special-vue{
        height: 100%;
        width: 100%;
        .guide{
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            justify-content: space-between;
            background: #1c84c6;
            color: #fff;
            height: 35px;
            line-height: 35px;
            padding-right: 0px;
            font-size: 1.3rem;
            padding: 0 0 0 2rem;
        }
        .guide .right{
            padding-right: 50px;
        }
        .guide .right i{
            font-size: 2rem;
            margin-right: 15px; 
            cursor: pointer;
        }
    }
    .content-modify{
        display: flex;
        min-height: 100%;
        padding-top: 42px;
        box-sizing: border-box;
        .queryside {
            width: 200px !important;
            min-width: 200px; 
            line-height: 3rem;
            font-size: 1.4rem;
            border-right: 1px solid #ddd; 
            background: #fff;
            box-sizing: border-box;
            .sidename{         
                font-size: 1.7rem;
                font-weight: bold;
                color: #292a2a;
                text-align: left;
                margin-bottom: 10px;
                padding: 3rem 0 1rem 1.6rem; 
             }
             .deleteimg img{
                 vertical-align: middle;
                 cursor: pointer;
                 padding-left: 4px;
             }    
        }
        .currentclick{
            background: #cbd5e8;
            font-size: 1.4rem;
            line-height: 34px;
        }
        .sidetext{
            text-indent: 4em;
            line-height: 34px;
        }
        .container1{     
            flex: 1;
            background: #e8e9e9;
            box-sizing: border-box;
            .fixheight{ 
                display: flex;
                height: 100%;
                justify-content: center;
                padding: 10px 10px 0;
                box-sizing: border-box;
            }
            .fixheight-two{
                height: 100%;
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
      z-index: 9998;
    }

    .pc_preview {
        position: fixed;
        top: 50%;
        left: 20%;
        width: 80%;
        height: 80%;
        margin-top: -425px;
        margin-left: -161px;
        background: #fff;
        z-index: 9999;
        overflow: scroll;
        padding: 50px;
        box-sizing: border-box;
        text-align: left;
        .title{
            font-size: 1.8rem;
            font-weight: bold;
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


