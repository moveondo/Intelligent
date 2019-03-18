<template>
 <div>
    <!-- 编辑可能的图表弹出框 " -->
    <el-dialog title="编辑" :visible.sync="chartSection" width="40%">
        <div v-if="this.step==1">
            <el-form ref="chartform" :model="chartform" :rules="rules" label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="chartform.title"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type"> 
                <el-select v-model="chartform.type" placeholder="请选择图标类型">
                    <el-option label="饼图" value="pie"></el-option>
                    <el-option label="柱状图" value="bar"></el-option>
                    <el-option label="折线图" value="line"></el-option>
                    <el-option label="柱状图" value="cross"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="横坐标" prop="xAxis" placeholder="请选择图标类型"> 
                <el-input type="textarea" v-model="chartform.xAxis"></el-input>
                </el-form-item> 
                <el-form-item label="纵坐标" prop="yAxis">
                <el-input type="textarea" v-model="chartform.yAxis"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="chartSection = false">{{$t('message.cancel')}}</el-button>
                <el-button type="primary" @click="saveChart()">预 览</el-button>
            </span> 
        </div>
        <div v-show="this.step==2">

            <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="step = 1">修 改</el-button>
                <el-button type="primary" @click="viewChart()">{{$t('message.confirm')}}</el-button>
            </span> 
        </div>     
    </el-dialog>
</div>
</template>
<script>


export default {
  props: {
    childCom: Boolean //这里指定了字符串类型，如果类型不一致会警告的哦
  },
    data () {
        return {
            charturl:"/reportmanage/chartDataManageService/saveAsChartJson",
            chartSection:false,
            chartform:{
                title:'',
                type:'',
                xAxis:'',
                yAxis:''
            },
            step:1,
            rules: {
                title: [
                    { required: true, message: '请输入图标标题', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择图标类型', trigger: 'change' }
                ],
                xAxis: [
                    { required: true, message: '请填写图标横坐标，以逗号隔开', trigger: 'blur' }
                ],
                yAxis: [
                    { required: true, message: '请填写图标纵坐标，以逗号隔开', trigger: 'blur' }
                ]
            },
          
        }
    },
    created() {
        
    },
    watch:{
       childCom(newValue, oldValue){
          this.chartSection=newValue;   
      }
    },
    methods: {
              saveChart(){
                let para = {
                    "reportId": this.$route.query.id,
                    "sectionId": 1,
                    "title": this.chartform.title,
                    "type": this.chartform.type,
                    "xaxisData": this.chartform.xAxis,
                    "yaxisData": this.chartform.yAxis,
                 }
                this.$axios.post(this.charturl,para).then((res) => {
                                          
                    this.step=2; 
                    this.drawLinechart(res.data.data.json);
                    let str=this.$refs.ueditor.getUEContent();
                    let imgimg=this.imgtest;
              
                    //  str=str.replace(/@chart/g, '<p><img src=/'+imgimg+' width=50% >'+'#'+this.chartform.title+'#'+'</p>');
                    //  setTimeout(this.defaultMsg=str,1000);
                     this.chartform.type=""; 
                     this.chartform.title=""; 
                     this.chartform.xAxis=""; 
                     this.chartform.yAxis="";  
             
                }).catch(function (err) {
                    console.log("调用失败", err)
                })
               
           },
             drawLinechart(json){
              
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));
             
                // 绘制图表
                myChart.setOption(JSON.parse(json));
                let img=myChart.getDataURL();
                this.imgtest=img;
                   
           },
            viewChart(){
               this.chartSection=false;
               this.step=1;

           },
  
    },
}
</script>
<style lang="less" scoped>



</style>
