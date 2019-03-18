<template>
    <div>
        <!-- 搜索框 -->
        <div class="search-warp">
            <div class="search-type">
                <i class="el-icon-search"></i>
                <div class="select-list">
                    <div class="select-data" :key='index' v-for="(item,index) in selectDataList" >
                        {{item.label}} : {{item.value}}
                        <i class="el-icon-circle-close" @click="deleteSelectData(index,item)"></i>
                    </div>
                </div>
                <div class="search-cont">
                    <input ref="selectInput" 
                    @keydown.13="keydown" 
                    @focus="searchListShow = true" 
                    @blur="searchListShow = false" 
                    v-model="inputData" type="text" 
                    class="search-input" 
                    :placeholder="$t('placeholder.enter')">
                    <i class="search-triangle" v-show="searchListShow"></i>
                    <ul class="search-list" v-show="searchListShow">
                        <li @mousedown="selectItem(item)" :key="index" v-for="(item,index) in tableColumn">{{item.label}}</li>
                    </ul>
                </div>
            </div>
            
            <el-date-picker
            v-model="searchTime"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="__"
            :start-placeholder="$t('dataTable.startDate')"
            :end-placeholder="$t('dataTable.endDate')">
            </el-date-picker>
        </div>    
        
        <!-- 列表主体 -->
        <el-table :data="dataList" v-loading="tableLoading" border highlight-current-row @row-click="selectRow" @selection-change="handleSelectionChange" :header-cell-style="{color:'#000'}">
            <el-table-column v-if="selectionShow" type="selection" width="55"></el-table-column>
            <el-table-column v-for="item in tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" :sortable="item.sortable"></el-table-column>
            <el-table-column prop="createdAt" :label="$t('dataTable.creationTime')" sortable :formatter="timetrans"></el-table-column>
            <el-table-column :label="$t('dataTable.operating')" v-if="operation && operation.length != 0" width="165px">
                <template slot-scope="scope">
                    <el-button v-for="(item,index) in operation" :key="index" v-if="item != $t('dataTable.delete')" size="small" type="primary" @click="selectOperation(scope.row,item)">{{ item }}</el-button>
                    <el-button v-for="(item,index) in operation" :key="index" v-if="item == $t('dataTable.delete')" size="small" type="danger" @click="selectDelete(scope.row)">{{ item }}</el-button>
                </template>
            </el-table-column>

            <el-table-column :label="$t('dataTable.operating')" v-if="operationIcon && operationIcon.length != 0" width="150px">
                <template slot-scope="scope">
                    <el-tooltip class="item" v-for="(item,index) in operationIcon" v-if="item.alt != $t('dataTable.delete')" :key="index" effect="dark" :content="item.alt" placement="bottom">
                        <img :src="item.url" @click="selectOperation(scope.row,item.alt)" style="margin-right: 5px;">
                    </el-tooltip>
                    <el-tooltip class="item" v-for="(item,index) in operationIcon" v-if="item.alt == $t('dataTable.delete')" :key="index" effect="dark" :content="item.alt" placement="bottom">
                        <img :src="item.url" @click="selectDelete(scope.row)" style="margin-right: 5px;">
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            align="right"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page.sync="pageNum"
            @current-change="queryData">
        </el-pagination>

        <!-- 删除提示框 -->
        <el-dialog :append-to-body="operation && operation.appendBody" :visible.sync="deleteShow" width="300px" center>
            <div class="del-dialog-cnt">{{$t('message.deleteSure')}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureDelete">{{$t('message.confirm')}}</el-button>
                <el-button @click="deleteShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['queryDataMethod','params','tableColumn','operation','selectionShow','operationIcon'], 
    data () {
        return {
            inputData: '',
            searchTime: '',
            selectDataList:[],   
            selectData:'',      
            deleteData: null,
            dataList: [],
            total: 1,
            pageSize: 10,
            pageNum: 1,
            deleteShow: false,
            tableLoading: false,
            searchListShow: false,
        }
    },
    watch:{
        searchTime() {
            this.queryData()
        },
        selectDataList() {
            this.queryData()
        },
        params(data) {
            this.queryData()
        }
    },
    mounted () {
        let params = this.$store.getters[this.queryDataMethod + 'Params']
        if(params) {
            if(params.dateFrom && params.dateTo) {
                let arr = []
                arr[0] = params.dateFrom
                arr[1] = params.dateTo
                this.searchTime = arr
            }

            for(let i = 0;i < this.tableColumn.length; i++) {
                if(params[this.tableColumn[i].prop]) {
                    this.selectDataList.push({
                        prop: this.tableColumn[i].prop,
                        label: this.tableColumn[i].label,
                        value: params[this.tableColumn[i].prop]
                    })
                }
            }
            this.pageSize = params.pageSize
            this.pageNum = params.pageNum
        }
        this.queryData()    
    },
    methods: {
        async queryData() {
            this.tableLoading = true
            let params = {}
            this.selectDataList.forEach(item => {
                params[item.prop] = item.value
            })
            
            if(this.searchTime) {
                params.dateFrom = this.searchTime[0]
                params.dateTo = this.searchTime[1]
            }
            params.pageNum = this.pageNum
            params.pageSize = this.pageSize
            params = Object.assign(params,this.params)
            
            if(this.$store._mutations[this.queryDataMethod + 'ParamsChange']) {
                this.$store.commit(this.queryDataMethod + 'ParamsChange',params)
            }

            let method = 'AC_' + this.titleCase(this.queryDataMethod) + 'ServiceQuery' + this.titleCase(this.queryDataMethod)
            const result = await this.$store.dispatch(method, params);
            this.total=result.data.total;    
            this.pageNum = params.pageNum
            let data = result.data[this.queryDataMethod + 's'] ? result.data[this.queryDataMethod + 's'] : []
            
            let arr = []
            this.tableColumn.forEach(item => {
                if(item.methed) {
                    arr.push(item)
                }
            })

            if(arr.length == 0 || data.length == 0) {
                this.dataList= data
                this.tableLoading = false
                return
            }

            this.getMany(data,arr)         
        },

        async getMany(data,arr) {
            let idList = []
            let item = arr[0].methed
            for(let i = 0;i < data.length;i++) {
                idList.push(data[i][item + 'Id'])
            }

            let params = { id: idList, forceIdOrder: '1' }
            let methed = 'AC_' + this.titleCase(item) + 'ServiceGetMany' + this.titleCase(item)
            const result = await this.$store.dispatch(methed, params);
            this.getManyList = result.data[item+ 's']
            let dataList = []

            for(let j = arr.length - 1;j >= 0;j--) {
                if(arr[j].methed == item) {
                    for(let i = 0;i < data.length;i++) {
                        data[i][arr[j].prop] = this.getManyList[i][arr[j].prop]
                    }
                    arr.splice(j,1)
                }
            }
            
            if(arr.length > 0) {
                this.getMany(data,arr)
                return
            }

            this.dataList = data
            this.tableLoading = false
        },

        // 点击选中搜索
        selectItem(item) {
            this.selectData = item
            this.inputData = item.label + ":"   
            this.searchListShow = false;
            this.$nextTick(function () {
                this.$refs.selectInput.focus();
            });
        },

        // 回车事件
        keydown() {
            let label = this.inputData.slice(0,this.selectData.label.length + 1)
            let value = this.inputData.slice(this.selectData.label.length + 1)
            
            if(label != this.selectData.label + ':' || value == '') {
                this.$message.error('请填入正确内容')
                return false
            }

            this.selectDataList.forEach((item,index) => {
                if(item.label == this.selectData.label) {
                    this.selectDataList.splice(index,1)
                }
            })

            this.selectData.value = value
            this.selectDataList.push(this.selectData)
            this.inputData = ''
        },

        // 删除选中的搜索
        deleteSelectData(index,item) {
            this.selectDataList.splice(index,1)
        },

        // Checkbox选择
        handleSelectionChange(data) {
            this.$emit('handleSelectionChange',data)
        },

        //编辑事件
        selectOperation(data,item) {
            let params = {
                data: data,
                type: item
            }

            this.$emit('selectOperation',params)
        },

        //删除
        selectDelete(row) {
            this.deleteShow = true
            this.deleteData = row
        },
        async sureDelete() {
            let params = { id: this.deleteData.id }
            let method = 'AC_' + this.titleCase(this.queryDataMethod) + 'ServiceDelete' + this.titleCase(this.queryDataMethod)
            const result = await this.$store.dispatch(method, params);
            result.code == '200' ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.deleteShow = false
            this.queryData()
        },

        //行点击事件
        selectRow(row) {
            this.$emit('selectRow',row)
        },

        timetrans(row) {
            var date = new Date(row.createdAt);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            return Y+M+D;   
        },

        titleCase(str) {
            let newarr = str.split(" ")
            let arr=[]; 
            for(let i = 0; i < newarr.length; i++){
                arr.push(newarr[i][0].toUpperCase()+newarr[i].substring(1));
            }
            return arr.join('');
        }


    }

}
</script>
<style lang="less" scoped>
.search-warp{
    margin-bottom: 20px;
    display: flex;
    width: 100%;
    max-width: 750px;

    .search-type {
        flex:1;
        display: flex;
        padding: 5px;
        margin-right: 10px;
        border-radius: 4px;
        border: 1px solid #d7d8d9;
        .el-icon-search{
            font-size: 18px;
            line-height: 30px;
            margin-right: 10px;
        }
        .select-list{
            .select-data{
                padding: 5px 8px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                border-radius: 25px;
                margin-right: 3px;
                background: #cbe1fa;
                display: inline-block;
                white-space: nowrap;
            }
        }   

        .search-cont{
            position: relative;
            flex: 1;
            height: 30px;
            input{
                font-size: 14px;
                outline: 0;
                border: 0;
                display: inline-block;
                height: 100%;
                width: 100%;
            }
            .search-triangle{
                width: 6px;
                height: 6px;
                border: 1px solid #d7d8d9;
                border-bottom: none;
                border-right: none;
                transform:rotate(45deg);
                background: #fff;
                z-index: 999;
                position:absolute; 
                top: 42px;
                left: 40px;
            }
            .search-list{
                position: absolute;
                top: 45px;
                left: 0;
                width: 84px;
                padding-top: 10px;
                font-size: 14px;
                background: #fff;
                z-index: 998;
                border: 1px solid #d7d8d9;
                border-radius: 4px;
                li{
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    overflow: hidden;
                }
                li:hover{
                    background: #ecf5ff;
                    color: #409eff;
                    cursor: pointer;
                }
            }
        }
    }
    .el-range-editor--small.el-input__inner{
        width: 300px;
        height: 42px;
        .el-range-separator{
            line-height: 34px;
        }
    }
}
.el-button:nth-of-type(odd){
    margin-left: 0;
}
.el-button{
    margin-top: 10px;
}
.el-button:nth-of-type(1),.el-button:nth-of-type(2){
    margin-top: 0;
}
</style>
