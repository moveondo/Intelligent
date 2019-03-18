<template>
    <div class="blurry">
       <el-form-item :label="$t('myTarget.companyName')"> 
            <el-autocomplete popper-class="affected"  v-model="stockNamevalue" :fetch-suggestions="queryBlurrystockName" @select="handleSelect1"></el-autocomplete>
        </el-form-item> 
        <el-form-item :label="$t('myTarget.stockCode')"> 
           <el-autocomplete popper-class="affected"  v-model="stockCodeValue" :fetch-suggestions="queryBlurrystockCode" @select="handleSelect2"></el-autocomplete>
        </el-form-item> 
    </div>
</template>
<script>
export default {
    data(){
        return{
           stockCodeArr:[],
           stockNameArr:[],
           stockCodeValue:'',
           stockNamevalue:'',
           stockArr1:[],
           stockArr2:[]
        }
    },
    methods:{
        async  queryBlurrystockName(str, cb) {
            let para={
               stockName: str,
            }
            this.stockNameArr=[];
            const res =await this.$store.dispatch('AC_TargetCorpManageBlurryQueryBusinessCorp', para);
            if(res.code==200) {
                for(let i=0;i<res.data.businessCorps.length;i++){
                    var obj = {}
                    obj.value = res.data.businessCorps[i].stockName;
                    this.stockNameArr.push(obj);
                    this.stockArr1[res.data.businessCorps[i].stockName]=res.data.businessCorps[i].stockCode;

                }
                 cb(this.stockNameArr);
            }
        },
        async  queryBlurrystockCode(str, cb) {
            let para={
               stockCode: str,
            }
            this.stockCodeArr=[];
            const res =await this.$store.dispatch('AC_TargetCorpManageBlurryQueryBusinessCorp', para);
            if(res.code==200) {
                for(let i=0;i<res.data.businessCorps.length;i++){
                    var obj = {}
                    obj.value = res.data.businessCorps[i].stockCode
                    this.stockCodeArr.push(obj);
                    
                    this.stockArr2[res.data.businessCorps[i].stockCode]=res.data.businessCorps[i].stockName;
                }
                cb(this.stockCodeArr);
            }
        },
        handleSelect1(item) {
            this.stockCodeValue=this.stockArr1[item.value];

        },
        handleSelect2(item) {
            this.stockNamevalue=this.stockArr2[item.value];
        },
    }
}
</script>
<style lang="less" scoped>
.el-autocomplete{
    width: 100%;
}
</style>
