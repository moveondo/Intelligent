<template>
<div class="basic-im">
    <div class="basic">
           {{$t('financialAnalysis.basicInformation')}}
    </div>
    <el-form class="form1" label-width="150px" style="min-width:600px;">

        <el-form-item :label="$t('analyst.financialModel')">
            <el-input disabled v-model="analyzeData.financeModelId"></el-input>
        </el-form-item>

        <el-form-item :label="$t('financialAnalysis.companyCode')">
            <el-input v-model="analyzeData.corpCode"></el-input>
        </el-form-item>

        <el-form-item :label="$t('financialAnalysis.financialAnalysis')">
            <el-input v-model="analyzeData.name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('dataTable.description')">
            <el-input
            type="textarea"
            :rows="2"
            v-model="analyzeData.description">
            </el-input>
        </el-form-item>
 
        <el-form-item>
            <el-button type="primary" @click="updata">{{$t('dataTable.save')}}</el-button>
        </el-form-item>
    </el-form>
</div>
   
</template>

<script>
    export default {
        data() {
            return {
                analyzeData: '',
            }
        },
        created() {
            this.getAnalyze()
        },
        methods: {
            async getAnalyze() {
                let params = {id:this.$route.query.Id}
                const result = await this.$store.dispatch('AC_AnalyzeServiceGetAnalyze', params);
                result.data.analyze.createdAt = this.timetrans(result.data.analyze.createdAt)
                this.analyzeData = result.data.analyze 
            },
            async updata() {
                
                if(!this.analyzeData.name || !this.analyzeData.corpCode || !this.analyzeData.description) {
                    this.$message.error(this.$t('message.empty'));
                    return false
                }
                
                let params = {
                    id: this.$route.query.Id,
                    name: this.analyzeData.name,
                    corpCode: this.analyzeData.corpCode,
                    description: this.analyzeData.description
                }

                const result = await this.$store.dispatch('AC_AnalyzeServiceUpdateAnalyze', params);
                if ( result.code == 200) {
                    this.$message.success(this.$t('message.success'));
                }else {
                    this.$message.error(this.$t('message.fail'));
                }
            },
            timetrans(date) {  
                var date = new Date(date);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';   
                return Y+M+D;   
            },
        }
    }

</script>
<style lang="less" scoped>
 .basic-im{
    max-width: 1128px;
    width: 100%;
    .basic{
        color: #09509d;
        font-size: 1.5rem;
        margin: 13px 0;
        font-weight: bold;
        background: #fff;
        height: 113px;
        line-height: 113px;
        padding-left: 25px;
        border-radius: 1px
    }
    .form1{
         background: #fff;
         width: 100%;
         padding: 30px;
         box-sizing: border-box;
         text-align: left;
    }

 }
 
</style>

