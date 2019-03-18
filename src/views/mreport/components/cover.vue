<template>
    <div class="cover">
        <div class="cover-show" v-show="!edit" style="width:210mm;height:100%;min-height: 297mm;">
            <div style="position:relative;height:297mm;min-height: 297mm;overflow: hidden;">
                <div style="width:45px;position:absolute;top:0;left:0;bottom: 40px;background:rgb(190, 190, 190);">
                    <div style="width:45px;height: 50%;background:#548ed4;color:#fff;padding: 20px 0">
                        <div style="width:12px;margin:0 auto;line-height:12px;font-size:12px;"> {{$t('report.equityResearch')}}  /  {{$t('analyst.industryResearch')}} / {{coverForm.industryName}} {{$t('header.industry')}}</div>
                    </div>
                    <div style="width:45px;height:50%;"></div>
                </div>
                <div style="position:absolute;top:0;left:26px;right: 150px;bottom: 40px;padding: 0 20px;">
                    <div  style="border-bottom: 1px solid #d4d0d0;width: 100%;height: 72px;margin-bottom: 30px;">
                        <div  style="float:left;margin-top: 18px;">
                            <img src="http://tfstatic.hipland.net/0-1.png" alt="">
                        </div>
                        <div  style="float:right">
                            <img src="http://tfstatic.hipland.net/0-2.png" alt="">
                        </div>
                     </div>
                     <div style="clear:both"></div>
                    <div style="float:left;width:60%;padding: 10px 30px 10px 10px;">
                         <div style="height:21px;line-height:21px;padding:7px 0 0 6px;border-top:3px solid #1f487c;border-bottom:3px solid #1f487c;font-weight:600;">{{coverForm.industryName}}{{$t('report.inIindustry')}}</div>
                        <div style="height:78px;padding:12px 0 0 6px;font-size:24px;font-weight:600;">{{coverForm.reportName}}</div>
                        <div style="height:21px;line-height:21px;padding-top:7px;border-top:5px solid #1f487c;border-bottom:2px solid #1f487c;">{{coverForm.creatTime}}</div>
                        <div style="">
                            <h2 style="line-height:48px;color:#1d1d1d;">{{$t('report.investmentPointDescription')}}</h2>
                            <div style="line-height:24px;color:#6d6d6d;min-height:150px;" v-html="coverForm.describe">
                            </div>
                        </div>
                    </div>
                   <div style="float:right;height:260mm; border-left:1px solid #d4d0d0;width:31%;padding:0px 0 0 24px;margin-top: 97px;line-height:28px;color:#6d6d6d;position:absolute;right: 0;top: 0;">
                    <p style="font-size:14px;color:#000;font-weight:600;margin-top: 50mm;">{{$t('report.analyst')}}</p>
                    <p>{{$t('login.name')}}：{{coverForm.analystName}}</p>
                    <p>{{$t('login.email')}}：{{coverForm.email}}</p>
                    <p>{{$t('report.hk')}}：{{coverForm.ceNumber}}</p>
                    </div>
                  <div style="clear:both"></div>
                </div>

                <!-- <div style="height: 40px;width:100%; line-height: 40px;text-align: center;position:absolute;bottom:0;left:0px;">
                    请仔细阅读最后一页的分析师声明和免责条款
                </div> -->
            </div>
            
        </div>
        <div class="cover-edit" v-show="edit">
            <el-form class="form1" :model="coverForm" label-width="200px" style="min-width:610px;">
                <el-form-item :label="$t('header.industry')">
                    <i>*</i>
                    <el-select v-model="coverForm.industryName" @change="change">
                        <el-option
                        v-for="item in dictionaryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="$t('report.reportName')">
                    <i>*</i>
                    <el-input v-model="coverForm.reportName"></el-input>
                </el-form-item>

                <el-form-item :label="$t('industryModel.publishTime')">
                    <i>*</i>
                    <el-date-picker
                    v-model="coverForm.creatTime"
                    type="date"
                    value-format="yyyy年MM月dd日">
                    </el-date-picker>
                </el-form-item>

                <el-form-item :label="$t('report.investmentPointDescription')">
                    <i>*</i>
                    <el-input
                    type="textarea"
                    :rows="4"
                    v-model="coverForm.describe">
                    </el-input>
                </el-form-item>

                <el-form-item :label="$t('report.analyst')">
                    <i>*</i>
                    <div class="analyse">
                        <el-input class="marbottom20" v-model="coverForm.analystName" :placeholder="$t('login.name')"></el-input>
                        <el-input class="marbottom20" v-model="coverForm.email" type="email" :placeholder="$t('login.email')"></el-input>
                        <el-input v-model="coverForm.ceNumber" :placeholder="$t('report.hk')"></el-input>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>    
</template>
<script>
export default {
    props: ['section','edit'],
    data() {
        return {
            coverForm:{
                dictionaryId: '',
                industryName: '',
                reportName: '',
                creatTime: '',
                describe: '',
                analystName:'',
                email: '',
                ceNumber: '',
                reportId: this.$route.query.reportId
            },
            dictionaryList:[]
        }
    },
    mounted() {
        this.queryCover()
        this.queryDataDictionary()
    },
    methods: {
        async updateCover() {
            for(let i in this.coverForm) {
                if (!this.coverForm[i]) {
                    this.$message.error(this.$t('message.empty'))
                    return
                }
            }
            
            this.coverForm.reportId = this.$route.query.reportId
            this.coverForm.describe = this.coverForm.describe.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g, ' ');
            let res
            if(this.coverForm.id) {
                res = await this.$store.dispatch('AC_CoverServiceUpdateCover', this.coverForm); 
            }else {
                res = await this.$store.dispatch('AC_CoverServiceAddCover', this.coverForm); 
            }

            if (res.code != 200) {
                this.$message.error(this.$t('message.fail'))
                return
            }
            this.$parent.is_Edit(false)
            this.upDateSection()
        },
        async upDateSection() {
            let params = {
                    reportId: this.$route.query.reportId,
                    id: this.section.id,
                    richText: document.querySelector('.cover-show').innerHTML
                }

            const res = await this.$store.dispatch('AC_SectionServiceUpdateSection', params);
            res.code ==200 ? this.$message.success(this.$t('message.success')) : this.$message.success(this.$t('message.fail'))
        },
        
        async queryCover() {
            let params = {
                reportId: this.$route.query.reportId,
                pageSize: 10,
                pageNum: 1
            }

            const res = await this.$store.dispatch('AC_CoverServiceQueryCover', params); 
            if (res.code == 200 && res.data.covers){
                this.coverForm = res.data.covers[0];
                this.coverForm.describe = this.coverForm.describe ? this.coverForm.describe.replace(/<br>/g,"\r\n") : ''
            }

        },
        
        async queryDataDictionary() {
            let params = {
                pageSize: 10,
                pageNum: 1
            }

            const res = await this.$store.dispatch('AC_DataDictionaryServiceQueryDataDictionary', params); 
            if (res.code == 200){
                this.dictionaryList = res.data.dataDictionarys
            }
        },

        change(data) {
            this.coverForm.dictionaryId = data.id
            this.coverForm.industryName = data.name 
        }
    }
}
</script>
<style lang="less" scoped>
.cover{
    background: #fff;
    overflow: hidden;
    .cover-edit{
        i{
            color: #fe0000;
            position: absolute;
            left: -10px;
            top: 3px;
        }

        .el-input,.el-select,.el-textarea{
            width: 280px;
            margin-left: 8px;
        }
        .padleft260{
            padding-left: 60px;
        }
        .analyse{
            box-sizing: border-box;
            display: inline-block;
            padding: 33px 0 0 20px;
            margin-left: 8px;
            width: 390px;
            height: 196px;
            background: #f1f2f4;
            .marbottom20{
                margin-bottom: 20px;
            }
        }
    }
    
}

</style>
