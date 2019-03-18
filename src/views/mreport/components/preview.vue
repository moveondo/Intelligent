<template>
 <div>
      <!-- 预览 -->
    <div>
        <div class="bg" @click="hideOut()"></div>
        <div class="pc_preview"  :class="{mac_preview:_isMac}">
            <div class="header-fix">
                <!-- <i class="el-icon-location-outline"  @click="jumpUrl()"></i> -->
                <i class="el-icon-close" @click="hideOut()"></i>
            </div>
            <!-- <div class="progress">
                <div class="bar" :style="{width:doneRate+'%'}"> {{this.doneRate+"%"}}</div>            
            </div> -->
            <!-- <div class="viewcontent" v-for="item in reportcontent" :key="item.id">
                <p class="title">{{item.title}}</p>
                <p v-html="item.richText" class="richText"></p>
            </div>            -->
            <div class="viewcontent"  v-html="reportcontent" ></div> 

        </div>
    </div>  
</div>
</template>
<script>

export default {
  props: {
    childContent: Object //这里指定了字符串类型，如果类型不一致会警告的哦
  },
    data () {
        return {   
          _isMac:false,
          reportcontent:[],
          doneRate:0,
        }
    },
    created() {
        this.isMac();
        
    },
    watch:{
       childContent(newValue, oldValue){
           //console.log(newValue,oldValue);
          this.reportcontent=newValue.reportcontent; 
          //this.doneRate=newValue.doneRate; 
      }
    },
    methods: {
       isMac() {
            let is_Mac=/macintosh|mac os x/i.test(navigator.userAgent);
            this._isMac=is_Mac;
       }, 
       hideOut(){
            this.$emit("hidepreview",false)
        }, 
  
    },
}
</script>
<style lang="less" scoped>

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
        width: 850px;
        height: 80%;
        margin-top: -425px;
        background: #fff;
        z-index: 9999;
        overflow: scroll;
        box-sizing: border-box;
        text-align: left;
        font-size: 14px;
        line-height: 33px;
        .progress {
            overflow: hidden;
            height: 17px;
            margin-left: 380px;
            background-color: #ebeef5;
            background-image: linear-gradient(to bottom, #f5f5f5, #ebeef5);
            background-repeat: repeat-x;
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff5f5f5', endColorstr='#fff9f9f9', GradientType=0);
            -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
            -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 14px;
            width:350px;
            margin-right:12px;
            position: fixed;
            bottom: 20%;
       }
       .progress .bar {
            width: 0%;
            height: 100%;
            color: #ffffff;
            float: left;
            font-size: 12px;
            text-align: center;
            align-items: center;
            display: flex;
            justify-content: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
            background-color: #409eff;
            background-image: linear-gradient(to bottom, #409eff, #409eff);
            background-repeat: repeat-x;
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff149bdf', endColorstr='#ff0480be', GradientType=0);
            -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
            -moz-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
            box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transition: width 0.6s ease;
            -moz-transition: width 0.6s ease;
            -o-transition: width 0.6s ease;
            transition: width 0.6s ease;
	   }
        .header-fix{
            cursor: pointer;
            // background: #fbfc94;
            height: 50px;
            line-height: 50px;
            text-align: right;
            color: #0e8aca;
            padding-right: 48px;
            font-size: 1.6rem;
             position: fixed;
            width: 850px;
              box-sizing: border-box;
              
              img{
                  vertical-align: text-top;
              }
        }
       .viewcontent{
               padding:10px 50px 50px;
       }
        .title{
            font-size: 1.8rem;
            font-weight: bold;
            margin: 15px 0;
        }
    }
    @media (min-width: 1440px) {
      .pc_preview{
        top: 70%;
      }
    } 

     .mac_preview{
        position: fixed;
        top: 70%;
    }



</style>
