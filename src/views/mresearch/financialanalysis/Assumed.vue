<template>
   <div class="assumed">
       <div class="leftside">
            <div class="sidename" >
                {{$t('financialAnalysis.assumedEstimate')}}
                <span @click="Section = true" class="addimg">
                        <img :src="addimg" alt="">
                </span>
            </div>
            <div v-for="item in items" :key="item.id" v-bind:class="{currentclick:item.id==current1}" @click="ClickIndex(item)" >                   
                {{ item.sentiments }} 
            </div>      
       </div>
       <div class="rightside">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane :label="$t('financialAnalysis.assumedEstimate')" name="first">
                <div class="table">
                    <el-table
                    :data="datalist"
                    width="100%"
                    max-height="550"
                    v-loading="loadingdata"
                    :span-method="SpanMethod"
                    border>
                    <el-table-column fixed prop="name"></el-table-column>
                    
                    <el-table-column>
                    <template slot-scope="scope">
                        <div class="border-top" v-for="item in scope.row.children" :key="item.name">{{item.name}}</div>
                    </template>
                    </el-table-column>
                    
                    <el-table-column v-for="timer in timelist" :key="timer.id"
                    :label="timer.period">
                    <template slot-scope="scope">
                        <div class="border-top" v-for="item in scope.row.children" v-if="scope.row.children" :key="item.dataCode">
                            <input v-for="value in item.dataValues" @change="saveEstimateData('false',value,item)" v-if="value.period == timer.period" :key="value.id" type="text" v-model="value.dataValue">
                        </div>
                        <input v-for="item in scope.row.dataValues" @change="saveEstimateData('false',item,scope.row)" v-if="scope.row.dataValues && item.period == timer.period" :key="item.id" type="text" v-model="item.dataValue">
                    </template>
                    </el-table-column>
                    </el-table>
                    <el-row>
                        <el-button type="primary" @click="saveEstimateData('true')">{{$t('financialAnalysis.calculation')}}</el-button>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('financialAnalysis.conclusionData')" name="second">
                <div class="table">
                    <el-table
                    :data="datalist"
                    width="100%"
                    max-height="550"
                    :span-method="SpanMethod"
                    v-loading="loadingdata"
                    border>
                    <el-table-column prop="name"></el-table-column>
                    
                    <el-table-column>
                    <template slot-scope="scope">
                        <div class="border-top" v-for="item in scope.row.children" :key="item.name">{{item.name}}</div>
                    </template>
                    </el-table-column>
                    
                    <el-table-column v-for="timer in timelist" :key="timer.id"
                    :label="timer.period">
                    <template slot-scope="scope">
                        <div class="border-top" v-for="item in scope.row.children" v-if="scope.row.children" :key="item.dataCode">
                            <div v-for="value in item.dataValues" v-if="value.period == timer.period" :key="value.id">{{value.dataValue}}</div>
                        </div>
                        <div v-for="item in scope.row.dataValues" v-if="scope.row.dataValues && item.period == timer.period" :key="item.id">
                            {{item.dataValue}}
                        </div>
                    </template>
                    </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- 添加预设 -->
        <el-dialog :title="$t('financialAnalysis.assumedEstimate')" :visible.sync="Section" width="400px">
            <el-form ref="addform" :model="addform" label-width="100px">
                <el-form-item :label="$t('financialAnalysis.mood')">
                    <el-input v-model="addform.sentiments"></el-input>
                </el-form-item>

                <el-form-item label="parentId">
                    <el-select v-model="addform.parentId">
                        <el-option
                        v-for="item in items"
                        :key="item.id"
                        :label="item.sentiments"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAdd()">{{$t('message.confirm')}}</el-button>
                <el-button @click="Section = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
   </div>
</template>

<script>
import addimg from '../../../../static/img/tags/add.png';
export default {
    data() {
        return {
            activeName: 'first',
            current1:0,
            title: this.$t('financialAnalysis.basicInformation'),
            datalist: [],
            timelist: [],
            items: [],
            addimg: addimg,
            Section: false,
            loadingdata: true,
            addform:{
                analyzeId: this.$route.query.Id,
                sentiments: '',
                parentId: ''
            }
        }
    },
    created() {
        this.queryHypersis()
    },
    methods: {
        async saveAdd () {  
            let para = Object.assign({}, this.addform);
            const result = await this.$store.dispatch('AC_HypersisServiceAddHypersis',  para);
            this.Section = false;
            if (result.code == 200 && result.msg == 'success') {
                this.queryHypersis();   
                this.$message.success(this.$t('message.success'));
            } else {
                this.$message.error(this.$t('message.fail'));
            }
        },
        async queryHypersis () {
            let params = {
                aid: this.$route.query.Id
            }
            let res = await this.$store.dispatch('AC_HypersisServiceQueryHypersis',params)
            this.items = res.data.hypersiss
            this.current1 = res.data.hypersiss[0].id
            this.getEstimateData()
        },
        ClickIndex(item){
            this.current1=item.id; 
            this.getEstimateData()
        },
        SpanMethod({ row, column, rowIndex, columnIndex }) {
            if(!row.children) {
                if (columnIndex === 0) {
                    return [1, 2];
                } else if (columnIndex === 1) {
                    return [0, 0];
                }
            }
        },
        async getEstimateData () {
            let params = {
                aid: this.$route.query.Id,
                hid: this.current1
            }
            let self = this
            const dataList = await this.$store.dispatch('AC_AnalyzeOpServiceGetAnalyzeData', params)
            this.datalist = dataList.data.catagorys
            this.datalist.forEach(item => {
                if(item.dataType == 2 && item.dataValues) {
                    self.timelist = item.dataValues
                }
            })
            this.loadingdata = false
        },
        async saveEstimateData(bool,item,items) {
            let params;
            if (bool == 'true') {
                params = {needCalculate: 'true',hid: this.current1}
            }else {
                if (!item.dataValue) {
                    this.$message.error(this.$t('message.empty'))
                    return false
                }
                
                params = {
                    aid: this.$route.query.Id,
                    hid: this.current1,
                    needCalculate: 'false',
                    modelDataItem: {
                        dataCode: items.dataCode,
                        dataName: items.name,
                        dataValue: item.dataValue,
                        period: item.period,
                        dataType: 2,
                        id: item.id,
                        hid: this.current1
                    }
                }
            }
            
            let res = await this.$store.dispatch('AC_AnalyzeOpServiceSaveNCalculate',params)
            if(res.code != 200 || res.msg != 'success') {
                bool == 'true' ? this.$message.error(this.$t('message.fail')) : this.$message.error(this.$t('message.fail'))
            }else {
                bool == 'true' ? this.$message.success(this.$t('message.success')) : this.$message.success(this.$t('message.success'))
            }
        }
    }
}
</script>
<style lang="less" scoped>
.assumed{
    display: flex;
    height: 100%;
    .leftside{
        min-width: 130px;
        box-sizing: border-box;
        background: #fff;
        text-align: center;
        line-height: 40px;
        font-size: 1.3rem;
        border-right: 1px solid #ddd;
        .sidename{
            font-size: 1.6rem;
            font-weight: bold;
            margin-top: 34px;
            .addimg{
                cursor: pointer;
            }
        }
    }
    .rightside{
        box-sizing: border-box;
        padding: 40px 40px 0;
        width: 100%;
        background: #fff;
    }
  
  .currentclick{
    background: #cbd5e8;
    font-size: 1.5rem;
    font-weight: bold;
  }

}

.table {
    background: #fff;
    padding: 0 10px 50px;
    // width: 100%;
    // height: 600px;  
    overflow-x: scroll;

    
    input{
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
    }
}
.el-row{
    text-align: center;
    margin-top: 25px;
}
.el-table--small td,.el-table--small th{
    padding: 0 !important;
}
</style>

     