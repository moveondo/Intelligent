<template>
    <div class="report">
        <div class="header">
            <i class="icon el-icon-arrow-left" @click="toBack()"></i>
            <div class="nav" v-if="!method">{{ $t('report.method') }}</div>
            <div class="nav" v-if="method == 'first'">
                <span>{{ $t('report.information') }}</span>
                <i class="el-icon-arrow-right"></i>
                <span>{{ $t('report.editor') }}</span>
            </div>
            <div class="nav" v-if="method == 'second'">
                <span>{{ $t('report.selectTemplate') }}</span>
                <i class="el-icon-arrow-right"></i>
                <span>{{ $t('report.information') }}</span>
                <i class="el-icon-arrow-right"></i>
                <span>{{ $t('report.editor') }}</span>
            </div>
        </div>
        <div class="content">
            <div class="method-content" v-if="!method">
                <div class="method method-first">
                    <h2>{{ $t('report.blankCreation') }}</h2>
                    <img src="../../../../static/img/report/blank_creation.png" alt="">
                    <p>{{ $t('report.quickly') }}  </br>  {{ $t('report.savedTemplate') }}</p>
                    <el-button type="primary" @click="method = 'first'">{{$t('dataTable.create')}}</el-button>
                </div>
                <div class="method method-second">
                    <h2>{{ $t('reportTemplate.reportTemplate') }}</h2>
                    <img src="../../../../static/img/report/report_template.png" alt="">
                    <p>{{ $t('report.logic') }} </br> {{ $t('report.efficiently') }}</p>
                    <el-button type="primary" @click="method = 'second'">{{ $t('report.selectTemplate') }}</el-button>
                </div>
            </div>

            <div class="datalist" v-if="method == 'second' && step == 1">
                <dataList 
                ref="reportTemplateList"
                v-if="step == 1"
                queryDataMethod='reportTemplate'
                :operation="operation"
                :tableColumn="tableColumn"
                @selectRow="selectRow"
                @selectOperation="selectOperation"
                ></dataList>
                <el-button type="primary" @click="nextToSecond">{{ $t('login.nextStep') }}</el-button>
            </div>

            <el-dialog :title="$t('reportTemplate.reportTemplate')" :visible.sync="reportTemplateShow" width="95%">
                <reportTemplateDetail v-if="reportTemplateShow" :name="selectTemplate.typeName" :templateId="selectTemplate.id"></reportTemplateDetail>
            </el-dialog>

            <div class="template-form" v-if="(method == 'second' && step == 2) || (method == 'first' && step == 1)">
                <el-form class="form" label-width="120px">
                    <!-- <el-form-item v-for="item in templateOutputVaribles" :key="item.id" :label="item.variableName">
                        <el-input v-model="item.defaultValue"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('report.stockIndustry')">
                        <el-input v-model="reportInfo.stockCode"></el-input>
                    </el-form-item> -->
                    <queryblurry ref="queryblurryChild"></queryblurry>
                    <el-form-item :label="$t('report.reportName')">
                        <i>*</i><el-input v-model="reportInfo.title"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('industryModel.author')">
                        <i>*</i><el-input v-model="reportInfo.authorName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('reportTemplate.type')">
                        <el-select v-model="reportInfo.type">
                            <el-option 
                            v-for="item in reportType" 
                            :key="item.type" 
                            :label="item.label" 
                            :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="selectCreateReport()">{{$t('dataTable.create')}}</el-button>
            </div>
            <div v-show="chartShow" v-for="item in arrchart" :key="item.index">
                <div :id="item.chartid" :style="{width:item.chartWidth, height:item.chartHeight}"></div>    
            </div>
        </div>
    </div>
</template>
<script>
import dataList from '../../common/dataTable'
import reportTemplateDetail from '../reportTemplate/reportTemplateDetail'
import queryblurry from '../../mresearch/components/queryblurry'
export default {
    components: {
        dataList,
        queryblurry,
        reportTemplateDetail
    },

    data() {
        return {
            method: '',
            step: '1',
            selectTemplate: '',
            templateOutputVaribles: [],
            reportInfo: {},
            arrchart: [],
            reportTemplateShow: false,
            chartShow: false,
            operation: [this.$t('message.preview')],
            tableColumn:[{
                prop: 'typeName',
                label: this.$t('reportTemplate.reportTemplate')
            },
            {
                prop: 'type',
                label: this.$t('reportTemplate.type')
            }
            ],
            reportType: [
                {
                    label: '公司研究',
                    type: '1'
                },
                {
                    label: '行业研究',
                    type: '2'
                },
                {
                    label: '其它',
                    type: '3'
                },
                {
                    label: '晨会纪要',
                    type: '4'
                },
            ]
        }
    },
    methods: {
        selectOperation(data) {
            this.selectTemplate = data.data
            this.reportTemplateShow = true
        },

        selectRow(data) {
            this.selectTemplate = data
            this.$message.success(this.$t('message.chosen') + ' ' + data.typeName)
        },

        async nextToSecond() {
            if(!this.selectTemplate) {
                this.$message.error(this.$t('message.noChosen'))
                return
            }

            let params = {
                reportTemplateId: this.selectTemplate.id
            }
            const result = await this.$store.dispatch('AC_TemplateOutputVaribleServiceQueryTemplateOutputVarible', params);
            if(result.code == 200) {
                this.step++ 
                this.templateOutputVaribles = result.data.templateOutputVaribles
                console.log(this.templateOutputVaribles)
            }else {
                this.$message.error(this.$t('message.fail'))
            }
        },

        toBack() {
            this.step == 1 ? this.method = '' : this.step--
        },

        async selectCreateReport() {
            if(!this.reportInfo.authorName || !this.reportInfo.title) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            if(this.reportInfo.type) {
                this.reportType.forEach(item => {
                    if(item.type == this.reportInfo.type){
                        this.reportInfo.style = item.label
                    }
                })
            }else {
                this.reportInfo.type = 3
                this.reportInfo.style = '其它'
            }
            this.reportInfo.stockCode = this.$refs.queryblurryChild.stockCodeValue
            if(this.method == 'second') {
                this.createTemplateReport()
                return
            }
            
            this.reportInfo.authorId = localStorage.getItem('userId')
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            let result = await this.$store.dispatch('AC_ReportServiceAddReport', this.reportInfo)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
            let data = result.data.report
            this.$router.replace({ path:"/mreport/myReportDetail",query: {reportId: data.id, name: data.title}})
        },

        async createTemplateReport() {
            let params = Object.assign({}, this.reportInfo);
                params.reportTemplateId = this.selectTemplate.id
                params.userId = localStorage.getItem('userId')

            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            let result = await this.$store.dispatch('AC_ReportManageServiceAsyncCreateReport', params)
            if (result.code == 520) {
                this.$message.error(this.$t('login.login'))
                this.$router.push('/login');
                this.$store.commit('loadingChange',{show: false})
                return 
            }      

            if(result.code != 200) {
                this.$message.error(this.$t('message.fail'))
                return
            }
            this.$message.success(this.$t('message.success'))
            this.$store.commit('loadingChange',{show: false})
            let data = result.data.asyncTask
            this.$router.replace({ path:"/mreport/myreport" })
        },
    }
}
</script>
<style lang="less" scoped>
.report{
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
.header{
    display: flex;
    height: 58px;
    padding-left: 40px;
    line-height: 58px;
    font-size: 16px;
    border-bottom: 1px solid #cecfd0;
    .icon{
        line-height: 58px;    
    }
    .nav{
        flex: 1;
        text-align: center;
    }
}
.content{
    flex: 1;
    background: #f1efef;
    display: flex;
    padding: 25px;
    .method-content {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        .method{
            width: 230px;
            height: 400px;
            padding: 0 15px 30px;
            box-sizing: border-box;
            text-align: center;
            h2{
                line-height: 100px;
                font-size: 20px;
            }
            img{
                height: 96px;
            }
            p{
                line-height: 24px;
                font-size: 13px;
                padding: 20px 0;
            }
        }
        .method-first{
            background: #fff;
            margin-right: 108px;
            border: 1px solid #e5e5e5;
            p{
                color: #77797a;
            }
        }
        .method-second{
            background: #0192ee;
            color: #fff;
            .el-button{
                border: 1px solid #fff;
            }
        }
    }

    .datalist{
        background: #fff;
        padding: 25px;
        text-align: center;
        width: 100%;
    }
    .template-form{
        width: 100%;
        padding: 60px 0 20px;
        background: #fff;
        text-align: center;
        .form{
            width: 350px;
            margin: 0 auto;
            .el-select,.el-input{
                width: 100%;
            }
            .el-form-item__content{
                position: relative;
                i{
                    position: absolute;
                    top: 2px;
                    left: -10px;
                    color: red;
                }
            }
        }
    }
}
</style>
