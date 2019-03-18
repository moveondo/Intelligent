<template>
    <div class="history-1">
        <div class="header-his">
            {{$t('financialAnalysis.historicalData')}}
            <span @click="editSection()" class="addimg">
               <img :src="editimg" alt="">
            </span>
        </div>
        <div class="table">
            <el-table
            width="100%"
            max-height="600"
            :data="datalist"
            :span-method="SpanMethod"
            v-loading="loading"
            border>
            <el-table-column prop="firstName" ></el-table-column>
            <el-table-column prop="secondName" ></el-table-column>
            <el-table-column prop="name"></el-table-column>
            <el-table-column v-for="timer in timelist" :key="timer.id" :label="timer.period">
            <template slot-scope="scope">
                <div v-for="item in scope.row.dataValues" v-if="item.period == timer.period" :key="item.id">
                    {{item.dataValue == 'na' ? 'N/A' : item.dataValue}}
                </div>
            </template>
            </el-table-column>
            </el-table>

        </div>
        <!-- 编辑弹出框 -->
        <el-dialog :title="$t('message.update')" :visible.sync="editSection0" width="300px">
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
import editimg from '../../../../static/img/tags/edit.png';
export default {
    data() {
        return {
            editimg:editimg,
            editSection0:false,
            editform:{
                title:''
            },
            datalist: [],
            timelist: [],
            loading: true,
            firstColspan: [],
            secondColspan: [],    
            thirdColspan: []        
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        async getdata () {
            let params = {
                aid : this.$route.query.Id,
                hid: 0,
            };
            const dataList = await this.$store.dispatch('AC_AnalyzeOpServiceGetAnalyzeData', params)
            this.dataOpen(dataList.data.catagorys)
            this.loading = false
        },
        dataOpen (data) {
            let arr = []
            let boolen = false

            for (let i = 0;i < data.length;i++) {
                if(data[i].children && data[i].dataType == 1) {
                    for (let j = 0;j < data[i].children.length;j++) {

                        if (data[i].children[j].children) {
                            boolen = true
                        }

                        if (data[i].children[j].dataType == 2 && data[i].children[j].dataValues) {
                            this.timelist = data[i].children[j].dataValues
                        }

                        if (!data[i].firstName) {
                            data[i].children[j].firstName = data[i].name
                        }

                        if (data[i].firstName) {
                            data[i].children[j].firstName = data[i].firstName
                            data[i].children[j].secondName = data[i].name
                        }
                        
                        arr.push(data[i].children[j])
                    }

                }else {
                    this.timelist = data[i].dataValues
                    if (!data[i].firstName) {
                        data[i].firstName = data[i].name
                        data[i].name = ''
                    }
                    arr.push(data[i])
                }
            }

            if (boolen) {
                this.dataOpen(arr)
            }else {
                this.datalist = arr
                this.computeClospan(arr)
            }

        },
        computeClospan(data) {
            let firstTime = 1;
            let secondTime = 1;
            for (let i = 1;i < data.length;i++) {
                if (data[i].firstName == data[i-1].firstName) {
                    firstTime++
                    if (data[i].secondName && data[i].secondName == data[i-1].secondName) {
                        secondTime++
                    }else if(data[i].secondName && data[i].secondName != data[i-1].secondName){
                        this.secondColspan.push([secondTime,1])
                        secondTime = 1
                    }
                    
                }else {
                    if (data[i-1].secondName) {
                        this.secondColspan.push([secondTime,1])
                    }

                    if(data[i-1].name == '' && !data[i-1].secondName) {
                        this.firstColspan.push([firstTime,3])
                    }else if(data[i-1].name && !data[i-1].secondName) {
                        this.firstColspan.push([firstTime,2])
                    }else {
                        this.firstColspan.push([firstTime,1])
                    }

                    firstTime = 1
                    secondTime = 1
                }

                if (data[i-1].name) {
                    this.thirdColspan.push([1,1])
                }else {
                    this.thirdColspan.push([0,0])
                }


                if(i+1 == data.length) {
                    if(data[i].name == '' && !data[i].secondName) {
                        this.firstColspan.push([firstTime,3])
                    }else if(data[i].name != '' && !data[i].secondName) {
                        this.firstColspan.push([firstTime,2])
                    }else {
                        this.firstColspan.push([firstTime,1])
                    }

                    if (data[i].name != '') {
                        this.thirdColspan.push([1,1])
                    }else {
                        this.thirdColspan.push([0,0])
                    }
                    
                    if(data[i].secondName) {
                        this.secondColspan.push([secondTime,1])
                    }
                }
            }
            this.computeAllClospan(data)
        },
        computeAllClospan(data) {
            let firstName = ''
            let secondName = ''
            let firstColspan = []
            let secondColspan = []
            for(let i = 0;i < data.length;i++) {
                if(data[i].firstName != firstName) {
                    firstColspan.push(this.firstColspan[0])
                    this.firstColspan.splice(0,1)
                    firstName = data[i].firstName

                    if(data[i].secondName) {
                        secondColspan.push(this.secondColspan[0])
                        this.secondColspan.splice(0,1)
                        secondName = data[i].secondName
                    }else {
                        secondColspan.push([0,0]) 
                        secondName = ''   
                    }

                }else {
                    firstColspan.push([0,0])
                    if(data[i].secondName && data[i].secondName != secondName) {
                        secondColspan.push(this.secondColspan[0])
                        this.secondColspan.splice(0,1)
                        secondName = data[i].secondName
                    }else {
                        secondColspan.push([0,0])    
                    }
                    
                }
            }
            this.firstColspan = firstColspan
            this.secondColspan = secondColspan
        },
        SpanMethod({ row, column, rowIndex, columnIndex }) {
            
            if(columnIndex == 0) {
                return [this.firstColspan[rowIndex][0] ,this.firstColspan[rowIndex][1]]
            }

            if(columnIndex == 1) {
                return [this.secondColspan[rowIndex][0] ,this.secondColspan[rowIndex][1]]
            }

            if(columnIndex == 2) {
                return [this.thirdColspan[rowIndex][0] ,this.thirdColspan[rowIndex][1]]
            }
        },
        editSection(){
            let self=this;
            self.editSection0=true;
        },
        async saveEdit(){
            let self=this;
            let para = {
                "id":self.current1,
                "reportId":self.reportId,
                "title":self.editform.title
            }
            const result = await this.$store.dispatch('AC_SectionServiceUpdateSection',para);
            self.editSection0 = false; 
            self.title=self.editform.title; 
            this.$message.success(this.$t('message.success')); 
            this.querydata();
        }    
    }
}
</script>
<style lang="less" scoped>
.history-1{
    width: 100%;
    height: 100%;
    max-width: 1128px;
    display: flex;
    flex-direction: column;
    .header-his{
        // width: 100%;
        height: 100px;
        line-height: 100px;
        background: #fff;
        font-size: 1.8rem;
        padding-left: 30px;
        border-radius: 3px;
    }

   .table{
        flex: 1;
        margin-top: 15px;
        background: #fff;
        padding: 10px 10px 50px;
        overflow-x: scroll;
       
        .border-top{
            padding: 8px 0;
        }
   }
}
</style>
